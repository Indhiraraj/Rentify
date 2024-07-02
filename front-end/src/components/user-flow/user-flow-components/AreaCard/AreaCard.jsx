import React, { useContext, useEffect, useState } from 'react';
import './card.css';
import { Star, Favorite } from "@mui/icons-material";
import { RentifyContext } from '../../../ContextProvider/RentifyContextProvider';



const AreaCard = (props) => {
    const [favourite, setFavourite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState(null);
    const { user,fetchWishlist,wishlist } = useContext(RentifyContext);

    useEffect(()=>{
        if (wishlist.includes(props.areaId)) {
            setFavourite(true);
        }
    },[])

    const sendMail = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:4000/sendMail", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                userMail: user.email,
                ownerId: props.ownerId
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

    const closePopup = () => {
        setPopupOpen(false);
    }

    const handleAddWishlist = async () => {
        setFavourite(!favourite);
        const response = await fetch(`http://localhost:4000/wishlist/${user.userId}`,{
            method: "POST",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({
                area : props.areaId
            })
        });
        await fetchWishlist();
        

    }

    const handleRemoveWishlist = async () => {
        setFavourite(!favourite);
        const response = await fetch(`http://localhost:4000/wishlist/${user.userId}`,{
            method: "DELETE",
            headers: {"content-type" : "application/json"},
            body: JSON.stringify({
                area : props.areaId
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

                <img src={props.areaImg} alt='house-img' width="280px" height="300px"></img>
                </div>
                
                <h2 className='areaName'>{props.areaName}</h2>
                <h5>{props.address}</h5>
                {props.price ? (
                    <div className="price-rating">
                        <p>{props.price}</p>
                        {props.ratings && <p><Star fontSize='inherit'/>{props.ratings}</p>}
                    </div>
                ) : (
                    <div className="price-rating">
                        <p>Negotiable</p>
                        {props.ratings && <p><Star fontSize='inherit'/>{props.ratings}</p>}
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
        </article>
    )
}

export default AreaCard;
