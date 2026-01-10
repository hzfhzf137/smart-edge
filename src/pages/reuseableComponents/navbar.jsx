import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowUp,
  FaExpand,
  FaBars,
  FaShoppingCart,
} from "react-icons/fa";
import { AuthContext } from "../authentications/authContext";
import { useCart } from "../cart/useCart";
import smartEdgeLogoWhite from "../../assets/images/smartEdgeLogoWhite.png";
import smartEdgeLogoBlue from "../../assets/images/smartEdgeLogoBlue.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { user, logout, loading } = useContext(AuthContext);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleCart = () => {
    if (!user) {
      alert("Please login first to view your cart.");
      navigate("/login");
      return;
    }
    setIsCartOpen(!isCartOpen);
  };

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

  const iconClasses = `text-sm sm:text-md md:text-lg pr-1 transition duration-300 ${
    isScrolled ? "text-blue-600" : "text-white"
  }`;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300 ${
        isScrolled ? "bg-gray-300" : "bg-blue-900 bg-opacity-50"
      }`}
    >
      <nav className="flex items-center justify-between p-2 sm:p-3 md:p-4">
        <Link to="/" className="flex-shrink-0">
          <img
            src={isScrolled ? smartEdgeLogoBlue : smartEdgeLogoWhite}
            alt="logo"
            className="h-6 sm:h-7 object-contain"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={scrollToTop} className={iconClasses}>
            <FaArrowUp />
          </button>
          <button
            onClick={toggleFullscreen}
            className={`hidden sm:block ${iconClasses}`}
          >
            <FaExpand />
          </button>

          <div className="relative mt-1">
            <button onClick={toggleCart} className={iconClasses}>
              <FaShoppingCart />
              {totalQuantity > 0 && (
                <span
                  key={totalQuantity}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce"
                >
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {loading ? (
            <span className={`${iconClasses} italic`}>...</span>
          ) : user ? (
            <div className="relative z-50">
              <button
                onClick={() => setShowLogout(true)}
                className={`font-semibold ${iconClasses}`}
              >
                {user.name}
              </button>

              {showLogout && (
                <>
                  {/* Logout Backdrop */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowLogout(false)}
                  />

                  {/* Logout Popup */}
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50 text-sm">
                    <div className="p-3 relative">
                      <button
                        onClick={() => setShowLogout(false)}
                        className="absolute top-1 right-2 text-gray-500 hover:text-black text-lg"
                      >
                        &times;
                      </button>
                      <p className="mb-2">Want to logout?</p>
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
                </>
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

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{isOpen && (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
      onClick={() => setIsOpen(false)}
    />

    <div className="fixed top-0 right-0 w-64 max-w-[80%] h-full bg-gray-900 text-white p-6 z-50 flex flex-col overflow-y-auto">
      <button
        onClick={toggleMenu}
        className="absolute top-5 right-5 text-2xl text-white hover:text-gray-400"
      >
        &times;
      </button>

      {/* Menu Items */}
      <ul className="mt-10 space-y-4 text-base">
        {[
          "Home",
          "Airpods",
          "Chargers",
          "Smart Watches",
          "Airtag",
          "Magic Mouse",
          "Magic Keyboard",
          "Contact Us",
        ].map((label, idx) => (
          <li key={idx}>
            <Link
              to={
                label === "Home"
                  ? "/"
                  : "/" + label.toLowerCase().replace(/\s+/g, "-")
              }
              onClick={toggleMenu}
              className="block py-1 hover:underline"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Spacer pushes footmark to bottom */}
      <div className="mt-auto pt-6">
        <div className="w-full h-px bg-gray-700 mb-4"></div>

        {/* Footmark */}
        <div className="text-center text-gray-400 text-[11px] space-y-1">
          <p>
            Design & Developed by{" "}
            <span className="text-gray-200 font-medium">Huzaifa M.</span>
          </p>
          <p>
            <a
              href="https://huzaifa-mahmood.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              huzaifa-mahmood.online
            </a>
          </p>
          <p>
            <a
              href="mailto:hzfhzf137@gmail.com"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              hzfhzf137@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </>
)}


      {/* Cart */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
            onClick={toggleCart}
          />
          <div className="fixed top-0 right-0 w-64 md:w-80 h-full bg-white text-black p-6 z-50 flex flex-col">
            <button
              onClick={toggleCart}
              className="absolute top-5 right-5 text-2xl hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-700">Your cart is empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="border-b pb-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => decreaseQuantity(item.productId)}
                          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.productId)}
                          className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between font-semibold mb-2">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  toggleCart();
                  navigate("/checkout");
                }}
                className={`w-full py-2 rounded-md transition duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
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
