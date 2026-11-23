/* Articoli del sito attuale (istruzioni 62 e 76): card con titolo, data e immagine; una pagina per articolo
   (articolo.html#slug) con testo e immagine dal sito attuale. articolo.html senza # resta la guida in bozza. */
(function () {
  var A = window.MK_ART; if (!A || !A.length) return;
  var F = 'img/foto/';
  A.forEach(function (a) { a.k = a.k || a.f.replace(/^articolo-/, ''); });
  var link = function (a) { return 'articolo.html#' + a.k; };
  var pic = function (a, cls) { return '<img class="' + (cls || 'mk-img') + '" src="' + F + a.f + '.webp" alt="" loading="lazy" decoding="async">'; };
  var put = function (box, a) {
    if (!box) return;
    var ph = box.querySelector('.mk-ph-art, [data-ph], .ph, img'); if (!ph) return;
    if (ph.matches('[data-ph], .ph')) { ph.classList.add('ph', 'mk-has'); ph.removeAttribute('role'); ph.removeAttribute('aria-label'); ph.innerHTML = pic(a); }
    else ph.outerHTML = pic(a, 'mk-art-img');
  };
  var txt = function (el, s) { if (el) el.textContent = s; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var shown = function (el) { if (!el) return; el.removeAttribute('data-rv'); el.classList.add('is-in', 'in'); el.querySelectorAll('[data-rv]').forEach(function (x) { x.removeAttribute('data-rv'); x.classList.add('is-in', 'in'); }); el.style.opacity = '1'; el.style.transform = 'none'; };

  /* Home A */
  [].forEach.call(document.querySelectorAll('#blog .bz-lead, #blog .bz-card'), function (c, i) {
    var a = A[i]; if (!a) return; put(c.querySelector('.bz-img'), a); c.setAttribute('href', link(a));
    txt(c.querySelector('h3'), a.t); txt(c.querySelector('.bz-c'), 'Notizie'); txt(c.querySelector('.bz-d'), a.d);
  });
  /* Home B */
  [].forEach.call(document.querySelectorAll('#blog .bc'), function (c, i) {
    var a = A[i]; if (!a) return; put(c, a); c.setAttribute('href', link(a)); txt(c.querySelector('h3'), a.t); txt(c.querySelector('.b-meta'), a.d);
    var p = c.querySelector('p'); if (p) p.textContent = '';
  });
  /* Blog: evidenza + elenco completo, visibile senza attendere l'animazione d'ingresso */
  var ev = document.getElementById('h-ev');
  if (ev) {
    var evs = ev.closest('section'); put(evs, A[0]); ev.textContent = A[0].t;
    var em = evs.querySelector('.meta'); if (em) em.textContent = A[0].d + ' · Notizie';
    var first = (A[0].body || []).filter(function (b) { return b[0] === 'p'; })[0];
    var evp = evs.querySelector('.bl-ev-t p:not(.bl-ev-k):not(.meta)'); if (evp) evp.textContent = first ? first[1].slice(0, 180) + (first[1].length > 180 ? '…' : '') : '';
    evs.querySelectorAll('a[href^="articolo.html"]').forEach(function (x) { x.setAttribute('href', link(A[0])); });
  }
  var grid = document.querySelector('.bl-it') && document.querySelector('.bl-it').parentElement;
  if (grid) {
    var tpl = grid.querySelector('.bl-it').outerHTML;
    grid.querySelectorAll('.bl-it').forEach(function (x) { x.remove(); });
    A.slice(1).forEach(function (a) {
      grid.insertAdjacentHTML('beforeend', tpl); var li = grid.lastElementChild;
      li.dataset.tp = 'notizie'; li.hidden = false; put(li, a); txt(li.querySelector('h3'), a.t); txt(li.querySelector('.meta'), a.d);
      txt(li.querySelector('.bl-tp'), 'Notizie'); var p = li.querySelector('p'); if (p) p.remove();
      var an = li.querySelector('a'); if (an) an.setAttribute('href', link(a));
      shown(li);
    });
    /* filtri: gli articoli del sito attuale non hanno argomenti; resta solo "Tutti" */
    var bar = document.querySelector('.bl-f, [data-bl-f]') || (document.querySelector('[data-tp]') && null);
    document.querySelectorAll('button[data-f], button[data-tp]').forEach(function (b) {
      var k = b.dataset.f || b.dataset.tp;
      if (k === 'tutti' || k === 'all') { var sp = b.querySelector('sup, small, span'); if (sp) sp.textContent = A.length - 1; }
      else { b.hidden = true; b.style.display = 'none'; }
    });
    var cnt = [].slice.call(document.querySelectorAll('.bl-cnt, [aria-live]')).filter(function (x) { return /articol/.test(x.textContent); })[0];
    if (cnt) cnt.textContent = (A.length - 1) + ' articoli';
    var emp = document.querySelector('.bl-empty'); if (emp) emp.hidden = true;
  }
  /* Pagina articolo: la foto diventa lo sfondo dell'apertura (istruzione 86) */
  var heroBg = function (a) {
    var hd = document.querySelector('.ar-hd'); if (!hd) return;
    var bg = document.createElement('div'); bg.className = 'ar-hd-bg'; bg.innerHTML = pic(a, 'mk-img').replace('loading="lazy"', 'fetchpriority="high"');
    hd.insertBefore(bg, hd.firstChild);
    var im = document.querySelector('.ar-img'); if (im) im.remove();
  };
  /* Pagina articolo */
  var slug = window.MK_SLUG !== undefined ? window.MK_SLUG : decodeURIComponent(location.hash.slice(1)), cur = A.filter(function (a) { return a.k === slug; })[0];
  if (cur && document.querySelector('.ar-hd')) {
    document.title = 'Mockup ' + cur.t + ' | Conti e Conti';
    var cr = document.querySelectorAll('.crumb li'); if (cr.length) cr[cr.length - 1].textContent = cur.t;
    txt(document.getElementById('h1'), cur.t);
    var hm = document.querySelector('.ar-hd .meta'); if (hm) hm.textContent = cur.d + ' · Notizie';
    var body = (cur.body || []).slice();
    var lead = document.querySelector('.ar-hd .lead'); var fp = body.filter(function (b) { return b[0] === 'p'; })[0];
    if (lead) lead.textContent = fp ? fp[1] : '';
    var au = document.querySelector('.ar-hd-f'); if (au) au.innerHTML = '<span class="meta">Conti e Conti · articolo dal sito attuale</span>';
    heroBg(cur);
    var tx = document.querySelector('.ar-txt'), n = 0, toc = [];
    if (tx) {
      var html = '', inList = false;
      body.forEach(function (b, i) {
        if (b === fp) return;
        if (b[0] === 'li') { if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + esc(b[1]) + '</li>'; return; }
        if (inList) { html += '</ul>'; inList = false; }
        if (/^h/.test(b[0])) { n++; html += '<h2 id="s' + n + '">' + esc(b[1]) + '</h2>'; toc.push(b[1]); }
        else html += '<p>' + esc(b[1]) + '</p>';
      });
      if (inList) html += '</ul>';
      tx.innerHTML = html + '<p class="mk-art-src">Fonte: <a href="' + cur.u + '" target="_blank" rel="noopener">articolo sul sito attuale di Conti e Conti</a>.</p>';
      shown(tx);
    }
    var tc = document.querySelector('.ar-toc');
    if (tc) { if (toc.length > 6) tc.open = false; if (toc.length > 1) tc.querySelector('ol').innerHTML = toc.map(function (t, i) { return '<li><a href="#s' + (i + 1) + '">' + esc(t) + '</a></li>'; }).join(''); else tc.remove(); }
    /* correlati: gli altri articoli */
    var others = A.filter(function (a) { return a !== cur; });
    [].forEach.call(document.querySelectorAll('.ar-rc'), function (c, i) { var a = others[i]; if (!a) return; put(c, a); txt(c.querySelector('h3'), a.t); txt(c.querySelector('.meta'), a.d + ' · Notizie'); var an = c.querySelector('a'); if (an) an.setAttribute('href', link(a)); });
    window.addEventListener('hashchange', function () { location.reload(); });
  } else {
    /* guida in bozza: correlati con gli articoli reali */
    heroBg(A[0]);
    [].forEach.call(document.querySelectorAll('.ar-rc'), function (c, i) { var a = A[i]; if (!a) return; put(c, a); txt(c.querySelector('h3'), a.t); txt(c.querySelector('.meta'), a.d + ' · Notizie'); var an = c.querySelector('a'); if (an) an.setAttribute('href', link(a)); });
  }
})();
