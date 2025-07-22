import React from "react";
import magicMouseHeroSectionImg from "../../../assets/images/magicMouseHeroSectionImg.jpg";

const MagicMouseHero = () => {
  return (
    <section
      className=" w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${magicMouseHeroSectionImg})` }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
    </section>
  );
};

export default MagicMouseHero;
