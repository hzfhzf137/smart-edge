import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './pages/authentications/authContext';
import { CartProvider } from './pages/cart/cartContext'; // ✅ fixed
import { useCart } from './pages/cart/useCart'; // ✅ correct source

// ✅ Stripe payment success/cancel handler
const AlertWrapper = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "true") {
      alert("✅ Payment successful! Thank you for your order.");

      clearCart(); // ✅ Clear from React context

      // ✅ Clear from backend
      fetch(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        method: "DELETE",
        credentials: "include",
      });

    } else if (params.get("canceled") === "true") {
      alert("❌ Payment canceled. You can continue shopping.");
    }

    // ✅ Clean up URL
    if (params.get("success") || params.get("canceled")) {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <AlertWrapper />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
