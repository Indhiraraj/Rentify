import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getImageLink } from "./firebase.js";
import multer from "multer";

//----------------------------------------------DATABASE CONFIGURATION-----------------------------------------------//


const uri =
  "mongodb+srv://indhiraraj7:msLEghAuHzCUgvRQ@cluster0.rpstvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect()
} catch (error) {
  console.log("couldn't connect to mongodb server: " + error.message);
}

const db = client.db("rentify");

//----------------------------------------------EXPRESS AND CORS CONFIGURATION-----------------------------------------------//


const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: ["http://localhost:5173","http://192.168.38.144:5173"],
  methods: "GET,PUT,POST,HEAD,PATCH,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



//----------------------------------------------FUNCTIONS-----------------------------------------------//

const fetchUserData = async (userId) => {
  const user_collection = db.collection("users");
  const user = await user_collection.findOne({ userId: userId });
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return user;
  } else {
    return null;
  }
};

const sendVerificationEmail = async (verification) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "764255001@smtp-brevo.com",
      pass: "1ksgdRprYTFSaCVJ",
    },
  });

  let mailOptions = {
    from: "indhiraraj7@gmail.com",
    to: verification.email,
    subject: "verification",
    text: `Your verification code is : ${verification.verification_code}`,
    html: `<h1 style="color:#333">Welcome to rentify</h1>
           <p style="color:#333;font-size:1rem;">Finish your registration process by entering the verification code</p>
           <p style="color:#333;font-size:1rem;">Your Verification code : <span style="border: 1px solid #333;padding:0.5rem;font-size:1.2rem;border-radius:5px;">${verification.verification_code}</span></p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};


const formatData = (area) => {
  const formattedData = {
    ...area,
    facilities: area.facilities.split(",").map((item) => item.trim()),
    publicTransport: area.publicTransport
      .split(",")
      .map((item) => item.trim()),
    securityFeatures: area.securityFeatures
      .split(",")
      .map((item) => item.trim()),
    greenSpaces: area.greenSpaces.split(",").map((item) => item.trim()),
    internetProviders: area.internetProviders
      .split(",")
      .map((item) => item.trim()),
  };

  return formattedData;
}

const sendOwnerData = async (userEmail,ownerDetails) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "764255001@smtp-brevo.com",
      pass: "1ksgdRprYTFSaCVJ",
    },
  });
  let mailOptions = {
    from: "indhiraraj7@gmail.com",
    to: userEmail,
    subject: "owner data",
    text: "",
    html: `<h3 style="color:#333">The details of your interested area's owner is below</h3>
      <p style="color:#333;font-size:1rem;">Owner Name: ${ownerDetails.userName}</p>
      <p style="color:#333;font-size:1rem;">Email: ${ownerDetails.email}</p>
      <p style="color:#333;font-size:1rem;">Contact: ${ownerDetails.contact}</p>`,
  };

  await transporter.sendMail(mailOptions);
}

//----------------------------------------------AUTHENTICATION-----------------------------------------------//

app.post("/register", async (req, res) => {
  try {
    const user_collection = db.collection("users");
    const registered_user = await user_collection.findOne({
      email: req.body.email,
    });
    if (registered_user) {
      throw new Error("user already registered");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      userId: crypto.randomUUID(),
      userName: req.body.userName,
      type: req.body.type,
      contact: req.body.contact,
      email: req.body.email,
      password: hashedPassword,
      verified: false,
    };

    const verification = {
      email: req.body.email,
      verification_code: Math.floor(100000 + Math.random() * 900000).toString(),
    };

    const verification_collection = db.collection("verification");

    const user_response = await user_collection.insertOne(user);

    if (user_response.acknowledged) {
      const verification_response = await verification_collection.insertOne(
        verification
      );

      if (verification_response.acknowledged) {
        const { password, ...User } = user;
        sendVerificationEmail(verification);
        res.status(201).json({
          success: "user registered successfully with id: " + user.userId,
          user: User,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user_collection = db.collection("users");
  const user = await user_collection.findOne({ email: email });

  if (user == null) {
    return res.status(400).json({ message: "user or password is incorrect" });
  }
  try {
    if (!user.verified) {
      return res.status(300).json({ message: "unverified-user" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const { password: psword, ...User } = user;
      res.status(200).json({ message: "Success", user: User });
    } else {
      res.status(400).json({ message: "password incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//----------------------------------------------USER-----------------------------------------------//

app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  const user_collection = db.collection("users");

  const user = await user_collection.findOne({ userId: userId });

  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

//----------------------------------------------AREAS-----------------------------------------------//

app.get("/user/:userId/areas", async (req, res) => {
  try {
    const userId = req.params.userId;

    const area_collection = db.collection("areas");
    const areas = await area_collection.find({ ownerId: userId }).toArray();
    res.status(200).json({ areas: areas });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

app.get("/areas", async (req, res) => {
  const area_collection = db.collection("areas");
  const areas = await area_collection.find({}).toArray();
  res.json({ areas: areas });
});

app.get("/areas/:areaId", async (req, res) => {
  const area_collection = db.collection("areas");
  const area = await area_collection.findOne({ areaId: req.params.areaId });
  if (area) {
    res.status(200).json({ message: "Success", area: area });
  } else {
    res.status(500).json({ message: "Area not found" });
  }
});

app.delete("/area/remove/:areaId", async (req, res) => {
  try {
    const area_collection = db.collection("areas");
    const area = await area_collection.findOne({ areaId: req.params.areaId });
    if (!area) {
      throw new Error("Area not found");
    }
    await area_collection.deleteOne({ _id: area._id });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/area", upload.single("areaImg"), async (req, res) => {
  try {
    let area = req.body;
   
    const area_collection = db.collection("areas");
    const filter = { areaId: area.areaId };
    if (req.file) {
      let imageLink = await getImageLink(
        area.ownerId,
        area.name,
        req.file.path
      );

      area = {
        $set: formatData(area),
      };
    } else {
      let {areaImg,...Area} = area;
     
      area = {
        $set: formatData(Area),
      };
    }
    // console.log(area);
    await area_collection.updateOne(filter, area);
    
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error, couldn't upload area" });
  }
});

app.post("/area", upload.single("areaImg"), async (req, res) => {
  try {
    let area = req.body;

    let imageLink = await getImageLink(area.ownerId, area.name, req.file.path);
    const area_collection = db.collection("areas");
    
    area = { ...area, img: imageLink, areaId: crypto.randomUUID() };
    
    await area_collection.insertOne(formatData(area));
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error, couldn't upload area" });
  }
});

//----------------------------------------------MAIL-----------------------------------------------//

app.post("/sendMail", async (req, res) => {
  const userEmail = req.body.userMail;
  const ownerId = req.body.ownerId;

  const ownerDetails = await fetchUserData(ownerId);

  try {
    if (!ownerDetails) {
      console.log("user not found");
      return res.status(404).json({ message: "user not found" });
    }

    await sendOwnerData(userEmail,ownerDetails);

    res
      .status(200)
      .json({ message: "successfully sent email", owner: ownerDetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//----------------------------------------------VERIFICATION-----------------------------------------------//

app.post("/verify", async (req, res) => {
  const user_code = req.body.user_verification_code;
  const user_email = req.body.email;
  try {
    const verification_collection = db.collection("verification");
    const user_collection = db.collection("users");
    const verification = await verification_collection.findOne({
      email: user_email,
    });
    if (verification) {
      if (verification.verification_code === user_code) {
        const User = await user_collection.findOne({ email: user_email });
        const filter = {
          email: user_email,
        };
        const updateDocument = {
          $set: {
            verified: true,
          },
        };
        await user_collection.updateOne(filter, updateDocument);
        const { password, ...user } = User;
        res.status(200).json({ message: "success", user: user });
      } else {
        res.status(400).json({ message: "verification-code is incorrect" });
      }
    } else {
      res.status(404).json({ message: "email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/retry/:userEmail", async (req, res) => {
  try {
    const verification_collection = db.collection("verification");
    const verification_list = await verification_collection.find({}).toArray();
    verification_list.map(async (verification) => {
      if (verification.email === req.params.userEmail) {
        const filter = { _id: verification._id };
        const newVerificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const updateDocument = {
          $set: {
            verification_code: newVerificationCode,
          },
        };
       await verification_collection.updateOne(filter, updateDocument);
        
        const newVerification = {...verification,verification_code:newVerificationCode}
        sendVerificationEmail(newVerification);
        return res.status(200).json({ message: "email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//----------------------------------------------USER REVIEWW-----------------------------------------------//

app.get("/user-reviews",async (req,res) => {
  try {
    const review_collection = db.collection("reviews");
    const response = review_collection.find({});
    const reviews = await response.toArray();
    res.status(200).json({reviews : reviews})
  } catch (error) {
    res.status(500).json({message: error})
  }
})

//----------------------------------------------WishList-----------------------------------------------//

app.get("/wishlist/:userId",async (req,res) => {
  const wishlist_collection = db.collection("wish-list"); 
  const userId = req.params.userId;
  try {
    const wishlist = wishlist_collection.find({userId : userId});
  const wishlist_data = await wishlist.toArray();
  res.status(200).json({wishlist : wishlist_data[0]});
  
  } catch (error) {
    res.status(400).json({message : "Wishlist not found, try later"})
  }
  
})

app.post("/wishlist/:userId",async (req,res) => {
  const wishlist_collection = db.collection("wish-list"); 
  const userId = req.params.userId;
  
  try {
    const wishlist_data = await wishlist_collection.findOne({userId : userId});

  if(wishlist_data){
    const filter = {userId : userId}
    const updated_wishlist_data = {
      $set : {
        ...wishlist_data,
        areas : [...wishlist_data.areas,req.body.area],
        updatedAt : Date.now()
      }
    }

    await wishlist_collection.updateOne(filter,updated_wishlist_data);
  }
  else{
      const wishlist = {
        userId : userId,
        areas : [req.body.area],
        createdAt : Date.now()
      }
      await wishlist_collection.insertOne(wishlist);
  }
  res.status(200).json({message : "wishlist addedd successfully"});
  
  } catch (error) {
    res.status(400).json({message : "Wishlist not found, try later"})
  }
})

app.delete("/wishlist/:userId",async (req,res) => {
    const wishlist_collection = db.collection("wish-list"); 
  const userId = req.params.userId;
  try {
    const wishlist_data = await wishlist_collection.findOne({userId : userId});

  if(wishlist_data){
    const filter = {userId : userId}
    const updated_wishlist_data = {
      $set : {
        ...wishlist_data,
        areas : wishlist_data.areas.filter((area) => area != req.body.area),
        updatedAt : Date.now()
      }
    }

    await wishlist_collection.updateOne(filter,updated_wishlist_data);
    res.status(200).json({message : "success"})
  }
  else{
    throw new Error("Wishlist not found")
  }
    
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})


//----------------------------------------------PORT-----------------------------------------------//

const port = 4000;

app.listen(process.env.PORT || port,'0.0.0.0', () => {
  console.log("Server started");
});
