import { useEffect } from 'react';
import Navbar from '../reuseableComponents/navbar';
import HeroSection from './components/heroSection';
import ProductCardHandler from './components/productCardHandler';
import AboutUs from './components/aboutUs';
import Footer from '../reuseableComponents/footer';
import '../../App.css';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ Show success alert if set
    if (sessionStorage.getItem("paymentSuccess") === "true") {
      alert("✅ Payment Successful! Thank you for your order.");
      sessionStorage.removeItem("paymentSuccess");
    }

    // ✅ Show cancel alert if set
    if (sessionStorage.getItem("paymentCanceled") === "true") {
      alert("❌ Payment was canceled.");
      sessionStorage.removeItem("paymentCanceled");
    }
  }, []);

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen overscroll-none">
      <Navbar />
      <HeroSection />
      <ProductCardHandler />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default Home;
