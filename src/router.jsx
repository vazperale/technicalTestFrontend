import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListView from "./views/ProductListView";


export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductListView />} />
    </Routes>
    </BrowserRouter>
  );
}

