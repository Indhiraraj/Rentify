import React, { useContext, useEffect, useState } from "react";
import "./propertyCard.css";
import { Star, Favorite } from "@mui/icons-material";
import { RentifyContext } from "../../ContextProvider/RentifyContextProvider";

const PropertyCard = (props) => {
  const [favourite, setFavourite] = useState(false);
  const {user,wishlist,fetchWishlist} = useContext(RentifyContext);

  useEffect(() => {
    if ( wishlist && wishlist.includes(props.areaId)) {
      setFavourite(true)
    }
  },[wishlist])

 

  const handleAddWishlist = async () => {
    setFavourite(!favourite);
    const response = await fetch(`http://localhost:4000/wishlist/${user.userId}`,{
        method: "POST",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({
            area : props.areaId
        })
    });
    await fetchWishlist();

}

const handleRemoveWishlist = async () => {
    setFavourite(!favourite);
    const response = await fetch(`http://localhost:4000/wishlist/${user.userId}`,{
        method: "DELETE",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({
            area : props.areaId
        })
    });
    await fetchWishlist();
    
}
  return (
    <div className="property-card">
      <div className="img-icon">
        {favourite ? (
          <Favorite onClick={() => handleRemoveWishlist()} className="fav-icon fav-icon-full" />
        ) : (
          <Favorite onClick={() => handleAddWishlist()} className="fav-icon fav-icon-border" />
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
