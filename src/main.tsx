import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
const clientID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PayPalScriptProvider
      options={{
        "clientId": clientID,
        "currency": "MXN" // Añadir esta línea para configurar la moneda
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </StrictMode>
)
