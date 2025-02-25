import React, { useEffect, useState } from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import AirpodsHero from "./components/airpodsHero";
import AirpodsFeaturesAndGallery from "./components/airpodsFeaturesAndGallery";
import AirpodsAddToCart from "./components/airpodsAddToCart";

const Airpods = () => {
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div 
        className="overflow-x-hidden pb-40"
        style={{ paddingTop: navHeight }}
      >
        <AirpodsHero />
        <AirpodsFeaturesAndGallery />
        <AirpodsAddToCart />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Airpods;
