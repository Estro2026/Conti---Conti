/* Wireframe Conti & Conti - componenti condivisi (header, footer, placeholder, note numerate).
   Il wireframe richiede JS solo per assemblare i blocchi condivisi: il sito finale NON dipende da questo script. */
(function () {
  var CATS = ['Case', 'Residenze', 'Lusso', 'Palestre', 'Allestimenti', 'Ville', 'Attività commerciali', 'Industriale'];
  var IMM = ['Domus 54', 'Via Diaz', 'Palazzina Montesolaro', 'Seregno', 'Residenza Solarium', 'Residenza Paradiso'];
  var CERT = [['ISO 9001', 'UNI EN ISO 9001:2015', 'Sistema qualità certificato da ente indipendente', 'Ente: TÜV Italia'], ['SOA', 'Attestazione SOA', 'Classifica IV bis'], ['Cassa Edile', 'Cassa Edile Awards', 'Edizioni 2024 e 2025-2026'], ['Cassa dei Laghi', 'Cassa dei Laghi', 'Impresa iscritta']];
  var IMMD = { 'Via Diaz': ['In costruzione', 'Lentate sul Seveso (MB) &middot; [tipologia] &middot; [mq]'], 'Residenza Solarium': ['In costruzione', 'Montesolaro, Carimate (MB) &middot; 4 unità &middot; consegna dic. 2026'], 'Residenza Paradiso': ['[Stato]', 'Lentate sul Seveso (MB) &middot; [tipologia] &middot; [mq]'] };
  var NAV = [['impresa', 'Impresa', 'chi-siamo.html'], ['cantieri', 'Cantieri', 'cantieri.html'], ['vendita', 'In vendita', 'in-vendita.html'], ['blog', 'Blog', 'blog.html'], ['faq', 'FAQ', 'faq.html'], ['contatti', 'Contatti', 'contatti.html']];
  var body = document.body, act = body.dataset.active || '';
  /* modalità: 'interno' (note, ore, decisioni) o 'cliente' (presentazione pulita). Impostata da mode.js */
  var CL = window.WF_MODE === 'cliente';
  body.classList.add(CL ? 'm-cliente' : 'm-interno');
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function N(tag, text) { return '<i data-note="' + esc(tag + '|' + text) + '"></i>'; }
  function ph(label, ratio, cls) { return '<div class="ph ' + (cls || '') + '" data-ph="' + esc(label + '|' + ratio) + '"></div>'; }
  var LOGO = '<picture><source srcset="logo.webp" type="image/webp"><img src="logo.png" width="320" height="84" alt="Conti e Conti, il valore dell\'edilizia"></picture>';

  /* toolbar */
  var tb = document.getElementById('tb');
  if (tb && CL) tb.outerHTML = '<div class="tb tb-c"><a href="presentazione.html">&larr; Indice</a><span class="sp"></span><span class="tb-t">Wireframe &middot; proposta di struttura</span></div>';
  else if (tb) tb.outerHTML = '<div class="tb" role="toolbar" aria-label="Strumenti wireframe"><a href="index.html">Indice wireframe</a><span class="sp"></span>' +
    '<div class="grp" role="group" aria-label="Anteprima larghezza"><span>Vista:</span>' +
    '<button data-vw="auto" aria-pressed="true">Fluida</button><button data-vw="desktop" aria-pressed="false">Desktop</button><button data-vw="tablet" aria-pressed="false">Tablet</button><button data-vw="mobile" aria-pressed="false">Mobile</button></div>' +
    '<a href="#note-pagina" id="tl">Annotazioni &darr;</a><button id="tn" aria-pressed="true">Note</button></div>';

  /* header */
  var hdr = document.getElementById('hdr');
  if (hdr) {
    var li = NAV.map(function (n) {
      var cur = n[0] === act ? ' aria-current="page"' : '';
      var sub = '';
      if (n[0] === 'cantieri') sub = '<ul class="dd" aria-label="Categorie cantieri">' + CATS.map(function (c) { return '<li><a href="categoria.html">' + c + '</a></li>'; }).join('') + (CL ? '' : '<li><a class="tbd" href="cantieri.html">[Settori: voce da decidere]</a></li>') + '</ul>';
      return '<li><a href="' + n[2] + '"' + cur + '>' + n[1] + '</a>' + sub + '</li>';
    }).join('');
    var ml = NAV.map(function (n) {
      var sub = n[0] === 'cantieri' ? '<ul>' + CATS.map(function (c) { return '<li><a href="categoria.html">' + c + '</a></li>'; }).join('') + '</ul>' : '';
      return '<li><a href="' + n[2] + '">' + n[1] + '</a>' + sub + '</li>';
    }).join('');
    var L = ['impresa', 'cantieri', 'vendita', 'blog'], R = ['faq', 'contatti'];
    function lis(keys) {
      return NAV.filter(function (n) { return keys.indexOf(n[0]) > -1; }).map(function (n) {
        var cur = n[0] === act ? ' aria-current="page"' : '';
        var sub = '';
        if (n[0] === 'cantieri') sub = '<ul class="dd" aria-label="Categorie cantieri">' + CATS.map(function (c) { return '<li><a href="categoria.html">' + c + '</a></li>'; }).join('') + '</ul>';
        return '<li><a href="' + n[2] + '"' + cur + '>' + n[1] + '</a>' + sub + '</li>';
      }).join('');
    }
    hdr.outerHTML = '<a class="skip" href="#main">Vai al contenuto</a><header class="hd">' +
      '<nav class="hd-l" aria-label="Principale"><ul>' + lis(L) + '</ul></nav>' +
      '<a class="logo-w" href="home-a.html" aria-label="Conti &amp; Conti, home">' + LOGO.replace(/alt="[^"]*"/, 'alt=""') + '</a>' +
      '<div class="hd-r"><nav aria-label="Pagine di servizio"><ul>' + lis(R) + '</ul></nav><a class="btn hcta" href="contatti.html">Richiedi un preventivo</a></div>' +
      '<button class="burger" aria-expanded="false" aria-controls="mnav"><span class="sr">Menu</span><span aria-hidden="true">&#9776;</span></button></header>' +
      '<nav class="mnav" id="mnav" aria-label="Principale mobile"><ul>' + ml + '</ul><a class="btn" href="contatti.html" style="margin-top:12px">Richiedi un preventivo</a></nav>';
  }

  /* footer */
  var ftr = document.getElementById('ftr');
  if (ftr) {
    ftr.outerHTML = '<footer class="ft"><div class="in grid g3">' +
      '<div><div class="logo-w logo-ft">' + LOGO + '</div>' + (CL ? '' : '<p>[Payoff segnaposto]</p><p>[Social: da verificare]</p>') + '</div>' +
      '<nav aria-label="Footer"><h2>Sito</h2><ul>' + NAV.map(function (n) { return '<li><a href="' + n[2] + '">' + n[1] + '</a></li>'; }).join('') + '<li><a href="lavora-con-noi.html">Lavora con noi</a></li></ul></nav>' +
      '<div><h2>Contatti</h2><p><span class="tag">RICERCA</span>Dati dal sito attuale, da verificare:</p><ul><li>Via Nazionale dei Giovi 169, 20823 Lentate sul Seveso (MB)</li><li><a href="tel:+390362557972">0362 557972</a></li><li><a href="mailto:info@contieconti.it">info@contieconti.it</a></li><li>Lun-Ven 8:30-12:00 / 14:00-18:30; Sab 8:30-12:00</li></ul></div></div>' +
      (CL ? '' : N('PROPOSTA', 'WAITING_FOR_APPROVAL. Certificazioni e riconoscimenti tolti dal footer (feedback: spostarli, ma non nel footer): ora in Home dentro il blocco squadra/Massimo come prova del metodo, e nella pagina Impresa. Tolta anche la colonna Riconoscimenti (loghi Cassa Edile/Cassa dei Laghi): footer a 3 colonne, nessun logo di terzi.')) +
      '<div class="in ft-legal">Conti e Conti Srl, P.IVA 00934370966 <span class="tag">RICERCA</span> &middot; <a href="https://www.iubenda.com/privacy-policy/57429672" target="_blank" rel="noopener">Privacy policy<span class="sr"> (si apre in nuova scheda)</span></a> &middot; <a href="https://www.iubenda.com/privacy-policy/57429672/cookie-policy" target="_blank" rel="noopener">Cookie policy<span class="sr"> (si apre in nuova scheda)</span></a> &middot; <button type="button" class="ft-cookie">Preferenze cookie</button>' + (CL ? '' : N('DEV', 'Preferenze cookie: sul sito attuale è un link senza destinazione gestito dal banner Iubenda (riapre il pannello consensi). Nel sito nuovo: pulsante con la classe/trigger previsto da Iubenda (es. iubenda-cs-preferences-link), nessun href. VERIFY configurazione e piano Iubenda. Link Privacy/Cookie policy = documenti Iubenda del sito attuale (RICERCA), si aprono in nuova scheda.') + N('VERIFY', 'Preferenze cookie gestite dal banner Iubenda: verificare che il banner resti attivo nel nuovo sito.')) + '</div></footer>';
  }

  /* sticky mobile bar */
  var st = body.dataset.sticky;
  if (st) {
    var fr = document.querySelector('.frame');
    var lab = st === 'info' ? 'Richiedi informazioni' : 'Preventivo';
    var href = st === 'info' ? '#form' : 'contatti.html';
    fr.insertAdjacentHTML('beforeend', '<div class="sticky-m"><a class="btn sec2" href="tel:+390362557972" style="background:#fff">Chiama</a><a class="btn" href="' + href + '">' + lab + '</a></div>');
  }

  /* indicatori "quote di progetto": markup del blocco fiducia Home */
  function PQ() {
    var S = [[['~', 180], 'cantieri all\'anno', '~180'], [['~', 300], 'preventivi all\'anno', '~300'], [[13, '-', 14, 'M€'], 'di fatturato annuo', '13-14 M€'], [[40], 'dipendenti diretti', '40'], [[40, 'anni'], 'quarantennale nel 2027', '40 anni']];
    return S.map(function (s, i) {
      var v = s[0].map(function (x) {
        if (typeof x === 'number') return '<span class="pq-n" data-to="' + x + '">' + x + '</span>';
        return x === '~' || x === '-' ? '<span class="pq-s">' + (x === '-' ? '&ndash;' : x) + '</span>' : '<span class="pq-u">' + x + '</span>';
      }).join('');
      return '<li class="pq-i" style="--i:' + i + '"><span class="pq-v" aria-hidden="true">' + v + '</span><span class="sr">' + s[2] + ' </span><span class="pq-q" aria-hidden="true"></span><span class="pq-t">' + s[1] + '</span></li>';
    }).join('');
  }

  /* componenti condivisi */
  var C = {
    stats: function (n) {
      return '<ul class="grid g6" style="list-style:none;padding:0;margin:0;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">' + [['~180', 'cantieri all\'anno'], ['~300', 'preventivi all\'anno'], ['13-14 M€', 'di fatturato annuo'], ['40', 'dipendenti diretti'], ['40 anni', 'quarantennale nel 2027']].map(function (s) {
        return '<li class="stat"><b>' + s[0] + '</b><span>' + s[1] + '</span></li>';
      }).join('') + '</ul>' + (n ? N('CLIENTE', 'Numeri dalla call (~180 cantieri/anno, ~300 preventivi, 13-14 M€, 40 dipendenti diretti, 40 anni). Cosa misura "13-14 M€" va confermato. Anno di fondazione: brief e pagina Impresa del sito attuale dicono 1987, la home del sito attuale dice 1988/"30 anni": VERIFY. Dipendenti: brief 40, pagina Impresa attuale 8 tecnici + 26 muratori e carpentieri + 9 impiegati = 43: VERIFY. Numeri statici, niente counter animati senza decisione motion.') + N('DEV', 'LOW. Elementor: container flex wrap con 5 coppie Heading + Text (nessun Counter animato, coerente con la nota CLIENTE). Salvato come Template riusabile (widget Template, Pro) e inserito in Home e Impresa: i numeri si cambiano in un punto solo. Responsive: 5 colonne desktop, 3+2 laptop/tablet, 2 colonne mobile (min-width via flex-basis). Stima 1.5-2.5 h, una tantum.') : '');
    },
    logos: function (n) {
      /* blocco fiducia: indicatori come catena di quote (disegno tecnico) > banda loghi clienti (wordmark segnaposto, NDA) > Pausa sotto la banda */
      var q = PQ();
      var W = ['serif', 'cond', 'slab', 'mono', 'script', 'disp', 'grot', 'serif-i', 'cond-l', 'slab-b', 'disp-s', 'mono-u', 'grot-u'];
      var l = W.map(function (w, i) {
        return '<li class="lg-i"><span class="wmk w-' + w + '" aria-hidden="true">Logo cliente</span><span class="sr">Logo cliente ' + (i + 1) + '</span></li>';
      }).join('');
      return '<div class="marq" role="group" aria-roledescription="banda scorrevole" aria-label="Loghi dei clienti (segnaposto)"><div class="marq-track"><ul class="marq-set">' + l + '</ul><ul class="marq-set" aria-hidden="true">' + l + '</ul></div></div>' +
        '<p class="marq-ctl"><button type="button" class="marq-btn" aria-pressed="false"><span aria-hidden="true" class="marq-ico"></span><span class="marq-lab">Pausa</span><span class="sr"> scorrimento loghi</span></button></p>' +
        (n ? N('PROPOSTA', 'INDICATORI NUMERICI RIMOSSI dalla Home (decisione utente, piano ore 83): resta solo la banda loghi. WAITING_FOR_APPROVAL. Versione "quote di progetto" (non piu presente). Titolo e riga di contesto impilati, a filo sinistro del contenitore del sito (stesso bordo di header-contenuti e sezioni successive). I 5 indicatori sono letti come una catena di quote di un disegno tecnico: cifre grandi in Archivo, sotto una linea di misura sottile con tacche che corre senza interruzioni da filo sinistro a filo destro del contenitore, etichetta sotto la linea. Colonne identiche = passo identico tra gli indicatori, numero sempre su una riga. Tablet 3+2, mobile 2 colonne: la catena si spezza per righe mantenendo il passo. Banda loghi = firma della sezione: passo regolare (ogni logo in uno slot di larghezza fissa, centrato), nessun fondo. Pulsante Pausa piccolo, sotto la banda, a filo destro del contenitore (mai sopra i loghi). Certificazioni spostate nel blocco squadra/Massimo.') + N('PROPOSTA', 'Motion, una sola orchestrazione all\'ingresso in viewport (una volta): la linea di quota si disegna da sinistra a destra (5 tratti in sequenza continua, 160 ms ciascuno = 800 ms totali) mentre le cifre contano da 0 al valore (900 ms, ease-out). Nessun altro effetto. Riduci movimento: tutto statico, valori finali subito. Lettori di schermo: leggono sempre il valore finale (testo nascosto), le cifre animate sono aria-hidden. Sostituisce la nota precedente "numeri statici": da approvare con la direzione motion.') + N('PROPOSTA', 'Copy alternativo (solo proposta, testo invariato): titolo "Quarant\'anni di cantieri, in cifre". Riga: "Quanto lavoriamo in un anno e chi ci ha affidato i propri spazi." (la parte "chi controlla come lavoriamo" si riferiva alle certificazioni, ora spostate nel blocco squadra).') : '') +
        (n ? N('CLIENTE', '13 loghi clienti (numero concordato in call) in una banda scorrevole continua. VERIFY NDA per ogni marchio prima di pubblicare: nomi non scritti nel wireframe. Movimento lento e lineare, si ferma al passaggio del mouse e al focus, pulsante Pausa sempre disponibile (WCAG 2.2.2), con "riduci movimento" attivo la banda è ferma e scorre a mano. Alt = nome del cliente solo se autorizzato.') + N('CLIENTE', 'Numeri dalla call (~180 cantieri/anno, ~300 preventivi, 13-14 M€, 40 dipendenti diretti, 40 anni). Cosa misura "13-14 M€" va confermato. Fondazione 1987 vs 1988: VERIFY. Dipendenti 40 vs 43 (pagina Impresa attuale): VERIFY.') + N('DEV', 'MEDIUM. Elementor Pro, template salvata (widget Template). Titolo: Heading + Text nel container boxed globale. Indicatori: 5 widget Counter nativi (prefisso/suffisso, durata 900 ms, separatore migliaia off) in container grid 5 colonne (tablet 3, mobile 2), gap colonna 0; linea di quota = pseudo-elementi sul container di ogni Counter in Custom CSS (linea 1 px + tacche), disegno con classe aggiunta all\'ingresso (Motion Effects > Entrance non gestisce scaleX: 10-15 righe JS IntersectionObserver). "13-14" = Counter con prefisso "13-" (conta solo 14) o testo statico. Il Counter nativo non rispetta prefers-reduced-motion: override JS da prevedere. Banda loghi: container flex con 13 Image in slot a larghezza fissa, duplicati (secondo set aria-hidden), @keyframes in Custom CSS, pausa hover/focus, pulsante Pausa (~10 righe JS in widget HTML), reduced motion = scorrimento manuale. Stima 6-9 h (indicatori + quote + motion 2.5-3.5 h, banda 3-4.5 h, composizione/responsive 0.5-1 h). Rischi: allineamento quote al passo delle colonne tra breakpoint, Counter e lettori di schermo, 13 loghi omogenei SVG/WebP, alt solo se NDA ok.') + N('VERIFY', 'Nessun plugin marquee/counter aggiuntivo installato né approvato: non assumere add-on.') : '');
    },
    cert: function (n) {
      /* certificazioni come prova del metodo, nel blocco squadra (Home) */
      return '<div class="mc"><h3 class="mc-h">Certificazioni e riconoscimenti</h3><ul class="mc-l">' + CERT.map(function (x) {
        return '<li class="ct-i"><span class="ct-b" aria-hidden="true">' + x[0] + '</span><span class="ct-t"><b>' + x[1] + '</b><span>' + x[2] + '</span>' + (x[3] ? '<span class="ct-by">' + x[3] + '</span>' : '') + '</span></li>';
      }).join('') + '</ul></div>' +
        (n ? N('PROPOSTA', 'WAITING_FOR_APPROVAL. Certificazioni qui come prova del metodo raccontato dal testo (personale diretto, sistema qualità, regolarità), non sotto l\'hero e non nel footer. Griglia 2x2 sotto la firma di Massimo, separata da un filetto; badge testuali segnaposto, nel mockup loghi ufficiali monocromatici. Restano anche nella pagina Impresa. Feedback: ente certificatore reso esplicito con il contrassegno testuale "Ente: TÜV Italia" (nel mockup logo TÜV Italia, uso del marchio secondo le regole dell\'ente: VERIFY). DEV delta circa 0.25 h.') + N('RICERCA', 'UNI EN ISO 9001:2015 (TÜV Italia), Cassa Edile Awards 2024 e 2025-2026, Cassa dei Laghi: materiale e sito attuale. Attestazione SOA classifica IV bis: VERIFY col cliente (categorie e scadenza). Loghi ufficiali in vettoriale da richiedere.') + N('DEV', 'LOW. Container grid 2 colonne (mobile 1) con 4 coppie Image + Text Editor, oppure Icon List. 1-1.5 h (spostate dal footer, stima invariata).') : '');
    },
    reviews: function (n) {
      var c = '';
      for (var i = 1; i <= 3; i++) c += '<figure class="box" style="margin:0"><div class="meta" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote style="margin:8px 0 0"><p>[Testo della recensione Google reale, 2-3 righe: va copiato dal profilo, non scritto da noi.]</p></blockquote><figcaption style="font-size:14px;margin-top:8px"><strong>[Nome autore]</strong> &middot; [data]</figcaption></figure>';
      return '<div class="grid g3">' + c + '</div><p style="margin-top:12px"><a href="#">Leggi tutte le recensioni su Google (si apre in nuova scheda)</a></p>' +
        (n ? N('CLIENTE', '8 recensioni Google esistenti. Mostrare testi e autori reali, non inventati. Nessuna valutazione numerica scritta qui: da leggere dal profilo. PROPOSTA: 3 visibili desktop, 1 mobile con scorrimento manuale (no autoplay), link al profilo Google. DEV: import statico vs widget terze parti (peso/privacy/cookie) da decidere.') + N('DEV', 'LOW-MEDIUM. Elementor: 3 container con Star Rating (core) + Text; testi reali copiati a mano (statico) = 2-3 h. Mobile: scorrimento manuale con overflow-x + scroll-snap in Custom CSS (leggero, no autoplay) oppure widget Carousel nested (Pro) se serve la freccia. Il widget Google Reviews di plugin terzi NON è incluso in stima: peso, cookie, privacy, aggiornamento automatico = +3-6 h e plugin da approvare (VERIFY).') : '');
    },
    cats: function (n) {
      /* indice editoriale + immagine che cambia al passaggio/focus (desktop); su mobile miniatura in riga */
      return '<div class="cx" data-on="0"><ol class="cx-l">' + CATS.map(function (c, i) {
        return '<li><a class="cx-a" href="categoria.html" data-i="' + i + '"><span class="cx-n" aria-hidden="true">' + ('0' + (i + 1)) + '</span><span class="cx-t">' + c + '</span><span class="cx-m">[N progetti]</span><span class="cx-ar" aria-hidden="true">&rarr;</span><span class="cx-th" aria-hidden="true">' + ph('Foto cantiere ' + c, '1/1') + '</span></a></li>';
      }).join('') + '</ol><div class="cx-s" aria-hidden="true"><div class="cx-fs">' + CATS.map(function (c, i) {
        return '<figure class="cx-f" data-i="' + i + '">' + ph('Foto cantiere ' + c, '4/5') + '<figcaption><span>' + c + '</span><small>[N progetti]</small></figcaption></figure>';
      }).join('') + '</div><div class="cx-big"><span class="cx-win"><span class="cx-reel">' + CATS.map(function (c, i) { return '<span>0' + (i + 1) + '</span>'; }).join('') + '</span></span><span class="cx-tot">/ 0' + CATS.length + '</span></div></div></div>' +
        (n ? N('PROPOSTA', 'WAITING_FOR_APPROVAL. Versione 2 dell\'indice (impianto approvato, resa più incisiva): sezione su fondo nero per stacco dal resto della home; anteprima grande al vivo che arriva al bordo destro della pagina e resta ferma (sticky) mentre si scorre l\'elenco; cambio immagine con tendina orizzontale (clip-path da sinistra a destra, 700 ms, cubic-bezier(.7,0,.2,1)) + leggero assestamento della foto (scala 1.08 > 1); numero grande della categoria che scorre verticalmente come un contatore (01-08) con totale "/ 08"; didascalia con nome e numero progetti. Sostituisce la dissolvenza descritta nella nota precedente. Scartato il cursore-anteprima che segue il puntatore: effetto vistoso, solo desktop, poco utile rispetto all\'anteprima fissa e più fragile in Elementor. Tastiera = hover (focus sul link attiva la stessa anteprima). Mobile/touch invariato: elenco con miniature, nessuna anteprima grande. Riduci movimento: cambio istantaneo, numero statico aggiornato, contenuto identico.') : '') +
        (n ? N('PROPOSTA','WAITING_FOR_APPROVAL. Sostituisce le 8 tessere foto con un indice editoriale: elenco numerato grande a sinistra (nome + numero progetti), a destra una sola immagine grande che cambia quando il mouse passa o il focus da tastiera arriva su una categoria (dissolvenza 320 ms + leggero zoom-out 1.04 > 1, easing cubic-bezier(.2,.6,.2,1); la riga attiva si sposta di 8 px e mostra il filetto bordeaux). Funzione: anteprima del tipo di cantiere senza moltiplicare 8 foto nella pagina, gerarchia tipografica architettonica. Scartata la mappa con pin: richiederebbe posizioni reali dei cantieri (non fornite) e duplicherebbe la sezione Zone. Mobile/touch: niente hover, l\'immagine grande sparisce e ogni riga mostra la sua miniatura quadrata (tap = apre la categoria). Riduci movimento: nessuna transizione, cambio immagine istantaneo, contenuto identico. Screen reader: 8 link reali, immagine di anteprima aria-hidden (decorativa, duplica il nome). Foto per categoria: da scegliere dopo approvazione.') + N('APPROVATO', 'Le 8 categorie sono approvate secondo il brief (proposta Susanna Conti); l\'elenco in docs/00-input/sito-web/settoridiattivita.md include "Case" accanto a "Residenze": ottava voce e possibili accorpamenti da chiarire. Etichette placeholder, nessuna modifica fatta. Relazione con "Settori" del brief: vedi box su pagina Cantieri.') + N('DEV', 'LOW. Le 8 categorie sono termini della tassonomia del CPT Progetti (VERIFY CPT/ACF). Tessere: Loop Grid su query Termini se la versione di Elementor Pro installata la supporta (VERIFY), altrimenti 8 container statici con link a archivio (stesso risultato, 8 voci cambiano di rado). Foto categoria = campo immagine del termine (ACF, VERIFY) oppure immagine fissa. Incluso nel lavoro Home (non conteggiato a parte). Se cambia la decisione Settori vs Categorie le ore NON cambiano per le tessere, cambiano per menu/URL/template.') + N('DEV', 'Indice con anteprima v2 (PROPOSTA, WAITING_FOR_APPROVAL). Elementor Pro: sezione container full width sfondo nero (colore globale); interno 2 colonne 50/50; sinistra Loop Grid su termini (VERIFY) o 8 container statici con link (numero, Heading, testo N progetti); destra container sticky (Motion Effects Sticky o position:sticky in Custom CSS) con margine destro negativo per arrivare al bordo pagina, 8 Image sovrapposte (position absolute) + Heading del numero grande in un contenitore overflow hidden. Custom CSS (Pro): clip-path inset per la tendina, classi .is-on/.is-prev, translateY del contatore, velatura gradiente per la leggibilità del numero e della didascalia, @media prefers-reduced-motion. JS ~25 righe in widget HTML: mouseenter/focusin sul link > imposta indice attivo e precedente, aggiorna contatore. Mobile (<=640 px): colonna immagine nascosta, miniatura per riga. Stima 6-9 h (prima 4-6 h; tessere semplici ~1.5 h). Rischi: peso 8 immagini grandi (lazy-load tranne la prima, WebP ~120-180 KB a 1000 px), clip-path non animabile su browser molto vecchi (fallback: cambio istantaneo), sticky dentro container con overflow in Elementor (il margine negativo richiede overflow-x:clip sulla sezione), contrasto del numero e della didascalia dipende dalla foto (velatura obbligatoria), Loop Grid su termini non garantita.') : '');
    },
    featured: function (n) {
      var f = [['Casa MJO', 'Milano', 'Un intervento di pregio a Milano.'], ['Ceresio 7', '[località]', 'Piscina e palestra.'], ['Villa Lodovic', '[località]', 'Una villa seguita dal progetto alla consegna.']];
      return '<ul class="grid g3" style="list-style:none;padding:0;margin:0">' + f.map(function (p) {
        return '<li><a class="card" href="progetto.html">' + ph('Foto reale ' + p[0], '4/5') + '<span class="meta">[Categoria] &middot; ' + p[1] + '</span><h3>' + p[0] + '</h3><span>' + p[2] + '</span><span><u>Scopri il progetto</u></span></a></li>';
      }).join('') + '</ul>' + (n ? N('CLIENTE', '3 progetti in evidenza: casa MJO (Milano), Ceresio 7 (piscina + palestra; 2a pagina più visitata del sito, 10-12 preventivi generati; 3 palestre con soletta molleggiata), Villa Lodovic. VERIFY NDA sui nomi: se serve usare "Casa ...". Foto: solo placeholder, selezione dopo approvazione wireframe.') + N('DEV', 'MEDIUM, componente condiviso. Elementor Pro: Loop Item (Theme Builder > Loop Item) = Card progetto, con Dynamic Tags (immagine in evidenza, titolo, categoria/località/anno da ACF, link). Elenco: Loop Grid con query Selezione manuale oppure meta query ACF "in evidenza" (preferibile: il cliente cambia i 3 progetti da admin). Card intera cliccabile: link sul container (Loop Item) con un solo link accessibile; focus visibile da stilare. 4/5 per le card in evidenza e 4/3 per elenco = due varianti dello stesso Loop Item o due template (+0.5-1 h). Ore: Loop Item + stile 3-4 h (una volta, riusato in Home, Cantieri, Categoria, Progetti simili, Area). Dipende da CPT Progetti + ACF (VERIFY).') : '');
    },
    imm: function (k, n) {
      return '<ul class="grid g3" style="list-style:none;padding:0;margin:0">' + IMM.slice(0, k).map(function (p) {
        return '<li><a class="card card-imm" href="residenza.html">' + ph('Render ' + p, '4/3') + '<span class="ci-b"><span class="badge">' + (IMMD[p] ? IMMD[p][0] : '[Stato]') + '</span><h3>' + p + '</h3><span class="meta">' + (IMMD[p] ? IMMD[p][1] : '[Località] &middot; [tipologia] &middot; [mq]') + '</span><u>Scopri l\'immobile</u></span></a></li>';
      }).join('') + '</ul>' + (n ? N('CLIENTE', 'Immobili in vendita (nomi dal brief): Domus 54, via Diaz, palazzina Montesolaro, Seregno (+ Monza da valutare), Residenza Solarium, Residenza Paradiso. Dati scheda (stato, mq, prezzo) NON forniti: placeholder. Obiettivo cliente: contatto diretto con il costruttore, senza agenzie. RICERCA: dal sito attuale, Solarium = Montesolaro (frazione di Carimate), 4 unità, consegna entro dicembre 2026; Paradiso = Lentate sul Seveso; via Diaz = cantiere a Lentate sul Seveso (notizia del sito attuale). VERIFY: "Palazzina Montesolaro" citata nella call potrebbe coincidere con Residenza Solarium (stessa località): duplicato?') + N('DEV', 'MEDIUM, componente condiviso. Loop Item "Card immobile" (Pro) con Dynamic Tags: immagine render, badge stato (campo ACF select o tassonomia Stato: In costruzione/Disponibile/Venduto), località e dati da ACF; Loop Grid sul CPT Immobili (6-7 voci, ordine manuale per campo ACF numerico). Con placeholder "[Stato]" i campi vuoti non devono mostrare etichette vuote: Dynamic Tag con Fallback o Display Conditions (Pro) sul badge. Ore: Loop Item 2-3 h una tantum + CPT Immobili e campi ACF 2-3 h (voce Setup). VERIFY: CPT e ACF non confermati; senza CPT, 6 card statiche fanno risparmiare ~3-5 h ora ma ogni modifica diventa manuale e le schede non condividono template (sconsigliato).') : '');
    },
    blog: function () {
      var t = ['Ristrutturare casa: da dove cominciare e a chi affidarsi', 'Costruire casa in Brianza: dal terreno alla consegna', 'Ville sul Lago di Como: cosa cambia costruendo in un contesto di pregio'];
      return '<ul class="grid g3" style="list-style:none;padding:0;margin:0">' + t.map(function (x) {
        return '<li><a class="card" href="articolo.html">' + ph('Immagine articolo', '3/2') + '<span class="meta">[Data] &middot; [x min di lettura]</span><h3>' + x + '</h3><span><u>Leggi l\'articolo</u></span></a></li>';
      }).join('') + '</ul>';
    },
    zone: function (n) {
      /* mappa stilizzata: posizioni indicative, non cartografiche */
      var Z = [['lc', 'Lago di Como', 'Ville di pregio sul lago, spesso al fianco di architetti che seguono una clientela internazionale', 47, 30], ['va', 'Varese', 'Zona operativa', 21, 40], ['mb', 'Monza, Seregno e Brianza', 'Nuove costruzioni e residenze in vendita', 66, 58], ['mi', 'Milano', 'Interventi di pregio in città', 52, 82]];
      var svg = '<svg viewBox="0 0 400 300" aria-hidden="true" focusable="false">' +
        '<rect width="400" height="300" fill="#f7f7f6"/>' +
        '<path d="M10 120 L70 96 L120 112 L150 92 L168 140 L140 170 L96 168 L60 186 L20 170 Z" fill="#efeeec" stroke="#d6d5d3" stroke-dasharray="4 4"/>' +
        '<path d="M150 92 L196 60 L262 40 L300 72 L292 128 L240 140 L196 132 L168 140 Z" fill="#efeeec" stroke="#d6d5d3" stroke-dasharray="4 4"/>' +
        '<path d="M168 140 L196 132 L240 140 L300 150 L310 196 L250 206 L190 196 L150 190 L140 170 Z" fill="#efeeec" stroke="#d6d5d3" stroke-dasharray="4 4"/>' +
        '<path d="M60 186 L96 168 L140 170 L150 190 L190 196 L250 206 L320 214 L340 284 L60 290 L40 236 Z" fill="#efeeec" stroke="#d6d5d3" stroke-dasharray="4 4"/>' +
        '<path d="M46 20 C52 60 44 92 40 128 L48 130 C54 92 62 60 56 20 Z" fill="#c9d2d6"/>' +
        '<path d="M120 76 C132 80 142 86 146 96 L140 99 C134 90 126 86 118 82 Z" fill="#c9d2d6"/>' +
        '<path d="M232 10 C226 40 214 60 196 82 C190 88 186 92 188 98 L194 98 C196 92 202 88 210 80 C220 70 228 64 234 70 C240 80 246 92 250 104 L256 102 C252 86 244 70 240 58 C238 44 240 26 242 10 Z" fill="#c9d2d6"/>' +
        '<text x="244" y="30" font-size="11" fill="#7c7d82" font-family="Hanken Grotesk,Arial,sans-serif">Lago di Como</text>' +
        '<text x="62" y="30" font-size="11" fill="#7c7d82" font-family="Hanken Grotesk,Arial,sans-serif">Lago Maggiore</text>' +
        '</svg>';
      var pins = Z.map(function (z, i) {
        return '<span class="zm-pin" data-z="' + z[0] + '" tabindex="-1" aria-hidden="true" style="left:' + z[3] + '%;top:' + z[4] + '%"><i></i><b>' + z[1] + '</b></span>';
      }).join('') + '<span class="zm-pin hq" data-z="hq" aria-hidden="true" style="left:44%;top:52%"><i></i><b>Sede</b></span>';
      var list = Z.map(function (z) {
        return '<li><span class="zm-it" data-z="' + z[0] + '"><strong>' + z[1] + '</strong><span>' + z[2] + '</span></span></li>';
      }).join('') + '<li class="hq-row" data-z="hq"><b>Sede</b> &middot; Lentate sul Seveso (MB)</li>';
      return '<div class="zm"><div class="zm-map">' + svg + pins + '</div><ul class="zm-l">' + list + '</ul></div>' +
        (n ? N('PROPOSTA', 'NESSUNA PAGINA PER ZONA (decisione utente): pin ed elenco non sono cliccabili. WAITING_FOR_APPROVAL. "Dove operiamo" come mappa stilizzata disegnata (SVG inline: aree e laghi semplificati, nessuna mappa esterna né tile) con un pin per ciascuna zona operativa e la sede di Lentate sul Seveso (indirizzo dal sito attuale, RICERCA). Le posizioni sono INDICATIVE, non cartografiche: confini e laghi sono sagome astratte, da ridisegnare nel mockup su base reale semplificata. Passaggio del mouse su pin o riga = pin e riga evidenziati insieme; clic/tap sul pin o sulla riga = pagina area. Accessibilità: l\'elenco testuale accanto è il percorso equivalente (link reali, tastiera, screen reader); i pin sono duplicati visivi aria-hidden fuori dall\'ordine di tabulazione e il focus sulla riga accende il pin corrispondente. Pulsazione lenta dei pin disattivata con riduci movimento. Descrizioni brevi dal brief (Lago di Como: ville di lusso, clientela straniera tramite architetti; Milano: interventi di pregio; Monza/Seregno/Brianza: nuove costruzioni e mercato immobiliare; Varese: zona operativa), copy provvisorio.') + N('DEV', 'Mappa zone (PROPOSTA). Elementor Pro: container 2 colonne; sinistra widget HTML con SVG inline + pin come link posizionati in % (oppure Image SVG + widget Hotspot, core Elementor: più semplice da editare ma tooltip meno controllabili e accessibilità da verificare); destra Icon List o 4 container con link. JS ~15 righe (widget HTML) per accendere pin e riga insieme su mouseenter/focusin. Stima 3-5 h (SVG semplificato fornito dal design) + 1-2 h se la mappa va ridisegnata su base cartografica. Rischi: posizioni % che si spostano se cambia il ratio (fissare aspect-ratio), etichette sovrapposte su mobile, licenza della base cartografica se si parte da dati reali (usare fonti open, VERIFY), pagine per zona eliminate (decisione utente).') + N('VERIFY', 'In Contatti la mappa stilizzata convive con la mappa statica della sede: decidere se tenerne una sola.') : '') +
        (n ?N('CLIENTE', 'Zona operativa dichiarata: Milano, Como, Varese, Monza Brianza. Aree SEO citate nel brief: Lago di Como, Milano, Monza/Seregno/Brianza. Varese non ha area SEO nel brief: VERIFY. Le pagine per zona sono state eliminate (decisione utente).') + N('DEV', 'LOW. Chip = Button widget o Icon List in flex wrap (4 link): 0.5-1 h, incluso nelle card/home. Se le pagine area non sono approvate i link puntano a Cantieri filtrato o vengono rimossi: nessun costo aggiuntivo.') : '');
    },
    cta: function (n) {
      return '<div class="in grid split"><div><h2>Hai un progetto in mente?</h2><p class="lead">Raccontaci cosa vuoi costruire o ristrutturare. Ti rispondiamo entro [24 ore].</p></div><div class="btns"><a class="btn" href="contatti.html">Richiedi un preventivo</a><a class="btn sec2" href="tel:+390362557972">Chiama 0362 557972</a></div></div>' +
        (n ? N('PROPOSTA', 'WAITING_FOR_APPROVAL. Fascia CTA in bordeaux pieno (colore brand già in palette, nessun colore nuovo) per staccarla dal footer nero. Contrasti: testo bianco su #7d1d2c ~10:1, sottotitolo #f3e4e7 ~8:1; pulsante primario invertito (fondo bianco, testo bordeaux), secondario con bordo bianco. Applicata ovunque compare la fascia (template condiviso). DEV: nessuna ora in più, solo colori del template.') : '') +
        (n ? N('PROPOSTA', 'CTA primaria unica e ripetuta (obiettivo: contatti qualificati). Il numero telefonico è quello del sito attuale (RICERCA, da verificare). Il tempo di risposta non è fornito dal cliente: non inventarlo.') + N('DEV', 'LOW. Template salvato "Fascia CTA" inserito con widget Template (Pro) in tutte le pagine: testo e pulsanti modificabili in un solo posto. Link tel: sul numero; tracciamento click su telefono/CTA solo se il tracking è definito (VERIFY GA4/GTM). Stima 1-1.5 h una tantum.') : '');
    }
  };
  document.querySelectorAll('[data-c]').forEach(function (el) {
    var k = el.dataset.c.split(':'), name = k[0], notes = el.hasAttribute('data-notes');
    var h = name === 'imm' ? C.imm(+k[1] || 3, notes) : C[name](notes);
    el.innerHTML = h;
  });

  /* placeholder immagini */
  /* didascalia discreta per la modalità cliente: "Foto: Casa MJO" */
  function cap(l) {
    if (/^HERO/i.test(l)) return 'Foto: progetto in evidenza';
    if (/^Mappa/i.test(l)) return 'Mappa: Lentate sul Seveso';
    if (/^Logo /i.test(l)) return l.replace(/^Logo /i, '');
    var c = l.replace(/\s*\(.*\)\s*/, '').replace(/,?\s*(foto reale|progetto reale)$/i, '').replace(/^Foto( reale| cantiere)?\s*/i, '').trim();
    if (/^(Render|Ritratto|Immagine|Dettaglio)/i.test(c)) return c;
    return (!c || /^\d+$/.test(c)) ? 'Foto' : 'Foto: ' + c;
  }
  var tone = 0;
  document.querySelectorAll('[data-ph]').forEach(function (el) {
    var p = el.dataset.ph.split('|'), r = p[1] || '16/9', isLogo = el.classList.contains('logo');
    el.classList.add('ph');
    if (!isLogo) el.dataset.tone = tone++ % 4;
    el.style.aspectRatio = r;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Segnaposto immagine: ' + p[0]);
    el.innerHTML = '<span>' + (CL ? esc(cap(p[0])) : esc(p[0]) + (el.hasAttribute('data-noratio') ? '' : ' &middot; ' + esc(r.replace('/', ':')))) + '</span>';
  });

  /* modalità cliente: via note, etichette, decisioni aperte; [segnaposto] resi senza parentesi */
  if (CL) {
    document.querySelectorAll('[data-note], .legend, .open, .demo-state, .dd .tbd').forEach(function (el) { el.remove(); });
    var nn = document.querySelector('.notes'); if (nn) nn.remove();
    document.querySelectorAll('.frame .tag').forEach(function (t) {
      var b = t.closest('.box'), pp = t.parentElement;
      if (b && t.classList.contains('t-VERIFY')) b.remove();
      else if (pp.tagName === 'P' && pp.firstElementChild === t && pp.textContent.length < 80) pp.remove();
      else t.remove();
    });
    var fr0 = document.querySelector('.frame');
    if (fr0) {
      var w = document.createTreeWalker(fr0, NodeFilter.SHOW_TEXT), tn = [], x;
      while ((x = w.nextNode())) if (/\[[^\]]+\]/.test(x.nodeValue)) tn.push(x);
      tn.forEach(function (t) {
        var s = document.createElement('span');
        s.innerHTML = esc(t.nodeValue).replace(/\[([^\]]+)\]/g, '<span class="tbc">$1</span>');
        t.replaceWith.apply(t, Array.prototype.slice.call(s.childNodes));
      });
    }
  }

  /* modalità interna: box .open, etichette inline e box VERIFY diventano note (marker + pannello), senza ingombro nel layout */
  if (!CL) {
    var toNote = function (el, tagEl) {
      var tg = tagEl ? tagEl.textContent.trim().replace(/\s+/g, '_') : 'PROPOSTA';
      if (tagEl) tagEl.remove();
      var i = document.createElement('i'); i.dataset.note = tg + '|' + el.textContent.replace(/\s+/g, ' ').trim();
      el.replaceWith(i);
    };
    document.querySelectorAll('.frame .open').forEach(function (o) { toNote(o, o.querySelector('.tag')); });
    document.querySelectorAll('.frame .tag').forEach(function (t) {
      if (!t.isConnected || t.closest('.notes, .demo-state, .legend')) return;
      var b = t.closest('.box'), pp = t.parentElement;
      if (b && t.classList.contains('t-VERIFY')) toNote(b, t);
      else if (pp.tagName === 'P' && pp.firstElementChild === t && pp.textContent.length < 80) toNote(pp, t);
      else { var i = document.createElement('i'); i.dataset.note = t.textContent.trim().replace(/\s+/g, '_') + '|' + pp.textContent.replace(/\s+/g, ' ').trim().slice(0, 300); t.replaceWith(i); }
    });
  }
  /* note: marker discreti + popover; elenco completo in un blocco richiudibile a fine pagina */
  var list = document.getElementById('notes'), k = 0;
  document.querySelectorAll('[data-note]').forEach(function (el) {
    var p = el.dataset.note, i = p.indexOf('|'), tag = p.slice(0, i), txt = p.slice(i + 1);
    k++;
    var m = document.createElement('button');
    m.type = 'button'; m.className = 'n'; m.textContent = k;
    m.setAttribute('aria-label', 'Nota ' + k + ' (' + tag.replace('_', ' ') + ')');
    m.dataset.tag = tag; m.dataset.txt = txt;
    /* marker fuori flusso: raccolti nell'angolo alto a destra del blocco di riferimento (nessun ingombro) */
    var hn = el.parentElement && el.parentElement.classList.contains('hero-notes');
    var anc = hn ? null : el.closest('.box, figure, li, .sec, section, .hero, header, .hd, footer, .ft');
    if (anc && (anc.closest('.notes') || anc.tagName === 'A')) anc = null;
    if (anc) {
      if (getComputedStyle(anc).position === 'static') anc.style.position = 'relative';
      var wr = anc.querySelector(':scope > .n-wrap');
      if (!wr) { wr = document.createElement('span'); wr.className = 'n-wrap'; anc.appendChild(wr); }
      wr.appendChild(m); el.remove();
    } else el.replaceWith(m);
    if (list) {
      var li = document.createElement('li');
      li.innerHTML = '<span class="n">' + k + '</span><div><span class="tag t-' + (tag === 'WAITING_FOR_APPROVAL' ? 'WAITING' : tag) + '">' + tag.replace('_', ' ') + '</span>' + esc(txt) + '</div>';
      list.appendChild(li);
    }
  });
  var nw = document.querySelector('.notes');
  if (nw) {
    var det = document.createElement('details');
    det.className = 'notes'; det.id = 'note-pagina';
    var h = nw.querySelector('h2'), sm = document.createElement('summary');
    sm.textContent = (h ? h.textContent : 'Annotazioni') + ' (' + k + ')';
    det.appendChild(sm);
    var lg = document.querySelector('.legend');
    if (lg) det.appendChild(lg);
    det.appendChild(list);
    nw.replaceWith(det);
    var tl = document.getElementById('tl');
    if (tl) tl.addEventListener('click', function () { det.open = true; });
  }
  var pop = document.createElement('div');
  pop.className = 'np'; pop.setAttribute('role', 'tooltip'); pop.id = 'np';
  body.appendChild(pop);
  var pinned = null;
  function showNote(m) {
    pop.innerHTML = '<span class="tag">' + esc(m.dataset.tag.replace('_', ' ')) + '</span>' + esc(m.dataset.txt);
    pop.style.display = 'block';
    var r = m.getBoundingClientRect(), w = pop.offsetWidth, hh = pop.offsetHeight;
    var x = Math.max(12, Math.min(r.left, window.innerWidth - w - 12));
    var y = r.bottom + 8; if (y + hh > window.innerHeight - 8) y = Math.max(8, r.top - hh - 8);
    pop.style.left = x + 'px'; pop.style.top = y + 'px';
    m.setAttribute('aria-describedby', 'np');
  }
  function hideNote() { pop.style.display = 'none'; document.querySelectorAll('.n[aria-describedby]').forEach(function (x) { x.removeAttribute('aria-describedby'); }); }
  function noteOf(e) { return e.target.closest && e.target.closest('.n[data-txt]'); }
  document.addEventListener('mouseover', function (e) { var m = noteOf(e); if (m && !pinned) showNote(m); });
  document.addEventListener('mouseout', function (e) { if (noteOf(e) && !pinned) hideNote(); });
  document.addEventListener('focusin', function (e) { var m = noteOf(e); if (m && !pinned) showNote(m); });
  document.addEventListener('focusout', function (e) { if (noteOf(e) && !pinned) hideNote(); });
  document.addEventListener('click', function (e) {
    var m = noteOf(e);
    if (m) { if (pinned === m) { pinned = null; hideNote(); } else { pinned = m; showNote(m); } }
    else if (pinned) { pinned = null; hideNote(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { pinned = null; hideNote(); } });
  window.addEventListener('scroll', function () { if (!pinned) hideNote(); }, { passive: true });

  /* interazioni */
  var vp = document.querySelector('.vp');
  document.querySelectorAll('[data-vw]').forEach(function (b) {
    if (b.tagName !== 'BUTTON') return;
    b.addEventListener('click', function () {
      if (vp) vp.setAttribute('data-vw', b.dataset.vw);
      document.querySelectorAll('button[data-vw]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    });
  });
  var nb = document.getElementById('tn');
  if (nb) nb.addEventListener('click', function () {
    var off = body.classList.toggle('nonotes');
    nb.setAttribute('aria-pressed', !off);
  });
  document.querySelectorAll('.burger').forEach(function (b) {
    b.addEventListener('click', function () {
      var o = document.getElementById('mnav').classList.toggle('open');
      b.setAttribute('aria-expanded', o);
    });
  });
  document.querySelectorAll('.marq-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var m = b.closest('[data-c]').querySelector('.marq'), p = m.classList.toggle('paused');
      b.setAttribute('aria-pressed', p);
      b.querySelector('.marq-lab').textContent = p ? 'Riprendi' : 'Pausa';
    });
  });
  /* quote indicatori: una sola orchestrazione all'ingresso (linea che si disegna + cifre che contano); reduced motion = statico */
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.pq').forEach(function (pq) {
    if (RM || !('IntersectionObserver' in window)) { pq.classList.add('is-in'); return; }
    var ns = pq.querySelectorAll('.pq-n');
    /* valori finali visibili finché l'osservatore non scatta: nessun rischio di cifre a zero */
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      ns.forEach(function (x) { x.style.minWidth = x.dataset.to.length + 'ch'; x.textContent = '0'; });
      pq.classList.add('pq-js'); void pq.offsetWidth; pq.classList.add('is-in');
      setTimeout(function () { ns.forEach(function (x) { x.textContent = x.dataset.to; x.style.minWidth = ''; }); }, 1000);
      var t0 = performance.now();
      (function tick(t) {
        var k = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - k, 3);
        ns.forEach(function (x) { x.textContent = Math.round(+x.dataset.to * e); });
        if (k < 1) requestAnimationFrame(tick);
        else ns.forEach(function (x) { x.style.minWidth = ''; });
      })(t0);
    }, { threshold: .35 });
    io.observe(pq);
  });
  /* hero in viewport: misura barra strumenti e header reali (cambiano tra modalità e breakpoint) */
  function fit() {
    /* --hh = tutto ciò che sta sopra l'hero a scroll 0 (legenda, bordo cornice, header) oltre alla barra */
    var t = document.querySelector('.tb'), h = document.querySelector('.hd'), rs = document.documentElement.style;
    var th = t ? t.offsetHeight : 0;
    rs.setProperty('--tbh', th + 'px');
    if (h) rs.setProperty('--hh', Math.ceil(h.getBoundingClientRect().bottom + window.scrollY) - th + 'px');
  }
  fit(); window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  /* indice categorie: passaggio mouse o focus = stessa anteprima */
  document.querySelectorAll('.cx').forEach(function (cx) {
    function on(e) { var a = e.target.closest && e.target.closest('.cx-a'); if (a) set(a.dataset.i); }
    var reel = cx.querySelector('.cx-reel');
    function set(i) {
      i = String(i);
      var prev = cx.dataset.on;
      if (prev === i && cx.querySelector('.cx-f.is-on')) return;
      cx.dataset.on = i;
      cx.querySelectorAll('.cx-f').forEach(function (x) { x.classList.toggle('is-prev', x.dataset.i === prev && prev !== i); });
      cx.querySelectorAll('[data-i]').forEach(function (x) { x.classList.toggle('is-on', x.dataset.i === i); });
      if (reel) reel.style.transform = 'translateY(' + (-i) + 'em)';
    }
    cx.addEventListener('mouseover', on); cx.addEventListener('focusin', on); set(0);
  });
  /* mappa zone: pin e riga dell'elenco si accendono insieme */
  document.querySelectorAll('.zm').forEach(function (zm) {
    function hl(e) {
      var t = e.target.closest && e.target.closest('[data-z]');
      var z = t ? t.dataset.z : null;
      zm.querySelectorAll('[data-z]').forEach(function (x) { x.classList.toggle('is-on', x.dataset.z === z); });
    }
    /* accensione sincronizzata pin/elenco rimossa (piano 83 h) */
    zm.addEventListener('mouseleave', function () { zm.querySelectorAll('.is-on').forEach(function (x) { x.classList.remove('is-on'); }); });
  });
  document.querySelectorAll('button.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      c.closest('.chips').querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
    });
  });
  /* Impresa, impegni: tab verticali da container 860px; sotto, lista statica */
  document.querySelectorAll('.imp-m').forEach(function (m, mi) {
    if (m.classList.contains('imp-static')) return;
    var tw = m.querySelector('.imp-tw'), ol = m.querySelector('.imp-cl');
    if (!tw || !ol) return;
    var lis = [].slice.call(ol.children), on = false, cur = 0, pn, tabs = [], pns = [], hov;
    var RM = window.matchMedia('(prefers-reduced-motion: reduce)'), FINE = window.matchMedia('(hover: hover) and (pointer: fine)');
    function count(p) {
      var s = p.querySelector('[data-n]'); if (!s) return;
      var n = +s.dataset.n; s.textContent = n;
      if (RM.matches || n < 10) return;
      var t0 = performance.now();
      clearTimeout(p._ct); p._ct = setTimeout(function () { s.textContent = n; }, 760);
      (function step(t) { var k = Math.min(1, (t - t0) / 700); s.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1 && on) requestAnimationFrame(step); else s.textContent = n; })(t0);
    }
    function sel(i, focus) {
      if (i === cur && !focus) return;
      cur = i;
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i); t.tabIndex = j === i ? 0 : -1; });
      pns.forEach(function (p, j) { p.hidden = j !== i; p.classList.remove('is-in'); });
      void pns[i].offsetWidth; pns[i].classList.add('is-in'); count(pns[i]);
      if (focus) tabs[i].focus();
    }
    function build() {
      on = true; m.classList.add('is-tab');
      ol.setAttribute('role', 'tablist'); ol.setAttribute('aria-orientation', 'vertical'); ol.setAttribute('aria-labelledby', 'h-met');
      pn = document.createElement('div'); pn.className = 'imp-pn'; tw.appendChild(pn);
      lis.forEach(function (li, i) {
        li.setAttribute('role', 'presentation');
        var a = li.querySelector('.imp-cl-a'), p = li.querySelector('.imp-cl-p'), b = document.createElement('button');
        a.setAttribute('role', 'presentation');
        b.type = 'button'; b.className = 'imp-tab'; b.id = 'imp' + mi + 't' + i; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'imp' + mi + 'p' + i);
        while (a.firstChild) b.appendChild(a.firstChild); a.appendChild(b);
        p.id = 'imp' + mi + 'p' + i; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', b.id); p.tabIndex = 0;
        pn.appendChild(p); tabs.push(b); pns.push(p);
        b.addEventListener('click', function () { sel(i); });
        b.addEventListener('mouseenter', function () { if (FINE.matches) { clearTimeout(hov); hov = setTimeout(function () { sel(i); }, 120); } });
        b.addEventListener('mouseleave', function () { clearTimeout(hov); });
        b.addEventListener('keydown', function (e) {
          var k = e.key, n = tabs.length, j = null;
          if (k === 'ArrowDown' || k === 'ArrowRight') j = (i + 1) % n;
          else if (k === 'ArrowUp' || k === 'ArrowLeft') j = (i - 1 + n) % n;
          else if (k === 'Home') j = 0; else if (k === 'End') j = n - 1;
          if (j !== null) { e.preventDefault(); sel(j, true); }
        });
      });
      var c = cur; cur = -1; sel(c);
    }
    function tear() {
      on = false; clearTimeout(hov); m.classList.remove('is-tab');
      ['role', 'aria-orientation', 'aria-labelledby'].forEach(function (x) { ol.removeAttribute(x); });
      lis.forEach(function (li, i) {
        var a = li.querySelector('.imp-cl-a'), b = tabs[i], p = pns[i];
        li.removeAttribute('role'); a.removeAttribute('role');
        while (b.firstChild) a.appendChild(b.firstChild); b.remove();
        ['id', 'role', 'aria-labelledby', 'tabindex', 'hidden'].forEach(function (x) { p.removeAttribute(x); });
        p.classList.remove('is-in'); var s = p.querySelector('[data-n]'); if (s) s.textContent = s.dataset.n;
        li.appendChild(p);
      });
      pn.remove(); tabs = []; pns = [];
    }
    function fit() { var w = m.clientWidth >= 860; if (w && !on) build(); else if (!w && on) tear(); }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(m); else window.addEventListener('resize', fit);
  });
})();

/* Link alle categorie: ogni link a categoria.html con il nome di una categoria porta all'ancora della categoria
   (prototipo: un solo template; in Elementor ogni categoria avrà il proprio URL d'archivio). */
(function () {
  var CATS = ['Case', 'Residenze', 'Lusso', 'Palestre', 'Allestimenti', 'Ville', 'Attività commerciali', 'Industriale'];
  function slug(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var bySlug = {};
  CATS.forEach(function (c) { bySlug[slug(c)] = c; });
  document.querySelectorAll('a[href="categoria.html"]').forEach(function (a) {
    var t = (a.querySelector('h3,.cx-name') || a).textContent.replace(/\[[^\]]*\]|\d+/g, '').trim();
    CATS.forEach(function (c) { if (t.toLowerCase().indexOf(c.toLowerCase()) === 0) a.setAttribute('href', 'categoria.html#' + slug(c)); });
  });
  if (!/categoria\.html$/.test(location.pathname)) return;
  /* "Altre categorie": esclude la categoria corrente; c1/c2 = prima cella di riga (4 colonne / 2 colonne) */
  var curS = bySlug[location.hash.slice(1)] ? location.hash.slice(1) : 'palestre', vis = [];
  document.querySelectorAll('.pg-oc li').forEach(function (li) {
    var a = li.querySelector('a');
    if (a && a.getAttribute('href') === 'categoria.html#' + curS) li.hidden = true; else vis.push(li);
  });
  vis.forEach(function (li, i) { if (i % 4 === 0) li.classList.add('c1'); if (i % 2 === 0) li.classList.add('c2'); if (i % 4 === 3) li.classList.add('e4'); if (i % 2 === 1) li.classList.add('e2'); });
  function apply() {
    var c = bySlug[location.hash.slice(1)];
    if (!c || c === 'Palestre') { if (c === undefined && location.hash) return; return; }
    var h1 = document.getElementById('h1'); if (h1) h1.textContent = c;
    var cur = document.querySelector('.crumb [aria-current]'); if (cur) cur.textContent = c;
    document.title = 'Wireframe Pagina categoria (' + c + ') | Conti & Conti';
    var lead = h1 && h1.parentNode.querySelector('.lead');
    if (lead) lead.innerHTML = '<span class="tbc">[Introduzione alla categoria ' + c + ': cosa realizziamo, per chi, con quali competenze. Testo da scrivere con il cliente e in ottica SEO.]</span>';
    var btn = h1 && h1.parentNode.querySelector('.btn'); if (btn) btn.textContent = 'Richiedi un preventivo';
    ['h-comp', 'h-faq'].forEach(function (id) { var s = document.getElementById(id); if (s) { s = s.closest('section'); if (s) s.hidden = true; } });
    document.querySelectorAll('#h-prj ~ ul .card').forEach(function (card) {
      var m = card.querySelector('.meta'); if (m) m.innerHTML = c + ' &middot; [Località]';
      var h = card.querySelector('h3'); if (h) h.textContent = '[Nome progetto]';
    });
    var hp = document.getElementById('h-prj'); if (hp) hp.textContent = 'Progetti in questa categoria';
    window.scrollTo(0, 0);
  }
  apply();
  window.addEventListener('hashchange', function () { location.reload(); });
})();

/* Navbar trasparente sulla hero, piena allo scroll */
(function () {
  var H = document.querySelector('.hd');
  if (!H) return;
  var hasHero = !!document.querySelector('#main > .hero, #main > .crumb + .hero');
  if (hasHero) document.body.classList.add('has-hero');
  function size() { document.documentElement.style.setProperty('--hdh', H.offsetHeight + 'px'); }
  function sc() { H.classList.toggle('is-solid', !hasHero || window.scrollY > 40); }
  size(); sc();
  window.addEventListener('scroll', sc, { passive: true });
  window.addEventListener('resize', size);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(size);
})();