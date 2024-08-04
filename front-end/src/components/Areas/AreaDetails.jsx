import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { facilities } from "../../Data/data";
import "./AreaDetails.css";
import Modal from "../CustomModal/Modal";
import { RentifyContext } from "../ContextProvider/RentifyContextProvider";
import { ThreeDots } from "react-loader-spinner";

const AreaDetails = () => {
  const { id } = useParams();
  const [area, setArea] = useState(null);
  const navigate = useNavigate();

  const { user } = useContext(RentifyContext);

  const [loading, setLoading] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      const response = await fetch(`https://rentify-backend-olive.vercel.app/api/areas/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArea(data.area);
      }
    };

    fetchArea();
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };

  const sendMail = async () => {
    if (!user) {
      setShowModal2(false);
      setShowModal(true);
      return;
    }
    setLoading(true);
    setShowModal2(false);
    const response = await fetch("https://rentify-backend-olive.vercel.app/api/sendMail", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userMail: user.email,
        ownerId: area.ownerId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setOwnerDetails(data.owner);
    } else {
      alert("Sorry, some error happened");
    }
    setLoading(false);
  };

  return (
    <>
      {area ? (
        <div className="area">
          <div className="area-container">
            <img src={area.images[0]} alt={area.area_details.title} />
            <div className="area-description">
              <h1>{area.area_details.title}</h1>
              <p>{area.area_details.description}</p>
              <p>&#8377;{area.area_details.price}</p>
              {loading ? (
                <button className="interested-button">
                  <ThreeDots
                    type="audio"
                    height="38"
                    fontSize="inherit"
                    width="30"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </button>
              ) : (
                <button
                  className="interested-button"
                  onClick={() => setShowModal2(true)}
                >
                  I'm Interested
                </button>
              )}
            </div>
          </div>

          <div className="area-highlights">
            <h2>
              {area.type} in {area.address.city},{area.address.state},
              {area.address.country}
            </h2>
            <p>
              {area.gbbb.guests} guests . {area.gbbb.bedrooms} bedrooms .{" "}
              {area.gbbb.beds} beds . {area.gbbb.bathrooms} bathrooms{" "}
            </p>
            <h3>{area.area_details.highlight}</h3>
            <p>{area.area_details.highlight_details}</p>
          </div>

          <div className="area-facilities">
            This place offers
            <div className="area-facilities-container">
              {area.user_facilities.map((facility, index) => {
                const user_facility = facilities.find(
                  (f) => f.label === facility
                );
                return (
                  user_facility && (
                    <div className="facility" key={index}>
                      <div className="facility_icon">{user_facility.icon}</div>
                      <p>{user_facility.label}</p>
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <Modal show={showModal} onClose={closeModal}>
            <p>Login to get owner details</p>
            <button className="modal-button" onClick={() => navigate("/login")}>Login</button>
          </Modal>

          <Modal show={showModal2} onClose={closeModal2}>
            <p>Send me the owner details</p>
            <button className="modal-button" onClick={() => sendMail()}>send</button>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AreaDetails;
