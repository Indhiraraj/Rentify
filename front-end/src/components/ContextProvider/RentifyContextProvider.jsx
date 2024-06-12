import React, { createContext, useState } from 'react'
import AuthServiceProvider from '../AuthService/AuthServiceProvider';

const RentifyContext = createContext();

const RentifyContextProvider = ({children}) => {
    const [user,setUser] = useState(AuthServiceProvider.getUser());
    const [formData,setFormData] = useState(
      {
          userName:"",
          email:"",
          contact:"",
          type:"tenant",
          password:""
      })

    const login = (userData)=>{
      AuthServiceProvider.login(userData);
        setUser(userData)
    }

    const logout = ()=>{
      AuthServiceProvider.logout();
        setUser(null)
    }
  return (
    <RentifyContext.Provider value={{login,logout,user,formData,setFormData}}>
        {children}
    </RentifyContext.Provider>
  )
}

export  {RentifyContextProvider,RentifyContext}
