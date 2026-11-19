/* Mockup: ogni card porta alla scheda del suo progetto o immobile, e la scheda mostra i dati e le foto di quello
   (istruzione 60). Template unici progetto.html e residenza.html, contenuto scelto con #slug. Dati in mk-schede-data.js. */
(function () {
  var D = window.MK_SCHEDE; if (!D) return;
  var F = 'img/foto/', Q = '[da chiedere al cliente]';
  var byName = {};
  Object.keys(D.progetti).forEach(function (k) { byName[D.progetti[k].nome.toLowerCase()] = 'progetto.html#' + k; });
  byName['residenza solarium'] = 'residenza.html#residenza-solarium'; byName['solarium'] = byName['residenza solarium'];
  Object.keys(D.immobili).forEach(function (k) { if (D.immobili[k]) byName[D.immobili[k].nome.toLowerCase()] = 'residenza.html#' + k; });
  /* Realizzazioni: griglia completa con tutti i progetti dell'elenco del cliente, per categoria (istruzione 67) */
  var cg = document.querySelector('.cn-grid');
  if (cg && cg.querySelector('.cn-it')) {
    var tpl = cg.querySelector('.cn-it').cloneNode(true);
    var CATN = { case: 'Case', residenze: 'Residenze', lusso: 'Lusso', palestre: 'Palestre', allestimenti: 'Allestimenti', ville: 'Ville', commerciali: 'Attività commerciali', industriale: 'Industriale' };
    var ordc = Object.keys(CATN), keysP = Object.keys(D.progetti).sort(function (a, b) { var pa = D.progetti[a], pb2 = D.progetti[b]; return (ordc.indexOf(pa.cs) - ordc.indexOf(pb2.cs)) || ((pb2.hero ? 1 : 0) - (pa.hero ? 1 : 0)); });
    cg.innerHTML = '';
    keysP.forEach(function (k) {
      var p = D.progetti[k], li = tpl.cloneNode(true);
      li.dataset.cat = p.cs; li.hidden = false;
      var a = li.querySelector('a'); a.setAttribute('href', 'progetto.html#' + k);
      var tg = li.querySelector('.cn-tag'); if (tg) tg.textContent = CATN[p.cs];
      var ph = li.querySelector('.cn-ph [data-ph], .cn-ph .ph');
      if (ph) { ph.className = 'ph' + (p.hero ? ' mk-has' : ''); ph.innerHTML = p.hero ? '<img class="mk-img" src="' + F + p.hero + '.webp" alt="" loading="lazy" decoding="async">' : '<span>Foto da chiedere al cliente</span>'; }
      var h3 = li.querySelector('h3'); if (h3) h3.textContent = p.nome;
      var me = li.querySelector('.meta'); if (me) me.textContent = p.luogo;
      var hv = li.querySelector('.cn-hv'); if (hv) hv.innerHTML = '<b>' + p.nome + '</b><small>' + p.luogo + '</small>';
      cg.appendChild(li);
    });
    var its = [].slice.call(cg.querySelectorAll('.cn-it')), fbs = [].slice.call(document.querySelectorAll('.cn-f'));
    fbs.forEach(function (b) {
      var n = b.dataset.f === 'tutti' ? its.length : its.filter(function (x) { return x.dataset.cat === b.dataset.f; }).length;
      var sp = b.querySelector('sup'); if (sp) sp.textContent = n;
      b.addEventListener('click', function () { /* dopo il filtro del wireframe, che lavora sulle card originali */
        var k = b.dataset.f, c = 0;
        its.forEach(function (x) { var on = k === 'tutti' || x.dataset.cat === k; x.hidden = !on; if (on) c++; });
        var lv = document.querySelector('.cn-live'); if (lv) lv.textContent = c + (c === 1 ? ' progetto' : ' progetti');
        var em = document.querySelector('.cn-empty'); if (em) em.hidden = c > 0;
      });
    });
    var h0c = location.hash.slice(1); if (CATN[h0c]) its.forEach(function (x) { x.hidden = x.dataset.cat !== h0c; });
  }
  /* collegamenti delle card */
  document.querySelectorAll('a[href^="progetto.html"], a[href^="residenza.html"]').forEach(function (a) {
    var t = a.querySelector('h3, strong, b'); if (!t) return;
    var u = byName[t.textContent.trim().toLowerCase()]; if (u) a.setAttribute('href', u);
  });
  var slug = decodeURIComponent(location.hash.slice(1));
  var img = function (box, f) {
    var ph = box && (box.matches && box.matches('[data-ph]') ? box : box.querySelector('[data-ph], .ph')); if (!ph) return;
    ph.classList.add('ph');
    if (f) { ph.classList.add('mk-has'); ph.innerHTML = '<img class="mk-img" src="' + F + f + '.webp" alt="" decoding="async">'; }
    else { ph.classList.remove('mk-has'); ph.innerHTML = '<span>Foto da chiedere al cliente</span>'; }
  };
  var setT = function (sel, html) { var e = document.querySelector(sel); if (e) e.innerHTML = html; };

  /* scheda progetto */
  if (document.querySelector('.pj-hero') && D.progetti[slug] && slug !== 'ceresio-7') {
    var p = D.progetti[slug];
    document.title = 'Mockup ' + p.nome + ' | Conti e Conti';
    setT('#h1', p.nome);
    var cr = document.querySelectorAll('.crumb li'); if (cr.length > 3) { cr[2].innerHTML = '<a href="categoria.html">' + p.cat + '</a>'; cr[3].textContent = p.nome; }
    setT('.pj-hero .pg-st', '<span class="badge">' + p.cat + '</span> <span class="meta">' + p.luogo + ' &middot; <span class="tbc">Anno</span></span>');
    img(document.querySelector('.pj-hero-m'), p.hero);
    setT('.pj-story-t .lead', (p.nota ? p.nota + ' ' : '') + 'Descrizione del progetto: ' + Q + '.');
    var lp = document.querySelectorAll('.pj-story-t > p'); if (lp[2]) lp[2].innerHTML = '[Contesto, richiesta del committente e soluzione adottata: ' + Q + '.]';
    setT('.pg-tk', '<li>' + Q + '</li>');
    var dd = document.querySelectorAll('.pj-side .pg-ds dd');
    if (dd[0]) dd[0].textContent = p.luogo; if (dd[1]) dd[1].innerHTML = '<a href="categoria.html">' + p.cat + '</a>';
    var hk = document.querySelector('.ct-sim, [aria-labelledby="h-how"]'); /* nulla da fare: sezione generica */
    if (p.mq && dd[3]) dd[3].textContent = p.mq;
    /* "Se ne è parlato": testate indicate dal cliente; senza testate la sezione non compare */
    var prs = document.querySelector('[aria-labelledby="h-press"]');
    if (prs) {
      if (p.press && p.press.length) prs.querySelector('.pg-dl').innerHTML = p.press.map(function (x) { return '<li><a href="' + x[2] + '" target="_blank" rel="noopener"><span><small>' + x[0] + '</small>' + x[1] + '<span class="sr"> (si apre in nuova scheda)</span></span><small>Link esterno</small></a></li>'; }).join('');
      else prs.style.display = 'none';
    }
    document.querySelectorAll('.pj-gal button').forEach(function (b, i) { img(b, p.gal[i]); b.setAttribute('aria-label', 'Apri foto ' + (i + 1) + ' di ' + p.nome); });
    var keys = Object.keys(D.progetti), nx = D.progetti[keys[(keys.indexOf(slug) + 1) % keys.length]], nxk = keys[(keys.indexOf(slug) + 1) % keys.length];
    var nxa = document.querySelector('.pj-next');
    if (nxa) { nxa.setAttribute('href', 'progetto.html#' + nxk); img(nxa, nx.hero); setT('.pj-next-in small', 'Progetto successivo &middot; ' + nx.cat); setT('.pj-next-in b', nx.nome); }
  }
  /* pagina categoria: progetti e foto della categoria scelta; a destra nell'apertura la stessa foto del primo progetto */
  var CN = { 'attivita-commerciali': 'Attività commerciali', case: 'Case', residenze: 'Residenze', lusso: 'Lusso', palestre: 'Palestre', allestimenti: 'Allestimenti', ville: 'Ville', commerciali: 'Attività commerciali', industriale: 'Industriale' };
  if (document.querySelector('.ct-hero') && CN[slug] && slug !== 'palestre') {
    var cs = slug === 'attivita-commerciali' ? 'commerciali' : slug; var list = Object.keys(D.progetti).filter(function (k) { return D.progetti[k].cs === cs; });
    document.title = 'Mockup ' + CN[slug] + ' | Conti e Conti';
    setT('#h1', CN[slug]);
    var cc = document.querySelectorAll('.crumb li'); if (cc.length) cc[cc.length - 1].textContent = CN[slug];
    var fact = document.querySelector('.ct-fact'); if (fact) fact.style.display = 'none';
    setT('.ct-hero-s .lead', 'Testo della categoria: ' + Q + '.');
    setT('.ct-cta', '<a class="btn" href="contatti.html">Richiedi un preventivo</a>');
    var first = list[0] && D.progetti[list[0]];
    img(document.querySelector('.ct-hero-m'), first ? first.hero : null);
    document.querySelectorAll('.ct-dk-c').forEach(function (c, i) { var p = D.progetti[list[i]]; img(c, p ? p.hero : null); });
    setT('#h-prj', CN[slug] + ' che abbiamo realizzato');
    var cards = document.querySelectorAll('.ct-pc:not(.end)');
    cards.forEach(function (c, i) {
      var k = list[i], p = D.progetti[k];
      if (!p) { c.style.display = 'none'; return; }
      c.setAttribute('href', 'progetto.html#' + k); img(c, p.hero);
      c.querySelector('h3').textContent = p.nome; c.querySelector('.ct-pc-b span').innerHTML = p.luogo;
    });
    if (!list.length) setT('#h-prj', CN[slug] + ': progetti con foto da chiedere al cliente');
    var cnt = document.querySelector('.ct-cnt'); if (cnt) cnt.innerHTML = '<b>01</b> / 0' + Math.max(1, list.length);
    var end = document.querySelector('.ct-pc.end'); if (end) { end.setAttribute('href', 'cantieri.html#' + slug); var eb = end.querySelector('b'); if (eb) eb.textContent = 'Vedi tutti i progetti ' + CN[slug].toLowerCase(); }
    /* la sezione tecnica (soletta molleggiata) riguarda solo le palestre */
    var tech = document.querySelector('.ct-tech'); if (tech) tech.closest('section').style.display = 'none';
  }
  /* categoria: anteprima della categoria successiva a destra, pulsanti avanti/indietro funzionanti (istruzione 61) */
  var ORD = ['case', 'residenze', 'lusso', 'palestre', 'allestimenti', 'ville', 'attivita-commerciali', 'industriale'];
  if (document.querySelector('.ct-hero')) {
    var cur = CN[slug] ? slug : 'palestre', ci = ORD.indexOf(cur);
    var heroOf = function (c) { var cs2 = c === 'attivita-commerciali' ? 'commerciali' : c; var k = Object.keys(D.progetti).filter(function (x) { return D.progetti[x].cs === cs2; })[0]; return k ? D.progetti[k].hero : null; };
    /* apertura a slider (script inline della pagina): le slide sono le foto della categoria; il riquadro a destra mostra la slide successiva */
    var csx = cur === 'attivita-commerciali' ? 'commerciali' : cur;
    var pk = Object.keys(D.progetti).filter(function (x) { return D.progetti[x].cs === csx; });
    var shots = [];
    pk.forEach(function (k) { shots.push(D.progetti[k].hero); });
    if (pk[0]) D.progetti[pk[0]].gal.forEach(function (g) { if (shots.length < 3) shots.push(g); });
    shots = shots.slice(0, 3);
    var tag = function (f) { return f ? '<img class="mk-img" src="' + F + f + '.webp" alt="" decoding="async">' : '<span class="mk-noimg">Foto da chiedere al cliente</span>'; };
    var bgs = document.querySelectorAll('.ct-hero-m .ct-bg');
    bgs.forEach(function (b, i) { var f = shots.length ? shots[i % shots.length] : null; b.innerHTML = '<div class="ph' + (f ? ' mk-has' : '') + '">' + tag(f) + '</div>'; b.dataset.mk = f || ''; });
    var peek = document.querySelector('.ct-pk');
    var fixPeek = function () {
      if (!peek || !bgs.length) return;
      var on = [].findIndex.call(bgs, function (b) { return b.classList.contains('on'); }); if (on < 0) on = 0;
      var nf = bgs[(on + 1) % bgs.length].dataset.mk || null;
      var want = nf ? F + nf + '.webp' : '';
      var cur2 = peek.querySelector('img'); if (cur2 && cur2.getAttribute('src') === want) return;
      peek.innerHTML = '<div class="ph' + (nf ? ' mk-has' : '') + '">' + tag(nf) + '</div>';
    };
    if (peek) { new MutationObserver(fixPeek).observe(peek, { childList: true }); bgs.forEach(function (b) { new MutationObserver(fixPeek).observe(b, { attributes: true, attributeFilter: ['class'] }); }); fixPeek(); }
    if (!CN[slug]) { /* pagina Palestre di default: slide coerenti con il primo progetto */ }
    var pv = ORD[(ci + ORD.length - 1) % ORD.length], nv = ORD[(ci + 1) % ORD.length];
    var ap = document.querySelector('.ct-nav2-p'), an = document.querySelector('.ct-nav2-n');
    if (ap) { ap.setAttribute('href', 'categoria.html#' + pv); var bp = ap.querySelector('b'); if (bp) bp.textContent = CN[pv]; }
    if (an) { an.setAttribute('href', 'categoria.html#' + nv); var bn = an.querySelector('b'); if (bn) bn.textContent = CN[nv]; }

  }
  /* stesso template, #slug diverso: ricarica per mostrare il contenuto giusto */
  window.addEventListener('hashchange', function () { if (document.querySelector('.ct-hero, .pj-hero, .rs-hx')) location.reload(); });
  /* scheda immobile in vendita */
  var im = D.immobili[slug];
  if (document.querySelector('.rs-hx') && im) {
    document.title = 'Mockup ' + im.nome + ' | Conti e Conti';
    setT('#h1', im.nome);
    var cr2 = document.querySelectorAll('.crumb li'); if (cr2.length) cr2[cr2.length - 1].textContent = im.nome;
    setT('.rs-p1-top', '<span>' + im.luogo + '</span><span>Consegna: ' + im.consegna + '</span>');
    setT('.rs-p1-cap', '<span class="badge">' + im.stato + '</span><br>' + im.lead);
    setT('.rs-p3-l', im.lead);
    setT('.rs-p3-d', im.dati.map(function (d) { return '<div><dt>' + d[0] + '</dt><dd>' + d[1] + '</dd></div>'; }).join(''));
    var n3 = document.querySelector('.rs-p3-n'); if (n3) n3.style.display = 'none';
    img(document.querySelector('.rs-p1-th'), im.render[1] || null);
    img(document.querySelector('.rs-p2'), im.render[0] || null);
    var pd = document.querySelectorAll('.rs-pd p'); if (pd[0]) pd[0].innerHTML = im.lead; if (pd[1]) pd[1].innerHTML = im.progettista ? 'Progetto: ' + im.progettista + '. Realizzazione: Conti e Conti.' : '[Progettista, materiali e dettagli: ' + Q + '.]';
    var ut = document.querySelector('.rs-ut');
    if (ut) {
      if (im.unita.length) {
        ut.innerHTML = im.unita.map(function (u, i) { return '<button type="button" class="rs-u" data-u="' + (i + 1) + '" data-name="Appartamento ' + u[0] + '" data-piano="' + u[1] + '" data-tipo="' + u[2] + '" data-mq="' + u[3] + '" data-est="' + Q + '" data-disp="' + Q + '" aria-pressed="' + (i === 0) + '" aria-controls="rs-up"><b>Appartamento ' + u[0] + '</b><small>' + u[3] + '</small></button>'; }).join('');
        var u0 = im.unita[0], dds = document.querySelectorAll('.rs-up .pg-ds dd');
        setT('[data-rs-name]', 'Appartamento ' + u0[0]); [u0[1], u0[2], u0[3], Q, Q].forEach(function (v, i) { if (dds[i]) dds[i].textContent = v; });
        /* il comportamento dei pulsanti è in wf-vendita.js, che legge i data- */
        ut.querySelectorAll('.rs-u').forEach(function (b) { b.addEventListener('click', function () { ut.querySelectorAll('.rs-u').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); setT('[data-rs-name]', b.dataset.name); ['piano', 'tipo', 'mq', 'est', 'disp'].forEach(function (k, i) { if (dds[i]) dds[i].textContent = b.dataset[k]; }); }); });
      } else { var sec = ut.closest('section'); if (sec) sec.innerHTML = '<h2>Gli appartamenti</h2><p>Tipologie, piani e superfici: ' + Q + '.</p>'; }
      img(document.querySelector('.rs-up-pl'), (im.piante && im.piante[0]) || null);
    }
    document.querySelectorAll('.pj-gal button').forEach(function (b, i) { img(b, im.render[i + 1] || null); });
    var fh = document.getElementById('h-form'); if (fh) fh.textContent = 'Richiedi informazioni su ' + im.nome;
  }
})();
