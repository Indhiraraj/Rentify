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

router.get("/:userId", async (req, res) => {
  const wishlist_collection = db.collection("wish-list");
  const userId = req.params.userId;
  try {
    const wishlist = wishlist_collection.find({ userId: userId });
    const wishlist_data = await wishlist.toArray();
    res.status(200).json({ wishlist: wishlist_data[0] });
  } catch (error) {
    res.status(400).json({ message: "Wishlist not found, try later" });
  }
});

router.post("/:userId", async (req, res) => {
  const wishlist_collection = db.collection("wish-list");
  const userId = req.params.userId;

  try {
    const wishlist_data = await wishlist_collection.findOne({ userId: userId });

    if (wishlist_data) {
      const filter = { userId: userId };
      const updated_wishlist_data = {
        $set: {
          ...wishlist_data,
          areas: [...wishlist_data.areas, req.body.area],
          updatedAt: Date.now(),
        },
      };

      await wishlist_collection.updateOne(filter, updated_wishlist_data);
    } else {
      const wishlist = {
        userId: userId,
        areas: [req.body.area],
        createdAt: Date.now(),
      };
      await wishlist_collection.insertOne(wishlist);
    }
    res.status(200).json({ message: "wishlist addedd successfully" });
  } catch (error) {
    res.status(400).json({ message: "Wishlist not found, try later" });
  }
});

router.delete("/:userId", async (req, res) => {
  const wishlist_collection = db.collection("wish-list");
  const userId = req.params.userId;
  try {
    const wishlist_data = await wishlist_collection.findOne({ userId: userId });

    if (wishlist_data) {
      const filter = { userId: userId };
      const updated_wishlist_data = {
        $set: {
          ...wishlist_data,
          areas: wishlist_data.areas.filter((area) => area != req.body.area),
          updatedAt: Date.now(),
        },
      };

      await wishlist_collection.updateOne(filter, updated_wishlist_data);
      res.status(200).json({ message: "success" });
    } else {
      throw new Error("Wishlist not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
