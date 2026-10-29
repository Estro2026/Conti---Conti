# Hero Home B · Pacchetto per Higgsfield (video)

I 6 frame sono già generati e approvati: in Higgsfield si fanno **solo i 5 video**.
Contenuto dello zip: questo file + `frame/B1.png` … `frame/B6.png`.
**Link online (si aprono da qualsiasi computer):**
- Prototipo con scroll: https://estro2026.github.io/Conti---Conti/mockup/hero-sequenza/higgsfield-pack-b/prototipo-scroll.html
- Storyboard: https://estro2026.github.io/Conti---Conti/mockup/hero-sequenza/higgsfield-pack-b/storyboard.html

Riferimento del movimento: il prototipo (camera che gira e si avvicina, testo alternato sinistra/destra).

## Testi (in pagina, NON vanno generati nel video)
I testi si sovrappongono in pagina sopra il video. In Higgsfield non devono comparire scritte: servono solo per sapere da che lato lasciare spazio.

| Frame | Lato | Etichetta | Titolo | Testo |
|---|---|---|---|---|
| B1 | sinistra | Costruzione ex novo | Ogni edificio comincia da una linea. | Immobili residenziali, commerciali e industriali, costruiti da zero. |
| B2 | destra | 01 · Progetto | Le scelte progettuali, rispettate in cantiere. | — |
| B3 | sinistra | 02 · Struttura | Uno spirito forte e costruttivo. | Fondazioni, pilastri e solai: la parte che non si vede, fatta per prima. |
| B4 | destra | 03 · Cantiere | Una struttura operativa, agile e competente. | I responsabili di cantiere coordinano ogni opera e verificano la perfetta esecuzione dei lavori. |
| B5 | sinistra | 04 · Finiture | Curando il dettaglio, la tempistica e il rapporto con il cliente. | — |
| B6 | destra | 05 · Consegna | Dalla pianta alle chiavi. | Nel rispetto dei tempi e dei costi preventivati. CTA: Richiedi un preventivo · Scopri i cantieri |

Anteprima con testi e movimento: https://estro2026.github.io/Conti---Conti/mockup/hero-sequenza/higgsfield-pack-b/prototipo-scroll.html · storyboard: https://estro2026.github.io/Conti---Conti/mockup/hero-sequenza/higgsfield-pack-b/storyboard.html

## Impostazioni (uguali per tutti i clip)
- Modello: **Seedance 2.0 Mini** (o Seedance 2.5 con piano Pro)
- Modalità: image-to-video con **immagine iniziale + immagine finale**
- Durata **5 s** · formato **16:9** · **1080p** (720p se non disponibile) · **audio spento**
- Un clip alla volta: guardarlo prima di passare al successivo.

## Regola di composizione
Il testo in pagina si alterna: B1, B3, B5 a **sinistra**; B2, B4, B6 a **destra**.
La camera quindi orbita alternando il verso, e durante il clip il lato dove arriverà il testo deve restare calmo (carta, cielo o prato, niente edificio).

---

## Clip 1 · B1 → B2
Inizio `frame/B1.png` · Fine `frame/B2.png`
```
The ink lines of the floor plan slowly lift off the paper and extrude upward into translucent white wall volumes, one storey high, following the drawn walls exactly. Camera: slow continuous orbit to the right with a slight push in, seen from above. Dimension lines, grid markers, pencil, ruler and eraser stay still on the paper. No cuts, no people, no hands, consistent footprint, no warping, no flicker.
```

## Clip 2 · B2 → B3 (il più delicato)
Inizio `frame/B2.png` · Fine `frame/B3.png`
```
The camera smoothly tilts down from a near top view to a low three-quarter view, orbiting to the left, while the translucent walls turn into concrete: foundation slab first, then columns and floor slabs rise floor by floor up to four storeys, rebar on top, scaffolding appears last. One continuous camera move. Same footprint on the drafting paper. No cuts, no people, no hands, no warping, no flicker.
```
Se si deforma: riprovare a 720p, oppure dividerlo in due generando un frame intermedio (B2.5: struttura a due piani, camera a metà inclinazione).

## Clip 3 · B3 → B4
Inizio `frame/B3.png` · Fine `frame/B4.png`
```
Construction layers are added in sequence: red brick walls fill the concrete frame floor by floor from bottom to top, timber roof beams settle on the last slab, scaffolding wraps the sides. Camera: slow orbit to the right with a gentle push in, same height. No cuts, no people, consistent geometry, no warping, no flicker.
```

## Clip 4 · B4 → B5
Inizio `frame/B4.png` · Fine `frame/B5.png`
```
Scaffolding dismantles from top to bottom while light lime plaster, travertine base and dark window frames cover the facades in a smooth upward wipe. Camera: slow orbit to the left with a gentle push in, same height. Still a scale model on drafting paper. No cuts, no people, consistent geometry, no warping, no flicker.
```

## Clip 5 · B5 → B6
Inizio `frame/B5.png` · Fine `frame/B6.png`
```
The camera slowly descends towards eye level and moves closer, orbiting to the right, while the drafting paper turns into real stone pavement and lawn and the scale model becomes a real building in warm late afternoon light. Facade, windows and stair core stay identical. No cuts, no people, no cars, straight verticals, no warping, no flicker.
```
Se si deforma: è il salto di camera più forte. Riprovare con durata 8-10 s se disponibile.

---

## Controllo di ogni clip
- Stessa impronta e stesso numero di piani (4) dall'inizio alla fine
- Nessuna mano, persona, auto, scritta nuova o logo
- Nessun tremolio o edificio che "respira"
- Il primo e l'ultimo fotogramma coincidono con i frame caricati

## Dopo i video (montaggio, non in Higgsfield)
Unire i clip 1-5 senza dissolvenze in `hero-scrub.mp4` (desktop, 16:9) e `hero-scrub-m.mp4` (mobile, ritaglio verticale centrato sull'edificio). Poster: `frame/B1.png`. Rinominare i file scaricati `clip-1.mp4` … `clip-5.mp4` e metterli nella cartella `video/` di questo pacchetto.
