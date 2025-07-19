// src/pages/cart/cartContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authentications/authContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (loading) return;
      if (!user) return setCartItems([]);

      try {
        const res = await axios.get(`${API_BASE}/cart`, getAuthHeaders());
        setCartItems(res.data.cart || []);
      } catch (err) {
        console.error("❌ Failed to load cart:", err.message);
      }
    };

    fetchCart();
  }, [user, loading]);

  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;
      try {
        await axios.post(`${API_BASE}/cart`, { cart: cartItems }, getAuthHeaders());
      } catch (err) {
        console.error("❌ Failed to save cart:", err.message);
      }
    };

    if (user) saveCart();
  }, [cartItems, user]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.productId === product.productId);
      if (exists) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, { ...product }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;
