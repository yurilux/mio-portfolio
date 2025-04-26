import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { timelineItems } from '../data/timelineData';
import NotFoundPage from './NotFoundPage';
// Componenti Demo
import RiverMonitorDemo from '../components/DemoComponents/RiverMonitorDemo'; // Importa la demo specifica
// Stili
import styles from './ExperiencePage.module.css'; // Usiamo gli stili di ExperiencePage

// --- IMPORTA SOLO LE IMMAGINI SPECIFICATE ---
// !!! ASSICURATI CHE QUESTI PERCORSI SIANO CORRETTI PER I TUOI FILE !!!
import webAppScreenshot from '../assets/river-monitor/river-monitor-webapp.jpg';
import telegramBotScreenshot from '../assets/river-monitor/telegram-bot.png';
import prototypeAssembly from '../assets/river-monitor/esp32-assembly.jpg';
import blockDiagram from '../assets/river-monitor/block-diagram.svg';

// Animazione base per l'ingresso della pagina
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

// Funzione Componente per la Pagina Progetto
function ProjectPage() {
  const { id } = useParams();

  const projectData = timelineItems.find(item => item.id === id && item.type === 'project');

  if (!projectData) {
    return <NotFoundPage />;
  }

  const isRiverMonitor = id === 'controllo-fiume';

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer}
    >
      <Link to="/" className={styles.backLink}>← Torna alla Home</Link>

       {/* Header della Pagina Progetto */}
       <header className={styles.pageHeader}>
         <span className={styles.icon}>{projectData.icon}</span>
         <div>
             <h1 className={styles.title}>{projectData.title}</h1>
             <h2 className={styles.source}>{projectData.category || projectData.source || 'Progetto'}</h2>
             {projectData.period && <p className={styles.period}>{projectData.period}</p>}
         </div>
       </header>

       {/* --- CONTENUTO SPECIFICO DEL PROGETTO (RENDERIZZATO SE isRiverMonitor è true) --- */}

       {isRiverMonitor && (
         <> {/* Fragment per raggruppare le sezioni specifiche */}
           {/* Obiettivo del Progetto */}
           <section className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>Obiettivo del Progetto</h3>
              <p className={styles.contentText}>
                  Realizzare un sistema di monitoraggio fluviale wireless a basso costo (inferiore a 100€) e facilmente replicabile, utilizzando un microcontrollore ESP32 e sensori comuni. L'obiettivo primario è fornire dati in tempo reale sul livello dell'acqua, condizioni ambientali (temperatura, umidità) e precipitazioni, al fine di prevenire danni causati da esondazioni e permettere una risposta tempestiva alle emergenze.
              </p>
           </section>

           {/* Soluzione Tecnica */}
           <section className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>Soluzione Tecnica Adottata</h3>
              <p className={styles.contentText}>
                  Il cuore del sistema è un <strong>ESP32 (TTGO T-Display)</strong>, un System-on-Chip con Wi-Fi e Bluetooth integrati, programmato tramite l'IDE Arduino in linguaggio C. I dati ambientali vengono raccolti tramite:
              </p>
              <ul className={styles.list}>
                   <li className={styles.listItem}><strong>Sensore a Ultrasuoni HC-SR04:</strong> Misura la distanza dalla superficie dell'acqua (pin 26/27).</li>
                   <li className={styles.listItem}><strong>Sensore DHT11:</strong> Rileva temperatura e umidità (pin 17).</li>
                   <li className={styles.listItem}><strong>Pluviometro a Doppia Vaschetta Basculante:</strong> Registra la pioggia (interrupt pin 21).</li>
              </ul>
              <p className={styles.contentText}>
                   Alimentato da <strong>pannello solare</strong> e <strong>power bank</strong>, protetto da scatola IP56.
              </p>
           </section>

            {/* Caratteristiche Principali e Comunicazione */}
           <section className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>Caratteristiche e Comunicazione</h3>
               <ul className={`${styles.list} ${styles.gridList}`}>
                   <li className={styles.listItem}><strong>Pagina Web Asincrona:</strong> Dati live via Wi-Fi (HTTP).</li>
                   <li className={styles.listItem}><strong>Bot Telegram:</strong> Resoconti periodici, allerte e comandi on-demand.</li>
                   <li className={styles.listItem}><strong>Display Integrato (TFT):</strong> Visualizzazione locale dei dati.</li>
                   <li className={styles.listItem}><strong>Buzzer Locale:</strong> Sirena d'allarme in caso di emergenza.</li>
                   <li className={styles.listItem}><strong>Configurabilità Utente:</strong> Intervalli, limiti, Wi-Fi.</li>
               </ul>
           </section>

            {/* Software e Architettura - CON IMMAGINI SPECIFICHE */}
           <section className={styles.contentSection}>
               <h3 className={styles.sectionTitle}>Software e Architettura</h3>
               <p className={styles.contentText}>
                   Firmware in C (IDE Arduino, ~600 righe). Utilizzo di librerie per sensori, WiFi, Telegram, Display, Buzzer. Gestione interrupt per pluviometro.
               </p>
               {/* --- IMMAGINI DIAGRAMMA E ASSEMBLAGGIO --- */}
               <div className={styles.galleryGrid}>
                    <div className={styles.imageContainer}>
                        {/* Immagine del diagramma a blocchi */}
                        <img src={blockDiagram} alt="Schema a blocchi del sistema di monitoraggio" className={styles.projectImage} />
                        <p className={styles.caption}>Schema a Blocchi del Sistema</p>
                    </div>
                     <div className={styles.imageContainer}>
                         {/* Immagine dell'assemblaggio */}
                        <img src={prototypeAssembly} alt="Foto prototipo assemblato nella scatola" className={styles.projectImage} />
                        <p className={styles.caption}>Assemblaggio del Prototipo</p>
                    </div>
               </div>
           </section>

           {/* Risultati e Dimostrazione - CON IMMAGINI SPECIFICHE */}
           <section className={styles.contentSection}>
               <h3 className={styles.sectionTitle}>Risultati e Dimostrazione</h3>
               <p className={styles.contentText}>
                   Il sistema è stato testato con successo. Le interfacce web e Telegram permettono un facile accesso ai dati e alle allerte.
               </p>
               {/* --- IMMAGINI WEBAPP E TELEGRAM --- */}
               <div className={styles.galleryGrid}>
                   <div className={styles.imageContainer}>
                       {/* Immagine screenshot webapp */}
                       <img src={webAppScreenshot} alt="Screenshot pagina web monitoraggio fiume" className={styles.projectImage} />
                       <p className={styles.caption}>Interfaccia Web con Dati Live</p>
                   </div>
                   <div className={styles.imageContainer}>
                       {/* Immagine screenshot Telegram */}
                        <img src={telegramBotScreenshot} alt="Screenshot chat bot Telegram" className={styles.projectImage} />
                        <p className={styles.caption}>Interazione con il Bot Telegram</p>
                   </div>
               </div>
           </section>

           {/* Miglioramenti Futuri */}
           <section className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>Miglioramenti Futuri Possibili</h3>
              <ul className={styles.list}>
                  <li className={styles.listItem}>Aggiornamento sensori.</li>
                  <li className={styles.listItem}>Sensori aggiuntivi (pressione, vento).</li>
                  <li className={styles.listItem}>Protocollo HTTPS.</li>
                  <li className={styles.listItem}>App mobile dedicata.</li>
                  <li className={styles.listItem}>Adattamento per altri fenomeni.</li>
                  <li className={styles.listItem}>Integrazione piattaforme IoT cloud.</li>
              </ul>
           </section>

            {/* Demo Interattiva */}
            <section className={styles.contentSection}>
                <h3 className={styles.sectionTitle}>Demo Interattiva</h3>
                <RiverMonitorDemo />
            </section>
         </> // Fine fragment per isRiverMonitor
       )}

       {/* --- FINE CONTENUTO SPECIFICO --- */}

       {/* Sezione generica per altri progetti futuri (se l'ID non è 'controllo-fiume') */}
       {!isRiverMonitor && (
            <section className={styles.contentSection}>
                <h3 className={styles.sectionTitle}>Dettagli Progetto</h3>
                <p className={styles.contentText}>Informazioni dettagliate per il progetto: {projectData.title}.</p>
                <div className={`${styles.placeholder} ${styles.placeholderDemo}`}>
                     <p>Demo Interattiva (Simulata) per questo progetto.</p>
                     <span className={styles.placeholderIcon}>💡</span>
                </div>
            </section>
       )}



    </motion.div> // Fine motion.div
  );
}

// Esporta il componente
export default ProjectPage;