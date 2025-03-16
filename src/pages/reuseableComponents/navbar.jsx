import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowUp, 
  FaExpand, 
  FaBars, 
  FaShoppingCart, 
  FaUser 
} from 'react-icons/fa';
import smartEdgeLogo from '../../assets/images/smartEdgeLogo.png';

const Navbar = () => {
  // State for mobile menu, cart panel, scroll position, and login status
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle cart panel
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Toggle full-screen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu or cart panel is open
  useEffect(() => {
    // Hide body scroll
    document.body.style.overflow = (isOpen || isCartOpen) ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, isCartOpen]);

  // **Disable any scrolling** if the menu is open
  useEffect(() => {
    function disableScroll(e) {
      // Prevent the default scroll behavior
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    if (isOpen) {
      // Add scroll event listeners to window
      window.addEventListener('scroll', disableScroll, { passive: false });
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('touchmove', disableScroll, { passive: false });
    } else {
      // Remove them if menu is closed
      window.removeEventListener('scroll', disableScroll, { passive: false });
      window.removeEventListener('wheel', disableScroll, { passive: false });
      window.removeEventListener('touchmove', disableScroll, { passive: false });
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', disableScroll, { passive: false });
      window.removeEventListener('wheel', disableScroll, { passive: false });
      window.removeEventListener('touchmove', disableScroll, { passive: false });
    };
  }, [isOpen]);

  // Common classes for icons
  const iconClasses = `text-sm sm:text-md md:text-lg pr-1 transition duration-300 ${
    isScrolled ? 'text-blue-600' : 'text-white'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-gray-300' : 'bg-blue-900 bg-opacity-50'
      } pr-2 pl-2`}
    >
      <nav className="flex items-center justify-between p-2 sm:p-3 md:p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" onClick={closeMenu}>
            <img
              src={smartEdgeLogo}
              alt="company logo"
              className="w-28 h-10 object-contain"
            />
          </Link>
        </div>

        {/* Right Side Icons */}
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
          {isLoggedIn ? (
            <button onClick={() => console.log("User clicked")} className={iconClasses}>
              <FaUser />
            </button>
          ) : (
            <Link
              to="/login"
              className={`text-sm sm:text-md md:text-lg transition duration-300 ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`}
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
          <button onClick={toggleMenu} className={iconClasses}>
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-md z-40 transition duration-300 ease-in-out"
            onClick={closeMenu}
          ></div>
          <div
            className={`fixed top-0 right-0 w-64 md:w-80 h-full bg-gray-800 text-white p-6 z-50 transition-transform transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 text-2xl sm:text-3xl md:text-4xl text-white hover:text-gray-400 transition duration-300"
            >
              &times;
            </button>
            <div className="flex flex-col h-full justify-between">
              <ul className="mt-10 space-y-2 text-xs sm:text-sm md:text-base">
                <li>
                  <Link
                    to="/"
                    className="hover:text-gray-300 hover:border-b-2 hover:border-blue-900 transition duration-300"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/airpods"
                    className="hover:text-gray-300 hover:border-b-2 hover:border-blue-900 transition duration-300"
                    onClick={closeMenu}
                  >
                    Airpods
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chargers"
                    className="hover:text-gray-300 hover:border-b-2 hover:border-blue-900 transition duration-300"
                    onClick={closeMenu}
                  >
                    Chargers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/smart-watches"
                    className="hover:text-gray-300 hover:border-b-2 hover:border-blue-900 transition duration-300"
                    onClick={closeMenu}
                  >
                    Smart Watches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-gray-300 hover:border-b-2 hover:border-blue-900 transition duration-300"
                    onClick={closeMenu}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Cart Slider */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 transition duration-300 ease-in-out"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 w-64 md:w-80 h-full bg-white text-black p-6 z-50 transition-transform transform ${
              isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-5 right-5 text-2xl sm:text-3xl md:text-4xl text-black hover:text-gray-600 transition duration-300"
            >
              &times;
            </button>
            <div className="flex flex-col h-full">
              <h2 className="text-xl font-bold mb-4">Your Cart</h2>
              {/* Cart content: Replace with your dynamic cart items */}
              <p className="text-gray-700">Your cart is empty.</p>
              {/* Checkout button */}
              <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
