import React, { useContext, useState } from 'react'
import { IconButton } from '@mui/material'
import { Search,Person,Menu } from "@mui/icons-material"
import { RentifyContext } from '../ContextProvider/RentifyContextProvider'
import "./Navbar.css"
import { useNavigate } from 'react-router'

const Navbar = () => {
    const {user,logout} = useContext(RentifyContext);
    const navigate = useNavigate();
    const [dropdown,setDropdown] = useState(false);
  return (
    <div className='navbar'>
      <a className='logo-container' onClick={() => navigate("/")}>
        <img className='rentify-logo' src='rentify-logo-1.png'></img> <p>Rentify</p>
      </a>

      <div className='navbar-search'>
        <input type='text' placeholder='Search...'></input>
        <IconButton>
        <Search
      className='search-icon'
      sx={{
        color: '#1ca4ff',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    />
        </IconButton>
      </div>

      <div className='navbar-right'>
        <p onClick={() => navigate("/buy")}>Buy</p>
      </div>

      <div className='navbar-right'>
        <p onClick={() => navigate("/rent")}>Rent</p>
      </div>
<div className='navbar-right-accountcontainer'>
      <button className='navbar-right-account' onClick={() => setDropdown(!dropdown)}>
        <Menu sx={{color:"#333"}}/>
        <Person sx={{color:"#333"}}/>
      </button>

    {dropdown && !user && (
        <ul>
            <li onClick={()=> navigate("/login")}>
                Log in
            </li>
            <li onClick={()=> navigate("/register")}>
                Sign up
            </li>
        </ul>
   
    )}

{dropdown && user && (
        <ul>
            <li onClick={() => navigate("/rent")}>
                Properties
            </li>
            <li onClick={() => navigate("/wishlist")}>
                WishList
            </li>
            <li onClick={() => logout()}>
                Log out
            </li>
        </ul>
    )}
</div>
    </div>
  )
}

export default Navbar
