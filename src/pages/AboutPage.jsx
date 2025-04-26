import React from 'react';
import { motion } from 'framer-motion';
// Utilizziamo gli stessi stili di ExperiencePage per coerenza,
// ma puoi creare un AboutPage.module.css se preferisci stili dedicati.
import styles from './ExperiencePage.module.css';

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

function AboutPage() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer} 
    >

       <h1 className={styles.title} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Chi Sono</h1>

       {/* Introduzione e Motivazione */}
       <section className={styles.contentSection}>
          <p className={styles.contentText}>
              Fin dai tempi del diploma in Elettronica ed Elettrotecnica, ho coltivato una doppia anima: quella affascinata dalla logica rigorosa dei circuiti e del codice, e quella incuriosita dalla complessità dell'interazione umana. Questa dualità mi ha guidato verso <strong>Informatica Umanistica</strong> all'Università di Pisa. Non cercavo solo di affinare le competenze di programmazione già esplorate in ambito lavorativo, ma desideravo profondamente comprendere il "perché" e il "come" dietro l'interfaccia tra uomo e macchina. Credo fermamente che per creare tecnologia realmente efficace, che sia software, hardware o un'esperienza digitale; sia essenziale partire dalla comprensione dell'utente finale, delle sue esigenze e del suo contesto.
          </p>
       </section>

       {/* Il Valore dell'Interdisciplinarità */}
       <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Il Valore dell'Interdisciplinarità</h3>
          <p className={styles.contentText}>
              L'informatica umanistica mi offre gli strumenti per analizzare criticamente l'impatto della tecnologia. Aree come l'<strong>Intelligenza Artificiale</strong> e l'<strong>etica digitale</strong>, la progettazione <strong>UI/UX</strong> centrata sull'utente, e l'<strong>analisi dei dati</strong> in contesti sociali non sono solo sfide tecniche, ma questioni profondamente umane. Puoi progettare l'interfaccia più avanzata, ma la sua efficacia dipende dalla capacità di comunicare chiaramente con chi la utilizza, tenendo conto della sua esperienza e del suo background. È questo dialogo tra codice e cultura che mi appassiona e che ritengo fondamentale per innovare in modo responsabile.
          </p>
       </section>

        {/* Un Percorso Eterogeneo */}
        <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Un Percorso Eterogeneo, Una Skill Chiave</h3>
          <p className={styles.contentText}>
              Il mio percorso professionale e accademico può sembrare eterogeneo, dallo sviluppo software per l'automazione industriale al supporto IT sul campo, dal videomaking istituzionale ai progetti IoT personali, ma è unito da un filo conduttore: la <strong>curiosità</strong> e la ricerca costante di nuove sfide. Ogni esperienza mi ha insegnato qualcosa di unico, ma la lezione più importante è stata l'importanza dell'<strong>adattabilità</strong>. Essere il "nuovo arrivato" o l'inesperto in un contesto mi ha spesso permesso di osservare processi consolidati con occhi freschi, identificando aree di miglioramento che magari i più esperti davano per scontate. Non pretendo di eccellere in un unico campo, ma la mia forza risiede nella capacità di apprendere rapidamente, integrare conoscenze diverse e adattarmi a nuovi ambienti e tecnologie.
          </p>
       </section>

       {/* Approccio e Interessi */}
       <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Approccio e Interessi</h3>
          <p className={styles.contentText}>
              Affronto i problemi con un approccio prevalentemente <strong>analitico e metodico</strong>, ma credo che la <strong>creatività</strong> sia indispensabile per trovare soluzioni originali e la <strong>collaborazione</strong> fondamentale per realizzarle al meglio. Sono motivato dalle <strong>sfide tecniche complesse</strong>, dalla possibilità di lavorare su progetti che abbiano un <strong>impatto sociale positivo</strong> e, soprattutto, dall'<strong>opportunità di imparare continuamente</strong>. Sono consapevole di essere all'inizio del mio percorso professionale, ma questo mi spinge a rimanere costantemente aggiornato sulle ultime tendenze tecnologiche, dall'AI ai nuovi paradigmi di sviluppo.
          </p>
           <p className={styles.contentText}>
                Oltre alla tecnologia, coltivo interessi diversi come la filosofia, la psicologia, la fotografia e attività all'aperto come bici, skate e nuoto, che alimentano la mia curiosità e mi spingono a esplorare sempre nuovi orizzonti.
           </p>
       </section>

       {/* Visione Futura */}
       <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Visione Futura</h3>
          <p className={styles.contentText}>
              Il mio obiettivo immediato è completare con successo il percorso universitario. Successivamente, sono aperto a diverse possibilità: mi piacerebbe trovare un ruolo stimolante che mi permetta di continuare a crescere, magari esplorando opportunità in Europa. Sono particolarmente attratto da posizioni "intercomunicative", dove le mie competenze tecniche di sviluppo possano unirsi alla mia capacità di interfacciarmi con diverse figure professionali e, potenzialmente, con i clienti. Cerco un ambiente dove poter contribuire a progetti significativi, che lascino un impatto positivo e mi permettano di mettere a frutto la mia visione interdisciplinare.
          </p>
       </section>

    </motion.div>
  );
}
export default AboutPage;