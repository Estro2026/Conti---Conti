/* istruzione 84: Realizzazioni su telefono, "Vedi altri progetti" dopo 8 card per ogni categoria */
(function () {
  var mq = matchMedia('(max-width:900px)'), g = document.querySelector('.cn-grid'), bar = document.querySelector('.cn-bar-in');
  if (!g) return;
  var STEP = 8, shown = STEP;
  var box = document.createElement('div'); box.className = 'mk-more';
  var b = document.createElement('button'); b.type = 'button'; box.appendChild(b); g.after(box);
  function vis(li) { li.classList.remove('mk-more-off'); return getComputedStyle(li).display !== 'none'; }
  function upd() {
    var all = [].slice.call(g.children), v = all.filter(vis);
    if (!mq.matches) { box.hidden = true; return; }
    v.forEach(function (li, i) { li.classList.toggle('mk-more-off', i >= shown); });
    var rest = v.length - shown; box.hidden = rest <= 0;
    b.textContent = 'Vedi altri progetti (' + Math.max(rest, 0) + ')';
  }
  b.addEventListener('click', function () { shown += STEP; upd(); });
  document.addEventListener('click', function (e) {
    var f = e.target.closest && e.target.closest('.cn-f'); if (!f) return;
    shown = STEP; setTimeout(function () { upd(); if (bar && mq.matches) bar.scrollTo({ left: Math.max(0, bar.scrollLeft + f.getBoundingClientRect().left - bar.getBoundingClientRect().left - 20), behavior: 'smooth' }); }, 60);
  });
  if (mq.addEventListener) mq.addEventListener('change', upd);
  setTimeout(function () { upd(); if (bar) bar.scrollLeft = 0; }, 300);
})();
