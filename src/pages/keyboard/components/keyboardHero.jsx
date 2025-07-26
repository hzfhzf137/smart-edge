import React from "react";
import keyboardHeroSectionImg from "../../../assets/images/keyboardHeroSectionImg.jpg";

const KeyboardHero = () => {
  return (
    <section
      className=" w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${keyboardHeroSectionImg})` }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
    </section>
  );
};

export default KeyboardHero;
