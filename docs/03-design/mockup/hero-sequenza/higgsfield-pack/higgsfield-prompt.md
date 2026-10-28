# Higgsfield: prompt pronti da incollare (Hero Home A)

Pacchetto autonomo: allegare questo file e la cartella `riferimenti/`. Stato: PROPOSTA, da generare solo dopo approvazione dello storyboard.
Le card con i testi **non** vanno generate: si sovrappongono in pagina. Nelle immagini restano solo superfici libere.
Storyboard online: https://estro2026.github.io/Conti---Conti/mockup/hero-sequenza/storyboard.html

## Impostazioni comuni

- **Immagini:** GPT Image 2.5, image-to-image, 16:9, 2688 x 1512, qualità alta, seed fisso per tutta la sequenza.
- **Riferimento:** F1 usa `riferimenti/01-F1-composizione-poster.jpg`; ogni frame successivo usa il frame precedente approvato.
- **Video:** Seedance 2.0 Mini (Seedance 2.5 richiede piano Pro), immagine iniziale + finale, 5 s, 720p, 16:9, senza audio.
- Generare un frame alla volta e approvarlo prima del successivo.

---

## Immagini

### F1 · Esterno, cantiere al grezzo
Riferimento: `riferimenti/01-F1-composizione-poster.jpg`
```
Same viewpoint and composition as the reference image, but the house is an active construction site: raw grey concrete structure with formwork tie holes, empty central door opening, side window openings without glass supported by steel props, scaffolding along the right side. The two olive trees in exactly the same positions, wrapped at the base with orange safety mesh. Gravel and wooden planks instead of the stone path. A white hard hat hanging on a prop, work gloves on the low wall, a thermos and cup on a wooden pallet. Quiet, as if the crew has just stepped away.
Keep these surfaces clean, flat and evenly lit for text overlays: the facade wall left of the door opening, the front face of the low wall in the foreground.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

### F2 · Soglia del cantiere
Riferimento: F1 approvato
```
Same construction site, camera now standing in the raw central door opening looking into the unfinished atrium. Concrete floor, steel props, a plumb line hanging, a spirit level on the floor, a construction work lamp switched on. Small pencil marks and a hand-written height mark "+0,00" on the concrete wall, not readable as a logo.
Keep these surfaces clean, flat and evenly lit for text overlays: the back wall left of the opening, the right wall near the lamp.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

### F3 · Stessa soglia, casa finita
Riferimento: F2 approvato + `riferimenti/03-materiali-soglia-finita.jpg` (solo materiali e luce)
```
Exactly the same camera position, geometry and perspective as the reference, but the house is finished: pale stone floor, lime plaster walls, travertine-clad atrium, brushed brass pivot door open on the right at 75 degrees. A set of keys left on a stone shelf. Every opening, edge and proportion must match the reference.
Keep these surfaces clean, flat and evenly lit for text overlays: the back wall left of the opening, the back wall right of the opening.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

### F4 · Soggiorno verso il varco in ottone
Riferimento: F3 approvato
```
Continue walking forward from the reference into the living room: low olive-green sofa, dark veined stone coffee table, natural oak dining chairs. On the back wall a tall brass-framed opening into a study. A jacket on the back of a chair, an open book on the sofa, two cups on the coffee table.
Keep these surfaces clean, flat and evenly lit for text overlays: the plain wall left of the brass opening, the plain wall right of the opening above the chairs.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

### F5 · Lo studio dentro la casa
Riferimento: F4 approvato
```
Camera now standing in the brass-framed opening (frame visible at the edges), looking into a home study in the same house: long natural oak desk under a window, a desktop monitor switched on with a plain light grey screen and no interface, desk lamp on, chair pushed back from the desk, rolled architectural drawings, handwritten notes, reading glasses on a notebook.
Keep these surfaces clean, flat and evenly lit for text overlays: the window glass above the desk, the front edge of the desk.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

### F6 · Davanti alla scrivania
Riferimento: F5 approvato
```
Closer: 1 m from the desk, monitor centred in the frame, the same objects as the reference seen from closer, a thin wisp of steam rising from a cup. Monitor screen plain light grey, it will be replaced in editing.
Keep this surface clean, flat and evenly lit for a text overlay: the front band of the desk.
Architectural photography, single-storey contemporary villa, light travertine and board-formed concrete, brushed brass details, natural oak, pale stone floor. Early afternoon sun from the left, 4300K, soft olive-leaf shadows on walls. Eye level 1.55 m, 24mm lens, straight verticals, symmetric central axis. Natural fine grain, soft contrast, no HDR, no glow. No people, no hands, no faces, no silhouettes, no reflections of people, no logos, no readable text.
```

F7 non si genera: è la home vera del sito, inserita in montaggio.

---

## Video (5 clip)

Ogni prompt è già completo: incollarlo così com'è.

| Clip | Inizio | Fine | Prompt |
|---|---|---|---|
| 1 | F1 | F2 | `Walk forward along the gravel path and stop inside the raw door opening. Slow steady forward dolly at walking pace, eye level, no cuts, straight vertical lines, no people, consistent architecture, no warping.` |
| 2 | F2 | F3 | `Camera almost still, very slight push in. The construction site transforms into the finished house in place: concrete becomes stone and plaster, props disappear, the brass door appears. Geometry stays identical. Eye level, no cuts, straight vertical lines, no people, consistent architecture, no warping.` |
| 3 | F3 | F4 | `Walk through the atrium into the living room towards the brass opening. Slow steady forward dolly at walking pace, eye level, no cuts, straight vertical lines, no people, consistent architecture, no warping.` |
| 4 | F4 | F5 | `Pass through the brass-framed opening into the study. Slow steady forward dolly at walking pace, eye level, no cuts, straight vertical lines, no people, consistent architecture, no warping.` |
| 5 | F5 | F6 | `Slow push towards the desk until the monitor is centred. Slow steady forward dolly, eye level, no cuts, straight vertical lines, no people, consistent architecture, no warping.` |

F6 > F7: in montaggio (zoom nel monitor e dissolvenza sulla home reale).

## Prima di approvare ogni frame
Controllare: ulivi, vano porta, luce da sinistra, materiali, oggetti, nessuna persona né scritta leggibile.
