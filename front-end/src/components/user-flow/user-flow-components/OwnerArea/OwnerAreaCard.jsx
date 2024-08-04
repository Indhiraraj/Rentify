import React, { useEffect, useState } from "react";
import "./ownerArea.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router";

const OwnerAreaCard = ({area}) => {
  const navigate = useNavigate();


  const handleRemoveArea = async () => {
    const response = await fetch(
      `https://rentify-backend-olive.vercel.app/api/areas/remove/${area.areaId}`,{
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (data.message === "success") {
      // navigate("/");
      // console.log(area);
      // console.log(props);
      // props(area.areaId);
      area.removeArea(area.areaId);
      // area.(area.areaId);
    }
  };

  

  const handleEditAction = () => {
  
    // navigate("/areaEdit", { state: { areaId: area.areaId } });
  };

  return (
    <article className="area-card">
      <img
        src={area.images[0]}
        alt="house-img"
        width="280px"
        height="300px"
      ></img>
      <h2 className="areaName">{area.area_details.title}</h2>
      <div className="bottom">
        <button onClick={handleRemoveArea}>Remove</button>
        <div onClick={handleEditAction} className="edit-icon">
          <ModeEditIcon fontSize="inherit" />
        </div>
      </div>
    </article>
  );
};

export default OwnerAreaCard;
