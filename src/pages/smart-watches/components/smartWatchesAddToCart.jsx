import React from "react";

const SmartWatchesAddToCart = () => {
  return (
    <section
      className="max-w-7xl mx-auto p-4"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Buy Apple Watch</h2>
      <p className="text-gray-700 mb-2">
        Experience a new level of connectivity and health monitoring with the Apple Watch.
        From calls and texts on your wrist to advanced features like ECG and blood oxygen
        monitoring, Apple Watch is your perfect companion for a busy, active lifestyle.
      </p>
      <p className="text-lg font-semibold mb-4">Price: $399.99</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
        Add to Cart
      </button>
    </section>
  );
};

export default SmartWatchesAddToCart;
