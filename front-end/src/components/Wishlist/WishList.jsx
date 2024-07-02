import React, { useContext, useEffect } from 'react'
import "./Wishlist.css"
import { RentifyContext } from '../ContextProvider/RentifyContextProvider'
import useWishListEffect from '../../CustomEffects/WishListEffect';
import WishListCard from '../WishListCard/WishListCard';

const WishList = () => {
    const {wishlist,wishlistItems} = useContext(RentifyContext);
    
    useWishListEffect("wishlistItems")

  return (
    <div className='wishlist'>
     {wishlistItems.length > 0 ? <h1 className='wishlist_h1'>WishList</h1> : <h1 className='wishlist_h1'>No Wishlist Items found</h1>}
      {
        wishlistItems.length == 0 && <img className='wishlist_img' src='empty-wishlist-3.png'></img>
      }
      
      {
        wishlistItems.length > 0 && <div className='wishlist_container'> {wishlistItems.map((area,index) => (
            <WishListCard ratings={area.ratings?.averageRating} areaId = {area.areaId} address={area.address} areaName={area.name} areaImg={area.img} price={area.priceRange} iswishlistItem={area.iswishlistItem} key={index} />
        ))
      }
      </div>
      }



    </div>
  )
}

export default WishList
