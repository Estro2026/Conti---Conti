/* Realizzazioni (istruzione 68): costruisce la fila di copertine e la griglia con i progetti dell'elenco del cliente
   PRIMA degli script della pagina, così l'animazione "copertine che volano nella griglia" e le anteprime di testo
   lavorano sulle card vere. Va incluso subito dopo la griglia, dopo mk-schede-data.js. */
(function () {
  var D = window.MK_SCHEDE; if (!D) return;
  var F = 'img/foto/';
  var CATN = { case: 'Case', residenze: 'Residenze', lusso: 'Lusso', palestre: 'Palestre', allestimenti: 'Allestimenti', ville: 'Ville', commerciali: 'Attività commerciali', industriale: 'Industriale' };
  var ord = Object.keys(CATN);
  var keys = Object.keys(D.progetti).sort(function (a, b) {
    var pa = D.progetti[a], pb = D.progetti[b];
    return ((pb.hero ? 1 : 0) - (pa.hero ? 1 : 0)) || (ord.indexOf(pa.cs) - ord.indexOf(pb.cs));
  });
  var pic = function (f) { return f ? '<img class="mk-img" src="' + F + f + '.webp" alt="" decoding="async">' : '<span>Foto da chiedere al cliente</span>'; };
  /* griglia */
  var g = document.querySelector('.cn-grid'), tpl = g && g.querySelector('.cn-it');
  if (g && tpl) {
    tpl = tpl.cloneNode(true);
    g.innerHTML = '';
    keys.forEach(function (k) {
      var p = D.progetti[k], li = tpl.cloneNode(true);
      li.dataset.cat = p.cs; li.removeAttribute('hidden');
      var a = li.querySelector('a'); a.setAttribute('href', 'progetto.html#' + k);
      var tg = li.querySelector('.cn-tag'); if (tg) tg.textContent = CATN[p.cs];
      var ph = li.querySelector('[data-ph]'); if (ph) { ph.removeAttribute('data-ph'); ph.className = 'ph' + (p.hero ? ' mk-has' : ''); ph.innerHTML = pic(p.hero); }
      var h3 = li.querySelector('h3'); if (h3) h3.textContent = p.nome;
      var me = li.querySelector('.meta'); if (me) me.textContent = p.luogo;
      g.appendChild(li);
    });
    var its = [].slice.call(g.querySelectorAll('.cn-it'));
    document.querySelectorAll('.cn-f').forEach(function (b) {
      var n = b.dataset.f === 'tutti' ? its.length : its.filter(function (x) { return x.dataset.cat === b.dataset.f; }).length;
      var sp = b.querySelector('sup'); if (sp) sp.textContent = n;
    });
    var sum = document.querySelector('.cn-sum b'); if (sum) sum.textContent = its.length;
  }
  /* fila di copertine: le stesse foto delle prime card, nello stesso ordine (l'animazione le porta al loro posto) */
  var strip = document.querySelector('[data-cn-dk]');
  if (strip) {
    var withPic = keys.filter(function (k) { return D.progetti[k].hero; });
    strip.querySelectorAll('.cn-dk-c').forEach(function (c, i) {
      var k = withPic[i], p = D.progetti[k]; if (!p) { c.parentNode.remove(); return; }
      c.setAttribute('href', 'progetto.html#' + k);
      var ph = c.querySelector('[data-ph]'); if (ph) { ph.removeAttribute('data-ph'); ph.className = 'ph mk-has'; ph.innerHTML = pic(p.hero); }
      var t = c.querySelector('.cn-dk-t'); if (t) t.innerHTML = '<b>' + p.nome + '</b><small>' + CATN[p.cs] + '</small>';
    });
  }
  window.MK_GRID_DONE = true;
})();
