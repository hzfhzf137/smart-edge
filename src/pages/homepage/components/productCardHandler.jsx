import React from "react";
import ProductCard from "./productCard";
import airpods from "../../../assets/images/airpodsImgHomePage.jfif";
import charger from "../../../assets/images/chargerImgHomePage.jfif";
import smartWatch from "../../../assets/images/smartWatchImgHomePage.jfif";

const products = [
  {
    image: charger,
    label: "Apple Magsafe Charger",
  },
  {
    image: airpods,
    label: "Apple Airpods",
  },
  {
    image: smartWatch,
    label: "Apple Watch",
  },
];

const ProductCardHandler = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-black">
      {products.map((product, index) => (
        <ProductCard key={index} image={product.image} label={product.label} />
      ))}
    </div>
  );
};

export default ProductCardHandler;
