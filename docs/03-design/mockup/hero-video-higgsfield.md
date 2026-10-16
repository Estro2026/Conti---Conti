# Hero immersiva "dentro una casa": valutazione e piano (nessuna generazione avviata)

Stato: **PROPOSTA, `WAITING_FOR_APPROVAL`**. Nessun credito Higgsfield consumato. Nel mockup la hero usa un poster (render autentico dal sito ufficiale) con movimento di camera simulato; la struttura video è già pronta (vedi "Struttura nel mockup").

## 1. Higgsfield o filmato stock/reale?

| Opzione | Realismo | Coerenza con Conti & Conti | Costo/tempo | Rischio |
|---|---|---|---|---|
| **A. Riprese reali** di un cantiere/immobile realizzato (drone/gimbal, 1 mezza giornata) | Massimo | Massima: spazi veri, materiali veri | Medio-alto | Serve un immobile finito e un videomaker |
| **B. Stock di qualità** (walkthrough di casa contemporanea) | Alto | Media: spazi non dell'impresa, da dichiarare come immagine di atmosfera | Basso | Poche scelte con stile "calcestruzzo e ottone" |
| **C. Higgsfield image-to-video** da fotografie/render veri dell'impresa | Medio-alto, se ben preparato | Alta: parte dai tuoi spazi | Medio (crediti) | Deformazioni di architettura, estetica "AI", continuità tra ambienti |

**Raccomandazione:** per credibilità e per evitare l'estetica generata, il risultato più sicuro è **A**; in alternativa **B** subito, per validare il concept. **C va usata solo se** esistono fotografie o render ad alta risoluzione di interni realizzati dall'impresa (ad esempio Ceresio 7) e si accetta di fare 3-4 clip brevi (5-6 s) concatenate, mai una sequenza unica lunga. Higgsfield è il miglior candidato per C, ma non è la scelta di default.

Conclusione operativa: finché non si decide, il mockup mostra il poster e il video si sostituisce con un file.

## 2. Concept visivo (valido per A, B o C)

Una camera a altezza occhi (1,5 m) entra in una casa contemporanea e attraversa gli spazi lentamente, come un visitatore. Nessun movimento acrobatico, nessun taglio rapido. Tema: *quello che vedi è costruito da persone*. I materiali sono quelli dell'impresa: calcestruzzo, ottone, pietra, legno.

Durata del loop: 20-24 s, formato 16:9, senza audio, loop fluido (primo e ultimo fotogramma coincidono).

## 3. Storyboard sintetico

| # | Inquadratura | Movimento | Durata | Cosa si vede |
|---|---|---|---|---|
| 1 | Ingresso | Dolly-in lento dalla soglia | 6 s | Porta aperta, luce naturale che entra, pavimento in calcestruzzo |
| 2 | Soggiorno | Carrellata laterale a sinistra | 6 s | Divano, volume in ottone, luce radente dalle finestre |
| 3 | Passaggio | Avanzamento verso un varco | 6 s | Corridoio o apertura tra due ambienti, continuità di materiali |
| 4 | Dettaglio / finestra | Dolly-in con lieve rotazione verso la luce | 6 s | Finestra, texture della parete, luce naturale; qui compaiono messaggio e CTA, in transizione verso l'anchor `#statement` |

La sovrapposizione di testo e CTA (hero attuale) resta nella metà bassa dell'inquadratura: lo storyboard tiene libero l'angolo in basso a sinistra.

## 4. Reference da preparare (se si sceglie C)

Servono **5-8 immagini** ad alta risoluzione (minimo 2000 px sul lato lungo, JPG o PNG, senza filigrane), tutte con questi criteri.

| Criterio | Indicazione |
|---|---|
| **Prospettiva** | Altezza occhi 1,4-1,6 m, ottica equivalente a 24-28 mm, linee verticali dritte. Niente grandangolo spinto né vista dall'alto. |
| **Composizione** | Camera frontale o a 30° rispetto alla parete di fondo, un punto di fuga chiaro, soggetto nel terzo centrale, margine libero a sinistra e in basso per il testo. |
| **Illuminazione** | Luce naturale da una sola direzione (finestra laterale), mattina o primo pomeriggio, temperatura 3500-4500 K, ombre morbide. Evitare controluce forti e mix di luci colorate. |
| **Stile architettonico** | Contemporaneo, essenziale: calcestruzzo o intonaco chiaro, ottone o metallo, pietra, legno naturale. Niente arredi decorativi, niente persone riconoscibili. |
| **Continuità tra ambienti** | Stessa palette in tutte le immagini (3 colori dominanti), stesse finiture del pavimento, stesso tipo di infissi, stessa temperatura di luce. Le foto devono sembrare scattate nello stesso edificio. |

Immagini da fornire (in ordine di importanza):
1. Ingresso o soglia verso l'interno, in luce.
2. Soggiorno ampio, vista laterale.
3. Corridoio o varco tra due ambienti.
4. Finestra o parete con luce radente.
5. Una vista dall'alto della pianta o un render d'insieme (serve solo a mantenere coerenti le proporzioni).
6. (Facoltativo) un dettaglio materico: ottone, pietra, legno.

Fonti utilizzabili già disponibili: il render del soggiorno del sito ufficiale (`Soggiorno5.jpg`, 1000 px, troppo piccolo per la produzione) e le foto di Ceresio 7 (spa e piscina, 1000-1080 px). Servono gli originali ad alta risoluzione da cliente o fotografo.

## 5. Workflow consigliato (C)

1. **Fotogrammi chiave** (immagini): per ogni inquadratura un'immagine di partenza e una di arrivo, partendo dalle reference. Si lavora sulle immagini perché costano meno dei video e si correggono prima.
2. **Approvazione** dei 4-5 fotogrammi da parte tua. Solo dopo si passa al video.
3. **Prova al ribasso**: una sola clip, 5 s, risoluzione bassa, per verificare geometria e movimento.
4. **Clip definitive**: image-to-video con fotogramma iniziale e finale, prompt di camera molto semplice ("slow dolly forward, steady, natural light, architectural interior, no people, no morphing, straight vertical lines").
5. **Montaggio**: sfumature di 0,5 s tra le clip, correzione colore uniforme, chiusura a loop con il primo fotogramma, esportazione H.264 1080p e 720p (mobile), più poster.
6. **Controllo qualità**: geometrie, bordi di porte e finestre, riflessi, texture che "ribollono", mani o persone con difetti.

## 6. Modello e funzioni Higgsfield più adatti

| Fase | Modello consigliato | Perché |
|---|---|---|
| Fotogrammi chiave | **GPT Image 2.5** (default Higgsfield per immagini e design) | Buona fedeltà a reference e a architettura |
| Video | **Seedance 2.5** (default video) | Image-to-video con movimenti di camera controllati |
| Coerenza tra ambienti | Riuso del fotogramma finale come iniziale della clip successiva | Mantiene lo stesso edificio |
| Variante | Clip separate in 16:9 e 9:16 solo se serve un video verticale | Evita ricreare la scena |

Funzioni da usare: image-to-video con start e end frame, parametro di durata breve, seed fisso. **Da verificare** sul servizio al momento della prova: elenco aggiornato dei modelli, durata massima per clip, costo in crediti.

## 7. Strategia per ridurre generazioni e crediti

- Lavorare per **inquadrature da 5 s**, non per sequenze lunghe: gli errori sono locali e si rifà una sola clip.
- **Fotogrammi approvati prima** del video; mai generare video da immagini non approvate.
- Una **prova a bassa risoluzione** per inquadratura; alta risoluzione solo sulle clip scelte.
- Massimo **2 tentativi per inquadratura**; un seed fisso per ogni prova per poterla riprodurre.
- Prompt corti e identici tra le clip; nessun cambio di stile.
- Riutilizzare il fotogramma finale come iniziale della clip successiva (continuità senza rigenerare).
- Verificare il costo prima di ogni lotto con il comando di stima della CLI e confermare qui prima di avviare.

**Regola del progetto:** nessuna generazione a pagamento senza la tua conferma esplicita su direzione creativa, reference e budget di crediti.

## 8. Struttura nel mockup (già pronta)

`home-a.html`, hero: `<video class="hero-video" muted playsinline loop preload="none" poster="img/hero-poster.jpg" data-src-desktop="" data-src-mobile="">` sopra al poster.
- **Per attivare il video**: compilare `data-src-desktop` (1080p) e `data-src-mobile` (720p, file più leggero).
- **Autoplay senza audio e loop fluido**: attributi `muted playsinline loop`.
- **Poster di fallback**: l'immagine resta visibile finché il video non è pronto e con movimento ridotto, risparmio dati o 2G.
- **Caricamento**: `preload="none"`, il video parte solo quando i dati sono disponibili; la dissolvenza dal poster al video è di 1,2 s; il video si mette in pausa quando esce dalla viewport.
- **Responsive**: su mobile si sceglie il file leggero; nessun layout shift (altezza = viewport).

## 9. Stato produzione (2026-10-16)

Avviata la fase 1 su richiesta dell'utente. Workspace Higgsfield "Private", piano starter, **270 crediti**; speso **11 crediti** (259 residui).

| Passo | Stato | Dettaglio |
|---|---|---|
| Fotogrammi chiave | **Fatti, da approvare** | 4 immagini 16:9 a 2688 px con GPT Image 2.5, qualità alta, riferimento di stile: render del soggiorno del sito. File in `video/keyframes/` (`kf1-4.png` originali, `kf1-4-preview.jpg` leggeri, `.json` con i parametri). Inquadrature: ingresso, soggiorno, passaggio, dettaglio finestra. |
| Clip video | **Non avviate** | In attesa di approvazione dei fotogrammi |

Costi stimati dalla CLI per le clip (Seedance 2.5, 5 s, senza audio): bozza a 720p circa 15 crediti, definitiva a 720p circa 35. Piano consigliato: 4 bozze (circa 60 crediti), poi solo le clip scelte in definitiva (circa 35 ciascuna), per restare sotto circa 200 crediti con un margine di ripetizioni.

Limite delle fotografie: sono immagini generate a partire dal render, non spazi costruiti dall'impresa; per il sito pubblico vanno dichiarate come immagini di atmosfera oppure sostituite con riprese reali.

## 10. Revisione 2026-10-16: percorso continuo (sostituisce i 4 fotogrammi separati)

I primi fotogrammi (`video/keyframes/kf1-4`) erano scene isolate e **non sono approvati**. Rifatto come cammino unico nella stessa casa, ogni immagine generata dalla precedente come riferimento (crediti residui 245,25).

| # | Posizione della camera | File |
|---|---|---|
| P0 | Fuori, a 3 m dalla porta d'ingresso aperta (anta in ottone) | `video/keyframes/path/p0.png` |
| P1 | Sulla soglia, guarda l'atrio | `path/p1.png` |
| P2 | Dentro, all'ingresso del soggiorno | `path/p2.png` |
| P3 | Nel soggiorno, davanti all'apertura verso l'altra stanza | `path/p3.png` |
| P4 | Nella sala da pranzo e cucina | `path/p4.png` |

Clip previste (Seedance 2.5, modalità riferimento con immagine iniziale e finale, 5 s, 16:9, senza audio): P0→P1 (varcare la porta), P1→P2 (attraversare l'atrio), P2→P3 (avvicinarsi all'apertura), P3→P4 (entrare nella seconda stanza). Totale 20 s, collegate perché la fine di una clip è l'inizio della successiva. Prompt di camera: *slow steady forward dolly at walking pace, eye level, no cuts, no morphing, straight vertical lines*.

Costi (stima CLI): bozze 720p circa 15 crediti ciascuna (60 in totale), definitive circa 35 ciascuna (140 in totale).
**Non avviate: in attesa di conferma dell'utente sul percorso e sul budget.**

## 11. Percorso esteso: 11 fotogrammi (2026-10-16)

Aggiunti 6 fotogrammi (4 intermedi e 2 successivi). Crediti spesi in totale 44 su 270 (226 residui). Panoramica: `video/keyframes/percorso-contact-sheet.jpg` (ordine di lettura da sinistra a destra, dall'alto in basso).

| Ordine | File | Camera |
|---|---|---|
| 1 | `path/p0` | Fuori, a 3 m dalla porta aperta |
| 2 | `path/p0b` | A 1,5 m dalla porta |
| 3 | `path/p1` | Sulla soglia |
| 4 | `path/p1b` | 2 m dentro, atrio verso il soggiorno |
| 5 | `path/p2` | Ingresso del soggiorno |
| 6 | `path/p2b` | A metà soggiorno verso l'apertura in ottone |
| 7 | `path/p3` | Davanti all'apertura verso la sala da pranzo |
| 8 | `path/p3b` | Dentro il vano della porta in ottone |
| 9 | `path/p4` | Sala da pranzo e cucina |
| 10 | `path/p5` | Oltre il bancone, verso il corridoio delle camere |
| 11 | `path/p6` | In camera da letto, vetrata sul terrazzo |

Clip proposte (Seedance 2.5, immagine iniziale e finale, senza audio, 5 s ciascuna):
1. P0 → P1 (varcare la porta, con P0b come controllo di coerenza)
2. P1 → P2 (atrio, con P1b)
3. P2 → P3 (soggiorno, con P2b)
4. P3 → P4 (passaggio nella sala da pranzo, con P3b)
5. P4 → P6 (cucina e corridoio fino alla camera, con P5)

Totale 25 s. Budget consigliato: 2 bozze di verifica (circa 30 crediti) sulle prime due clip, poi le 5 definitive a circa 35 crediti (175): circa 205 su 226. Per una versione più corta basta tenere solo le clip 1-4 (20 s, circa 140 crediti più bozze).
**Non avviate: in attesa di conferma dell'utente.**

## 12. Percorso a 16 fotogrammi: apertura sulla porta, uscita dalla finestra (2026-10-16)

Il primo fotogramma ora è una veduta ampia e simmetrica con la porta in ottone al centro e molti dettagli intorno (olivi, vasi di rosmarino, sentiero in pietra, lampada a parete, finestre con il soggiorno). Il percorso termina uscendo dalla finestra della camera sul terrazzo e verso un'inquadratura molto luminosa, quasi bianca, pensata per sfumare nella sezione sotto la hero. Panoramica: `video/keyframes/percorso-completo-sheet.jpg`. Il primo fotogramma è anche il poster della hero nel mockup. Crediti: 209,5 residui (60,5 spesi).

Ordine: `pa` (esterno ampio) > `pb` > `p0` > `p0b` > `p1` > `p1b` > `p2` > `p2b` > `p3` > `p3b` > `p4` > `p5` > `p6` > `p7` (alla finestra) > `p8` (sul terrazzo) > `p9` (finale luminoso).

Costi Seedance 2.5, senza audio, 720p: **7 crediti al secondo** (4 s = 28, 5 s = 35, 6 s = 42); a 480p 5 s = 15 crediti.

Clip consigliate (6 clip da 4 s = 24 s, circa **168 crediti**, restano circa 41 per una o due ripetizioni):
1. `pa` > `p0` (avvicinamento alla porta, con `pb` come riferimento)
2. `p0` > `p1` (varcare la porta, con `p0b`)
3. `p1` > `p3` (atrio e soggiorno fino all'apertura in ottone, con `p1b`, `p2`, `p2b` come riferimenti)
4. `p3` > `p4` (dal passaggio alla sala da pranzo, con `p3b`)
5. `p4` > `p6` (cucina, corridoio, camera, con `p5`)
6. `p6` > `p9` (alla finestra, sul terrazzo, verso la luce, con `p7` e `p8`)

Il budget lascia poco margine: se si vogliono più ripetizioni conviene ricaricare crediti oppure ridurre a 5 clip. Alternativa economica: stessa sequenza a 480p (circa 3 crediti al secondo, 72 crediti in tutto) solo come anteprima di movimento.
**Non avviate: in attesa di conferma dell'utente.**

Integrazione nella pagina (a clip pronte): il video termina sul bianco luminoso e la hero si chiude con una dissolvenza verso lo sfondo chiaro della sezione "Dichiarazione"; il poster resta il primo fotogramma.

## 13. Avvio delle clip (2026-10-16)

Avviata la generazione su richiesta dell'utente ("Vai con il video").

- **Seedance 2.5 non è disponibile**: richiede il piano Pro o Ultimate (il piano attuale è starter). I tentativi sono stati rifiutati senza addebito.
- **Modello usato: Seedance 2.0 Mini** (immagine iniziale e finale, 5 s, 720p, senza audio): costa solo **5 crediti a clip**. Alternative disponibili sul piano starter e testabili: Wan 2.7 (7,5 crediti per 5 s), Seedance 1.5 Pro (4,8 crediti per 4 s). Veo 3.1 Lite richiede 8 s.
- **Coda lenta e limite di 2 job paralleli** del piano starter: ogni clip impiega parecchi minuti. Un job di prova (`p0` > `p1`) e la clip 1 (`pa` > `p0`) sono in lavorazione; le altre 4 (`p1`>`p3`, `p3`>`p4`, `p4`>`p6`, `p6`>`p9`) vengono inviate appena si libera uno slot.
- Crediti: 199,5 residui (10,5 spesi per le due clip avviate). Il budget totale previsto per le 6 clip è circa 30 crediti: rimane ampio margine per rifare le clip riuscite male o per provare un modello migliore.
- Quando le clip sono pronte: unione con `ffmpeg` in un unico file con fotogrammi chiave ravvicinati (`video/hero-scrub.mp4` e versione mobile `hero-scrub-m.mp4`) per poterlo scorrere avanti e indietro con lo scroll.

## 14. Hero guidata dallo scroll (mockup)

- La hero è una sezione alta circa 5 schermi con la scena fissa (sticky): scorrendo il video avanza, quindi si entra sempre più in profondità nella casa, dall'esterno fino alla finestra e al terrazzo.
- Titolo e CTA sono piccoli, in basso a sinistra, e svaniscono dopo i primi 12% di scroll per lasciare libera la vista. Una barra di avanzamento "Entra in casa" resta in basso al centro.
- Alla fine (ultimo 12% di scroll) il fotogramma luminoso sfuma nel colore della sezione successiva ("Dichiarazione"), così hero e contenuto si collegano senza stacco.
- Senza il file video, con movimento ridotto o risparmio dati: hero statica sul primo fotogramma, nessuno scroll fisso.
