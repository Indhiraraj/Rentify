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
  await client.connect();
} catch (error) {
  console.log("couldn't connect to mongodb server: " + error.message);
}

const db = client.db("rentify");

const router = express.Router();

router.get("/",async (req,res) => {
    try {
      const review_collection = db.collection("reviews");
      const response = review_collection.find({});
      const reviews = await response.toArray();
      res.status(200).json({reviews : reviews})
    } catch (error) {
      res.status(500).json({message: error})
    }
  });


export default router;  