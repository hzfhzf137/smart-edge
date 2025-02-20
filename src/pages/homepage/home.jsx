import React, { useEffect } from 'react';
import Navbar from '../reuseableComponents/navbar';
import HeroSection from './components/heroSection';
import ProductCardHandler from './components/productCardHandler';
import AboutUs from './components/aboutUs';
import Footer from '../reuseableComponents/footer';
import '../../App.css';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen overscroll-none">  {/* Ensure the page takes full height */}
      <Navbar />
      <HeroSection />      
      <ProductCardHandler/>
      <AboutUs/>
      <Footer />
    </div>
  );
}

export default Home;
