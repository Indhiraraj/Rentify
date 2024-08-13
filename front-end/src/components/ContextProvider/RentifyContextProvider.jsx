import React, { createContext, useState } from "react";
import AuthServiceProvider from "../AuthService/AuthServiceProvider";

const RentifyContext = createContext();

const RentifyContextProvider = ({ children }) => {
  const [user, setUser] = useState(AuthServiceProvider.getUser());
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contact: "",
    type: "tenant",
    password: "",
  });

  const [reviews, setReviews] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItems, setWishListItems] = useState([]);
  const [resultAreas, setResultAreas] = useState([]);

  const fetchWishlistItems = async () => {
    if (wishlist) {
      const items = [];
      for (const element of wishlist) {
        const response = await fetch(
          `https://rentify-backend-olive.vercel.app/api/areas/${element}`
        );
        const data = await response.json();
        items.push({ ...data.area, iswishlistItem: true });
      }
      setWishListItems(items);
    }
  };

  const fetchWishlist = async () => {
    const response = await fetch(
      `https://rentify-backend-olive.vercel.app/api/wishlist/${user.userId}`
    );
    const data = await response.json();
    // console.log(data.wishlist.areas);
    setWishlist(data.wishlist.areas);
  };

  const search = async (key) => {
    try {
      const response = await fetch(`https://rentify-backend-olive.vercel.app/api/search/${key}`);
      const data = await response.json();
      setResultAreas(data.areas);
    } catch (error) {
      console.log("error: " + error);

    }

  }

  const login = (userData) => {
    AuthServiceProvider.login(userData);
    setUser(userData);
  };

  const logout = () => {
    AuthServiceProvider.logout();
    setUser(null);
    setWishListItems([]);
    setWishlist([]);
  };

  return (
    <RentifyContext.Provider
      value={{
        login,
        logout,
        user,
        formData,
        setFormData,
        reviews,
        setReviews,
        wishlist,
        fetchWishlist,
        wishlistItems,
        fetchWishlistItems,
        resultAreas,
        search
      }}
    >
      {children}
    </RentifyContext.Provider>
  );
};

export { RentifyContextProvider, RentifyContext };
