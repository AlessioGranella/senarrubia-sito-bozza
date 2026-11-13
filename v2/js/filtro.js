/* Filtro delle sistemazioni.
   Stato: tipologia, numero di ospiti, dotazioni richieste, ordine, vista.
   Lo stato vive nell'indirizzo (?ospiti=4&tipo=casa&serve=clima,veranda) così si può condividere
   e la home può portare qui con "Quanti siete?". */

(function () {
  const S = window.SISTEMAZIONI;
  const ic = window.ic;
  const FERMO = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.gsap && window.Flip) gsap.registerPlugin(Flip);

  // Dotazioni filtrabili: tutte ricavate dalle descrizioni del sito attuale.
  const DOTAZIONI = [
    { id: 'clima',    nome: 'Aria condizionata',    icona: 'clima',      test: s => s.tratti.clima },
    { id: 'camere3',  nome: '3 camere',             icona: 'camera',     test: s => s.camere >= 3 },
    { id: 'wc',       nome: 'WC separato',          icona: 'separato',   test: s => s.tratti.wcSeparato },
    { id: 'veranda',  nome: 'Veranda coperta',      icona: 'veranda',    test: s => s.tratti.verandaCoperta },
    { id: 'spazio',   nome: 'Oltre 30 m²',          icona: 'superficie', test: s => s.mq > 30 },
    { id: 'castello', nome: 'Letto a castello',     icona: 'castello',   test: s => s.tratti.castello },
  ];

  const q = new URLSearchParams(location.search);
  const st = {
    tipo: ['casa', 'tenda'].includes(q.get('tipo')) ? q.get('tipo') : 'tutte',
    ospiti: Math.min(6, Math.max(1, +q.get('ospiti') || 2)),
    serve: new Set((q.get('serve') || '').split(',').filter(x => DOTAZIONI.some(d => d.id === x))),
    ordina: 'consigliate',
    vista: 'schede',
  };

  const $ris = document.getElementById('risultati');
  const $conf = document.getElementById('confronto');
  const $conta = document.getElementById('conta');
  const $chips = document.getElementById('chips');
  const $osp = document.getElementById('osp');
  const $vedi = document.getElementById('vedi');
  const $nf = document.getElementById('n-filtri');
  const mq = n => String(n).replace('.', ',');
  const pagina = s => s.pagina || `https://www.senarrubia.com/sistemazioni/${s.tipo === 'casa' ? 'casa-mobile-' + s.id : s.id === 'tenda-safari' ? 'tenda-lodge-safari' : s.id}/`;

  $chips.innerHTML = DOTAZIONI.map(d =>
    `<button type="button" class="chip-f" data-serve="${d.id}" aria-pressed="false">${ic(d.icona)}${d.nome}</button>`).join('');

  // Tratti mostrati sulla card, con evidenza di quelli cercati
  const tratti = s => [
    s.tratti.clima && ['clima', 'Aria condizionata', 'clima'],
    s.tratti.wcSeparato && ['separato', 'WC separato', 'wc'],
    s.tratti.verandaCoperta ? ['veranda', 'Veranda coperta', 'veranda'] : ['tavolo', s.tipo === 'tenda' ? 'Spazio esterno' : 'Veranda in parte coperta', ''],
    s.tratti.castello && ['castello', 'Letto a castello', 'castello'],
    s.tratti.divanoLetto && ['divano-letto', 'Divano letto', ''],
    s.tratti.freezer && ['frigorifero', 'Freezer', ''],
  ].filter(Boolean);

  // Le schede si costruiscono una volta sola: il filtro le nasconde e le riordina (con Flip).
  $ris.innerHTML = S.map(s => `
    <article class="alloggio" id="${s.id}" data-id="${s.id}">
      <a class="alloggio__foto" href="${pagina(s)}" tabindex="-1" aria-hidden="true">
        <img src="../assets/foto/${s.foto}.jpg" alt="" loading="lazy">
        ${s.foto2 !== s.foto ? `<img src="../assets/foto/${s.foto2}.jpg" alt="" loading="lazy">` : ''}
      </a>
      <button type="button" class="info-i" aria-expanded="false" aria-controls="info-${s.id}" aria-label="In breve: ${s.nome}"><span class="info-i__i" aria-hidden="true">i</span>${ic('chiudi', 'ic info-i__x')}</button>
      <div class="alloggio__info" id="info-${s.id}" role="region" aria-label="${s.nome} in breve">
        <h3>${s.nome.replace(/^(Casa mobile|Tenda Lodge) /, "")} in breve</h3>
        <dl>
          <div><dt>${ic('persone')}<span class="sr">Ospiti</span></dt><dd>Fino a <b>${s.persone} persone</b>, ${mq(s.mq)} m²</dd></div>
          <div><dt>${ic('matrimoniale')}<span class="sr">Letti</span></dt><dd>${s.letti}</dd></div>
          <div><dt>${ic(s.tratti.wcSeparato ? 'separato' : 'doccia')}<span class="sr">Bagno</span></dt><dd>${s.tratti.wcSeparato ? '<b>WC separato</b>: ' : ''}${s.bagno}</dd></div>
          <div><dt>${ic('clima')}<span class="sr">Clima</span></dt><dd>${s.tratti.clima ? 'Aria condizionata' : 'Senza aria condizionata'}</dd></div>
          <div><dt>${ic('veranda')}<span class="sr">Esterno</span></dt><dd>${s.veranda}</dd></div>
          <div><dt>${ic('frigorifero')}<span class="sr">Frigo</span></dt><dd>Frigo ${s.frigo === 'Sì' ? 'incluso' : s.frigo}</dd></div>
          <div><dt>${ic('biancheria')}<span class="sr">Non incluso</span></dt><dd>Biancheria non inclusa, su richiesta</dd></div>
        </dl>
        <a class="link-freccia" href="${pagina(s)}">Pianta e dettagli ${ic('freccia')}</a>
      </div>
      <span class="alloggio__tipo">${ic(s.tipo === 'casa' ? 'casa-mobile' : 'tenda')}${s.tipo === 'casa' ? 'Casa mobile' : 'Tenda lodge'}</span>
      <div class="alloggio__corpo">
        <h2 class="alloggio__nome"><a href="${pagina(s)}">${s.nome}</a></h2>
        <p class="alloggio__frase">${s.frase}</p>
        <div class="dati3">
          <div>${ic('persone')}<strong>${s.persone}</strong><small>persone</small></div>
          <div>${ic('superficie')}<strong>${mq(s.mq)} m²</strong><small>superficie</small></div>
          <div>${ic('camera')}<strong>${s.camere}</strong><small>camere</small></div>
        </div>
        <ul class="tratti">${tratti(s).map(([i, t, k]) => `<li data-k="${k}">${ic(i)}${t}</li>`).join('')}</ul>
        <div class="alloggio__piede">
          <a class="link-freccia" href="${pagina(s)}">Scopri ${ic('freccia')}</a>
          <button type="button" class="btn btn--pieno" data-apri="cassetto-date" data-alloggio="${s.id}">Verifica date</button>
        </div>
      </div>
    </article>`).join('') + `
    <div class="vuoto" id="vuoto" hidden>
      <img src="../assets/brand/sole-minio.svg" alt="">
      <h3>Nessuna sistemazione ha tutto questo</h3>
      <p id="vuoto-testo"></p>
      <button type="button" class="btn btn--scuro" data-azzera>Azzera i filtri</button>
    </div>`;
  const schede = new Map([...$ris.querySelectorAll('.alloggio')].map(el => [el.dataset.id, el]));

  const filtra = () => S.filter(s =>
    (st.tipo === 'tutte' || s.tipo === st.tipo) &&
    s.persone >= st.ospiti &&
    [...st.serve].every(id => DOTAZIONI.find(d => d.id === id).test(s)));

  const ordina = l => {
    const c = [...l];
    if (st.ordina === 'spazio') c.sort((a, b) => b.mq - a.mq);
    if (st.ordina === 'posti') c.sort((a, b) => b.persone - a.persone || b.mq - a.mq);
    return c;
  };

  // Se non c'è niente, suggerisce quale filtro togliere
  const suggerimento = () => {
    const prove = [...st.serve].map(id => {
      st.serve.delete(id); const n = filtra().length; st.serve.add(id);
      return [id, n];
    }).filter(([, n]) => n).sort((a, b) => b[1] - a[1]);
    if (prove.length) {
      const d = DOTAZIONI.find(x => x.id === prove[0][0]);
      return `Togliendo «${d.nome}» ne trovi ${prove[0][1]}.`;
    }
    if (st.tipo !== 'tutte') return 'Prova a cercare tra tutte le tipologie.';
    return 'Per gruppi più grandi puoi prenotare più alloggi insieme, o chiederci un preventivo.';
  };

  const segmento = (gruppo, attr, val) => {
    const bs = [...gruppo.querySelectorAll(`[data-${attr}]`)];
    bs.forEach(b => b.setAttribute('aria-pressed', b.dataset[attr] === val));
    const on = bs.find(b => b.dataset[attr] === val), cur = gruppo.querySelector('.segmento__cursore');
    if (on && cur && on.offsetWidth) { cur.style.width = on.offsetWidth + 'px'; cur.style.transform = `translateX(${on.offsetLeft}px)`; }
  };

  function disegna(anima = true) {
    const lista = ordina(filtra());
    const n = lista.length;

    // controlli
    segmento(document.querySelector('.segmento--tipo'), 'tipo', st.tipo);
    segmento(document.querySelector('.vista'), 'vista', st.vista);
    $osp.textContent = st.ospiti;
    document.getElementById('osp-meno').disabled = st.ospiti <= 1;
    document.getElementById('osp-piu').disabled = st.ospiti >= 6;
    $chips.querySelectorAll('[data-serve]').forEach(b => b.setAttribute('aria-pressed', st.serve.has(b.dataset.serve)));
    const attivi = st.serve.size + (st.ospiti !== 2) + (st.tipo !== 'tutte');
    document.querySelectorAll('.filtro__azzera[data-azzera]').forEach(b => b.hidden = !attivi);
    $nf.textContent = st.serve.size + (st.ospiti !== 2) ? `(${st.serve.size + (st.ospiti !== 2)})` : '';
    $conta.innerHTML = n === S.length ? `Tutte le <span>${n}</span> sistemazioni` : `<span>${n}</span> ${n === 1 ? 'sistemazione adatta' : 'sistemazioni adatte'} su ${S.length}`;
    $vedi.textContent = n ? `Vedi ${n} ${n === 1 ? 'sistemazione' : 'sistemazioni'}` : 'Nessun risultato';

    // schede: Flip registra le posizioni, poi si riordina e si anima il passaggio
    const stato = anima && !FERMO && window.Flip ? Flip.getState([...schede.values()]) : null;
    schede.forEach(el => { el.hidden = true; });
    lista.forEach(s => { const el = schede.get(s.id); el.hidden = false; $ris.insertBefore(el, $ris.querySelector('.vuoto')); });
    schede.forEach(el => el.querySelectorAll('.tratti li').forEach(li => li.classList.toggle('is-cercato', !!li.dataset.k && st.serve.has(li.dataset.k))));
    document.getElementById('vuoto').hidden = !!n;
    if (!n) document.getElementById('vuoto-testo').textContent = suggerimento();
    if (stato) Flip.from(stato, { duration: .7, ease: 'power3.inOut', absolute: true, scale: true,
      onEnter: e => gsap.fromTo(e, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .6, ease: 'power3.out' }),
      onLeave: e => gsap.to(e, { opacity: 0, scale: .92, duration: .4 }),
      onComplete: () => window.ScrollTrigger?.refresh() });

    // confronto in tabella
    const si = v => v ? `<span class="si">${ic('spunta')}<span class="sr">Sì</span></span>` : '<span class="no-v">—</span>';
    $conf.innerHTML = n ? `<table class="confronto">
      <caption class="sr">Confronto tra le sistemazioni</caption>
      <thead><tr><th scope="col">Sistemazione</th><th scope="col">Persone</th><th scope="col">m²</th><th scope="col">Camere</th><th scope="col">Letti</th><th scope="col">Aria cond.</th><th scope="col">WC separato</th><th scope="col">Esterno</th><th scope="col">Frigorifero</th><th scope="col"></th></tr></thead>
      <tbody>${lista.map(s => `<tr>
        <th scope="row"><img src="../assets/foto/${s.foto}.jpg" alt=""><a href="${pagina(s)}">${s.nome}</a></th>
        <td><strong>${s.persone}</strong></td><td>${mq(s.mq)}</td><td>${s.camere}</td><td>${s.letti}</td>
        <td>${si(s.tratti.clima)}</td><td>${si(s.tratti.wcSeparato)}</td><td>${s.veranda}</td><td>${s.frigo}</td>
        <td><a class="link-freccia" href="${pagina(s)}">Scopri</a></td></tr>`).join('')}</tbody></table>` : '';
    $ris.hidden = st.vista !== 'schede';
    $conf.hidden = st.vista !== 'confronto';

    // indirizzo
    const p = new URLSearchParams();
    if (st.ospiti !== 2) p.set('ospiti', st.ospiti);
    if (st.tipo !== 'tutte') p.set('tipo', st.tipo);
    if (st.serve.size) p.set('serve', [...st.serve].join(','));
    history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '') + location.hash);
  }

  // V2: «Verifica date» apre il cassetto con l'alloggio della card e gli ospiti del filtro.
  // Il cassetto lo apre sito.js ([data-apri]); qui si prepara il modulo prima che si veda.
  $ris.addEventListener('click', e => {
    const b = e.target.closest('[data-alloggio]'); if (!b) return;
    const s = S.find(x => x.id === b.dataset.alloggio), f = document.getElementById('form-date');
    f.dataset.prenota = s.id;
    f.setAttribute('aria-label', `Verifica disponibilità: ${s.nome}`);
    document.getElementById('date-nome').textContent = s.nome;
    document.getElementById('date-posti').textContent = `Fino a ${s.persone} persone`;
    if (f.stato) { f.stato.adulti = Math.min(st.ospiti, s.persone); f.stato.bambini = 0; f.disegna(); }
    f.querySelector('[data-errore]').textContent = '';
  });

  // V2: bottone «i» sulla foto apre la scheda in breve
  $ris.addEventListener('click', e => {
    const b = e.target.closest('.info-i'); if (!b) return;
    const box = document.getElementById(b.getAttribute('aria-controls'));
    const aperta = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', aperta); box.classList.toggle('is-aperta', aperta);
  });

  // eventi
  document.querySelectorAll('[data-tipo]').forEach(b => b.addEventListener('click', () => { st.tipo = b.dataset.tipo; disegna(); }));
  document.querySelectorAll('[data-vista]').forEach(b => b.addEventListener('click', () => {
    st.vista = b.dataset.vista; disegna(false);
    if (window.gsap && !FERMO) gsap.from(st.vista === 'schede' ? $ris.children : $conf.querySelectorAll('tr'), { opacity: 0, y: 20, stagger: .04, duration: .5, ease: 'power3.out' });
  }));
  $chips.addEventListener('click', e => {
    const b = e.target.closest('[data-serve]'); if (!b) return;
    st.serve.has(b.dataset.serve) ? st.serve.delete(b.dataset.serve) : st.serve.add(b.dataset.serve); disegna();
  });
  document.getElementById('osp-meno').addEventListener('click', () => { st.ospiti--; disegna(); });
  document.getElementById('osp-piu').addEventListener('click', () => { st.ospiti++; disegna(); });
  document.getElementById('ordina').addEventListener('change', e => { st.ordina = e.target.value; disegna(); });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-azzera]')) { st.tipo = 'tutte'; st.ospiti = 2; st.serve.clear(); disegna(); }
  });

  // foglio filtri su telefono. Su schermo stretto il foglio esce dalla barra:
  // la barra è sticky con backdrop-filter e chiuderebbe il foglio nel suo livello.
  const R = document.documentElement;
  const foglio = document.getElementById('foglio'), posto = foglio.nextElementSibling;
  const stretto = matchMedia('(max-width: 900px)');
  const sposta = () => stretto.matches ? document.body.appendChild(foglio) : posto.before(foglio);
  stretto.addEventListener('change', sposta); sposta();
  document.getElementById('apri-foglio').addEventListener('click', () => { R.classList.add('foglio-aperto'); window.lenis?.stop(); });
  document.querySelectorAll('[data-chiudi-foglio]').forEach(b => b.addEventListener('click', () => {
    R.classList.remove('foglio-aperto'); window.lenis?.start();
    if (b.id === 'vedi') (window.lenis ? lenis.scrollTo('#filtro', { offset: -80 }) : document.getElementById('filtro').scrollIntoView());
  }));

  addEventListener('resize', () => disegna(false));
  disegna(false);
  if (window.gsap && !FERMO) gsap.from($ris.querySelectorAll('.alloggio:not([hidden])'), { opacity: 0, y: 50, stagger: .08, duration: 1, ease: 'power3.out', delay: .4 });

  // arrivo da un link con #id (es. dalla home): porta alla scheda e la evidenzia
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el && el.classList.contains('alloggio')) {
      setTimeout(() => { el.scrollIntoView({ block: 'center' }); el.classList.add('is-evidenziato'); setTimeout(() => el.classList.remove('is-evidenziato'), 2400); }, 600);
    }
  }
  // se si arriva con ?ospiti=… si salta direttamente ai risultati
  if (q.get('ospiti') && !location.hash) setTimeout(() => (window.lenis ? lenis.scrollTo('#filtro', { offset: -60 }) : document.getElementById('filtro').scrollIntoView()), 900);
})();
