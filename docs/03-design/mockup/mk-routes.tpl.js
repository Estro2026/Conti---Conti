/* Indirizzi del sito (PDF copywriter, sezione 14). File generato da build-routes.js a partire da mk-routes.tpl.js: non modificarlo a mano.
   - Nelle pagine annidate (cartelle con index.html) imposta lo slug e sistema i collegamenti interni "#".
   - Nei file modello alla radice (cantieri.html, progetto.html#slug...) porta all'indirizzo nuovo.
   - Riscrive i collegamenti ai modelli verso gli indirizzi nuovi, a pagina caricata. */
(function () {
  /*DATA*/
  var nested = !!window.MK_NESTED, file = location.pathname.split('/').pop(), hash = '';
  try { hash = decodeURIComponent(location.hash.slice(1)); } catch (e) { hash = location.hash.slice(1); }
  /* aprendo i file direttamente (file://) le cartelle non si aprono da sole: serve index.html */
  function ix(p) { return location.protocol === 'file:' && /\/$/.test(p) ? p + 'index.html' : p; }
  function cs(s) { return s === 'commerciali' ? 'attivita-commerciali' : s; }
  function dest(tpl, h) {
    if (D.FIX[tpl]) return { p: D.FIX[tpl], h: tpl === 'cantieri.html' ? h : '' };
    var s;
    if (tpl === 'categoria.html') { s = cs(h || D.DEF.categoria); return { p: 'progetti-realizzati/' + s + '/', h: '' }; }
    if (tpl === 'progetto.html') { s = h && D.P[h] ? h : D.DEF.progetto; return { p: 'progetti-realizzati/' + D.P[s] + '/' + s + '/', h: '' }; }
    if (tpl === 'residenza.html') { s = h && D.I.indexOf(h) > -1 ? h : D.DEF.residenza; return { p: 'appartamenti-in-vendita-monza-e-brianza/' + (D.IM[s] || s) + '/', h: '' }; }
    if (tpl === 'articolo.html') { s = h && D.A.indexOf(h) > -1 ? h : D.DEF.articolo; return { p: 'blog/' + s + '/', h: '' }; }
    return null;
  }
  if (!nested) {
    var d = dest(file, hash);
    if (d) { location.replace(ix(d.p) + location.search + (d.h ? '#' + d.h : '')); return; }
  }
  /* collegamenti interni "#" nelle pagine annidate: con <base> andrebbero alla radice */
  if (nested) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute('href').slice(1); e.preventDefault();
      var t = id && document.getElementById(id);
      if (t) { t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); try { history.replaceState(null, '', location.pathname + location.search + '#' + id); } catch (x) {} }
    }, true);
  }
  /* riscrittura dei collegamenti ai modelli */
  function fix(a, attr) {
    var v = a.getAttribute(attr); if (!v) return;
    var m = /^(?:\.\/)?([a-z0-9-]+\.html)(?:\?[^#]*)?(?:#(.*))?$/.exec(v); if (!m) return;
    var q = (/\?[^#]*/.exec(v) || [''])[0], r = dest(m[1], m[2] ? decodeURIComponent(m[2]) : '');
    if (r) a.setAttribute(attr, ix(r.p) + q + (r.h ? '#' + r.h : ''));
  }
  function run(root) {
    [].forEach.call((root || document).querySelectorAll('a[href]'), function (a) { fix(a, 'href'); });
    [].forEach.call((root || document).querySelectorAll('form[action]'), function (f) { fix(f, 'action'); });
  }
  function start() {
    run();
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === 'attributes') { if (m.target.tagName === 'A') fix(m.target, 'href'); }
        else [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) { if (n.tagName === 'A') fix(n, 'href'); if (n.querySelectorAll) run(n); } });
      });
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();

/* istruzione 114: la scritta "Conti e Conti" del footer sta sempre su una riga: occupa il 98,5% della larghezza disponibile, in tutte le pagine e a ogni larghezza */
(function () {
  function fit() {
    [].forEach.call(document.querySelectorAll('.ha-ft-word, .ft-word'), function (w) {
      w.style.setProperty('white-space', 'nowrap', 'important'); w.style.setProperty('display', 'block', 'important');
      var cs = getComputedStyle(w), box = w.clientWidth; if (!box) return;
      var ls = parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize); if (isNaN(ls)) ls = 0;
      var p = document.createElement('span');
      p.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;font-family:' + cs.fontFamily + ';font-weight:' + cs.fontWeight + ';font-style:' + cs.fontStyle + ';font-size:100px;letter-spacing:' + ls + 'em;text-transform:' + cs.textTransform;
      p.textContent = w.textContent; document.body.appendChild(p); var tw = p.getBoundingClientRect().width; p.remove();
      if (!tw) return;
      w.style.setProperty('font-size', (100 * box / tw * 0.985).toFixed(2) + 'px', 'important');
    });
  }
  var t; function later() { clearTimeout(t); t = setTimeout(fit, 60); }
  window.addEventListener('load', function () { fit(); setTimeout(fit, 500); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit); });
  window.addEventListener('resize', later);
})();
