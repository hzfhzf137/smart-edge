import React, { useState } from "react";

const CartPage = () => {
  // Simulated open state for the slider cart
  const [isOpen, setIsOpen] = useState(true);

  // Example cart items (replace with your actual data)
  const cartItems = [
    { id: 1, name: "Apple Airpods", price: 199.99, quantity: 1 },
    { id: 2, name: "Apple Magsafe Charger", price: 49.99, quantity: 2 },
    { id: 3, name: "Apple Watch", price: 399.99, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Button to toggle the cart panel for demo purposes */}
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
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 160px)" }}>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
