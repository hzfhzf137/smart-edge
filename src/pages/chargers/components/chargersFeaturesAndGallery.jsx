//src/pages/chargers/chargersFeaturesAndGallery.jsx

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // <-- import Link to navigate
import magSafeChargerSliderImg1 from "../../../assets/images/magSafeChargerSliderImg1.jpg";
import magSafeChargerSliderImg2 from "../../../assets/images/magSafeChargerSliderImg2.jpg";
import magSafeChargerSliderImg3 from "../../../assets/images/magSafeChargerSliderImg3.jpg";
import magSafeChargerSliderImg4 from "../../../assets/images/magSafeChargerSliderImg4.jpg";
import magSafeChargerSliderImg5 from "../../../assets/images/magSafeChargerSliderImg5.jpg";
import magSafeChargerSliderImg6 from "../../../assets/images/magSafeChargerSliderImg6.jpg";
import icon3D from "../../../assets/images/3dIcon.png";


const ChargersFeaturesAndGallery = () => {
  // Array of images for the slider
  const images = [
    magSafeChargerSliderImg1,
    magSafeChargerSliderImg2,
    magSafeChargerSliderImg3,
    magSafeChargerSliderImg4,
    magSafeChargerSliderImg5,
    magSafeChargerSliderImg6,
  ];

  // Current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers for next/prev slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section
      className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Features on the Left */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Wireless and effortless listening</li>
          <li>High-fidelity audio quality</li>
          <li>Seamless pairing with Apple devices</li>
          <li>Up to 24 hours of battery life with charging case</li>
        </ul>
      </div>

      {/* Slider Gallery on the Right */}
      <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
        {/* Image Container */}
        <div className="w-full max-w-md mx-auto">
          <img
            src={images[currentIndex]}
            alt={`AirPods Slide ${currentIndex + 1}`}
            className="w-full max-h-64 object-contain transition duration-300"
          />
        </div>

        {/* Slider Arrows */}
        <div className="flex items-center justify-between w-full max-w-md mt-3">
          <button
            onClick={prevSlide}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex space-x-2 mt-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
        {/* 3D Model Link */}
        <div className="mt-4">
          <Link
            to="/magSafe-3d"
            className="text-blue-600 hover:underline inline-flex items-center space-x-2"
          >
            <span>Show in 3D</span>
            {/* If you have a 3D logo image, uncomment below and replace /3dlogo.png */}
            <img src={icon3D} alt="3D Logo" className="w-5 h-5" />
            {/* Or if you want an icon, you can use an icon library or a text-based logo */}
            {/* <span>(3D logo)</span> */}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChargersFeaturesAndGallery;
