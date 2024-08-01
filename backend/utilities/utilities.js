import nodemailer from "nodemailer";
import { MongoClient, ServerApiVersion } from "mongodb";

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


  export {fetchUserData,sendOwnerData,sendVerificationEmail};