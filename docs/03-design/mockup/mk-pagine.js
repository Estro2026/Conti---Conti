/* Mockup pagine interne: dove una sezione corrisponde a una sezione della Home A, il segnaposto
   prende la stessa foto della Home A (istruzione Sara n. 33). Gli altri segnaposto restano tali. */
(function () {
  var P = 'img/persone/', F = 'img/foto/';
  var MAP = [
    [/^Ritratto di Massimo Conti/i, 'img/massimo-conti-scontornato.webp'],
    /* foto reali del cliente (Basecamp, istruzione 50): img/foto/ */
    [/casa finita a tutta larghezza|villa finita/i, F + 'villa-lugarna-facciata-loggia-balaustre.webp'],
    [/Villa Lugarna/i, F + 'villa-lugarna-loggia-colonna-vista-lago.webp'],
    [/Ceresio 7, piscina|vasca della piscina/i, F + 'ceresio-7-piscina-piscina-skyline-tramonto.webp'],
    [/Foto Ceresio 7|sala fitness/i, F + 'ceresio-7-palestra-palestra-attrezzi.webp'],
    [/Casa MJO/i, F + 'casa-mjo-soggiorno-scala-ottone-cucina.webp'],
    [/Foto progetto Lusso/i, F + 'atrium-studio-salone-panoramica.webp'],
    [/residenza costruita/i, F + 'la8-ingresso-cancello-la8.webp'],
    [/negozio o capannone|Foto negozio|Negozio o locale/i, F + 'atrium-studio-salone-panoramica.webp'],
    [/ristrutturazione/i, F + 'brera-mansarda-open-space-cucina.webp'],
    [/^Palestra$/i, F + 'the-rise-sala-neon-we-rise.webp'],
    [/^Allestimento$/i, F + 'allestimento-mm-palco-dall-alto.webp'],
    [/interno finito, scurita/i, F + 'casa-mjo-corridoio-volta-ottone.webp'],
    [/Immagine principale del progetto/i, F + 'ceresio-7-piscina-piscina-skyline-tramonto.webp'], /* la scheda progetto è Ceresio 7 */
    [/^Foto 1, vasca/i, F + 'ceresio-7-piscina-piscina-skyline-tramonto.webp'], [/^Foto 2, sala/i, F + 'ceresio-7-palestra-palestra-attrezzi.webp'],
    [/^Foto 3/i, F + 'ceresio-7-piscina-cabanas-lettini.webp'], [/^Foto 4/i, F + 'ceresio-7-piscina-piscina-skyline-notte-luci.webp'],
    [/^Foto 5/i, F + 'ceresio-7-palestra-piscina-interna.webp'], [/^Foto 6/i, F + 'ceresio-7-piscina-vasca-idromassaggio.webp'],
    [/progetto successivo/i, F + 'the-rise-sala-neon-we-rise.webp'],
    /* render reali estratti dalle brochure del cliente (istruzione 55); Via Diaz, Paradiso, BDC: nessun render nel materiale -> segnaposto */
    [/Render Residenza Paradiso/i, F + 'residenza-paradiso-render-esterno.webp'],
    [/Render Domus 54/i, F + 'domus-54-facciata-giardino-panoramica.webp'], [/Render Residenza Solarium/i, F + 'solarium-facciata-tramonto.webp'],
    /* scheda residenza (istruzione 47): render della Home A al posto dei segnaposto */
    [/^Render di dettaglio, ingrandito/i, F + 'solarium-facciata-tramonto.webp'], [/^Render di dettaglio/i, F + 'solarium-facciata-ingresso-tramonto.webp'],
    [/^Render 1$/i, F + 'solarium-facciata-laterale-tramonto.webp'], [/^Render 2$/i, F + 'solarium-ingresso-sera.webp'], [/^Render 3$/i, F + 'solarium-interno-soggiorno-cucina.webp'], [/^Render 4$/i, F + 'solarium-vista-alto-giardino.webp'],
    [/^Planimetria (Unità 1|Appartamento A)/i, F + 'solarium-pianta-piano-terra-appartamento-a.webp'], [/^Planimetria unità \[?tipo/i, F + 'solarium-pianta-piano-terra-appartamento-b2.webp'],
    /* foto di cantiere di Residenza Solarium: non presente nel materiale -> segnaposto */
    [/muratori e carpentieri/i, F + 'squadra-quattro-casseri.webp'],
    [/tecnico di cantiere/i, F + 'team-capocantiere-casco-bianco.webp'],
    [/ufficio della sede/i, F + 'team-impiegata-ufficio-maglia-bordeaux.webp'],
    [/ufficio tecnico al lavoro/i, F + 'team-giorgio-munari-ufficio.webp'],
    [/velata: squadra in cantiere/i, F + 'squadra-tre-gilet-sottotetto.webp'],
    [/squadra in cantiere/i, F + 'squadra-tre-gilet-sottotetto.webp'],
    [/apprendista/i, F + 'team-tecnico-cantiere-giovane-casco.webp'],
    [/cantiere strutturale/i, 'img/foto/squadra-quattro-casseri.webp']
  ];
  var TEAM = ['team-giorgio-munari-ufficio', 'team-pierluigi-spini-ufficio', 'team-irene-ciceri-ufficio', 'team-impiegata-ufficio-giacca-grigia', 'team-capocantiere-casco-bianco', 'team-impiegata-ufficio-maglia-bordeaux', 'team-operaio-cantiere-berretto', 'team-impiegata-ufficio-maglia-marrone', 'team-tecnico-cantiere-giovane-casco', 'team-impiegata-ufficio-scrivania', 'team-operaio-cantiere-casco'], t = 0;
  /* segnaposto generici (griglie progetti, categorie, articoli): foto reali a rotazione */
  var GAL = ['casa-mjo-scala-ottone-sospesa', 'villa-lugarna-loggia-colonna-vista-lago', 'ceresio-7-piscina-piscina-skyline-tramonto', 'brera-mansarda-zona-pranzo', 'the-rise-spogliatoio-panca-armadietti', 'la8-terrazza-pergola-tavolo', 'casa-porta-romana-mansarda-open-space-tavolo', 'atrium-studio-poltrona-rossa-vetrata', 'villa-lugarna-bovindo-vetrata-cupola', 'casa-mjo-bagno-boiserie-blu-lavabo', 'la-molgora-hotel-camera-letto-testiera-legno', 'spadolini-terrazza-pergola-divano', 'villa-lugarna-bagno-vasca-libera-marmo', 'casa-porta-romana-doccia-piastrelle-verdi-ad-arco', 'brera-camera-letto-quadri', 'la8-soggiorno-divano-cucina', 'casa-mjo-camera-matrimoniale', 'villa-lugarna-terrazza-balaustra-vista-lago'], g = 0;
  document.querySelectorAll('[data-ph]').forEach(function (el) {
    var lab = el.dataset.ph.split('|')[0], src = null;
    for (var i = 0; i < MAP.length; i++) if (MAP[i][0].test(lab)) { src = MAP[i][1]; break; }
    if (!src && /^Ritratto/i.test(lab)) src = F + TEAM[t++ % TEAM.length] + '.webp';
    if (!src && /^(Foto progetto|Progetto [0-9]|Foto progetto in NDA)/i.test(lab) && !/NDA/.test(lab)) src = F + GAL[g++ % GAL.length] + '.webp';
    if (!src) return;
    el.classList.add('mk-has');
    el.removeAttribute('role'); el.removeAttribute('aria-label');
    el.innerHTML = '<img class="mk-img" src="' + src + '" alt="" decoding="async">';
  });
  /* Realizzazioni: ogni card prende un progetto reale della sua categoria, secondo l'elenco lavori del cliente
     (istruzione 51). Le card "[Nome progetto]" ricevono il nome del progetto; NDA e Villa Lodovic restano come sono. */
  var CATP = {
    case: [['Casa Porta Romana', 'Milano', 'casa-porta-romana-mansarda-open-space-tavolo'], ['Appartamento Brera', 'Milano', 'brera-mansarda-zona-pranzo']],
    residenze: [['La8', 'Seregno', 'la8-terrazza-pergola-tavolo']],
    lusso: [['Ceresio 7 Piscina', 'Milano', 'ceresio-7-piscina-cabanas-lettini']],
    palestre: [['The Rise', 'Milano', 'the-rise-sala-neon-we-rise']],
    commerciali: [['La Molgora Hotel', '', 'la-molgora-hotel-camera-letto-testiera-legno']],
    allestimenti: [['LaTarma', 'Milano', 'allestimento-mm-palco-dall-alto']],
    ville: [['Villa Lugarna', '', 'villa-lugarna-loggia-colonna-vista-lago']]
  };
  var NAMED = { 'Ceresio 7': 'ceresio-7-piscina-piscina-skyline-tramonto', 'Casa MJO': 'casa-mjo-soggiorno-scala-ottone-cucina', 'Villa Lugarna': 'villa-lugarna-loggia-colonna-vista-lago' };
  var setImg = function (box, file) {
    var ph = box && box.querySelector('[data-ph]'); if (!ph) return;
    ph.classList.add('ph', 'mk-has'); ph.removeAttribute('role'); ph.removeAttribute('aria-label');
    ph.innerHTML = '<img class="mk-img" src="' + F + file + '.webp" alt="" decoding="async">';
  };
  document.querySelectorAll('[data-cat]').forEach(function (it) {
    var h = it.querySelector('h3'); if (!h) return;
    var name = h.textContent.trim(), cat = it.dataset.cat;
    if (NAMED[name]) { if (name === 'Villa Lugarna') { var mm = it.querySelector('.meta'); if (mm) mm.innerHTML = 'Menaggio &middot; <span class="tbc">Anno</span>'; } return setImg(it, NAMED[name]); }
    if (/NDA/.test(name)) { var pn = it.querySelector('.mk-has'); if (pn) { pn.classList.remove('mk-has'); pn.innerHTML = '<span>Progetto riservato: foto da concordare</span>'; } return; }
    if (!/^\[?Nome progetto\]?$/.test(name)) return;
    var list = CATP[cat];
    if (!list || !list.length) { /* es. industriale: nessun progetto nel materiale, torna segnaposto */
      var ph = it.querySelector('.mk-has'); if (ph) { ph.classList.remove('mk-has'); ph.innerHTML = '<span>Foto progetto industriale</span>'; } return;
    }
    var p = list.shift(); h.textContent = p[0];
    var m = it.querySelector('.meta'); if (m) m.innerHTML = (p[1] ? p[1] + ' &middot; ' : '') + '<span class="tbc">Anno</span>';
    var hv = it.querySelector('.cn-hv b'); if (hv) hv.textContent = p[0];
    setImg(it, p[2]);
  });
  /* certificazioni: stessi loghi della sezione Certificazioni della Home A */
  var LOGO = { 'ISO 9001': 'img/logo-iso.png', 'SOA': 'img/foto/attestazione-soa.webp', 'Cassa Edile': 'img/foto/cassa-edile-award-2025-trim.webp' };
  document.querySelectorAll('.ix-t-logo').forEach(function (el) {
    var s = LOGO[el.textContent.trim()];
    if (s) { el.classList.add('mk-logo'); el.innerHTML = el.textContent.trim() === 'Cassa Edile' ? ['2024', '2025', '2026'].map(function (y) { return '<img src="img/foto/cassa-edile-award-' + y + '-trim.webp" alt="">'; }).join('') : '<img src="' + s + '" alt="">'; }
  });
  /* Impresa: seconda frase del titolo in bordeaux, testo invariato */
  var t = document.querySelector(".ixi-t");
  if (t && t.childNodes.length === 1) t.innerHTML = t.textContent.replace(/^(.*?\.)\s+(.*)$/, '$1 <span class="mk-t2">$2</span>');
  /* Realizzazioni, apertura: ogni categoria ha un proprio tono (palette del marchio) e il quadrante centrale
     cambia colore con lei, con testo a contrasto AA (istruzione 44). [fondo, testo su fondo, quadrante, testo quadrante] */
  var CAT = [
    ['#d9cfc1', '#151517', '#7d1d2c', '#ffffff'], /* Case: pietra calda, quadrante bordeaux */
    ['#c7bcae', '#151517', '#151517', '#ffffff'], /* Residenze: sabbia, quadrante nero */
    ['#2b2224', '#ffffff', '#f4f1ec', '#5c1420'], /* Lusso: bruno scuro, quadrante carta */
    ['#5c1420', '#ffffff', '#f4f1ec', '#151517'], /* Palestre: bordeaux profondo, quadrante carta */
    ['#e6ded2', '#151517', '#5c1420', '#ffffff'], /* Allestimenti: carta chiara, quadrante bordeaux scuro */
    ['#a99e92', '#151517', '#f4f1ec', '#151517'], /* Ville: tortora, quadrante carta */
    ['#3a3335', '#ffffff', '#f3e7e9', '#5c1420'], /* Attività commerciali: grafite calda, quadrante rosa chiaro */
    ['#6f6b69', '#ffffff', '#151517', '#ffffff']  /* Industriale: grafite, quadrante nero */
  ];
  var cnh = document.getElementById('cnh'), plate = document.getElementById('cnh-plate');
  if (cnh && plate) {
    cnh.classList.add('mk-cnh');
    cnh.querySelectorAll('.cnh-s').forEach(function (s) {
      var k = +getComputedStyle(s).getPropertyValue('--k') || 0, c = CAT[k % CAT.length];
      s.style.setProperty('--mk-bg', c[0]); s.style.setProperty('--mk-fg', c[1]);
    });
    var links = [].slice.call(cnh.querySelectorAll('ol a'));
    var paint = function () {
      var i = Math.max(0, links.findIndex(function (a) { return a.getAttribute('href') === plate.getAttribute('href'); })), c = CAT[i % CAT.length];
      cnh.style.setProperty('--mk-bg', c[0]); cnh.style.setProperty('--mk-fg', c[1]);
      plate.style.setProperty('--mk-pb', c[2]); plate.style.setProperty('--mk-pf', c[3]);
    };
    paint(); new MutationObserver(paint).observe(plate, { attributes: true, attributeFilter: ['href'] });
  }
  /* Realizzazioni, apertura: foto reali per categoria nelle due colonne (istruzione 57); Industriale: nessuna foto nel materiale */
  var COV = [['casa-mjo-scala-ottone-sospesa', 'casa-mjo-soggiorno-scala-ottone-cucina'], ['la8-terrazza-pergola-tavolo', 'la8-soggiorno-divano-cucina'], ['ceresio-7-piscina-cabanas-lettini', 'ceresio-7-piscina-piscina-skyline-tramonto'], ['the-rise-sala-neon-we-rise', 'the-rise-spogliatoio-panca-armadietti'], ['allestimento-mm-palco-dall-alto', 'allestimento-mm-sala-palco-luci'], ['villa-lugarna-loggia-colonna-vista-lago', 'villa-lugarna-terrazza-balaustra-vista-lago'], ['la-molgora-hotel-camera-letto-testiera-legno', 'la-molgora-hotel-camera-letto-tenda'], [null, null]];
  document.querySelectorAll('.cnh-col').forEach(function (col, side) {
    col.querySelectorAll('.cnh-s').forEach(function (s, k) {
      var f = COV[k] && COV[k][side]; if (!f) return;
      s.classList.add('mk-cov-on'); s.insertAdjacentHTML('afterbegin', '<img class="mk-cov" src="' + F + f + '.webp" alt="" decoding="async"><i class="mk-grade" aria-hidden="true"></i>');
    });
  });
  /* Schede: contenuti e foto pertinenti alla pagina (istruzione 60) */
  var nx = document.querySelector('.pj-next');
  if (nx) { var nb = nx.querySelector('b'); if (nb) nb.textContent = 'The Rise'; }
  var cth = document.querySelector('.ct-hero');
  if (cth && /Palestre/.test((document.getElementById('h1') || {}).textContent || '')) {
    var CP = 'ceresio-7-palestra-palestra-attrezzi';
    setImg(cth.querySelector('.ct-hero-m'), CP); /* a destra la stessa foto del primo progetto in grande */
    var dk = cth.querySelectorAll('.ct-dk-c'); setImg(dk[0], CP); setImg(dk[1], 'the-rise-sala-neon-we-rise');
    var pcs = document.querySelectorAll('.ct-pc:not(.end)');
    if (pcs[0]) setImg(pcs[0], CP);
    if (pcs[1]) { setImg(pcs[1], 'the-rise-sala-neon-we-rise'); pcs[1].querySelector('h3').textContent = 'The Rise'; pcs[1].querySelector('.ct-pc-b span').innerHTML = 'Milano &middot; palestra'; }
    if (pcs[2]) { var p2 = pcs[2].querySelector('.mk-has'); if (p2) { p2.classList.remove('mk-has'); p2.innerHTML = '<span>Foto da chiedere al cliente</span>'; } pcs[2].querySelector('h3').textContent = 'Milanimal'; pcs[2].querySelector('.ct-pc-b span').innerHTML = '<span class="tbc">Località e lavorazione: da chiedere al cliente</span>'; }
  }
  /* Impresa: ritratto scontornato del titolare (istruzione 40) */
  var bm = document.querySelector('.ix-boss-m'); if (bm) bm.classList.add('mk-cut');
  /* Impresa, Cosa costruiamo: foto dei servizi fornite dal cliente (istruzione 27) come card fotografiche */
  var SV = { 'servizio-residenze.html': 'homepageb/img/servizio-residenze.webp', 'servizio-ristrutturazioni.html': 'homepageb/img/servizio-ristrutturazioni.webp', 'servizio-retail.html': 'homepageb/img/servizio-retail.webp' };
  document.querySelectorAll('.ix-fl').forEach(function (a) {
    var s = SV[a.getAttribute('href')]; if (!s) return;
    a.classList.add('mk-sv'); a.insertAdjacentHTML('afterbegin', '<span class="mk-sv-m"><img class="mk-sv-i" src="' + s + '" alt=""></span>');
    /* descrizioni delle card servizi, stesse frasi della Home B (istruzione 41) */
    var DS = { 'servizio-residenze.html': 'Dalla progettazione alla costruzione, fino alla manutenzione di interi edifici e case singole.', 'servizio-ristrutturazioni.html': 'Lavorazioni particolari e cura del dettaglio, in dialogo costante con cliente e Direzione Lavori.', 'servizio-retail.html': 'Negozi, showroom, palestre e spazi commerciali: costruzione e manutenzione ordinaria e straordinaria.' };
    var h = a.querySelector('h3'); if (h && DS[a.getAttribute('href')]) h.insertAdjacentHTML('afterend', '<p class="mk-sv-d">' + DS[a.getAttribute('href')] + '</p>');
  });
})();
