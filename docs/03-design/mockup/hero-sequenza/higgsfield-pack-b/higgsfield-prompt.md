# Higgsfield: prompt pronti da incollare (Hero Home B)

Stato: PROPOSTA. Generare solo dopo approvazione di concept e testi.
Testi e CTA **non** vanno generati: si sovrappongono in pagina (lasciare libero il terzo sinistro del frame).

## Concept
Una sola inquadratura a 3/4 dall'alto su un foglio da disegno: la pianta si alza in 3D e il palazzo si costruisce per strati fino all'edificio finito. La camera orbita poco (max 20°) e alla fine scende leggermente, così l'ultimo frame è un edificio vero e non più un plastico.
Lo scroll comanda il video (come la hero attuale di B, `hero-scrub.mp4`): i clip vanno montati in un unico file senza tagli.

## Impostazioni comuni
- **Immagini:** GPT Image 2.5, 16:9, 2688 x 1512, qualità alta, seed fisso. B1 text-to-image; B2-B6 image-to-image dal frame precedente approvato.
- **Video:** Seedance (2.0 Mini, o 2.5 con piano Pro), immagine iniziale + finale, 5 s, 720p (1080p se disponibile), 16:9, senza audio.
- Un frame alla volta, approvato prima del successivo.

Blocco stile (già incluso in ogni prompt):
`Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.`

---

## Immagini

### B1 · La pianta sul foglio
```
A sheet of drafting paper seen in a three-quarter aerial view: a precise architectural floor plan of a four-storey residential building drawn in graphite and slate-blue ink. Hatched thick walls, door swings, stair, balconies, dimension lines with ticks, a north arrow, structural grid axes with circled markers. A soft pencil, a metal scale ruler and an eraser resting at the lower right edge of the paper. Lines crisp and completely flat on the paper.
Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

### B2 · Le linee si alzano
Riferimento: B1 approvato
```
Same paper, same camera, same plan in exactly the same position. The ground floor walls rise out of the drawing as thin translucent white volumes one storey high, edges outlined in slate-blue ink, like a line drawing becoming a paper model. Dimension lines and grid axes stay flat on the paper. Pencil, ruler and eraser unchanged.
Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

### B3 · Fondazioni e struttura
Riferimento: B2 approvato
```
Same paper, same camera, same footprint. The translucent volumes become a realistic scale model of a construction site: reinforced concrete foundation slab, grey concrete columns and floor slabs for all four storeys, exposed rebar on top, stair core. The model sits exactly on the drawn plan, still visible around its base. Small scaffolding on one side. Matte scale-model materials.
Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

### B4 · Murature, impianti, copertura
Riferimento: B3 approvato
```
Same paper, same camera, same building. Brick infill walls between the concrete frame on every floor, empty window openings with lintels, insulation boards partly applied on one facade, plumbing and electrical conduits visible through openings, timber roof beams on top. Scaffolding wraps two sides. The drawn plan still visible around the base.
Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

### B5 · Finiture
Riferimento: B4 approvato
```
Same paper, same camera, same building. Scaffolding removed. Facades finished in light lime plaster (#ddd2c1) with a travertine base, dark graphite window frames with glass, slim metal balcony railings, flat roof with parapet. Still a precise scale model standing on the paper, plan lines visible at the base.
Warm off-white drafting paper with a faint square grid (#ebe8e2), graphite and slate-blue ink lines, soft overhead daylight from upper left, 4500K, gentle contact shadows. Fixed three-quarter aerial view at 35 degrees, 50mm lens, building centred slightly right of frame, left third of the frame empty paper for text. Calm, precise, architectural. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

### B6 · Il palazzo finito
Riferimento: B5 approvato
```
Same building, same geometry and facade details, camera slightly lower (25 degrees) and closer. The paper has become real ground: pale stone pavement and a strip of lawn with two young trees where the plan was, soft late afternoon light from the left, warm light in two windows. Photographic architectural realism, straight verticals, complete building.
Left third of the frame calm and even (sky or plain facade) for text. No people, no hands, no logos, no readable text, no watermarks, no glow, no HDR.
```

---

## Video (5 clip, poi un unico file per lo scrub)

| Clip | Inizio | Fine | Prompt |
|---|---|---|---|
| 1 | B1 | B2 | `The ink lines of the floor plan lift off the paper and extrude upward into thin translucent wall volumes. Camera almost still, very slow orbit to the right. No cuts, no people, no hands, consistent geometry, no warping.` |
| 2 | B2 | B3 | `The camera smoothly tilts down from a near top view to a low three-quarter view while the translucent walls solidify into concrete: foundation slab first, then columns and slabs rise floor by floor from bottom to top, scaffolding appears last. Continuous smooth camera move. No cuts, no people, consistent footprint, no warping.` |
| 3 | B3 | B4 | `Construction layers are added in sequence: brick walls fill the frame floor by floor, conduits appear, timber roof beams settle on top, scaffolding wraps the sides. Very slow orbit. No cuts, no people, consistent geometry, no warping.` |
| 4 | B4 | B5 | `Scaffolding dismantles from top to bottom, plaster and windows cover the facades in a smooth upward wipe. Very slow orbit. No cuts, no people, consistent geometry, no warping.` |
| 5 | B5 | B6 | `The camera slowly descends and moves closer while the drafting paper turns into real stone ground and lawn, the model becomes a real building at golden hour. No cuts, no people, straight verticals, consistent facade, no warping.` |

Montaggio: concatenare 1-5 senza dissolvenze, esportare `hero-scrub.mp4` (desktop) e `hero-scrub-m.mp4` (mobile). Su mobile l'edificio è a destra: ricentrarlo nel crop. Poster = B1.

---

## Testi proposti (PROPOSTA, da approvare)
Overlay nel terzo sinistro, cambiano con lo scroll.

| Fase | Frame | Testo |
|---|---|---|
| Apertura | B1 | Eyebrow: *Impresa di costruzioni a Lentate sul Seveso* · H1: **Ogni edificio comincia da una linea.** |
| 1 | B2 | Il progetto prende misura. |
| 2 | B3 | Fondazioni e struttura: la parte che non si vede, fatta per prima. |
| 3 | B4 | Murature, impianti, copertura. Un solo cantiere, una sola squadra. |
| 4 | B5 | Finiture posate da chi ha costruito il resto. |
| Chiusura | B6 | **Dalla pianta alle chiavi.** CTA: *Richiedi un preventivo* · *Scopri i cantieri* |

Da decidere: l'H1 attuale di B ("Dietro ogni casa ci sono le persone che la costruiscono") se approvato va sostituito solo con ok esplicito; in alternativa resta come chiusura su B6.

## Stato generazione
- B1 APPROVATO (`frame/B1.png`, job b7a220a2).
- B2 APPROVATO (`frame/B2.png`, job 7c704cbb). Camera quasi dall'alto come B1: il modello non cambia angolo da B1.
- B6 generato (`frame/B6.png`, job 6a183988), da approvare. Camera quasi ad altezza d'occhio e più frontale del previsto: il clip 5 deve gestire una discesa forte.
- B5 APPROVATO (`frame/B5.png`, job dac2a4e1).
- B4 APPROVATO (`frame/B4.png`, job 170202ee).
- B3 APPROVATO (`frame/B3.png`, job 30fdec66). Qui la camera passa a 3/4 basso (APPROVATO: inclinazione portata in B3 e nel clip 2). B4-B6 mantengono questa camera.

## Prima di approvare ogni frame
Stessa impronta a terra e stessa posizione dell'edificio, 4 piani costanti, terzo sinistro libero, nessuna mano, persona o scritta leggibile.
