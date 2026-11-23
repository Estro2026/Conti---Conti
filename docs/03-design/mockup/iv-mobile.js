/* istruzione 94: su telefono, passando alla vista Mappa la sezione sale a tutta schermata */
(function () {
  var mq = matchMedia('(max-width:900px)');
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.iv-view [data-v="map"]');
    if (!b || !mq.matches) return;
    setTimeout(function () { var s = document.querySelector('.iv-list'); if (s) window.scrollTo({ top: s.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' }); }, 80);
  });
  document.addEventListener('click', function (e) {
    var li = e.target.closest && e.target.closest('.iv-map-s li'); if (!li || !mq.matches) return;
    var pin = document.querySelector('.iv-pin[data-loc="' + li.getAttribute('data-loc') + '"] button'); if (pin) pin.click();
    [].forEach.call(document.querySelectorAll('.iv-map-s li'), function (x) { x.classList.toggle('on', x === li); });
  });
})();
