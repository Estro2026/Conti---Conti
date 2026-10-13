# Precision / Layout QA

## 1. Obiettivo

Verificare la precisione geometrica e la coerenza visiva dell'interfaccia.

Questo controllo deve essere eseguito su:

- wireframe;
- mockup;
- implementazione frontend;
- desktop;
- schermi zoomati;
- tablet;
- mobile;
- stati interattivi.

## 2. Allineamenti

Controllare:

- allineamento sinistro;
- allineamento destro;
- centratura;
- allineamento verticale;
- baseline;
- allineamento tra colonne;
- allineamento tra sezioni analoghe;
- allineamento tra icone e testo;
- allineamento tra numeri, label e titoli;
- allineamento CTA;
- allineamento form.

### Problemi rilevati
-

## 3. Margini

Controllare:

- margine superiore;
- margine inferiore;
- margini laterali;
- distanza tra sezioni;
- distanza tra blocchi;
- coerenza tra pagine;
- coerenza tra breakpoint.

### Problemi rilevati
-

## 4. Padding

Controllare:

- card;
- bottoni;
- form;
- input;
- sezioni;
- container;
- modal;
- accordion;
- menu;
- footer;
- badge;
- tag.

### Problemi rilevati
-

## 5. Gap

Controllare:

- gap tra colonne;
- gap tra card;
- gap tra icona e testo;
- gap tra titolo e sottotitolo;
- gap tra testo e CTA;
- gap tra label e input;
- gap tra elementi ripetuti;
- gap tra contenuti dinamici.

### Problemi rilevati
-

## 6. Griglia

Verificare:

- numero colonne;
- gutter;
- container;
- max-width;
- offset;
- moduli;
- allineamento alla griglia;
- eccezioni intenzionali.

### Problemi rilevati
-

## 7. Ritmo verticale

Controllare:

- distanza tra hero e sezione successiva;
- distanza tra titolo e contenuto;
- distanza tra paragrafi;
- distanza tra gruppi;
- distanza tra sezioni;
- ritmo coerente lungo la pagina.

### Problemi rilevati
-

## 8. Tipografia

Controllare:

- font-size;
- line-height;
- weight;
- letter-spacing;
- larghezza righe;
- baseline;
- wrapping;
- altezza blocchi;
- differenza tra gerarchie.

### Problemi rilevati
-

## 9. Componenti ripetuti

Confrontare tutti i componenti equivalenti:

- card;
- bottoni;
- tag;
- form;
- accordion;
- FAQ;
- case study;
- testimonial;
- CTA;
- header;
- footer.

Verificare che condividano:

- dimensioni;
- padding;
- gap;
- radius;
- border;
- comportamento;
- allineamento.

### Eccezioni intenzionali
-

## 10. Stati interattivi

Confrontare:

- default;
- hover;
- focus;
- active;
- disabled;
- open;
- closed.

Nessun componente deve spostarsi involontariamente quando cambia stato.

Controllare:

- dimensioni;
- posizione;
- padding;
- border;
- font weight;
- icone;
- contenuti;
- transizioni.

## 11. Immagini

Controllare:

- dimensioni;
- aspect ratio;
- crop;
- focal point;
- object-fit;
- object-position;
- bounding box;
- allineamento;
- distanza dal testo;
- coerenza tra immagini equivalenti.

## 12. Icone

Controllare:

- dimensione;
- stile;
- stroke / fill;
- bounding box;
- centratura;
- distanza dal testo;
- allineamento ottico;
- coerenza.

## 13. Border e radius

Controllare:

- spessore;
- colore;
- radius;
- coerenza tra componenti;
- stati hover/focus;
- eventuali incongruenze.

## 14. Schermi zoomati

Verificare:

- gerarchia titoli;
- allineamenti;
- gap;
- larghezza form;
- card;
- colonne;
- overflow;
- componenti troppo compressi;
- elementi sovrapposti;
- elementi tagliati.

## 15. Tablet

Controllare:

- grid;
- colonne;
- padding;
- gap;
- dimensione componenti;
- navigazione;
- form;
- immagini;
- orientamento.

## 16. Mobile

Controllare:

- padding laterale;
- larghezza contenuti;
- gap verticali;
- touch target;
- card;
- CTA;
- form;
- immagini;
- footer;
- menu;
- sticky;
- safe area.

## 17. Confronto tra pagine

Verificare che pagine equivalenti abbiano:

- stessa posizione dei titoli;
- stessi margini;
- stessa larghezza container;
- stessa logica di spacing;
- stessa gerarchia;
- stessi componenti;
- stessa logica responsive.

## 18. Coerenza visiva tra pagine

Verificare che tutte le pagine dello stesso sito condividano un linguaggio visivo e comportamentale coerente.

### CTA

Controllare:

- stile delle CTA primarie;
- stile delle CTA secondarie;
- dimensioni;
- padding;
- radius;
- icone;
- posizione dell'icona;
- font;
- peso;
- hover;
- focus;
- active;
- click;
- disabled;
- transizioni;
- comportamento mobile.

Le CTA con la stessa funzione devono avere lo stesso comportamento e la stessa gerarchia visiva in tutte le pagine.

### Radius

Controllare coerenza di:

- card;
- bottoni;
- form;
- input;
- immagini;
- modal;
- badge;
- tag;
- elementi decorativi.

Evitare radius diversi senza una motivazione progettuale precisa.

### Hover

Per componenti equivalenti verificare:

- stesso tipo di feedback;
- stessa intensità;
- stessa durata;
- stessa trasformazione;
- stesso comportamento del testo;
- stesso comportamento delle immagini;
- stesso trattamento di border e background;
- assenza di spostamenti involontari.

### Click / Active

Controllare:

- feedback al click;
- stato active;
- stato selected;
- elementi persistenti;
- accordion;
- menu;
- tab;
- filtri;
- card cliccabili;
- CTA.

Lo stesso tipo di interazione deve produrre un feedback coerente in tutto il sito.

### Focus

Verificare:

- stesso stile focus;
- stessa visibilità;
- stesso offset;
- stessa logica tra componenti equivalenti.

### Card

Confrontare:

- struttura;
- padding;
- radius;
- proporzioni;
- immagini;
- titoli;
- CTA;
- tag;
- hover;
- active;
- responsive.

### Tipografia

Verificare tra tutte le pagine:

- hero title;
- section title;
- sottotitoli;
- body;
- label;
- CTA;
- meta;
- line-height;
- tracking;
- weight.

### Spacing system

Verificare che margini, padding e gap seguano una scala coerente e non valori casuali pagina per pagina.

### Immagini

Controllare:

- stile fotografico;
- trattamento;
- crop;
- aspect ratio;
- radius;
- proporzioni;
- relazione con il testo;
- comportamento hover.

### Motion

Controllare:

- durata;
- easing;
- intensità;
- reveal;
- hover;
- scroll animation;
- transizioni;
- comportamento su touch;
- reduced motion.

Le animazioni dello stesso sito devono sembrare parte dello stesso sistema.

### Header e footer

Verificare:

- dimensioni;
- allineamenti;
- comportamento sticky;
- hover;
- active;
- menu;
- CTA;
- transizioni;
- comportamento responsive.

### Responsive

Controllare che componenti equivalenti reagiscano allo stesso modo agli stessi breakpoint.

### Segnalazione incoerenze

Per ogni differenza indicare:

- Pagina A:
- Pagina B:
- Componente:
- Differenza:
- Possibile causa:
- È intenzionale: sì / no / da verificare
- Correzione proposta:

### Regola

Una differenza non è automaticamente un errore.

Se non è chiaramente motivata dal contenuto, dalla funzione o dal contesto, segnalarla come:

`INCOERENZA CROSS-PAGE DA VERIFICARE`

L'obiettivo è evitare che pagine appartenenti allo stesso sito sembrino costruite con sistemi UI differenti.

## 19. Tolleranza

Segnalare:

### Critico
Differenza che rompe layout, gerarchia o usability.

### Medio
Incoerenza chiaramente percepibile.

### Minore
Imprecisione visuale che non compromette l'uso ma riduce la qualità.

## 20. Checklist

- [ ] Allineamenti verificati
- [ ] Margini verificati
- [ ] Padding verificati
- [ ] Gap verificati
- [ ] Grid verificata
- [ ] Ritmo verticale verificato
- [ ] Tipografia verificata
- [ ] Componenti ripetuti verificati
- [ ] Hover verificato
- [ ] Focus verificato
- [ ] Immagini verificate
- [ ] Icone verificate
- [ ] Border verificati
- [ ] Radius verificati
- [ ] Zoom verificato
- [ ] Tablet verificato
- [ ] Mobile verificato
- [ ] Cross-page consistency verificata

## 21. Report

Per ogni problema indicare:

- Pagina:
- Sezione:
- Elemento:
- Tipo problema:
- Stato:
- Valore attuale:
- Valore atteso:
- Priorità:
- Correzione proposta:

## 22. Regola finale

Non correggere automaticamente differenze che potrebbero essere intenzionali.

Se una discrepanza sembra una scelta progettuale, segnalarla come:

`DA VERIFICARE`

e attendere conferma prima di modificarla.
