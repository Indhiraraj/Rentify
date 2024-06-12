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
        name: "2 BHK Flat For Sale In Triplicane",
        img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
        ownerId: "dd10ff19-b9e1-4aea-98b8-956456e45bac",
        areaId: "1",
        address: "123 Anna Salai, Chennai",
        city: "Chennai",
        state: "Tamil Nadu",
        zipCode: "600002",
        size: "1500 sqft",
        type: "Residential",
        priceRange: "₹15000 - ₹20000",
        availability: "Available",
        facilities: ["Hospitals", "Schools", "Gym", "Swimming Pool", "Park"],
        publicTransport: ["Bus Stop - 200m", "Metro Station - 1km"],
        securityFeatures: ["Gated Community", "24/7 Security"],
        greenSpaces: ["Semmozhi Poonga", "Nageswara Rao Park"],
        internetProviders: ["Provider A - 100Mbps", "Provider B - 50Mbps"],
        mobileNetwork: "Excellent",
        ratings: {
            averageRating: 4.5,
            numberOfRatings: 120
        },
        reviews: [
            {
                author: "John Doe",
                review: "Great area with lots of amenities!"
            },
            {
                author: "Jane Smith",
                review: "Very family-friendly environment."
            }
        ],
        security_deposit: "₹1,000",
        available_from: "2024-07-01",
        lease_term: "12 months",
        bedrooms: "2",
        bathrooms: "1.5",
        square_footage: "900 sq ft",
        amenities: "Gym, Pool, Parking, Laundry in Building",
        pet_policy: "No Pets Allowed",
        parking: "1 Covered Spot",
        description: "Spacious apartment with modern amenities and great city views. Close to public transportation and shopping centers."
    },
    {
        name: "3.5 BHK Flat For Sale In Gandhipuram",
        img: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
        ownerId: "dd10ff19-b9e1-4aea-98b8-956456e45bac",
        areaId: "2",
        address: "456 Avinashi Road, Coimbatore",
        city: "Coimbatore",
        state: "Tamil Nadu",
        zipCode: "641018",
        size: "2000 sqft",
        type: "Residential",
        priceRange: "₹18000 - ₹22000",
        availability: "Available",
        facilities: ["Hospitals", "Railway Station", "Gym", "Library", "Park"],
        publicTransport: ["Bus Stop - 300m", "Railway Station - 1.5km"],
        securityFeatures: ["24/7 Security", "CCTV"],
        greenSpaces: ["VOC Park", "TNAU Botanical Garden"],
        internetProviders: ["Provider C - 200Mbps", "Provider D - 100Mbps"],
        mobileNetwork: "Good",
        ratings: {
            averageRating: 4.0,
            numberOfRatings: 100
        },
        reviews: [
            {
                author: "Alice Johnson",
                review: "Conveniently located near the railway station."
            },
            {
                author: "Bob Brown",
                review: "Hospitals are very accessible."
            }
        ],
        security_deposit: "₹1,000",
        available_from: "2024-07-01",
        lease_term: "12 months",
        bedrooms: "3",
        bathrooms: "2",
        square_footage: "1500 sq ft",
        amenities: "Gym, Pool, Parking, Laundry in Building",
        pet_policy: "Cats Allowed",
        parking: "2 Covered Spots",
        description: "Modern apartment with all amenities close to public transportation."
    },
    {
        name: "2 BHK Flat For Sale In Vadipatti.",
        img: "https://cms.interiorcompany.com/wp-content/uploads/2023/11/simple-house-design-go-for-minimalist.png",
        ownerId: "dd10ff19-b9e1-4aea-98b8-956456e45bac",
        areaId: "3",
        address: "789 Alagarkoil Road, Madurai",
        city: "Madurai",
        state: "Tamil Nadu",
        zipCode: "625002",
        size: "1800 sqft",
        type: "Residential",
        priceRange: "₹17000 - ₹21000",
        availability: "Available",
        facilities: ["Airport", "Schools", "Library", "Park", "Community Center"],
        publicTransport: ["Bus Stop - 400m", "Airport - 2km"],
        securityFeatures: ["Gated Community", "Neighborhood Watch"],
        greenSpaces: ["Madurai Corporation Eco Park", "Rajaji Park"],
        internetProviders: ["Provider E - 150Mbps", "Provider F - 75Mbps"],
        mobileNetwork: "Excellent",
        ratings: {
            averageRating: 4.2,
            numberOfRatings: 80
        },
        reviews: [
            {
                author: "Charlie Davis",
                review: "Close to the airport, very convenient for travel."
            },
            {
                author: "Dana White",
                review: "Good schools in the vicinity."
            }
        ],
        security_deposit: "₹1,000",
        available_from: "2024-07-01",
        lease_term: "12 months",
        bedrooms: "3",
        bathrooms: "2",
        square_footage: "1400 sq ft",
        amenities: "Gym, Pool, Parking, Laundry in Building",
        pet_policy: "Dogs Allowed",
        parking: "1 Covered Spot",
        description: "Lovely apartment near the airport and good schools.",
        contact_info: "Charlie Davis, charliedavis@example.com, (555) 765-4321"
    },
    {
        name: "1.5 BHK Flat For Sale In Tiruchirappalli",
        img: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
        ownerId: "dd10ff19-b9e1-4aea-98b8-956456e45bac",
        areaId: "4",
        address: "101 Rockfort Road, Tiruchirappalli",
        city: "Tiruchirappalli",
        state: "Tamil Nadu",
        zipCode: "620002",
        size: "1600 sqft",
        type: "Residential",
        priceRange: "₹16000 - ₹19000",
        availability: "Available",
        facilities: ["Medical", "Bus Stand", "Library", "Community Center", "Park"],
        publicTransport: ["Bus Stop - 150m", "Metro Station - 2km"],
        securityFeatures: ["24/7 Security", "Gated Community"],
        greenSpaces: ["Butterfly Park", "Kavery Park"],
        internetProviders: ["Provider G - 100Mbps", "Provider H - 50Mbps"],
        mobileNetwork: "Good",
        ratings: {
            averageRating: 4.1,
            numberOfRatings: 90
        },
        reviews: [
            {
                author: "Emily Green",
                review: "Peaceful and secure, great for families."
            },
            {
                author: "Frank Black",
                review: "Excellent community facilities."
            }
        ],
        security_deposit: "₹1,000",
        available_from: "2024-07-01",
        lease_term: "6 months",
        bedrooms: "2",
        bathrooms: "1",
        square_footage: "1000 sq ft",
        amenities: "Gym, Pool, Parking, Laundry in Building",
        pet_policy: "No Pets Allowed",
        parking: "1 Covered Spot",
        description: "Peaceful and secure community with excellent facilities."
    },
    {
        name: "2 BHK Flat For Sale In Valapady",
        img: "https://assets.architecturaldigest.in/photos/60083e76274aca243711c3a4/4:3/w_1024,h_768,c_limit/ghaziabad-uttar-pradesh-homes-photos-1366x768.jpg",
        ownerId: "dd10ff19-b9e1-4aea-98b8-956456e45bac",
        areaId: "5",
        address: "202 Gandhi Road, Salem",
        city: "Salem",
        state: "Tamil Nadu",
        zipCode: "636007",
        size: "1900 sqft",
        type: "Residential",
        priceRange: "₹17500 - ₹21000",
        availability: "Available",
        facilities: ["Hospitals", "Bus Stand", "Park", "Beach Access", "Gym"],
        publicTransport: ["Bus Stop - 250m", "Train Station - 3km"],
        securityFeatures: ["CCTV", "24/7 Security"],
        greenSpaces: ["Anna Park", "Yercaud Hills"],
        internetProviders: ["Provider I - 120Mbps", "Provider J - 60Mbps"],
        mobileNetwork: "Excellent",
        ratings: {
            averageRating: 4.3,
            numberOfRatings: 110
        },
        reviews: [
            {
                author: "George Martin",
                review: "Lovely area with easy access to amenities."
            },
            {
                author: "Hannah White",
                review: "Great facilities and good internet providers."
            }
        ],
        security_deposit: "₹1,000",
        available_from: "2024-07-01",
        lease_term: "12 months",
        bedrooms: "3",
        bathrooms: "2.5",
        square_footage: "1600 sq ft",
        amenities: "Gym, Pool, Parking, Laundry in Building",
        pet_policy: "Cats and Dogs Allowed",
        parking: "2 Covered Spots",
        description: "Spacious house with modern amenities and great views. Easy access to amenities."
    }
];


const area_collection = db.collection("areas");

for (const area of areas) {
    area._id = new ObjectId();

    // Iterate through reviews and update author names
    area.reviews.forEach((review) => {
      // Update author names as per your requirement
    //   console.log(review.author);
      switch (review.author) {
        case "John Doe":
            console.log("Updating John Doe");
          review.author = "Selvi";
          break;
        case "Jane Smith":
          review.author = "Selvan";
          break;
        case "Alice Johnson":
          review.author = "Surendhar";
          break;
        case "Bob Brown":
          review.author = "Mohanasundharam";
          break;
        case "Charlie Davis":
          review.author = "Dhiyanesh";
          break;
        case "Dana White":
          review.author = "Anand";
          break;
        case "Emily Green":
          review.author = "Karthi";
          break;
        case "Frank Black":
          review.author = "Jeyaraman";
          break;
        case "George Martin":
          review.author = "Kishor";
          break;
        case "Hannah White":
          review.author = "Manoj";
          break;
        case "Anna Berlin":
          review.author = "Syed";
          break;
        // Add cases for other author names if needed
      }
      console.log(review.author);
      console.log(areas[0].reviews[0].author);
    });
  }




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

