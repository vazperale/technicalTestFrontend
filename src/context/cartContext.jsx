import React, { createContext, useState } from 'react';

const CartContext = createContext();

// Proveedor del contexto
export default function CartProvider ({ children }) {
  const [cartCount, setCartCount] = useState(Number(localStorage.getItem('cart')) || 0);

  const updateCart = (newCount) => {
    // Actualiza el localStorage y el estado del contexto
    localStorage.setItem('cart', newCount);
    setCartCount(newCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
