import React, { useEffect, useState } from "react";
import axios from "axios";

const AirpodsHero = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/airpods-pro`); // Ensure name matches MongoDB
        setImageUrl(res.data.imageUrl);
      } catch (error) {
        console.error("Error fetching hero image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <section
      className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${imageUrl })`, // fallback if no imageUrl found
      }}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {loading ? (
        <h1 className="text-3xl font-bold">Loading...</h1>
      ) : (
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
          AirPods Pro
        </h1>
      )}
    </section>
  );
};

export default AirpodsHero;
