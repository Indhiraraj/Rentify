import React, { useState } from "react";
import "./Categories.css";
import { categories } from "../../Data/data.jsx";

const Categories = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p className="categories_p">
        Step into a world of exceptional living spaces designed to match your
        unique lifestyle. Our top categories feature a curated selection of
        properties, from sleek urban apartments to luxurious villas. Whether
        you're seeking modern convenience, timeless elegance, or a blend of
        both, you'll find your perfect match here. Discover your new home today
        and experience the best in rental living.
      </p>

      <div className="categories_list">
        {
            categories.slice(0,6).map((category,index) => (
                <div className="category" key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    <img src={category.image} alt={category.label} />
                    <div className={`${hoveredIndex == index ? "overlay_hover" : "overlay"}`}></div>
                    <div className="category_text">
                        <div className="category_text_icon">{category.icon}</div>
                        <p>{category.label}</p>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Categories;
