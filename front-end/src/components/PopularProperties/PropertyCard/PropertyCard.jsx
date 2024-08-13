import React, { useContext, useEffect, useState } from "react";
import "./propertyCard.css";
import { Star, Favorite } from "@mui/icons-material";
import { RentifyContext } from "../../ContextProvider/RentifyContextProvider";
import { useNavigate } from "react-router";

const PropertyCard = ({area}) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  const {user,wishlist,fetchWishlist} = useContext(RentifyContext);

  useEffect(() => {
    if ( wishlist && wishlist.includes(area.areaId)) {
      setFavourite(true)
    }
  },[wishlist])

  const handleAddWishlist = async (event) => {
    event.stopPropagation();
    setFavourite(!favourite);
    const response = await fetch(
      `https://rentify-backend-olive.vercel.app/api/wishlist/${user.userId}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          area: area.areaId,
        }),
      }
    );
    await fetchWishlist();
  };

  const handleRemoveWishlist = async (event) => {
    event.stopPropagation();
    setFavourite(!favourite);
    const response = await fetch(
      `https://rentify-backend-olive.vercel.app/api/wishlist/${user.userId}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          area: area.areaId,
        }),
      }
    );
    await fetchWishlist();
  };

  return (
    <div className="property-card" onClick={() => navigate(`/areas/${area.areaId}`)}>
      <div className="img-icon">
      {favourite ? (
            <Favorite
              onClick={handleRemoveWishlist}
              className="fav-icon fav-icon-full"
            />
          ) : (
            <Favorite
              onClick={handleAddWishlist}
              className="fav-icon fav-icon-border"
            />
          )}
        <img src={area.images[0]} alt="img" />
      </div>

      <h3>{area.address.city}</h3>
      <h5>{area.address.state}</h5>
      {area.area_details.price ? (
        <div className="price-rating">
          <p>&#8377;{area.area_details.price}</p>
          {area.ratings && (
            <p>
              <Star fontSize="inherit" />
              {props.ratings}
            </p>
          )}
        </div>
      ) : (
        <div className="price-rating">
          <p>Negotiable</p>
          {area.ratings && (
            <p>
              <Star fontSize="inherit" />
              {area.ratings}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
