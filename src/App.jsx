import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from '../src/pages/homepage/home';
// import CosmoCommunication from './components/cosmoCommunication.jsx';
// import ProductAndServices from './components/productAndServices.jsx';
// import ContactUs from './components/contactUs.jsx';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/airpods" element={<airpods />} />
          <Route path="/chargers" element={<chargers />} />
          <Route path="/contact-us" element={<ContactUs />} /> */}
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
