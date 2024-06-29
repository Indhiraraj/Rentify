import express from "express";
import bodyParser from "body-parser";
import { MongoClient, ObjectId, ServerApiVersion, } from "mongodb";

const uri =
  "mongodb+srv://indhiraraj7:msLEghAuHzCUgvRQ@cluster0.rpstvnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("rentify");

const app = express();

app.use(bodyParser.json());

const reviews = [
    {
        "userName": "RaviKumar",
        "review": "Rentify has completely transformed my house-hunting experience! The interface is clean and easy to navigate. I love how detailed the property listings are. The 'I'm Interested' button makes it so convenient to quickly reach out about properties I'm considering. Highly recommend!"
    },
    {
        "userName": "LakshmiPrasad",
        "review": "I've tried several real estate apps, but Rentify stands out with its simplicity and efficiency. The high-quality images give a great first impression of the properties. The only improvement I'd suggest is adding more filter options for a more tailored search experience."
    },
    {
        "userName": "VenkateshBabu",
        "review": "Rentify is fantastic! The personal touch of greeting users by name adds a nice touch. I found my new apartment through this app within days. The selection of properties is diverse and the information provided is very helpful. Keep up the great work!"
    },
    {
        "userName": "MeenaSundaram",
        "review": "I was impressed with how easy it was to use Rentify. The property images are high quality and the details provided are very comprehensive. The app made my search for a new home much less stressful. I would recommend it to anyone looking for a property."
    },
    {
        "userName": "ArunRaj",
        "review": "Rentify has a user-friendly design and a good selection of properties. I found the 'I'm Interested' button particularly useful for quickly expressing interest. The app could benefit from more advanced search filters, but overall, it's a great tool for house hunting."
    }
];

const review_collection = db.collection("reviews");

reviews.forEach(async review => {
    await review_collection.insertOne(review);
});


