import React, { useContext, useState } from 'react';
import './card.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { RentifyContext } from '../../../ContextProvider/RentifyContextProvider';

const AreaCard = (props) => {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [ownerDetails, setOwnerDetails] = useState(null);
    const { user } = useContext(RentifyContext);

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

    return (
        <article className={`card ${popupOpen ? 'card-popup-open' : ''}`}>
            <div className="card-content">
                <img src={props.areaImg} alt='house-img' width="280px" height="300px"></img>
                <h2 className='areaName'>{props.areaName}</h2>
                <div className='bottom'>
                    {loading ? <button>Loading...</button> : <button onClick={sendMail}>I'm Interested</button>}
    
                    <div className='like-icon' onClick={() => setLiked(!liked)}>
                        {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    </div>
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
