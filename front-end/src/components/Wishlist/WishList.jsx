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
     {wishlist.length > 0 ? <h1 className='wishlist_h1'>WishList</h1> : <h1 className='wishlist_h1'>No Wishlist Items found</h1>}
      {
        wishlist.length == 0 && <img className='wishlist_img' src='empty-wishlist-2.png'></img>
      }
      
      {
        wishlistItems.length > 0 && <div className='wishlist_container'> {wishlistItems.map((area,index) => (
            <WishListCard area={area} key={index} />
        ))
      }
      </div>
      }



    </div>
  )
}

export default WishList
