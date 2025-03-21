// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

// Create context
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
