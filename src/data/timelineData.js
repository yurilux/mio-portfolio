// src/data/timelineData.js

export const timelineItems = [
    // --- ESPERIENZE ---

    {
      id: 'croce-rossa-bucarest', // ID UNIVOCO!
      type: 'experience',
      title: 'Supporto IT',
      source: 'Crucea Roșie Română - Filiala București', 
      period: '2025', 
      description: 'Gestione operativa dell\'infrastruttura IT della sede, supporto tecnico a volontari e staff, manutenzione hardware e software.', 
      icon: '💻', 
      location: 'Bucharest, Romania' 
    },

    {
      id: 'studente-pisa', 
      type: 'education', 
      title: 'Studente di Informatica Umanistica',
      source: 'Università di Pisa', 
      period: '2022 - Presente', 
      description: 'Percorso di studi focalizzato sullo sviluppo software, UI/UX, Algoritmi, basi di dati, sviluppo web, filosofia del linguaggio e interazione Uomo Macchina.',
      icon: '🎓', 
      isCurrent: true
    },

      {
        id: 'tws-automation', // ID UNIVOCO
        type: 'experience',
        title: 'Software Engineer (Full Stack)', 
        source: 'TWS Automation S.r.l.',
        period: '2021 - 2022', 
        description: 'Sviluppo Full Stack con focus su .NET/C# per backend e interfacce HMI, con esperienze in React/Django e gestione database MySQL.', 
        icon: '⚙️', 
        location: 'Carrara' 
    },

    {
      id: 'air-service', // ID UNIVOCO
      type: 'experience',
      title: 'Tecnico Installatore / Manutentore', 
      source: 'Air Service S.r.l.', 
      period: '2021', 
      description: 'Installazione, manutenzione programmata e riparazione di impianti di climatizzazione/HVAC. Diagnostica guasti e interventi tecnici on-site.', 
      icon: '🛠️', 
      location: 'Luogo (es. Città, Provincia)' 
  },

    {
      id: 'regione-toscana', // ID UNIVOCO
      type: 'experience',
      title: 'Videomaker (Collaborazione)',
      source: 'Regione Toscana (Progetti Comunicazione)',
      period: '2016 - 2020', 
      description: 'Realizzazione video istituzionali e per eventi, dalla pianificazione delle riprese al montaggio finale con Adobe Premiere Pro.', 
      icon: '🎬', 
      location: 'Firenze / Toscana, Italia' 
  },

    // --- PROGETTI ---
    {
      id: 'controllo-fiume',
      type: 'project',
      title: 'Controllo Livello Fiume IoT',
      source: 'Progetto Personale/Accademico', // Categoria
      period: '2024',
      description: 'Sviluppo di un sistema IoT con ESP32, sensori a ultrasuoni e web server per il monitoraggio remoto del livello idrometrico di un fiume.',
      icon: '🌊',
    },
    {
      id: 'epub-bionic-converter', // <--- NUOVO PROGETTO
      type: 'project',
      title: 'EPUB Bionic Converter',
      source: 'Strumento Personale', // Categoria
      period: '2025',
      description: 'Un tool web per convertire file EPUB in formato Bionic Reading, con elaborazione interamente client-side.',
      icon: '📖',
      url: '/bionic-converter' // <--- PUNTA DIRETTAMENTE ALLA NUOVA PAGINA
    },
  ];
  