/* istruzione 99: Contatti su telefono, il campo "Oggetto" diventa un gruppo di pillole (niente menu a tendina che esce dallo schermo); il select resta, sincronizzato */
(function () {
  var mq = matchMedia('(max-width:900px)'), s = document.getElementById('c-k');
  if (!s || !mq.matches) return;
  var g = document.createElement('div'); g.className = 'co-obj'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', 'Oggetto della richiesta');
  [].slice.call(s.options).forEach(function (o) {
    if (!o.value && o.text === 'Seleziona') return;
    var b = document.createElement('button'); b.type = 'button'; b.textContent = o.text; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      s.value = o.value || o.text; s.dispatchEvent(new Event('change', { bubbles: true })); s.dispatchEvent(new Event('input', { bubbles: true }));
      [].forEach.call(g.children, function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
    g.appendChild(b);
  });
  s.style.cssText = 'position:absolute;opacity:0;pointer-events:none;height:1px;width:1px'; s.setAttribute('tabindex', '-1'); s.setAttribute('aria-hidden', 'true');
  s.parentNode.appendChild(g);
})();
/* "Altro": compare un campo per scrivere l'oggetto */
(function () {
  var g = document.querySelector('.co-obj'); if (!g) return;
  var w = document.createElement('div'); w.className = 'co-altro'; w.hidden = true;
  w.innerHTML = '<label for="c-altro">Di cosa vuoi parlarci?</label><input id="c-altro" name="oggetto_altro" type="text" autocomplete="off" placeholder="Scrivi l\'oggetto della richiesta">';
  g.after(w);
  g.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var on = /^altro/i.test(b.textContent); w.hidden = !on;
    if (on) setTimeout(function () { w.querySelector('input').focus({ preventScroll: false }); }, 50);
  });
})();
