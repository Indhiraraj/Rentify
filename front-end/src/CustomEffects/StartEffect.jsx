import { useEffect, useContext, useCallback } from 'react';
import { RentifyContext } from '../components/ContextProvider/RentifyContextProvider';

const useStartEffect = (dependency) => {

    const {user,fetchWishlist} = useContext(RentifyContext);

    useEffect(() => {
        const effect = async() => {
        if(user){
           await fetchWishlist()
        }
    }
    effect();
    },[user])
}

export default useStartEffect;
