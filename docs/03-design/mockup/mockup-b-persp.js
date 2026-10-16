/* Conti & Conti - Mockup Home B: rilievi che si costruiscono dalla parete (luce da in alto a sinistra) e fascia di edifici in prospettiva */
(function () {
  'use strict';
  var d = document, NS = 'http://www.w3.org/2000/svg', reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function el(name, attrs, parent) {
    var e = d.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }

  /* illuminazione: la forma e della stessa materia della parete, solo ombra e luce ne mostrano il volume */
  var uid = 0;
  function defs(svg, dark) {
    var id = 'rf' + (++uid), df = el('defs', {}, svg), f = el('filter', { id: id, x: '-8%', y: '-8%', width: '116%', height: '116%', 'color-interpolation-filters': 'sRGB' }, df);
    el('feGaussianBlur', { 'in': 'SourceAlpha', stdDeviation: dark ? 2.6 : 3.2, result: 'blur' }, f);
    el('feOffset', { 'in': 'blur', dx: 4, dy: 5, result: 'off' }, f);
    var ct = el('feComponentTransfer', { 'in': 'off', result: 'sh' }, f); el('feFuncA', { type: 'linear', slope: dark ? .55 : .2 }, ct);
    var dl = el('feDiffuseLighting', { 'in': 'blur', surfaceScale: 4, diffuseConstant: 1.0, 'lighting-color': '#fff', result: 'lit' }, f);
    el('feDistantLight', { azimuth: 225, elevation: 46 }, dl);
    el('feComposite', { 'in': 'lit', in2: 'SourceAlpha', operator: 'in', result: 'litA' }, f);
    var nt = el('feComponentTransfer', { 'in': 'litA', result: 'litN' }, f); ['feFuncR','feFuncG','feFuncB'].forEach(function (n) { el(n, { type: 'linear', slope: 1.36 }, nt); });
    el('feBlend', { 'in': 'SourceGraphic', in2: 'litN', mode: 'multiply', result: 'body' }, f);
    var sp = el('feSpecularLighting', { 'in': 'blur', surfaceScale: 6, specularConstant: dark ? .4 : .55, specularExponent: 20, 'lighting-color': '#fff', result: 'spec' }, f);
    el('feDistantLight', { azimuth: 225, elevation: 38 }, sp);
    el('feComposite', { 'in': 'spec', in2: 'SourceAlpha', operator: 'in', result: 'specA' }, f);
    el('feBlend', { 'in': 'specA', in2: 'body', mode: 'screen', result: 'lit2' }, f);
    var m = el('feMerge', {}, f); el('feMergeNode', { 'in': 'sh' }, m); el('feMergeNode', { 'in': 'lit2' }, m);
    return id;
  }
  function line(g, pts, i, w, close) {
    var dd = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L') + (close ? ' Z' : '');
    var p = el('path', { d: dd, 'class': 'rl', style: '--i:' + i + ';--w:' + w + 'px' }, g);
    return p;
  }

  var ART = {
    /* nastri ondulati che si allargano e si stringono */
    waves: function (g, W, H, side, host) {
      /* parametri per sezione: centro, ampiezza dell'onda, variazione dello spessore del fascio */
      var cy = parseFloat(host.getAttribute('data-c')) || .8, amp = parseFloat(host.getAttribute('data-amp')) || .06, va = parseFloat(host.getAttribute('data-var')) || .6;
      var K = 22, i, x, pts, gap = parseFloat(host.getAttribute('data-gap')) || 8, lw = parseFloat(host.getAttribute('data-w')) || 5.4;
      for (i = 0; i < K; i++) {
        pts = [];
        for (x = -40; x <= W + 40; x += 24) {
          var t = x / W, bundle = 1 + va * Math.sin(t * 4.2 + 1.2), c = H * cy + Math.sin(t * 3.1) * H * amp;
          pts.push([x, c + (i - K / 2) * gap * bundle]);
        }
        line(g, pts, K - 1 - i, lw).setAttribute('data-k', i);
      }
    },
    /* anelli concentrici: in alto e a sinistra l'anello scorre, da un'estremita si riempie e dall'altra si svuota */
    rings: function (g, W, H, side) {
      [[W * .16, H * .3, 8, 0], [W * .1, H * .74, 9, 0], [W * .34, H * .66, 6, 0]].forEach(function (c, n) {
        for (var j = 0; j < c[2]; j++) {
          var r = 34 + j * 15 + n * 6, pts = [], a, cx = (side === 'right' ? W - c[0] : c[0]);
          for (a = 0; a < 360; a += 4) pts.push([cx + Math.cos(a * Math.PI / 180) * r, c[1] + Math.sin(a * Math.PI / 180) * r]);
          var pth = line(g, pts, n * 10 + j, 5, true);
          if (c[3]) { pth.setAttribute('pathLength', 1); pth.classList.add('flow'); if (n % 2) pth.classList.add('rev'); pth.style.animationDelay = (-j * 1.7) + 's'; }
        }
      });
    },
    /* anelli concentrici solo nella parte alta, interi (non passano sotto le card) */
    ringsTop: function (g, W, H) {
      [[W * .8, H * .24, 7], [W * .64, H * .2, 5]].forEach(function (c, n) {
        for (var j = 0; j < c[2]; j++) {
          var r = 30 + j * 15 + n * 6, pts = [], a;
          for (a = 0; a <= 360; a += 6) pts.push([c[0] + Math.cos(a * Math.PI / 180) * r, c[1] + Math.sin(a * Math.PI / 180) * r]);
          line(g, pts, n * 8 + j, 5, true);
        }
      });
    },
    /* curve di livello attorno a un rilievo */
    topo: function (g, W, H) {
      var cx = W * .55, cy = H * .5, j, a;
      for (j = 0; j < 22; j++) {
        var pts = [], base = 26 + j * 17;
        for (a = 0; a <= 360; a += 5) {
          var r = base * (1 + .22 * Math.sin(a * Math.PI / 180 * 2 + j * .12) + .12 * Math.sin(a * Math.PI / 180 * 3 + 1.3) + .06 * Math.sin(a * Math.PI / 180 * 5));
          pts.push([cx + Math.cos(a * Math.PI / 180) * r * 1.35, cy + Math.sin(a * Math.PI / 180) * r * .92]);
        }
        line(g, pts, j, 4.6, true);
      }
    }
  };

  var arts = $$('.relief-art').map(function (host) {
    var type = host.getAttribute('data-art'), W = 1600, H = 900;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: type === 'waves' ? 'none' : 'xMidYMid slice', 'aria-hidden': 'true', focusable: 'false' }, host);
    var id = defs(svg, host.classList.contains('on-dark')), g = el('g', { filter: 'url(#' + id + ')' }, svg);
    (ART[type] || ART.waves)(g, W, H, host.getAttribute('data-side'), host);
    host.style.setProperty('--rp', reduce ? 1 : 0);
    return { host: host, mode: host.getAttribute('data-build') || 'scroll', section: host.closest('section'), vis: false };
  });

  /* costruzione: alla comparsa (hero) o guidata dallo scroll */
  var ticking = false;
  function ease(k) { return 1 - Math.pow(1 - k, 3); }
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    arts.forEach(function (a) {
      if (reduce || a.mode === 'load') return;
      var r = (a.section || a.host).getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      a.host.style.setProperty('--rp', clamp((vh * .92 - r.top) / (vh * .75 + r.height * .25), 0, 1).toFixed(3));
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', req, { passive: true }); window.addEventListener('resize', req);
  arts.forEach(function (a) {
    if (a.mode === 'load' && !reduce) {
      var t0 = null;
      (function step(now) {
        if (t0 === null) t0 = now + 350;
        var k = clamp((now - t0) / 3800, 0, 1);
        a.host.style.setProperty('--rp', ease(k).toFixed(3));
        if (k < 1) requestAnimationFrame(step);
      })(performance.now());
    }
  });
  update();

  /* il prospetto della dichiarazione e un rilievo: stessa luce e stessa materia delle altre forme */
  $$('.draft svg').forEach(function (svg) {
    var paths = $$('path', svg), g = el('g', { filter: 'url(#' + defs(svg, false) + ')' }, svg);
    paths.forEach(function (pth, k) { pth.style.setProperty('--i', k); g.appendChild(pth); });
    $$('text', svg).forEach(function (t) { t.parentNode.removeChild(t); });
  });

  /* fascia di edifici in prospettiva: le tavole si raddrizzano con lo scroll */
  var band = d.querySelector('.pband');
  if (band && !reduce) {
    var bt = false;
    function bupd() {
      bt = false;
      var r = band.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return;
      var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      band.style.setProperty('--pp', (1 - clamp(p * 1.7 - .25, 0, 1)).toFixed(3));
    }
    window.addEventListener('scroll', function () { if (!bt) { bt = true; requestAnimationFrame(bupd); } }, { passive: true });
    bupd();
  } else if (band) band.style.setProperty('--pp', 0);
/* garanzie: il bordo superiore segue la curva piu bassa delle onde del blog, cosi la forma non viene tagliata */
  function curveFollow(topId, nextId, keepPad) {
    var blog = d.getElementById(topId), tr = d.getElementById(nextId);
    if (!blog || !tr) return;
    var ls = $$('.relief-art path[data-k]', blog); if (!ls.length) return;
    var low = ls[ls.length - 1], m = low.getScreenCTM(); if (!m) return;
    if (!tr.dataset.pt) tr.dataset.pt = parseFloat(getComputedStyle(tr).paddingTop);
    tr.style.marginTop = '0px'; tr.style.clipPath = 'none';
    var br = blog.getBoundingClientRect(), L = low.getTotalLength(), pts = [], over = 0, k;
    for (k = 0; k <= 80; k++) {
      var q = low.getPointAtLength(L * k / 80), sp = new DOMPoint(q.x, q.y).matrixTransform(m);
      var ry = sp.y - br.bottom + 5; pts.push([sp.x - br.left, ry]); over = Math.max(over, -ry);
    }
    over = Math.ceil(over) + 2;
    tr.style.marginTop = (-over) + 'px';
    if (keepPad) tr.style.paddingTop = (+tr.dataset.pt + over) + 'px';
    var poly = pts.filter(function (p) { return p[0] >= -60 && p[0] <= br.width + 60; }).map(function (p) { return p[0].toFixed(1) + 'px ' + (p[1] + over).toFixed(1) + 'px'; });
    tr.style.clipPath = 'polygon(' + ['-60px ' + (pts[0][1] + over).toFixed(1) + 'px'].concat(poly, [(br.width + 60) + 'px ' + (pts[pts.length - 1][1] + over).toFixed(1) + 'px', '100% 100%', '0 100%']).join(',') + ')';
  }
  var ct = null;
  function curves() { curveFollow('blog', 'garanzie', true); curveFollow('statement', 'team', false); }
  window.addEventListener('resize', function () { clearTimeout(ct); ct = setTimeout(curves, 150); });
  window.addEventListener('load', curves);
  setTimeout(curves, 400);
})();
