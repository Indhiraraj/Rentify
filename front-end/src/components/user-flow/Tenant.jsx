import React, { useEffect, useState } from "react";
import "./tenant.css";
import AreaCard from "./user-flow-components/AreaCard/AreaCard";
import { useNavigate } from "react-router";



const Tenant = () => {
  const [areas, setAreas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("https://rentify-backend-olive.vercel.app/api/areas");
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
              area={area}
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
