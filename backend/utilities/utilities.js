import nodemailer from "nodemailer";
import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from "dotenv";

dotenv.config();

const uri =
  process.env.MONGO_DB_URI;
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
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
  
    let mailOptions = {
      from: process.env.NODE_MAILER_FROMM,
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
      host: process.env.NODE_MAILER_HOST,
      port: process.env.NODE_MAILER_PORT,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
    let mailOptions = {
      from: process.env.NODE_MAILER_FROM,
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