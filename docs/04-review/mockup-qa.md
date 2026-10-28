# Controllo qualità mockup: Conti & Conti

> Generato automaticamente il 2026-10-20 da `_SYSTEM/tools/mockup-qa`. Non modificare a mano: si rigenera a ogni esecuzione. Etichetta: RICERCA (misure su pagine reali); gli indici di genericità sono INFERENZA euristica.

**Esito: NON SUPERATO** · punteggio 89/100 · 2 pagine · BLOCKER 0 · HIGH 2 · MEDIUM 9 · LOW 2
Per superare il controllo: nessun BLOCKER, nessun HIGH e punteggio di almeno 85. (axe-core non installato: il controllo accessibilità è quello interno, più limitato)

| Area | Punteggio |
|---|---|
| Collegamenti | 94 |
| Coerenza stile | 90 |
| Accessibilità | 98 |
| Responsive | 98 |
| Originalità | 66 |

## Problemi, dal più grave

### 1. [HIGH] 12 link vuoti (href="#" o senza destinazione)
Area: Collegamenti · Nei mockup i link devono portare dove porterà il sito vero, o essere esplicitamente segnati come non attivi.
Dove:
- home-a.html: «Privacy policy»
- home-a.html: «Cookie policy»
- home-a.html: «Gestisci i cookie»
- home-a.html: «Note legali»
- home-a.html: «Accessibilità»
- home-a.html: «Mappa del sito»
Correzione: Collegare ogni link alla pagina o alla sezione corretta.

### 2. [HIGH] 2 "blob" sfocati decorativi (cerchi con blur)
Area: Originalità · Segnale euristico di aspetto generico: va valutato con l'art director, non è un errore tecnico.
Correzione: Sostituire con scelte derivate da brand, contenuto e riferimenti del radar; documentare il perché.

### 3. [MEDIUM] 1 testi sotto il contrasto minimo in 1 pagine (1 coppie di colori)
Area: Accessibilità · Contrasto calcolato su colore del testo e sfondo effettivo (immagini e gradienti esclusi).
Dove:
- home-a.html: a.btn.btn-nav «Richiedi un preventivo» 2.79:1 (serve 4.5:1)
Correzione: Scurire il testo o schiarire lo sfondo fino a 4,5:1 (3:1 per testi grandi).

### 4. [MEDIUM] 2 pagine con molte aree di tocco troppo piccole su mobile
Area: Responsive · Link e pulsanti sotto i 40 px.
Dove:
- home-a.html: 17 elementi sotto i 40px
- home-b.html: 14 elementi sotto i 40px
Correzione: Portare le aree interattive ad almeno 44×44 px.

### 5. [MEDIUM] 4 famiglie di font in uso
Area: Coerenza stile · Hanken Grotesk (647), Archivo (200), Arial (26), IBM Plex Mono (21)
Correzione: Limitarsi a due famiglie (titoli e testo) più eventualmente una per i dettagli.

### 6. [MEDIUM] 25 dimensioni di testo diverse
Area: Coerenza stile · Più usate: 15px×67, 13px×55, 12px×46, 14px×27, 63px×21, 17px×20
Correzione: Definire una scala tipografica (es. 6-8 passi) e usare solo quella.

### 7. [MEDIUM] 11 raggi degli angoli diversi
Area: Coerenza stile · 2px×61, 50%×34, 8px×21, 10px×18, 14px×15, 999px×10
Correzione: Tre o quattro raggi al massimo, definiti come token.

### 8. [MEDIUM] 16 varianti diverse di pulsante
Area: Coerenza stile · Combinazioni diverse di sfondo, colore, raggio, padding e dimensione.
Correzione: Primaria, secondaria e testuale: tre varianti, uguali su tutte le pagine.

### 9. [MEDIUM] 53% delle spaziature fuori da una scala di 4px
Area: Coerenza stile · Valori casuali di padding e margini.
Correzione: Usare una scala di spaziatura (4, 8, 12, 16, 24, 32, 48, 64…) e solo quella.

### 10. [MEDIUM] Effetto vetro (backdrop-filter) su 53 elementi
Area: Originalità · Segnale euristico di aspetto generico: va valutato con l'art director, non è un errore tecnico.
Correzione: Sostituire con scelte derivate da brand, contenuto e riferimenti del radar; documentare il perché.

### 11. [MEDIUM] Trio di card con icona + titolo + testo in 2 pagine (schema molto abusato)
Area: Originalità · Segnale euristico di aspetto generico: va valutato con l'art director, non è un errore tecnico.
Dove:
- home-a.html: ul.tlist
- home-b.html: ul.tlist
Correzione: Sostituire con scelte derivate da brand, contenuto e riferimenti del radar; documentare il perché.

### 12. [LOW] 32 testi sovrapposti a immagini: contrasto da verificare a occhio
Area: Accessibilità · Il controllo automatico non può giudicare il contrasto sopra una fotografia.
Dove:
- home-a.html (31)
- home-b.html (1)
Correzione: Verificare che il testo sia leggibile su ogni crop: usare un velo scuro o un'ombra del testo calibrata.

### 13. [LOW] 22 ombre diverse
Area: Coerenza stile
Correzione: Due o tre livelli di elevazione.

## Pagine controllate

- home-a.html
- home-b.html
