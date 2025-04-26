import React from 'react';
import Timeline from '../components/Timeline/Timeline'; // Assicurati che questo percorso sia corretto!
import styles from './HomePage.module.css'; // Importa gli stili che abbiamo appena creato

function HomePage() {
  return (
    <div>
      {/* Sezione introduttiva */}
      <section className={styles.introSection}>
        {/* Titolo principale con il tuo nome */}
        <h1 className={styles.introTitle}>Iulian Bottale</h1>

        {/* Sottotitolo/Descrizione breve */}
        <p className={styles.introSubtitle}>
          Studente di Informatica Umanistica, Università di Pisa | Junior Software Developer
        </p>

        {/* Testo introduttivo personalizzato */}
        <p className={styles.introText}>
          Affascinato dall'intersezione tra tecnologia, logica e creatività umana, sto approfondendo le mie competenze in <strong>Informatica Umanistica</strong>. 
          Il mio percorso è arricchito da esperienze pratiche diverse: dallo <strong>sviluppo software</strong> in ambito industriale (.NET, C#, Web) al <strong>supporto IT</strong> sul campo, dal <strong>videomaking</strong> per la comunicazione istituzionale alla realizzazione di <strong>progetti IoT</strong> personali. Cerco costantemente di applicare un approccio analitico e orientato alla soluzione per creare esperienze digitali funzionali e significative.
        </p>
         {/* Puoi aggiungere un'altra frase qui se vuoi, ad esempio: */}
         {/* <p className={styles.introText} style={{marginTop: '1rem'}}>Questo portfolio mostra le tappe principali del mio percorso.</p> */}

        {/* Bottone opzionale per scrollare alla timeline */}
        {/* <a href="#timeline" className="button-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>Esplora il mio percorso</a> */}
      </section>

      {/* Includi la Timeline */}
      <Timeline />

    </div>
  );
}

export default HomePage;