import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import AirpodsHero from "./components/airpodsHero";
import AirpodsFeaturesAndGallery from "./components/airpodsFeaturesAndGallery";
import AirpodsAddToCart from "./components/airpodsAddToCart";

const Airpods = () => {
  const [product, setProduct] = useState(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const navbar = document.querySelector("nav");
    if (navbar) setNavHeight(navbar.offsetHeight);

    // 👇 Fetch product data
    axios.get("https://smartedge-backend-production-b679.up.railway.app/api/products")
      .then((res) => {
        // If multiple products, filter the one for AirPods
        const airpods = res.data.find(p => p.name === "AirPods Pro");
        setProduct(airpods);
      })
      .catch((err) => console.error("Failed to fetch product:", err));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="overflow-x-hidden pb-40" style={{ paddingTop: navHeight }}>
        <AirpodsHero />
        <AirpodsFeaturesAndGallery />
        {product && (
          <AirpodsAddToCart
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrl}
            modelUrl={product.modelUrl}
          />
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Airpods;
