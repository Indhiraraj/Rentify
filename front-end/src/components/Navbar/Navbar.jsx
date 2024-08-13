import React, { useContext, useState } from 'react'
import { IconButton } from '@mui/material'
import { Search,Person,Menu } from "@mui/icons-material"
import { RentifyContext } from '../ContextProvider/RentifyContextProvider'
import "./Navbar.css"
import { useNavigate } from 'react-router'
import Modal from '../CustomModal/Modal'

const Navbar = () => {
    const {user,logout,search} = useContext(RentifyContext);
    const [searchText,setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [dropdown,setDropdown] = useState(false);
    const OpenModal = (index) => {
      setShowModal(true);
      setPhotoIndex(index);
    };
  
    const CloseModal = () => {
      setShowModal(false);
    };

    const handleChange = (e) => {
      setSearchText(e.target.value);
    }

  return (
    <div className='navbar'>
      <a className='logo-container' onClick={() => navigate("/")}>
        <img className='rentify-logo' src='/rentify-logo-1.png'></img> <p>Rentify</p>
      </a>

      <div className='navbar-search'>
        <input type='text' value={searchText} onChange={handleChange} placeholder='Search...'></input>
        <IconButton onClick={async () => {
          await search(searchText);
          navigate('/searchResult')
        }}
          >
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
      {user ? 
        <p onClick={() => navigate("/postArea")}>Rent</p>
        :
        <p onClick={() => {
          setShowModal(true);
        }}>Rent</p>}
        
      </div>
<div className='navbar-right-accountcontainer'>
      <button className='navbar-right-account' onClick={() => setDropdown(!dropdown)}>
        <Menu sx={{color:"#333"}}/>
        {/* <Person sx={{color:"#333"}}/> */}
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
            <li onClick={() => {navigate("/wishlist")}}>
                WishList
            </li>
            <li onClick={() => logout()}>
                Log out
            </li>
        </ul>
    )}
</div>

<Modal show={showModal} onClose={CloseModal}>
        <p className='modal-p'>Login to post your property...</p>
        <button className='modal-button' onClick={() => navigate("/login")}>login</button>
      </Modal>
    </div>
  )
}

export default Navbar
