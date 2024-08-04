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

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/areas", areaRouter);
app.use("/sendMail", mailRouter);
app.use("/verification", verificationRouter);
app.use("/wishlist", wishlistRouter);
app.use("/user-reviews", userReviewRouter);

//----------------------------------------------PORT-----------------------------------------------//

const port = 4000;

app.listen(process.env.PORT || port, "0.0.0.0", () => {
  console.log("Server started");
});
