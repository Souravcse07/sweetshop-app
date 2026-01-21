"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ ADD ITEM
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id && item.weight === product.weight
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          item.weight === product.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➕ INCREASE
  const increaseQty = (_id, weight) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id && item.weight === weight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ DECREASE
  const decreaseQty = (_id, weight) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === _id && item.weight === weight
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ REMOVE ITEM
  const removeItem = (_id, weight) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === _id &&
            item.weight === weight
          )
      )
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
