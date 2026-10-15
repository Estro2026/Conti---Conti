# Contatore ore: da scope completo a 83 h

Stato: **ARCHIVIATO, sostituito dal piano approvato** in [proposta-83h-sistema-a-blocchi.md](proposta-83h-sistema-a-blocchi.md) (83 h, tutto incluso, 2026-10-15). Il registro sotto resta come storico delle semplificazioni applicate al wireframe.

Fonti: [development-estimation-85h.md](development-estimation-85h.md) (totale base) e note DEV del wireframe (delta). INFERENZA/PROPOSTA, non garantite. Una sola home sviluppata (A o B). "Lavora con noi" incluso (4-6 h).

## 1. Punto di partenza ricostruito

Il documento di stima conta 135-214,5 h. Le note DEV del wireframe, aggiunte dopo l'alta fedeltà, stimano di più per queste voci:

| Voce | Doc di stima (min-max) | Note DEV wireframe (min-max) | Delta non contato |
|---|---|---|---|
| Scheda progetto | 6-9 | 7-10,5 | +1-1,5 |
| Scheda residenza | 6-9 | 7-10 | +1 |
| Categoria | 5-8 | 6-10 | +1-2 |
| Contatti | 4-6 | 4,5-7 | +0,5-1 |
| FAQ | 2,5-4 | 4-6 | +1,5-2 |
| Cantieri | 4-6 | 6-8,5 | +2-2,5 |
| Impresa (con tab e Servizi) | 8-12 | 11-17,5 | +3-5,5 |
| Home: categorie con anteprima | ~1,5 (tessere) | 6-9 | +4,5-7,5 |
| Home: mappa zone | non contata a parte | 3-5 | +3-5 |
| Home: blocco indicatori + banda loghi | 4,5-7,5 (B5+B6) | 6-9 | +1,5 |
| Home: hero (con anno) | 2-3 (B4) | 3-4,5 | +1-1,5 |
| **Totale delta** | | | **+20-31** |

| | Min | Max |
|---|---|---|
| Totale doc di stima | 135 | 214,5 |
| Delta note DEV | +20 | +31 |
| **Scope come disegnato (partenza)** | **155** | **245,5** |
| Budget | 83 | 83 |
| **Da recuperare in tutto** | **72** | **162,5** |

Non contati (incerti): righe editoriali Home 2-3 h (probabilmente dentro "assemblaggio" 5-8 h), mappa ridisegnata su base cartografica +1-2 h, 'Espandi tutto' FAQ +1 h.

## 2. Registro tagli e semplificazioni (rispetto alla partenza)

| # | Intervento | Recuperate (min-max) | Cumulato | Stato |
|---|---|---|---|---|
| 1 | Cantieri: filtri categoria | 0,5-1 | 0,5-1 | Applicato |
| 2 | Cantieri: sezione In evidenza | 1-1,5 | 1,5-2,5 | Applicato |
| 3 | Categoria: sezione Altre categorie | 0,5-1 | 2-3,5 | Applicato |
| 4 | Blog: filtri argomento | 0-0,5 | 2-4 | Applicato |
| 5 | FAQ: indice laterale | 1-1,5 | 3-5,5 | Applicato |
| 6 | Impresa: indice ancore in hero | 0,5 | 3,5-6 | Applicato |
| 7 | Contatti: zone senza pagine, elenco semplice | 0 | 3,5-6 | Applicato |
| 8 | Home: indicatori numerici (5 numeri + quote + motion) | 2,5-3,5 | 6-9,5 | Applicato |
| 9 | Pagine per zona (area.html) eliminate; zone non cliccabili | 0 (già fuori dal totale) | 6-9,5 | Applicato |
| 10 | Impresa: Metodo a 4 card statiche (via tab, count-up, JS) | 3-5 | 9-14,5 | Applicato |
| 11 | Home: categorie statiche | 0 | 9-14,5 | Provato e ripristinata la versione dinamica su richiesta (6-9 h) |
| 12 | Qualità ottimizzata: responsive, accessibilità, SEO, performance, QA browser, correzioni (da 25-42 h a 15-24 h, test mirati sui template, qualità incorporata nei componenti) | 10-18 | 19-32,5 | Applicato al piano |
| 13 | Home: categorie con dissolvenza semplice (via tendina, contatore a rullo, sticky) | 2,5-4 | 21,5-36,5 | Applicato |
| 14 | Home: mappa zone fissa (via accensione sincronizzata e pulsazione) | 1,5-2,5 | 23-39 | Applicato |
| 15 | Home: banda loghi con Carousel nativo + pausa | 1-2 | 24-41 | Applicato (note; il prototipo mostra ancora la banda continua) |
| 16 | CSS condiviso: card, filetti, griglie come classi globali | 2-3 | 26-44 | Applicato (note) |
| 17 | Gallerie progetto e residenza: griglia uniforme | 1-1,5 | 27-45,5 | Applicato |
| 18 | Hero: un solo crop con punto focale | 0,5-1 | 27,5-46,5 | Applicato (note) |
| 19 | Impresa: timeline senza tacche | 0,5-1 | 28-47,5 | Applicato |
| 20 | Categoria: FAQ locali scritte a mano | 0,5-1 | 28,5-48,5 | Applicato (note) |

| | Min | Max |
|---|---|---|
| Recuperate finora | 28,5 | 48,5 |
| **Da recuperare ancora** | **43,5** | **114** |

Calcolo: 155 - 28,5 = 126,5 h (min) e 245,5 - 48,5 = 197 h (max) contro 83 h.

## 3. Listino tagli possibili (ore dalle note e dal doc di stima)

| Voce | Ore (min-max) | Impatto |
|---|---|---|
| Home: categorie statiche invece di anteprima dinamica | 4,5-7,5 | Perde l'anteprima al passaggio del mouse |
| Home: mappa zone semplificata (immagine statica / elenco) | 2-4 | Meno interattiva |
| Blog + Articolo + card articolo in Home | 8-12 | Fase 2, 3 articoli SEO |
| Pagina FAQ | 2,5-6 | FAQ restano in Contatti/categorie |
| Lavora con noi (pagina + form CV) | 4-6 | Esclusa o a carico di altri |
| Impresa: timeline e persone semplificate | 1-2 | Layout |
| Cookie banner, tracking | 2-4 | A carico di altri |
| Anti-spam, SMTP, test email | 1,5-3 | A carico di altri |
| Contenuti pilota | 4-6 | Template validati tardi |
| Redirect e mappatura URL | 2-4 | Rischio SEO |
| Progetti simili, stampa, FAQ locali | 2-3,5 | Meno contenuti nei template |
| Home snella (senza recensioni, zone, blog) | 2-4 | Composizione home |
| Banda loghi con Carousel nativo | 1-2 | Motion |
| Categorie come filtro, non pagine | 5-8 | IA e SEO |
| Immobili senza CPT/Loop | 3-5 | Manutenzione |
| Residenza senza sticky/documenti dinamici | 1,5-2,5 | Conversione |
| Rifiniture alta fedeltà (Progetto, Residenza, Categoria, Contatti, Cantieri) | circa 5-8 | Stile meno rifinito |
| Riserve QA già ottimizzate (riga 12): ulteriore riduzione solo con rischio qualità | | Qualità |

Non incluso in nessuno scenario: copywriting, foto, caricamento contenuti, hosting, licenze, migrazione, contingenza 10-15%.
