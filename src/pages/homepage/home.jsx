import React, { useEffect } from 'react';
import Navbar from '../homePage/components/navbar';
import HeroSection from './components/heroSection';
import ProductCardHandler from './components/productCardHandler';
import Footer from '../homePage/components/footer';
import '../../App.css';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">  {/* Ensure the page takes full height */}
      <Navbar />
      <HeroSection />      
      <ProductCardHandler/>
      <Footer />
    </div>
  );
}

export default Home;
