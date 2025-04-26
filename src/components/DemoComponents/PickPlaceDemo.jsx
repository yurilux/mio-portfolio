import React, { useState, useEffect, useRef } from 'react';
import styles from './PickPlaceDemo.module.css';

// Dati Mock
const MOCK_CSV_DATA_RAW = `Component,X,Y,Rotation,Layer
R1,10.5,25.2,90,TOP
C3,15.1,30.8,0,TOP
U1,22.0,18.5,180,TOP
R12,11.2,22.1,90,BOTTOM
Q1,35.5,40.0,270,TOP`;

const MACHINE_MODELS = {
  'Machine Alpha': { id: 'alpha', transform: (d) => ({ ...d, X: d.X * 1.05, Y: d.Y * 0.95, Source: 'Alpha' }) },
  'Machine Beta': { id: 'beta', transform: (d) => ({ ...d, X: d.X + 2, Y: d.Y + 1.5, Source: 'Beta' }) },
  'Gamma 5000': { id: 'gamma', transform: (d) => ({ ...d, Rotation: (d.Rotation + 90) % 360, Source: 'Gamma' }) },
};
const MACHINE_NAMES = Object.keys(MACHINE_MODELS);

const PIPELINE_STEPS = ['idle', 'loaded', 'parsed', 'transformed', 'outputReady', 'printing', 'complete', 'error'];

function PickPlaceDemo() {
  const [selectedMachine, setSelectedMachine] = useState(MACHINE_NAMES[0]);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [pipelineStatus, setPipelineStatus] = useState('idle'); // idle, loading, parsing, transforming, outputReady, printing, complete, error
  const [parsedData, setParsedData] = useState(null);
  const [outputData, setOutputData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  // Ref per gestire intervalli/timeout e prevenire memory leak
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Funzione di Cleanup per intervalli e timeout
  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

   // Cleanup all'unmount del componente
   useEffect(() => {
       return () => clearTimers();
   }, []);

  // Reset dello stato
  const resetState = () => {
    clearTimers();
    setSelectedFileName(null);
    setPipelineStatus('idle');
    setParsedData(null);
    setOutputData(null);
    setErrorMessage('');
    setProgress(0);
  };

  // Simula caricamento file
  const handleSimulateUpload = () => {
    resetState(); // Resetta prima di caricare nuovo file
    setSelectedFileName('components_placement.csv');
    setPipelineStatus('loaded'); // Pronto per il parsing
    setErrorMessage('');
  };

  // Funzione per simulare un'operazione con delay e progresso
  const simulateOperation = (operationName, duration, nextStatus, errorChance = 0) => {
      return new Promise((resolve, reject) => {
          clearTimers(); // Pulisci timer precedenti
          setPipelineStatus(operationName);
          setProgress(0);
          let currentProgress = 0;
          const steps = duration / 100; // Intervalli da 100ms

          intervalRef.current = setInterval(() => {
              currentProgress += 100 / (duration / 100); // Incremento per raggiungere 100
              setProgress(Math.min(Math.round(currentProgress), 100));
          }, 100);

          timeoutRef.current = setTimeout(() => {
              clearInterval(intervalRef.current);
               intervalRef.current = null;
              setProgress(100);

              // Simula errore
              if (Math.random() < errorChance) {
                   reject(`Errore simulato durante: ${operationName}`);
                   return;
              }

              // Passa allo stato successivo dopo un breve ritardo
              setTimeout(() => {
                    setPipelineStatus(nextStatus);
                    setProgress(0); // Resetta progress per il prossimo step
                    resolve();
              }, 200); // Breve pausa prima del prossimo stato

          }, duration);
      });
  };


  // Gestisce il processo principale
  const handleProcess = async () => {
    setErrorMessage('');
    try {
       // 1. Parsing
      await simulateOperation('parsing', 1000, 'parsed', 0.05); // 1 sec, 5% errore
      // Logica di Parsing Mock: Converte CSV string in array di oggetti
      const lines = MOCK_CSV_DATA_RAW.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
          const value = values[index].trim();
          // Prova a convertire X, Y, Rotation in numeri
          if (['X', 'Y', 'Rotation'].includes(header) && !isNaN(parseFloat(value))) {
              obj[header] = parseFloat(value);
          } else {
               obj[header] = value;
          }
          return obj;
        }, {});
      });
      setParsedData(data); // Salva dati parsati (anche se non li mostriamo direttamente)

      // 2. Trasformazione
      await simulateOperation('transforming', 1500, 'transformed', 0.05); // 1.5 sec, 5% errore
      // Logica di Trasformazione Mock: Applica la funzione della macchina selezionata
      const machineLogic = MACHINE_MODELS[selectedMachine];
      if (!machineLogic) throw new Error("Macchina selezionata non valida!"); // Controllo sicurezza
      const transformed = data.map(machineLogic.transform);
      setOutputData(transformed); // Salva dati trasformati per output

       // 3. Output Ready (stato intermedio)
       setPipelineStatus('outputReady'); // Dati pronti per essere "stampati"

    } catch (error) {
       console.error("Errore pipeline:", error);
       setErrorMessage(typeof error === 'string' ? error : 'Errore imprevisto durante il processo.');
       setPipelineStatus('error');
       setProgress(0);
       clearTimers();
    }
  };

  // Simula invio alla "stampante" (o macchina)
   const handlePrint = async () => {
       setErrorMessage('');
       try {
           await simulateOperation('printing', 800, 'complete', 0.02); // 0.8 sec, 2% errore
           // Potremmo aggiungere un timeout per tornare a idle dopo 'complete'
            setTimeout(() => {
               // Opzionale: resetta parzialmente per permettere nuovo processo
               // setPipelineStatus('idle'); // o loaded se il file rimane "caricato"
               // setOutputData(null);
            }, 2000);
       } catch(error) {
           console.error("Errore stampa:", error);
           setErrorMessage(typeof error === 'string' ? error : 'Errore simulato durante l\'invio.');
           setPipelineStatus('error');
           setProgress(0);
           clearTimers();
       }
   };

  // Helper per ottenere la classe CSS dello step della pipeline
  const getStepStatusClass = (stepName) => {
    const currentIndex = PIPELINE_STEPS.indexOf(pipelineStatus);
    const stepIndex = PIPELINE_STEPS.indexOf(stepName);

    if (pipelineStatus === 'error' && stepIndex < currentIndex) return styles.stepErrorPrevious;
    if (pipelineStatus === 'error' && stepIndex === currentIndex) return styles.stepErrorCurrent;
    if (stepIndex < currentIndex) return styles.stepCompleted;
    if (stepIndex === currentIndex) return styles.stepActive;
    return styles.stepIdle; // Default
  };

  const isProcessing = ['parsing', 'transforming', 'printing'].includes(pipelineStatus);

  return (
    <div className={styles.demoContainer}>
      <h4 className={styles.demoTitle}>Simulatore Flusso Dati Pick & Place (HMI)</h4>

      {/* Controlli */}
      <div className={styles.controls}>
        <div className={styles.formGroup}>
          <label htmlFor="machineSelect">Seleziona Macchina:</label>
          <select
            id="machineSelect"
            value={selectedMachine}
            onChange={(e) => { setSelectedMachine(e.target.value); resetState(); }} // Resetta se cambia macchina
            disabled={isProcessing}
          >
            {MACHINE_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <button
          onClick={handleSimulateUpload}
          className={styles.controlButton}
          disabled={isProcessing}
        >
          📤 Carica File CSV (Sim.)
        </button>
         <button
            onClick={handleProcess}
            className={styles.controlButton}
            disabled={!selectedFileName || pipelineStatus !== 'loaded' || isProcessing} // Attivo solo se file caricato e non in processing
        >
          ⚙️ Processa Dati
        </button>
         <button
            onClick={handlePrint}
            className={styles.controlButton}
            disabled={pipelineStatus !== 'outputReady' || isProcessing} // Attivo solo se output pronto
        >
          🖨️ Invia a Macchina (Sim.)
        </button>
      </div>

      {selectedFileName && <p className={styles.fileName}>File selezionato: <span>{selectedFileName}</span></p>}

      {/* Pipeline Visualization */}
      <div className={styles.pipeline}>
        <div className={`${styles.step} ${getStepStatusClass('loaded')}`}>Caricamento</div>
        <div className={styles.arrow}>➡️</div>
        <div className={`${styles.step} ${getStepStatusClass('parsing')}`}>Parsing</div>
        <div className={styles.arrow}>➡️</div>
        <div className={`${styles.step} ${getStepStatusClass('transforming')}`}>Trasformazione</div>
        <div className={styles.arrow}>➡️</div>
        <div className={`${styles.step} ${getStepStatusClass('outputReady')}`}>Output</div>
        <div className={styles.arrow}>➡️</div>
        <div className={`${styles.step} ${getStepStatusClass('printing')}`}>Invio</div>
         <div className={styles.arrow}>➡️</div>
        <div className={`${styles.step} ${getStepStatusClass('complete')}`}>Completato</div>
      </div>

      {/* Progress Bar e Messaggi */}
      {isProcessing && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBarOuter}>
             <div className={styles.progressBarInner} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>
      )}
      {errorMessage && <p className={styles.errorMessage}>⚠️ {errorMessage}</p>}
      {pipelineStatus === 'complete' && <p className={styles.successMessage}>✅ Processo completato con successo!</p>}


      {/* Output Area */}
      {outputData && pipelineStatus !== 'error' && ['outputReady', 'printing', 'complete'].includes(pipelineStatus) && (
        <div className={styles.outputArea}>
          <h5>Output Dati Trasformati (per {selectedMachine})</h5>
          <pre>{JSON.stringify(outputData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default PickPlaceDemo;