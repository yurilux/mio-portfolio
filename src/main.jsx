import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

// Definisci il basename basato sul nome del repository
const repoName = 'mio-portfolio'; // Assicurati sia il nome corretto
const basename = `/${repoName}`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AGGIUNGI LA PROP basename QUI */}
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

