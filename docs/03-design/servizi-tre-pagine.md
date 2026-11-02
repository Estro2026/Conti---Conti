# Servizi: tre pagine wireframe (Residenze, Ristrutturazioni, Retail)

Stato: PROPOSTA, in attesa di conferma di Sara (richiesta in chat 2026-11-02). Fonte della richiesta: CLIENTE (Sara).
Obiettivo: l'equivalente della pagina Servizi del sito vecchio (contieconti.it/servizi/), dove i servizi sono spiegati, ma declinato in 3 pagine: Residenze, Ristrutturazioni, Retail. Le 3 card "I nostri servizi" di Home A e Home B puntano a queste pagine.
Regola di Sara: le tre pagine non devono ripetersi tra loro né ripetere contenuti di altre pagine del wireframe. Se una sezione è più pertinente qui, si toglie dalle altre pagine e si dichiara cosa è stato tolto e cosa spostato.

## Fonti (RICERCA, sito vecchio)
- Home vecchia, tre schede:
  - Residenze: «costruzione di aree residenziali, dalla progettazione alla gestione e manutenzione di edifici e case singole».
  - Ristrutturazioni: «lavori di ristrutturazione che fanno leva sull'esperienza dell'impresa, con cura per il dettaglio, i tempi e il rapporto con il cliente e la Direzione Lavori».
  - Retail: «costruzione e manutenzione ordinaria e straordinaria di capannoni industriali e spazi commerciali».
- La pagina Servizi vecchia ha 8 blocchi (uffici interni): Qualità e Sicurezza, General Contractor, Preventivazione, Vendita, Amministrazione, Tecnico, Acquisti, Logistica. Nel wireframe stavano in Impresa ("Gli uffici dietro ogni cantiere").
- Portfolio vecchio: filtri Bank, Exhibition, GDO, Gym & Spa, Houses, Industrial, Lounge, Medical, Nautical, Retail; le ristrutturazioni stavano sotto "Houses".

## Cosa va dove (assegnazione, nessun contenuto in due posti)
Dagli 8 uffici di Impresa (testi esatti già nel wireframe, da riusare parola per parola):
- Residenze: Tecnico, Vendita.
- Ristrutturazioni: Preventivazione, Amministrazione.
- Retail: General Contractor, Acquisti, Logistica.
- Qualità e sicurezza: non diventa un blocco di servizio. Resta in Impresa dentro la scheda ISO 9001 di Garanzie (frase «personale formato sulla sicurezza in cantiere»).
Dalla pagina FAQ (domande spostate, risposta invariata):
- «Ci sono detrazioni fiscali sui lavori?» → Ristrutturazioni (FAQ locale).
- «Cosa significa che lavorate come general contractor?» → Retail (FAQ locale).
Non si spostano: Metodo e Storia di Impresa, Garanzie, pagine categoria, In vendita, Blog.

## Struttura comune (ogni pagina ha un taglio diverso, non lo stesso modulo ripetuto)
1. Apertura su foto a tutto schermo (stesso impianto di categoria.html: header e breadcrumb trasparenti, `body data-overlay`), occhiello "Servizi", H1 = nome del servizio, frase d'apertura dal sito vecchio, un solo pulsante "Richiedi un preventivo".
2. "Cosa comprende": ambito del servizio.
3. "Come lavoriamo qui": metodo specifico del servizio, con forma visiva diversa in ogni pagina.
4. "Chi ti segue": gli uffici assegnati sopra (2-3 schede).
5. Prove: 2-3 progetti o categorie collegate, senza ripetere la griglia del portfolio.
6. FAQ locali solo dove assegnate (Ristrutturazioni, Retail).
7. "Altri servizi": link agli altri due.
8. Pre-footer standard (`data-c="cta"`).
Breadcrumb: Home / Servizi / [nome] (Servizi non è un link: non esiste una pagina indice dei servizi).

## Vincoli di contenuto
- Nessun dato inventato: numeri, anni, nomi di clienti, norme, percentuali di detrazione restano [segnaposto]. Etichette di fonte nelle note: CLIENTE, RICERCA, INFERENZA, PROPOSTA, VERIFY, DEV.
- Dati ammessi (già nel wireframe): ~180 cantieri/anno, ~300 preventivi/anno, 40 dipendenti, progetti Ceresio 7, Casa MJO, Villa Lodovic, The Rise, residenze in vendita (Solarium, Paradiso, via Diaz). Non riusare il caso "villa in 5 mesi per la Design Week" (sta nel Metodo di Impresa).
- Retail: le categorie portfolio collegate sono Attività commerciali, Palestre, Allestimenti, Industriale (nomi invariati; la rinomina in "Retail" della categoria è una decisione aperta).
- Ristrutturazioni: non esiste una categoria portfolio; i progetti collegati vanno scelti tra Case e Ville (INFERENZA, da verificare) e va detto in nota.
- Copy italiano naturale, niente frasi da modello. Note DEV senza ore: "Da ristimare".

## Specifiche tecniche
- Media fedeltà: solo scala di grigi, nessun pattern, pulsanti rettangolari (wf-mid.css). Riusa i componenti esistenti (wf-dyn.css/js, wf-impresa-x, wf-servizio) e il sistema di scala per zoom (wf-scale.css, wf-zoom.js). Parti da categoria.html per head, script e struttura.
- File nuovi per pagina: `servizio-residenze.html`, `servizio-ristrutturazioni.html`, `servizio-retail.html`, ognuno con CSS/JS propri solo se servono (`wf-sv-residenze.*`, `wf-sv-ristrutturazioni.*`, `wf-sv-retail.*`, classi con prefisso `rs-`... usa prefissi distinti: `svr-`, `svk-`, `svt-`).
- Non modificare file condivisi né altre pagine (le modifiche a Impresa, FAQ, homepage, indice le fa l'orchestratore).
- Accessibilità, responsive e zoom: apertura leggibile alla prima visualizzazione anche con schermi bassi, nessuno scorrimento orizzontale, bersagli touch ≥ 24 px, riduci movimento rispettato.
