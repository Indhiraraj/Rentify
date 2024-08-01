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

const areas = [
  {
    "category": "Houses",
    "type": "An entire place",
    "gbbb": {
      "guests": 0,
      "bathrooms": 2,
      "bedrooms": 2,
      "beds": 2
    },
    "user_facilities": ["Gym", "Swimming Pool", "Park", "Hospitals", "Schools"],
    "address": {
      "street_address": "123 Anna Salai",
      "city": "Chennai",
      "state": "Tamil Nadu",
      "country": "India"
    },
    "area_details": {
      "title": "2 BHK Flat For Sale In Triplicane",
      "description": "Spacious apartment with modern amenities and great city views. Close to public transportation and shopping centers.",
      "highlight": "Great area with lots of amenities!",
      "highlight_details": "Very family-friendly environment.",
      "price": "15000"
    },
    "images": ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D"],
    "areaId": "1",
    "ownerId": "dd10ff19-b9e1-4aea-98b8-956456e45bac"
  },
  {
    "category": "Houses",
    "type": "An entire place",
    "gbbb": {
      "guests": 0,
      "bathrooms": 2,
      "bedrooms": 3,
      "beds": 3
    },
    "user_facilities": ["Hospitals", "Railway Station", "Gym", "Library", "Park"],
    "address": {
      "street_address": "456 Avinashi Road",
      "city": "Coimbatore",
      "state": "Tamil Nadu",
      "country": "India"
    },
    "area_details": {
      "title": "3.5 BHK Flat For Sale In Gandhipuram",
      "description": "Modern apartment with all amenities close to public transportation.",
      "highlight": "Conveniently located near the railway station.",
      "highlight_details": "Hospitals are very accessible.",
      "price": "18000"
    },
    "images": ["https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg"],
    "areaId": "2",
    "ownerId": "dd10ff19-b9e1-4aea-98b8-956456e45bac"
  },
  {
    "category": "Houses",
    "type": "An entire place",
    "gbbb": {
      "guests": 0,
      "bathrooms": 2,
      "bedrooms": 3,
      "beds": 3
    },
    "user_facilities": ["Airport", "Schools", "Library", "Park", "Community Center"],
    "address": {
      "street_address": "789 Alagarkoil Road",
      "city": "Madurai",
      "state": "Tamil Nadu",
      "country": "India"
    },
    "area_details": {
      "title": "2 BHK Flat For Sale In Vadipatti.",
      "description": "Lovely apartment near the airport and good schools.",
      "highlight": "Close to the airport, very convenient for travel.",
      "highlight_details": "Good schools in the vicinity.",
      "price": "17000"
    },
    "images": ["https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-house-design-go-for-minimalist.png"],
    "areaId": "3",
    "ownerId": "dd10ff19-b9e1-4aea-98b8-956456e45bac"
  },
  {
    "category": "Houses",
    "type": "An entire place",
    "gbbb": {
      "guests": 0,
      "bathrooms": 1,
      "bedrooms": 2,
      "beds": 2
    },
    "user_facilities": ["Medical", "Bus Stand", "Library", "Community Center", "Park"],
    "address": {
      "street_address": "101 Rockfort Road",
      "city": "Tiruchirappalli",
      "state": "Tamil Nadu",
      "country": "India"
    },
    "area_details": {
      "title": "1.5 BHK Flat For Sale In Tiruchirappalli",
      "description": "Peaceful and secure community with excellent facilities.",
      "highlight": "Peaceful and secure, great for families.",
      "highlight_details": "Excellent community facilities.",
      "price": "16000"
    },
    "images": ["https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"],
    "areaId": "4",
    "ownerId": "dd10ff19-b9e1-4aea-98b8-956456e45bac"
  },
  {
    "category": "Houses",
    "type": "An entire place",
    "gbbb": {
      "guests": 0,
      "bathrooms": 3,
      "bedrooms": 3,
      "beds": 3
    },
    "user_facilities": ["Hospitals", "Bus Stand", "Park", "Beach Access", "Gym"],
    "address": {
      "street_address": "202 Gandhi Road",
      "city": "Salem",
      "state": "Tamil Nadu",
      "country": "India"
    },
    "area_details": {
      "title": "2 BHK Flat For Sale In Valapady",
      "description": "Spacious house with modern amenities and great views. Easy access to amenities.",
      "highlight": "Lovely area with easy access to amenities.",
      "highlight_details": "Great facilities and good internet providers.",
      "price": "17500"
    },
    "images": ["https://assets.architecturaldigest.in/photos/60083e76274aca243711c3a4/4:3/w_1024,h_768,c_limit/ghaziabad-uttar-pradesh-homes-photos-1366x768.jpg"],
    "areaId": "5",
    "ownerId": "dd10ff19-b9e1-4aea-98b8-956456e45bac"
  }
];


const area_collection = db.collection("areas");

// for (const area of areas) {
//     area._id = new ObjectId();

//     // Iterate through reviews and update author names
//     area.reviews.forEach((review) => {
//       // Update author names as per your requirement
//     //   console.log(review.author);
//       switch (review.author) {
//         case "John Doe":
//             console.log("Updating John Doe");
//           review.author = "Selvi";
//           break;
//         case "Jane Smith":
//           review.author = "Selvan";
//           break;
//         case "Alice Johnson":
//           review.author = "Surendhar";
//           break;
//         case "Bob Brown":
//           review.author = "Mohanasundharam";
//           break;
//         case "Charlie Davis":
//           review.author = "Dhiyanesh";
//           break;
//         case "Dana White":
//           review.author = "Anand";
//           break;
//         case "Emily Green":
//           review.author = "Karthi";
//           break;
//         case "Frank Black":
//           review.author = "Jeyaraman";
//           break;
//         case "George Martin":
//           review.author = "Kishor";
//           break;
//         case "Hannah White":
//           review.author = "Manoj";
//           break;
//         case "Anna Berlin":
//           review.author = "Syed";
//           break;
//         // Add cases for other author names if needed
//       }
//       console.log(review.author);
//       console.log(areas[0].reviews[0].author);
//     });
//   }




async function insertAreas() {
  try {
    for (const area of areas) {
        area._id = new ObjectId();

      // Insert the area into the database
      await area_collection.insertOne(area);
    }
    console.log("All areas have been uploaded to the database.");
    await client.close(); // Close the MongoDB client connection
  } catch (error) {
    console.error(error.message);
  }
}

insertAreas();

