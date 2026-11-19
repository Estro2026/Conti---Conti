/* Card degli articoli: titolo, data e immagine degli articoli reali del sito attuale (istruzione 62).
   La guida aperta in articolo.html resta la bozza editoriale, con immagine segnaposto. */
(function () {
  var A = window.MK_ART; if (!A || !A.length) return;
  var F = 'img/foto/';
  var pic = function (a, cls) { return '<img class="' + (cls || 'mk-img') + '" src="' + F + a.f + '.webp" alt="" loading="lazy" decoding="async">'; };
  var put = function (box, a) { /* sostituisce segnaposto o immagine dentro box */
    if (!box) return;
    var ph = box.querySelector('.mk-ph-art, [data-ph], .ph, img');
    if (!ph) return;
    if (ph.matches('[data-ph], .ph')) { ph.classList.add('ph', 'mk-has'); ph.removeAttribute('role'); ph.removeAttribute('aria-label'); ph.innerHTML = pic(a); }
    else ph.outerHTML = pic(a, 'mk-art-img');
  };
  var txt = function (el, s) { if (el) el.textContent = s; };
  /* Home A */
  [].forEach.call(document.querySelectorAll('#blog .bz-lead, #blog .bz-card'), function (c, i) {
    var a = A[i]; if (!a) return; put(c.querySelector('.bz-img'), a);
    txt(c.querySelector('h3'), a.t); txt(c.querySelector('.bz-c'), 'Notizie'); txt(c.querySelector('.bz-d'), a.d);
    var ex = c.querySelector('.bz-body > span:last-child:not(.bz-meta)'); if (ex && ex !== c.querySelector('.bz-meta')) ex.textContent = '';
  });
  /* Home B */
  [].forEach.call(document.querySelectorAll('#blog .bc'), function (c, i) {
    var a = A[i]; if (!a) return; put(c, a); txt(c.querySelector('h3'), a.t); txt(c.querySelector('.b-meta'), a.d);
    var p = c.querySelector('p'); if (p) p.textContent = '';
  });
  /* Blog: articolo in evidenza + elenco completo */
  var ev = document.getElementById('h-ev');
  if (ev) { var evs = ev.closest('section'); put(evs, A[0]); ev.textContent = A[0].t; var em = evs.querySelector('.meta'); if (em) em.textContent = A[0].d + ' · Notizie'; var ep = evs.querySelector('p:not(.meta):not(.dx-k)'); if (ep) ep.textContent = ''; }
  var grid = document.querySelector('.bl-it') && document.querySelector('.bl-it').parentElement;
  if (grid) {
    var tpl = grid.querySelector('.bl-it').outerHTML;
    grid.querySelectorAll('.bl-it').forEach(function (x) { x.remove(); });
    A.slice(1).forEach(function (a) {
      grid.insertAdjacentHTML('beforeend', tpl); var li = grid.lastElementChild;
      li.dataset.tp = 'notizie'; put(li, a); txt(li.querySelector('h3'), a.t); txt(li.querySelector('.meta'), a.d);
      txt(li.querySelector('.bl-tp'), 'Notizie'); var p = li.querySelector('p'); if (p) p.remove();
    });
  }
  /* Articolo: correlati */
  [].forEach.call(document.querySelectorAll('.ar-rc'), function (c, i) {
    var a = A[i]; if (!a) return; put(c, a); txt(c.querySelector('h3'), a.t); txt(c.querySelector('.meta'), a.d + ' · Notizie');
  });
})();
