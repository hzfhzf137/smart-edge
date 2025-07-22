//src//pages//checkout//checkoutPage.jsx

import React, { useContext, useState } from "react";
import { CartContext } from "../cart/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../authentications/authContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: currentUser?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(shippingDetails).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) return alert("Please fill in all the fields.");
    if (!termsAccepted) return alert("Please accept the terms and conditions.");

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    if (paymentMethod === "cod") {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({
            cartItems,
            shippingDetails,
            paymentMethod: "cod",
          }),
        });

        const data = await res.json();
        if (res.ok) {
          clearCart();
          navigate(`/receipt/${data.order._id}`);
        } else {
          alert("❌ Failed to place order: " + data.error);
        }
      } catch (err) {
        console.error("❌ Error placing order:", err);
        alert("Something went wrong.");
      }
    } else {
      const stripe = await stripePromise;
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/payments/create-checkout-session`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ cartItems, shippingDetails }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("❌ Payment session creation failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 w-full max-w-md">
        <input type="text" name="name" value={shippingDetails.name} onChange={handleChange} placeholder="Full Name" className="bg-[#11182f] p-2 rounded" />
        <input type="text" name="address" value={shippingDetails.address} onChange={handleChange} placeholder="Address" className="bg-[#11182f] p-2 rounded" />
        <input type="text" name="city" value={shippingDetails.city} onChange={handleChange} placeholder="City" className="bg-[#11182f] p-2 rounded" />
        <input type="text" name="postalCode" value={shippingDetails.postalCode} onChange={handleChange} placeholder="Postal Code" className="bg-[#11182f] p-2 rounded" />
        <input type="text" name="country" value={shippingDetails.country} onChange={handleChange} placeholder="Country" className="bg-[#11182f] p-2 rounded" />

        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="bg-[#11182f] p-2 rounded">
          <option value="cod">Cash on Delivery</option>
          <option value="card">Card Payment</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
          I accept the terms and conditions.
        </label>

        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
        </button>
      </form>

      <Link to="/" className="mt-6 text-blue-400 underline hover:text-blue-300">
        ← Back to Home
      </Link>
    </div>
  );
};

export default CheckoutPage;
