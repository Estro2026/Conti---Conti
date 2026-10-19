/* Wireframe Conti & Conti - comportamenti delle pagine di servizio (Blog, Articolo, FAQ, Contatti, Grazie).
   PROPOSTA. Va caricato dopo wireframe.js e wf-dyn.js. Senza JS i contenuti restano tutti visibili e i link funzionano. */
(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function plural(n, a, b) { return n + ' ' + (n === 1 ? a : b); }
  d.documentElement.classList.add('js-sv');
  function stickH() { return parseFloat(getComputedStyle($('.frame') || d.body).getPropertyValue('--stick')) || 0; }
  function copy(text, out, ok) {
    function done(m) { if (out) out.textContent = m; }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(ok); }, function () { done('Copia non riuscita: ' + text); });
    else done('Copia non disponibile: ' + text);
  }

  /* ================= BLOG: filtro per argomento + mostra altri ================= */
  var bg = $('.bl-grid');
  if (bg) {
    var its = $$('.bl-it', bg), pills = $$('.bl-f'), blLive = $('.bl-live'), blEmpty = $('.bl-empty'), more = $('.bl-more button');
    var PAGE = +bg.dataset.page || 6, shown = PAGE, cur = 'tutti';
    pills.forEach(function (b) {
      var k = b.dataset.f, n = k === 'tutti' ? its.length : its.filter(function (i) { return i.dataset.tp.split(' ').indexOf(k) > -1; }).length;
      var s = $('small', b); if (s) s.textContent = n;
    });
    function apply(anim) {
      var m = its.filter(function (i) { return cur === 'tutti' || i.dataset.tp.split(' ').indexOf(cur) > -1; });
      its.forEach(function (it) {
        var on = m.indexOf(it) > -1 && m.indexOf(it) < shown;
        if (!anim || reduce) { it.hidden = !on; return; }
        if (on && it.hidden) { it.hidden = false; it.classList.add('is-out'); requestAnimationFrame(function () { requestAnimationFrame(function () { it.classList.remove('is-out'); }); }); }
        else if (!on && !it.hidden) { it.classList.add('is-out'); setTimeout(function () { if (it.classList.contains('is-out')) { it.hidden = true; it.classList.remove('is-out'); } }, 350); }
      });
      if (blEmpty) blEmpty.hidden = m.length > 0;
      if (more) more.parentNode.hidden = m.length <= shown;
      var b = pills.filter(function (x) { return x.dataset.f === cur; })[0];
      if (blLive) blLive.textContent = plural(Math.min(m.length, shown), 'articolo', 'articoli') + (cur === 'tutti' ? '' : ' in ' + b.dataset.name) + (m.length > shown ? ' su ' + m.length : '');
    }
    pills.forEach(function (b) {
      b.addEventListener('click', function () {
        cur = b.dataset.f; shown = PAGE;
        pills.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        apply(true);
        history.replaceState(null, '', cur === 'tutti' ? location.pathname : '#' + cur);
      });
    });
    if (more) more.addEventListener('click', function () {
      var vis = its.filter(function (i) { return !i.hidden; }).length;
      shown += PAGE; apply(true);
      var next = its.filter(function (i) { return !i.hidden; })[vis];
      if (next) { var a = $('a', next); if (a) a.focus({ preventScroll: true }); }
    });
    var h0 = location.hash.slice(1), hb = pills.filter(function (x) { return x.dataset.f === h0; })[0];
    if (hb) { cur = h0; pills.forEach(function (x) { x.setAttribute('aria-pressed', x === hb); }); }
    apply(false);
  }

  /* ================= ARTICOLO: avanzamento lettura, sommario attivo, condividi ================= */
  var art = $('.ar-txt');
  if (art) {
    var bar = $('.ar-prog'), heads = $$('h2[id]', art), links = $$('.ar-toc a'), toc = $('.ar-toc');
    var tick = false;
    function upd() {
      tick = false;
      var r = art.getBoundingClientRect(), vh = w.innerHeight, S = stickH();
      var p = Math.max(0, Math.min(1, (S + 40 - r.top) / Math.max(1, r.height - (vh - S) + 80)));
      if (bar) { bar.style.setProperty('--p', p.toFixed(3)); bar.setAttribute('aria-valuenow', Math.round(p * 100)); }
      var act = null;
      heads.forEach(function (h) { if (h.getBoundingClientRect().top - S - 120 <= 0) act = h.id; });
      links.forEach(function (a) { if (a.getAttribute('href') === '#' + act) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    function req() { if (!tick) { tick = true; requestAnimationFrame(upd); } }
    w.addEventListener('scroll', req, { passive: true });
    w.addEventListener('resize', req);
    upd();
    /* sommario: aperto da desktop, richiudibile su tablet e mobile */
    if (toc) {
      var mq = function () { var wide = ($('.frame') || d.body).clientWidth > 1040; if (wide) toc.open = true; toc.dataset.wide = wide; };
      mq(); w.addEventListener('resize', mq);
      $('summary', toc).addEventListener('click', function (e) { if (toc.dataset.wide === 'true') e.preventDefault(); });
      links.forEach(function (a) { a.addEventListener('click', function () { if (toc.dataset.wide !== 'true') toc.open = false; }); });
    }
    var st = $('.ar-st');
    $$('[data-share]').forEach(function (b) {
      var k = b.dataset.share;
      if (k === 'native' && !navigator.share) { b.hidden = true; return; }
      b.addEventListener('click', function () {
        var u = location.href.split('#')[0];
        if (k === 'copy') copy(u, st, 'Link copiato negli appunti');
        if (k === 'native') navigator.share({ title: d.title, url: u }).catch(function () {});
      });
    });
    var mail = $('[data-share-mail]');
    if (mail) mail.href = 'mailto:?subject=' + encodeURIComponent($('h1').textContent) + '&body=' + encodeURIComponent(location.href.split('#')[0]);
  }

  /* ================= FAQ: ricerca, indice, accordion con apertura morbida ================= */
  var fq = $('.fq-wrap');
  if (fq) {
    var q = $('#fq-q'), fqLive = $('.fq-live'), fqEmpty = $('.fq-empty'), clr = $('.fq-x'), groups = $$('.fq-g', fq), all = $('.fq-all');
    var items = $$('details', fq).map(function (dt) {
      var s = $('summary', dt), p = $('.fq-a p', dt);
      return { el: dt, s: s, p: p, s0: s.innerHTML, p0: p.innerHTML, txt: (s.textContent + ' ' + p.textContent) };
    });
    function norm(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function esc(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
    /* evidenzia solo nei nodi di testo, senza toccare i link */
    function mark(el, re) {
      $$('*', el).concat([el]).forEach(function (n) {
        Array.prototype.slice.call(n.childNodes).forEach(function (c) {
          if (c.nodeType !== 3 || !re.test(c.nodeValue)) return;
          re.lastIndex = 0;
          var f = d.createElement('span'); f.innerHTML = c.nodeValue.replace(/[&<>]/g, function (x) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[x]; }).replace(re, '<mark>$1</mark>');
          while (f.firstChild) n.insertBefore(f.firstChild, c);
          n.removeChild(c);
        });
      });
    }
    function counts() {
      $$('.fq-jump').forEach(function (a) {
        var g = $(a.getAttribute('href')), n = g ? $$('details:not([hidden])', g).length : 0;
        $('small', a).textContent = n; a.hidden = n === 0;
      });
      groups.forEach(function (g) { var n = $$('details:not([hidden])', g).length; g.hidden = n === 0; $('.fq-g-h span', g).textContent = plural(n, 'domanda', 'domande'); });
    }
    function search() {
      if (!q) return;
      var v = q.value.trim(), n = 0, words = norm(v).split(/\s+/).filter(function (x) { return x.length > 1; });
      items.forEach(function (it) {
        it.s.innerHTML = it.s0; it.p.innerHTML = it.p0;
        var t = norm(it.txt), on = words.every(function (x) { return t.indexOf(x) > -1; });
        it.el.hidden = !on; if (on) n++;
        if (on && v.length > 1) {
          var re = new RegExp('(' + v.split(/\s+/).filter(function (x) { return x.length > 1; }).map(esc).join('|') + ')', 'gi');
          mark(it.s, re); mark(it.p, re);
        }
      });
      if (clr) clr.hidden = !v;
      if (fqEmpty) fqEmpty.hidden = n > 0;
      counts();
      if (fqLive) fqLive.textContent = v.length > 1 ? (n ? plural(n, 'domanda trovata', 'domande trovate') + ' per "' + v + '"' : 'Nessuna domanda trovata per "' + v + '"') : plural(items.length, 'domanda', 'domande') + ' in ' + groups.length + ' argomenti';
    }
    if (q) {
    var deb; q.addEventListener('input', function () { clearTimeout(deb); deb = setTimeout(search, 150); });
    if (clr) clr.addEventListener('click', function () { q.value = ''; search(); q.focus(); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Escape' && q.value) { q.value = ''; search(); } });
    search();
    }

    /* apertura morbida: anima l'altezza della risposta; con riduci movimento resta il details nativo */
    items.forEach(function (it) {
      var a = $('.fq-a', it.el);
      it.s.addEventListener('click', function (e) {
        if (reduce || !a.animate) return;
        e.preventDefault();
        if (it.el.open) {
          var h = a.offsetHeight;
          a.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 280, easing: 'cubic-bezier(.2,.6,.2,1)' }).onfinish = function () { it.el.open = false; syncAll(); };
        } else {
          it.el.open = true; var h2 = a.offsetHeight;
          a.animate([{ height: '0px', opacity: 0 }, { height: h2 + 'px', opacity: 1 }], { duration: 350, easing: 'cubic-bezier(.2,.6,.2,1)' });
          syncAll();
        }
      });
      it.el.addEventListener('toggle', syncAll);
    });
    function syncAll() {
      if (!all) return;
      var vis = items.filter(function (i) { return !i.el.hidden; }), open = vis.length && vis.every(function (i) { return i.el.open; });
      all.textContent = open ? 'Chiudi tutte' : 'Apri tutte'; all.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (all) all.addEventListener('click', function () {
      var open = all.getAttribute('aria-expanded') !== 'true';
      items.forEach(function (i) { if (!i.el.hidden) i.el.open = open; });
      syncAll();
    });
    syncAll();
    /* indice: salta al gruppo e mette il focus sul titolo */
    $$('.fq-jump').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var g = $(a.getAttribute('href')); if (!g) return;
        e.preventDefault();
        g.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        var h = $('h2', g); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
      });
    });
  }

  /* ================= CONTATTI: modulo a un solo passo ================= */
  var form = $('.co-form');
  if (form) {
    var err = $('.co-err'), status = $('.co-status');
    var msgs = {
      'c-n': 'Nome: scrivi come ti chiami',
      'c-e': 'Email: inserisci un indirizzo valido, per esempio nome@dominio.it',
      'c-t': 'Telefono: inserisci un numero a cui richiamarti',
      'c-c': 'Privacy: serve il consenso per poterti rispondere'
    };
    function check(f) {
      var bad = false;
      if (f.type === 'checkbox') bad = !f.checked;
      else if (f.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim());
      else bad = !f.value.trim();
      var eid = f.id + '-err', e = d.getElementById(eid), desc = (f.getAttribute('aria-describedby') || '').split(' ').filter(function (x) { return x && x !== eid; });
      if (bad) {
        if (!e) { e = d.createElement('span'); e.className = 'err'; e.id = eid; f.parentNode.appendChild(e); }
        e.textContent = msgs[f.id].split(': ')[1].replace(/^./, function (ch) { return ch.toUpperCase(); });
        f.setAttribute('aria-invalid', 'true'); desc.unshift(eid);
      } else { if (e) e.remove(); f.removeAttribute('aria-invalid'); }
      if (desc.length) f.setAttribute('aria-describedby', desc.join(' ')); else f.removeAttribute('aria-describedby');
      return !bad;
    }
    function validate() {
      var bad = $$('[required]', form).filter(function (f) { return !check(f); });
      if (!bad.length) { err.hidden = true; return true; }
      err.hidden = false;
      $('strong', err).textContent = bad.length === 1 ? 'Controlla 1 campo:' : 'Controlla ' + bad.length + ' campi:';
      $('ul', err).innerHTML = bad.map(function (f) { return '<li><a href="#' + f.id + '">' + msgs[f.id] + '</a></li>'; }).join('');
      err.focus();
      return false;
    }
    err.addEventListener('click', function (e) { var a = e.target.closest('a'); if (!a) return; e.preventDefault(); var f = d.getElementById(a.getAttribute('href').slice(1)); if (f) f.focus(); });
    $$('[required]', form).forEach(function (f) { f.addEventListener(f.type === 'checkbox' ? 'change' : 'blur', function () { if (f.hasAttribute('aria-invalid')) check(f); }); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      if (status) status.textContent = 'Richiesta pronta: nel sito si apre la pagina di conferma.';
      location.href = 'grazie.html?tipo=preventivo';
    });
  }

  /* zone operative: elenco e mappa sincronizzati */
  $$('[data-co-zn]').forEach(function (box) {
    var bs = $$('.co-zl button', box), ps = $$('.co-zp', box);
    function on(z) {
      bs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.z === z); });
      ps.forEach(function (p) { p.classList.toggle('is-on', p.dataset.z === z); });
    }
    bs.forEach(function (b) {
      b.addEventListener('click', function () { on(b.dataset.z); });
      b.addEventListener('mouseenter', function () { on(b.dataset.z); });
      b.addEventListener('focus', function () { on(b.dataset.z); });
    });
    ps.forEach(function (p) { p.addEventListener('mouseenter', function () { on(p.dataset.z); }); });
    on('mi');
  });

  /* aperto ora: calcolato dagli orari scritti nella tabella (ora di Roma) */
  var hrs = $('.co-hrs');
  if (hrs) {
    var now = new Date(), parts = {};
    try {
      new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now).forEach(function (p) { parts[p.type] = p.value; });
    } catch (x) { parts = { weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()], hour: now.getHours(), minute: now.getMinutes() }; }
    var wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday), mins = (+parts.hour % 24) * 60 + (+parts.minute);
    function toM(t) { var a = t.split(':'); return +a[0] * 60 + (+a[1] || 0); }
    var open = false, nextTxt = '';
    $$('tr[data-days]', hrs).forEach(function (tr) {
      var days = tr.dataset.days.split(',').map(Number), slots = (tr.dataset.slots || '').split(' ').filter(Boolean);
      if (days.indexOf(wd) < 0) return;
      tr.classList.add('is-today');
      slots.forEach(function (s) { var ab = s.split('-'), a = toM(ab[0]), b = toM(ab[1]); if (mins >= a && mins < b) { open = true; nextTxt = 'fino alle ' + ab[1]; } else if (!open && !nextTxt && mins < a) nextTxt = 'riapre alle ' + ab[0]; });
    });
    var ind = $('.co-open');
    if (ind) { ind.classList.toggle('is-on', open); $('span', ind).textContent = (open ? 'Aperto ora' : 'Chiuso ora') + (nextTxt ? ', ' + nextTxt : ''); ind.hidden = false; }
  }
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () { copy(b.dataset.copy, $(b.dataset.out), b.dataset.ok || 'Copiato'); });
  });
  /* mappa segnaposto: zoom a pulsanti (nel sito: immagine statica o mappa con consenso) */
  var map = $('.co-map');
  if (map) {
    var z = 1, zi = $('[data-zoom="in"]'), zo = $('[data-zoom="out"]');
    function zs() { map.style.setProperty('--z', z); zi.disabled = z >= 1.6; zo.disabled = z <= 1; }
    zi.addEventListener('click', function () { z = Math.min(1.6, z + .3); zs(); });
    zo.addEventListener('click', function () { z = Math.max(1, z - .3); zs(); });
    zs();
  }

  /* ================= GRAZIE: frase in base al modulo inviato ================= */
  var gz = $('[data-gz]');
  if (gz) {
    var t = new URLSearchParams(location.search).get('tipo');
    $$('[data-gz-t]').forEach(function (el) { el.hidden = el.dataset.gzT !== (['preventivo', 'immobile', 'candidatura'].indexOf(t) > -1 ? t : 'generico'); });
  }
})();
