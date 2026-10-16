# Revisione UI/UX del 2026-10-16 (richiesta utente, limite 83 h tolto)

Stato: **applicata al wireframe** su richiesta esplicita dell'utente. Contenuti e funzioni non coinvolti sono invariati. File toccati: `wireframe/wireframe.css`, `wireframe/wireframe.js`, `home-a.html`, `chi-siamo.html`, `categoria.html`, `progetto.html`, `residenza.html`; nuovi: `pattern-cc.png`, `pattern-cc-w.png`.

| # | Richiesta | Come |
|---|---|---|
| 1 | Navbar | Logo al centro assoluto (griglia 1fr / auto / 1fr). Sinistra: Impresa, Cantieri, In vendita, Blog. Destra: FAQ, Contatti, Richiedi un preventivo. Trasparente sulla hero (logo e testi bianchi), piena allo scroll con transizione di 0,35 s. Dalle pagine senza hero è sempre piena. |
| 2 | CTA | `border-radius: 20%` su tutti i `.btn`, stessi stati hover, focus e transizioni. |
| 3 | Home, progetti in evidenza | Griglia fotografica full-bleed asimmetrica (Casa MJO 7/12 su due righe, le altre due a destra), testo sovrapposto con gradiente solo in basso, hover con zoom lento e pulsante che si accende. |
| 4 | Scroll e profondità | Sticky background: la hero Home resta ferma e la banda loghi scorre sopra; la banda foto "Persone" di Impresa resta ferma e Massimo scorre sopra. Su tablet/mobile e con riduci movimento: disattivato. |
| 5 | Pattern Conti & Conti | Tessera ripetibile ricavata dalla vera sigla "CC" del logo (`pattern-cc.png` per fondi chiari, `pattern-cc-w.png` per fondi scuri), disposta a mezza caduta. Applicata a bassa opacità su Storia (Impresa), Lavora con noi e fasce CTA bordeaux; classi `.pt-cc` e `.pt-sep` per riusarla. |
| 6 | Impresa | Hero a tutta superficie con testo sopra; sezione Persone come banda fotografica immersiva (titolo, frase e i tre mestieri sopra la foto); il blocco Massimo Conti segue in una sezione propria. |
| 7 | Categoria | Hero full-bleed con titolo, descrizione e CTA sovrapposti (tutte le 8 categorie, stesso template). |
| 8 | Progetto e Residenza | Hero full-bleed con badge, località, titolo e frase sulla foto. |

## Da verificare
- Il pattern parte da un'immagine di 68 × 79 px (il logo disponibile è un raster 320 × 84): per la produzione serve il marchio in vettoriale per rifarlo nitido.
- `border-radius: 20%` su pulsanti larghi dà angoli ellittici; se non convince si passa a un valore fisso.
- Contrasto di testo e navbar sulla foto reale: i gradienti sono tarati sui segnaposto.
- Sticky e overlay vanno provati su Safari iOS e con zoom 200%.
