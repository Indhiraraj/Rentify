import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getImageLink } from "./firebase.js";
import multer from "multer";

const uri =
  "mongodb+srv://indhiraraj7:msLEghAuHzCUgvRQ@cluster0.rpstvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("rentify");

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
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,HEAD,PATCH,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const port = 4000;

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
    html: "",
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

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

app.get("/area/remove/:areaId", async (req, res) => {
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

app.post("/area/edit/", upload.single("areaImg"), async (req, res) => {
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
        $set: {
          ...area,
          img: imageLink,
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
        },
      };
    } else {
      let {areaImg,...Area} = area;
     
      area = {
        $set: {
          ...Area,
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
        },
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
    console.log(imageLink);
    area = { ...area, img: imageLink, areaId: crypto.randomUUID() };
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
    await area_collection.insertOne(formattedData);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error, couldn't upload area" });
  }
});

app.post("/sendMail", async (req, res) => {
  const userEmail = req.body.userMail;
  const ownerId = req.body.ownerId;

  const ownerDetails = await fetchUserData(ownerId);

  try {
    if (!ownerDetails) {
      console.log("user not found");
      return res.status(404).json({ message: "user not found" });
    }
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
      html: `<h3>The details of your interested area's owner is below</h3>
        <p>Owner Name: ${ownerDetails.userName}</p>
        <p>Email: ${ownerDetails.email}</p>
        <p>Contact: ${ownerDetails.contact}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ message: "successfully sent email", owner: ownerDetails });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

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

app.get("/retry/:userEmail", async (req, res) => {
  try {
    const verification_collection = db.collection("verification");
    const verification_list = await verification_collection.find({}).toArray();
    verification_list.map(async (verification) => {
      if (verification.email === req.params.userEmail) {
        const filter = { _id: verification._id };
        const updateDocument = {
          $set: {
            verification_code: Math.floor(
              100000 + Math.random() * 900000
            ).toString(),
          },
        };
        await verification_collection.updateOne(filter, updateDocument);
        sendVerificationEmail(verification);
        return res.status(200).json({ message: "email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("Server started");
});
