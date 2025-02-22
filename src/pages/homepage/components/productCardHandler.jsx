import React from "react";
import ProductCard from "./productCard";
import airpods from "../../../assets/images/airpodsImgHomePage.jpg";
import charger from "../../../assets/images/chargerImgHomePage.png";
import smartWatch from "../../../assets/images/smartWatchImgHomePage.png";

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
