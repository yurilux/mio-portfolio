// README.md
# Mio Portfolio - Iulian Bottale

Questo è il codice sorgente del mio portfolio personale, costruito con React e Vite.
Il sito è deployato su GitHub Pages: [https://yurilux.github.io/mio-portfolio/](https://yurilux.github.io/mio-portfolio/)

## Tecnologie Utilizzate

*   React 19
*   Vite
*   React Router
*   Framer Motion (per animazioni)
*   CSS Modules
*   ESLint

## Setup Locale

1.  Clona il repository:
    ```bash
    git clone https://github.com/yurilux/mio-portfolio.git
    cd mio-portfolio
    ```
2.  Installa le dipendenze:
    ```bash
    npm install
    ```
3.  Avvia il server di sviluppo:
    ```bash
    npm run dev
    ```

## Script Disponibili

*   `npm run dev`: Avvia il server di sviluppo.
*   `npm run build`: Compila l'applicazione per la produzione.
*   `npm run lint`: Esegue ESLint per controllare il codice.
*   `npm run preview`: Avvia un server locale per visualizzare la build di produzione.
*   `npm run deploy`: Esegue il deploy su GitHub Pages (dopo `predeploy` che fa il build).

## Struttura del Progetto

*   `src/components`: Componenti React riutilizzabili.
    *   `src/components/DemoComponents`: Componenti demo interattivi.
    *   `src/components/Timeline`: Componenti per la timeline.
*   `src/pages`: Componenti per le diverse pagine del sito.
*   `src/data`: Dati statici (es. `timelineData.js`).
*   `src/hooks`: Custom hooks (es. `useTheme.js`).
*   `src/assets`: Immagini statiche e altre risorse.
*   `public`: File statici che vengono copiati direttamente nella directory di build.

## ... (Altre sezioni che potresti voler aggiungere) ...