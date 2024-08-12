import express from "express";

import { MongoClient, ServerApiVersion } from "mongodb";
import { sendVerificationEmail } from "../../utilities/utilities.js";

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

const router = express.Router();

router.post("/verify", async (req, res) => {
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
  
  router.put("/retry/:userEmail", async (req, res) => {
    try {
      const verification_collection = db.collection("verification");
      const verification = await verification_collection.findOne({email: req.params.userEmail});
      
        if (verification) {
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
        else{
            res.status(404).json({message: "user not found"});
        }
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  export default router;