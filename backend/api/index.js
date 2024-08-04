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
//----------------------------------------------EXPRESS AND CORS CONFIGURATION-----------------------------------------------//

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: "https://rentify-gamma-nine.vercel.app/",
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
