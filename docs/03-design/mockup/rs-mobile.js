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
