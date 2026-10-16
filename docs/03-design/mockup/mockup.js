/* Conti & Conti - Mockup Home A: interazioni
   Tutto degrada: senza JS la pagina resta leggibile; con movimento ridotto niente scroll-jacking ne animazioni; su touch gli hover diventano tocco. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var wide = window.matchMedia('(min-width: 1041px)');
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return [].slice.call((c || d).querySelectorAll(s)); }

  /* ---------- navbar: trasparente sulla hero, piena allo scroll; menu mobile ---------- */
  var nav = $('#nav'), burger = $('.nav-burger'), menu = $('#menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    menu.hidden = !open;
    d.body.classList.toggle('menu-open', open);
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); } });
    wide.addEventListener && wide.addEventListener('change', function () { if (wide.matches) setMenu(false); });
  }

  /* ---------- un solo ciclo di scroll per navbar, pattern, scrub, scena squadra, parallax ---------- */
  var statement = $('.scrub'), words = [];
  if (statement) {
    var txt = statement.textContent.trim().split(/\s+/);
    statement.setAttribute('aria-label', txt.join(' '));
    statement.innerHTML = txt.map(function (w) { return '<span class="w" aria-hidden="true">' + w + '</span>'; }).join(' ');
    words = $$('.w', statement);
  }
  var team = $('#team'), scenes = $$('.scene', team), steps = $$('.step', team), tabs = $$('.team-tabs button', team), countEl = $('#team-n');
  var cur = 0, N = scenes.length, pinned = false;
  function show(i, fromScroll) {
    if (i === cur && scenes[i].classList.contains('is-on')) return;
    cur = i;
    scenes.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
    steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
    tabs.forEach(function (t, k) { var on = k === i; t.classList.toggle('is-on', on); t.setAttribute('aria-pressed', on); });
    team.classList.toggle('is-office', scenes[i].classList.contains('scene-office'));
    if (countEl) countEl.textContent = '0' + (i + 1);
    $$('[data-for]', team).forEach(function (x) { x.classList.toggle('is-on', +x.dataset.for === i); });
  }
  $$('[data-for]', team).forEach(function (x) { x.classList.toggle('is-on', +x.dataset.for === 0); });
  function setPinned() { pinned = false; /* nessun blocco dello scroll: le scene si cambiano con schede e pin */ }
  setPinned();
  wide.addEventListener && wide.addEventListener('change', setPinned);
  function goTo(i) {
    if (pinned) {
      var top = team.getBoundingClientRect().top + window.scrollY;
      var span = team.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (i + .5) / N * span, behavior: reduce ? 'auto' : 'smooth' });
    } else show(i);
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { goTo(+t.dataset.i); }); });
  /* pin informativi sulla foto di gruppo: aprono una scheda sulla stessa foto; il pulsante porta alla scena di dettaglio */
  var pinsEl = $$('.pin', team);
  function closePins(except) { pinsEl.forEach(function (p) { if (p !== except) { p.classList.remove('open'); p.querySelector('.pin-dot').setAttribute('aria-expanded', 'false'); } }); }
  pinsEl.forEach(function (p) {
    var dot = p.querySelector('.pin-dot');
    dot.addEventListener('click', function (e) { e.stopPropagation(); var o = !p.classList.contains('open'); closePins(p); p.classList.toggle('open', o); dot.setAttribute('aria-expanded', o); });
    p.addEventListener('keydown', function (e) { if (e.key === 'Escape') { p.classList.remove('open'); dot.setAttribute('aria-expanded', 'false'); dot.focus(); } });
    var go = p.querySelector('.pc-go'); if (go) go.addEventListener('click', function () { closePins(); goTo(+go.dataset.go); });
  });
  d.addEventListener('click', function (e) { if (!e.target.closest('.pin')) closePins(); });

  /* valori: fisarmonica orizzontale (hover, focus, tocco) */
  var vxi = $$('.vx-i');
  vxi.forEach(function (li) {
    function on() { vxi.forEach(function (x) { x.classList.toggle('is-on', x === li); }); }
    li.addEventListener('mouseenter', function () { if (fine) on(); });
    li.addEventListener('focus', on);
    li.addEventListener('click', on);
  });

  var heroPoster = $('.hero-poster'), mx = 0, my = 0, ticking = false;
  var sale = $('.sale-media img'), pat = $('.bg-pattern');
  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    if (nav) { var hh = document.getElementById('hero'); nav.classList.toggle('is-solid', hh ? (hh.getBoundingClientRect().bottom <= 72 || (parseFloat(hh.style.getPropertyValue('--he')) || 0) > .85) : y > 40); }
    if (!reduce && pat) root.style.setProperty('--py', (-y * .07).toFixed(1) + 'px');
    if (words.length) {
      var r = statement.getBoundingClientRect();
      var p = clamp((vh * .9 - r.top) / (r.height * 1.1), 0, 1);
      var n = Math.round(p * words.length);
      words.forEach(function (w, k) { w.classList.toggle('on', k < n); });
    }
    if (pinned) {
      var tr = team.getBoundingClientRect(), span = team.offsetHeight - vh;
      var tp = clamp(-tr.top / span, 0, .9999);
      show(Math.min(N - 1, Math.floor(tp * N)), true);
    }
    if (sale && !reduce) {
      var sr = sale.parentNode.getBoundingClientRect();
      if (sr.bottom > 0 && sr.top < vh) sale.style.setProperty('--ty', ((sr.top + sr.height / 2 - vh / 2) * -.08).toFixed(1) + 'px');
    }
  }
  function req() { if (!ticking) { ticking = true; raf(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  req();

  /* ---------- reveal progressivo ---------- */
  var rv = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('in'); });


  /* ---------- dropdown Cantieri: apertura con tastiera e tocco ---------- */
  $$('.has-dd').forEach(function (li) {
    var a = li.firstElementChild;
    a.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); li.classList.add('open'); a.setAttribute('aria-expanded', true); var f = li.querySelector('.dd a'); f && f.focus(); } });
    li.addEventListener('keydown', function (e) { if (e.key === 'Escape') { li.classList.remove('open'); a.setAttribute('aria-expanded', false); a.focus(); } });
    li.addEventListener('mouseenter', function () { a.setAttribute('aria-expanded', true); });
    li.addEventListener('mouseleave', function () { a.setAttribute('aria-expanded', false); li.classList.remove('open'); });
  });


  /* ---------- mappa Google: vista completa con tutti i pin; hover evidenzia, selezione porta alla zona ---------- */
  var gmap = $('#gmap'), mframe = $('#map-frame'), mpins = $('#map-pins'), mreset = $('#map-reset');
  if (gmap && mframe && mpins) {
    var pls = $$('.pl'), btns = {}, WORLD = 256 * Math.pow(2, 9), C0 = { lat: 45.75, lon: 9.10 };
    function proj(lat, lon) {
      var x = (lon + 180) / 360 * WORLD, s = Math.sin(lat * Math.PI / 180), y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * WORLD;
      return { x: x, y: y };
    }
    var c0 = proj(C0.lat, C0.lon);
    pls.forEach(function (b) {
      var p = d.createElement('button');
      p.type = 'button'; p.className = 'mp'; p.setAttribute('aria-label', b.querySelector('strong').textContent);
      p.innerHTML = '<i></i><b>' + b.querySelector('strong').textContent + '</b>';
      mpins.appendChild(p); btns[b.dataset.key] = p;
      p.addEventListener('mouseenter', function () { hl(b.dataset.key, true); });
      p.addEventListener('mouseleave', function () { hl(b.dataset.key, false); });
      p.addEventListener('focus', function () { hl(b.dataset.key, true); });
      p.addEventListener('blur', function () { hl(b.dataset.key, false); });
      p.addEventListener('click', function () { pick(b); });
      b.addEventListener('mouseenter', function () { if (fine) hl(b.dataset.key, true); });
      b.addEventListener('mouseleave', function () { hl(b.dataset.key, false); });
      b.addEventListener('focus', function () { hl(b.dataset.key, true); });
      b.addEventListener('blur', function () { hl(b.dataset.key, false); });
      b.addEventListener('click', function () { pick(b); });
    });
    function hl(key, on) {
      pls.forEach(function (x) { if (x.dataset.key === key) x.classList.toggle('hl', on); });
      if (btns[key]) btns[key].classList.toggle('hl', on);
    }
    function layout() {
      var w = mframe.clientWidth, h = mframe.clientHeight;
      pls.forEach(function (b) {
        var q = proj(+b.dataset.lat, +b.dataset.lon), p = btns[b.dataset.key];
        p.style.left = (w / 2 + (q.x - c0.x)) + 'px'; p.style.top = (h / 2 + (q.y - c0.y)) + 'px';
      });
    }
    function mapUrl(q, z) { return 'https://www.google.com/maps?output=embed&hl=it&z=' + z + '&q=' + encodeURIComponent(q); }
    function pick(b) {
      mframe.classList.add('is-zoom'); mreset.hidden = false;
      pls.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
      gmap.src = mapUrl(b.dataset.q, b.dataset.z);
    }
    function overview() {
      mframe.classList.remove('is-zoom'); mreset.hidden = true;
      pls.forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      gmap.src = gmap.dataset.src;
    }
    mreset.addEventListener('click', overview);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, ob) { if (es[0].isIntersecting) { gmap.src = gmap.dataset.src; ob.disconnect(); } }, { rootMargin: '300px 0px' }).observe(gmap);
    } else gmap.src = gmap.dataset.src;
    layout(); window.addEventListener('resize', layout);
    if (window.ResizeObserver) new ResizeObserver(layout).observe(mframe);
  }
  /* ---------- immobili in vendita: scorrimento orizzontale con frecce ---------- */
  var track = $('#imm-track'), sp = $('#sale-prev'), sn = $('#sale-next');
  if (track && sp && sn) {
    function step() { return Math.max(260, track.clientWidth * .8); }
    function upd() { sp.disabled = track.scrollLeft < 8; sn.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; }
    sp.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    sn.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', function () { raf(upd); }, { passive: true });
    window.addEventListener('resize', upd); upd();
  }
  /* ---------- progetti: la foto segue appena il cursore ---------- */
  if (fine && !reduce) {
    $$('.work').forEach(function (w) {
      w.addEventListener('pointermove', function (e) {
        var r = w.getBoundingClientRect();
        w.style.setProperty('--mx', (((e.clientX - r.left) / r.width - .5) * -2).toFixed(2));
        w.style.setProperty('--my', (((e.clientY - r.top) / r.height - .5) * -2).toFixed(2));
      });
      w.addEventListener('pointerleave', function () { w.style.setProperty('--mx', 0); w.style.setProperty('--my', 0); });
    });
  }
})();

/* ---------- hero: il video si guida con lo scroll, si entra sempre piu in profondita nella casa ---------- */
(function () {
  'use strict';
  var d = document, hero = d.getElementById('hero'), vid = hero && hero.querySelector('.hero-video');
  if (!hero || !vid) return;
  /* si parte sempre dall'inizio: niente ripristino dello scroll al refresh */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {}, lean = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
  var fill = hero.querySelector('.hero-hud b'), cur = 0, tgt = 0, ready = false, inView = true, last = -1;
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  if (reduce || lean) { hero.classList.add('is-static'); return; }
  var small = window.matchMedia('(max-width: 720px)').matches;
  vid.src = (small ? vid.dataset.srcMobile : vid.dataset.srcDesktop);
  vid.addEventListener('loadeddata', function () { ready = true; vid.currentTime = 0.001; vid.classList.add('is-ready'); hero.classList.add('has-video'); });
  vid.addEventListener('error', function () { hero.classList.add('is-static'); });
  vid.load();
  function progress() {
    var r = hero.getBoundingClientRect(), span = hero.offsetHeight - window.innerHeight;
    return span > 1 ? clamp(-r.top / span, 0, 1) : 0;
  }
  function paint(p) {
    hero.style.setProperty('--ho', (1 - clamp((p - .02) / .1, 0, 1)).toFixed(3));
    var he0 = parseFloat(hero.dataset.he) || .9; hero.style.setProperty('--he', clamp((p - he0) / (1 - he0), 0, 1).toFixed(3));
    if (fill) fill.style.width = (p * 100).toFixed(1) + '%';
  }
  function tick() {
    var p = progress();
    paint(p);
    if (ready && vid.duration) {
      tgt = clamp(p / (parseFloat(hero.dataset.vend) || .86), 0, 1) * (vid.duration - .05); /* il video arriva all'ultimo fotogramma luminoso, poi il velo lo porta alla sezione successiva */
      var now = performance.now(), dt = Math.min(500, now - (tick.t || now)); tick.t = now;
      cur += (tgt - cur) * (1 - Math.exp(-dt / 110));
      if (Math.abs(cur - last) > .015) { vid.currentTime = cur; last = cur; }
    }
    if (inView) requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    var v = es[0].isIntersecting; if (v && !inView) { inView = true; requestAnimationFrame(tick); } else inView = v;
  }, { rootMargin: '200px 0px' }).observe(hero);
  requestAnimationFrame(tick);
})();
/* ---------- profondita: avanzamento di sezione per i livelli di sfondo ---------- */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var secs = Array.prototype.slice.call(document.querySelectorAll('.values,.trust')), t = false;
  function upd() {
    t = false; var vh = window.innerHeight;
    secs.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      s.style.setProperty('--sp', Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh + r.height) * 2)).toFixed(3));
    });
  }
  function req() { if (!t) { t = true; requestAnimationFrame(upd); } }
  window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req); req();
})();

/* ---------- hero: scrollando verso l'alto si torna subito all'inizio, senza ripercorrere il video ---------- */
(function () {
  'use strict';
  var hero = document.getElementById('hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var lastY = window.scrollY, busy = false, acc = 0;
  function top() { return hero.getBoundingClientRect().top + window.scrollY; }
  function glide(to) {
    var from = window.scrollY, t0 = performance.now(), dur = Math.min(1100, 450 + Math.abs(from - to) * .06);
    busy = true;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      window.scrollTo(0, from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step); else { busy = false; lastY = window.scrollY; acc = 0; }
    })(t0);
  }
  window.addEventListener('scroll', function () {
    if (busy || hero.classList.contains('is-static')) { lastY = window.scrollY; return; }
    var y = window.scrollY, t = top(), span = hero.offsetHeight - window.innerHeight;
    var d = y - lastY; lastY = y;
    if (d < 0 && y >= t + span - 4 && y < t + span + window.innerHeight * .5) {
      /* si rientra nella hero dal basso: si riparte subito dall'inizio, con testo e CTA */
      hero.classList.remove('is-reenter'); void hero.offsetWidth; hero.classList.add('is-reenter');
      window.scrollTo({ top: t, behavior: 'instant' }); lastY = window.scrollY; acc = 0;
    } else if (d < 0 && y > t + 8 && y < t + span - 4) { acc += -d; if (acc > 36) glide(t); }
    else if (d > 0) acc = 0;
  }, { passive: true });
})();
