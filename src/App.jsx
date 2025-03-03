import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

// All App pages
import Home from '../src/pages/homepage/home';
import Airpods from '../src/pages/airpods/airpods'; 
import Chargers from './pages/chargers/chargers';
import SmartWatches from './pages/smart-watches/smartWatches';
import ContactUs from './pages/contactUs/contactUs';
import Login from './pages/authentications/login';
import Signup from './pages/authentications/signup';
import CartPage from './pages/cart/cartPage';

// 3D model pages
import AirpodsModelPage from './pages/airpods/components/airpodsModelPage';
import MagSafeModelPage from './pages/chargers/components/magSafeModelPage';

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

          {/*route for 3D Model pages */}
          <Route path="/airpods-3d" element={<AirpodsModelPage />} />
          <Route path="/magSafe-3d" element={<MagSafeModelPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
