import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

// Existing pages
import Home from '../src/pages/homepage/home';
import Airpods from '../src/pages/airpods/airpods'; 
import Chargers from './pages/chargers/chargers';
import SmartWatches from './pages/smart-watches/smartWatches';
import ContactUs from './pages/contactUs/contactUs';
import Login from './pages/authentications/login';
import Signup from './pages/authentications/signup';
import CartPage from './pages/cart/cartPage';

// New Airpods 3D page
import AirpodsModelPage from './pages/airpods/components/airpodsModelPage'; // Adjust path as needed

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false, 
    });
  }, []);

  return (
    <React.Fragment>
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

          {/* New route for AirPods 3D Model */}
          <Route path="/airpods-3d" element={<AirpodsModelPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
