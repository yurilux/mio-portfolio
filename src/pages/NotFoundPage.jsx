import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '2rem' }}>Oops! Pagina non trovata.</p>
      <Link to="/" className="button-primary">Torna alla Home</Link>
    </div>
  );
}
export default NotFoundPage;