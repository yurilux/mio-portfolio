import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Importiamo il nostro CSS globale
import { BrowserRouter } from 'react-router-dom'; // Importa

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Avvolgi qui */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)