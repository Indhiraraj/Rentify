import express from "express";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";
import { sendVerificationEmail } from "../../utilities/utilities.js";

const router = express.Router();

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

router.post("/register", async (req, res) => {
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
  
  router.post("/login", async (req, res) => {
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


  export default router;