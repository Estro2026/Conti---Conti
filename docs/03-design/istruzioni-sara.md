
## 2026-11-02 · Mockup · Home B e Home A (hero)
Fonte: CLIENTE (Sara, in chat). Stato: applicato. Agenti coinvolti: nessuno (modifiche puntuali a file esistenti, nessuna nuova direzione di progetto).

Home B
1. Tolte dalla hero le due frasi in alto ("Nuove costruzioni, ristrutturazioni e interni di pregio…", "Strutture, murature e casseri eseguiti in proprio…").
2. Tolte le CTA dalla hero (vale anche per la hero nuova: nel pacchetto allegato c'erano "Richiedi un preventivo" e "Scopri i cantieri").
3. Copy della dichiarazione rivisto nell'ambito dell'architettura, mantenendo l'identità di impresa che costruisce con squadre proprie. PROPOSTA, in attesa di conferma di Sara:
   - prima: «Dalle fondazioni alle finiture, ogni fase del cantiere è eseguita e controllata dall'impresa. Per questo rispondiamo di ogni progetto, dal preventivo alle chiavi.»
   - ora: «Dalle fondazioni alle finiture, la nostra impresa dà corpo al progetto con squadre proprie: struttura, spazio e materia eseguiti e controllati in cantiere. Per questo rispondiamo di ogni edificio, dal preventivo alle chiavi.»
4. Card dei progetti: luogo, anno, superficie e intervento in bianco, scritti direttamente sull'immagine (niente riquadro bianco).
5. "Le persone di Conti & Conti" spostata prima di "Dove operiamo".
6. Hero sostituita con quella del pacchetto "hero b" (video hero-b.mp4, titolo "Costruiamo case fatte per durare."), senza frasi in alto e senza CTA. Restano i tre accessi rapidi sotto.

Home A
- Hero sostituita con quella del pacchetto "hero a" (video che avanza e torna indietro con lo scroll, frasi sovrapposte). File: hero-a.css, hero-a.js, video/hero-a.mp4. L'header esistente riceve data-cch-nav; la vecchia hero e il suo script di ritorno all'inizio non sono più usati.

## 2026-11-02 (2) · Mockup · Home B
Fonte: CLIENTE (Sara, in chat). Stato: applicato. Agenti coinvolti: nessuno.
- Il pacchetto "hero b" contiene indicazioni anche per le sezioni dopo la hero (sequenza di costruzione). Applicate: una sola sezione "sequenza di costruzione" (#costruzione) al posto di dichiarazione, numeri, servizi e impegni. La scena resta ferma, lo scroll avanza cinque fasi (progetto, fondamenta, struttura, murature, casa) e quattro blocchi di testo (dichiarazione, "Dal 1988, un cantiere dopo l'altro", "I nostri servizi", "Quattro impegni"). Impegni 03 e 04: testi da concordare (come indicato nel pacchetto). Dati dei numeri e anno (1988 vs 1987): da verificare con il cliente.
- La dichiarazione usa il nuovo copy (PROPOSTA, in attesa di conferma), non quello del pacchetto.
- Fascia "Clienti, studi e marchi che ci affidano i loro spazi": ora con i loghi (13, gli stessi della Home A, dal sito attuale). VERIFY NDA prima di pubblicare.
- Spazi: respiro sopra Progetti e sopra la fascia Clienti (prima l'ultima card progetto toccava la fascia).

## 2026-11-02 (3) · Mockup · Home B
Fonte: CLIENTE (Sara, in chat, con screenshot). Stato: applicato. Agenti coinvolti: nessuno.
- Sezione "Dove operiamo": sistemati gli spazi. Dopo lo spostamento della squadra prima di questa sezione, il titolo partiva a filo del bordo alto (padding-top 0). Ora padding standard tra sezioni sopra e sotto (88-168 px secondo lo schermo).

## 2026-11-02 (4) · Mockup · Home A
Fonte: CLIENTE (Sara, in chat: "la hero non è fluida"). Stato: applicato. Agenti coinvolti: nessuno.
- Causa: il video del pacchetto "hero a" ha solo 3 fotogrammi chiave in 11 secondi, quindi ogni salto del video con lo scroll costava ~80 ms (fino a 200 ms).
- Intervento: solo ricodifica (stesso montaggio, stessa durata e 265 fotogrammi, 1920×1076), un fotogramma chiave ogni 2 fotogrammi, senza fotogrammi B: video/hero-a-scrub.mp4 (15,9 MB). Come consigliato nel LEGGIMI del pacchetto. Salto medio ~9 ms, massimo 18 ms. L'originale resta nel pacchetto (mockup/hero_a_conti&conti).

## 2026-11-02 (5) · Mockup · Home B
Fonte: CLIENTE (Sara, in chat). Stato: applicato. Agenti coinvolti: nessuno.
- Interruttore Home A / B presente anche in Home B (in basso a destra, B evidenziata). Nel nuovo Home B mancava il markup (gli stili c'erano già). Corretto anche il valore salvato per i collegamenti "Home" del wireframe: era "d", ora "b", così dal wireframe si torna a Home B quando si arriva da lì.

## 2026-11-02 (6) · Mockup · Home A e B
Fonte: CLIENTE (Sara, in chat: stessa posizione di A, scegliere il migliore e uniformare). Stato: applicato. Agenti coinvolti: nessuno.
- Interruttore Home A / B uguale nelle due pagine, in basso a sinistra. Scelta la versione di Home A (pillola scura traslucida con sfocatura, etichetta "HOME", versione attiva in bianco ad alto contrasto, anello di focus visibile): si legge meglio sulle foto e l'attiva si distingue di più di quella bordeaux piccola di B. Stili in un solo file, mockup/ab-switch.css, collegato da entrambe le pagine; tolti i duplicati.
- In Home B il titolo della hero sale di 24 px (36 px su telefono) perché l'interruttore non lo copra.

## 2026-11-02 (7) · Mockup · Home B
Fonte: CLIENTE (Sara, in chat). Stato: applicato. Agenti coinvolti: nessuno.
- "Parla con noi" (accesso rapido sotto la hero): ora porta a Contatti (prima era il telefono).
- "I nostri servizi" (PROPOSTA, da confermare): Residenze → Categoria Residenze; Ristrutturazioni → Blog filtrato su "Ristrutturare" (non esiste una categoria Ristrutturazioni); Retail → Categoria Attività commerciali. Prima i tre portavano a Cantieri.
- Menu: le 8 categorie di cantiere portano ognuna alla propria pagina (prima tutte alla stessa).
- L'indirizzo della sede nel menu e nel footer apre Google Maps in una nuova scheda.

## 2026-11-02 (8) · Architettura categorie cantieri
Fonte: CLIENTE (Sara, in chat). Stato: WAITING_FOR_APPROVAL (non applicato). Agenti coinvolti: nessuno (valutazione).
Richiesta: (a) la parola "Attività commerciali" nella pagina dedicata diventa "Retail"; (b) dubbio se ridurre tutte le categorie di cantiere alle 3 macro Residenze, Ristrutturazioni, Retail; valutare dal sito vecchio.
Contrasto con approvato: le 8 categorie del portfolio (Case, Residenze, Lusso, Palestre, Allestimenti, Ville, Attività commerciali, Industriale) sono APPROVATE dalla call; rinominare o ridurle cambia IA approvata, menu, filtri, URL e SEO.
Evidenze dal sito vecchio (RICERCA, contieconti.it):
- Home: tre schede "Residenze, Ristrutturazioni, Retail", senza link propri (un solo "Scopri di più" verso /servizi/). La pagina Servizi in realtà elenca 8 uffici interni, non queste tre aree. Nel testo vecchio "Retail" = capannoni industriali e spazi commerciali.
- Portfolio (/progetti-realizzati/, 42 progetti): filtri Bank, Exhibition, GDO, Gym & Spa, Houses, Industrial, Lounge, Medical, Nautical, Retail. Nessun filtro "ristrutturazione": le ristrutturazioni stanno sotto Houses. "Retail" nel portfolio = solo boutique.
Opzioni (da scegliere): A) 8 categorie, solo rinomina in Retail; B) 8 categorie + filtro trasversale "Intervento" (Nuova costruzione / Ristrutturazione) + Retail rinominata; C) solo 3 macro categorie.

## 2026-11-02 (9): tre pagine servizio (Residenze, Ristrutturazioni, Retail) — PROPOSTA, WAITING_FOR_APPROVAL
Fonte: CLIENTE (Sara). Equivalente della pagina Servizi del sito vecchio declinato in 3 pagine, collegate dalle 3 card di Home A e Home B. Brief: `docs/03-design/servizi-tre-pagine.md`.
- TOLTO da Impresa: "Gli uffici dietro ogni cantiere" (8 uffici). Sostituito da "Cosa costruiamo" (3 tessere verso le pagine servizio).
- SPOSTATO: Tecnico, Vendita → Residenze; Preventivazione, Amministrazione → Ristrutturazioni; General Contractor, Acquisti, Logistica → Retail. Qualità e sicurezza → frase nella scheda ISO 9001 di Garanzie (nessun blocco).
- TOLTO da FAQ ("Come lavoriamo" 4→2) e SPOSTATO come FAQ locali: detrazioni fiscali → Ristrutturazioni; general contractor → Retail.
- Home B: link "I servizi interni" → "I nostri servizi" (chi-siamo.html#servizi).
- Aperti: rinomina categoria "Attività commerciali"→"Retail"; voce "Servizi" nel menu; progetti di Ristrutturazioni (Case/Ville) = INFERENZA.

## 2026-11-02 (10): conferma tre pagine servizio — APPROVATO (fase wireframe)
Testo di Sara: «Confermo». Fonte: CLIENTE. Approvate le tre pagine servizio, gli spostamenti di (9) e le decisioni aperte come proposte. Resta aperto: rinomina categoria "Attività commerciali"→"Retail", voce "Servizi" nel menu, verifica progetti Ristrutturazioni (INFERENZA).
Per ux-architect: aggiornare sitemap/IA con le tre pagine servizio. Per development-estimation: ristimare le tre pagine (Da ristimare). Per seo: redirect 301 /servizi/ → chi-siamo#servizi da rivedere.

## 2026-11-02 (11): Home A, indirizzo sede → Google Maps (menu e footer) — APPROVATO (CLIENTE, Sara), fase mockup
Stesso link e stile già usati in Home B. Agenti: frontend.

## 2026-11-02 (12): tre pagine servizio da rifare nella resa — CLIENTE (Sara), fase wireframe
Testo di Sara: «le 3 pagine sono fatte malissimo, testi sovrapposti, altri tagliati, esplosione monotona e statica. fai funzionare bene gli agenti». Problemi: sovrapposizioni, testi tagliati, ritmo monotono e statico.
Per precision-layout-qa e responsive-device: elencare sovrapposizioni e tagli reali a 1440, 1280, 1024, 768, 390 e con zoom. Per motion: dare ritmo e movimento diversi a ogni pagina (rispetta riduci-movimento). Per ui-art-direction: variare composizione tra le tre pagine. Per frontend-reviewer: correggere alla fonte.

## 2026-11-02 (13): tre pagine servizio, dettagli di coerenza — CLIENTE (Sara), fase wireframe
Testo di Sara: «tieni conto di dettagli tipo l'arrotondamento degli angoli in card ecc, tecniche di caricamento già usate nelle altre pagine, usare le trasparenze, sistema difetti card con immagine agli angoli».
Per precision-layout-qa: raggi uguali alle altre pagine, immagini nelle card che seguono l'angolo della card (overflow/clip, niente spigoli visibili). Per motion: usare le stesse tecniche di caricamento/ingresso già presenti nelle altre pagine (data-rv, ecc.). Per ui-art-direction: trasparenze coerenti con le altre pagine (overlay, fasce, header).

## 2026-11-02 (14): Residenze card/hero + voci pagine servizio in menu e footer — CLIENTE (Sara), wireframe e mockup
Testo di Sara: «in residenze, le card "Dove vedere come costruiamo le residenze" sono troppo piccole, rendi la hero più dinamica e deve essere al vivo e occupare il 100% della viewport. Aggiungi queste aggiunte di pagine nel menu e footer di tutte le pagine e questo deve essere applicato anche in homepage a e b».
Per frontend-reviewer/precision-layout-qa: card grandi e hero 100svh al vivo su Residenze. Per ux-architect: Residenze, Ristrutturazioni, Retail in menu e footer di tutte le pagine wireframe e di Home A e B.
Esecuzione (14): Residenze, Ristrutturazioni, Retail aggiunte al menu (riga delle voci secondarie, prima di FAQ e Contatti) e al footer (lista Sito, dopo Cantieri) in wireframe.js (tutte le pagine wireframe), home-a.html e home-b.html. Non fatto: home-a-persone.html (variante). PROPOSTA: dare più peso alla voce "Servizi" nel menu (ora ha la stessa resa di FAQ).

## 2026-11-02 (15): hero a tutto schermo anche su Ristrutturazioni e Retail — APPROVATO (CLIENTE, Sara: «Sì, uniforma»), fase wireframe
Stessa hero di Residenze: foto al vivo 100svh, header/breadcrumb trasparenti, movimento sobrio legato allo scroll, reduced-motion statica.
Per frontend-reviewer/motion/responsive-device: replicare l'approccio di wf-sv-residenze.css/js nelle altre due pagine.

## 2026-11-02 (16): hero, sezione Lavori di Residenze, Servizi nei menu — CLIENTE (Sara), wireframe e mockup
Testo di Sara: «togli la parola "scorri" dall'hero che è cliché di AI; non ho capito cosa hai fatto di dinamico nella hero; in questa sezione ("Dove vedere come costruiamo le residenze") in hover gli angoli vanno in contrasto con le righe e mi piaceva più la spartizione con le card a destra, ma falle più grandi; nei menu come nel footer le 3 pagine devono essere sotto Servizi, trova tu il modo».
Per ai-cliche-generic-style: niente indicatore "Scorri". Per precision-layout-qa: hover delle righe senza angoli in contrasto. Per ux-architect: raggruppamento "Servizi" in menu e footer (PROPOSTA).

## 2026-11-02 (17): Ristrutturazioni e Retail da ripulire + formazione agenti — CLIENTE (Sara), fase wireframe
Testo di Sara: «applica le stesse accortezze alla pagina ristrutturazioni e retail che fanno schifo e ci sono elementi AI; poi allena gli agenti con i concetti fondamentali, soprattutto nella coerenza, cercare modi innovativi e allontanarsi dai pattern AI, vedi che ci stanno ancora cascando».
Creato `docs/03-design/principi-coerenza-anti-ai.md`: lettura obbligatoria per gli agenti di design e frontend; aggiunto un rimando nei file `.claude/agents/` pertinenti.
Per ai-cliche-generic-style, ui-art-direction, motion, frontend-reviewer, precision-layout-qa, design-orchestrator, ux-architect: leggere il documento prima di lavorare.

## 2026-11-02 (18): correzioni Ristrutturazioni e Retail — CLIENTE (Sara), fase wireframe
Testo di Sara (sintesi): Ristrutturazioni: sistemare angoli di CTA e card; nelle card dei lavori usare trasparenza, font coerenti con il sito, niente linea bold dentro le card; la stessa linea in "Due uffici seguono la tua ristrutturazione" e i numeri 3 e 7 non si capiscono; "Case e ville che abbiamo seguito" troppo povera, angoli delle CTA e spostamento categorie avanti/dietro come nelle altre pagine; TOGLIERE "Domande sulle ristrutturazioni" (le domande vanno nella FAQ); "Cerchi altro?" strutturata come in Residenze, uniformare sezioni con funzione simile. Retail: troppi elementi con stili diversi dalle altre pagine, applicare le stesse correzioni.
Eseguito da me: domande detrazioni e referente tornate in faq.html (gruppo Come lavoriamo 4). Per frontend-reviewer: pagine Ristrutturazioni e Retail.

## 2026-11-02 (19): istruzioni di Sara su Ristrutturazioni, Retail e Residenze — CLIENTE, fase wireframe
Testo di Sara (sintesi fedele): (1) Ristrutturazioni: in hero testo e CTA posizionati come in Residenze; arrotondamento di "Richiedi un preventivo" in menu e hero uguale a Residenze; la CTA in hero porta ai cantieri. (2) Retail: CTA hero verso i cantieri, stesso arrotondamento di Residenze. (3)(4)(5) Ristrutturazioni e Retail: sezioni "Cosa comprende", "Come lavoriamo qui", "Chi ti segue" strutturate come in Residenze. (6) Residenze e Ristrutturazioni: "Alcuni lavori" strutturata come in Retail, con categorie affini; nelle 3 pagine la CTA "Vedi tutti i cantieri" arrotondata come "Richiedi un preventivo" del menu di Residenze, a destra del titolo, allineata alla card più esterna; icone con freccia nelle 3 pagine nello stesso stile e posizione, come la CTA di "Acquista direttamente da chi costruisce." in Home A. (7) Aggiungere la sezione "Vuoi comprare invece di costruire?" anche in Ristrutturazioni e Retail. (8) Togliere le FAQ da queste pagine: le domande vanno nella pagina FAQ.
Eseguito da me: domanda general contractor di Retail spostata in faq.html (gruppo Come lavoriamo: 5 domande). Obiettivo dichiarato da Sara: gli agenti devono imparare.

## 2026-11-02 (20): frecce prev/next accanto al titolo nelle tre pagine servizio — APPROVATO (CLIENTE, Sara: «Sì, sposta»)
Le frecce precedente/successiva della sezione lavori vanno a destra del titolo, come in Home A (#h-sale), nello stesso gruppo della CTA "Vedi tutti i cantieri", allineate al bordo destro della card più esterna.
Per frontend-reviewer: stessa posizione e stile nelle tre pagine.

## 2026-11-02 (21): lavori tutti in viewport, testo "Come lavoriamo" di Ristrutturazioni, CTA hero sui cantieri — CLIENTE (Sara), fase wireframe
Testo di Sara: la sezione "Alcuni lavori / Case e ville che abbiamo seguito" in tutte e 3 le pagine deve essere tutta visibile nella viewport; in Ristrutturazioni, "Come lavoriamo qui / Porti i documenti, esci con un preventivo": sistemare il testo, renderlo sensato e coerente sia a destra che a sinistra; la CTA nella hero di Residenze e Ristrutturazioni deve essere sui cantieri.
Eseguito da me: CTA hero di Residenze e Ristrutturazioni → cantieri.html, testo "Vedi i cantieri" (come Retail, perché "Richiedi un preventivo" non descrive la destinazione; resta in menu e pre-footer).
Per frontend-reviewer: sezione lavori entro la viewport nelle 3 pagine. Per content-language: testo della scena "Come lavoriamo qui" di Ristrutturazioni (WAITING_FOR_APPROVAL, copy sostanziale).

## 2026-11-02 (22): margini della sezione lavori e testo delle card in Ristrutturazioni — CLIENTE (Sara), fase wireframe
Testo di Sara: nelle 3 pagine attenzione a margini/padding sopra e sotto la sezione "Alcuni lavori": devono essere uniformi alle altre sezioni; in Ristrutturazioni, nella sezione "Dai tuoi documenti al preventivo, in tre passi", le card a destra devono contenere testo coerente, non checklist né due parole in croce.
Per precision-layout-qa/frontend-reviewer: padding verticale della sezione lavori = quello delle altre sezioni. Per content-language: testo dei tre passi di Ristrutturazioni (WAITING_FOR_APPROVAL, solo contenuti già presenti).

## 2026-11-02 (23): menu Home B, gruppo Servizi separato da FAQ, Contatti, Lavora con noi — CLIENTE (Sara), mockup
Testo di Sara: nel menu della homepage B i servizi non sembrano molto divisi da FAQ, Contatti e Lavora con noi.
Eseguito: in Home B il gruppo Servizi (etichetta + 3 pagine) sta su una riga propria, separata da un filetto dalla riga FAQ, Contatti, Lavora con noi. Per frontend-reviewer: verificare Home A, dove il gruppo è in linea con un divisore verticale prima di FAQ.
Ristrutturazioni: testo dei tre passi della scena riscritto in prosa (PROPOSTA, WAITING_FOR_APPROVAL); le frasi sul perché sono proposte.

## 2026-11-02 (24): Home A hero con bypass; Home B sezione progetti — CLIENTE (Sara), mockup
Testo di Sara: (A) in Home A usare un modo creativo per mettere un pulsante discreto che permetta di saltare gli scroll della hero e passare alla sezione successiva (il messaggio era troncato dopo «Nella sezione»). (B) Home B, sezione "Progetti che raccontano come lavoriamo. 01 / 07 Tutti i cantieri": lasciare solo 4 progetti. (C) Stessa sezione: nella sovrapposizione delle card le informazioni testuali devono essere visibili, e con il click si deve poter consultare la card precedente, lasciandola un po' in vista ma senza testo per non fare confusione con la card in primo piano.
Per motion/frontend-reviewer: bypass hero A; sezione progetti B (4 card, pila con testo solo sulla card attiva, click per tornare indietro). Per ai-cliche-generic-style: il pulsante bypass non deve essere un "scorri/freccia" generico.
Esecuzione (24): (A) Home A, pulsante discreto "Salta la sequenza" nella hero: anello che si riempie con l'avanzamento, etichetta solo al passaggio/focus, clic porta a #statement. (B) La sezione "01 / 07" è in Home A, non in Home B (Home B ne aveva già 4): ridotta a 4 progetti (con foto), contatore 01 / 04. (C) Home B, pila di schede: le schede superate restano come fascia di foto senza testo, il testo resta solo sulla scheda in primo piano, il clic su una fascia riporta a quella scheda.

## 2026-11-02 (25): Home A, hero riparte dall'inizio risalendo — CLIENTE (Sara), mockup
Testo di Sara: nella homepage A, quando si fa scroll verso l'alto la hero deve partire dall'inizio. Interpretazione: risalendo dalle sezioni successive la hero riparte dal primo fotogramma, non dal finale. Eseguito in hero-a.js (v3). Per motion: se intendeva un'altra cosa (es. ripartire anche con scroll lento dentro la hero), da chiarire.

## 2026-11-02 (26): Home A, risalita da "Maestri del proprio mestiere" alla hero — CLIENTE (Sara), mockup
Testo di Sara: c'è un problema con lo scroll up dalla sezione "Maestri del proprio mestiere" alla hero: salendo, il video deve partire dall'inizio (hero nel suo stato iniziale).
Cause trovate e corrette in hero-a.js (v5): (1) il salto in cima usava lo scorrimento fluido della pagina (scroll-behavior:smooth), quindi la hero veniva attraversata invece di ripartire; ora è istantaneo; (2) il video inseguiva la posizione con un ritardo di smorzamento e partiva dal fotogramma finale; ora si azzera subito (tempo 0 e stato iniziale della sequenza).

- (27) 2026-11-03 · mockup · Sara: nelle sezioni Servizi di Home A e Home B usare le tre foto fornite (giardino = Residenze, corridoio = Ristrutturazioni, negozio = Retail). Fonte: CLIENTE (foto fornite da Sara). Agenti: ui-art-direction, image-curator. Da verificare: crop in card 4:3 da foto verticali.

- (28) 2026-11-03 · mockup · Sara: inserire i ritratti di assets/images/ritratti_contieconti in Home A ("40 persone, una sola impresa.") e Home B ("Le persone di Conti & Conti"). Fonte: CLIENTE. Agenti: image-curator, ui-art-direction.

- (29) 2026-11-03 · wireframe · Sara: nella sezione "Dove lo abbiamo fatto" delle tre pagine servizio le categorie devono essere pertinenti al servizio; in Residenze non ripetere "Residenze". Fatto: Residenze = Case, Ville, Lusso; Ristrutturazioni = Case, Ville, Attivita commerciali, Lusso (INFERENZA dai progetti del sito vecchio: boutique in Rinascente); Retail invariato. Kicker uguale nelle tre. PROPOSTA, in attesa di conferma.
