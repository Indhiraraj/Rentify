import React, { useContext, useState } from 'react';
import "./WishListCard.css";
import { Favorite, Star } from '@mui/icons-material';
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';
import { useNavigate } from 'react-router';

const WishListCard = ({area}) => {
  const navigate = useNavigate();
    const [favourite,setFavourite] = useState(area.iswishlistItem);
    const {user,fetchWishlist} = useContext(RentifyContext);

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
    <div className="wishlist-card" onClick={() => navigate(`/areas/${area.areaId}`)}>
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

        <img src={area.images[0]} alt={area.area_details.title} />
      </div>

      <h3>{area.area_details.title}</h3>
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
  )
}

export default WishListCard
