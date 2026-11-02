/* Servizio Retail: "Come lavoriamo qui".
   Scena a scorrimento (sticky): il passo attivo e le barre di avanzamento derivano dalla posizione reale di scroll.
   Elenco normale (filo che si riempie scorrendo) su tablet, mobile, schermi bassi, zoom alto e con riduci movimento.
   Nessuna libreria, nessun autoplay: si aggiorna solo sugli eventi scroll/resize. */
(function () {
  var sec = document.getElementById('svt-how');
  if (!sec) return;
  var stage = sec.querySelector('.svt-stage'), grid = sec.querySelector('.svt-grid');
  var head = sec.querySelector('.svt-how-t');
  var steps = [].slice.call(sec.querySelectorAll('.svt-steps > li'));
  var n = steps.length;
  var mqRM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqW = window.matchMedia('(min-width: 901px)');
  var pinned = false, rail = null, btns = [];

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function buildRail() {
    rail = document.createElement('ol');
    rail.className = 'svt-rail';
    steps.forEach(function (li, i) {
      var t = li.querySelector('h3').textContent;
      var item = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Vai al passo ' + (i + 1) + ': ' + t);
      b.innerHTML = '<b aria-hidden="true">0' + (i + 1) + '</b><span aria-hidden="true"></span>';
      b.lastChild.textContent = t;
      b.addEventListener('click', function () { goTo(i); });
      item.appendChild(b); rail.appendChild(item); btns.push(b);
    });
    head.appendChild(rail);
  }

  function stickTop() { return parseFloat(getComputedStyle(stage).top) || 0; }

  function goTo(i) {
    if (!pinned) return;
    var run = sec.offsetHeight - stage.offsetHeight;
    var top = sec.getBoundingClientRect().top + window.pageYOffset - stickTop() + run * ((i + .5) / n);
    window.scrollTo({ top: top, behavior: mqRM.matches ? 'auto' : 'smooth' });
  }

  /* prova la scena; se titolo, indice o passo non entrano interi nello schermo, torna all'elenco */
  function setMode() {
    var want = mqW.matches && !mqRM.matches;
    if (want) {
      sec.classList.add('is-pin');
      var avail = stage.clientHeight;
      var need = Math.max(grid.scrollHeight, head.scrollHeight, sec.querySelector('.svt-steps').scrollHeight);
      steps.forEach(function (li) { need = Math.max(need, li.scrollHeight); });
      if (need > avail - 8 || avail < 380) want = false;
    }
    if (!want) sec.classList.remove('is-pin');
    pinned = want;
    steps.forEach(function (li) { li.classList.remove('on', 'past'); li.style.removeProperty('--f'); });
    update();
  }

  function update() {
    var vh = window.innerHeight, r = sec.getBoundingClientRect(), i;
    if (pinned) {
      var run = sec.offsetHeight - stage.offsetHeight;
      var p = clamp((stickTop() - r.top) / run);
      var act = Math.min(n - 1, Math.floor(p * n));
      steps.forEach(function (li, k) {
        li.classList.toggle('on', k === act);
        li.classList.toggle('past', k < act);
        li.setAttribute('aria-hidden', k === act ? 'false' : 'true');
      });
      btns.forEach(function (b, k) {
        b.style.setProperty('--f', clamp(p * n - k).toFixed(3));
        if (k === act) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      stage.style.setProperty('--p', p.toFixed(3));
      var ol = sec.querySelector('.svt-steps'); ol.style.setProperty('--p', p.toFixed(3));
    } else {
      var line = vh * .68;
      steps.forEach(function (li) {
        li.removeAttribute('aria-hidden');
        var b = li.getBoundingClientRect();
        var f = mqRM.matches ? 1 : clamp((line - b.top - 12) / Math.max(b.height, 1));
        li.style.setProperty('--f', f.toFixed(3));
        li.classList.toggle('on', mqRM.matches || b.top < line);
      });
    }
  }

  buildRail();
  setMode();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', setMode);
  if (mqRM.addEventListener) { mqRM.addEventListener('change', setMode); mqW.addEventListener('change', setMode); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setMode);
  window.addEventListener('load', setMode);
})();

/* Apertura: avanzamento dello scroll nella prima schermata -> --k (stesso nome che usano le regole di Categoria in wf-a.css).
   Solo se il movimento e' consentito; aggiorna su scroll, senza animazioni automatiche. */
(function () {
  var h = document.querySelector('.ct-hero');
  if (!h || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function k() {
    var r = h.getBoundingClientRect(), v = Math.max(0, Math.min(1, -r.top / (r.height * .8)));
    h.style.setProperty('--k', v.toFixed(3));
  }
  window.addEventListener('scroll', k, { passive: true });
  window.addEventListener('resize', k);
  k();
})();

/* Prove: indice delle categorie + card grande, con precedente/successiva. Senza JS o con riduci movimento restano le quattro card in griglia. */
(function () {
  var box = document.querySelector('[data-svt-cats]');
  if (!box) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lis = Array.prototype.slice.call(box.querySelectorAll('.svt-tiles > li'));
  if (reduce || lis.length < 2) return;
  var side = document.createElement('div'), ul = document.createElement('ul'), nav = document.createElement('div'), cur = 0;
  side.className = 'svt-side'; ul.className = 'svt-idx'; nav.className = 'svt-nav';
  ul.setAttribute('role', 'list');
  var btns = lis.map(function (li, i) {
    var item = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.textContent = li.querySelector('h3').textContent;
    b.addEventListener('click', function () { show(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, true); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, true); }
    });
    item.appendChild(b); ul.appendChild(item); return b;
  });
  var prev = document.createElement('button'), next = document.createElement('button');
  prev.type = next.type = 'button';
  prev.className = 'svt-arr'; next.className = 'svt-arr next'; prev.innerHTML = next.innerHTML = '<i aria-hidden="true"></i>';
  prev.setAttribute('aria-label', 'Categoria precedente'); next.setAttribute('aria-label', 'Categoria successiva');
  prev.addEventListener('click', function () { show(cur - 1); });
  next.addEventListener('click', function () { show(cur + 1); });
  nav.appendChild(prev); nav.appendChild(next); side.appendChild(ul);
  /* frecce a destra del titolo, come Home A: gruppo [frecce][CTA] nella testata */
  var head = document.querySelector('.svt-head'), all = head && head.querySelector('.svt-all');
  if (head && all) { var grp = document.createElement('div'); grp.className = 'svt-ctrl'; head.appendChild(grp); grp.appendChild(nav); grp.appendChild(all); } else side.appendChild(nav);
  function show(i, focus) {
    cur = (i + lis.length) % lis.length;
    lis.forEach(function (li, k) { li.classList.toggle('is-on', k === cur); });
    btns.forEach(function (b, k) { if (k === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    if (focus) btns[cur].focus();
  }
  box.insertBefore(side, box.firstChild);
  box.classList.add('is-cat');
  show(0);

  /* Altezza della card in funzione della viewport: titolo, gruppo frecce/CTA, indice e card entro 100svh - --stick.
     --svt-ch = clamp(240, innerHeight - stick - (distanza dal bordo alto della sezione al bordo alto della card) - 16, larghezza * 3/4) */
  var sec = box.closest(".svt-works"), frame = document.querySelector(".frame"), card = lis[0].querySelector(".card-imm");
  function fit() {
    var vh = window.innerHeight, stick = parseFloat(getComputedStyle(frame).getPropertyValue("--stick")) || 144;
    box.style.removeProperty("--svt-ch");
    var on = box.querySelector(".svt-tiles > li.is-on .card-imm") || card;
    var top = on.getBoundingClientRect().top - sec.getBoundingClientRect().top;
    var idxH = side.getBoundingClientRect().height, cw = on.getBoundingClientRect().width;
    var h = Math.min(cw * 3 / 4, vh - stick - top - 16);
    h = Math.max(240, h, side.parentNode === box && getComputedStyle(box).gridTemplateColumns.split(" ").length > 1 ? idxH : 0);
    box.style.setProperty("--svt-ch", Math.round(h) + "px");
  }
  fit();
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
