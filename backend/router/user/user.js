import express from "express";

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

const router = express.Router();

router.get("/:userId", async (req, res) => {
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

  export default router;