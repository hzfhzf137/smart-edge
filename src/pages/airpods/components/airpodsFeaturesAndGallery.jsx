import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import icon3D from "../../../assets/images/3dIcon.png";
import axios from "axios";

const AirpodsFeaturesAndGallery = () => {
  const [images, setImages] = useState([]); // Initialize as empty array
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/airpods pro`);
        if (Array.isArray(res.data.galleryImages)) {
          setImages(res.data.galleryImages);
        } else if (typeof res.data.galleryImages === "string") {
          const parsed = JSON.parse(res.data.galleryImages);
          if (Array.isArray(parsed)) {
            setImages(parsed);
          } else {
            console.error("Parsed galleryImages is not an array:", parsed);
          }
        } else {
          console.error("galleryImages is not an array:", res.data.galleryImages);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchImages();
  }, []);

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
      {/* Features Section */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Wireless and effortless listening</li>
          <li>High-fidelity audio quality</li>
          <li>Seamless pairing with Apple devices</li>
          <li>Up to 24 hours of battery life with charging case</li>
        </ul>
      </div>

      {/* Gallery Section */}
      <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
        {/* Image */}
        {images.length > 0 ? (
          <div className="w-full max-w-md mx-auto">
            <img
              src={images[currentIndex]}
              alt={`AirPods Slide ${currentIndex + 1}`}
              className="w-full max-h-64 object-contain transition duration-300"
            />
          </div>
        ) : (
          <p>Loading images...</p>
        )}

        {/* Arrows */}
        {images.length > 0 && (
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
        )}

        {/* Dots */}
        {Array.isArray(images) && (
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
        )}

        {/* 3D Link */}
        <div className="mt-4">
          <Link
            to="/airpods-3d"
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

export default AirpodsFeaturesAndGallery;
