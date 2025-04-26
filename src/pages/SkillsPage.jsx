import React from 'react';
import { motion } from 'framer-motion';
// Riutilizziamo gli stili di ExperiencePage per coerenza
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

function SkillsPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer}
    >
      {/* Titolo Pagina */}
      <h1 className={styles.title} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Competenze</h1>

      {/* --- Sezione Sviluppo Software --- */}
      <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Sviluppo Software</h3>
        <ul className={`${styles.list} ${styles.gridList}`}> {/* Griglia per più voci */}
          <li className={styles.listItem}><strong>Linguaggi:</strong> C#, Python, C/C++, JavaScript, HTML5, CSS3</li>
          <li className={styles.listItem}><strong>Backend:</strong> .NET Framework / .NET Core, Django, API RESTful</li>
          <li className={styles.listItem}><strong>Frontend:</strong> React.js, UI/UX Design (Principi), Sviluppo HMI</li>
          <li className={styles.listItem}><strong>Database:</strong> MySQL (Progettazione Schemi, Query SQL), Principi NoSQL</li>
          <li className={styles.listItem}><strong>Framework/Librerie:</strong> Entity Framework (se usato), QT Framework (C++)</li>
           <li className={styles.listItem}><strong>Paradigmi:</strong> Programmazione Object-Oriented (OOP), Programmazione Asincrona</li>
           <li className={styles.listItem}><strong>Testing:</strong> Unit Testing (Principi), Debugging Applicazioni</li>
        </ul>
      </section>

      {/* --- Sezione Tecnologie e Strumenti --- */}
      <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Tecnologie e Strumenti</h3>
         <ul className={`${styles.list} ${styles.gridList}`}>
            <li className={styles.listItem}><strong>Sistemi Operativi:</strong> Windows (Client/Server base), Linux (Fondamenti), MacOS</li>
            <li className={styles.listItem}><strong>Controllo Versione:</strong> Git, GitHub</li>
            <li className={styles.listItem}><strong>IDE e Editor:</strong> Visual Studio, Visual Studio Code, Arduino IDE</li>
            <li className={styles.listItem}><strong>Software Video:</strong> Adobe Premiere Pro (Montaggio, Color Correction Base)</li>
            <li className={styles.listItem}><strong>Hardware:</strong> Computer, Server, Microcontrollori</li>
            <li className={styles.listItem}><strong>Networking (Base):</strong> TCP/IP, HTTP, Configurazione Wi-Fi/LAN</li>
             <li className={styles.listItem}><strong>Cloud (Principi):</strong> Concetti base di piattaforme IoT Cloud</li>
        </ul>
      </section>

        {/* --- Sezione Competenze Tecniche Specifiche --- */}
        <section className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Competenze Tecniche Specifiche</h3>
            <ul className={styles.list}> {/* Lista semplice qui */}
                <li className={styles.listItem}><strong>Internet of Things (IoT):</strong> Sviluppo firmware per ESP32, Integrazione sensori, Comunicazione Wi-Fi/Telegram</li>
                <li className={styles.listItem}><strong>Supporto IT e Help Desk:</strong> Troubleshooting Hardware/Software/Rete, Gestione Postazioni Windows, Linux, MacOS</li>
                <li className={styles.listItem}><strong>Sistemi HVAC:</strong> Conoscenza base funzionamento, Tecniche di Installazione/Manutenzione/Diagnostica (da Air Service)</li>
                <li className={styles.listItem}><strong>Produzione Video:</strong> Tecniche di ripresa base, Montaggio non lineare, Gestione attrezzatura audiovisiva</li>
                <li className={styles.listItem}><strong>Automazione Industriale (Base):</strong> Interfacciamento software con sistemi Pick&Place</li>
                <li className={styles.listItem}><strong>Digital Humanities:</strong> Applicazione di metodi computazionali a contesti umanistici</li>
            </ul>
        </section>

      {/* --- Sezione Competenze Trasversali (Soft Skills) --- */}
      <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Competenze Trasversali</h3>
        <ul className={`${styles.list} ${styles.gridList}`}>
          <li className={styles.listItem}>Problem Solving (Analitico, Metodico, Creativo)</li>
          <li className={styles.listItem}>Adattabilità e Flessibilità (Contesti diversi, Tecnologie nuove)</li>
          <li className={styles.listItem}>Apprendimento Continuo e Curiosità Intellettuale</li>
          <li className={styles.listItem}>Lavoro in Team e Collaborazione Multidisciplinare</li>
          <li className={styles.listItem}>Lavoro in Autonomia e Gestione del Tempo/Priorità</li>
          <li className={styles.listItem}>Comunicazione Efficace (Tecnica e Non Tecnica)</li>
          <li className={styles.listItem}>Pensiero Critico e Approccio Interdisciplinare</li>
           <li className={styles.listItem}>Attenzione ai Dettagli e Precisione</li>
           <li className={styles.listItem}>Relazione con il Cliente/Utente</li>
        </ul>
      </section>

       {/* --- Sezione Lingue --- */}
       <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Lingue</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}><strong>Italiano:</strong> Madrelingua</li>
          <li className={styles.listItem}><strong>Inglese:</strong> Livello B2, (Lettura tecnica, Scrittura, Comprensione)</li>
        </ul>
      </section>

    </motion.div>
  );
}
export default SkillsPage;