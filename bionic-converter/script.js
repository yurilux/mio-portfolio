/* --- Elementi DOM --- */
const fileInput = document.getElementById('epubFile');
const fileNameDisplay = document.getElementById('file-name-display');
const resultsSection = document.getElementById('results');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const downloadButton = document.getElementById('download-button');
const errorMessage = document.getElementById('error-message');

/* --- Event Listener per il Caricamento File --- */
fileInput.addEventListener('change', handleFileSelect);

/* --- Funzione per Gestire la Selezione del File --- */
function handleFileSelect(event) {
    // (Codice invariato - reset UI, controllo file, lettura)
    const file = event.target.files[0];

    // Reset UI
    resultsSection.classList.add('hidden');
    downloadButton.classList.add('hidden');
    downloadButton.href = '#';
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    updateProgress(0, 'Nessun file selezionato');

    if (!file) {
        fileNameDisplay.textContent = 'Nessun file selezionato';
        return;
    }

    if (file.type !== 'application/epub+zip' && !file.name.toLowerCase().endsWith('.epub')) {
        fileNameDisplay.textContent = 'File non valido';
        showError("Per favore, carica un file .epub valido.");
        fileInput.value = "";
        return;
    }

    fileNameDisplay.textContent = `Caricato: ${file.name}`;
    resultsSection.classList.remove('hidden');
    updateProgress(0, 'Inizio elaborazione...');

    const reader = new FileReader();
    reader.onload = function(e) {
        processEpub(e.target.result, file.name);
    };
    reader.onerror = function(e) {
        console.error("Errore durante la lettura del file:", e);
        showError("Si è verificato un errore durante la lettura del file.");
    };
    reader.readAsArrayBuffer(file);
}

/* --- Funzione Principale per Processare l'EPUB --- */
async function processEpub(epubData, originalFileName) {
    try {
        updateProgress(0, 'Decompressione EPUB...');
        const zip = await JSZip.loadAsync(epubData);
        const filesToProcess = [];

        zip.forEach((relativePath, zipEntry) => {
            const lowerPath = relativePath.toLowerCase();
            if (!zipEntry.dir && lowerPath !== 'mimetype' && (lowerPath.endsWith('.html') || lowerPath.endsWith('.xhtml') || lowerPath.endsWith('.htm'))) {
                filesToProcess.push(zipEntry);
            }
        });

        if (filesToProcess.length === 0) {
            throw new Error("Nessun file HTML/XHTML trovato all'interno dell'EPUB.");
        }

        const totalFiles = filesToProcess.length;
        let processedCount = 0;
        let filesSkipped = 0; // Contatore per file con errori di parsing

        updateProgress(0, `Trovati ${totalFiles} file da processare...`);
        console.log(`Inizio elaborazione di ${totalFiles} file.`);

        // --- USA XMLSerializer ---
        const serializer = new XMLSerializer();
        const parser = new DOMParser();

        for (const zipEntry of filesToProcess) {
            const filePath = zipEntry.name;
            const shortFileName = filePath.split('/').pop();
            console.log(` Elaborazione: ${filePath}`);
            updateProgress( (processedCount / totalFiles) * 100, `Processando: ${shortFileName}...`);

            try {
                const fileContentString = await zipEntry.async("string");

                // --- USA IL PARSER XML/XHTML ---
                const doc = parser.parseFromString(fileContentString, "application/xhtml+xml");

                // --- CONTROLLA ERRORI DI PARSING XML ---
                const parserErrors = doc.getElementsByTagName("parsererror");
                if (parserErrors.length > 0) {
                    // Se ci sono errori di parsing, non modificare il file!
                    console.warn(`Errore di parsing XML nel file ${filePath}. Il file non sarà modificato. Dettagli:`, parserErrors[0].textContent);
                    filesSkipped++;
                    // Passa al file successivo senza aggiornare zip.file()
                    processedCount++; // Incrementa comunque per la barra di progresso
                    continue; // Salta il resto del blocco try per questo file
                }

                // Applica Bionic Reading (solo se il parsing è andato a buon fine)
                // Cerca il body o l'elemento radice se il body non c'è (alcuni EPUB usano solo <html>)
                const elementToModify = doc.body || doc.documentElement;
                if (elementToModify) {
                    applyBionicReadingToElement(elementToModify);
                } else {
                     console.warn(`Elemento body o documentElement non trovato in ${filePath}. Saltato.`);
                }


                // --- USA XMLSerializer PER L'OUTPUT ---
                const modifiedFileString = serializer.serializeToString(doc);

                // Aggiorna il file nello zip
                zip.file(filePath, modifiedFileString);

            } catch (fileError) {
                console.error(`Errore critico durante l'elaborazione del file ${filePath}:`, fileError);
                filesSkipped++;
                // Considera questo file come non modificato, ma continua con gli altri
            }

            processedCount++;
        } // Fine ciclo for

        const finalMessage = filesSkipped > 0
            ? `Conversione completata (${filesSkipped} file saltati per errori di parsing).`
            : 'Conversione completata!';
        updateProgress(100, finalMessage);

        if (processedCount === filesSkipped && totalFiles > 0) {
             showError("Nessun file è stato convertito a causa di errori di parsing in tutti i file XHTML.");
             return; // Non offrire il download se nulla è stato convertito
        }

        console.log(`Elaborazione terminata. File processati: ${processedCount}, Saltati: ${filesSkipped}. Generazione nuovo EPUB...`);

        const outputBlob = await zip.generateAsync({
            type: "blob",
            mimeType: "application/epub+zip",
            compression: "DEFLATE",
            compressionOptions: { level: 6 }
        });

        console.log("Nuovo EPUB generato.");
        enableDownload(outputBlob, originalFileName);

    } catch (error) {
        console.error("Errore generale durante l'elaborazione dell'EPUB:", error);
        showError(`Errore: ${error.message}`);
        updateProgress(0, 'Errore durante l\'elaborazione.');
    }
}

/* --- Funzione per Applicare Bionic Reading a un Elemento DOM --- */
// (Questa funzione rimane INVARIATA rispetto alla versione precedente)
function applyBionicReadingToElement(element) {
    if (!element) return;
    const textNodes = findTextNodes(element);
    textNodes.forEach(node => { /* ... logica bionic reading ... */
         if (!node.parentElement || node.parentElement.closest('[data-bionic="true"], a, button, script, style, pre, code, kbd, samp, var, title, h1, h2, h3, h4, h5, h6, textarea, input, select')) {
            return;
        }
        if (node.parentElement.tagName === 'B' && node.parentElement.parentElement?.dataset.bionic === 'true') {
             return;
        }
        const fragment = document.createDocumentFragment();
        const parts = node.textContent.split(/(\s+|\b)/);
        parts.forEach(part => {
            const cleanPart = part.replace(/[\u200B-\u200D\uFEFF]/g, '');
            if (cleanPart.trim().length > 0) {
                const trimmedWord = cleanPart;
                let boldLength = 0;
                if (trimmedWord.length === 1) boldLength = 1;
                else if (trimmedWord.length <= 3) boldLength = 1;
                else boldLength = Math.ceil(trimmedWord.length * 0.45);
                boldLength = Math.min(boldLength, trimmedWord.length);
                const bionicWordSpan = document.createElement('span');
                bionicWordSpan.dataset.bionic = "true";
                const boldPart = document.createElement('b');
                boldPart.textContent = trimmedWord.substring(0, boldLength);
                const regularPart = document.createTextNode(trimmedWord.substring(boldLength));
                bionicWordSpan.appendChild(boldPart);
                bionicWordSpan.appendChild(regularPart);
                fragment.appendChild(bionicWordSpan);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });
        if (node.parentElement) {
            try {
                 node.parentElement.replaceChild(fragment, node);
            } catch(e) {
                 console.warn("Errore minore durante replaceChild in applyBionicReading:", e, "Nodo:", node);
            }
        }
     });
}

/* --- Funzione Helper per Trovare Nodi di Testo Validi --- */
// (Questa funzione rimane INVARIATA)
function findTextNodes(element) { /* ... codice findTextNodes ... */
    const textNodes = [];
    try {
        const walker = document.createTreeWalker( /* ... parametri ... */
             element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
                    if (node.parentElement.closest('script, style, noscript, pre, code, kbd, var, samp, textarea, input, select, button, a, title, h1, h2, h3, h4, h5, h6, [data-bionic="true"]')) {
                         return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
    } catch (e) {
        console.error("Errore durante TreeWalker in findTextNodes:", e);
    }
    return textNodes;
}

/* --- Funzioni di Utilità UI --- */
// (Queste funzioni rimangono INVARIATE)
function updateProgress(percentage, text) { /* ... codice updateProgress ... */
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    progressBar.style.width = `${clampedPercentage}%`;
    progressText.textContent = text;
    if (clampedPercentage >= 100) { progressBar.classList.add('completed'); }
    else { progressBar.classList.remove('completed'); }
}
function enableDownload(blob, originalFileName) { /* ... codice enableDownload ... */
    const url = URL.createObjectURL(blob);
    downloadButton.href = url;
    let safeFileName = originalFileName.replace(/\.[^/.]+$/, "");
    safeFileName = safeFileName.replace(/[^a-z0-9_\-\s]/gi, '_').replace(/\s+/g, '_');
    downloadButton.download = `Bionic_${safeFileName}.epub`;
    downloadButton.classList.remove('hidden');
}
function showError(message) { /* ... codice showError ... */
     errorMessage.textContent = message;
     errorMessage.classList.remove('hidden');
     resultsSection.classList.remove('hidden');
}