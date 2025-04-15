import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.jsx'
import strings from './config/strings.js';

if (!import.meta.env.VITE_API_URL) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <h3>{strings["main.error.file.env"]}</h3>
    </StrictMode>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Router />
    </StrictMode>
  )
}