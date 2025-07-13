import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ReceiptPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center py-10">Loading receipt...</div>;

  // ✅ Fallback if order or critical data is missing
  if (!order || !order.shippingDetails || !order.cartItems) {
    return <div className="text-center py-10 text-red-600">Order not found or invalid.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 text-center">🧾 Order Receipt</h1>

      {/* Shipping Info */}
      <div className="bg-white p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-semibold">Shipping Info</h2>
        <p><strong>Name:</strong> {order.shippingDetails.fullName}</p>
        <p><strong>Address:</strong> {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
        <p><strong>Phone:</strong> {order.shippingDetails.phone}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Card Payment (Stripe)"}</p>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 shadow rounded space-y-4">
        <h2 className="text-xl font-semibold">Order Items</h2>
        {order.cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between border-b pb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="text-right font-bold text-lg pt-4">
          Total: ${order.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ReceiptPage;
