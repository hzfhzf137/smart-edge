import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowUp, FaExpand, FaBars, FaShoppingCart, FaUser
} from "react-icons/fa";
import { AuthContext } from "../authentications/authContext";
import smartEdgeLogoWhite from "../../assets/images/smartEdgeLogoWhite.png";
import smartEdgeLogoBlue from "../../assets/images/smartEdgeLogoBlue.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout, loading } = useContext(AuthContext); // ✅ Include loading

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconClasses = `text-sm sm:text-md md:text-lg pr-1 transition duration-300 ${isScrolled ? "text-blue-600" : "text-white"}`;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ${isScrolled ? "bg-gray-300" : "bg-blue-900 bg-opacity-50"} pr-2 pl-2`}>
      <nav className="flex items-center justify-between p-2 sm:p-3 md:p-4">
        <Link to="/">
          <img
            src={isScrolled ? smartEdgeLogoBlue : smartEdgeLogoWhite}
            alt="logo"
            className="h-5 object-contain"
          />
        </Link>

        <div className="flex items-center space-x-5">
          <button onClick={scrollToTop} className={iconClasses}>
            <FaArrowUp />
          </button>
          <button onClick={toggleFullscreen} className={`hidden sm:block ${iconClasses}`}>
            <FaExpand />
          </button>
          <button onClick={toggleCart} className={iconClasses}>
            <FaShoppingCart />
          </button>

          {/* ✅ Fix: Handle loading/user logic properly */}
          {loading ? (
            <span className={`${iconClasses} italic`}>...</span>
          ) : user ? (
            <div className="relative">
              <button onClick={() => setShowLogout(!showLogout)} className={`font-semibold ${iconClasses}`}>
                {user.name}
              </button>
              {showLogout && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                  <div className="p-4">
                    <p className="text-sm mb-2">Want to logout?</p>
                    <button
                      onClick={() => {
                        logout();
                        setShowLogout(false);
                      }}
                      className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={iconClasses}>
              Login
            </Link>
          )}

          <button onClick={toggleMenu} className={iconClasses}>
            <FaBars />
          </button>
        </div>
      </nav>

      {isOpen && (
        <>
          <div className="fixed inset-0 backdrop-blur-md z-40" onClick={() => setIsOpen(false)}></div>
          <div className="fixed top-0 right-0 w-64 md:w-80 h-full bg-gray-800 text-white p-6 z-50">
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 text-2xl hover:text-gray-400"
            >
              &times;
            </button>
            <ul className="mt-10 space-y-2 text-sm">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/airpods" onClick={toggleMenu}>Airpods</Link></li>
              <li><Link to="/chargers" onClick={toggleMenu}>Chargers</Link></li>
              <li><Link to="/smart-watches" onClick={toggleMenu}>Smart Watches</Link></li>
              <li><Link to="/contact-us" onClick={toggleMenu}>Contact Us</Link></li>
            </ul>
          </div>
        </>
      )}

      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40" onClick={toggleCart}></div>
          <div className="fixed top-0 right-0 w-64 md:w-80 h-full bg-white text-black p-6 z-50">
            <button
              onClick={toggleCart}
              className="absolute top-5 right-5 text-2xl hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            <p className="text-gray-700">Your cart is empty.</p>
            <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
