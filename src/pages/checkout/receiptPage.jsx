//src//pages//checkout//receiptPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ReceiptPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`, {
          headers,
          credentials: "include",
        });
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

  if (loading) return <div className="p-6 text-white">Loading receipt...</div>;
  if (!order) return <div className="p-6 text-red-500">Order not found.</div>;

  return (
    <div className="min-h-screen bg-[#0a0f24] text-white flex flex-col items-center justify-center p-6">
      <div className="bg-[#11182f] p-6 rounded-lg w-full max-w-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">Order Receipt</h1>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Name:</strong> {order.shippingDetails.name}</p>
        <p><strong>Address:</strong> {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.country}</p>

        <h2 className="text-xl mt-6 mb-2 font-semibold">Items</h2>
        <ul className="list-disc ml-5">
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity} – ${item.price}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="mt-6 text-blue-400 underline hover:text-blue-300">
        ← Back to Home
      </Link>
    </div>
  );
};

export default ReceiptPage;
