/* Mappa interattiva sopra la mappa A3 ufficiale (img/mappa.jpg, ritaglio dell'esecutivo mappa-2025.pdf).
   Coordinate in % della mappa ritagliata: se cambia la mappa si correggono solo qui.
   montaMappa(el, { punti: true, zona: 100, quandoZona: n => {} }) */

window.MAPPA = {
  zone: [
    { n: 100, x: 72.6, y: 55.5, w: 24, h: 37 },
    { n: 200, x: 58.8, y: 61.8, w: 23.6, h: 28.4 },
    { n: 300, x: 37.8, y: 58, w: 17.8, h: 36 },
    { n: 400, x: 61.2, y: 32.5, w: 28, h: 19 },
  ],
  // [id, nome, icona del DS, gruppo, [[x, y], …]]
  servizi: [
    ['reception', 'Reception', 'reception', 'servizi', [[87.4, 75.5]]],
    ['bar', 'Bar', 'bar', 'servizi', [[78, 78.2], [35.2, 16]]],
    ['ristorante', 'Ristorante-pizzeria', 'ristorante', 'servizi', [[75.3, 78.6]]],
    ['shop', 'Corner shop', 'corner-shop', 'servizi', [[72, 78.6]]],
    ['servizi', 'Docce e servizi igienici', 'docce-servizi', 'servizi', [[74.8, 69.7], [53.9, 43.3], [22.5, 34.7]]],
    ['lavanderia', 'Lavanderia', 'lavanderia', 'servizi', [[49.2, 54]]],
    ['acqua', 'Acqua potabile', 'acqua-potabile', 'servizi', [[82.3, 71.8]]],
    ['piscina', 'Piscina', 'piscina', 'svago', [[34.1, 26]]],
    ['giochi', 'Parco giochi', 'parco-giochi', 'svago', [[44.3, 32.8]]],
    ['calcio', 'Campo da calcio', 'campo-calcio', 'svago', [[39.5, 32.8]]],
    ['volley', 'Beach tennis e volley', 'beach-tennis-volley', 'svago', [[39.9, 20.4]]],
    ['spettacoli', 'Area spettacoli', 'area-spettacoli', 'svago', [[32.2, 16]]],
    ['bird', 'Bird watching', 'bird-watching', 'svago', [[87.6, 64.4]]],
    ['dogarea', 'Area cani', 'area-cani', 'pet', [[50.3, 42.7]]],
    ['dogdoccia', 'Doccia cani', 'doccia-cani', 'pet', [[52, 42.7]]],
    ['dogbeach', 'Spiaggia per cani', 'spiaggia-cani', 'pet', [[15.7, 20.4]]],
    ['parcheggio', 'Parcheggio', 'parcheggio', 'pratico', [[51, 18.6], [88.6, 89]]],
    ['camperservice', 'Camper service e WC chimico', 'camper-service', 'pratico', [[78, 42]]],
    ['ecologica', 'Isola ecologica', 'isola-ecologica', 'pratico', [[79, 33.7]]],
    ['barbecue', 'Barbecue', 'barbecue', 'pratico', [[44.4, 43.3], [45, 67.5], [59.2, 40.8]]],
  ],
  gruppi: { servizi: 'Servizi', svago: 'Piscina, sport e natura', pet: 'Pet', pratico: 'Pratico' },
};

window.montaMappa = function (el, o = {}) {
  const M = window.MAPPA;
  el.innerHTML = `<div class="mappa-int__scorri"><div class="mappa-int__tela">
    <img src="img/mappa.jpg" alt="Mappa del campeggio S'Ena Arrubia: la spiaggia a ovest, lo stagno a est, le quattro zone al centro">
    ${M.zone.map(z => `<button type="button" class="zona-area" data-zona="${z.n}" style="left:${z.x}%;top:${z.y}%;width:${z.w}%;height:${z.h}%" aria-label="Zona ${z.n}"></button>`).join('')}
    ${o.punti ? M.servizi.flatMap(([id, nome, , , pos]) => pos.map(([x, y]) => `<button type="button" class="punto" data-punto="${id}" style="left:${x}%;top:${y}%" tabindex="-1" aria-label="${nome}"><span>${nome}</span></button>`)).join('') : ''}
  </div></div>`;
  const api = {
    zona(n) {
      el.querySelectorAll('.zona-area').forEach(b => b.classList.toggle('is-attiva', +b.dataset.zona === +n));
      o.quandoZona?.(+n);
    },
    mostra(id) {
      el.querySelectorAll('.punto').forEach(p => { const on = p.dataset.punto === id; p.classList.toggle('is-visibile', on); p.tabIndex = on ? 0 : -1; });
      // su telefono la mappa scorre di lato: porta in vista il primo punto
      const p = el.querySelector(`.punto[data-punto="${id}"]`), sc = el.querySelector('.mappa-int__scorri');
      if (p && sc.scrollWidth > sc.clientWidth) sc.scrollTo({ left: p.offsetLeft - sc.clientWidth / 2, behavior: 'smooth' });
    },
  };
  el.querySelectorAll('.zona-area').forEach(b => b.addEventListener('click', () => api.zona(b.dataset.zona)));
  if (o.zona) api.zona(o.zona);
  // su telefono parte centrata sul campeggio, non sul mare
  const sc = el.querySelector('.mappa-int__scorri');
  requestAnimationFrame(() => { if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = sc.scrollWidth * .42 - sc.clientWidth / 2; });
  return api;
};
