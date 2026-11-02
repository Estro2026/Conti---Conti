# Principi di coerenza e anti-AI (obbligatori per ogni agente di design e frontend)

Origine: correzioni ripetute di Sara sulle pagine servizio (2026-11-02). Fonte: CLIENTE. Da leggere PRIMA di toccare una pagina e da rileggere prima di consegnare.

## 1. Coerenza prima dell'invenzione
- Prima di creare qualunque componente, raggio, ombra, trasparenza, animazione o stato di caricamento, cerca come lo fanno già le altre pagine (`categoria`, `cantieri`, `progetto`, `chi-siamo`, `in-vendita`, Home A e B, `wf-a.css`, `wf-dyn.*`, `wf-mid.css`, `wf-scale.css`, `wf-impresa-x.css`). Riusa i token (`--r`, `--card-rad`), i componenti (`card-imm`, `ct-pc`, `data-rv` + `.is-in` + `--d`) e le stesse tecniche.
- Un valore scritto a mano (raggio, ritardo, easing, colore) che esiste già come token è un difetto.
- Se una soluzione nuova serve davvero, dichiara in nota perché il componente esistente non basta e dove andrebbe condivisa. Non duplicare in locale ciò che dovrebbe essere condiviso.
- Una card con immagine: contenitore con raggio e `overflow:clip`, immagine a raggio 0 e senza bordo (nessun bordo del segnaposto che sporge dagli angoli), stesso raggio in tutte le pagine. Controllare sempre gli angoli, anche in hover.
- Un hover non deve creare angoli che confliggono con filetti, righe o bordi vicini.

## 2. Ogni elemento deve guadagnarsi il posto
Per ogni elemento aggiunto chiediti: quale informazione o azione serve all'utente di Conti & Conti, in questo punto? Se la risposta è "fa sembrare la pagina curata", toglilo.
Non confondere la presenza di un elemento con il fatto che sia necessario: la pagina non deve avere elementi solo per sembrare "dinamica".

## 3. Pattern da evitare (riconoscibili come AI / template)
Segnalati o respinti da Sara, e quelli simili:
- Indicatori di scroll nell'hero ("Scorri", freccia che rimbalza, linea che si riempie).
- Numeri decorativi giganti o a contorno (01, 02, 03, "Passo 1") usati come ornamento e non come dato.
- Sezioni tutte costruite come "titolo + griglia di 3 card uguali" o "elenco con numeri".
- Pannelli in vetro/blur ovunque, gradienti scuri sulle foto di default, ombre morbide su ogni card.
- Reveal "fade + sale di 24px" applicato a tutto con stagger uniforme come unica forma di movimento.
- Hover che inverte nero/bianco su qualsiasi riga o card.
- Copy a tre punti simmetrici, frasi a effetto ("dal progetto alle chiavi"), aggettivi vuoti, tricolon, titoli a due metà con punto.
- Etichette in maiuscoletto + titolo + sottotitolo + pulsante ripetuti identici a ogni sezione.
- Contatori animati, barre di avanzamento decorative, timeline generiche.
- Icone o cerchi con freccia ovunque come unico linguaggio di "vai".
Un singolo elemento di questa lista non è sempre un errore: lo è quando è il default scelto senza una ragione legata al contenuto. Se c'è precedente nelle altre pagine ed è funzionale, può restare, ma giustificalo.

## 4. Cercare soluzioni specifiche (non generiche)
- Parti dal contenuto reale: un'impresa edile che costruisce, ristruttura, allestisce spazi commerciali. La forma di ogni sezione deve nascere da cosa quel contenuto fa (una sequenza di lavori, una pianta, un cantiere, un computo, un cronoprogramma reale, una tavola tecnica, un registro di cantiere) e non da un pattern di libreria.
- Prima di disegnare una sezione, elenca almeno tre forme possibili, scarta quelle viste in altri siti e nelle altre pagine, scegli quella che solo questo contenuto giustifica.
- Il movimento deve spiegare qualcosa (ordine, causa, progressione) e restare visibile e comprensibile da solo. Se Sara non capisce cosa fa un movimento, è sbagliato o inutile.
- Differenza tra le pagine = intenzionale e legata al contenuto, mai casuale.

## 5. Verifica obbligatoria prima di consegnare
- Elenco di ogni elemento non necessario o a pattern AI trovato e cosa hai fatto.
- Coerenza: raggi, ombre, trasparenze, caricamento e stati identici alle altre pagine (cita il file di riferimento).
- Sovrapposizioni, tagli, overflow, zoom, riduci movimento (script con Range rects).
- Angoli delle card con immagine a ogni misura.
- Non dichiarare "ok" senza prova. Non vedere un movimento dal vivo = dillo.

## 6. «Come in X» significa copia esatta (lezione del 2026-11-02)
- Quando Sara scrive che una sezione, un pulsante o un'icona deve essere «come in X», non si reinterpreta e non si ridisegna: si apre X, si copia markup e regole (rinominando solo il prefisso), si cambiano solo i contenuti. Poi si confrontano le misure con X (raggio, padding, posizione, font, spessori) e si riporta il confronto con i numeri.
- Pagine sorelle (le tre pagine servizio) usano lo stesso impianto per le sezioni di funzione uguale: aperture, "Cosa comprende", "Come lavoriamo qui", "Chi ti segue", lavori, "Vuoi comprare invece di costruire?", "Altri servizi". Cambia il contenuto, non la forma, salvo che la forma sia legata a un contenuto diverso e Sara l'abbia approvata.
- Le domande frequenti non vivono nelle pagine: stanno solo in `faq.html`.
- Le CTA hanno un solo raggio e una sola posizione per funzione in tutto il sito (stesso componente), e le icone con freccia lo stesso stile e la stessa posizione. Misurarle, non stimarle.
- Lavora in modo diretto: meno giri di rielaborazione, più copia verificata.
