# Sito S'Ena Arrubia — bozza

Tre pagine statiche (HTML, CSS, JS), senza build. Per vederle: `python3 -m http.server 4173` in questa cartella → http://localhost:4173

- `index.html` — home
- `sistemazioni.html` — elenco con filtro (tipologia, ospiti, dotazioni), ordine e vista confronto
- `casa-mobile-mirto.html` — scheda di dettaglio, modello per le altre sistemazioni

## Dove stanno le cose
- `assets/css/tokens.css` — copia dei token del design system (`../../design-system/src/styles/colors_and_type.css`, solo il percorso del font cambiato)
- `assets/css/sito.css` — componenti del sito, solo token `--se-*`
- `assets/js/dati.js` — dati delle 7 sistemazioni (dal sito attuale) e collegamento al motore MyGuestCare
- `assets/js/sito.js` — testata, piede, prenotazione, animazioni (GSAP + ScrollTrigger + SplitText, Lenis)
- `assets/js/filtro.js` — filtro della pagina sistemazioni
- `assets/icone/` — icone servizi del brand (dal DS) + `sistemazione.svg`, icone al tratto nuove per le dotazioni

## Prenotazione
Il motore MyGuestCare non si tocca: i bottoni aprono `booking.senarrubia.com/.eshop` con date, adulti, bambini ed età
(parametri in `dati.js`, verificati sul motore). Il link non sceglie l'alloggio: il motore mostra tutti quelli disponibili.

## Animazioni
Prese come riferimento da lasalaplazahotel.com: scorrimento morbido, titoli che salgono riga per riga, testo che si accende
allo scorrimento, sezione sistemazioni bloccata che scorre di lato, pannelli a tutto schermo che si impilano, foto che si
svelano dal basso con parallasse. Con «riduci movimento» attivo nel sistema non parte nessuna animazione.
