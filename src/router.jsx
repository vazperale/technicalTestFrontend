import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListView from "./views/ProductListView";
import ProductDetailsView from "./views/ProductDetailsView";
import { CartProvider } from './context/cartContext';



export default function Router() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ProductListView />} />
          <Route path="/:id" element={<ProductDetailsView />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

