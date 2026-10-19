/* Wireframe Conti & Conti - sezioni dinamiche di Impresa e Lavora con noi.
   PROPOSTA, WAITING_FOR_APPROVAL. Caricare dopo wireframe.js e wf-dyn.js. */
(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  d.documentElement.classList.add('js-dx');

  /* ---- linea che si riempie con lo scorrimento (timeline Impresa, passi Lavora con noi) ---- */
  var lines = $$('[data-im-tl], [data-lv-steps]');
  function paint() {
    var vh = w.innerHeight;
    lines.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var p = clamp((vh * 0.75 - r.top) / Math.max(r.height + vh * 0.25, 1), 0, 1);
      el.style.setProperty('--p', p.toFixed(3));
      var vertical = getComputedStyle(el).getPropertyValue('padding-left') !== '0px';
      $$('li', el).forEach(function (li) {
        var at = vertical ? (li.offsetTop + 8) / el.offsetHeight : li.offsetLeft / el.offsetWidth;
        li.classList.toggle('is-on', p >= at - 0.001 && p > 0);
      });
    });
  }
  if (lines.length) {
    if (reduce) {
      lines.forEach(function (el) { el.style.setProperty('--p', 1); $$('li', el).forEach(function (li) { li.classList.add('is-on'); }); });
    } else {
      var tick = false;
      var req = function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; paint(); }); } };
      w.addEventListener('scroll', req, { passive: true });
      w.addEventListener('resize', req);
      paint();
    }
  }

  /* ---- mestieri Impresa: selettore a pulsanti ---- */
  $$('[data-im-job]').forEach(function (box) {
    var bs = $$('.im-job-l button', box);
    function sel(b) {
      bs.forEach(function (x) {
        var on = x === b, p = d.getElementById(x.getAttribute('aria-controls'));
        x.setAttribute('aria-pressed', on);
        p.hidden = !on;
        p.classList.toggle('is-in', on && !reduce);
      });
    }
    bs.forEach(function (b) { b.addEventListener('click', function () { sel(b); }); });
    sel(bs.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || bs[0]);
  });

  /* ---- accordion condiviso: avvolge il contenuto in un div per l'animazione a griglia ---- */
  function acc(btn, single, group) {
    var p = d.getElementById(btn.getAttribute('aria-controls'));
    var wrap = d.createElement('div');
    while (p.firstChild) wrap.appendChild(p.firstChild);
    p.appendChild(wrap);
    function set(on) { btn.setAttribute('aria-expanded', on); p.classList.toggle('is-open', on); }
    btn._set = set;
    set(btn.getAttribute('aria-expanded') === 'true');
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-expanded') !== 'true';
      if (on && single) group.forEach(function (o) { if (o !== btn) o._set(false); });
      set(on);
    });
  }
  /* certificazioni: più schede aperte insieme, chiuse all'avvio */
  var cts = $$('[data-im-ct] button[aria-controls]');
  cts.forEach(function (b) { acc(b, false, cts); });

  /* ---- Lavora con noi: ruoli filtrabili ed espandibili ---- */
  var rs = $$('.lv-r button[aria-controls]');
  rs.forEach(function (b, i) { b.setAttribute('aria-expanded', i === 0); acc(b, true, rs); });
  var fbar = d.querySelector('.lv-f');
  if (fbar) {
    var items = $$('.lv-r > li'), cnt = fbar.querySelector('.lv-cnt'), fs = $$('[data-lv-f]', fbar);
    fbar.hidden = false;
    fs.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.lvF, n = 0;
        fs.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        items.forEach(function (it) { var on = k === 'tutti' || it.dataset.lv === k; it.hidden = !on; if (on) n++; });
        cnt.textContent = n === 1 ? '1 ruolo' : n + ' ruoli';
      });
    });
    cnt.textContent = items.length + ' ruoli';
  }

  /* ---- preselezione del ruolo nel modulo ---- */
  $$('[data-lv-role]').forEach(function (a) {
    a.addEventListener('click', function () {
      var s = d.getElementById('cv-r'); if (!s) return;
      s.value = a.dataset.lvRole;
      if (!reduce) { s.classList.remove('lv-hl'); void s.offsetWidth; s.classList.add('lv-hl'); }
      setTimeout(function () { s.focus({ preventScroll: true }); }, reduce ? 0 : 400);
    });
  });

  /* ---- modulo: validazione con riepilogo errori (invio simulato) ---- */
  $$('[data-lv-form]').forEach(function (f) {
    var box = f.querySelector('.lv-err'), ok = f.querySelector('.lv-ok');
    var file = f.querySelector('input[type=file]');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var errs = [];
      $$('[required]', f).forEach(function (el) {
        var bad = el.type === 'checkbox' ? !el.checked : !el.value.trim() || !el.checkValidity();
        el.setAttribute('aria-invalid', bad);
        if (bad) errs.push([el.id, f.querySelector('label[for="' + el.id + '"]').firstChild.textContent.replace(/\s*\*.*$/, '').trim()]);
      });
      if (file && file.files[0] && file.files[0].size > 5 * 1024 * 1024) { file.setAttribute('aria-invalid', true); errs.push([file.id, 'Curriculum oltre 5 MB']); }
      else if (file) file.removeAttribute('aria-invalid');
      ok.textContent = '';
      if (errs.length) {
        box.innerHTML = '<strong>Controlla ' + (errs.length === 1 ? 'questo campo' : 'questi ' + errs.length + ' campi') + ':</strong><ul>' +
          errs.map(function (x) { return '<li><a href="#' + x[0] + '">' + x[1] + '</a></li>'; }).join('') + '</ul>';
        box.hidden = false; box.focus();
      } else {
        box.hidden = true;
        ok.textContent = 'Candidatura pronta per l\'invio (simulato nel wireframe).';
      }
    });
    if (box) box.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      e.preventDefault(); var t = d.getElementById(a.getAttribute('href').slice(1)); if (t) t.focus();
    });
  });
})();
