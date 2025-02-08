import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ image, label, route }) => {
  const button = (
    <button className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white px-4 py-1 text-sm md:text-base font-medium uppercase tracking-wide bg-transparent hover:bg-white hover:text-black transition duration-300 w-40 md:w-48">
      {label}
    </button>
  );

  return (
    <div 
      className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden"
      data-aos="zoom-in-up"
      data-aos-duration="1500"
      data-aos-easing="ease-out-back"
    >
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover"
      />
      {route ? <Link to={route}>{button}</Link> : button}
    </div>
  );
};

export default ProductCard;
