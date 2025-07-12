import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './pages/authentications/authContext';

// ✅ Alert on redirect with success or cancel params
const AlertWrapper = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      alert("✅ Payment successful! Thank you for your order.");
    } else if (params.get("canceled") === "true") {
      alert("❌ Payment canceled. You can continue shopping.");
    }

    // ✅ Remove query params from the URL after showing alert
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
      <AlertWrapper />
    </AuthProvider>
  </StrictMode>
);
