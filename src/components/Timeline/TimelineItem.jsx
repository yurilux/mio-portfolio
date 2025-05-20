// src/components/Timeline/TimelineItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './TimelineItem.module.css'; // Importa il CSS Module

function TimelineItem({ item, index }) {
  // Determina l'URL corretto in base al tipo
  let url;
  if (item.url) { // <--- AGGIUNTA QUESTA CONDIZIONE PER DARE PRIORITÀ A item.url
    url = item.url;
  } else if (item.type === 'experience' || item.type === 'education') {
    url = `/esperienze/${item.id}`;
  } else if (item.type === 'project') {
    url = `/progetti/${item.id}`;
  } else {
    url = '#'; // Fallback se il tipo non è gestito
  }

  // Animazione: appare dal basso e leggermente da lato opposto alla linea centrale
  const isAlignedLeft = index % 2 === 0; // Vero se è a sinistra su desktop
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isAlignedLeft ? -50 : 50, // Viene da sinistra se a sinistra, da destra se a destra
      y: 50                  // Viene dal basso
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6, // Durata leggermente più lunga
        delay: index * 0.15, // Ritardo a cascata
        ease: "easeOut" // Curva di easing
      }
    }
  };

  // Classi per l'allineamento
  const alignmentClass = isAlignedLeft ? styles.alignLeft : styles.alignRight;

  return (
    // Usiamo motion.div per animare l'intero wrapper dell'item
    <motion.div
      className={`${styles.timelineItemWrapper} ${alignmentClass}`}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible" // Attiva quando entra nel viewport
      viewport={{ once: true, amount: 0.2 }} // Anima una volta, quando il 20% è visibile
    >
       {/* Link avvolge il contenuto */}
       <Link to={url} className={styles.itemLink}>
         {/* Questo div contiene lo stile della card (sfondo, bordo, freccia) */}
         <div className={styles.itemContent}>
            <div className={styles.itemHeader}>
              <span className={styles.itemIcon}>{item.icon}</span>
              <div className={styles.itemHeaderText}>
                 <h3 className={styles.itemTitle}>{item.title}</h3>
                 {/* Mostra source e period se presenti */}
                 {item.source && <p className={styles.itemSource}>{item.source}</p>}
                 {item.period && <p className={styles.itemPeriod}>{item.period}</p>}
              </div>
            </div>
            {item.description && <p className={styles.itemDescription}>{item.description}</p>}
         </div>
       </Link>
    </motion.div>
  );
}

export default TimelineItem;