/* Home A, telefono (istruzione 79): ruolo scelto di default nella squadra, nomi sotto i ruoli, contatore del carosello */
(function () {
  var mq = matchMedia('(max-width:900px)');
  var T = document.getElementById('team');
  if (T) {
    var f = T.querySelector('.tw-f'), bs = [].slice.call(T.querySelectorAll('.tw-roles button')), roles = T.querySelector('.tw-roles');
    var names = document.createElement('p'); names.className = 'tw-names'; names.setAttribute('aria-live', 'polite'); roles.after(names);
    var busy = false;
    var upd = function () {
      if (busy) return; busy = true;
      var on = T.querySelector('.tw-roles button.on');
      if (mq.matches && !on && bs[0]) { bs[0].click(); on = T.querySelector('.tw-roles button.on'); }
      f.dataset.n = on ? f.querySelectorAll('.tw-p.hit').length : 0;
      names.textContent = on ? ((on.querySelector('small') || {}).textContent || '') : '';
      if (on && mq.matches) roles.scrollTo({ left: on.parentNode.offsetLeft - 16, behavior: 'smooth' });
      busy = false;
    };
    new MutationObserver(function () { setTimeout(upd, 0); }).observe(roles, { subtree: true, attributes: true, attributeFilter: ['class'] });
    if (mq.addEventListener) mq.addEventListener('change', upd);
    upd();
  }
  var P = document.getElementById('progetti');
  if (P) {
    var tr = P.querySelector('.pf-track'), num = P.querySelector('.pf-n b'), bar = P.querySelector('.pf-bar i'), n = tr.children.length;
    tr.addEventListener('scroll', function () {
      if (!mq.matches) return;
      var w = tr.children[0].getBoundingClientRect().width + 12, i = Math.min(n - 1, Math.max(0, Math.round(tr.scrollLeft / w)));
      if (num) num.textContent = '0' + (i + 1);
      if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / n).toFixed(3) + ')';
    }, { passive: true });
  }
})();
