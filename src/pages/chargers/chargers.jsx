import React, { useEffect, useState } from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import ChargersHero from "./components/chargersHero";
import ChargersFeaturesAndGallery from "./components/chargersFeaturesAndGallery";
import ChargersAddToCart from "./components/chargersAddToCart";

const Chargers = () => {
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
        <ChargersHero />
        <ChargersFeaturesAndGallery />
        <ChargersAddToCart />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Chargers;
