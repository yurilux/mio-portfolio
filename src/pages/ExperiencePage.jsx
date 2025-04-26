import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Per leggere l'ID URL e creare link
import { motion } from 'framer-motion'; // Per le animazioni di pagina
import { timelineItems } from '../data/timelineData'; // Importa i dati dell'array della timeline
import NotFoundPage from './NotFoundPage'; // Importa il componente per la pagina 404
// Componenti Demo
import InventoryDemo from '../components/DemoComponents/InventoryDemo'; // Demo Inventario IT
import PickPlaceDemo from '../components/DemoComponents/PickPlaceDemo'; // Demo Flusso Pick&Place
// Stili
import styles from './ExperiencePage.module.css'; // Importa gli stili specifici per questa pagina



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


// ##############################################
// ### COMPONENTE PRINCIPALE: ExperiencePage  ###

function ExperiencePage() {
  const { id } = useParams(); // Ottieni l'ID dall'URL

  // Trova l'elemento corrispondente nei dati della timeline (esperienze o educazione)
  const experienceData = timelineItems.find(item => item.id === id && (item.type === 'experience' || item.type === 'education'));

  // Se l'ID non corrisponde, mostra la pagina 404
  if (!experienceData) {
    return <NotFoundPage />;
  }

  // --- Identificatori Specifici per Contenuto Condizionale ---
  const isStudentePisa = id === 'studente-pisa';
  const isCroceRossaBucarest = id === 'croce-rossa-bucarest';
  const isTwsAutomation = id === 'tws-automation';
  const isRegioneToscana = id === 'regione-toscana';
  const isAirService = id === 'air-service';
  // Aggiungi qui altri identificatori per future esperienze

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.pageContainer} // Applica stile contenitore
    >
      {/* Bottone per tornare indietro */}
      <Link to="/" className={styles.backLink}>← Torna alla Home</Link>

      {/* Intestazione Pagina (Dinamica) */}
      <header className={styles.pageHeader}>
        <span className={`${styles.icon} ${isStudentePisa ? styles.iconPisa : ''}`}>{experienceData.icon}</span>
        <div>
            <h1 className={styles.title}>{experienceData.title}</h1>
            <h2 className={styles.source}>{experienceData.source}</h2>
            {experienceData.period && <p className={styles.period}>{experienceData.period}</p>}
            {experienceData.location && <p className={styles.location}>📍 {experienceData.location}</p>}
        </div>
      </header>



      {/* ############################################## */}
      {/* ### INIZIO CONTENUTO SPECIFICO PAGINA      ### */}
      {/* ############################################## */}



      {/* Descrizione Dettagliata */}
      <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Descrizione {experienceData.type === 'education' ? 'del Percorso' : 'dell\'Esperienza'}</h3>
        <p className={styles.contentText}>
          {experienceData.description} {/* Descrizione base dalla timeline */}
        </p>


        {isStudentePisa && (
           <>
             <p className={styles.contentText}>
               Il corso di laurea in <strong>Informatica Umanistica</strong> presso l'<strong>Università di Pisa</strong> rappresenta un percorso formativo all'avanguardia, progettato per creare un ponte tra il rigore metodologico delle scienze informatiche e la profondità critica delle discipline umanistiche. La scelta di questo corso nasce dalla volontà di esplorare come la tecnologia possa non solo risolvere problemi pratici, ma anche arricchire la nostra comprensione della cultura, della lingua e della società.
             </p>
             <p className={styles.contentText}>
               Il curriculum offre una solida preparazione in aree fondamentali dell'informatica come la <strong>programmazione</strong> (es. Python, Java, C), gli <strong>algoritmi</strong>, le <strong>basi di dati</strong>, le <strong>reti</strong> e lo <strong>sviluppo web</strong>, integrate con lo studio di materie umanistiche quali la <strong>linguistica computazionale</strong>, la <strong>filosofia del linguaggio e della mente</strong>, la <strong>semiotica</strong>, le metodologie per le <strong>Digital Humanities</strong> e la <strong>storia della tecnologia</strong>.
             </p>
             <p className={styles.contentText}>
                 L'obiettivo finale è formare professionisti capaci non solo di sviluppare software, ma anche di progettare esperienze digitali consapevoli, analizzare criticamente l'impatto delle tecnologie e applicare strumenti computazionali all'analisi e alla valorizzazione del patrimonio culturale e informativo.
             </p>
           </>
        )}


        {isCroceRossaBucarest && (
           <>
             <p className={styles.contentText}>
               Come volontario IT presso la filiale di Bucarest della <strong>Crucea Roșie Română</strong>, ho avuto l'opportunità preziosa di mettere le mie competenze tecniche al servizio di una causa umanitaria fondamentale. Il ruolo prevedeva la gestione operativa e strategica dell'ambiente IT locale, garantendo che lo staff e gli altri volontari disponessero di strumenti tecnologici affidabili ed efficienti per svolgere le loro attività di supporto alla comunità.
             </p>
             <p className={styles.contentText}>
               L'esperienza si è svolta in un contesto dinamico e spesso con risorse limitate, il che ha richiesto un forte spirito di adattamento, capacità di problem solving creativo e un approccio proattivo nella ricerca di soluzioni sostenibili. L'obiettivo principale era assicurare la continuità operativa dei sistemi informatici, minimizzare i disservizi e formare gli utenti sull'utilizzo efficace degli strumenti a disposizione.
             </p>
             <p className={styles.contentText}>
                 Contribuire, anche attraverso il supporto tecnico, alle missioni della Croce Rossa è stato estremamente formativo, rafforzando la consapevolezza di come la tecnologia possa essere un abilitatore essenziale anche nel settore non-profit.
             </p>
           </>
        )}


        {isTwsAutomation && (
             <>
               <p className={styles.contentText}>
                 Presso <strong>TWS Automation S.r.l.</strong>, ho ricoperto il ruolo di <strong>Software Engineer</strong> con un focus Full Stack, immergendomi nel dinamico settore dell'automazione industriale. La mia responsabilità principale era contribuire all'intero ciclo di vita del software, dalla progettazione alla realizzazione e al testing di soluzioni robuste per il controllo e la gestione di macchinari industriali, con una particolare enfasi sui sistemi per dispositivi <strong>Pick&Place</strong>.
               </p>
               <p className={styles.contentText}>
                 Questa esperienza mi ha permesso di consolidare le mie competenze nello sviluppo backend utilizzando il <strong>.NET Framework e C#</strong>, progettando e implementando logiche applicative complesse, API per l'interfacciamento tra sistemi e garantendo una comunicazione efficiente e affidabile con i database (principalmente <strong>MySQL</strong>). Ho lavorato sulla creazione di sistemi scalabili, capaci di gestire flussi di dati significativi provenienti dai macchinari.
               </p>
                <p className={styles.contentText}>
                   Sul versante frontend, mi sono dedicato alla progettazione e allo sviluppo di <strong>Interfacce Uomo-Macchina (HMI)</strong>, puntando a creare esperienze utente intuitive ed efficaci per gli operatori. Ho utilizzato framework moderni come <strong>React</strong> per interfacce web specifiche e ho avuto modo di esplorare le potenzialità del framework <strong>QT</strong> per applicazioni desktop cross-platform. L'esperienza ha incluso anche l'utilizzo di <strong>Django</strong> per lo sviluppo di specifici servizi web interni.
                </p>
                <p className={styles.contentText}>
                    Lavorare in TWS Automation ha significato operare sia in autonomia su task specifici, sia in stretta collaborazione con team multidisciplinari (ingegneri meccanici, elettronici), affinando la capacità di adattarsi a requisiti tecnici mutevoli e a scadenze sfidanti tipiche del settore.
                </p>
             </>
        )}

         {isRegioneToscana && (
            <>
              <p className={styles.contentText}>
                Collaborando con la <strong>Regione Toscana</strong> su specifici progetti di comunicazione istituzionale ed eventi, ho avuto l'opportunità di operare come <strong>Videomaker</strong>, gestendo diverse fasi cruciali del processo di produzione audiovisiva. L'obiettivo principale era tradurre le esigenze comunicative dell'ente in contenuti video chiari, coinvolgenti e professionali, destinati a diverse piattaforme e pubblici.
              </p>
               <p className={styles.contentText}>
                 Questa esperienza mi ha permesso di sviluppare competenze pratiche end-to-end: dalla <strong>pianificazione logistica</strong> delle riprese (inclusi sopralluoghi e definizione delle attrezzature necessarie) alla <strong>gestione tecnica sul campo</strong> (operatore di ripresa, registrazione audio base per interviste, setup luci essenziale), fino alla fase di <strong>post-produzione</strong>. Ho acquisito familiarità con l'organizzazione del materiale girato e ho utilizzato intensivamente <strong>Adobe Premiere Pro</strong> per il montaggio, la color correction di base e l'aggiunta di grafiche.
               </p>
               <p className={styles.contentText}>
                 Lavorare in un contesto istituzionale ha inoltre richiesto buone capacità di <strong>coordinamento</strong> con i referenti interni e i soggetti intervistati, oltre a una forte attenzione al rispetto delle scadenze e alla qualità del prodotto finale, in linea con l'immagine dell'ente.
               </p>
            </>
          )}


          {isAirService && (
            <>
              <p className={styles.contentText}>
                In qualità di <strong>Tecnico Installatore / Manutentore</strong> presso <strong>Air Service S.r.l.</strong>, ho svolto un ruolo operativo fondamentale nella fornitura di servizi legati agli impianti di climatizzazione (HVAC) per una clientela variegata, comprendente sia utenze residenziali che commerciali/industriali. L'attività principale consisteva in interventi tecnici diretti sul campo.
              </p>
               <p className={styles.contentText}>
                 Le mie responsabilità spaziavano dall'<strong>installazione</strong> ex-novo di impianti (split, multi-split, canalizzati base), curando ogni dettaglio dalla posa delle unità e delle tubazioni ai collegamenti elettrici, fino alla <strong>manutenzione programmata</strong> essenziale per garantire l'efficienza e la longevità dei sistemi (pulizia, controllo pressioni, verifiche funzionali). Una parte significativa del lavoro era dedicata alla <strong>diagnostica</strong> e alla <strong>riparazione</strong> di guasti, utilizzando strumentazione specifica per identificare e risolvere problemi di natura meccanica, elettrica o legati al circuito frigorifero.
               </p>
               <p className={styles.contentText}>
                  Questa esperienza ha richiesto non solo solide competenze tecniche e abilità manuali, ma anche capacità di <strong>problem solving rapido</strong>, precisione nell'esecuzione, scrupoloso rispetto delle normative di <strong>sicurezza</strong> e un'efficace <strong>comunicazione con il cliente</strong> per spiegare gli interventi e fornire consulenza. La gestione autonoma degli interventi ha inoltre sviluppato le mie capacità organizzative e di gestione del tempo.
               </p>
            </>
          )}


      </section>




      {/* ############################################## */}
      {/* Sezione Principale Specifica (Aree Studio / Responsabilità / Competenze Tecniche / Attività / Resp. Tecniche) */}
      {/* ############################################## */}



      {isStudentePisa && (
        <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Aree di Studio Principali</h3>
          <ul className={`${styles.list} ${styles.gridList}`}>
              <li className={styles.listItem}>Sviluppo Web (Frontend & Backend)</li>
              <li className={styles.listItem}>Interazione Uomo-Macchina (UI/UX Design)</li>
              <li className={styles.listItem}>Basi di Dati Relazionali e NoSQL</li>
              <li className={styles.listItem}>Algoritmi e Strutture Dati</li>
              <li className={styles.listItem}>Linguistica Computazionale & Natural Language Processing (NLP)</li>
              <li className={styles.listItem}>Digital Humanities & Metodologie Computazionali per le Scienze Umane</li>
              <li className={styles.listItem}>Intelligenza Artificiale e Machine Learning (Principi)</li>
              <li className={styles.listItem}>Grafica Computazionale e Modellazione 3D</li>
              <li className={styles.listItem}>Reti di Calcolatori e Sicurezza Informatica (Fondamenti)</li>
          </ul>
        </section>
      )}


{isCroceRossaBucarest && (
        <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Responsabilità Chiave Gestite</h3>
          <ul className={`${styles.list} ${styles.gridList}`}>
             <li className={styles.listItem}><strong>Gestione Postazioni Utente:</strong> Installazione, configurazione (OS Windows, suite Office, software specifici), manutenzione e aggiornamento PC desktop e laptop.</li>
             <li className={styles.listItem}><strong>Supporto Tecnico (Help Desk):</strong> Assistenza di primo e secondo livello a staff e volontari per problematiche hardware, software e di rete.</li>
             <li className={styles.listItem}><strong>Manutenzione Hardware:</strong> Diagnostica guasti, sostituzione componenti base (RAM, SSD, alimentatori), pulizia interna/esterna dispositivi.</li>
             <li className={styles.listItem}><strong>Gestione Rete Locale (LAN/WLAN):</strong> Configurazione base router/switch, troubleshooting connettività Wi-Fi e cablata, gestione accessi.</li>
             <li className={styles.listItem}><strong>Gestione Account e Permessi:</strong> Creazione/modifica account utente (es. Active Directory base, Office 365 se applicabile), gestione password e accessi a risorse condivise.</li>
             <li className={styles.listItem}><strong>Configurazione e Gestione Periferiche:</strong> Installazione e manutenzione stampanti di rete/locali, scanner, webcam.</li>
             <li className={styles.listItem}><strong>Backup Dati (Base):</strong> Implementazione o verifica procedure di backup manuali/semiautomatiche per dati critici locali.</li>
             <li className={styles.listItem}><strong>Inventario IT e Documentazione:</strong> Mantenimento di un inventario semplificato hardware/software, creazione di piccole guide utente o procedure operative.</li>
             <li className={styles.listItem}><strong>Sicurezza Informatica (Base):</strong> Installazione/aggiornamento antivirus, sensibilizzazione utenti su pratiche sicure (phishing, password).</li>
          </ul>
        </section>
      )}


      {isTwsAutomation && (
        <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Aree di Competenza Tecnica Approfondite</h3>
          <ul className={`${styles.list} ${styles.gridList}`}>
            <li className={styles.listItem}>
              <strong>Backend Development (.NET/C#):</strong> Progettazione architetturale, sviluppo logica di business, creazione API RESTful, programmazione asincrona, integrazione con sistemi esterni.
            </li>
             <li className={styles.listItem}>
               <strong>Database Management (MySQL):</strong> Modellazione dati (schemi relazionali), scrittura query SQL complesse (Stored Procedure, Trigger se usati), ottimizzazione performance, gestione transazioni.
             </li>
            <li className={styles.listItem}>
              <strong>Frontend Development (HMI/Web):</strong> Sviluppo interfacce utente reattive e user-friendly, applicazione principi UI/UX, gestione stato applicazione.
            </li>
            <li className={styles.listItem}>
              <strong>Framework & Librerie Specifiche:</strong> Utilizzo approfondito di .NET Framework/Core, Entity Framework (se usato), React.js, Django (Python), QT Framework (C++).
            </li>
            <li className={styles.listItem}>
              <strong>Controllo Sistemi Pick&Place:</strong> Sviluppo software per la comunicazione (es. protocolli specifici, socket), gestione sequenze operative, interfacciamento con PLC/sensori (se pertinente).
            </li>
            <li className={styles.listItem}>
              <strong>Testing e Debugging:</strong> Unit testing (es. NUnit/xUnit), debugging applicazioni backend e frontend, analisi log.
            </li>
             <li className={styles.listItem}>
               <strong>Version Control (Git):</strong> Utilizzo di Git per la gestione del codice sorgente, branching strategy (es. GitFlow).
             </li>
          </ul>
        </section>
      )}

      {/* ============================================= */}
      {/* === SEZIONE: Competenze Chiave Sviluppate === */}
      {/* ============================================= */}

      {isRegioneToscana && (
          <section className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Attività Principali Svolte</h3>
            <ul className={`${styles.list} ${styles.gridList}`}>
              <li className={styles.listItem}>
                <strong>Pianificazione Riprese:</strong> Analisi requisiti, definizione concept, scouting location (se necessario), preparazione attrezzatura.
              </li>
              <li className={styles.listItem}>
                <strong>Riprese Video On-site:</strong> Operatore di ripresa per eventi, conferenze, interviste; gestione inquadrature, movimenti di camera base.
              </li>
               <li className={styles.listItem}>
                 <strong>Gestione Audio:</strong> Posizionamento microfoni (lavalier, ambientali base), registrazione audio di qualità sufficiente per interviste e parlato.
               </li>
                <li className={styles.listItem}>
                  <strong>Setup Luci (Base):</strong> Utilizzo di luci base (pannelli LED, faretti) per migliorare l'illuminazione delle scene, specialmente per le interviste.
                </li>
              <li className={styles.listItem}>
                <strong>Realizzazione Interviste:</strong> Supporto tecnico durante le interviste, assicurando corretta registrazione audio/video e messa a fuoco.
              </li>
              <li className={styles.listItem}>
                <strong>Organizzazione Materiale Girato:</strong> Backup, catalogazione (logging) delle clip, selezione preliminare del materiale utile per il montaggio.
              </li>
               <li className={styles.listItem}>
                <strong>Montaggio Video (Adobe Premiere Pro):</strong> Taglio e assemblaggio clip, sincronizzazione audio, editing narrativo, color correction/grading di base, titolazione e grafiche semplici.
              </li>
               <li className={styles.listItem}>
                <strong>Esportazione e Consegna:</strong> Rendering del video finale nei formati richiesti per diverse piattaforme (web, social).
              </li>
               <li className={styles.listItem}>
                 <strong>Coordinamento (Base):</strong> Interazione con referenti regionali, personale tecnico e soggetti intervistati per logistica e riprese.
               </li>
            </ul>
          </section>
        )}


        {isAirService && (
          <section className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Responsabilità Tecniche Principali</h3>
            <ul className={`${styles.list} ${styles.gridList}`}>
              <li className={styles.listItem}>
                <strong>Installazione Impianti HVAC:</strong> Montaggio unità interne/esterne (split, multi-split, canalizzati base), posa tubazioni frigorifere e scarico condensa, collegamenti elettrici secondo normative.
              </li>
              <li className={styles.listItem}>
                <strong>Manutenzione Preventiva e Programmata:</strong> Pulizia e sanificazione filtri/batterie, controllo pressioni e temperature circuito frigorifero, verifica assorbimenti elettrici, controllo termostati e comandi.
              </li>
              <li className={styles.listItem}>
                <strong>Diagnostica Guasti Avanzata:</strong> Utilizzo di strumentazione (manometri digitali, cercafughe, pinza amperometrica, multimetro) per identificare cause di malfunzionamento (perdite gas, problemi elettrici/elettronici, guasti meccanici).
              </li>
              <li className={styles.listItem}>
                <strong>Riparazione e Sostituzione Componenti:</strong> Interventi su schede elettroniche (diagnosi base), sostituzione compressori, motori ventilatori, valvole, sonde; brasatura tubazioni rame (se in possesso di patentino F-GAS).
              </li>
               <li className={styles.listItem}>
                <strong>Collaudo e Messa in Servizio:</strong> Verifica funzionale completa post-intervento, test performance, istruzioni base all'utente sul funzionamento.
              </li>
               <li className={styles.listItem}>
                 <strong>Gestione Gas Refrigeranti:</strong> Recupero e carica gas refrigerante nel rispetto delle normative ambientali (richiede patentino F-GAS).
               </li>
               <li className={styles.listItem}>
                 <strong>Compilazione Rapportini d'Intervento:</strong> Documentazione dettagliata del lavoro svolto, materiali utilizzati, tempi impiegati, firma cliente.
               </li>
               <li className={styles.listItem}>
                 <strong>Interazione Tecnica con il Cliente:</strong> Spiegazione chiara e professionale del problema riscontrato, delle soluzioni adottate e consigli per la corretta manutenzione.
               </li>
            </ul>
          </section>
        )}



      {/* ============================================= */}
      {/* Competenze Chiave / Trasversali */}
      {/* ============================================= */}


      <section className={styles.contentSection}>
        <h3 className={styles.sectionTitle}>Competenze Chiave Sviluppate</h3>
        <ul className={styles.list}>

          {/* Competenze specifiche per ogni esperienza */}

          {isStudentePisa && (
            <>
              <li className={styles.listItem}>Progettazione e Sviluppo Software (Python, Java, C, Web Stack)</li>
              <li className={styles.listItem}>Analisi e Modellazione di Dati (SQL, NoSQL, principi Big Data)</li>
              <li className={styles.listItem}>Progettazione di Interfacce Utente (UI/UX Fundamentals)</li>
              <li className={styles.listItem}>Algoritmi e Ottimizzazione delle Performance</li>
              <li className={styles.listItem}>Applicazione di Tecniche di NLP e Linguistica Computazionale</li>
              <li className={styles.listItem}>Metodologie delle Digital Humanities</li>
              <li className={styles.listItem}>Problem Solving Tecnico e Analitico Complesso</li>
              <li className={styles.listItem}>Pensiero Critico e Approccio Interdisciplinare</li>
              <li className={styles.listItem}>Gestione di Progetti Digitali (Fondamenti)</li>
              <li className={styles.listItem}>Comunicazione Efficace (Tecnica e Umanistica)</li>
              <li className={styles.listItem}>Capacità di Apprendimento Continuo e Adattamento Tecnologico</li>
            </>
          )}


          {isCroceRossaBucarest && (
            <>
              <li className={styles.listItem}>Problem Solving Tecnico in Contesti Reali</li>
              <li className={styles.listItem}>Troubleshooting Hardware, Software e Reti (Livello 1/2)</li>
              <li className={styles.listItem}>Gestione Sistemi Operativi Windows Client</li>
              <li className={styles.listItem}>Configurazione Reti Locali (TCP/IP, DNS/DHCP base, Wi-Fi)</li>
              <li className={styles.listItem}>Amministrazione Base Utenti e Permessi</li>
              <li className={styles.listItem}>Installazione e Configurazione Software Applicativi</li>
              <li className={styles.listItem}>Supporto Utente Empatico e Comunicazione Chiara</li>
              <li className={styles.listItem}>Capacità di Lavorare con Risorse Limitate</li>
              <li className={styles.listItem}>Adattabilità e Gestione dello Stress in situazioni di supporto</li>
              <li className={styles.listItem}>Organizzazione del Lavoro e Gestione Priorità (Ticketing base)</li>
              <li className={styles.listItem}>Documentazione Tecnica Essenziale (Guide, Procedure)</li>
              <li className={styles.listItem}>Principi di Sicurezza Informatica Operativa (Antivirus, Phishing Awareness)</li>
            </>
          )}

          {isTwsAutomation && (
             <>
               <li className={styles.listItem}>Sviluppo Software Full Stack in Contesto Industriale</li>
               <li className={styles.listItem}>Progettazione Architetturale Backend Scalabile</li>
               <li className={styles.listItem}>Programmazione Object-Oriented Avanzata (C#)</li>
               <li className={styles.listItem}>Gestione Completa Database Relazionali (MySQL)</li>
               <li className={styles.listItem}>Sviluppo Interfacce Utente Complesse (HMI/Web)</li>
               <li className={styles.listItem}>Problem Solving Analitico su Sistemi Complessi</li>
               <li className={styles.listItem}>Capacità di Lavoro in Team Multidisciplinari</li>
               <li className={styles.listItem}>Gestione Autonoma di Task e Progetti</li>
               <li className={styles.listItem}>Adattabilità a Diversi Stack Tecnologici</li>
               <li className={styles.listItem}>Comunicazione Tecnica Efficace</li>
             </>
          )}


          {isRegioneToscana && (
             <>
               <li className={styles.listItem}>Tecniche di Ripresa Video (Inquadrature, Movimenti base)</li>
               <li className={styles.listItem}>Montaggio Video Non Lineare (Adobe Premiere Pro)</li>
               <li className={styles.listItem}>Editing Narrativo e Sincronizzazione Audio/Video</li>
               <li className={styles.listItem}>Color Correction e Grading di Base</li>
               <li className={styles.listItem}>Utilizzo di Grafiche e Titolazione Semplice</li>
               <li className={styles.listItem}>Storytelling Visivo (Principi)</li>
               <li className={styles.listItem}>Gestione Attrezzature Audiovisive (Camera, Microfoni, Luci base)</li>
               <li className={styles.listItem}>Organizzazione e Pianificazione della Produzione</li>
               <li className={styles.listItem}>Gestione del Materiale Girato (Logging, Archiviazione)</li>
               <li className={styles.listItem}>Lavoro sotto Scadenze</li>
               <li className={styles.listItem}>Adattabilità a Diversi Contesti di Ripresa (Eventi, Interviste)</li>
               <li className={styles.listItem}>Comunicazione Interpersonale con Staff e Intervistati</li>
             </>
          )}


          {isAirService && (
              <>
                <li className={styles.listItem}>Conoscenza Approfondita Sistemi HVAC (Funzionamento, Componenti)</li>
                <li className={styles.listItem}>Tecniche di Installazione e Manutenzione secondo Normativa</li>
                <li className={styles.listItem}>Capacità Diagnostiche Avanzate (Elettriche, Meccaniche, Frigorifere)</li>
                <li className={styles.listItem}>Utilizzo Efficace di Strumentazione Tecnica Specifica</li>
                <li className={styles.listItem}>Problem Solving Pratico e Orientato alla Soluzione</li>
                <li className={styles.listItem}>Abilità Manuali e Precisione negli Interventi</li>
                <li className={styles.listItem}>Lavoro in Autonomia e Gestione Efficiente del Tempo</li>
                <li className={styles.listItem}>Lettura e Interpretazione Schemi Tecnici ed Elettrici</li>
                <li className={styles.listItem}>Attenzione Rigorosa alla Sicurezza sul Lavoro</li>
                <li className={styles.listItem}>Gestione Gas Refrigeranti (se con Patentino F-GAS)</li>
                <li className={styles.listItem}>Compilazione Precisa della Documentazione Tecnica</li>
                <li className={styles.listItem}>Relazione Professionale e Comunicazione Chiara con il Cliente</li>
              </>
           )}


        </ul>
      </section>





      {/* Sezione Progetti Specifici / Risultati / Tesi / etc. */}


       {/* Demo Interattiva */}
       {/* Mostra se c'è una demo reale o un placeholder specifico (esclude solo studente) */}
       { !isStudentePisa && (isCroceRossaBucarest || isTwsAutomation || isRegioneToscana || isAirService) &&
         <section className={styles.contentSection}>
             <h3 className={styles.sectionTitle}>
                 Demo Interattiva { !(isCroceRossaBucarest || isTwsAutomation) ? '(Simulata)' : ''}
             </h3>
             {isCroceRossaBucarest && ( <InventoryDemo /> )}
             {isTwsAutomation && ( <PickPlaceDemo /> )}
             {isAirService && !(isCroceRossaBucarest || isTwsAutomation) && (
                <div className={`${styles.placeholder} ${styles.placeholderDemo}`}>
                     {/* ... placeholder Air Service ... */}
                     <p>In lavorazione</p>
                     <span className={styles.placeholderIcon}>🌡️🔧</span>
                </div>
             )}
             {isRegioneToscana && !(isCroceRossaBucarest || isTwsAutomation || isAirService) && (
                <div className={`${styles.placeholder} ${styles.placeholderDemo}`}>
                    {/* ... placeholder Regione Toscana ... */}
                    <p>In lavorazione</p>
                    <span className={styles.placeholderIcon}>🎞️🖱️</span>
                </div>
             )}
            {/* Placeholder di default per altre future esperienze (non studente, non quelle con demo/placeholder specifico) */}
             {!isCroceRossaBucarest && !isTwsAutomation && !isRegioneToscana && !isAirService && !isStudentePisa && (
                  <div className={`${styles.placeholder} ${styles.placeholderDemo}`}>
                      <p>In Lavorazione</p>
                      <span className={styles.placeholderIcon}>✨</span>
                  </div>
             )}
         </section>
        }

      {/* Risorse Aggiuntive */}
      {/* Mostra solo se NON è studente, NON croce rossa E NON è TWS */}
      { !isStudentePisa && !isCroceRossaBucarest && !isTwsAutomation &&
        <section className={styles.contentSection}>
          <h3 className={styles.sectionTitle}>Risorse Aggiuntive</h3>
          <div className={`${styles.placeholder} ${styles.placeholderResources}`}>
              <p>In Lavorazione</p>
              <span className={styles.placeholderIcon}>🖼️🔗📄</span>
          </div>
        </section>
      }

    </motion.div> // Fine motion.div
  );
}

export default ExperiencePage;