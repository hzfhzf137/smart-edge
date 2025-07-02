import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authentications/authContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    // ✅ Load Cart from Backend
    useEffect(() => {
        const fetchCart = async () => {
            if (loading) return; // ⛔ wait until user loading completes
            if (!user) {
                setCartItems([]);
                return;
            }

            try {
                const res = await axios.get(`${API_BASE}/cart`, {
                    withCredentials: true,
                });
                console.log("✅ Cart fetched:", res.data.cart);
                setCartItems(res.data.cart || []);
            } catch (err) {
                console.error("Failed to load cart:", err.message);
            }
        };

        fetchCart();
    }, [user, loading]);


    // ✅ Save Cart to Backend whenever cartItems change
    useEffect(() => {
        const saveCart = async () => {
            if (!user) return;

            try {
                await axios.post(
                    `${API_BASE}/cart`,
                    { cart: cartItems },
                    { withCredentials: true }
                );
            } catch (err) {
                console.error("Failed to save cart:", err.message);
            }
        };

        if (user) {
            saveCart();
        }
    }, [cartItems, user]);

    // ✅ Add or Update Item
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.productId === product.productId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product }];
            }
        });
    };

    // ✅ Increase Quantity
    const increaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // ✅ Decrease Quantity or Remove if 0
    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // ✅ Remove from Cart
    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.productId !== productId)
        );
    };

    // ✅ Clear Cart
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
