# Piano approvato: sito a blocchi riusabili in 83 h, con rivestimento grafico incluso

Stato: **APPROVATO dall'utente il 2026-10-15** (83 h, tutto incluso). Non modifica contenuti, pagine o sezioni del wireframe. Nessun contenuto, pagina o sezione cambia: cambia l'architettura con cui viene costruito. Confronta con [development-plan-83h.md](development-plan-83h.md).

## Idea

Il costo non sta nelle pagine ma nel numero di elementi *diversi* da costruire. Invece di ~40 sezioni uniche, il sito usa **10 blocchi strutturali** e **1 sistema di token grafici**. Ogni pagina è un assemblaggio di blocchi. Il rivestimento grafico (mockup) si applica una sola volta ai token e ai blocchi, non pagina per pagina.

Regola: nessun JS custom, nessuna animazione che richieda codice; solo CSS moderno e widget nativi Elementor Pro.

## 1. Architettura

| Livello | Cosa | Perché costa poco |
|---|---|---|
| Token | Colori, tipografia, spaziatura, raggi, filetti, ombre, ritmo dei fondi (nero / grigio / bianco / bordeaux) come Global di Elementor | Il mockup si applica cambiando valori, non widget |
| Blocchi | 10 pattern riusati in tutte le pagine (sotto) | Costruiti una volta, ereditati |
| Pagine | Assemblaggio di blocchi con Theme Builder e Loop | 1 template per tipo di contenuto |

## 2. I 10 blocchi e le soluzioni

| # | Blocco | Dove compare | Soluzione bella e leggera |
|---|---|---|---|
| 1 | Hero | Home, Impresa, Cantieri, Progetto, Residenza | Un solo componente con 3 varianti (foto piena, split, solo testo) cambiate da una classe. Titolo grande, anno 1987 come segno grafico (testo, non immagine). |
| 2 | Tavola a filetti | Servizi, mestieri, zone, certificazioni, impegni, FAQ locali, dati scheda | Un solo stile: righe a filetto, etichetta + testo, numero a sinistra. È la "firma" del sito: sostituisce card, box e icone. |
| 3 | Dato grande | 1987, 40 anni, 180/1/300/5, 3 immobili | Testo gigante in Archivo, nessun counter animato. Effetto "cartello di cantiere", costo zero. |
| 4 | Sezione editoriale | Storia, Massimo, Persone, Home | Immagine al vivo + testo, 2 colonne alternabili da una classe. |
| 5 | Card (Loop Item unico) | Progetti, immobili, articoli, categorie | Un solo Loop Item con 4 varianti da campo e classe. Foto con rapporto fisso e testo sotto. |
| 6 | Galleria + lightbox | Progetto, Residenza | Griglia nativa e lightbox integrata. Nessun mosaico custom. |
| 7 | Form | Preventivo, richiesta immobile, candidatura (upload CV) | Un widget Form, 3 configurazioni, stile unico dei campi. |
| 8 | Accordion | FAQ, FAQ categorie | Nested Accordion nativo, riusato. |
| 9 | Fascia CTA + sticky mobile | Tutte le pagine | Template globale. |
| 10 | Carosello loghi + mappa zone | Home | Carousel nativo con pausa; mappa SVG fissa con pin. |

## 3. Idee innovative e a costo quasi zero

| Idea | Come | Effetto |
|---|---|---|
| Anteprima categorie senza JS | Elenco numerato; al passaggio/focus l'immagine cambia con `:has()` in CSS | Resta l'effetto "indice con anteprima" che hai approvato, senza codice |
| Mappa zone accesa da CSS | Pin e riga dell'elenco si evidenziano insieme con `:has()` | Recupera la sincronia a costo zero |
| Transizioni tra pagine | CSS View Transitions (cross-document), con fallback | Navigazione fluida, 2-3 righe di CSS, progressive enhancement |
| Rivelazione allo scroll | CSS scroll-driven animations (`animation-timeline`), disattivate con riduci movimento | Ritmo editoriale senza libreria |
| Numeri e filetti come grafica | Tipografia e `border` al posto di illustrazioni, icone o foto stock | Identità riconoscibile, nessun asset da produrre |
| Ritmo dei fondi | Una classe di sezione (nero, grigio, bianco, bordeaux) alterna le pagine | Cambia l'aspetto di tutto il sito senza toccare le pagine |

## 4. Budget in ore (83 h, tutto incluso)

| Blocco di lavoro | Ore |
|---|---|
| Setup: ambiente 1,5; CPT Progetti + Immobili con ACF 3,5; plugin e impostazioni 2 | 7 |
| **Rivestimento grafico**: token 3; stili pulsanti, form, card, filetti 3; immagini, effetti e motion globali 3 | 9 |
| Blocchi: header e menu 2; footer + CTA 1,5; hero 1,5; sezione editoriale 1; tavola a filetti 1,5; dato grande 0,5; card Loop 3; galleria 1; form 3; accordion 1; sticky mobile 1; breadcrumb, 404, legali 1; carosello loghi 1; mappa zone 1 | 20 |
| Pagine (solo assemblaggio): Home 2; Cantieri 1,5; Categoria 2; Progetto 2,5; In vendita 1; Residenza 1,5; Impresa 3,5; Contatti 1; Lavora con noi 1,5; FAQ 1; Blog 1,5; Articolo 2; Thank you page 0,5 | 21,5 |
| Qualità (test mirati sui template, qualità incorporata nei blocchi) | 12,5 |
| **Voci prima fuori budget, ora incluse** (sotto) | 8,5 |
| Margine | 4,5 |
| **Totale** | **83** |

### Voci ora incluse (8,5 h)

| Voce | Ore | Come si tiene in questo budget |
|---|---|---|
| Redirect 301 | 1,5 | Mappatura delle URL principali (Ceresio 7, In vendita, categorie, Impresa, Contatti) importata da CSV nel plugin redirect; resto con regola generale |
| Cookie banner e tracking | 1,5 | Banner con consenso (Iubenda, già previsto nel footer) + GA4 base via un solo tag; nessun evento avanzato |
| Anti-spam, SMTP, test email | 1,5 | Honeypot + Turnstile, SMTP con una casella mittente, prova di consegna dei 3 form |
| Contenuti pilota | 2,5 | 1 progetto, 1 immobile, 1 categoria completi per validare i template; il resto lo carica il cliente |
| Go-live | 1,5 | DNS, backup, noindex off, controlli finali, consegna |

## 5. Condizioni perché i numeri reggano

1. **Mockup approvato prima dello sviluppo**, sui blocchi e non sulle singole pagine.
2. ACF e Elementor Pro attivi (VERIFY), Loop Grid su CPT supportato.
3. Nessun JS custom; effetti solo CSS.
4. Dal cliente, prima di partire: testi, foto, loghi e dati; elenco delle URL attuali; accessi a hosting e dominio; account Iubenda, GA4/GTM e chiavi Turnstile; casella email per SMTP.
5. Un solo ciclo di feedback.
6. Il caricamento dei contenuti oltre i 4 pilota è del cliente.

## 6. Ancora fuori dalle 83 h

- Migrazione dei contenuti dal sito attuale e caricamento massivo.
- Audit di accessibilità certificato.
- Pagine per zona (eliminate).
- Eventi di tracciamento avanzati, CRM, newsletter, widget Google Reviews di terzi.
- Contingenza consigliata +10-15%.

## 7. Rischi

- Stime molto sotto il minimo del documento originale: reggono solo rispettando l'architettura a blocchi.
- Margine di 4,5 h (circa 5%): qualsiasi ritardo sulle condizioni della sezione 5, o un imprevisto su Elementor/ACF, sfora il budget.
- Qualità ridotta a verifica essenziale (12,5 h): nessuna copertura su ogni pagina e ogni dispositivo.
- Colonna sticky della scheda residenza e campo nascosto dinamico: rischio noto (+1 h).
- Il carosello nativo cambia leggermente il movimento della banda loghi.

## 8. Decisioni richieste

1. Approvare l'architettura a blocchi e il rivestimento grafico incluso (9 h).
2. Accettare un margine di 4,5 h, oppure indicare cosa togliere per averne di più.
3. Fornire i prerequisiti della sezione 5 (URL, account, chiavi).

## 9. Dato realistico: solo Home A

Calcolo della sola Home A (la scelta tra A e B si fa più avanti; ne verrà sviluppata una). Esclusi header, footer, sticky mobile, design system e setup, che servono a tutto il sito. INFERENZA, dalle note DEV del wireframe e dal documento di stima.

| Parte di Home A | Ore (min-max) | Fonte |
|---|---|---|
| Assemblaggio delle sezioni (Massimo, immobili, recensioni, mappa, blog, CTA con template condivise) | 5-8 | Doc di stima, Home |
| Hero con anno 1987 in basso | 3-4,5 | Nota DEV hero |
| Categorie a elenco con miniatura (senza anteprima grande) | 1,5-2 | Nota DEV categorie |
| Righe editoriali dei 3 progetti | 2-3 | Nota DEV righe |
| Banda loghi (Carousel nativo + pausa) | 2-3 | Nota DEV loghi |
| Mappa zone fissa | 1,5-2,5 | Nota DEV mappa |
| **Totale Home A con i suoi componenti** | **15-23** | |

Nel piano da 83 h alla Home A sono assegnate circa 5,5-6,5 h (assemblaggio 2 + hero 1,5 + loghi 1 + mappa 1, più sezione editoriale 1). Il resto è nei blocchi condivisi (card Loop, tavola, galleria) e nel design system.

Lettura: se i blocchi riusati dalle altre pagine (hero, card, sezione editoriale) vengono ammortizzati sul sito, il costo marginale della Home A resta basso; se la Home viene costruita per prima e da sola, il costo reale è 15-23 h. Differenza rispetto al piano: circa 9-17 h da tenere d'occhio, a carico del margine (4,5 h) o delle altre pagine.
