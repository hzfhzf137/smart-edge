import React from "react";
import ProductCard from "./productCard";
import airpods from "../../../assets/images/airpodsImgHomePage.jpg";
import charger from "../../../assets/images/chargerImgHomePage.png";
import smartWatch from "../../../assets/images/smartWatchImgHomePage.png";
import airtag from "../../../assets/images/appleAirTagImgHomePage.png";
import magicMouse from "../../../assets/images/appleMagicMouseImgHomePage.png"
import appleKeyboard from "../../../assets/images/appleKeyboardImgHomePage.png";


const products = [
  {
    image: charger,
    label: "Apple Magsafe Charger",
    route: "/chargers"
  },
  {
    image: airpods,
    label: "Apple Airpods",
    route: "/airpods"  
  },
  {
    image: smartWatch,
    label: "Apple Watch",
    route: "/smart-watches"

  },
  {
    image: airtag,
    label: "Apple AirTag",
    route: "/airTag"
  },
  {
    image: magicMouse,
    label: "Apple Magic Mouse",
    route: "/magic-mouse"
  },
  {
    image: appleKeyboard,
    label: "Apple Magic Keyboard",
    route: "/magic-keyboard"
  },
];

const ProductCardHandler = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 pt-5 pb-5 bg-black">
      {products.map((product, index) => (
        <ProductCard 
          key={index} 
          image={product.image} 
          label={product.label} 
          route={product.route}
        />
      ))}
    </div>
  );
};

export default ProductCardHandler;
