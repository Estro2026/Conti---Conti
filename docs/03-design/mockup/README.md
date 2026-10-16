# Mockup Home A: le persone dietro ogni progetto

Apri `home-a.html` in un browser (meglio da un piccolo server locale, es. dalla cartella `docs/03-design`, perché i link relativi puntano al wireframe in `../wireframe/`). Stato: **PROPOSTA di direzione creativa**, in attesa di approvazione.

## Sequenza narrativa

| # | Sezione | Ruolo | Effetto di scroll |
|---|---|---|---|
| 1 | Hero immersiva | Entrare nella casa prima di raccontarla | Camera simulata sul poster, parallasse con il cursore; video sostituibile |
| 2 | Dichiarazione | Introdurre il concept: persone, competenze, responsabilità | Il pattern CC si scopre sotto la hero; le parole si accendono con lo scroll |
| 3 | La squadra | **Cuore della pagina**: le persone rappresentano le competenze | Scena fissa: lo scroll attraversa 5 scene (squadra, tecnici, cantiere, mezzi, ufficio); pin sulla foto di gruppo; su tablet e mobile a tocco |
| 4 | Come lavoriamo | Spazio essenziale, collega persone e progetti | Pattern visibile, righe con hover |
| 5 | Progetti | Il risultato del lavoro | Foto full-bleed a griglia asimmetrica, la foto segue appena il cursore |
| 6 | In vendita | Passare dalla costruzione all'acquisto diretto | Parallasse leggera sulla foto |
| 7 | Garanzie | Prova esterna | Pattern visibile |
| 8 | Chiusura | CTA | Fondo bordeaux con pattern bianco |

Alternanza voluta: immersiva (1) > essenziale (2) > immersiva (3) > essenziale (4) > immersiva (5) > pulita (6, 7) > chiusura (8). Lo scroll con scena fissa è solo nella sezione 3, circa 3,5 schermi.

## Fonti dei contenuti (sito ufficiale www.contieconti.it)

| Contenuto | Fonte | Stato |
|---|---|---|
| Foto del team, tecnici con pianta, dettaglio cantiere, ritratto di Massimo Conti | Sito ufficiale (Team-1, Operai-al-lavoro, Cantieri, Massimo-Conti) | **Autentiche**; i loghi e i marchi della sede sono visibili nella foto del team |
| Foto progetti (Ceresio 7, Villa a Meda, The Rise) e foto "in vendita" | Sito ufficiale | Autentiche; titoli ricavati dai nomi dei file, località da confermare |
| Hero (poster) | Render del soggiorno dal sito ufficiale (`Soggiorno5`) | **Provvisoria**, 1000 px; da sostituire con video o foto in alta risoluzione |
| Servizi interni (tecnico, logistica, ufficio), residenze in vendita, dati azienda, orari, certificazioni | Sito ufficiale e documenti di progetto | Rielaborati in chiave UX writing |
| Valori "rispetto dei tempi", "certezza dei prezzi" | Sito ufficiale e call | I testi di supporto sono nostri |

Non ho usato fotografie stock di persone: il sito ufficiale ha già foto autentiche e pertinenti di tutti i ruoli. I pin della foto di gruppo puntano a **gruppi, mezzi e sede**, non a singoli individui: nessun nome e nessun ruolo è stato attribuito a una persona specifica.

## Informazioni e materiali ancora mancanti

1. **Anno di fondazione**: sito 1988 (home) o 1987 (pagina Impresa, brief). Non compare nel mockup finché non è confermato.
2. **Organico per ruoli**: 43 persone totali (8 tecnici, 26 muratori e carpentieri, 9 impiegati) dal sito, non aggiornato. Nel mockup compare solo il totale, marcato "da verificare".
3. **Associazione persone-ruoli** sulla foto di gruppo: da confermare con Massimo Conti prima di attribuire un ruolo a una persona.
4. **Video o foto hero in alta risoluzione** (almeno 2000 px) di un interno realizzato dall'impresa.
5. **Località e anno dei progetti**: Villa a Meda e The Rise; titolo e abstract di Ceresio 7.
6. **Categoria SOA**: IV bis (2023) da verificare, insieme a scadenza e categorie.
7. **Testi** dei valori "Professionalità e affidabilità" e "Formazione specialistica".
8. **Foto di persone dell'ufficio** per la scena "Ufficio e direzione" (ora c'è solo il ritratto di Massimo Conti).
9. **Dati di Residenza Paradiso** e conferma della consegna di Residenza Solarium.
10. **Logo in vettoriale** (SVG): il raster 320×84 limita la nitidezza del pattern CC e della navbar a schermi ad alta densità.
11. **Liberatorie** per l'uso delle foto delle persone (se non già coperte).

## Struttura del codice

- `home-a.html`: struttura semantica, landmark, testi alternativi.
- `mockup.css`: token (colori, raggi, tipografia), componenti riusabili (`.btn`, `.kicker`, `.wrap`, `.panel-clear`), un solo pattern fisso di sfondo.
- `mockup.js`: moduli indipendenti (navbar, scroll, scena squadra, reveal, hero video, cursore). Nessuna libreria.
- Accessibilità: skip link, focus visibile, pin e tab navigabili da tastiera e con `aria-pressed`, regione `aria-live` per il testo della scena, alternative al tocco per gli hover, `prefers-reduced-motion` (niente scroll fisso né animazioni), navbar con target 44 px.
- Prestazioni: immagini compresse (circa 100-500 KB), `loading="lazy"` fuori dalla hero, `preload` del poster, video non caricato finché non c'è un file.

## Aggiornamento 2026-10-16 (revisione 3)

- **Dropdown Cantieri**: pannello chiaro a due colonne con le 8 categorie numerate e "Tutti i cantieri" in testa.
- **Squadra**: pannello pieno (niente pattern). I pin sulla foto di gruppo aprono una scheda **sulla stessa foto** (squadra di cantiere, mezzi e logistica, sede e ufficio) con un pulsante che porta alla scena di dettaglio corrispondente. Logica: foto di gruppo > scheda del gruppo > foto del lavoro di quel gruppo. Su touch: tocco sul pin, tocco fuori per chiudere.
- **Foto stock**: provato Unsplash (blocca i download automatici) e Wikimedia Commons (solo foto storiche o di archivio, non pertinenti). Restano le foto autentiche del sito, che coprono tecnici, cantiere, mezzi e consegna; **manca solo una foto dell'ufficio**: serve uno scatto dell'impresa o una foto stock scelta e scaricata manualmente.
- **Come lavoriamo**: fisarmonica orizzontale compatta, apre la voce al passaggio, al focus o al tocco; su mobile elenco in colonna.
- **Progetti**: "Tutti i cantieri" a destra del titolo.
- **Garanzie**: loghi ufficiali scaricati dal sito (ISO 9001:2015, TÜV SÜD, SOA Laghi, Cassa Edile Awards 2024), in grigio e a colori al passaggio; sfondo con pattern proprio sfumato ai bordi, senza tagli.
- **Chiusura**: pre-footer compatto, senza pattern.
- Loghi dei clienti (Intesa, Dolce & Gabbana, Dsquared2 e altri) disponibili in `docs/00-input/sito-web/logo/Loghi Brand/`: non inseriti perché l'uso dei nomi è da verificare (NDA).

## Aggiornamento 2026-10-16 (revisione 4)

- **Dove operiamo**: ripristinata con una mappa Google Maps incorporata (senza chiave, con il pin rosso di Google). L'elenco a sinistra sono i pin interattivi: sede operativa di Lentate sul Seveso, Milano, Lago di Como, Varese, Monza-Seregno-Brianza. Un clic sposta la mappa e il pin sul luogo scelto e aggiorna il link "Apri in Google Maps". La mappa si carica quando la sezione si avvicina alla vista.
  - Per la produzione: la mappa Google imposta cookie di terze parti, quindi va caricata solo dopo il consenso (Iubenda). Per avere **più pin contemporaneamente** sulla stessa mappa serve la Maps JavaScript API con una chiave del cliente (account Google Cloud con fatturazione attiva): in quel caso si sostituisce l'iframe con una mappa con marcatori e finestre informative.
- **Dal blog**: ripristinata l'anteprima dei 3 articoli (titoli del brief, date e tempi di lettura da definire), con un articolo principale e due secondari; foto autentiche provvisorie.

## Aggiornamento 2026-10-16 (revisione 5)

- **Squadra, 4 scene** (scroll o schede): 1 Squadra (foto di gruppo, pin visibili con etichetta) > 2 **Tecnici e mezzi** (accorpati: foto dei tre tecnici con un pin su ciascuno con `[Nome]` e `[Ruolo da confermare]`, più riquadro "Mezzi e logistica") > 3 Squadra di cantiere (**foto di repertorio Pexels** di due muratori, pin su murature, malta, ponteggi; credito in foto) > 4 **Ufficio e direzione** (scena a fondo bordeaux pieno che scivola da destra, ritratto di Massimo Conti ritagliato dal basso, nessun pattern).
  - **Nomi e ruoli dei tecnici**: i tre pin sono pronti ma i testi sono segnaposto: servono nome, cognome e ruolo reali (e il consenso a pubblicarli).
  - La foto del cantiere è di repertorio (non dipendenti dell'impresa): va dichiarato come immagine di atmosfera o sostituita con uno scatto reale.
- **Come lavoriamo**: la voce che si apre mostra una foto (squadra, tecnici, consegna, cantiere) con velatura scura.
- **Progetti / In vendita / Garanzie**: eliminato il vuoto tra Progetti e In vendita (era un margine che collassava) e tolti i divisori sopra "Residenza Solarium" e sopra i riconoscimenti.
- **Dove operiamo**: mappa Google completa con i 5 pin di tutte le zone sovrapposti (sede, Milano, Lago di Como, Varese, Brianza). Il passaggio del cursore su un pin o sulla voce dell'elenco li evidenzia insieme; la selezione zooma la mappa sul luogo (con il pin Google) e compare "Torna alla vista completa". CTA ora "Vai ai contatti".

## Aggiornamento 2026-10-16 (revisione 7)

- **Hero guidata dallo scroll** (vedi hero-video-higgsfield.md, sezioni 13-14): testi compatti che svaniscono, video che avanza con lo scroll, sfumatura finale verso la sezione successiva.
- **Testo di apertura**: rivelazione più lenta (intermedia tra le due versioni precedenti).
- **Pattern**: tessera ridotta (460 px, 320 px su mobile): più "C", più piccole, nessuna perdita di nitidezza.
- **Tecnici e mezzi**: pin con nomi e ruoli **di fantasia** (Marco Bianchi, Luca Ferrari, Davide Colombo) da sostituire con i dati reali; tolto il riquadro dei mezzi.
- **Squadra di cantiere**: foto autentica dell'impresa (cintura con metro e matita Conti e Conti), pin su Esecuzione, Precisione, Controllo; niente più persone di repertorio.
- **Ufficio e direzione**: ritratto ritagliato `ritrattoprofessionalesupoltronamoderna.webp` al centro su fondo scuro; testo a sinistra e nome/ruolo a destra.
- **In vendita**: copertine con fotografie stock di architettura residenziale (Pexels, a titolo illustrativo, con nota in pagina).
- **Footer**: correzione dell'allineamento di "Cantieri" (il dropdown era finito per errore anche nel footer e nel menu mobile) e icone social con link: [LinkedIn](https://it.linkedin.com/company/conti-e-conti-s.r.l.) e [Facebook](https://www.facebook.com/ContieContiSrl/). Instagram: nessun profilo trovato.

## Aggiornamenti successivi (revisioni 8-14) e Home B

- Hero: video guidato dallo scroll (6 clip Seedance 2.0 Mini uniti con ffmpeg in `video/hero-scrub.mp4` / `-m.mp4`; i primi clip sono accelerati per avere velocita uniforme), si riparte sempre dall'inizio al refresh, scroll verso l'alto riporta all'inizio, il video si ferma sull'ultimo frame luminoso prima del velo di transizione.
- Effetto vetro esteso (nav piena, schede, immobili, blog, sedi, progetti, chiusura); sezioni Valori e Garanzie con livelli di profondita (Garanzie ferma).
- Footer: aggiunti Privacy policy, Cookie policy, Gestisci i cookie, Note legali, Accessibilita, Mappa del sito (link segnaposto `#`: pagine da creare).
- **Home B** (`home-b.html` + `mockup-b.css` + `mockup-b.js`): stesso contenuto della A, concept architettonico: parete di cemento generata via SVG (nessuna immagine), linee guida da disegno tecnico, hero con "finestra" che si apre nel cemento con lo scroll, disegno di prospetto che si traccia nella dichiarazione, foto che emergono dalla parete (tratteggio e bianco e nero che si risolvono nella foto), schede come tavole in rilievo, targhette "Tav. 0X". Riusa `mockup.css` e `mockup.js`.
