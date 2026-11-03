/* Sezioni riprese dal mockup Home A (chat 2026-10-28): stessa logica di mockup/mockup-a3.js e mockup/home-a.html.
   - Dove operiamo: mappa Google con pin dalle coordinate, evidenza al passaggio, zoom sulla zona al clic.
   - In evidenza: card che scorrono in orizzontale mentre la sezione resta ferma. */
(function () {
  var d = document, fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- mappa ---------- */
  var gmap = d.getElementById('gmap'), mframe = d.getElementById('map-frame'), mpins = d.getElementById('map-pins'), mreset = d.getElementById('map-reset');
  if (gmap && mframe && mpins) {
    var pls = [].slice.call(d.querySelectorAll('.mk .pl')), btns = {}, WORLD = 256 * Math.pow(2, 9), C0 = { lat: 45.75, lon: 9.10 };
    var proj = function (lat, lon) {
      var x = (lon + 180) / 360 * WORLD, s = Math.sin(lat * Math.PI / 180), y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * WORLD;
      return { x: x, y: y };
    };
    var c0 = proj(C0.lat, C0.lon);
    var hl = function (key, on) {
      pls.forEach(function (x) { if (x.dataset.key === key) x.classList.toggle('hl', on); });
      if (btns[key]) btns[key].classList.toggle('hl', on);
    };
    var pick = function (b) {
      mframe.classList.add('is-zoom'); mreset.hidden = false;
      pls.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); });
      gmap.src = 'https://www.google.com/maps?output=embed&hl=it&z=' + b.dataset.z + '&q=' + encodeURIComponent(b.dataset.q);
    };
    pls.forEach(function (b) {
      var p = d.createElement('button'), name = b.querySelector('strong').textContent;
      p.type = 'button'; p.className = 'mp'; p.setAttribute('aria-label', name);
      p.innerHTML = '<i></i><b>' + name + '</b>';
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
    var layout = function () {
      var w = mframe.clientWidth, h = mframe.clientHeight;
      pls.forEach(function (b) {
        var q = proj(+b.dataset.lat, +b.dataset.lon), p = btns[b.dataset.key];
        p.style.left = (w / 2 + (q.x - c0.x)) + 'px'; p.style.top = (h / 2 + (q.y - c0.y)) + 'px';
      });
    };
    mreset.addEventListener('click', function () {
      mframe.classList.remove('is-zoom'); mreset.hidden = true;
      pls.forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      gmap.src = gmap.dataset.src;
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es, ob) { if (es[0].isIntersecting) { gmap.src = gmap.dataset.src; ob.disconnect(); } }, { rootMargin: '300px 0px' }).observe(gmap);
    } else gmap.src = gmap.dataset.src;
    layout(); addEventListener('resize', layout);
    if (window.ResizeObserver) new ResizeObserver(layout).observe(mframe);
  }

  /* ---------- progetti in evidenza ---------- */
  var P = d.querySelector('.mk #progetti');
  if (P) {
    var tr = P.querySelector('.pf-track'), bar = P.querySelector('.pf-bar i'), num = P.querySelector('.pf-n b'), cards = tr.children.length, mq = matchMedia('(max-width:860px)'), dist = 0;
    var tick = function () {
      if (mq.matches) return;
      var tbh = parseFloat(getComputedStyle(d.documentElement).getPropertyValue('--tbh')) || 0, r = P.getBoundingClientRect(), k = Math.min(1, Math.max(0, (tbh - r.top) / Math.max(1, dist)));
      tr.style.transform = 'translate3d(' + (-k * dist) + 'px,0,0)';
      bar.style.transform = 'scaleX(' + (.08 + .92 * k) + ')';
      num.textContent = '0' + Math.min(cards, 1 + Math.round(k * (cards - 1)));
    };
    var size = function () {
      if (mq.matches) { P.style.height = ''; tr.style.transform = ''; return; }
      dist = Math.max(0, tr.scrollWidth - P.clientWidth + parseFloat(getComputedStyle(tr).paddingLeft));
      P.style.height = (P.querySelector('.pf-sticky').offsetHeight + dist) + 'px'; tick();
    };
    addEventListener('resize', size); addEventListener('scroll', tick, { passive: true }); addEventListener('load', size); size();
  }
})();
