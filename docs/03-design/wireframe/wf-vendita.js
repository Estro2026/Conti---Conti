/* Wireframe Conti & Conti - comportamenti In vendita (iv-) e Scheda residenza (rs-). PROPOSTA.
   Va caricato dopo wireframe.js e wf-dyn.js. Con "riduci movimento" restano contenuti e controlli, senza animazioni. */
(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  var LAB = { tutti: '', costruzione: 'in costruzione', disponibile: 'disponibili', venduto: 'venduti' };

  /* ================= IN VENDITA ================= */
  var grid = $('.iv-grid');
  if (grid) {
    var items = $$('.iv-it', grid), fs = $$('.iv-f'), live = $('[data-iv-live]'), empty = $('.iv-empty');
    var map = $('.iv-map'), pins = $$('.iv-pin'), cur = 'tutti', view = 'grid';

    /* conteggi calcolati dalle schede */
    var tot = $('[data-iv-total]'); if (tot) tot.textContent = items.length;
    $$('[data-iv-n]').forEach(function (b) { var k = b.dataset.ivN; b.textContent = items.filter(function (i) { return i.dataset.st === k; }).length; });
    fs.forEach(function (b) { var k = b.dataset.f, n = k === 'tutti' ? items.length : items.filter(function (i) { return i.dataset.st === k; }).length; $('sup', b).textContent = n; });

    function closePins(except) { pins.forEach(function (p) { if (p === except) return; $('button', p).setAttribute('aria-expanded', 'false'); $('.iv-pop', p).hidden = true; }); }

    function apply() {
      var n = 0;
      items.forEach(function (it) {
        var on = cur === 'tutti' || it.dataset.st === cur;
        if (on) n++;
        if (reduce || view !== 'grid') { it.hidden = !on; it.classList.remove('is-out'); return; }
        if (on && it.hidden) { it.hidden = false; it.classList.add('is-out'); requestAnimationFrame(function () { requestAnimationFrame(function () { it.classList.remove('is-out'); }); }); }
        else if (!on && !it.hidden) { it.classList.add('is-out'); setTimeout(function () { if (it.classList.contains('is-out')) it.hidden = true; }, 350); }
      });
      /* mappa: link e pin filtrati per stato */
      pins.forEach(function (p) {
        var vis = 0;
        $$('.iv-pop a', p).forEach(function (a) { var on = cur === 'tutti' || a.dataset.st === cur; a.hidden = !on; if (on) vis++; });
        $('.iv-dot', p).textContent = vis;
        p.classList.toggle('is-dim', vis === 0);
        $('button', p).setAttribute('aria-label', $('.iv-pl', p).textContent + ': ' + vis + (vis === 1 ? ' immobile' : ' immobili'));
      });
      closePins();
      grid.hidden = view !== 'grid';
      if (map) map.hidden = view !== 'map';
      if (empty) empty.hidden = n > 0;
      if (live) live.textContent = n + (n === 1 ? ' immobile' : ' immobili') + (cur === 'tutti' ? '' : ' ' + LAB[cur]) + (view === 'map' ? ', vista mappa' : '');
    }
    fs.forEach(function (b) {
      b.addEventListener('click', function () {
        cur = b.dataset.f;
        fs.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        b.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        apply();
      });
    });
    $$('.iv-view button').forEach(function (b) {
      b.addEventListener('click', function () {
        view = b.dataset.v;
        $$('.iv-view button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        apply();
      });
    });
    pins.forEach(function (p) {
      var btn = $('button', p), pop = $('.iv-pop', p);
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        closePins(p);
        btn.setAttribute('aria-expanded', open); pop.hidden = !open;
      });
      p.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
    });
    d.addEventListener('click', function (e) { if (!e.target.closest('.iv-pin')) closePins(); });
    apply();
  }

  /* ================= SCHEDA RESIDENZA ================= */
  var form = $('.rs-form');
  var hidU = form && form.querySelector('input[name=unita]'), chip = $('.rs-chip'), msg = $('#r-m');

  function setUnit(name) {
    if (!form) return;
    hidU.value = name || '';
    chip.hidden = !name;
    if (name) $('[data-rs-chip]', chip).textContent = name;
  }

  var ut = $('.rs-ut');
  if (ut) {
    var ub = $$('.rs-u', ut), up = $('.rs-up'), uname = $('[data-rs-name]', up), uph = $('.rs-up-pl .ph', up);
    ub.forEach(function (b) {
      b.addEventListener('click', function () {
        ub.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var name = 'Unità ' + b.dataset.u;
        function swap() {
          uname.textContent = name;
          if (uph) { var sp = $('span', uph); if (sp) sp.textContent = 'Planimetria ' + name + ' (immagine zoomabile + descrizione testuale)'; }
          up.classList.remove('is-swap');
        }
        if (reduce) swap(); else { up.classList.add('is-swap'); setTimeout(swap, 180); }
      });
    });
    var ask = $('[data-rs-ask]');
    if (ask) ask.addEventListener('click', function (e) {
      var name = uname.textContent;
      setUnit(name);
      if (msg && !msg.value.trim()) msg.value = 'Vorrei informazioni su ' + name + ' di Residenza Solarium.';
      e.preventDefault();
      var f = $('#form');
      f.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      setTimeout(function () { $('#r-n').focus({ preventScroll: true }); }, reduce ? 0 : 400);
    });
  }
  var clr = $('[data-rs-clear]');
  if (clr) clr.addEventListener('click', function () { setUnit(''); $('#r-n').focus(); });

  /* validazione dimostrativa: errori in testo sotto il campo + riepilogo con focus */
  if (form) {
    var box = $('.rs-err', form), ok = $('.rs-ok', form);
    var rules = [
      ['r-n', function (v) { return v.trim() ? '' : 'Scrivi il tuo nome.'; }],
      ['r-e', function (v) { return !v.trim() ? 'Scrivi la tua email.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Controlla l\'email: manca qualcosa (es. nome@dominio.it).'); }],
      ['r-t', function (v) { return v.replace(/\D/g, '').length >= 6 ? '' : 'Scrivi un numero di telefono valido.'; }],
      ['r-c', function (v, el) { return el.checked ? '' : 'Per inviare la richiesta serve il consenso privacy.'; }]
    ];
    function check(id, fn) {
      var el = d.getElementById(id), err = fn(el.value, el), fe = d.getElementById(id + '-e');
      el.setAttribute('aria-invalid', err ? 'true' : 'false');
      if (fe) fe.textContent = err;
      return err;
    }
    rules.forEach(function (r) {
      var el = d.getElementById(r[0]);
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'blur', function () { if (el.getAttribute('aria-invalid') === 'true') check(r[0], r[1]); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.textContent = '';
      var errs = rules.map(function (r) { return [r[0], check(r[0], r[1])]; }).filter(function (x) { return x[1]; });
      if (errs.length) {
        box.innerHTML = '<b>Controlla ' + (errs.length === 1 ? 'un campo' : errs.length + ' campi') + ':</b><ul>' + errs.map(function (x) { return '<li><a href="#' + x[0] + '">' + x[1] + '</a></li>'; }).join('') + '</ul>';
        box.hidden = false; box.focus();
        return;
      }
      box.hidden = true;
      ok.textContent = 'Richiesta inviata (simulazione wireframe). Ti risponde l\'impresa entro [tempi di risposta].';
    });
    box.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) { e.preventDefault(); d.getElementById(a.getAttribute('href').slice(1)).focus(); } });
  }
})();
