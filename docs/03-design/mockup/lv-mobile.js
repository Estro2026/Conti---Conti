/* istruzione 99: Lavora con noi su telefono, "Ruolo di interesse" a pillole al posto del menu a tendina */
(function () {
  var mq = matchMedia('(max-width:900px)'), s = document.getElementById('cv-r');
  if (!s || !mq.matches) return;
  var g = document.createElement('div'); g.className = 'lv-obj'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', 'Ruolo di interesse');
  [].slice.call(s.options).forEach(function (o) {
    if (/^seleziona/i.test(o.text)) return;
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
/* Hero: i volti scorrono su due file in direzioni opposte, con riquadri di formato diverso */
(function () {
  var mq = matchMedia('(max-width:900px)'), ul = document.querySelector('.lv-faces');
  if (!ul || !mq.matches) return;
  var items = [].slice.call(ul.children), rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wrap = document.createElement('div'); wrap.className = 'lv-mq';
  [0, 1].forEach(function (r) {
    var row = document.createElement('div'); row.className = 'lv-mq-r r' + r; var tr = document.createElement('div'); tr.className = 'lv-mq-t';
    var mine = items.filter(function (_, i) { return i % 2 === r; });
    for (var k = 0; k < 2; k++) mine.forEach(function (li, i) { var c = li.cloneNode(true); c.className = 'lv-mq-i s' + ((i + r) % 3); if (k) c.setAttribute('aria-hidden', 'true'); tr.appendChild(c); });
    row.appendChild(tr); wrap.appendChild(row);
  });
  ul.after(wrap); ul.classList.add('lv-off'); if (rm) wrap.classList.add('still');
})();
