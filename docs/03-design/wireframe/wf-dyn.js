/* Wireframe Conti & Conti - comportamenti delle sezioni dinamiche (Cantieri, Categoria, Progetto).
   PROPOSTA. Va caricato dopo wireframe.js. Con "riduci movimento" restano contenuti e controlli, senza animazioni di scroll. */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  root.classList.add('js-dx');
  var frame = $('.frame') || d.body;

  /* altezza delle barre fisse (toolbar wireframe + header): serve alle sezioni sticky */
  function stick() {
    var tb = $('.tb'), hd = $('.hd'), h = 0;
    if (tb && getComputedStyle(tb).position === 'sticky') h += tb.offsetHeight;
    if (hd && /sticky|fixed/.test(getComputedStyle(hd).position)) h += hd.offsetHeight;
    frame.style.setProperty('--stick', h + 'px');
    var cr = $('main > .crumb'); frame.style.setProperty('--crumb', (cr ? cr.offsetHeight : 0) + 'px');
    return h;
  }
  var S = stick();
  /* spazio visibile dell'apertura del progetto alla prima visualizzazione: altezza finestra meno tutto ciò che sta sopra (toolbar, header, breadcrumb) e meno la barra fissa mobile in basso */
  function vis() {
    var hero = $('.pj-hero'); if (!hero) return;
    var sb = $('.sticky-m'), sbH = sb && getComputedStyle(sb).display !== 'none' && /fixed|sticky/.test(getComputedStyle(sb).position) ? sb.offsetHeight : 0;
    var top = hero.getBoundingClientRect().top + w.scrollY;
    frame.style.setProperty('--vis', Math.max(200, w.innerHeight - sbH - top) + 'px');
  }
  vis(); w.addEventListener('resize', vis); w.addEventListener('load', vis);
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(vis);

  /* reveal all'ingresso */
  var rv = $$('[data-rv]');
  if ('IntersectionObserver' in w && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('is-in'); });

  /* ciclo di scroll condiviso */
  var jobs = [], ticking = false;
  function run() { ticking = false; var vh = w.innerHeight; jobs.forEach(function (f) { f(vh); }); }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(run); } }
  w.addEventListener('scroll', req, { passive: true });
  w.addEventListener('resize', function () { S = stick(); req(); });
  function prog(el, vh) { var r = el.getBoundingClientRect(), span = el.offsetHeight - (vh - S); return span > 1 ? clamp((S - r.top) / span, 0, 1) : 0; }

  /* ================= CANTIERI ================= */
  var grid = $('.cn-grid');
  if (grid) {
    var items = $$('.cn-it', grid), fs = $$('.cn-f'), cat = $('.cn-cat'), live = $('.cn-live'), empty = $('.cn-empty');
    function filter(k, push) {
      var n = 0;
      fs.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.f === k); });
      items.forEach(function (it) {
        var on = k === 'tutti' || it.dataset.cat === k;
        if (on) n++;
        if (reduce) { it.hidden = !on; return; }
        if (on && it.hidden) { it.hidden = false; it.classList.add('is-out'); requestAnimationFrame(function () { requestAnimationFrame(function () { it.classList.remove('is-out'); }); }); }
        else if (!on && !it.hidden) { it.classList.add('is-out'); setTimeout(function () { if (it.classList.contains('is-out')) it.hidden = true; }, 350); }
      });
      var b = fs.filter(function (x) { return x.dataset.f === k; })[0];
      if (cat) {
        if (k === 'tutti' || !b) cat.hidden = true;
        else {
          cat.hidden = false;
          $('.cn-cat-n', cat).textContent = b.dataset.name;
          $('p', cat).textContent = b.dataset.desc;
          var a = $('a', cat); a.href = b.dataset.href; $('span', a).textContent = 'Vai alla pagina ' + b.dataset.name;
          cat.classList.remove('is-swap'); void cat.offsetWidth; if (!reduce) cat.classList.add('is-swap');
        }
      }
      if (empty) empty.hidden = n > 0;
      if (live) live.textContent = n + (n === 1 ? ' progetto' : ' progetti') + (k === 'tutti' ? '' : ' in ' + b.dataset.name);
      if (push !== false) history.replaceState(null, '', k === 'tutti' ? location.pathname : '#' + k);
    }
    fs.forEach(function (b) { b.addEventListener('click', function () { filter(b.dataset.f); b.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }); });
    var h0 = location.hash.slice(1);
    filter(fs.some(function (b) { return b.dataset.f === h0; }) ? h0 : 'tutti', false);

    /* griglia / elenco */
    $$('.cn-view button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.cn-view button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        grid.classList.toggle('is-list', b.dataset.v === 'list');
      });
    });
    /* anteprima che segue il puntatore nella vista elenco (solo mouse) */
    var peek = $('.cn-peek');
    if (peek && w.matchMedia('(hover: hover)').matches && !reduce) {
      grid.addEventListener('mousemove', function (e) {
        var c = e.target.closest('.cn-c');
        if (!grid.classList.contains('is-list') || !c) { peek.classList.remove('on'); return; }
        var src = $('.ph', c);
        if (peek.dataset.k !== c.dataset.k) { peek.innerHTML = ''; peek.appendChild(src.cloneNode(true)); peek.dataset.k = c.dataset.k; }
        peek.style.left = e.clientX + 'px'; peek.style.top = e.clientY + 'px'; peek.classList.add('on');
      });
      grid.addEventListener('mouseleave', function () { peek.classList.remove('on'); });
    }
  }

  /* carosello trascinabile (Cantieri: in evidenza) */
  $$('[data-car]').forEach(function (car) {
    var tr = $('.dx-track', car), pv = $('[data-prev]', car), nx = $('[data-next]', car), pr = $('.dx-prog', car);
    function upd() {
      var max = tr.scrollWidth - tr.clientWidth, p = max > 0 ? tr.scrollLeft / max : 0;
      if (pr) pr.style.setProperty('--p', (.15 + p * .85).toFixed(3));
      if (pv) pv.disabled = tr.scrollLeft < 4;
      if (nx) nx.disabled = tr.scrollLeft > max - 4;
    }
    function step(dir) { var c = tr.firstElementChild; tr.scrollBy({ left: dir * (c.offsetWidth + 24), behavior: reduce ? 'auto' : 'smooth' }); }
    if (pv) pv.addEventListener('click', function () { step(-1); });
    if (nx) nx.addEventListener('click', function () { step(1); });
    tr.addEventListener('scroll', upd, { passive: true });
    /* trascinamento col mouse; a dito resta lo scroll nativo */
    var down = false, x0 = 0, s0 = 0, moved = false;
    tr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = tr.scrollLeft; });
    w.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - x0; if (Math.abs(dx) > 5) { moved = true; tr.classList.add('is-drag'); } tr.scrollLeft = s0 - dx; });
    w.addEventListener('pointerup', function () { if (!down) return; down = false; tr.classList.remove('is-drag'); });
    tr.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    tr.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
    upd();
  });

  /* ================= CATEGORIA ================= */
  var hm = $('.ct-hero-m');
  if (hm && !reduce) jobs.push(function (vh) {
    var r = hm.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    hm.style.setProperty('--py', ((r.top - S) * -.12).toFixed(1));
  });

  var pin = $('.ct-pin');
  if (pin) {
    var rail = $('.ct-rail', pin), sticky = $('.ct-pin-s', pin), bar = $('.ct-bar', pin), cnt = $('.ct-cnt b', pin), cards = $$('.ct-pc:not(.end)', pin);
    var len = 0;
    function measure() {
      var pinned = !reduce && getComputedStyle(sticky).position === 'sticky';
      pin.classList.remove('is-static');
      pinned = !reduce && getComputedStyle(sticky).position === 'sticky';
      /* scorrimento totale = contenuto oltre il bordo visibile + margine destro uguale a quello sinistro (l'ultima card, il link al portfolio, non resta tagliata) */
      var over = rail.scrollWidth - rail.clientWidth;
      len = pinned && over > 4 ? over + parseFloat(getComputedStyle(sticky).paddingLeft) : 0;
      if (pinned && len < 40) { pinned = false; len = 0; pin.classList.add('is-static'); }
      pin.style.setProperty('--len', pinned ? len + 'px' : '0px');
      if (!pinned) pin.style.removeProperty('--x');
      /* poche card (progetti + link al portfolio): se il binario non è bloccato stanno tutte nello schermo, senza scorrimento né card tagliate */
      var nAll = cards.length + 1;
      pin.style.setProperty('--n', nAll);
      pin.classList.toggle('fit', !pinned && nAll <= 5);
      return pinned;
    }
    var pinned = measure();
    w.addEventListener('resize', function () { pinned = measure(); });
    /* rimisura quando cambiano le dimensioni reali (font, immagini, zoom, altezza finestra), non solo al resize della finestra */
    w.addEventListener('load', function () { pinned = measure(); req(); });
    if (w.ResizeObserver) { var ro = new ResizeObserver(function () { pinned = measure(); req(); }); ro.observe(rail); }
    jobs.push(function (vh) {
      if (!pinned) return;
      var p = prog(pin, vh);
      rail.style.setProperty('--x', (p * len).toFixed(1));
      if (bar) bar.style.setProperty('--p', p.toFixed(3));
      if (cnt) cnt.textContent = ('0' + Math.min(cards.length, 1 + Math.floor(p * cards.length * .999))).slice(-2);
    });
  }

  var stack = $('.ct-stack');
  if (stack) {
    var lys = $$('.ct-ly', stack);
    lys.forEach(function (l, i) { l.style.setProperty('--sx', (i % 2 ? 1 : -1) * (6 + i * 4)); });
    if (reduce) lys.forEach(function (l) { l.style.setProperty('--o', 1); });
    else jobs.push(function (vh) {
      var r = stack.getBoundingClientRect();
      var o = clamp((vh * .85 - r.top) / (vh * .5), 0, 1);
      lys.forEach(function (l) { l.style.setProperty('--o', o.toFixed(3)); });
    });
  }
  $$('.ct-sim').forEach(function (sim) {
    var wave = $('.ct-wave', sim), note = $('p', sim);
    $$('button', sim).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('button', sim).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        wave.style.setProperty('--amp', b.dataset.amp);
        note.textContent = b.dataset.note;
      });
    });
  });

  /* ================= PROGETTO ================= */
  var ph = $('.pj-hero');
  if (ph && !reduce) jobs.push(function (vh) {
    var s = $('.pj-hero-s', ph);
    if (getComputedStyle(s).position !== 'sticky') { ph.style.setProperty('--k', 0); return; }
    var r = ph.getBoundingClientRect(), span = ph.offsetHeight - (vh - S);
    ph.style.setProperty('--k', clamp((S - r.top) / (span * .9), 0, 1).toFixed(3));
  });

  $$('.pj-ba').forEach(function (ba) {
    var inp = $('input', ba);
    function set() { ba.style.setProperty('--v', inp.value); }
    inp.addEventListener('input', set); set();
  });

  var tl = $('.pj-tl');
  if (tl) {
    var steps = $$('li', tl);
    function tlSet(p) { tl.style.setProperty('--p', p.toFixed(3)); steps.forEach(function (s, i) { s.classList.toggle('on', p >= (steps.length > 1 ? i / (steps.length - 1) : 0) - .001); }); }
    if (reduce) tlSet(1);
    else jobs.push(function (vh) { var r = tl.getBoundingClientRect(); tlSet(clamp((vh * .8 - r.top) / (vh * .55), 0, 1)); });
  }

  /* lightbox galleria: dialog nativo (focus intrappolato, Esc chiude), frecce da tastiera */
  var lb = $('.pj-lb');
  if (lb && lb.showModal) {
    var shots = $$('.pj-gal button'), cur = 0, fig = $('.pj-lb-f', lb), opener = null;
    function show(i) {
      cur = (i + shots.length) % shots.length;
      var src = $('.ph', shots[cur]).cloneNode(true);
      fig.innerHTML = ''; fig.appendChild(src);
      var cap = d.createElement('figcaption'); cap.textContent = (cur + 1) + ' / ' + shots.length + ' · ' + shots[cur].getAttribute('aria-label').replace(/^Apri /, '');
      fig.appendChild(cap);
    }
    shots.forEach(function (b, i) { b.addEventListener('click', function () { opener = b; show(i); lb.showModal(); }); });
    $('.pj-lb-x', lb).addEventListener('click', function () { lb.close(); });
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(cur - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('pj-lb-in')) lb.close(); });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
  }

  req();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { S = stick(); w.dispatchEvent(new Event('resize')); });
})();
