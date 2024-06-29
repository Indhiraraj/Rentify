import React, { useEffect, useState } from "react";
import "./ownerArea.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router";

const OwnerAreaCard = (props) => {
  const navigate = useNavigate();


  const handleRemoveArea = async () => {
    const response = await fetch(
      `http://localhost:4000/area/remove/${props.areaId}`,{
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (data.message === "success") {
      props.removeArea(props.areaId);
    }
  };

  

  const handleEditAction = () => {
  
    navigate("/areaEdit", { state: { areaId: props.areaId } });
  };

  return (
    <article className="area-card">
      <img
        src={props.areaImg}
        alt="house-img"
        width="280px"
        height="300px"
      ></img>
      <h2 className="areaName">{props.areaName}</h2>
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
