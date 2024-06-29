import React, { useEffect, useState } from "react";
import "./tenant.css";
import AreaCard from "./user-flow-components/AreaCard/AreaCard";
import Navbar from "../Navbar/Navbar";



const Tenant = () => {
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:4000/areas");
        if (response.ok) {
          const data = await response.json();
          setAreas(data.areas);
        } else {
          console.error("Error fetching areas");
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  return (
    <div className="tenant">
      
      {areas ? (
        <div className="areas">
          {areas.map((area) => (
            <AreaCard
              key={area.areaId}
              areaName={area.name}
              areaImg={area.img}
              ownerId={area.ownerId}
              areaId={area.areaId}
              ratings={area.ratings?.averageRating}
              address={area.address}
              price={area.priceRange}
            />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Tenant;
