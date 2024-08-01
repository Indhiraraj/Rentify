import React, { useContext, useEffect, useState } from 'react';
import './card.css';
import { Star, Favorite } from "@mui/icons-material";
import { RentifyContext } from '../../../ContextProvider/RentifyContextProvider';
import Modal from '../../../CustomModal/Modal';
import { useNavigate } from 'react-router';



const AreaCard = ({area}) => {
    const navigate = useNavigate()
    const [favourite, setFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState(null);
    const { user,fetchWishlist,wishlist } = useContext(RentifyContext);
    const [showModal,setShowModal] = useState(false);

    useEffect(()=>{
        if (wishlist.includes(area.areaId)) {
            setFavourite(true);
        }
    },[])

    const sendMail = async () => {
        if(!user){
            setShowModal(true);
            return;
        }
        setLoading(true);
        
        const response = await fetch("http://localhost:4000/api/sendMail", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                userMail: user.email,
                ownerId: area.ownerId
            })
        });

        if (response.ok) {
            const data = await response.json();
            setOwnerDetails(data.owner);
            setPopupOpen(true);
        } else {
            alert("Sorry, some error happened");
        }
        setLoading(false);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const closePopup = () => {
        setPopupOpen(false);
    }

    const handleAddWishlist = async () => {
        setFavourite(!favourite);
        const response = await fetch(`http://localhost:4000/api/wishlist/${user.userId}`,{
            method: "POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({
                area : area.areaId
            })
        });
        await fetchWishlist();
        

    }

    const handleRemoveWishlist = async () => {
        setFavourite(!favourite);
        const response = await fetch(`http://localhost:4000/api/wishlist/${user.userId}`,{
            method: "DELETE",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({
                area : area.areaId
            })
        });
        await fetchWishlist();
        
    }

    return (
        <article className={`card ${popupOpen ? 'card-popup-open' : ''}`}>
            <div className="card-content">
                <div className='img-icon'>
                {favourite ? (
                    <Favorite onClick={() => handleRemoveWishlist()} className="fav-icon fav-icon-full" />
                ) : (
                    <Favorite onClick={() => handleAddWishlist()} className="fav-icon fav-icon-border" />
                )}

                <img src={area.images[0]} alt='house-img' width="280px" height="300px" loading='lazy'></img>
                </div>
                
                <h2 className='areaName'>{area.area_details.title}</h2>
                <h5>{area.address.city}</h5>
                {area.area_details.price ? (
                    <div className="price-rating">
                        <p>&#8377;{area.area_details.price}</p>
                        {area.ratings && <p><Star fontSize='inherit'/>{area.ratings}</p>}
                    </div>
                ) : (
                    <div className="price-rating">
                        <p>Negotiable</p>
                        {area.ratings && <p><Star fontSize='inherit'/>{area.ratings}</p>}
                    </div>
                )}
                <div className='bottom'>
                    {loading ? <button>Loading...</button> : <button onClick={sendMail}>I'm Interested</button>}
                </div>
            </div>

            {popupOpen &&
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>Owner Details</h2>
                        <p>Owner Name: {ownerDetails.userName}</p>
                        <p>Email: {ownerDetails.email}</p>
                        <p>Contact: {ownerDetails.contact}</p>
                        <p className='info'>The owner details has also been <a target='_blank' href='https://mail.google.com/mail/u/0/'>mailed</a> to you</p>
                    </div>
                </div>
            }

            <Modal show={showModal} onClose={closeModal}>
            <p>Login to get owner details</p>
            <button onClick={()=>navigate("/login")}>Login</button>
            </Modal>
        </article>
    )
}

export default AreaCard;
