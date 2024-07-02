import React, { useContext, useEffect, useState } from 'react';
import "./popularProperties.css";
import PropertyCard from './PropertyCard/PropertyCard';
import { RentifyContext } from '../ContextProvider/RentifyContextProvider';

const PopularProperties = () => {
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
    <div className='popular-properties'>
      {areas && areas.map((area, index) => (
        <PropertyCard ratings={area.ratings?.averageRating} areaId = {area.areaId} address={area.address} areaName={area.name} areaImg={area.img} price={area.priceRange} key={index} />
      ))}
    </div>
  );
}

export default PopularProperties;
