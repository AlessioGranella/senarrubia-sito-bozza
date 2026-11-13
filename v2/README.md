# Sito S'Ena Arrubia — bozza V2

La v1 resta nella cartella sopra (`../`), intatta. La v2 usa le stesse foto, icone, font e CSS della v1
(`../assets/`) e aggiunge solo i suoi file: `css/v2.css`, `js/`, `img/mappa.jpg`.

Online: `/v2/` accanto alla v1. In fondo a ogni pagina v2 c'è il link «Bozza v1».

## Pagine
| Pagina | Cosa c'è di nuovo | Riferimento del cliente |
|---|---|---|
| `index.html` | Date di apertura in grande che ruotano nella hero, striscia con i punti chiave, sezione stagione con conto alla rovescia, porte verso piazzole/mappa/offerte, «Perché S'Ena Arrubia» | campingpiomboni.it |
| `sistemazioni.html` | Bottone «i» sulla foto di ogni card: scheda in breve (letti, bagno/WC separato, clima, veranda, frigo, cosa non è incluso). Compreso / non compreso. Condizioni in un cassetto laterale | torredelporticciolo.it, 4mori.it |
| `casa-mobile-mirto.html` | Pianta interattiva (ambiente ⇄ lista), WC separato messo in evidenza, «i» condizioni e «i» dotazioni, compreso / non compreso, posizione nel campeggio, PDF da scaricare | torredelporticciolo.it, isolino.it |
| `piazzole.html` | «Con cosa viaggi?» → misura S/M/L consigliata; le 4 zone sulla mappa con distanze da spiaggia, piscina e servizi | capasquali.it |
| `mappa.html` | Mappa A3 ufficiale con le zone e i servizi da accendere uno per uno | richiesta diretta |
| `info-utili.html` | Regolamenti per tema: 3-4 punti in breve, testo completo apribile, PDF | richiesta diretta |
| `offerte.html` | Le 4 offerte del sito attuale con la barra della stagione che mostra quando valgono | richiesta diretta |
| `lavora-con-noi.html` | Candidatura spontanea: ruoli, mesi, CV | richiesta diretta |

## Dati
Tutto ciò che cambia ogni stagione è in `js/dati.js`: stagione, compreso/escluso, condizioni, piazzole, zone, offerte, documenti.
Le coordinate di zone e servizi sulla mappa sono in `js/mappa.js`.

## Da chiedere alla struttura (in bozza con il bordo tratteggiato azzurro)
- Date di apertura 2027 (ora 14 maggio – 4 ottobre, prese dalle offerte 2026)
- Misure delle piazzole S, M, L e la soglia di lunghezza dei camper
- Distanze di ogni zona (e di ogni alloggio) da spiaggia, piscina, servizi, ristorante
- In quale zona si trova ogni alloggio (la Mirto ora è d'esempio in zona 300)
- Piante degli alloggi dal produttore (quella della Mirto è indicativa)
- PDF: regolamento pet, regolamento e orari piscina, calendario raccolta differenziata
- Offerte 2027
- Casella email a cui collegare il modulo «Lavora con noi»

## Schede alloggio (13/11/2026)

- `casa-mobile-mirto.html` è fatta a mano (ha la pianta disegnata).
- Le altre 6 schede (Sunset Comfort, Sunset Comfort Plus, Fenicottero, Fenicottero Plus, Tenda Lodge Safari, Tenda Lodge Oasi) si generano con `python3 genera-schede.py`: testi e foto stanno lì dentro, il comportamento in `js/scheda.js`. Non modificare a mano gli HTML generati.
- Il modulo «Verifica disponibilità» di ogni scheda apre il motore con l'alloggio in cima (`data-prenota="<id>"` → `productsel`, ID in `motore` di `js/dati.js`).
- Foto: la prima è quella ad alta risoluzione di `../assets/foto`, le altre sono quelle ufficiali del motore (850 px) in `img/alloggi/<id>/`. Da sostituire con gli originali.
- Da avere dalla struttura: piante delle 6 sistemazioni, zona e distanze, foto della cameretta di Sunset Comfort, del soggiorno di Sunset Comfort Plus e del bagno della Tenda Safari.
