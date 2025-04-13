import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.jsx'

if (!import.meta.env.VITE_API_URL) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <h3>Cree el archivo .env y añada la url de la API como explica el readme del proyecto </h3>
    </StrictMode>
  )
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Router />
    </StrictMode>
  )
}