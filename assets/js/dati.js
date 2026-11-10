/* Sistemazioni di S'Ena Arrubia.
   Dati presi dalle schede del sito attuale (senarrubia.com/sistemazioni/…, novembre 2026).
   Il filtro e le schede leggono solo da qui: per aggiungere o correggere un alloggio si tocca questo file. */

window.SISTEMAZIONI = [
  {
    id: 'mirto', nome: 'Casa mobile Mirto', tipo: 'casa', pagina: 'casa-mobile-mirto.html',
    foto: 'mirto-esterno', foto2: 'mirto-soggiorno',
    persone: 5, mq: 26, camere: 2,
    letti: 'Matrimoniale, 2 singoli e divano letto',
    frase: 'Soggiorno con divano letto, due camere e WC in un ambiente separato dal bagno.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: false, castello: false, divanoLetto: true, freezer: false },
    veranda: 'In legno, parzialmente coperta',
    frigo: '204 l con ghiacciaia',
  },
  {
    id: 'sunset-comfort', nome: 'Casa mobile Sunset Comfort', tipo: 'casa', pagina: null,
    foto: 'sunset-comfort', foto2: 'sunset-comfort',
    persone: 5, mq: 24, camere: 2,
    letti: 'Matrimoniale, 2 singoli e letto a soppalco',
    frase: 'Camera matrimoniale e cameretta con due letti singoli e un letto a soppalco.',
    tratti: { clima: true, wcSeparato: false, verandaCoperta: true, castello: false, divanoLetto: false, freezer: false },
    veranda: 'Coperta',
    frigo: '93 l',
  },
  {
    id: 'sunset-comfort-plus', nome: 'Casa mobile Sunset Comfort Plus', tipo: 'casa', pagina: null,
    foto: 'sunset-comfort-plus', foto2: 'sunset-comfort-plus',
    persone: 6, mq: 30, camere: 3,
    letti: 'Matrimoniale, 2 singoli e letto a castello',
    frase: 'Tre camere e una veranda coperta di 18 m².',
    tratti: { clima: true, wcSeparato: false, verandaCoperta: true, castello: true, divanoLetto: false, freezer: false },
    veranda: 'Coperta, 18 m²',
    frigo: 'Sì',
  },
  {
    id: 'fenicottero', nome: 'Casa mobile Fenicottero', tipo: 'casa', pagina: null,
    foto: 'fenicottero', foto2: 'fenicottero-interno',
    persone: 6, mq: 34, camere: 3,
    letti: 'Matrimoniale e 4 singoli',
    frase: 'Zona giorno di 15 m², tre camere e bagno diviso in due ambienti.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: true, castello: false, divanoLetto: false, freezer: true },
    veranda: 'In legno, coperta',
    frigo: '160 l + freezer 30 l',
  },
  {
    id: 'fenicottero-plus', nome: 'Casa mobile Fenicottero Plus', tipo: 'casa', pagina: null,
    foto: 'fenicottero-plus', foto2: 'fenicottero-plus-interno',
    persone: 6, mq: 36.4, camere: 3,
    letti: 'Matrimoniale e 4 singoli',
    frase: 'La più grande: zona giorno di 17,5 m², tre camere e bagno diviso in due ambienti.',
    tratti: { clima: true, wcSeparato: true, verandaCoperta: true, castello: false, divanoLetto: false, freezer: true },
    veranda: 'In legno, coperta',
    frigo: '160 l + freezer 30 l',
  },
  {
    id: 'tenda-safari', nome: 'Tenda Lodge Safari', tipo: 'tenda', pagina: null,
    foto: 'tenda-safari', foto2: 'tenda-safari-interno',
    persone: 5, mq: 27, camere: 2,
    letti: 'Matrimoniale, singolo e letto a castello',
    frase: 'I comfort di una casa per chi ama la vita all’aria aperta. Ingresso con chiusura a zip.',
    tratti: { clima: false, wcSeparato: false, verandaCoperta: false, castello: true, divanoLetto: false, freezer: false },
    veranda: 'Spazio esterno con tavolo e sedie',
    frigo: 'Sì',
  },
  {
    id: 'tenda-oasi', nome: 'Tenda Lodge Oasi', tipo: 'tenda', pagina: null,
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
   Parametri verificati sul motore il 9/11/2026 (vedi ../Integrazione MyGuestCare/). */
window.MOTORE = {
  url: 'https://booking.senarrubia.com/.eshop',
  cliente: 'senaarrubia',
  preventivo: 'https://www.senarrubia.com/richiesta-disponibilita/',
  link({ arrivo, partenza, adulti = 2, bambini = 0, eta = [] } = {}) {
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
    return this.url + '?' + p.toString().replace(/%2F/g, '/');
  },
};
