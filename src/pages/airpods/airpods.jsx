import React from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import AirpodsHero from "./components/airpodsHero";
import AirpodsFeaturesAndGallery from "./components/airpodsFeaturesAndGallery";
import AirpodsAddToCart from "./components/airpodsAddToCart";

const Airpods = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="pt-16 pb-40 overflow-x-hidden">
        <AirpodsHero />
        <AirpodsFeaturesAndGallery />
        <AirpodsAddToCart />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Airpods;
