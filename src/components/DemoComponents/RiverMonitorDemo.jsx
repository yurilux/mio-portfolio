import React, { useState, useEffect, useRef } from 'react';
import styles from './RiverMonitorDemo.module.css'; // Creeremo questo CSS Module
import { motion, AnimatePresence } from 'framer-motion'; // Per effetti

// Costanti di configurazione della demo
const RIVER_LEVEL_MIN = 0; // cm (assumiamo sensore a 100cm dall'acqua al livello 0)
const RIVER_LEVEL_MAX = 100; // cm (il livello dell'acqua sale)
const ALERT_THRESHOLD_1 = 70; // cm (livello di attenzione)
const ALERT_THRESHOLD_2 = 85; // cm (livello di emergenza)
const TEMP_MIN = -10;
const TEMP_MAX = 40;
const HUMIDITY_MIN = 0;
const HUMIDITY_MAX = 100;
const RAINFALL_MIN = 0;
const RAINFALL_MAX = 50; // mm/h (simuliamo intensità oraria)

function RiverMonitorDemo() {
  // --- Stato dei Sensori Simulati ---
  const [riverLevel, setRiverLevel] = useState(25); // Valore iniziale
  const [temperature, setTemperature] = useState(18);
  const [humidity, setHumidity] = useState(65);
  const [rainfall, setRainfall] = useState(0);

  // --- Stato Calcolato ---
  const [alertLevel, setAlertLevel] = useState(0); // 0: Normal, 1: Attention, 2: Emergency
  const [alertStatusText, setAlertStatusText] = useState('Normale');
  const [alertColor, setAlertColor] = useState('#27ae60'); // Verde iniziale

  // --- Stato Simulazione Output ---
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);
  const [telegramInput, setTelegramInput] = useState('');
  const [telegramMessages, setTelegramMessages] = useState([
    { sender: 'bot', text: 'Benvenuto nel simulatore del Bot Monitoraggio Fiume! Digita /start per i comandi.' }
  ]);
  const [lastTelegramReportTime, setLastTelegramReportTime] = useState(Date.now());

  // --- Ref per il Buzzer Timeout ---
  const buzzerTimeoutRef = useRef(null);

  // --- Effetto per Calcolare Livello Allerta ---
  useEffect(() => {
    let newLevel = 0;
    let newStatus = 'Normale';
    let newColor = '#27ae60'; // Verde

    if (riverLevel >= ALERT_THRESHOLD_2) {
      newLevel = 2;
      newStatus = 'EMERGENZA';
      newColor = '#e74c3c'; // Rosso
    } else if (riverLevel >= ALERT_THRESHOLD_1) {
      newLevel = 1;
      newStatus = 'Attenzione';
      newColor = '#f39c12'; // Arancio
    }

    setAlertLevel(newLevel);
    setAlertStatusText(newStatus);
    setAlertColor(newColor);

    // Attiva/Disattiva Buzzer (con debounce)
    if (newLevel === 2 && !isBuzzerActive) {
       setIsBuzzerActive(true);
       // Spegni il buzzer dopo 1.5 secondi per non essere troppo fastidioso nella demo
       if (buzzerTimeoutRef.current) clearTimeout(buzzerTimeoutRef.current);
       buzzerTimeoutRef.current = setTimeout(() => setIsBuzzerActive(false), 1500);
    } else if (newLevel < 2 && isBuzzerActive) {
        setIsBuzzerActive(false);
        if (buzzerTimeoutRef.current) clearTimeout(buzzerTimeoutRef.current);
    }

    // Cleanup timeout on unmount or if level changes before timeout fires
    return () => {
        if (buzzerTimeoutRef.current) clearTimeout(buzzerTimeoutRef.current);
    }

  }, [riverLevel, isBuzzerActive]); // Ricalcola quando il livello cambia


   // --- Effetto per Resoconto Telegram Periodico (Simulato ogni 15 sec) ---
   useEffect(() => {
       const reportInterval = setInterval(() => {
           const now = Date.now();
           // Invia report ogni 15 secondi in questa demo
           if (now - lastTelegramReportTime > 15000) {
               sendTelegramReport();
               setLastTelegramReportTime(now);
           }
       }, 5000); // Controlla ogni 5 secondi

       return () => clearInterval(reportInterval); // Pulisci intervallo all'unmount
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lastTelegramReportTime, riverLevel, temperature, humidity, rainfall, alertStatusText]); // Dipendenze per avere dati aggiornati nel report


  // --- Funzioni Helper ---
  const formatValue = (value, unit) => `${Number(value).toFixed(1)} ${unit}`;

  const addTelegramMessage = (sender, text) => {
    setTelegramMessages(prev => [...prev.slice(-5), { sender, text }]); // Mantieni solo ultimi 6 messaggi
  };

  // Simula risposta Bot Telegram
  const simulateTelegramResponse = (command) => {
    let response = `Comando "${command}" non riconosciuto. Comandi validi: /start, /livello, /temp, /umidita, /pioggia, /stato`;
    command = command.toLowerCase().trim();

    switch (command) {
      case '/start':
        response = 'Ciao! Sono il Bot Monitoraggio Fiume.\nComandi:\n/livello - Livello fiume attuale\n/temp - Temperatura attuale\n/umidita - Umidità attuale\n/pioggia - Pioggia (simulata)\n/stato - Stato allerta attuale';
        break;
      case '/livello':
        response = `Livello Fiume: ${formatValue(riverLevel, 'cm')}`;
        break;
      case '/temp':
         response = `Temperatura: ${formatValue(temperature, '°C')}`;
        break;
      case '/umidita':
         response = `Umidità: ${formatValue(humidity, '%')}`;
        break;
      case '/pioggia':
         response = `Intensità Pioggia (simulata): ${formatValue(rainfall, 'mm/h')}`;
        break;
      case '/stato':
         response = `Stato Allerta: ${alertStatusText} (Livello ${alertLevel})`;
        break;
      default:
        break; // Usa messaggio di default
    }
    addTelegramMessage('bot', response);
  };

    // Invia Resoconto Periodico (Simulato)
  const sendTelegramReport = () => {
      const reportText = `--- Resoconto Periodico ---\nLivello: ${formatValue(riverLevel, 'cm')}\nTemp: ${formatValue(temperature, '°C')}\nUmidità: ${formatValue(humidity, '%')}\nPioggia: ${formatValue(rainfall, 'mm/h')}\nStato: ${alertStatusText}`;
      addTelegramMessage('bot', reportText);

      // Se emergenza, invia anche messaggio di allerta separato
      if (alertLevel === 2) {
          addTelegramMessage('bot', `🚨 ATTENZIONE! Livello EMERGENZA raggiunto: ${formatValue(riverLevel, 'cm')} 🚨`);
      }
  };

  // Gestisce invio messaggio utente Telegram
  const handleTelegramSend = (e) => {
    e.preventDefault();
    if (!telegramInput.trim()) return;
    addTelegramMessage('user', telegramInput);
    // Simula risposta bot dopo un piccolo delay
    setTimeout(() => simulateTelegramResponse(telegramInput), 300);
    setTelegramInput('');
  };


  return (
    <div className={styles.demoContainer}>
      <h4 className={styles.demoTitle}>Cruscotto Interattivo Monitoraggio Fluviale</h4>

      <div className={styles.layoutGrid}>

        {/* Colonna Sinistra: Input / Controlli */}
        <div className={styles.inputColumn}>
          <h5>Simula Dati Sensori</h5>

          <div className={styles.sliderGroup}>
            <label htmlFor="riverLevel">Livello Fiume (cm): {riverLevel.toFixed(1)}</label>
            <input
              type="range"
              id="riverLevel"
              min={RIVER_LEVEL_MIN}
              max={RIVER_LEVEL_MAX}
              step="0.5"
              value={riverLevel}
              onChange={(e) => setRiverLevel(parseFloat(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderLabels}>
               <span>{RIVER_LEVEL_MIN}cm</span>
               <span style={{ color: alertColor, fontWeight: 'bold' }}>{alertStatusText}</span>
               <span>{RIVER_LEVEL_MAX}cm</span>
            </div>
          </div>

          <div className={styles.sliderGroup}>
            <label htmlFor="temperature">Temperatura (°C): {temperature.toFixed(1)}</label>
            <input
              type="range"
              id="temperature"
              min={TEMP_MIN}
              max={TEMP_MAX}
              step="0.5"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className={styles.slider}
            />
             <div className={styles.sliderLabels}>
               <span>{TEMP_MIN}°</span>
               <span>{TEMP_MAX}°</span>
            </div>
          </div>

           <div className={styles.sliderGroup}>
            <label htmlFor="humidity">Umidità (%): {humidity.toFixed(0)}</label>
            <input
              type="range"
              id="humidity"
              min={HUMIDITY_MIN}
              max={HUMIDITY_MAX}
              step="1"
              value={humidity}
              onChange={(e) => setHumidity(parseFloat(e.target.value))}
              className={styles.slider}
            />
             <div className={styles.sliderLabels}>
               <span>{HUMIDITY_MIN}%</span>
               <span>{HUMIDITY_MAX}%</span>
            </div>
          </div>

           <div className={styles.inputGroup}>
             <label htmlFor="rainfall">Pioggia (mm/h):</label>
             <input
               type="number"
               id="rainfall"
               min={RAINFALL_MIN}
               max={RAINFALL_MAX}
               step="0.1"
               value={rainfall}
               onChange={(e) => setRainfall(Math.max(RAINFALL_MIN, Math.min(RAINFALL_MAX, parseFloat(e.target.value) || 0)))}
               className={styles.numberInput}
             />
          </div>

        </div>

        {/* Colonna Centrale: ESP32 / Status */}
        <div className={styles.centerColumn}>
           <div className={styles.esp32Box}>
             <span className={styles.espIcon}>📟</span>
             <p>ESP32</p>
             <p>TTGO T-Display</p>
              <motion.div
                 className={styles.statusIndicator}
                 animate={{ backgroundColor: alertColor }}
                 transition={{ duration: 0.3 }}
              >
                {alertStatusText}
              </motion.div>
               {/* Icona Buzzer animata */}
                <AnimatePresence>
                {isBuzzerActive && (
                    <motion.div
                    key="buzzer"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: 1, rotate: [0, -10, 10, -10, 10, 0] }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={styles.buzzerIcon}
                    >
                    🔊
                    </motion.div>
                )}
                </AnimatePresence>
           </div>
        </div>

        {/* Colonna Destra: Output */}
        <div className={styles.outputColumn}>

          {/* Simulazione Web UI */}
          <div className={styles.outputBox}>
             <h6 className={styles.outputTitle}><span role="img" aria-label="web">🌐</span> Pagina Web (Simulata)</h6>
             <div className={styles.webData}><span>Livello:</span> {formatValue(riverLevel, 'cm')}</div>
             <div className={styles.webData}><span>Temp:</span> {formatValue(temperature, '°C')}</div>
             <div className={styles.webData}><span>Umidità:</span> {formatValue(humidity, '%')}</div>
             <div className={styles.webData}><span>Pioggia:</span> {formatValue(rainfall, 'mm/h')}</div>
             <div className={styles.webData} style={{marginTop: '0.5rem'}}>
                <span>Stato:</span>
                <motion.span
                    className={styles.webAlertBadge}
                    animate={{ backgroundColor: alertColor }}
                    transition={{ duration: 0.3 }}
                >
                    {alertStatusText}
                </motion.span>
             </div>
          </div>

          {/* Simulazione Telegram */}
          <div className={styles.outputBox}>
            <h6 className={styles.outputTitle}><span role="img" aria-label="telegram">📲</span> Telegram Bot (Simulato)</h6>
            <div className={styles.telegramChat}>
              {telegramMessages.map((msg, index) => (
                <div key={index} className={`${styles.chatMessage} ${styles[msg.sender]}`}>
                  {msg.text.split('\n').map((line, i)=><React.Fragment key={i}>{line}<br/></React.Fragment>)}
                </div>
              ))}
            </div>
            <form onSubmit={handleTelegramSend} className={styles.telegramInputForm}>
              <input
                type="text"
                value={telegramInput}
                onChange={(e) => setTelegramInput(e.target.value)}
                placeholder="Digita comando (es. /start)"
                className={styles.telegramInput}
              />
              <button type="submit" className={styles.telegramSendButton}>Invia</button>
            </form>
          </div>

            {/* Simulazione Display Fisico */}
            <div className={styles.outputBox}>
                <h6 className={styles.outputTitle}><span role="img" aria-label="display">🖥️</span> Display ESP32 (Simulato)</h6>
                <pre className={styles.displayContent}>
                    {`Temp: ${temperature.toFixed(1)} C   Umid: ${humidity.toFixed(0)} %\n` +
                     `-----------------------\n` +
                     `Livello Fiume: ${riverLevel.toFixed(1)} cm\n` +
                     `Stato: ${alertStatusText}`
                    }
                </pre>
            </div>

        </div>

      </div>
    </div>
  );
}

export default RiverMonitorDemo;