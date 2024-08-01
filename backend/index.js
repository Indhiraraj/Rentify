import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./api/authentication/auth.js";
import userRouter from "./api/user/user.js";
import areaRouter from "./api/area/area.js";
import mailRouter from "./api/mail/mail.js";
import verificationRouter from "./api/verification/verify.js";
import wishlistRouter from "./api/wishlist/wishlist.js";
import userReviewRouter from "./api/reviews/userReviews.js";
//----------------------------------------------EXPRESS AND CORS CONFIGURATION-----------------------------------------------//

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,HEAD,PATCH,DELETE",
  // credentials: true,
  optionsSuccessStatus: 204,
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

//----------------------------------------------PORT-----------------------------------------------//

const port = 4000;

app.listen(process.env.PORT || port, "0.0.0.0", () => {
  console.log("Server started");
});
