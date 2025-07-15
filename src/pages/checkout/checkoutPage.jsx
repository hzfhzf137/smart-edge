import React, { useState } from "react";
import { useCart } from "../cart/useCart";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false); 

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(shippingDetails).every(
      (field) => field.trim() !== ""
    );
    if (!allFieldsFilled) return alert("Please fill in all the fields.");

    if (!termsAccepted) return alert("Please accept the terms and conditions.");

    if (paymentMethod === "cod") {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
      <form className="bg-white shadow-md p-6 rounded space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
        <input type="text" name="fullName" placeholder="Full Name" required value={shippingDetails.fullName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="address" placeholder="Address" required value={shippingDetails.address} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="city" placeholder="City" required value={shippingDetails.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="text" name="postalCode" placeholder="Postal Code" required value={shippingDetails.postalCode} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" required value={shippingDetails.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

        {/* Payment Method */}
        <div>
          <label className="block mb-1 font-semibold text-sm">Payment Method</label>
          <select value={paymentMethod} onChange={handlePaymentMethodChange} className="w-full border px-3 py-2 rounded">
            <option value="card">Card Payment (Stripe)</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>

        {/* ✅ Terms Acceptance */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-blue-600 underline cursor-pointer">
              Smart Edge Terms & Conditions
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!termsAccepted}
            className={`w-full font-semibold py-2 px-4 rounded ${
              termsAccepted
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </form>

      {/* Terms and Conditions Summary */}
      <div className="bg-gray-100 p-5 rounded text-sm text-gray-700">
        <h3 className="text-lg font-bold mb-2">📜 Terms & Conditions – Smart Edge</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Orders are processed within 1–3 business days.</li>
          <li>Cash on Delivery is limited to eligible regions only.</li>
          <li>Card payments are handled securely via Stripe.</li>
          <li>Returns are only accepted for faulty or damaged products.</li>
          <li>All personal data is protected and never shared without consent.</li>
        </ul>
      </div>

      <div className="text-center">
        <Link to="/" className="inline-block text-blue-600 hover:underline text-sm">← Back to Home</Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
