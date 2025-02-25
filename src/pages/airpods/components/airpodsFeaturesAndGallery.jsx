import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import airpodsSliderImg1 from "../../../assets/images/airpodsSliderImg1.jpg";
import airpodsSliderImg2 from "../../../assets/images/airpodsSliderImg2.jpg";
import airpodsSliderImg3 from "../../../assets/images/airpodsSliderImg3.jpg";
import airpodsSliderImg4 from "../../../assets/images/airpodsSliderImg4.jpg";

const AirpodsFeaturesAndGallery = () => {
  // Array of images for the slider
  const images = [
    airpodsSliderImg1,
    airpodsSliderImg2,
    airpodsSliderImg3,
    airpodsSliderImg4,
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
        <div className="relative w-full max-w-md h-64 overflow-hidden">
          {/* Display current slide */}
          <img
            src={images[currentIndex]}
            alt={`AirPods Slide ${currentIndex + 1}`}
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

export default AirpodsFeaturesAndGallery;
