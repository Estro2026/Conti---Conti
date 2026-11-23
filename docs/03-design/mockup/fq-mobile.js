/* istruzione 97: FAQ su telefono, la pillola dell'argomento attivo viene portata in vista nella fila */
(function () {
  var mq = matchMedia('(max-width:900px)'), row = document.querySelector('.fq-nav .sv-pills');
  if (!row) return;
  function show() {
    if (!mq.matches) return;
    var c = row.querySelector('.is-cur'); if (!c) return;
    row.scrollTo({ left: Math.max(0, row.scrollLeft + c.getBoundingClientRect().left - row.getBoundingClientRect().left - 20), behavior: 'smooth' });
  }
  new MutationObserver(show).observe(row, { subtree: true, attributes: true, attributeFilter: ['class'] });
  row.addEventListener('click', function () { setTimeout(show, 120); });
})();
(function () {
  var i = document.getElementById('fq-q'), mq = matchMedia('(max-width:900px)');
  if (i && mq.matches) i.setAttribute('placeholder', 'Cerca una domanda');
})();
