# Hero video a scroll · Conti e Conti (Home A)

Per Sara. HTML + CSS + JS vanilla, nessuna dipendenza.

## Contenuto
- `index.html` — demo funzionante: header, hero, prima sezione successiva.
- `hero.css` — stili, tutte le classi prefissate `.cch-` (non collidono con `mockup.css`).
- `hero.js` — logica scroll → video, soste, frasi, header.
- `assets/hero-video.mp4` — video definitivo (11,04 s, 1920×1076). Non modificare il montaggio.
- `assets/img/` — logo bianco e logo a colori.

La demo va aperta da un server (anche locale, es. `npx serve`): `fetch()` del video non funziona da `file://`.

## Inserimento in home-a.html
1. Copia `hero.css`, `hero.js` e `assets/hero-video.mp4` nel sito.
2. Sostituisci la hero attuale con la `<section class="cch-hero">…</section>` di `index.html`.
3. Includi `hero.css` nel `<head>` e `hero.js` prima di `</body>`.
4. Header: se usi quello esistente, aggiungi `data-cch-nav` all'header; lo script gli mette/toglie la classe `is-solid` quando si esce dalla hero. Adatta i selettori `.cch-nav.is-solid …` in `hero.css` all'header del sito, oppure usa l'header della demo.
5. Rimuovi dalla home lo script della hero precedente (lo scroll che riportava all'inizio): qui scrollando indietro il video torna indietro.
6. La sezione `.cch-next` è solo contesto: sul sito segue la sezione reale. L'effetto parola-per-parola si attiva su qualunque elemento con `data-cch-words`.

## Regolazioni
Sulla `<section class="cch-hero">`, come attributi:
- `data-scroll-length="9"` — lunghezza del percorso in schermate.
- `data-hold-length="0.9"` — sosta su ogni frase (schermate).
- `data-smoothing="260"` — morbidezza video (ms).
- `data-snap="mandatory"` — `proximity` per un aggancio più leggero (con scroll veloce le frasi si possono saltare).
- `data-video="…"` — percorso del video.

Ogni frase (`.cch-card`): `data-in` / `data-out` in secondi del video, `data-side="l|r"`. Il messaggio finale ha `data-hold="end"` (sosta sull'ultimo fotogramma, fuori dal monitor).
Sotto 1024px: menu hamburger, frasi in basso a tutta larghezza.

## Consiglio per la produzione
Per uno scrub fluido, soprattutto all'indietro, ricodificare il video con keyframe frequenti (solo codifica, non montaggio), es.:
`ffmpeg -i hero-video.mp4 -c:v libx264 -crf 22 -g 1 -an -movflags +faststart hero-video-scrub.mp4`
(`-g 1` = ogni fotogramma è chiave; file più pesante. Compromesso: `-g 6`.) Valutare anche una versione 1280px per mobile.
