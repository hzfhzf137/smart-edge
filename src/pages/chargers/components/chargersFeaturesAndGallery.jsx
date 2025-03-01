import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import magSafeChargerSliderImg1 from "../../../assets/images/magSafeChargerSliderImg1.jpg";
import magSafeChargerSliderImg2 from "../../../assets/images/magSafeChargerSliderImg2.jpg";
import magSafeChargerSliderImg3 from "../../../assets/images/magSafeChargerSliderImg3.jpg";
import magSafeChargerSliderImg4 from "../../../assets/images/magSafeChargerSliderImg4.jpg";
import magSafeChargerSliderImg5 from "../../../assets/images/magSafeChargerSliderImg5.jpg";
import magSafeChargerSliderImg6 from "../../../assets/images/magSafeChargerSliderImg6.jpg";

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">MagSafe Charger Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Up to 15W fast wireless charging for iPhone</li>
          <li>Automatic magnetic alignment for a perfect fit</li>
          <li>Works with Qi-certified devices for versatile charging</li>
          <li>Compact, lightweight design for travel</li>
          <li>Durable Apple-quality cable and sleek finish</li>
        </ul>
      </div>

      {/* Slider Gallery on the Right */}
      <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-md h-64 overflow-hidden">
          {/* Display current slide */}
          <img
            src={images[currentIndex]}
            alt={`MagSafe Charger Slide ${currentIndex + 1}`}
            className="w-full h-full object-contain transition duration-300"
          />

          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            <FaArrowLeft />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Optional: Slide Indicators */}
        <div className="flex space-x-2 mt-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChargersFeaturesAndGallery;
