import express from "express";

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