import React from "react";
import aboutImage from "../../../assets/images/aboutImage.jfif";

const AboutUs = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={aboutImage}
        alt="About Us"
        className="object-cover w-full h-full"
      />

      {/* Text Content Container with AOS Animation */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 sm:ml-5"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="p-4 sm:p-6 md:p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/4 backdrop-blur-sm rounded-lg text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            About Us
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl"
            style={{ textAlign: "justify" }}
          >
            Welcome to our store, where innovation meets quality. We provide premium tech accessories designed to enhance your everyday life. Discover a wide range of items that empower you to live smarter, stay connected, and embrace the future of technology. Explore our collection and experience excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
