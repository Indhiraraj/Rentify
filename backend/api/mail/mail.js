import express from "express";
import { sendOwnerData,fetchUserData } from "../../utilities/utilities.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const userEmail = req.body.userMail;
    const ownerId = req.body.ownerId;
  
    const ownerDetails = await fetchUserData(ownerId);
  
    try {
      if (!ownerDetails) {
        console.log("user not found");
        return res.status(404).json({ message: "user not found" });
      }
  
      await sendOwnerData(userEmail,ownerDetails);
  
      res
        .status(200)
        .json({ message: "successfully sent email", owner: ownerDetails });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  export default router;