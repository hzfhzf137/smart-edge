import React, { useState } from "react";
import { useCart } from "../cart/useCart";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // From .env

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic field validation
    const allFieldsFilled = Object.values(shippingDetails).every(field => field.trim() !== "");
    if (!allFieldsFilled) return alert("Please fill in all the fields.");

    const stripe = await stripePromise;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems, shippingDetails }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Payment session creation failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Your Items</h2>
        {cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Form */}
      <form
        className="bg-white shadow-md p-6 rounded space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
        <input type="text" name="fullName" placeholder="Full Name" required value={shippingDetails.fullName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="address" placeholder="Address" required value={shippingDetails.address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="city" placeholder="City" required value={shippingDetails.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="postalCode" placeholder="Postal Code" required value={shippingDetails.postalCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" required value={shippingDetails.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Pay Now
          </button>
        </div>
      </form>

      {/* Back to Home */}
      <div className="text-center">
        <Link to="/" className="inline-block text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
