import React, { useEffect, useState } from "react";
import Navbar from "../reuseableComponents/navbar";
import HeroSection from "./components/heroSection";
import ProductCardHandler from "./components/productCardHandler";
import AboutUs from "./components/aboutUs";
import Footer from "../reuseableComponents/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../cart/useCart";
import '../../App.css';

function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);

    const params = new URLSearchParams(location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      clearCart();

      // Remove ?success=true from the URL without reloading
      navigate("/", { replace: true });
    }
  }, [location.search, clearCart, navigate]);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen overscroll-none">
      <Navbar />
      <HeroSection />
      <ProductCardHandler />
      <AboutUs />
      <Footer />

      {/* ✅ Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-green-600 text-2xl font-bold mb-4">✅ Order Placed Successfully</h2>
            <p className="text-gray-700 mb-6">
              Thank you for your purchase! Your payment was successful.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
