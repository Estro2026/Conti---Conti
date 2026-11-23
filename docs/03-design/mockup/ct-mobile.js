/* istruzione 85-90: pagine categoria su telefono. Contatore 01 / NN su TUTTI i progetti della categoria (foto reale o segnaposto), avanza da solo, al tocco e con lo scorrimento; titolo senza animazione a lettere; categoria attiva in vista */
(function () {
  var mq = matchMedia('(max-width:900px)'), h = document.querySelector('.ct-hero');
  if (!h || !mq.matches) return;
  var H1 = document.getElementById('h1');
  if (H1 && H1.querySelector('.ct-w')) H1.textContent = H1.getAttribute('aria-label') || H1.textContent;
  var c = document.createElement('button'); c.type = 'button'; c.className = 'ct-mc'; c.setAttribute('aria-label', 'Progetto successivo'); c.innerHTML = '01 / 0' + (h.querySelectorAll('.ct-dk-c').length || 1) + ' <i></i>'; h.appendChild(c);
  setTimeout(function () {
    var D = window.MK_SCHEDE, slug = (location.hash || '').replace('#', '') || 'palestre', cs = slug === 'attivita-commerciali' ? 'commerciali' : slug;
    var m = h.querySelector('.ct-hero-m'); if (!m) return;
    var list = D && D.progetti ? Object.keys(D.progetti).filter(function (k) { return D.progetti[k].cs === cs; }) : [];
    list.sort(function (a, b) { return (D.progetti[b].hero ? 1 : 0) - (D.progetti[a].hero ? 1 : 0); });
    var box = document.createElement('div'); box.className = 'ct-ms'; box.setAttribute('aria-hidden', 'true');
    list.forEach(function (k) {
      var p = D.progetti[k], s = document.createElement('div'); s.className = 'ct-ms-s';
      if (p.hero) { var im = new Image(); im.src = 'img/foto/' + p.hero + '.webp'; im.alt = ''; im.decoding = 'async'; s.appendChild(im); }
      else { s.classList.add('no'); s.innerHTML = '<span>' + (p.nome || '') + '<small>Foto da chiedere al cliente</small></span>'; }
      box.appendChild(s);
    });
    var S = [].slice.call(box.children), n = S.length;
    if (n) { m.appendChild(box); h.classList.add('ct-m'); }
    var i = 0, t0 = Date.now(), DUR = 5000, rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show() { S.forEach(function (b, k) { b.classList.toggle('on', k === i); }); c.innerHTML = (i < 9 ? '0' : '') + (i + 1) + ' / ' + (n < 10 ? '0' : '') + n + ' <i></i>'; t0 = Date.now(); }
    function go(d) { if (n < 2) return; i = (i + d + n) % n; show(); }
    c.addEventListener('click', function () { go(1); });
    var x0 = null;
    h.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    h.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50 && !e.target.closest('.ct-nav2')) go(dx < 0 ? 1 : -1); }, { passive: true });
    if (n) show();
    if (!rm && n > 1) (function tick() { var p = Math.min(1, (Date.now() - t0) / DUR), bar = c.querySelector('i'); if (bar) bar.style.setProperty('--p', p.toFixed(3)); if (p >= 1) go(1); requestAnimationFrame(tick); })();
  }, 800);
  window.addEventListener('hashchange', function () { location.reload(); });
})();
