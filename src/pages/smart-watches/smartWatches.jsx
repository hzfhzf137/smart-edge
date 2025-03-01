import React, { useEffect, useState } from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import SmartWatchesHero from "./components/smartWatchesHero";
import SmartWatchesFeaturesAndGallery from "./components/smartWatchesFeaturesAndGallery";
import SmartWatchesAddToCart from "./components/smartWatchesAddToCart";

const SmartWatches = () => {
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
        <SmartWatchesHero />
        <SmartWatchesFeaturesAndGallery />
        <SmartWatchesAddToCart />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SmartWatches;
