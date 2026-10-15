# Stima sviluppo Elementor Pro vs budget 85 ore - Conti & Conti

Stato: `PRELIMINARE` (basata su wireframe media fedeltà) - `PROPOSTA` - `WAITING_FOR_APPROVAL` (la stima è un gate: nessuna riduzione di scope qui sotto è applicata).
Fonti: `docs/03-design/wireframe/*` (note `DEV`), `docs/02-research/contenuti-sito-attuale.md`, `wireframe-plan.md`.

## 1. Vincoli e fonti

| Voce | Etichetta |
|---|---|
| Sito sviluppato con Elementor, licenza **Elementor Pro** (Theme Builder, Loop Grid/Carousel, Form, Mega Menu, Dynamic Tags, popup, sticky) | CLIENTE |
| Budget di sviluppo totale **85 ore** | CLIENTE (agenzia/utente) |
| Ore per componente/pagina, riserve, ipotesi di riuso | INFERENZA / PROPOSTA (stime min-max, non garantite) |
| Funzioni Elementor citate nelle note `DEV` | RICERCA (conoscenza della documentazione Elementor; dove la versione conta è marcato VERIFY, non verificato su installazione reale) |

Non ancora noti, DA VERIFICARE (VERIFY): tema (Hello Elementor/child o altro), CPT e plugin ACF (free/Pro), hosting e PHP/memoria, plugin SEO, plugin cache/immagini, plugin redirect, anti-spam (honeypot/reCAPTCHA/Turnstile: chiavi non fornite), SMTP, cookie banner, tracking (GA4/GTM), plugin recensioni Google, versione di Elementor Pro (per svh, Marquee, Taxonomy Filter, Turnstile).

## 2. Risultato in sintesi

| Scenario | Ore min | Ore max | vs 85 h |
|---|---|---|---|
| **A. Scope del wireframe (una home, senza pagine area)** | **131** | **208,5** | oltre di 46-124 h (+54% / +145%) |
| B. A con tutte le riduzioni proposte (§6, tutte `WAITING_FOR_APPROVAL`) | 103 | 161 | oltre di 18-76 h |
| C. B + tagli strutturali "oltre il perimetro" (§6.2) | 93,5 | 145,5 | oltre di 8,5-60,5 h |

**Il progetto non rientra in 85 ore.** Anche con tutti i tagli proposti il minimo supera 85. 85 h è raggiungibile solo se il lavoro reale cade sotto il minimo di stima di ogni voce, ipotesi poco probabile: non va promessa. Il totale di §3-§5 include QA, responsive, accessibilità e SEO (riserve non comprimibili senza un rischio di qualità).

Raccomandazione (PROPOSTA, da approvare): o budget ~105-130 h per un Fase 1 ridotto (scenario B), oppure 85 h per una Fase 1 più piccola (§6.3) con il resto in Fase 2.

## 3. Stima per componente (una sola volta, riusata)

Convenzione: ogni voce include costruzione desktop + comportamento responsive del componente. La messa a punto trasversale (§5) copre tablet/zoom/touch a livello di sito. Le ore delle pagine (§4) escludono i componenti già contati qui.

### 3.1 Setup, design system, dati

| ID | Voce | Complessità | Min | Max | Assunzioni / rischi |
|---|---|---|---|---|---|
| A1 | Ambiente, staging, plugin base, impostazioni Elementor | LOW | 2 | 4 | Hosting accessibile, tema scelto (VERIFY) |
| A2 | Design system frontend: Global Colors/Fonts, pulsanti, spaziatura, container, tipografia, CSS globale | MEDIUM | 4 | 6 | Mockup/UI approvata disponibile; nessuna libreria extra |
| A3 | CPT Progetti + tassonomia 8 categorie + campi ACF (località, anno, mq, lavorazioni, progettista, galleria, stampa) | MEDIUM | 3 | 4 | CPT/ACF da confermare (VERIFY); senza ACF si usano custom field nativi: più lavoro |
| A4 | CPT Immobili + campi ACF (stato, dati scheda, documenti, ordine) | MEDIUM | 2 | 3 | Come sopra |
| A5 | Blog: post standard, categorie, campi minimi | LOW | 0,5 | 1 | Nessun CPT |
| | **Subtotale setup** | | **11,5** | **18** | |

### 3.2 Componenti globali

| ID | Componente | Riutilizzabile | Complessità | Min | Max | Come in Elementor Pro |
|---|---|---|---|---|---|---|
| B1 | Header + menu + dropdown Cantieri + menu mobile + CTA | sì | MEDIUM | 3 | 5 | Theme Builder Header, widget Nav Menu con sottomenu. **Mega Menu escluso** (+2-3 h solo se approvato un pannello con immagini/colonne, non nel wireframe) |
| B2 | Footer | sì | LOW | 2 | 3 | Theme Builder Footer, 4/2/1 colonne |
| B3 | Fascia CTA | sì | LOW | 1 | 1,5 | Template salvato + widget Template |
| B4 | Hero template (altezza viewport, 3 crop, testo sotto su mobile) | sì | LOW-MEDIUM | 2 | 3 | Container min-height 100svh (VERIFY svh), immagini per device, visibilità per device |
| B5 | Statistiche (5 numeri statici) | sì | LOW | 1,5 | 2,5 | Container flex + template salvato |
| B6 | Banda loghi scorrevole + pausa + reduced motion | sì | MEDIUM | 3 | 5 | Container + CSS keyframes + ~10 righe JS pausa. Carousel nativo: 2-3,5 h ma cambia il motion e richiede comunque il pulsante Pausa |
| B7 | Card progetto (Loop Item, 2 ratio) + stile Loop Grid/paginazione | sì | MEDIUM | 3 | 4 | Loop Item + Dynamic Tags |
| B8 | Card immobile (Loop Item, badge stato) | sì | MEDIUM | 2 | 3 | Loop Item + ACF/tassonomia stato |
| B9 | Card articolo (Loop Item) | sì | LOW | 1 | 1,5 | Loop Item |
| B10 | Form condiviso (campi, Acceptance, Hidden, Honeypot, email, successo/errore, Submissions) | sì | MEDIUM | 4 | 6 | Form widget; anti-spam esterno e SMTP in §5 |
| B11 | FAQ accordion (stile condiviso) | sì | LOW | 1,5 | 2,5 | Nested Accordion |
| B12 | Sticky bar mobile Chiama + Preventivo/Info | sì | LOW | 1,5 | 2,5 | Container Fixed bottom, visibilità per device |
| B13 | Galleria + lightbox | sì | MEDIUM | 2 | 3 | Gallery/Basic Gallery + lightbox nativa; **no lightbox custom** (+4-6 h) |
| B14 | Recensioni (3 card statiche, scroll manuale mobile) | sì | LOW-MEDIUM | 2 | 3 | Testi copiati a mano. Widget Google Reviews di terzi: +3-6 h, non incluso |
| B15 | Chip zone/categorie | sì | LOW | 1 | 1,5 | Icon List/Button |
| B16 | Breadcrumb, 404, pagine legali (impaginazione) | sì | LOW | 2 | 3,5 | Template 404; testi legali del cliente; breadcrumb da plugin SEO (VERIFY) |
| B17 | Scheda dati (dl) e riga documenti con righe nascoste se vuote | sì | LOW | 1 | 1,5 | Icon List + Display Conditions |
| | **Subtotale globali** | | | **33,5** | **52** | |

## 4. Stima per pagina/template (solo parte specifica)

| ID | Template | Pagine | Complessità | Min | Max | Note / assunzioni |
|---|---|---|---|---|---|---|
| P1 | Home (UNA variante) | 1 | MEDIUM | 5 | 8 | Assemblaggio di componenti globali; costruire A e B = +6-9 h non necessarie. Le due proposte restano deliverable di design |
| P2 | Cantieri | 1 | MEDIUM | 4 | 6 | Archivio + Loop Grid + chip come link + paginazione |
| P3 | Categoria (template archivio tassonomia) | 8 (da 1 template) | MEDIUM | 5 | 8 | Campi termine ACF con Dynamic Tags (VERIFY); alternativa 8 pagine +3-5 h |
| P4 | Scheda progetto (Single CPT) | n | MEDIUM-HIGH | 6 | 9 | Righe vuote nascoste, progetti simili, stampa condizionale |
| P5 | In vendita | 1 | LOW | 2 | 3 | |
| P6 | Scheda residenza (Single CPT) + form + sticky | 6-7 | MEDIUM-HIGH | 6 | 9 | Colonna sticky, Hidden dinamico, documenti ACF |
| P7 | Impresa (pagina unica con ancore) | 1 | MEDIUM | 8 | 12 | 3 pagine separate: +3-5 h; sezione LOSI non costruita (WAITING_FOR_APPROVAL) |
| P8 | Blog (archivio) | 1 | LOW-MEDIUM | 3 | 4,5 | |
| P9 | Articolo (Single Post) | n | MEDIUM | 4 | 6 | TOC widget, correlati |
| P10 | FAQ | 1 | LOW | 2,5 | 4 | 13 voci inserite a mano |
| P11 | Contatti | 1 | MEDIUM | 4 | 6 | Form condiviso + Select precompilabile; riepilogo errori con focus = JS 1-2 h opzionale (non incluso) |
| | **Subtotale pagine** | | | **49,5** | **75,5** | |
| P12 | *Area geografica (3 pagine)* | 3 | LOW-MEDIUM | *4-6 + 1-1,5 per area aggiuntiva* | | **Fuori dal totale**: WAITING_FOR_APPROVAL (SEO/doorway) |

## 5. Riserve trasversali (qualità, SEO, migrazione, contenuti)

| ID | Voce | Min | Max | Assunzioni |
|---|---|---|---|---|
| T1 | Messa a punto responsive: laptop, zoom 200%, tablet, mobile, touch (oltre al comportamento incluso nei componenti) | 6 | 10 | Non è solo "impilare": ordine e visibilità per device |
| T2 | Accessibilità: focus, tastiera, contrasto, form, skip link, reduced motion, lightbox, menu | 4 | 7 | Verifica con strumenti + prova tastiera, non audit certificato |
| T3 | SEO tecnico on-page: title/meta, heading, schema, sitemap, canonical, immagini | 3 | 5 | Plugin SEO esistente o scelto (VERIFY); keyword mapping non incluso |
| T4 | Redirect 301 vecchie URL (portfolio 10 filtri, In vendita, ecc.) e tabella di mappatura | 2 | 4 | Elenco URL attuali disponibile; plugin redirect (VERIFY) |
| T5 | Performance: immagini WebP/dimensioni, lazy-load, CSS/JS Elementor, cache | 3 | 5 | Plugin cache/immagini già deciso (VERIFY); hosting adeguato |
| T6 | Cookie banner + tracking (GA4/GTM) con consenso | 2 | 4 | Piattaforma e account da definire (VERIFY); tracking eventi avanzato escluso |
| T7 | Anti-spam (honeypot + reCAPTCHA v3/Turnstile) + SMTP + test consegna email | 1,5 | 3 | Chiavi e casella mittente forniti (VERIFY) |
| T8 | Contenuti pilota: 1 progetto, 1 immobile, 1 articolo, 1 categoria completi per validare i template | 4 | 6 | Il resto caricato da altri (§7) |
| T9 | QA browser/dispositivi (Chrome, Safari/iOS, Firefox, Edge, Android) | 5 | 8 | Dispositivi/BrowserStack disponibili |
| T10 | Correzioni post-review interna + 1 ciclo di feedback | 4 | 7 | Un solo ciclo di feedback; scope invariato |
| T11 | Go-live: DNS, backup, noindex off, controlli finali, consegna | 2 | 4 | Accessi hosting/dominio disponibili |
| | **Subtotale riserve** | **36,5** | **63** | |

## 6. Totale e piano di riduzione

| Blocco | Min | Max |
|---|---|---|
| Setup e dati (§3.1) | 11,5 | 18 |
| Componenti globali (§3.2) | 33,5 | 52 |
| Pagine (§4) | 49,5 | 75,5 |
| Riserve e qualità (§5) | 36,5 | 63 |
| **Totale scenario A** | **131** | **208,5** |
| Budget | 85 | 85 |
| Differenza | +46 | +123,5 |

Ripartizione indicativa per tipologia: setup/design system ~9-10%, componenti ~25%, pagine ~37%, QA/riserve ~28%.

I componenti più costosi: Impresa (8-12), Scheda progetto e residenza (6-9 ciascuna), Home (5-8), Categoria (5-8), Form condiviso (4-6) + Contatti (4-6), Header (3-5), Banda loghi (3-5). Le riserve (responsive, QA browser, correzioni) pesano 36,5-63 h.

### 6.1 Riduzioni, ordinate per risparmio (tutte `WAITING_FOR_APPROVAL`, NON applicate)

| # | Taglio | Risparmio h (min-max) | Cumulato (min-max) | Impatto su scope/IA/layout |
|---|---|---|---|---|
| R1 | Blog + Articolo (3 articoli SEO) in Fase 2 | 8-12 | 123-196,5 | Il brief prevede blog con 3 articoli SEO: impatta SEO e scope |
| R2 | Cookie banner, tracking, anti-spam/SMTP a carico di hosting/altro fornitore | 3,5-7 | 119,5-189,5 | Non cambia le pagine; serve chi li configuri, resta rischio privacy/spam |
| R3 | Contenuti pilota esclusi (caricamento affidato al cliente fin dall'inizio) | 4-6 | 115,5-183,5 | Aumenta il rischio di scoprire problemi dei template a fine progetto |
| R4 | Impresa semplificata (niente timeline, team ridotto a Massimo + 1 riga squadra) | 3-5 | 112,5-178,5 | Cambia layout proposto della pagina Impresa |
| R5 | Pagina FAQ in Fase 2 (FAQ solo in Contatti/categorie) | 2,5-4 | 110-174,5 | La FAQ è richiesta dal brief (anche per ricerca AI) |
| R6 | Home snella: via recensioni, zone e blog dalla home (restano in Contatti/Cantieri) | 2-4 | 108-170,5 | Cambia la composizione home proposta |
| R7 | Redirect e mappatura URL a carico di altri | 2-4 | 106-166,5 | Rischio perdita SEO/traffico (Ceresio 7 è la 2ª pagina più visitata) |
| R8 | Niente "progetti simili", niente sezione stampa, niente FAQ locali nelle schede/categorie | 2-3,5 | 104-163 | Riduce contenuti proposti nei template |
| R9 | Banda loghi con Carousel nativo (autoplay, pausa aggiunta) invece di scorrimento continuo | 1-2 | 103-161 | Cambia il motion discusso in call |
| | **Scenario B** | | **103-161** | |

Già applicata senza cambiare scope (nel totale base): Nav Menu nativo con dropdown invece di Mega Menu (risparmio 2-3 h, coerente col wireframe, che mostra solo un dropdown); galleria con lightbox nativa; una sola home da sviluppare; stesso template per categorie/progetti/immobili/articoli; componenti condivisi (Loop Item, Form, FAQ, CTA, stats, loghi) stimati una volta; pagine Servizi/Certificazioni integrate in Impresa (come nel wireframe).

### 6.2 Tagli strutturali oltre il perimetro (sconsigliati o molto impattanti, `WAITING_FOR_APPROVAL`)

| # | Taglio | Risparmio h | Impatto |
|---|---|---|---|
| S1 | Niente pagine categoria dedicate: solo filtro in Cantieri | 5-8 | Cambia IA e SEO delle 8 categorie approvate (il filtro dinamico richiederebbe anche un widget/plugin da verificare) |
| S2 | Immobili come pagine statiche senza CPT/Loop | 3-5 | Duplicazione manuale, manutenzione costosa, schede incoerenti |
| S3 | Scheda residenza senza colonna sticky/documenti dinamici | 1,5-2,5 | Peggiora la conversione della pagina principale per le vendite |
| | **Scenario C (B + S1-S3)** | **93,5-145,5** | Ancora sopra 85 |

### 6.3 Fase 1 da 85 ore (PROPOSTA di ragionamento, non una stima)

Per stare in 85 ore servirebbe perimetro Fase 1 = Home, Cantieri + categorie, Progetto, In vendita + Residenza, Impresa semplificata, Contatti; Blog, Articolo, FAQ, Area, redirect/tracking/cookie in Fase 2 o a carico di altri; stima di ogni voce ai minimi. Anche così il totale parte da circa 90-100 h: serve comunque rinegoziare budget o attese. Decisione dell'agenzia/cliente.

## 7. Cosa NON è incluso

- Copywriting, traduzioni, SEO continuativa e keyword mapping.
- Foto, render, video, shooting, ritocco e selezione immagini; ritagli per device li produce il fotografo/grafico.
- Caricamento massivo contenuti (progetti, immobili, articoli, FAQ) oltre i contenuti pilota.
- Configurazione hosting, DNS avanzato, certificati, email aziendali.
- Licenze e plugin a pagamento (ACF Pro, SEO, cache, cookie, recensioni).
- Widget Google Reviews di terzi, mappa embed, CRM/newsletter, area riservata, e-commerce.
- Mega Menu, lightbox custom, animazioni scroll/counter, parallax.
- Modulo "Lavora con noi" con upload CV (+2-3 h, VERIFY se mantenuto).
- Pagine area geografica, Home B in parallelo ad A, tre pagine Impresa separate.
- Routing email per immobile, riepilogo errori form con focus (JS custom).
- Migrazione contenuti dal sito attuale, audit di accessibilità certificato, contingenza imprevisti (consigliato +10-15% sul totale scelto, non incluso).
- Mockup e design (fase precedente).

## 8. Assunzioni da verificare (VERIFY)

1. Elementor Pro attivo e aggiornato; versioni usate dalle note: svh in Min Height, Taxonomy Filter, Turnstile, markup details del Nested Accordion, Dynamic Tags su campi termine ACF.
2. ACF (free o Pro) e CPT Progetti/Immobili approvati; alternative (custom field nativi/JetEngine) cambiano ore.
3. Tema (Hello Elementor child o altro) e assenza di conflitti con Theme Builder.
4. Hosting con PHP/memoria adeguati; staging disponibile.
5. Anti-spam (reCAPTCHA/Turnstile con chiavi), SMTP, destinatari email.
6. Cookie banner e tracking: piattaforma e consensi.
7. Plugin SEO/redirect/cache.
8. Contenuti: testi e immagini forniti, NDA su loghi/nomi (VERIFY), contenuti già sul sito attuale.
9. Una sola home sviluppata; menu = 6 voci come nel wireframe; decisione Settori vs Categorie non aumenta le pagine (opzioni A/B cambierebbero IA e ore).

## 9. Rischi principali sulla stima

| Rischio | Effetto |
|---|---|
| Dati ACF/CPT non definiti o contenuti incompleti | +5-10 h tra template e correzioni |
| Banda loghi continua + pulsante Pausa (WCAG 2.2.2) | +1-2 h oltre la stima se il CSS richiede iterazioni |
| Form: riepilogo errori e routing email per immobile | +3-5 h se richiesti |
| Performance con molte immagini grandi (Elementor DOM) | +2-4 h |
| Decisioni aperte (Settori, ottava categoria, LOSI, Impresa 1/3 pagine, Area) | ±8-20 h |
| Più cicli di feedback | +4-8 h per ciclo |

## 10. Storico stima

| Data | Stima precedente | Stima nuova | Differenza | Causa |
|---|---|---|---|---|
| 2026-10-13 | nessuna (note `DEV` senza ore) | 131-208,5 h (scenario A) | n/a | Prima stima su wireframe media fedeltà, caso Elementor Pro |

Aggiornare quando cambiano wireframe, mockup, scope o dipendenze (ACF/CPT, plugin, anti-spam, cookie, hosting). Stato successivo: `DESIGN_BASED` dopo i mockup, `FINAL_ESTIMATE` dopo review finale.
