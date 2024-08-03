import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { Star, Favorite } from "@mui/icons-material";
import { RentifyContext } from "../../../ContextProvider/RentifyContextProvider";
import { useNavigate } from "react-router";

const AreaCard = ({ area }) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(false);
  const { user, fetchWishlist, wishlist } = useContext(RentifyContext);

  useEffect(() => {
    if (wishlist.includes(area.areaId)) {
      setFavourite(true);
    }
  }, [wishlist, area.areaId]);

  const handleAddWishlist = async (event) => {
    event.stopPropagation();
    setFavourite(!favourite);
    const response = await fetch(
      `http://localhost:4000/api/wishlist/${user.userId}`,
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
      `http://localhost:4000/api/wishlist/${user.userId}`,
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
    <article
      className="card"
      onClick={() => navigate(`/areas/${area.areaId}`)}
    >
      <div className="card-content">
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

          <img
            src={area.images[0]}
            alt="house-img"
            width="280px"
            height="300px"
            loading="lazy"
          />
        </div>

        <h2 className="areaName">{area.area_details.title}</h2>
        <h5>{area.address.city}</h5>
        {area.area_details.price ? (
          <div className="price-rating">
            <p>&#8377;{area.area_details.price}</p>
            {area.ratings && (
              <p>
                <Star fontSize="inherit" />
                {area.ratings}
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
    </article>
  );
};

export default AreaCard;
