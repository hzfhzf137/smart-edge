// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css'; // If you have the fadeText keyframes

// Import your pages
import Home from './pages/homepage/home';
import Airpods from './pages/airpods/airpods'; 
import Chargers from './pages/chargers/chargers';
import SmartWatches from './pages/smart-watches/smartWatches';
import ContactUs from './pages/contactUs/contactUs';
import Login from './pages/authentications/login';
import Signup from './pages/authentications/signup';
import CartPage from './pages/cart/cartPage';
import AirpodsModelPage from './pages/airpods/components/airpodsModelPage';
import MagSafeModelPage from './pages/chargers/components/magSafeModelPage';

// Import the loader
import Loader from './loader';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });

    // Hide loader after exactly 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    // For the first 3 seconds, ONLY render the Loader
    return <Loader />;
  }

  // After 3 seconds, we unmount the loader and render your app
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/airpods" element={<Airpods />} />
        <Route path="/chargers" element={<Chargers />} />
        <Route path="/smart-watches" element={<SmartWatches />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/airpods-3d" element={<AirpodsModelPage />} />
        <Route path="/magSafe-3d" element={<MagSafeModelPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
