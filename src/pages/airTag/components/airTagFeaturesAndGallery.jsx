import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import airTagSliderImg1 from "../../../assets/images/airTagSliderImg1.jpg";
import airTagSliderImg2 from "../../../assets/images/airTagSliderImg2.jpg";
import airTagSliderImg3 from "../../../assets/images/airTagSliderImg3.webp";
import icon3D from "../../../assets/images/3dIcon.png";


const AirTagFeaturesAndGallery = () => {
  const images = [
    airTagSliderImg1,
    airTagSliderImg2,
    airTagSliderImg3,

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Apple AirTag Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Effortlessly track and locate lost items using the Find My app</li>
          <li>Ultra-wideband precision finding with iPhone 11 and later</li>
          <li>Compact and lightweight design fits easily on keys, bags, and more</li>
          <li>Replaceable battery lasts over a year</li>
          <li>Water and dust resistant (IP67 rated) for everyday use</li>
        </ul>
      </div>


      {/* Slider Gallery on the Right */}
      <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
        {/* Image Container */}
        <div className="w-full max-w-md mx-auto">
          <img
            src={images[currentIndex]}
            alt={`Apple AirTag Slide ${currentIndex + 1}`}
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
            to="/airTag-3d"
            className="text-blue-600 hover:underline inline-flex items-center space-x-2"
          >
            <span>Show in 3D</span>
            <img src={icon3D} alt="3D Logo" className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AirTagFeaturesAndGallery;
