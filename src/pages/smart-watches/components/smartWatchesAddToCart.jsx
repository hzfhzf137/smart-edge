import React, { useState, useContext, useEffect } from "react";
import { useCart } from "../../cart/useCart";
import { AuthContext } from "../../authentications/authContext";
import { useNavigate } from "react-router-dom";

const SmartWatchesAddToCart = ({ productId: _id, name, description, price }) => {
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showPopup]);

  const handleAddToCartClick = () => {
    if (!user) {
      alert("Please login first to add to cart.");
      navigate("/login");
      return;
    }
    setShowPopup(true);
  };

  const handleConfirm = () => {
    addToCart({ productId: _id, name, price, quantity });
    setShowPopup(false);
    setQuantity(1);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setQuantity(1);
  };

  return (
    <section className="max-w-7xl mx-auto p-4" data-aos="fade-up" data-aos-duration="1000">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Buy {name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${price}</p>
      <button
        onClick={handleAddToCartClick}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </button>

      {showPopup && (
        <div
          onClick={handleCancel}
          className="fixed top-0 left-0 w-full pt-5 pb-5 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 mx-4 relative"
          >
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">Price: ${price}</p>
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
            <button
              onClick={handleCancel}
              className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SmartWatchesAddToCart;
