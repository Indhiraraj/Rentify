import express from "express"
// import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion } from "mongodb";

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

router.get("/user/:userId", async (req, res) => {
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
  
  router.get("/", async (req, res) => {
    const area_collection = db.collection("areas");
    const areas = await area_collection.find({}).toArray();
    res.json({ areas: areas });
  });
  
  router.get("/:areaId", async (req, res) => {
    const area_collection = db.collection("areas");
    const area = await area_collection.findOne({ areaId: req.params.areaId });
    if (area) {
      res.status(200).json({ message: "Success", area: area });
    } else {
      res.status(500).json({ message: "Area not found" });
    }
  });
  
  router.delete("/remove/:areaId", async (req, res) => {
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
  
  router.put("/area", async (req, res) => {
    try {
      let area = req.body;
     
      const area_collection = db.collection("areas");
      const filter = { areaId: area.areaId };
  
        
       
        area = {
          $set: area,
        };
      
      // console.log(area);
      await area_collection.updateOne(filter, area);
      
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error, couldn't upload area" });
    }
  });
  
  router.post("/area",  async (req, res) => {
    try {
      let area = req.body;
      const area_collection = db.collection("areas");
      area = { ...area, areaId: crypto.randomUUID() };
      
      await area_collection.insertOne(area);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error, couldn't upload area" });
    }
  });

  export default router;