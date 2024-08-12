import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import areaRouter from "../router/area/area.js"
import authRouter from  "../router/authentication/auth.js"
import mailRouter from "../router/mail/mail.js"
import userReviewRouter from "../router/reviews/userReviews.js"
import userRouter from "../router/user/user.js"
import verificationRouter from "../router/verification/verify.js"
import wishlistRouter from "../router/wishlist/wishlist.js"
import searchRouter from "../router/search/search.js"
import dotenv from 'dotenv';

dotenv.config();
//----------------------------------------------EXPRESS AND CORS CONFIGURATION-----------------------------------------------//

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

 // Load environment variables

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("Not allowed by CORS");
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: process.env.CORS_METHODS || "GET,PUT,POST,HEAD,PATCH,DELETE",
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: parseInt(process.env.CORS_SUCCESS_STATUS, 10) || 204,
};

app.use(cors(corsOptions));



//----------------------------------------------EXPRESS ROUTES-----------------------------------------------//

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/areas", areaRouter);
app.use("/api/sendMail", mailRouter);
app.use("/api/verification", verificationRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/user-reviews", userReviewRouter);
app.use("/api/search", searchRouter);

//----------------------------------------------PORT-----------------------------------------------//

const port = 4000;

app.listen(process.env.PORT || port, "0.0.0.0", () => {
  console.log("Server started");
});
