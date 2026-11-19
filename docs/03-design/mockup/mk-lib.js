/* Mockup pagine interne: librerie della community verificate (istruzione Sara n. 38, vedi vendor/VERSIONI.md).
   Ogni libreria si carica solo nelle pagine che ne hanno bisogno. Con "riduci movimento" niente Lenis e niente parallasse.
   - img-comparison-slider: confronto cantiere / consegna (scheda progetto)
   - PhotoSwipe: galleria a tutto schermo (scheda progetto, residenza)
   - Leaflet: mappa "Dove operiamo" in stile del marchio al posto dell'incorporamento Google (contatti)
   - Embla: scorrimento a trascinamento dei progetti in evidenza su mobile
   - Lenis + GSAP ScrollTrigger: scorrimento morbido e leggera parallasse sulle foto grandi (tutte le pagine) */
(function () {
  var d = document, V = 'vendor/', RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var loaded = {};
  function css(h) { if (loaded[h]) return; loaded[h] = 1; var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = V + h; d.head.appendChild(l); }
  function js(s) {
    if (loaded[s]) return loaded[s];
    return (loaded[s] = new Promise(function (ok, ko) { var e = d.createElement('script'); e.src = V + s; e.onload = ok; e.onerror = ko; d.body.appendChild(e); }));
  }

  /* ---------- prima / dopo ---------- */
  /* prima/dopo: il materiale del cliente non ha due foto dallo stesso punto -> resta il segnaposto del wireframe (istruzione 60) */
  [].forEach(function (ba) {
    css('img-comparison-slider.css');
    js('img-comparison-slider.js').then(function () {
      var w = d.createElement('div'); w.className = 'mk-ba';
      w.innerHTML = '<img-comparison-slider class="mk-ba-s" value="50">' +
        '<img slot="first" src="img/foto/squadra-quattro-casseri.webp" alt="Lo stesso punto durante il cantiere">' +
        '<img slot="second" src="img/foto/villa-lugarna-facciata-loggia-balaustre.webp" alt="Lo stesso punto a lavori finiti">' +
        '<span slot="handle" class="mk-ba-h" aria-hidden="true"><i></i><i></i></span>' +
        '</img-comparison-slider><span class="mk-ba-l a" aria-hidden="true">Cantiere</span><span class="mk-ba-l b" aria-hidden="true">Consegna</span>';
      ba.replaceWith(w);
    });
  });

  /* ---------- galleria a tutto schermo ---------- */
  var gal = d.querySelectorAll('.g1,.g2,.g3,.g4,.g5,.g6');
  if (gal.length) {
    css('photoswipe.css');
    Promise.all([js('photoswipe.umd.min.js'), js('photoswipe-lightbox.umd.min.js')]).then(function () {
      var ph = function (t) { /* segnaposto: immagine SVG con la descrizione, finché non ci sono le foto */
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200"><rect width="100%" height="100%" fill="#2a2426"/><text x="50%" y="50%" fill="#c9c0b2" font-family="Inter,Arial" font-size="40" text-anchor="middle">' + t.replace(/[<&]/g, '') + '</text></svg>');
      };
      var items = [].map.call(gal, function (b) {
        var img = b.querySelector('img'), lab = (b.querySelector('[data-ph]') || {}).dataset;
        return img ? { src: img.src, width: 1600, height: 1067, alt: '' } : { src: ph(lab ? lab.ph.split('|')[0] : 'Foto'), width: 1600, height: 1200, alt: '' };
      });
      [].forEach.call(gal, function (b, i) {
        b.addEventListener('click', function (e) {
          e.preventDefault(); e.stopImmediatePropagation();
          new window.PhotoSwipe({ dataSource: items, index: i, bgOpacity: .94, showHideAnimationType: 'fade' }).init();
        }, true);
      });
    });
  }

  /* ---------- mappa Leaflet ---------- */
  var gm = d.getElementById('gmap'), mf = d.getElementById('map-frame');
  if (false && gm && mf) { /* istruzione 77: Dove operiamo identica alla Home A (mappa Google scura), niente Leaflet */
    gm.dataset.src = 'about:blank'; gm.removeAttribute('src'); gm.hidden = true;
    var pins = d.getElementById('map-pins'); if (pins) pins.hidden = true;
    css('leaflet.css');
    js('leaflet.js').then(function () {
      var L = window.L, el = d.createElement('div'); el.className = 'mk-leaflet'; mf.appendChild(el);
      var map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([45.75, 9.1], 9);
      /* mockup: tessere OpenStreetMap (uso leggero, con attribuzione). In produzione serve un fornitore di tessere con chiave (WAITING_FOR_APPROVAL). */
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var icon = function (on) { return L.divIcon({ className: 'mk-pin' + (on ? ' on' : ''), html: '<i></i>', iconSize: [22, 22], iconAnchor: [11, 11] }); };
      var mk = {}, pls = d.querySelectorAll('.mk .pl'), home = map.getBounds();
      pls.forEach(function (b) {
        var m = L.marker([+b.dataset.lat, +b.dataset.lon], { icon: icon(false), title: b.querySelector('strong').textContent, keyboard: true }).addTo(map);
        m.bindTooltip(b.querySelector('strong').textContent, { direction: 'top', offset: [0, -12] });
        mk[b.dataset.key] = m;
        m.on('click', function () { b.click(); });
      });
      var bounds = L.latLngBounds([].map.call(pls, function (b) { return [+b.dataset.lat, +b.dataset.lon]; }));
      map.fitBounds(bounds.pad(.25)); home = map.getBounds();
      d.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('.mk .pl');
        if (!b) return;
        e.stopImmediatePropagation();
        pls.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); mk[x.dataset.key].setIcon(icon(on)); });
        map.flyTo([+b.dataset.lat, +b.dataset.lon], Math.min(+b.dataset.z || 12, 14), { duration: RM ? 0 : .9 });
        var r = d.getElementById('map-reset'); if (r) r.hidden = false;
      }, true);
      var rs = d.getElementById('map-reset');
      if (rs) rs.addEventListener('click', function (e) {
        e.stopImmediatePropagation(); rs.hidden = true; map.flyToBounds(home, { duration: RM ? 0 : .9 });
        pls.forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); mk[x.dataset.key].setIcon(icon(false)); });
      }, true);
      pls.forEach(function (b) {
        b.addEventListener('mouseenter', function () { mk[b.dataset.key].openTooltip(); });
        b.addEventListener('mouseleave', function () { mk[b.dataset.key].closeTooltip(); });
      });
    });
  }

  /* ---------- progetti in evidenza: trascinamento su mobile ---------- */
  var tr = d.querySelector('.mk .pf-track'), mq = matchMedia('(max-width:860px)');
  if (tr && mq.matches) {
    js('embla-carousel.umd.js').then(function () {
      var vp = tr.parentNode; vp.classList.add('mk-embla');
      window.EmblaCarousel(vp, { align: 'start', dragFree: false, containScroll: 'trimSnaps' });
    });
  }

  /* ---------- scorrimento morbido + parallasse ---------- */
  if (!RM && !/nolenis/.test(location.search)) {
    css('lenis.css');
    Promise.all([js('lenis.min.js'), js('gsap.min.js')]).then(function () { return js('ScrollTrigger.min.js'); }).then(function () {
      var gsap = window.gsap; gsap.registerPlugin(window.ScrollTrigger);
      var lenis = new window.Lenis({ lerp: .11, anchors: true });
      lenis.on('scroll', window.ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
      d.querySelectorAll('.ph.mk-has .mk-img').forEach(function (im) {
        var box = im.parentNode; if (box.offsetHeight < 320) return;
        gsap.fromTo(im, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
  }
})();
