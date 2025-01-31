import React, { useState, useEffect } from "react";
import bgImage1 from "../../../assets/images/bgImg1.jfif";
import bgImage2 from "../../../assets/images/bgImg2.jfif";
import bgImage3 from "../../../assets/images/bgImg3.jfif";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [bgImage1, bgImage3, bgImage2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen">
      {/* Background Image Fixed */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          zIndex: -1,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-purple-800 text-center px-4">
        <h1 className="text-6xl font-bold drop-shadow-lg">SMART EDGE</h1>
        <h2 className="text-2xl font-bold mt-4 drop-shadow-lg">
          Buy a variety of tech accessories.
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
