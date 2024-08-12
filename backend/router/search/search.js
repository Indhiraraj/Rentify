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

router.get("/:query", async (req,res) => {
    const query = req.params.query;
    const area_collection = db.collection("areas");
    try {
        if(query === "all"){
            const areas = await area_collection.find({}).toArray();
            res.json({ areas: areas });
        } else {
            const areas = await area_collection.find({
                $or: [
                    {category: {$regex: query, $options: "i"}},
                    {title: {$regex: query, $options: "i"}}
                ]
            }).toArray();
            res.json({ areas: areas });
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
    
})

export default router;