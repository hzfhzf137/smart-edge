import React from "react";
import airTagHeroSectionImg from "../../../assets/images/airTagHeroSectionImg.webp";

const AirTagHero = () => {
  return (
    <section
      className=" w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${airTagHeroSectionImg})` }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
    </section>
  );
};

export default AirTagHero;
