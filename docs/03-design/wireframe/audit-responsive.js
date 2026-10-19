/* Audit responsive del wireframe e dei mockup Home A/B (strumento di verifica, non fa parte del sito).
   Uso: in una pagina servita da http://localhost:8123/ chiamare  await window.__audit(width, pages)
   Controlla per ogni pagina e larghezza: scorrimento orizzontale, elementi che escono dallo schermo senza essere
   ritagliati da un contenitore, errori JS, bersagli touch sotto i 24 px (WCAG 2.2 AA) e immagini senza dimensioni. */
window.__audit = async function (w, pages, opts) {
  opts = opts || {};
  const out = {};
  for (const p of pages) {
    const f = document.createElement('iframe');
    f.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:${opts.h || 800}px;opacity:0;border:0`;
    f.src = p + (p.includes('?') ? '&' : '?') + 'aud=' + w;
    document.body.appendChild(f);
    const errs = [];
    try { f.contentWindow.addEventListener('error', e => errs.push(e.message)); } catch (e) {}
    await new Promise(r => { f.onload = r; setTimeout(r, 6000); });
    await new Promise(r => setTimeout(r, 1100));
    const d = f.contentDocument, W = f.contentWindow, res = {};
    try {
      res.ovf = d.documentElement.scrollWidth > w + 1 ? d.documentElement.scrollWidth : 0;
      const bad = [];
      const clipped = el => {
        for (let a = el.parentElement; a && a !== d.documentElement; a = a.parentElement) {
          const o = W.getComputedStyle(a);
          if (o.overflowX !== 'visible' || /clip/.test(o.overflow)) return true;
        }
        return false;
      };
      d.querySelectorAll('body *').forEach(el => {
        if (bad.length > 5) return;
        const cs = W.getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed' && /ab-switch|peek/.test(el.className)) return;
        if (el.closest('.sr,[hidden],.n,[data-note],dialog:not([open]),.cn-peek,.tb,.legend,.notes')) return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        if (r.right > w + 2 || r.left < -2) {
          if (clipped(el)) return;
          bad.push((el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]).slice(0, 40) + '@' + Math.round(r.left) + '-' + Math.round(r.right));
        }
      });
      res.out = bad;
      if (w <= 900) {
        const small = [];
        d.querySelectorAll('a[href],button,summary,input:not([type=hidden]),select,textarea').forEach(el => {
          if (small.length > 4) return;
          if (el.closest('.sr,[hidden],.tb,.legend,.notes,.n,[data-note]')) return;
          const cs = W.getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const inline = cs.display === 'inline' && el.closest('p,li,dd,dt,figcaption,span.lead,small');
          if (inline) return;
          if (r.height < 24 || r.width < 24) small.push((el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ':' + (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 14)) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
        });
        res.small = small;
      }
      res.noimg = [...d.querySelectorAll('img')].filter(i => i.complete && !i.naturalWidth && i.src).length;
    } catch (e) { res.exc = String(e).slice(0, 80); }
    res.err = errs.join('|');
    const flag = res.ovf || (res.out && res.out.length) || (res.small && res.small.length) || res.noimg || res.err || res.exc;
    if (flag) out[p.replace('/wireframe/', '').replace('/mockup/', 'M:')] = res;
    f.remove();
  }
  return out;
};
