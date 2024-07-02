import { useEffect, useContext, useCallback } from 'react';
import { RentifyContext } from '../components/ContextProvider/RentifyContextProvider';

const useWishListEffect = (dependency) => {

    const {user,wishlist,fetchWishlistItems} = useContext(RentifyContext);

    useEffect(() => {
        const effect = async() => {
        if(user){
           
           await fetchWishlistItems();
        }
    }
    effect();
    },[wishlist])
}

export default useWishListEffect;
