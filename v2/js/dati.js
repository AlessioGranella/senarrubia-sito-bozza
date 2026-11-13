/* Sistemazioni di S'Ena Arrubia.
   V2: aggiunti bagno, stagione, compreso/escluso, piazzole, zone, offerte.
   Dati presi dalle schede del sito attuale (senarrubia.com/sistemazioni/…, novembre 2026).
   Il filtro e le schede leggono solo da qui: per aggiungere o correggere un alloggio si tocca questo file. */

window.SISTEMAZIONI = [
  {
    id: 'mirto', motore: 71, bagno: 'Bagno con doccia e lavabo, WC in un ambiente a parte', nome: 'Casa mobile Mirto', tipo: 'casa', pagina: 'casa-mobile-mirto.html',
    foto: 'mirto-esterno', foto2: 'mirto-soggiorno',
    persone: 5, mq: 26, camere: 2,
    letti: 'Matrimoniale, 2 singoli e divano letto',
    frase: 'Soggiorno con divano letto, due camere e WC in un ambiente separato dal bagno.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: false, castello: false, divanoLetto: true, freezer: false },
    veranda: 'In legno, parzialmente coperta',
    frigo: '204 l con ghiacciaia',
  },
  {
    id: 'sunset-comfort', motore: 50, bagno: 'Bagno privato con WC, doccia e lavabo', nome: 'Casa mobile Sunset Comfort', tipo: 'casa', pagina: null,
    foto: 'sunset-comfort', foto2: 'sunset-comfort',
    persone: 5, mq: 24, camere: 2,
    letti: 'Matrimoniale, 2 singoli e letto a soppalco',
    frase: 'Camera matrimoniale e cameretta con due letti singoli e un letto a soppalco.',
    tratti: { clima: true, wcSeparato: false, verandaCoperta: true, castello: false, divanoLetto: false, freezer: false },
    veranda: 'Coperta',
    frigo: '93 l',
  },
  {
    id: 'sunset-comfort-plus', motore: 56, bagno: 'Bagno privato con WC, doccia e lavabo', nome: 'Casa mobile Sunset Comfort Plus', tipo: 'casa', pagina: null,
    foto: 'sunset-comfort-plus', foto2: 'sunset-comfort-plus',
    persone: 6, mq: 30, camere: 3,
    letti: 'Matrimoniale, 2 singoli e letto a castello',
    frase: 'Tre camere e una veranda coperta di 18 m².',
    tratti: { clima: true, wcSeparato: false, verandaCoperta: true, castello: true, divanoLetto: false, freezer: false },
    veranda: 'Coperta, 18 m²',
    frigo: 'Sì',
  },
  {
    id: 'fenicottero', motore: 91, bagno: 'Bagno diviso in due: doccia e lavabo da una parte, WC dall’altra', nome: 'Casa mobile Fenicottero', tipo: 'casa', pagina: null,
    foto: 'fenicottero', foto2: 'fenicottero-interno',
    persone: 6, mq: 34, camere: 3,
    letti: 'Matrimoniale e 4 singoli',
    frase: 'Zona giorno di 15 m², tre camere e bagno diviso in due ambienti.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: true, castello: false, divanoLetto: false, freezer: true },
    veranda: 'In legno, coperta',
    frigo: '160 l + freezer 30 l',
  },
  {
    id: 'fenicottero-plus', motore: 94, bagno: 'Bagno diviso in due: doccia e lavabo da una parte, WC dall’altra', nome: 'Casa mobile Fenicottero Plus', tipo: 'casa', pagina: null,
    foto: 'fenicottero-plus', foto2: 'fenicottero-plus-interno',
    persone: 6, mq: 36.4, camere: 3,
    letti: 'Matrimoniale e 4 singoli',
    frase: 'La più grande: zona giorno di 17,5 m², tre camere e bagno diviso in due ambienti.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: true, castello: false, divanoLetto: false, freezer: true },
    veranda: 'In legno, coperta',
    frigo: '160 l + freezer 30 l',
  },
  {
    id: 'tenda-safari', motore: 105, bagno: 'Bagno privato con doccia, WC e lavabo', nome: 'Tenda Lodge Safari', tipo: 'tenda', pagina: null,
    foto: 'tenda-safari', foto2: 'tenda-safari-interno',
    persone: 5, mq: 27, camere: 2,
    letti: 'Matrimoniale, singolo e letto a castello',
    frase: 'I comfort di una casa per chi ama la vita all’aria aperta. Ingresso con chiusura a zip.',
    tratti: { clima: false, wcSeparato: false, verandaCoperta: false, castello: true, divanoLetto: false, freezer: false },
    veranda: 'Spazio esterno con tavolo e sedie',
    frigo: 'Sì',
  },
  {
    id: 'tenda-oasi', motore: 5, bagno: 'Bagno privato con doccia, WC e lavabo', nome: 'Tenda Lodge Oasi', tipo: 'tenda', pagina: null,
    foto: 'tenda-oasi', foto2: 'tenda-oasi-interno',
    persone: 5, mq: 27, camere: 2,
    letti: 'Matrimoniale, singolo e letto a castello',
    frase: 'L’atmosfera del campeggio, chiusa a chiave, con ombrellone, tavolo e sedie fuori.',
    tratti: { clima: false, wcSeparato: false, verandaCoperta: false, castello: true, divanoLetto: false, freezer: false },
    veranda: 'Spazio esterno con ombrellone, tavolo e sedie',
    frigo: 'Sì',
  },
];

/* Motore di prenotazione MyGuestCare (Mycomp): non si cambia, ci si collega con un link.
   Parametri verificati sul motore il 9/11/2026 (vedi ../Integrazione MyGuestCare/).
   prodotto = ID dell'alloggio sul motore (campo `motore` in SISTEMAZIONI): diventa
   productsel e mette quell'alloggio per primo nei risultati (verificato il 13/11/2026). */
window.MOTORE = {
  url: 'https://booking.senarrubia.com/.eshop',
  cliente: 'senaarrubia',
  preventivo: 'https://www.senarrubia.com/richiesta-disponibilita/',
  link({ arrivo, partenza, adulti = 2, bambini = 0, eta = [], prodotto } = {}) {
    const lingue = { it: 1, en: 2, fr: 3, de: 4, es: 5 };
    const p = new URLSearchParams({
      idcliente: this.cliente, idvendor: '1', orderBy: '2', fast: '1', invcart: '1',
      lang: String(lingue[(document.documentElement.lang || 'it').slice(0, 2)] || 1),
    });
    if (arrivo && partenza) {
      const it = v => v.split('-').reverse().join('/');
      p.set('arrivo', it(arrivo)); p.set('partenza', it(partenza)); p.set('stanze', '1');
      p.set('adulti1', adulti); p.set('bambini1', bambini);
      eta.forEach((a, j) => p.set('etabambino1' + (j + 1), a));
    }
    // productsel conta solo nella pagina risultati: servono act/alltratt/noFilterUnit come nel form del sito attuale
    if (prodotto) { p.set('act', 'result-strutture'); p.set('alltratt', '1'); p.set('noFilterUnit', '1'); p.set('productsel', prodotto); }
    return this.url + '?' + p.toString().replace(/%2F/g, '/');
  },
};

/* ---------------------------------------------------------------- V2
   Tutto quello che il cliente aggiorna ogni stagione sta qui sotto.
   I valori con «daConfermare» vengono mostrati con il bordo tratteggiato finché la struttura non li conferma. */

// Stagione: date ricavate dalle offerte 2026 (14/05 – 04/10). Da confermare per il 2027.
window.STAGIONE = { anno: 2027, apertura: '2027-05-14', chiusura: '2027-10-04', daConfermare: true };

// Cosa è compreso e cosa no, uguale per tutte le sistemazioni (dalle schede del sito attuale e dal regolamento).
window.COMPRESO = [
  ['energia', 'Acqua, luce e gas', 'Tutti i consumi'],
  ['stoviglie', 'Angolo cottura e stoviglie', ''],
  ['coperta', 'Cuscini e coperte', 'Per tutti i posti letto'],
  ['scopa', 'Kit pulizie', 'Scopa, paletta, secchio e mocio'],
  ['img:piscina', 'Piscina e lettini', 'Fino a esaurimento'],
  ['img:parcheggio', 'Un posto auto o moto', 'Nel parcheggio interno'],
  ['img:area-spettacoli', 'Animazione diurna e serale', 'In alta stagione'],
  ['img:area-cani', 'Dog Park e doccia per cani', ''],
];
window.ESCLUSO = [
  ['biancheria', 'Biancheria da letto e da bagno', 'Su richiesta: set matrimoniale € 20, singolo € 10'],
  ['no', 'Teli mare e cuffia piscina', 'Da portare da casa'],
  ['no', 'Carta igienica', 'Da portare da casa'],
  ['stoviglie', 'Pulizia dell’angolo cottura', 'Se lasciato sporco, € 30'],
  ['orologio', 'Late check-out fino alle 18', '€ 30, se disponibile'],
  ['euro', 'Cauzione di € 100', 'Resa alla partenza, dopo il controllo'],
];

// Condizioni di prenotazione (dal Regolamento di soggiorno, cap. 2).
window.CONDIZIONI = [
  ['Arrivo', 'L’alloggio è pronto dalle 16:30 alle 20:00.'],
  ['Partenza', 'Entro le 10:30. Dopo, si paga anche il giorno di partenza.'],
  ['Pagamento', 'Il saldo si paga all’arrivo, al check-in.'],
  ['Cauzione', '€ 100 in contanti, assegno o carta. Si restituisce alla partenza.'],
  ['Mancato arrivo', 'Se non arrivi entro le 12:00 del giorno dopo e non avvisi, la prenotazione può essere annullata.'],
  ['Cambio alloggio', 'Se possibile: si paga l’eventuale differenza di tariffa più € 40 di pulizie.'],
  ['Documenti', 'Ogni ospite si registra con un documento e riceve un braccialetto da tenere per tutto il soggiorno.'],
  ['Foto', 'Le foto sono rappresentative: l’alloggio assegnato può differire nei dettagli.'],
];

// Piazzole S / M / L. Misure e prezzi da avere dalla struttura.
window.PIAZZOLE = [
  { id: 's', sigla: 'S', nome: 'Small', per: 'Tende canadesi e igloo, moto, piccoli van', mezzi: ['tenda'], misure: '— × — m', zone: [200, 400] },
  { id: 'm', sigla: 'M', nome: 'Medium', per: 'Tende familiari, roulotte e camper fino a 7 m', mezzi: ['tenda-grande', 'roulotte', 'camper'], misure: '— × — m', zone: [100, 200, 400] },
  { id: 'l', sigla: 'L', nome: 'Large', per: 'Camper oltre 7 m, roulotte con veranda o con auto', mezzi: ['camper-grande', 'roulotte-veranda'], misure: '— × — m', zone: [100, 300] },
];

// Zone della mappa A3 (colori della legenda). Distanze da misurare: per ora vuote.
window.ZONE = [
  { n: 100, nome: 'Zona 100', dove: 'Sul lato dello stagno, dove si fa colazione con i fenicotteri.', vicino: ['Oasi e bird watching', 'Reception', 'Ristorante e bar', 'Servizi igienici'], ospita: 'Piazzole, case mobili e tende lodge', distanze: { spiaggia: null, piscina: null, servizi: null } },
  { n: 200, nome: 'Zona 200', dove: 'Al centro del campeggio, all’ombra della pineta.', vicino: ['Lavanderia', 'Servizi igienici', 'Dog area', 'Barbecue'], ospita: 'Piazzole per tende e case mobili', distanze: { spiaggia: null, piscina: null, servizi: null } },
  { n: 300, nome: 'Zona 300', dove: 'Verso il mare, la più vicina a piscina e spiaggia.', vicino: ['Piscina', 'Spiaggia', 'Parco giochi', 'Barbecue'], ospita: 'Piazzole per camper, case mobili e tende lodge', distanze: { spiaggia: null, piscina: null, servizi: null } },
  { n: 400, nome: 'Zona 400', dove: 'Vicino al parcheggio interno e all’ingresso del campeggio.', vicino: ['Parcheggio', 'Isola ecologica', 'Camper service', 'Servizi igienici'], ospita: 'Piazzole per camper e tende', distanze: { spiaggia: null, piscina: null, servizi: null } },
];

// Offerte: testi e date del sito attuale (stagione 2026). Si aggiornano qui.
window.OFFERTE = [
  { id: 'bassa', titolo: 'Fino al 30% in bassa stagione', grande: '-30%', sotto: '7 notti · -25% con 4 notti',
    periodi: [['05-14', '06-19'], ['08-30', '10-04']], rimborsabile: true, entro: null,
    testo: 'Fino al -30% su soggiorni di almeno 7 notti, fino al -25% su soggiorni di almeno 4 notti. Per tutte le sistemazioni.' },
  { id: 'notte', titolo: 'Una notte la offriamo noi', grande: '7=6', sotto: 'Su prenotazioni rimborsabili',
    periodi: [['06-20', '07-24'], ['08-23', '08-29']], rimborsabile: true, entro: null,
    testo: 'Prenota almeno 7 notti: una te la regaliamo. Per tutte le sistemazioni.' },
  { id: 'anticipo', titolo: 'Prenota prima, -25%', grande: '-25%', sotto: 'Minimo 7 notti',
    periodi: [['06-20', '08-29']], rimborsabile: false, entro: '28 febbraio',
    testo: 'Soggiorni di almeno 7 notti tra il 20 giugno e il 29 agosto, prenotati entro il 28 febbraio.' },
  { id: 'agosto', titolo: 'Agosto flessibile, -10%', grande: '-10%', sotto: 'Minimo 7 notti',
    periodi: [['07-25', '08-22']], rimborsabile: true, entro: '28 febbraio',
    testo: 'Soggiorni di almeno 7 notti tra il 25 luglio e il 22 agosto, con la libertà di cambiare idea.' },
];

// Documenti scaricabili. Quelli senza url vanno chiesti alla struttura.
window.DOCUMENTI = [
  { id: 'regolamento', nome: 'Regolamento di soggiorno', url: 'https://www.senarrubia.com/wp-content/uploads/regolamento-italiano.pdf', peso: 'PDF · 5 pagine' },
  { id: 'mappa', nome: 'Mappa del campeggio', url: 'https://www.senarrubia.com/wp-content/uploads/mappa-2025.pdf', peso: 'PDF · A3' },
  { id: 'pet', nome: 'Regolamento pet', url: null, peso: 'PDF' },
  { id: 'piscina', nome: 'Regolamento piscina', url: null, peso: 'PDF' },
  { id: 'rifiuti', nome: 'Calendario raccolta differenziata', url: null, peso: 'PDF' },
];
