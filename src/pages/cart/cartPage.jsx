import React, { useState } from "react";
import { useCart } from "../cart/useCart"; // ✅ Use actual cart context

const CartPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { cartItems, updateQuantity, clearCart } = useCart(); // ✅ Get cart functions

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Toggle Cart Panel (For Demo Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-4 p-2 bg-blue-600 text-white rounded"
      >
        {isOpen ? "Close Cart" : "Open Cart"}
      </button>

      {/* Cart Slider */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Cart Items */}
        <div
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(100% - 160px)" }}
        >
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div className="flex flex-col">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 border px-2 py-1 rounded text-sm"
                    />
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            disabled={cartItems.length === 0}
            className={`w-full py-2 rounded-md transition duration-300 ${
              cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => {
              alert("Proceeding to checkout with real cart data...");
              // Optional: clearCart(); or navigate to payment
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
