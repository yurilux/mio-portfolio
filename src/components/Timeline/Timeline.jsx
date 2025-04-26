import React from 'react';
import TimelineItem from './TimelineItem';
import { timelineItems } from '../../data/timelineData'; // Assicurati che il percorso sia corretto
import styles from './Timeline.module.css';

function Timeline() {
  // Filtra eventuali item senza ID (buona pratica)
  const validItems = timelineItems.filter(item => item && item.id);

  // Ordiniamo gli item qui se necessario (es. per data se abbiamo date parsabili)
  // Altrimenti usiamo l'ordine definito in timelineData.js

  return (
    <section id="timeline" className={styles.timelineSection}> {/* Aggiunto ID per eventuali link interni */}
      <div className="container"> {/* Container per padding laterale */}
         <h2 className={styles.timelineTitle}>Percorso</h2> {/* Titolo più evocativo? */}
      </div>

      <div className={`${styles.timelineContainer} container`}>
        {/* Linea verticale (visibile solo su desktop via CSS) */}
        <div className={styles.timelineLine}></div>

        {/* Mappa gli item validi */}
        {validItems.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Timeline;