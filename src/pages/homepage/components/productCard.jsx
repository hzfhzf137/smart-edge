import React from "react";

const ProductCard = ({ image, label }) => {
  return (
    <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover"
      />
      <button className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white px-4 py-1 text-sm md:text-base font-medium uppercase tracking-wide bg-transparent hover:bg-white hover:text-black transition duration-300 w-40 md:w-48">
        {label}
      </button>
    </div>
  );
};

export default ProductCard;
