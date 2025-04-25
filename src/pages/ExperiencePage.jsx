import React from 'react';
import { useParams } from 'react-router-dom'; // Importiamo useParams

function ExperiencePage() {
  let { id } = useParams(); // Leggiamo l'ID dall'URL
  return (
    <div>
      <h1 style={{ fontSize: '2em', marginBottom: '1rem' }}>Pagina Esperienza</h1>
      <p>Dettagli per l'esperienza con ID: <strong>{id}</strong></p>
      {/* Contenuto dettagliato qui */}
    </div>
  );
}
export default ExperiencePage;