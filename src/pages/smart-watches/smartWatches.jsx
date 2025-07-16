import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import SmartWatchesHero from "./components/smartWatchesHero";
import SmartWatchesFeaturesAndGallery from "./components/smartWatchesFeaturesAndGallery";
import SmartWatchesAddToCart from "./components/smartWatchesAddToCart";

const SmartWatches = () => {
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
        const watch = res.data.find(p => p.name.toLowerCase().includes("watch"));
        setProduct(watch);
      })
      .catch((err) => console.error("Failed to fetch smart watch:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden pb-40" style={{ paddingTop: navHeight }}>
        <SmartWatchesHero />
        <SmartWatchesFeaturesAndGallery />
        {product && (
          <SmartWatchesAddToCart
            productId={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            modelUrl={product.modelUrl}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SmartWatches;
