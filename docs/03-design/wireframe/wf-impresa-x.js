/* Wireframe Conti & Conti - pagina Impresa, comportamenti della revisione UX/UI. PROPOSTA.
   Dopo wireframe.js e wf-dyn.js. Con "riduci movimento" restano contenuti e controlli, senza scroll animato. */
(function () {
  'use strict';
  var d = document, w = window;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
  function S() { return parseFloat(getComputedStyle($('.frame') || d.body).getPropertyValue('--stick')) || 0; }

  /* ingresso: tendine di foto, barra squadra, contatori */
  function once(els, fn, margin) {
    if (!('IntersectionObserver' in w) || reduce) { els.forEach(fn); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } });
    }, { rootMargin: margin || '0px 0px -12% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }
  once($$('.ix-hero-m, .ix-boss-m, .ix-tabs'), function (el) { el.classList.add('is-in'); });
  once($$('[data-ix-cnt]'), function (el) {
    var to = +el.dataset.ixCnt;
    if (reduce) { el.textContent = to; return; }
    el.style.minWidth = String(to).length + 'ch';
    var t0 = performance.now(), dur = to > 100 ? 900 : 1200;
    (function tick(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e);
      if (k < 1) requestAnimationFrame(tick);
    })(t0);
  });

  /* ciclo di scroll */
  var jobs = [], ticking = false;
  function run() { ticking = false; var vh = w.innerHeight, s = S(); jobs.forEach(function (f) { f(vh, s); }); }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(run); } }
  w.addEventListener('scroll', req, { passive: true });
  w.addEventListener('resize', req);

  /* indice capitoli: capitolo attivo e avanzamento dentro ciascun capitolo */
  var nav = $('.ix-nav');
  if (nav) {
    var links = $$('a', nav), chs = links.map(function (a) { return d.getElementById(a.hash.slice(1)).closest('section'); });
    jobs.push(function (vh, s) {
      var line = s + nav.offsetHeight + vh * .25, cur = -1;
      chs.forEach(function (sec, i) {
        var r = sec.getBoundingClientRect();
        if (r.top <= line) cur = i;
        var p = clamp((line - r.top) / Math.max(1, r.height), 0, 1);
        links[i].querySelector('i').style.setProperty('--np', p.toFixed(3));
      });
      links.forEach(function (a, i) { if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    });
  }

  /* apertura: la foto si avvicina appena mentre si scorre */
  var hm = $('.ix-hero-m');
  if (hm && !reduce) jobs.push(function (vh) { var r = hm.getBoundingClientRect(); if (r.bottom > 0) hm.style.setProperty('--hz', clamp(-r.top / r.height, 0, 1).toFixed(3)); });

  /* storia: binario degli anni guidato dallo scroll, anno grande sullo sfondo */
  var tl = $('[data-ix-tl]');
  if (tl) {
    var st = $('.ix-tl-s', tl), rail = $('.ix-tl-r', tl), bar = $('.ix-tl-bar', tl), big = $('.ix-tl-big', tl), items = $$('li', rail), len = 0, pinned = false, last = -1;
    function measure() {
      pinned = !reduce && getComputedStyle(st).position === 'sticky';
      len = pinned ? Math.max(0, rail.scrollWidth - st.clientWidth + parseFloat(getComputedStyle(st).paddingLeft)) : 0;
      tl.style.setProperty('--len', len + 'px');
      tl.classList.toggle('is-pinned', pinned);
      if (!pinned) { rail.style.removeProperty('--x'); items.forEach(function (li) { li.classList.add('on'); }); }
    }
    measure(); w.addEventListener('resize', measure);
    jobs.push(function (vh, s) {
      if (!pinned) return;
      var r = tl.getBoundingClientRect(), span = tl.offsetHeight - (vh - s), p = span > 1 ? clamp((s - r.top) / span, 0, 1) : 0;
      rail.style.setProperty('--x', (p * len).toFixed(1));
      if (bar) bar.style.setProperty('--p', p.toFixed(3));
      var k = Math.min(items.length - 1, Math.floor(p * items.length));
      items.forEach(function (li, i) { li.classList.toggle('on', i <= k); });
      if (k !== last && big) { last = k; big.querySelector('span').textContent = items[k].querySelector('b').textContent; big.classList.remove('is-swap'); void big.offsetWidth; big.classList.add('is-swap'); }
    });
  }

  /* persone: barra di composizione = selettore del mestiere */
  $$('[data-ix-team]').forEach(function (box) {
    var bs = $$('.ix-tabs button', box);
    bs.forEach(function (b, i) { b.style.setProperty('--n', b.dataset.n); b.style.setProperty('--k', i); });
    function sel(b) {
      bs.forEach(function (x) {
        var on = x === b, a = d.getElementById(x.getAttribute('aria-controls'));
        x.setAttribute('aria-pressed', on);
        a.classList.toggle('is-on', on);
      });
    }
    bs.forEach(function (b) { b.addEventListener('click', function () { sel(b); }); });
    sel(bs.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || bs[0]);
  });

  /* massimo: parallasse leggera del ritratto */
  var bm = $('.ix-boss-m');
  if (bm && !reduce) jobs.push(function (vh) {
    var r = bm.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    bm.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * -.08).toFixed(1));
  });

  /* metodo: la carta sotto arretra mentre la successiva la copre */
  var stk = $$('[data-ix-stk] > li');
  if (stk.length && !reduce) jobs.push(function () {
    stk.forEach(function (li, i) {
      var nx = stk[i + 1];
      if (!nx || getComputedStyle(li).position !== 'sticky') { li.style.setProperty('--sh', 0); return; }
      var a = li.getBoundingClientRect(), b = nx.getBoundingClientRect();
      li.style.setProperty('--sh', clamp(1 - (b.top - a.top) / Math.max(1, a.height), 0, 1).toFixed(3));
    });
  });

  /* uffici: un ufficio sempre aperto; pannello con numero grande su desktop, accordion su mobile */
  $$('[data-ix-sv]').forEach(function (sv) {
    var bs = $$('.ix-sv-l button', sv), view = $('.ix-sv-v', sv), big = $('.ix-sv-big', sv), txt = $('.ix-sv-txt', sv), cur = null;
    function open(b) {
      if (b === cur) return; cur = b;
      bs.forEach(function (x) {
        var on = x === b; x.setAttribute('aria-expanded', on);
        d.getElementById(x.getAttribute('aria-controls')).classList.toggle('is-open', on);
      });
      var li = b.closest('li');
      big.textContent = $('.ix-sv-n', li).textContent;
      txt.innerHTML = '<h4></h4>' + d.getElementById(b.getAttribute('aria-controls')).innerHTML;
      $('h4', txt).textContent = b.textContent;
      if (!reduce) { view.classList.remove('is-swap'); void view.offsetWidth; view.classList.add('is-swap'); }
    }
    var hover = w.matchMedia('(hover: hover)').matches;
    bs.forEach(function (b) {
      b.addEventListener('click', function () { open(b); });
      b.addEventListener('focus', function () { if (getComputedStyle(view).display !== 'none') open(b); });
      if (hover) b.addEventListener('mouseenter', function () { if (getComputedStyle(view).display !== 'none') open(b); });
    });
    open(bs[0]);
  });

  /* garanzie: foto di sfondo che scorre più lenta */
  var gb = $('.ix-gar-bg');
  if (gb && !reduce) jobs.push(function (vh) { var r = gb.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; gb.style.setProperty('--gy', ((r.top + r.height / 2 - vh / 2) * -.12).toFixed(1)); });

  /* garanzie: schede che si aprono sul posto, marchio che segue il puntatore */
  $$('[data-ix-ct] button').forEach(function (b) {
    var p = d.getElementById(b.getAttribute('aria-controls')), badge = $('.ix-ct-b', b);
    b.addEventListener('click', function () { var on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on); p.classList.toggle('is-open', on); });
    if (reduce || !w.matchMedia('(hover: hover)').matches) return;
    b.addEventListener('mousemove', function (e) {
      var r = badge.getBoundingClientRect();
      badge.style.setProperty('--rx', clamp((e.clientX - r.left - r.width / 2) / 12, -10, 10).toFixed(1));
      badge.style.setProperty('--ry', clamp(-(e.clientY - r.top - r.height / 2) / 12, -10, 10).toFixed(1));
    });
    b.addEventListener('mouseleave', function () { badge.style.setProperty('--rx', 0); badge.style.setProperty('--ry', 0); });
  });

  req();
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { w.dispatchEvent(new Event('resize')); });
})();
