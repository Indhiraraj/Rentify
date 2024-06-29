import React from "react";
import "./reviewCard.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReviewCard = (props) => {
  return (
    <div className="review-card">
      <div className="user-profile">
          <AccountCircleIcon/>
        <p className="user-name">{props.userName}</p>
      </div>
        <div className="review">
            <p><span>&#10077;</span>{props.review}&#10078;</p>
        </div>
    </div>
  );
};

export default ReviewCard;
