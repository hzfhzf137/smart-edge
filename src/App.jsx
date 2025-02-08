import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import Home from '../src/pages/homepage/home';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false, // This ensures that animations trigger every time the element enters the viewport
    });
  }, []);


  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Uncomment and add other routes as needed */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
