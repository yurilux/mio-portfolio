import React from 'react';
import { motion } from 'framer-motion';
// Usiamo gli stili di ExperiencePage e aggiungiamo stili inline/classi specifiche se necessario
import styles from './ExperiencePage.module.css';

// Animazioni di pagina
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function ContactPage() {
  // I tuoi dati di contatto
  const myEmail = "yuribottale@gmail.com";
  const myLinkedIn = "https://www.linkedin.com/in/iulianbottale/";

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer} // Usa contenitore esistente
      style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }} // Centra contenuto
    >
      {/* Titolo Pagina */}
      <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Contattami</h1>

      {/* Sezione Contenuto */}
      <section className={styles.contentSection}>
        <p className={styles.contentText} style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Sono sempre aperto a nuove opportunità, collaborazioni interessanti o semplicemente a una conversazione su tecnologia e innovazione.
        </p>
        <p className={styles.contentText} style={{ fontSize: '1rem', color: 'var(--secondary-color)', marginBottom: '2.5rem' }}>
          Puoi raggiungermi tramite email o collegarti con me su LinkedIn:
        </p>

        {/* Contenitore per i bottoni/link */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

            {/* Bottone Email (Cliccabile) */}
            <a
              href={`mailto:${myEmail}`}
              className={styles.emailLink || 'contact-button'} // Usa la classe se definita, altrimenti usa una generica
              style={{ // Stili inline (puoi spostarli in CSS se preferisci)
                display: 'inline-flex', // Per allineare icona e testo
                alignItems: 'center',
                gap: '0.5rem', // Spazio tra icona e testo
                padding: '0.8rem 1.5rem',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                minWidth: '250px', // Larghezza minima per uniformità
                justifyContent: 'center' // Centra contenuto nel bottone
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span role="img" aria-label="email">✉️</span> {myEmail}
            </a>

            {/* Bottone LinkedIn */}
            <a
              href={myLinkedIn}
              target="_blank" // Apre in una nuova tab
              rel="noopener noreferrer" // Buona pratica per sicurezza/SEO
              className={styles.linkedinLink || 'contact-button-secondary'} // Usa classe se definita
              style={{ // Stili inline (puoi spostarli in CSS)
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.5rem',
                backgroundColor: '#0077B5', // Colore LinkedIn
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                minWidth: '250px',
                 justifyContent: 'center'
              }}
               onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
               onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
               onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
               onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Puoi usare un'icona SVG o una libreria di icone qui se vuoi */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
             {/* Aggiungi qui altri link se necessario (es. GitHub) */}

        </div>

        <p className={styles.contentText} style={{ marginTop: '3rem', fontSize: '0.9rem', color: 'var(--secondary-color)' }}>
          Attendo con interesse tue notizie!
        </p>

      </section>

    </motion.div>
  );
}
export default ContactPage;