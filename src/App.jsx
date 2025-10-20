import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Providers
import { AuthProvider } from "./pages/authentications/authContext";
import { CartProvider } from "./pages/cart/cartContext";

// Pages
import Home from "./pages/homepage/home";
import Airpods from "./pages/airpods/airpods";
import Chargers from "./pages/chargers/chargers";
import SmartWatches from "./pages/smart-watches/smartWatches";
import AirTag from "./pages/airTag/airTag";
import MagicMouse from "./pages/magicMouse/magicMouse";
import Keyboard from "./pages/keyboard/keyboard";
import ContactUs from "./pages/contactUs/contactUs";
import Login from "./pages/authentications/login";
import Signup from "./pages/authentications/signup";
import CartPage from "./pages/cart/cartPage";
import AirpodsModelPage from "./pages/airpods/components/airpodsModelPage";
import MagSafeModelPage from "./pages/chargers/components/magSafeModelPage";
import SmartWatchModelPage from "./pages/smart-watches/components/smartWatchesModelPage";
import AirTagModelPage from "./pages/airTag/components/airtagModelPage";
import MagicMouseModelPage from "./pages/magicMouse/components/magicMouseModelPage";
import KeyboardModelPage from "./pages/keyboard/components/keyboardModelPage";
import CheckoutPage from "./pages/checkout/checkoutPage";
import ReceiptPage from "./pages/checkout/receiptPage";
import Chatbot from "./pages/chatbot/chatbot";

// Reusable Components
import Loader from "./loader";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });

    
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airpods" element={<Airpods />} />
            <Route path="/chargers" element={<Chargers />} />
            <Route path="/smart-watches" element={<SmartWatches />} />
            <Route path="/airTag" element={<AirTag />} />
            <Route path="/magic-mouse" element={<MagicMouse />} />
            <Route path="/magic-keyboard" element={<Keyboard />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/airpods-3d" element={<AirpodsModelPage />} />
            <Route path="/magSafe-3d" element={<MagSafeModelPage />} />
            <Route path="/smartWatch-3d" element={<SmartWatchModelPage />} />
            <Route path="/airTag-3d" element={<AirTagModelPage />} />
            <Route path="/magicMouse-3d" element={<MagicMouseModelPage />} />
            <Route path="/magicKeyboard-3d" element={<KeyboardModelPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/receipt/:orderId" element={<ReceiptPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Chatbot />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
