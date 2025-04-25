import React from 'react';
import { useParams } from 'react-router-dom';

function ProjectPage() {
  let { id } = useParams(); // Leggiamo l'ID dall'URL
  return (
    <div>
      <h1 style={{ fontSize: '2em', marginBottom: '1rem' }}>Pagina Progetto</h1>
      <p>Dettagli per il progetto con ID: <strong>{id}</strong></p>
      {/* Contenuto dettagliato qui */}
    </div>
  );
}
export default ProjectPage;