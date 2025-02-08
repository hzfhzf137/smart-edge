import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Home from '../src/pages/homepage/home';
import Airpods from '../src/pages/airpods/Airpods'; 
import Chargers from './pages/chargers/chargers';
import SmartWatches from './pages/smart-watches/smartWatches';
import ContactUs from './pages/contactUs/contactUs';

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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
