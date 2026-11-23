/* Genera la struttura degli indirizzi del PDF del copywriter (sezione 14) a partire dai file modello del mockup.
   Uso: node build-routes.js   (dalla cartella mockup/)
   - I file modello restano nella cartella mockup/ (home-a.html, cantieri.html, progetto.html...): si modificano LI',
     poi si rilancia questo script. Aprendo un modello, mk-routes.js porta all'indirizzo nuovo.
   - Per ogni pagina crea una cartella con index.html (copia del modello con <base href> verso la radice del mockup). */
const fs = require('fs'), path = require('path');
const R = __dirname + path.sep;
global.window = {};
require(R + 'mk-schede-data.js'); require(R + 'mk-articoli-data.js');
const S = window.MK_SCHEDE, A = window.MK_ART;

const CATSLUG = { palestre: 'palestre', case: 'case', ville: 'ville', lusso: 'lusso', residenze: 'residenze', commerciali: 'attivita-commerciali', allestimenti: 'allestimenti', industriale: 'industriale' };
const IMM = { 'residenza-solarium': 'residenza-solarium-carimate' };
const DEF = { progetto: 'ceresio-7', categoria: 'palestre', residenza: 'residenza-solarium', articolo: 'ristrutturare-casa-da-dove-iniziare' };
const ARTS = []; for (let i = 0; i < 14; i++) if (A[i]) ARTS.push(A[i].k || A[i].f.replace(/^articolo-/, ''));

const pages = []; // { out, tpl, slug }
const fixed = [
  ['progetti-realizzati', 'cantieri.html'], ['appartamenti-in-vendita-monza-e-brianza', 'in-vendita.html'],
  ['servizi/residenze', 'servizio-residenze.html'], ['servizi/ristrutturazioni', 'servizio-ristrutturazioni.html'], ['servizi/retail', 'servizio-retail.html'],
  ['impresa-di-costruzioni', 'chi-siamo.html'], ['blog', 'blog.html'], ['domande-frequenti', 'faq.html'], ['contatti', 'contatti.html'], ['grazie', 'grazie.html'], ['lavora-con-noi', 'lavora-con-noi.html']
];
fixed.forEach(f => pages.push({ out: f[0], tpl: f[1] }));
Object.values(CATSLUG).forEach(c => pages.push({ out: 'progetti-realizzati/' + c, tpl: 'categoria.html', slug: c }));
Object.keys(S.progetti).forEach(k => pages.push({ out: 'progetti-realizzati/' + CATSLUG[S.progetti[k].cs] + '/' + k, tpl: 'progetto.html', slug: k }));
Object.keys(S.immobili).forEach(k => pages.push({ out: 'appartamenti-in-vendita-monza-e-brianza/' + (IMM[k] || k), tpl: 'residenza.html', slug: k }));
ARTS.forEach(k => pages.push({ out: 'blog/' + k, tpl: 'articolo.html', slug: k }));
// la guida in bozza (articolo.html senza slug)
pages.push({ out: 'blog/' + DEF.articolo, tpl: 'articolo.html', slug: '' });

/* pulizia delle sole cartelle generate */
['progetti-realizzati', 'appartamenti-in-vendita-monza-e-brianza', 'servizi', 'impresa-di-costruzioni', 'blog', 'domande-frequenti', 'contatti', 'grazie', 'lavora-con-noi'].forEach(d => fs.rmSync(R + d, { recursive: true, force: true }));

let n = 0;
for (const p of pages) {
  let h = fs.readFileSync(R + p.tpl, 'utf8');
  const depth = p.out.split('/').length, rel = '../'.repeat(depth);
  const inj = '<base href="' + rel + '"><script>window.MK_NESTED=1;window.MK_PAGE=' + JSON.stringify(p.tpl) + ';' + (p.slug !== undefined ? 'window.MK_SLUG=' + JSON.stringify(p.slug) + ';' : '') + '</script>';
  h = h.replace(/<script src="mk-routes\.js[^"]*"><\/script>/, '');
  h = h.replace(/<head>/i, m => m + inj + '<script src="mk-routes.js?v=6"></script>');
  fs.mkdirSync(R + p.out, { recursive: true });
  fs.writeFileSync(R + p.out + '/index.html', h);
  n++;
}

/* mappa per mk-routes.js */
const PM = {}; Object.keys(S.progetti).forEach(k => PM[k] = CATSLUG[S.progetti[k].cs]);
const data = { P: PM, I: Object.keys(S.immobili), IM: IMM, A: ARTS, DEF, FIX: { 'cantieri.html': 'progetti-realizzati/', 'in-vendita.html': 'appartamenti-in-vendita-monza-e-brianza/', 'servizio-residenze.html': 'servizi/residenze/', 'servizio-ristrutturazioni.html': 'servizi/ristrutturazioni/', 'servizio-retail.html': 'servizi/retail/', 'chi-siamo.html': 'impresa-di-costruzioni/', 'blog.html': 'blog/', 'faq.html': 'domande-frequenti/', 'contatti.html': 'contatti/', 'grazie.html': 'grazie/', 'lavora-con-noi.html': 'lavora-con-noi/' } };
const tpl = fs.readFileSync(R + 'mk-routes.tpl.js', 'utf8');
fs.writeFileSync(R + 'mk-routes.js', tpl.replace('/*DATA*/', 'var D = ' + JSON.stringify(data) + ';'));

/* le home restano alla radice; index.html porta alla Home A */
fs.writeFileSync(R + 'index.html', '<!doctype html><meta charset="utf-8"><title>Conti e Conti</title><meta http-equiv="refresh" content="0;url=home-a.html"><script>location.replace("home-a.html"+location.search+location.hash)</script><a href="home-a.html">Home</a>');

/* script mk-routes nei modelli (una sola volta) */
['home-a.html', 'home-b.html', 'cantieri.html', 'categoria.html', 'progetto.html', 'in-vendita.html', 'residenza.html', 'servizio-residenze.html', 'servizio-ristrutturazioni.html', 'servizio-retail.html', 'chi-siamo.html', 'blog.html', 'articolo.html', 'faq.html', 'contatti.html', 'grazie.html', 'lavora-con-noi.html'].forEach(f => {
  let h = fs.readFileSync(R + f, 'utf8');
  if (!/mk-routes\.js/.test(h)) { h = h.replace(/<head>/i, m => m + '<script src="mk-routes.js?v=6"></script>'); fs.writeFileSync(R + f, h); }
});
console.log('pagine generate:', n);
