import React from "react";
import chargersHeroSectionImg from "../../../assets/images/chargersHeroSectionImg.jpg";

const ChargersHero = () => {
  return (
    <section
      className=" w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${chargersHeroSectionImg})` }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
        AirPods
      </h1> */}
    </section>
  );
};

export default ChargersHero;
