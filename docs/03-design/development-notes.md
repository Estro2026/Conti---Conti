# Development Notes & Estimation

## 1. Obiettivo

Tradurre wireframe e mockup in indicazioni concrete per lo sviluppo.

Questo documento deve:

- annotare componenti e comportamenti;
- evidenziare interazioni;
- segnalare dipendenze tecniche;
- chiarire cosa è statico e cosa è dinamico;
- indicare integrazioni;
- stimare la complessità;
- stimare le ore di sviluppo;
- evidenziare rischi e variabili che possono modificare la stima.

## 2. Regole generali

Ogni nota di sviluppo deve indicare:

- Pagina:
- Sezione:
- Componente:
- Comportamento:
- Desktop:
- Tablet:
- Mobile:
- Touch:
- Animazioni:
- Stato hover:
- Stato focus:
- Stato active:
- Contenuto dinamico:
- CMS:
- Integrazioni:
- Note tecniche:
- Complessità:
- Stima ore:

## 3. Tipologie di complessità

### Semplice
Esempi:
- layout statico;
- card;
- CTA;
- griglia;
- accordion semplice;
- sezione testuale.

### Media
Esempi:
- carousel;
- filtri;
- sticky;
- form con validazione;
- componenti responsive articolati;
- contenuti dinamici CMS;
- animazioni moderate.

### Alta
Esempi:
- interazioni custom;
- scroll-driven animation;
- configuratori;
- integrazioni API;
- componenti con molti stati;
- sincronizzazione dati;
- motion complesso;
- logiche JavaScript avanzate.

## 4. Annotazioni per pagina

Ripetere per ogni pagina.

### Pagina

#### Sezione / componente

- Nome:
- Descrizione:
- Stato:
- Comportamento:
- Interazione:
- Responsive:
- Touch:
- Accessibilità:
- CMS:
- Contenuto dinamico:
- Dipendenze:
- Note frontend:
- Complessità:
- Stima ore:

## 5. Componenti globali

### Header
- Note:
- Complessità:
- Ore:

### Menu desktop
- Note:
- Complessità:
- Ore:

### Menu mobile
- Note:
- Complessità:
- Ore:

### Footer
- Note:
- Complessità:
- Ore:

### Form
- Note:
- Complessità:
- Ore:

### Cookie / privacy
- Note:
- Complessità:
- Ore:

### Componenti condivisi
-

## 6. Motion

Per ogni animazione:

- Elemento:
- Trigger:
- Durata:
- Easing:
- Scroll / hover / load / click:
- Desktop:
- Mobile:
- Touch:
- Reduced motion:
- Fallback:
- Complessità:
- Ore:

## 7. Contenuti dinamici

Per ogni contenuto dinamico:

- Tipo:
- Origine dati:
- CMS:
- Tassonomia:
- Filtri:
- Ordinamento:
- Pagination:
- Search:
- Stati vuoti:
- Loading:
- Error:
- Complessità:
- Ore:

## 8. Integrazioni

### Form / CRM
-

### Analytics
-

### Newsletter
-

### Booking
-

### Mappe
-

### Social
-

### API
-

### Plugin
-

### Altro
-

Per ogni integrazione indicare:

- dipendenza;
- configurazione;
- sviluppo custom;
- test;
- stima ore.

## 9. Responsive development effort

Stimare separatamente eventuale lavoro aggiuntivo per:

- Laptop / zoom
- Tablet
- Mobile
- Touch
- Orientamento
- Browser compatibility

## 10. Browser QA effort

- Chrome:
- Safari:
- Firefox:
- Edge:
- iOS Safari:
- Android Chrome:

## 11. Accessibilità

Considerare sviluppo e test relativi a:

- keyboard navigation;
- focus;
- semantic HTML;
- ARIA;
- form;
- errori;
- motion reduction;
- screen reader;
- contrasto;
- touch target.

## 12. Performance

Valutare:

- immagini;
- video;
- font;
- JavaScript;
- animation;
- lazy loading;
- code splitting;
- third-party;
- Core Web Vitals.

## 13. Stima per pagina

| Pagina | UI statica | Responsive | JS / interazioni | CMS / integrazioni | QA | Totale |
|---|---:|---:|---:|---:|---:|---:|
| | | | | | | |

## 14. Stima per componente globale

| Componente | Ore |
|---|---:|
| Header | |
| Menu | |
| Footer | |
| Form | |
| Componenti condivisi | |
| Motion globale | |
| Altro | |

## 15. Stima complessiva

### Sviluppo frontend
- Min:
- Max:

### CMS / integrazioni
- Min:
- Max:

### Responsive
- Min:
- Max:

### QA
- Min:
- Max:

### Accessibilità
- Min:
- Max:

### Totale progetto
- Min:
- Max:

## 16. Esclusioni dalla stima

Specificare sempre cosa NON è incluso.

Esempi:

- caricamento contenuti definitivo;
- copywriting;
- produzione immagini;
- video editing;
- servizi esterni;
- costi plugin;
- migrazioni;
- traduzioni;
- integrazioni non definite;
- richieste successive all'approvazione.

## 17. Variabili che possono modificare la stima

-

## 18. Assunzioni

-

## 19. Rischi

-

## 20. Stato stima

- [ ] Preliminare
- [ ] Basata su wireframe
- [ ] Basata su mockup
- [ ] Aggiornata dopo feedback
- [ ] Finale per sviluppo

## 21. Regola di sicurezza

La stima è una valutazione tecnica, non un preventivo definitivo.

Se mancano informazioni, indicare un range e dichiarare esplicitamente le assunzioni.

Non ridurre artificialmente la stima per adattarla a un numero desiderato.
