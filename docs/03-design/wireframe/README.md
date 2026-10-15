# Wireframe v1 - Conti & Conti

Stato: `WAITING_FOR_APPROVAL` (Gate A architettura + Gate B wireframe). Nessun elemento è `APPROVATO` salvo dove indicato come input cliente.
Apri `index.html` nel browser. File HTML statici + `wireframe.css` + `wireframe.js` (il JS assembla solo header/footer/note del wireframe).

## Stato documenti esistenti
- `docs/01-analysis/*`, `02-research/*`, `03-design/*` (tranne questa cartella), `04-review`, `05-feedback`, `06-handoff`: **template vuoti**, nessun contenuto di progetto. `docs/02-ux/*`, `PROJECT-BRIEF.md`, `COMPETITOR-RESEARCH.md`, `CONTENT-AUDIT.md`, `DESIGN-DECISIONS.md`, `VISUAL-DIRECTION.md`, `HANDOFF.md`, `README.md` (root): file vuoti (0 byte). Nessuna sitemap, nessuna wireframe-notes, nessun SEO compilato.
- Unico materiale di progetto: `docs/00-input/sito-web/settoridiattivita.md` (8 voci: Case, Residenze, Lusso, Palestre, Allestimenti, Ville, Attività Commerciali, Industriale), `logo.png`/`logo.webp`.
- Approvazioni registrate nei doc: nessuna. L'unico "approvato" è CLIENTE (call): le 8 categorie portfolio.
- Wireframe preesistente: nessuno. `wireframe-plan.md` è il template del processo (non modificato oltre la sezione 4).

## Discrepanze brief / sito attuale / doc
- Anno: brief 1987 (quarantennale 2027) vs sito attuale 1988 / "30 anni" (RICERCA). VERIFY.
- Ottava categoria: file input contiene "Case" accanto a "Residenze"; il brief parla di 8a da chiarire.
- Sito attuale (RICERCA): menu Home, Impresa, Certificazioni, Servizi, Portfolio, In vendita, Notizie, Lavora con noi, Contatti. "Certificazioni", "Servizi", "Lavora con noi" non compaiono nel brief: non inseriti come pagine, segnalati.
- Il "13-14 M€" del brief non specifica cosa misura.

## Architettura proposta (PROPOSTA, da approvare)
Menu: Impresa | Cantieri (8 categorie) | In vendita | Blog | FAQ | Contatti + CTA "Richiedi un preventivo". Voce "Settori" non inserita (decisione aperta). Footer: contatti dal sito attuale (RICERCA, da verificare), P.IVA, privacy, cookie.
Template: home (2 varianti), cantieri, categoria, progetto, in vendita, residenza (+form), impresa, blog, articolo, FAQ, contatti, area (opzionale).
Funnel: home / progetto / categoria / articolo -> contatti (preventivo); in vendita -> scheda residenza -> form dedicato.

## Decisioni aperte (WAITING_FOR_APPROVAL, non decise)
1. Settori vs categorie: opzioni A/B/C in `cantieri.html`.
2. Ottava categoria e accorpamenti.
3. Collocazione LOSI: opzioni A/B/C in `chi-siamo.html`.
4. Home A vs B.
5. Pagine area geografica (rischio doorway; Varese non è nel brief).
6. Impresa: 1 pagina con ancore o 3 pagine; pagina Certificazioni; Lavora con noi; "Blog" o "Notizie".
7. Monza come settimo immobile; immobili venduti; documenti liberi o dietro form; telefono obbligatorio nei form.
8. NDA: loghi clienti (13), nomi progetto. Nomi non scritti nel wireframe.

## Fuori scope / da fare dopo
- Immagini: placeholder; selezione e posizionamento dopo approvazione wireframe. Archiviazione (Drive vs Basecamp) da definire.
- Mockup: 2 proposte grafiche (homepage + 1 pagina) solo dopo approvazione.
- Copy, SEO keyword mapping: non prodotti. Stima ore (Elementor Pro, budget 85 h CLIENTE) PRELIMINARE in `../development-estimation-85h.md`: scenario wireframe 131-208,5 h, non rientra in 85 h; riduzioni di scope in `WAITING_FOR_APPROVAL`, nessuna applicata. Note `DEV` con ore in ogni pagina.
- Credenziali: non lette.

## Alta fedeltà e modalità
- Alta fedeltà del wireframe = base/proposta di direzione, non sostituisce le 2 proposte grafiche concordate: WAITING_FOR_APPROVAL
- `mode.js` imposta la modalità: `interno` (note, ore, decisioni) o `cliente` (copia di `mode-cliente.js`). Indice cliente: `presentazione.html`; indice interno: `index.html`.
