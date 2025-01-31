import React, { useState, useEffect } from "react";
import bgImage1 from "../../../assets/images/bgImg1.jfif";
import bgImage2 from "../../../assets/images/bgImg2.jfif";
import bgImage3 from "../../../assets/images/bgImg3.jfif";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const images = [bgImage1, bgImage3, bgImage2];

  // Function to update navbar height
  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Background image change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        marginTop: `${navHeight}px`, // Push below navbar
        height: `calc(100vh - ${navHeight}px)`, // Ensure full viewport height after navbar
        width: "100vw", // Ensure full width
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover", // Cover entire screen
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Center the image
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-600 text-center">
        <h1
          className="text-6xl font-bold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Black outline shadow for the text
          }}
        >
          SMART EDGE
        </h1>
        <h1
          className="text-2xl font-bold mt-4"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Black outline shadow for the text
          }}
        >
          Buy a variety of tech accessories.
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
