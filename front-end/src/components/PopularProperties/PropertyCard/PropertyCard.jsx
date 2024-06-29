import React, { useState } from "react";
import "./propertyCard.css";
import { Star, Favorite } from "@mui/icons-material";

const PropertyCard = (props) => {
  const [favourite, setFavourite] = useState(false);
  return (
    <div className="property-card">
      <div className="img-icon">
        {favourite ? (
          <Favorite onClick={() => setFavourite(!favourite)} className="fav-icon fav-icon-full" />
        ) : (
          <Favorite onClick={() => setFavourite(!favourite)} className="fav-icon fav-icon-border" />
        )}
        <img src={props.areaImg} alt={props.areaName} />
      </div>

      <h3>{props.areaName}</h3>
      <h5>{props.address}</h5>
      {props.price ? (
        <div className="price-rating">
          <p>{props.price}</p>
          {props.ratings && (
            <p>
              <Star fontSize="inherit" />
              {props.ratings}
            </p>
          )}
        </div>
      ) : (
        <div className="price-rating">
          <p>Negotiable</p>
          {props.ratings && (
            <p>
              <Star fontSize="inherit" />
              {props.ratings}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
