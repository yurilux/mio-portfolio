// src/pages/BionicConverterPage.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react'; // AGGIUNGI useState e useCallback
import { motion } from 'framer-motion';
import styles from './BionicConverterPage.module.css';
import useTheme from '../hooks/useTheme'; // IMPORTA il tuo hook useTheme

// Animazioni di pagina (le stesse delle altre pagine)
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

const BionicConverterPage = () => {
  const iframeRef = useRef(null); // Crea un ref per l'iframe
  const [theme] = useTheme(); // Ottieni il tema corrente dal tuo hook
  const [iframeLoaded, setIframeLoaded] = useState(false); // Nuovo stato per tracciare il caricamento dell'iframe

  // Correggi il percorso per l'iframe usando import.meta.env.BASE_URL
  const converterUrl = `${import.meta.env.BASE_URL}bionic-converter/index.html`;

  // Funzione per applicare il tema al body dell'iframe.
  // Questa funzione utilizza un meccanismo di riprova per assicurarsi che il body dell'iframe sia disponibile.
  const applyThemeToIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) {
      // L'iframe o il suo documento interno non è ancora disponibile.
      // console.warn("Iframe o il suo contentDocument non è pronto.");
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; // Prova fino a 20 volte
    const intervalTime = 50; // Ogni 50ms (totale 1 secondo di tentativi)

    const tryApply = () => {
      const iframeBody = iframe.contentDocument.body;
      if (iframeBody) {
        // Il body è disponibile, applica la classe.
        if (theme === 'dark') {
          iframeBody.classList.add('dark');
        } else {
          iframeBody.classList.remove('dark');
        }
        // console.log(`Tema applicato all'iframe dopo ${attempts * intervalTime}ms.`);
      } else if (attempts < maxAttempts) {
        // Il body non è ancora disponibile, riprova.
        attempts++;
        setTimeout(tryApply, intervalTime);
      } else {
        // Troppi tentativi, il body non è stato trovato.
        // console.error("Impossibile applicare il tema: body dell'iframe non trovato dopo ripetuti tentativi.");
      }
    };

    tryApply(); // Inizia il processo di riprova
  }, [theme]); // Questa funzione dipende solo dalla variabile 'theme'

  // Questo useEffect si attiva quando il tema del portfolio cambia O quando l'iframe è stato caricato.
  // Applica il tema al body dell'iframe.
  useEffect(() => {
    if (iframeLoaded) {
      // Quando il tema cambia o l'iframe è stato caricato, applichiamo il tema.
      // Un piccolo ritardo iniziale può aiutare a gestire le race condition.
      const timeoutId = setTimeout(() => {
        applyThemeToIframe();
      }, 100); // Ritardo di 100ms per i cambi di tema successivi al primo caricamento

      // Funzione di cleanup per pulire il timeout se il componente si smonta
      // o se le dipendenze cambiano prima che il timeout si attivi.
      return () => clearTimeout(timeoutId);
    }
  }, [theme, iframeLoaded, applyThemeToIframe]); // Dipendenze: theme, stato di caricamento iframe e la funzione di applicazione tema

  // Questa funzione viene chiamata una volta quando l'iframe ha finito di caricare il suo contenuto.
  const handleIframeLoad = () => {
    setIframeLoaded(true); // Segnala che l'iframe è stato caricato.
    // console.log("Iframe onLoad fired, setting iframeLoaded to true.");

    // Applica il tema immediatamente dopo il caricamento iniziale dell'iframe.
    // Un piccolo ritardo qui può aiutare a garantire che anche gli stili CSS dell'iframe
    // siano stati completamente applicati prima di manipolare le classi del body.
    setTimeout(() => {
      applyThemeToIframe();
    }, 50); // Ritardo di 50ms per l'applicazione iniziale del tema
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer}
    >

       <h1 className={styles.pageTitle}>EPUB Bionic Converter</h1>
       <p className={styles.pageDescription}>
           Un tool per convertire file EPUB in formato Bionic Reading, con elaborazione completamente client-side.
           Carica il tuo file e scarica la versione convertita!
       </p>

       {/* L'iframe che carica l'applicazione statica */}
       <iframe
         ref={iframeRef} // Collega il ref all'iframe
         src={converterUrl}
         className={styles.converterFrame}
         title="EPUB Bionic Reading Converter"
         sandbox="allow-scripts allow-same-origin allow-downloads allow-forms"
         onLoad={handleIframeLoad} // Chiama la funzione quando l'iframe è caricato
       >
         {/* Fallback per browser che non supportano iframe */}
         Il tuo browser non supporta gli iframe. Puoi accedere al converter <a href={converterUrl} target="_blank" rel="noopener noreferrer">qui</a>.
       </iframe>
    </motion.div>
  );
};

export default BionicConverterPage;