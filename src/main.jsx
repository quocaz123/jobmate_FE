import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Load mock helper trong development mode
if (import.meta.env.DEV) {
   import('./utils/mockHelper.js').catch(err => console.log('Mock helper not loaded:', err));
}

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <App />
   </StrictMode>
)
