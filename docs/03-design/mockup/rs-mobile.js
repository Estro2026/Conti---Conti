/* istruzione 112: "Altri immobili" = gli altri immobili in vendita (mai quello della pagina), ognuno con il proprio collegamento */
(function () {
  var cur = window.MK_SLUG || decodeURIComponent(location.hash.slice(1)) || 'residenza-solarium';
  var L = [
    ['residenza-solarium', 'Residenza Solarium', 'In costruzione', 'Montesolaro, Carimate (CO) · 5 appartamenti', 'solarium-facciata-tramonto'],
    ['domus-54', 'Domus 54', '[Stato]', 'Seregno (MB) · 7 unità in 2 edifici · da 68 a 130 m²', 'domus-54-facciata-giardino-panoramica'],
    ['via-diaz', 'Via Diaz', 'In costruzione', 'Lentate sul Seveso (MB) · villette e appartamenti', ''],
    ['residenza-paradiso', 'Residenza Paradiso', '[Stato]', 'Via Tintoretto 6, Lentate sul Seveso (MB)', 'residenza-paradiso-render-esterno'],
    ['bdc-monza', 'BDC Monza', '[Stato]', 'Monza, via Sgambati', '']
  ].filter(function (x) { return x[0] !== cur; });
  var ul = document.querySelector('.sec.imm .grid.g3'); if (!ul) return;
  ul.innerHTML = L.map(function (x) {
    var ph = x[4] ? '<div class="ph mk-has" data-ph="Render ' + x[1] + '|4/3" style="aspect-ratio:4/3"><img class="mk-img" src="img/foto/' + x[4] + '.webp" alt="" loading="lazy" decoding="async"></div>' : '<div class="ph" data-ph="Render ' + x[1] + '|4/3" style="aspect-ratio:4/3"><span>Render ' + x[1] + '</span></div>';
    return '<li><a class="card card-imm" href="residenza.html#' + x[0] + '">' + ph + '<span class="ci-b"><span class="badge">' + x[2] + '</span><h3>' + x[1] + '</h3><span class="meta">' + x[3] + '</span><u>Scopri l\'immobile</u></span></a></li>';
  }).join('');
})();
/* istruzione 95: "Altri immobili" su telefono, contatore 01 / 03 e barra che seguono lo scorrimento del carosello */
(function () {
  var mq = matchMedia('(max-width:900px)'), tr = document.querySelector('.sec.imm .grid.g3');
  if (!tr) return;
  var n = tr.children.length, c = document.createElement('div'); c.className = 'rs-ctl'; c.setAttribute('aria-hidden', 'true');
  c.innerHTML = '<span class="rs-n"><b>01</b> / 0' + n + '</span><span class="bar"><i></i></span>';
  tr.after(c);
  var num = c.querySelector('b'), bar = c.querySelector('i');
  function upd() {
    if (!mq.matches) return;
    var w = tr.children[0].getBoundingClientRect().width + 12, i = Math.min(n - 1, Math.max(0, Math.round(tr.scrollLeft / w)));
    num.textContent = '0' + (i + 1); bar.style.transform = 'scaleX(' + ((i + 1) / n).toFixed(3) + ')';
  }
  tr.addEventListener('scroll', upd, { passive: true });
  function vis() { c.style.display = mq.matches ? '' : 'none'; } vis(); if (mq.addEventListener) mq.addEventListener('change', vis);
})();

/* istruzione 113: "Altri immobili" carosello anche su desktop, frecce centrate (come In vendita) */
(function () {
  var tr = document.querySelector('.sec.imm .grid.g3'); if (!tr || tr.dataset.mkCar) return; tr.dataset.mkCar = '1';
  var nav = document.createElement('div'); nav.className = 'rs-car-nav';
  nav.innerHTML = '<button type="button" class="dx-arr l" data-d="-1" aria-label="Immobili precedenti"></button><button type="button" class="dx-arr" data-d="1" aria-label="Immobili successivi"></button>';
  tr.after(nav);
  var p = nav.children[0], n = nav.children[1];
  function chk() { p.disabled = tr.scrollLeft < 4; n.disabled = tr.scrollLeft > tr.scrollWidth - tr.clientWidth - 4; nav.hidden = tr.scrollWidth <= tr.clientWidth + 4; }
  nav.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; var c = tr.firstElementChild; tr.scrollBy({ left: +b.dataset.d * (c.getBoundingClientRect().width + 20), behavior: 'smooth' }); });
  tr.addEventListener('scroll', chk, { passive: true }); addEventListener('resize', chk); setTimeout(chk, 300); chk();
})();
