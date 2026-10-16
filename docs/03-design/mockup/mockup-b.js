/* Conti & Conti - Mockup Home B: comportamenti specifici (si aggiunge a mockup.js) */
(function () {
  'use strict';
  var d = document, reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  /* le foto escono dalla parete: si aprono da destra con un taglio in prospettiva */
  var rel = $$('.work, .imm-cover, .post-img, .sale-media');
  rel.forEach(function (el) { el.classList.add('relief'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('shaped'); io.unobserve(e.target); } });
    }, { threshold: .25 });
    rel.forEach(function (el) { io.observe(el); });
  } else rel.forEach(function (el) { el.classList.add('shaped'); });

  /* squadra: le scene scorrono in prospettiva (posizione relativa a quella attiva) */
  var scs = $$('#team .scene');
  function place() {
    var cur = scs.findIndex(function (x) { return x.classList.contains('is-on'); });
    scs.forEach(function (x, k) { var ps = Math.max(-2, Math.min(2, k - cur)); x.setAttribute('data-pos', ps); x.style.setProperty('--pos', ps); });
  }
  if (scs.length) {
    place();
    var mo = new MutationObserver(place);
    scs.forEach(function (x) { mo.observe(x, { attributes: true, attributeFilter: ['class'] }); });
  }

  /* hero: la finestra nel muro si apre con lo scroll; dichiarazione: il disegno si traccia */
  var hero = d.getElementById('hero'), media = hero && $('.hero-media', hero);
  var st = d.getElementById('statement'), ticking = false;
  function frameFn() {
    ticking = false;
    var vh = window.innerHeight;
    if (hero && media && !hero.classList.contains('is-static')) {
      var r = hero.getBoundingClientRect(), span = hero.offsetHeight - vh;
      var p = span > 1 ? clamp(-r.top / span, 0, 1) : 0, k = clamp(p / .3, 0, 1);
      hero.style.setProperty('--o', (1 - Math.pow(1 - k, 3)).toFixed(3));
    } else if (media) { hero.style.setProperty('--o', 0); }
    if (st) {
      var sr = st.getBoundingClientRect();
      st.style.setProperty('--dp', clamp((vh * .85 - sr.top) / (sr.height * .9), 0, 1).toFixed(3));
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frameFn); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  frameFn();
})();
