/* Rileva lo zoom del browser su desktop e lo espone come html[data-zoom] e --zoom, per le regole di scala (wf-scale.css).
   Su desktop lo zoom restringe la larghezza CSS della finestra: window.outerWidth / window.innerWidth ≈ zoom.
   Sui dispositivi touch non c'è zoom di pagina: data-zoom resta 1 e valgono le sole regole per larghezza.
   Fasce: 1 (fino a ~125%), 1.5 (~150%), 2 (~200%), 3 (~300%), 4 (~400% e oltre). */
(function () {
  var h = document.documentElement;
  function set() {
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var r = fine && window.outerWidth && window.innerWidth ? window.outerWidth / window.innerWidth : 1;
    if (!(r > 0) || !isFinite(r)) r = 1;
    var b = r < 1.35 ? 1 : r < 1.75 ? 1.5 : r < 2.5 ? 2 : r < 3.5 ? 3 : 4;
    if (h.getAttribute('data-zoom-lock')) return; /* uso nei test: html[data-zoom-lock] blocca il valore impostato a mano */
    h.setAttribute('data-zoom', String(b));
    h.style.setProperty('--zoom', r.toFixed(2));
  }
  set();
  window.addEventListener('resize', set);
})();
