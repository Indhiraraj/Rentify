import React, { useContext, useEffect, useRef, useState } from "react";
import "./owner.css";
import { RentifyContext } from "../ContextProvider/RentifyContextProvider";
import { useNavigate } from "react-router";
import AreaCard from "./user-flow-components/AreaCard/AreaCard";
import OwnerAreaCard from "./user-flow-components/OwnerArea/OwnerAreaCard";

const Owner = () => {
  const [areas, setAreas] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(RentifyContext);
  const navigate = useNavigate();
  const areaRefs = useRef([]);

  useEffect(() => {
    const getAreas = async () => {
      const response = await fetch(
        `http://localhost:4000/user/${user.userId}/areas`
      );

      if (response.ok) {
        const data = await response.json();
        if (!(data.areas.length === 0)) {
          setAreas(data.areas);
        }
        setLoading(false);
      } else {
        alert("Couldn't get Areas, try later");
        setLoading(false);
      }
    };

    getAreas();
  }, []);

  const handleClick = () => {
    navigate("/areaRegistration");
  };

  const handleRemoveArea = (areaId) => {
    setAreas(areas.filter((area) => area.areaId !== areaId));
  };

  return (
    <div className="owner">
      <button className="add" onClick={handleClick}>
        Add Areas
      </button>
      {areas ? (
        <div className="areas-container">
          <h3>Your Areas</h3>
          <div className="areas">
            {areas.map((area) => (
              <OwnerAreaCard
                key={area.areaId}
                areaName={area.name}
                areaImg={area.img}
                ownerId={area.ownerId}
                areaId={area.areaId}
                removeArea={handleRemoveArea}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>Currently you have 0 areas uploaded</p>
          )}
        </>
      )}
    </div>
  );
};

export default Owner;
