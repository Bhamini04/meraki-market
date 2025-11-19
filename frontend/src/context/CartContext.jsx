import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART — FIXED
  const addToCart = (product, quantity = 1) => {
    let message = "";

    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        message = "updated";

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      message = "added";
      return [...prev, { ...product, quantity }];
    });

    // Move toast OUTSIDE setCartItems → NO WARNINGS!
    if (message === "added") {
      toast({
        title: "Added to Cart",
        description: `${product.name} added to cart`,
      });
    } else {
      toast({
        title: "Updated Cart",
        description: `${product.name} quantity updated`,
      });
    }
  };

  // REMOVE FROM CART — FIXED
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));

    toast({
      title: "Removed from Cart",
      description: "Item removed successfully",
    });
  };

  // UPDATE QUANTITY — FIXED
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // CLEAR CART — FIXED
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const getCartTotal = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);

  const getCartCount = () =>
    cartItems.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
