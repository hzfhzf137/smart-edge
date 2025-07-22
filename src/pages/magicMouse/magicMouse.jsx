import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import MagicMouseHero from "./components/magicMouseHero";
import MagicMouseFeaturesAndGallery from "./components/magicMouseFeaturesAndGallery";
import MagicMouseAddToCart from "./components/magicMouseAddToCart";

const MagicMouse = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const navbar = document.querySelector("nav");
    if (navbar) setNavHeight(navbar.offsetHeight);

    // Fetch product from backend
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
      withCredentials: true,
    })
      .then((res) => {
        const airtag = res.data.find(p => p.name.toLowerCase().includes("mouse"));
        setProduct(airtag);
      })
      .catch((err) => console.error("Failed to fetch Apple Magic Mouse:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden pb-40" style={{ paddingTop: navHeight }}>
        <MagicMouseHero />
        <MagicMouseFeaturesAndGallery />
        {product && (
          <MagicMouseAddToCart
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

export default MagicMouse;
