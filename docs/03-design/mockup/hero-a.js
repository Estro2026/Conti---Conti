/* Conti e Conti · Hero video a scroll (vanilla JS, nessuna dipendenza).
   Il video avanza/indietreggia con lo scroll; a ogni frase lo scroll si ferma (snap) per la lettura. */
(function () {
  var CFG = {
    video: 'assets/hero-video.mp4',
    scrollLength: 9,     // schermate totali del percorso (desktop; mobile ×0.85)
    holdLength: 0.9,     // schermate di sosta su ogni frase
    smoothing: 260,      // ms di inseguimento video→scroll (più alto = più morbido)
    snap: 'mandatory',   // 'mandatory' = si ferma sempre su ogni frase; 'proximity' = più leggero
    fade: 0.45,          // secondi di video per dissolvenza frasi
    mobileMax: 1024
  };
  var hero = document.querySelector('[data-cch-hero]'); if (!hero) return;
  Object.keys(CFG).forEach(function (k) { var a = hero.getAttribute('data-' + k.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); })); if (a != null) CFG[k] = isNaN(+a) ? a : +a; });

  var $ = function (s, r) { return (r || hero).querySelector(s); };
  var v = $('.cch-hero__video'), intro = $('.cch-hero__intro'), hud = $('.cch-hud'), fill = $('.cch-hud b'), veil = $('.cch-veil'); var skip = $('.cch-skip');
  var cards = [].slice.call(hero.querySelectorAll('.cch-card'));
  var scrims = { l: $('.cch-scrim--l'), r: $('.cch-scrim--r') };
  var nav = document.querySelector('[data-cch-nav]');
  var stmt = document.querySelector('[data-cch-words]');
  var cl = function (n, a, b) { return Math.max(a, Math.min(b, n)); };
  var ease = function (x) { return x * x * (3 - 2 * x); };

  /* tornando verso l'alto dalle sezioni successive la hero riparte dall'inizio, non dal fotogramma finale */
  var lastY = window.pageYOffset, wasBelow = false;
  window.addEventListener('scroll', function () {
    var y = window.pageYOffset, r = hero.getBoundingClientRect(), below = r.bottom <= 0;
    if (wasBelow && !below && y < lastY) {
      document.documentElement.style.scrollSnapType = 'none';
      window.scrollTo({ top: Math.max(0, r.top + y), behavior: 'instant' });
      cur = 0; last = -1; if (ready) { try { v.currentTime = 0.001; } catch (e) {} }
    }
    wasBelow = below; lastY = y;
  }, { passive: true });

  /* salta la sequenza: porta alla sezione dopo la hero senza passare dalle soste (snap spento finche si resta nella hero) */
  if (skip) skip.addEventListener('click', function () {
    var next = document.getElementById('statement') || hero.nextElementSibling; if (!next) return;
    document.documentElement.style.scrollSnapType = 'none';
    var top = next.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    next.setAttribute('tabindex', '-1'); next.focus({ preventScroll: true });
  });

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var ready = false, cur = 0, last = -1, t0 = 0, kfKey = '', pts = [], vEndS = 0, S = 1, snapState = '', solid = null;

  v.addEventListener('loadeddata', function () { ready = true; v.currentTime = 0.001; v.classList.add('is-ready'); });
  // Caricato interamente in memoria: lo scrub indietro non aspetta la rete.
  fetch(CFG.video).then(function (r) { return r.blob(); }).then(function (b) { v.src = URL.createObjectURL(b); v.load(); })
    .catch(function () { v.src = CFG.video; v.load(); });

  if (stmt && !stmt.children.length) {
    stmt.innerHTML = stmt.textContent.trim().split(/\s+/).map(function (w) { return '<span>' + w + '</span>'; }).join('');
  }

  function build(vh, D, mob) {
    var H = Math.max(0, CFG.holdLength), tail = 0.6;
    var holds = cards.map(function (el) { return el.dataset.hold === 'end' ? D : +el.dataset.in + (+el.dataset.out - +el.dataset.in) * 0.45; });
    S = Math.max(CFG.scrollLength * (mob ? 0.85 : 1), tail + H * holds.length + 2);
    var key = [S, H, D, vh].join('|'); if (key === kfKey) return; kfKey = key;
    hero.style.height = ((S + 1) * vh) + 'px';
    var move = S - tail - H * holds.length, pos = 0, pt = 0, marks = [0]; pts = [[0, 0]];
    holds.forEach(function (ht) { pos += move * (ht - pt) / D; pts.push([pos, ht]); marks.push(pos + H / 2); pos += H; pts.push([pos, ht]); pt = ht; });
    pos += move * (D - pt) / D; pts.push([pos, D]); marks.push(pos, S + 1); vEndS = pos;
    [].forEach.call(hero.querySelectorAll('[data-snap]'), function (m) { m.remove(); });
    marks.forEach(function (s) { var m = document.createElement('div'); m.setAttribute('data-snap', '');
      m.style.cssText = 'position:absolute;left:0;width:1px;height:1px;pointer-events:none;scroll-snap-align:start;scroll-snap-stop:always;top:' + Math.round(s * vh) + 'px'; hero.appendChild(m); });
  }

  function loop(now) {
    requestAnimationFrame(loop);
    var vh = innerHeight, r = hero.getBoundingClientRect(), mob = innerWidth <= CFG.mobileMax;
    var D = (ready && v.duration ? v.duration : 11.04) - 0.05;
    build(vh, D, mob);
    var s = cl(-r.top / vh, 0, S), tgt = D;
    for (var i = 1; i < pts.length; i++) if (s <= pts[i][0]) { var a = pts[i - 1], b = pts[i]; tgt = b[0] > a[0] ? a[1] + (b[1] - a[1]) * (s - a[0]) / (b[0] - a[0]) : b[1]; break; }

    var lock = -r.top > -2 && -r.top < (S + 1) * vh - 2, snap = lock ? 'y ' + CFG.snap : 'none';
    if (snap !== snapState) { snapState = snap; document.documentElement.style.scrollSnapType = snap; }

    var dt = Math.min(200, now - (t0 || now)); t0 = now;
    cur += (tgt - cur) * (1 - Math.exp(-dt / Math.max(1, CFG.smoothing)));
    if (Math.abs(tgt - cur) < 0.004) cur = tgt;
    var t = cur;
    if (ready && !v.seeking && Math.abs(t - last) > 0.01) { v.currentTime = t; last = t; }

    var io = cl((t - 0.15) / 0.45, 0, 1);
    intro.style.opacity = (1 - io).toFixed(3); intro.style.transform = 'translateY(' + (-io * 24).toFixed(1) + 'px)'; intro.style.visibility = io >= 1 ? 'hidden' : 'visible';

    var sO = { l: 0, r: 0 }, finalO = 0;
    cards.forEach(function (el) {
      var o = ease(cl(Math.min((t - el.dataset.in) / CFG.fade, (el.dataset.out - t) / CFG.fade), 0, 1));
      var fin = el.dataset.hold === 'end';
      if (fin) { o *= 1 - ease(cl((s - vEndS) / 0.45, 0, 1)); finalO = o; }
      var side = el.dataset.side === 'r' ? 'r' : 'l', dir = mob ? 0 : (side === 'r' ? 1 : -1);
      el.style.opacity = o.toFixed(3); el.style.visibility = o > 0 ? 'visible' : 'hidden';
      el.style.transform = 'translate(' + ((1 - o) * dir * 16).toFixed(1) + 'px,' + (mob ? (1 - o) * 12 : 0).toFixed(1) + 'px)';
      sO[side] = Math.max(sO[side], o);
    });
    if (mob) sO.l = Math.max(sO.l, sO.r);
    scrims.l.style.opacity = sO.l.toFixed(3); scrims.r.style.opacity = sO.r.toFixed(3);

    var he = cl((s - vEndS - 0.3) / Math.max(0.1, S - vEndS - 0.3), 0, 1);
    veil.style.opacity = ease(he).toFixed(3);
    if (hud) hud.style.opacity = ((1 - he) * (1 - finalO)).toFixed(3);
    if (skip) { var so = (1 - he) * (1 - finalO); skip.style.opacity = so.toFixed(3); skip.style.pointerEvents = so > 0.4 ? 'auto' : 'none'; skip.style.setProperty('--p', cl(t / D, 0, 1).toFixed(3)); }
    if (fill) fill.style.width = (cl(t / D, 0, 1) * 100).toFixed(1) + '%';

    var sol = r.bottom <= 84 || he > 0.85;
    if (nav && sol !== solid) { solid = sol; nav.classList.toggle('is-solid', sol); }

    if (stmt) {
      var sr = stmt.getBoundingClientRect(), ws = stmt.children, k = Math.round(cl((vh * 0.9 - sr.top) / (sr.height * 1.1), 0, 1) * ws.length);
      for (var j = 0; j < ws.length; j++) ws[j].classList.toggle('is-on', j < k);
    }
  }
  requestAnimationFrame(loop);

  var burger = document.querySelector('[data-cch-burger]'), menu = document.querySelector('[data-cch-menu]');
  if (burger && menu) {
    var tog = function () { menu.classList.toggle('is-open'); };
    burger.addEventListener('click', tog);
    [].forEach.call(menu.querySelectorAll('a'), function (a) { a.addEventListener('click', tog); });
  }
})();
