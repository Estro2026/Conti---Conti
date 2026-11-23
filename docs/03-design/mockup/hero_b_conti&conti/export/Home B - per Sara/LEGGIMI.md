# Home B · Conti & Conti — hero + sequenza di costruzione

Apri `index.dc.html` da un piccolo server locale (es. `npx serve .`), non con doppio clic: il browser blocca il caricamento dei file locali.

## Contenuto
- `index.dc.html` — pagina: header, hero video, fascia accessi, sequenza di costruzione allo scroll
- `support.js` — runtime necessario alla pagina
- `video/hero-b.mp4` — video hero (da comprimere per la produzione)
- `img/costruzione/01–05` — fasi: progetto, fondamenta, struttura, murature, casa completa (02–05 a sfondo trasparente, 2688×1520)
- `img/` — logo, logo bianco, immagini delle card servizi

## Comportamento
- Scena sticky per ~7,8 schermate; lo scroll controlla l'avanzamento, reversibile, nessun autoplay.
- Sfondo uniforme #f4f3f0; accento bordeaux #8a1531; font Inter Tight / Inter (Google Fonts).
- Progetto → fondamenta: tendina dal basso in sequenza (il disegno tecnico non coincide con le viste 3D). Fasi successive: dissolvenza incrociata.
- Contenuti a lato: In numeri (counter automatico all'ingresso), I nostri servizi, Come lavoriamo.
- Mobile (<900px): casa sopra, contenuti sotto.

## Note
- I link puntano a `../wireframe/*.html` (pagine non incluse).
- Impegni 03 e 04 di "Come lavoriamo": testi da concordare.
