// src/pages/chargers/chargers.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import ChargersHero from "./components/chargersHero";
import ChargersFeaturesAndGallery from "./components/chargersFeaturesAndGallery";
import ChargersAddToCart from "./components/chargersAddToCart";
import axios from "axios";

const Chargers = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const navbar = document.querySelector("nav");
    if (navbar) setNavHeight(navbar.offsetHeight);

    // Fetch product from MongoDB
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products`, { withCredentials: true })
      .then((res) => {
        const charger = res.data.find(p => p.name.toLowerCase() === "magsafe charger");
        setProduct(charger);
      })
      .catch((err) => console.error("Failed to fetch charger:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden pb-40" style={{ paddingTop: navHeight }}>
        <ChargersHero />
        <ChargersFeaturesAndGallery />
        {product && (
          <ChargersAddToCart
            productId={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Chargers;
