/* S'Ena Arrubia — comportamento comune a tutte le pagine.
   Movimento: GSAP + ScrollTrigger + SplitText (come La Sala Plaza) e Lenis per lo scorrimento morbido.
   Tutto rispetta prefers-reduced-motion: se l'utente lo chiede, niente animazioni. */

(function () {
  const R = document.documentElement;
  R.classList.add('js');
  const FERMO = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IC = 'assets/icone/sistemazione.svg#';
  window.ic = (n, c = 'ic') => `<svg class="${c}" aria-hidden="true"><use href="${IC}${n}"/></svg>`;

  /* ------------------------------------------------ testata e piede comuni */
  const VOCI = [
    ['Sistemazioni', 'sistemazioni.html'], ['Natura', '#'], ['Pet', '#'], ['Servizi', '#'],
    ['Esperienze', '#'], ['Offerte', '#'], ['Traghetti', '#'], ['Dove siamo', 'index.html#dove'],
  ];
  const qui = location.pathname.split('/').pop() || 'index.html';
  const attiva = h => (qui.startsWith('casa-mobile') && h === 'sistemazioni.html') || h === qui ? ' aria-current="page"' : '';

  const testata = document.querySelector('[data-testata]');
  if (testata) {
    testata.outerHTML = `
    <header class="testata" id="testata">
      <a class="testata__logo" href="index.html" aria-label="S'Ena Arrubia Camping Village, home">
        <img class="logo-bianco" src="assets/brand/logo-bianco.svg" alt="">
        <img class="logo-colore" src="assets/brand/logo-ufficiale.svg" alt="">
      </a>
      <nav class="testata__nav" aria-label="Principale">${VOCI.map(([t, h]) => `<a href="${h}"${attiva(h)}>${t}</a>`).join('')}</nav>
      <div class="testata__azioni">
        <button class="testata__lingua" type="button" aria-label="Lingua: italiano">IT</button>
        <a class="btn btn--pieno btn--prenota-testata" href="${MOTORE.link()}" target="_blank" rel="noopener">Prenota</a>
        <button class="testata__menu" type="button" aria-label="Apri il menu" aria-expanded="false"><span></span><span></span></button>
      </div>
    </header>
    <div class="menu-mobile" id="menu-mobile" aria-hidden="true">
      <nav aria-label="Menu">${VOCI.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <div class="menu-mobile__contatti">
        <a href="tel:+390783809011">+39 0783 809011</a>
        <a href="mailto:booking@senarrubia.com">booking@senarrubia.com</a>
        <a class="btn btn--bianco" href="${MOTORE.link()}" target="_blank" rel="noopener" style="justify-self:start;margin-top:12px">Prenota</a>
      </div>
    </div>`;
  }

  const piede = document.querySelector('[data-piede]');
  if (piede) {
    piede.outerHTML = `
    <footer class="piede">
      <span class="se-archi se-archi--ad" aria-hidden="true"></span>
      <div class="contenitore">
        <div class="piede__grande">
          <p>Ti aspettiamo per creare ricordi indimenticabili.</p>
          <a class="btn btn--bianco" href="${MOTORE.link()}" target="_blank" rel="noopener">Verifica disponibilità ${ic('freccia')}</a>
        </div>
        <div class="piede__colonne">
          <div>
            <img class="piede__logo" src="assets/brand/logo-bianco.svg" alt="S'Ena Arrubia Camping Village">
            <p>Strada 29 Ovest, 09092 Arborea (OR)</p>
          </div>
          <div><h3>Il campeggio</h3><ul>${VOCI.slice(0, 5).map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
          <div><h3>Utile</h3><ul><li><a href="#">Offerte</a></li><li><a href="#">Traghetti</a></li><li><a href="https://www.senarrubia.com/wp-content/uploads/mappa-2025.pdf">Mappa</a></li><li><a href="https://www.senarrubia.com/wp-content/uploads/brochure-senarrubia.pdf">Brochure</a></li><li><a href="${MOTORE.preventivo}">Richiedi preventivo</a></li></ul></div>
          <div><h3>Contatti</h3><ul><li><a href="tel:+390783809011">+39 0783 809011</a></li><li><a href="https://wa.me/393456191288">WhatsApp +39 345 6191288</a></li><li><a href="mailto:booking@senarrubia.com">booking@senarrubia.com</a></li><li><a href="https://www.instagram.com/campingsenarrubia/">Instagram</a></li></ul></div>
        </div>
        <div class="piede__fondo">
          <span>© S'Ena Arrubia Camping · P.IVA 01173130954</span>
          <span><a href="#">Privacy</a> · <a href="#">Cookie</a> · Booking engine: Mycompany Srl</span>
        </div>
      </div>
    </footer>`;
  }

  /* ------------------------------------------------------- scorrimento */
  let lenis = null;
  if (!FERMO && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.lenis = lenis;
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* --------------------------------------- testata: solida e a scomparsa */
  const T = document.getElementById('testata');
  const pagChiara = document.body.classList.contains('pagina-chiara');
  let ultimo = 0;
  const suScroll = () => {
    const y = scrollY;
    if (!pagChiara) T.classList.toggle('is-solida', y > innerHeight * .6);
    T.classList.toggle('is-nascosta', y > 400 && y > ultimo && !R.classList.contains('menu-aperto'));
    ultimo = y;
  };
  addEventListener('scroll', suScroll, { passive: true }); suScroll();

  const bm = T.querySelector('.testata__menu');
  const mm = document.getElementById('menu-mobile');
  bm.addEventListener('click', () => {
    const aperto = R.classList.toggle('menu-aperto');
    bm.setAttribute('aria-expanded', aperto); bm.setAttribute('aria-label', aperto ? 'Chiudi il menu' : 'Apri il menu');
    mm.setAttribute('aria-hidden', !aperto);
    aperto ? lenis?.stop() : lenis?.start();
    if (aperto && window.gsap && !FERMO) gsap.from(mm.querySelectorAll('nav a'), { yPercent: 100, opacity: 0, stagger: .05, duration: .8, ease: 'power3.out', delay: .2 });
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && R.classList.contains('menu-aperto')) bm.click(); });

  /* ------------------------------------------ prenotazione (motore MyGuestCare)
     Ogni [data-prenota] ha date, adulti, bambini ed età. Al submit apre il motore. */
  const iso = d => d.toISOString().slice(0, 10);
  const opzioni = (a, b, sel) => Array.from({ length: b - a + 1 }, (_, i) => a + i).map(n => `<option value="${n}"${n === sel ? ' selected' : ''}>${n}</option>`).join('');
  window.montaPrenota = function (f) {
    const $a = f.querySelector('[data-arrivo]'), $p = f.querySelector('[data-partenza]');
    const $err = f.querySelector('[data-errore]'), $eta = f.querySelector('[data-eta]'), $rias = f.querySelector('[data-riassunto]');
    const st = { adulti: 2, bambini: 0 };
    const max = { adulti: 8, bambini: 6 };
    const oggi = new Date(); $a.min = iso(oggi);
    $a.addEventListener('change', () => {
      if (!$a.value) return;
      const n = new Date($a.value); n.setDate(n.getDate() + 1); $p.min = iso(n);
      if (!$p.value || $p.value <= $a.value) $p.value = iso(n);
    });
    const disegna = () => {
      f.querySelectorAll('[data-conta]').forEach(c => {
        const k = c.dataset.conta;
        c.querySelector('output').textContent = st[k];
        c.querySelector('[data-meno]').disabled = st[k] <= (k === 'adulti' ? 1 : 0);
        c.querySelector('[data-piu]').disabled = st[k] >= max[k];
      });
      if ($eta) {
        const prima = [...$eta.querySelectorAll('select')].map(s => s.value);
        $eta.innerHTML = Array.from({ length: st.bambini }, (_, i) =>
          `<label>Età bambino ${i + 1}<select aria-label="Età bambino ${i + 1}"><option value="">—</option>${opzioni(0, 17, prima[i] === undefined || prima[i] === '' ? -1 : +prima[i])}</select></label>`).join('');
        $eta.hidden = !st.bambini;
      }
      if ($rias) $rias.textContent = `${st.adulti} adult${st.adulti === 1 ? 'o' : 'i'}${st.bambini ? `, ${st.bambini} bambin${st.bambini === 1 ? 'o' : 'i'}` : ''}`;
    };
    f.querySelectorAll('[data-conta]').forEach(c => {
      const k = c.dataset.conta;
      c.querySelector('[data-meno]').addEventListener('click', () => { st[k]--; disegna(); });
      c.querySelector('[data-piu]').addEventListener('click', () => { st[k]++; disegna(); });
    });
    // finestrella ospiti (barra in home)
    const tasto = f.querySelector('[data-apri-ospiti]'), pop = f.querySelector('.prenota__pop');
    if (tasto && pop) {
      tasto.addEventListener('click', e => { e.stopPropagation(); const a = pop.classList.toggle('is-aperto'); tasto.setAttribute('aria-expanded', a); });
      pop.addEventListener('click', e => e.stopPropagation());
      document.addEventListener('click', () => { pop.classList.remove('is-aperto'); tasto.setAttribute('aria-expanded', 'false'); });
    }
    f.addEventListener('submit', e => {
      e.preventDefault(); $err.textContent = '';
      if (!$a.value || !$p.value) return $err.textContent = 'Scegli le date di arrivo e partenza.';
      if ($p.value <= $a.value) return $err.textContent = 'La partenza deve essere dopo l’arrivo.';
      const eta = $eta ? [...$eta.querySelectorAll('select')].map(s => s.value) : [];
      if (eta.includes('')) { pop?.classList.add('is-aperto'); return $err.textContent = 'Indica l’età di ogni bambino.'; }
      window.open(MOTORE.link({ arrivo: $a.value, partenza: $p.value, adulti: st.adulti, bambini: st.bambini, eta }), '_blank', 'noopener');
    });
    f.stato = st; f.disegna = disegna;
    disegna();
  };
  document.querySelectorAll('[data-prenota]').forEach(montaPrenota);

  /* ------------------------------------------------------- animazioni */
  if (FERMO || !window.gsap) { document.querySelectorAll('.hero__media img')[0]?.classList.add('is-attiva'); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText);
  window.addEventListener('load', () => ScrollTrigger.refresh());

  // HERO: immagini che si alternano con zoom lento, titolo che sale riga per riga
  const hero = document.querySelector('.hero');
  if (hero) {
    const imgs = [...hero.querySelectorAll('.hero__media img')];
    const punti = hero.querySelector('.hero__punti');
    punti.innerHTML = imgs.map((_, i) => `<button type="button" aria-label="Foto ${i + 1}"><i></i></button>`).join('');
    const barre = [...punti.querySelectorAll('i')];
    let i = 0, giro;
    const mostra = n => {
      giro?.kill();
      const prec = imgs[i]; i = n;
      gsap.set(barre, { scaleX: 0 }); barre.slice(0, n).forEach(b => gsap.set(b, { scaleX: 1 }));
      gsap.fromTo(imgs[i], { opacity: 0, scale: 1.14 }, { opacity: 1, duration: 1.4, ease: 'power2.out' });
      gsap.to(imgs[i], { scale: 1, duration: 7, ease: 'none' });
      if (prec !== imgs[i]) gsap.to(prec, { opacity: 0, duration: 1.4, delay: .2 });
      giro = gsap.to(barre[i], { scaleX: 1, duration: 6, ease: 'none', onComplete: () => mostra((i + 1) % imgs.length) });
    };
    punti.querySelectorAll('button').forEach((b, n) => b.addEventListener('click', () => mostra(n)));
    const tit = hero.querySelector('.hero__titolo');
    const sp = new SplitText(tit, { type: 'lines', mask: 'lines' });
    const tl = gsap.timeline({ delay: .15 });
    tl.add(() => mostra(0))
      .from(sp.lines, { yPercent: 110, duration: 1.2, stagger: .12, ease: 'power4.out' }, .2)
      .from('.hero__sotto, .hero__punti', { opacity: 0, y: 20, duration: .9, ease: 'power3.out' }, .8)
      .from('.prenota', { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out' }, .7)
      .from('.testata', { y: -30, opacity: 0, duration: .9, ease: 'power3.out' }, .5);
    // il contenuto della hero si allontana mentre si scorre
    gsap.to('.hero__media', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__corpo', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true } });
  }

  // APERTURA delle pagine interne
  const ap = document.querySelector('.apertura, .scheda-apertura');
  if (ap) {
    const h = ap.querySelector('h1');
    const sp = h && new SplitText(h, { type: 'lines', mask: 'lines' });
    const tl = gsap.timeline({ delay: .1 });
    if (ap.querySelector('.apertura__img img')) tl.from('.apertura__img img', { scale: 1.18, duration: 2, ease: 'power3.out' }, 0);
    if (sp) tl.from(sp.lines, { yPercent: 110, duration: 1.1, stagger: .1, ease: 'power4.out' }, .2);
    tl.from(ap.querySelectorAll('.briciole, .apertura p, .scheda__testa .lead, .scheda__testa .tratti'), { opacity: 0, y: 24, duration: .9, stagger: .08, ease: 'power3.out' }, .5);
    if (ap.querySelector('.apertura__img')) gsap.to('.apertura__img', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: ap, start: 'top top', end: 'bottom top', scrub: true } });
  }
  const mos = document.querySelectorAll('.mosaico button');
  if (mos.length) gsap.from(mos, { clipPath: 'inset(0 0 100% 0)', duration: 1.3, stagger: .08, ease: 'power4.inOut', delay: .2 });

  // MANIFESTO: le parole si accendono una a una mentre si scorre (scrub)
  document.querySelectorAll('.manifesto__testo').forEach(el => {
    const sp = new SplitText(el, { type: 'words', wordsClass: 'parola' });
    gsap.to(sp.words, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: .6 } });
  });

  // Cifre che contano
  document.querySelectorAll('[data-conta-a]').forEach(el => {
    const fine = +el.dataset.contaA, o = { v: 0 };
    gsap.to(o, { v: fine, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString('it-IT') + (el.dataset.suffisso || ''); } });
  });

  // Titoli: righe che salgono
  document.querySelectorAll('[data-righe]').forEach(el => {
    const sp = new SplitText(el, { type: 'lines', mask: 'lines' });
    gsap.from(sp.lines, { yPercent: 105, duration: 1.1, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // Blocchi che appaiono
  ScrollTrigger.batch('.appare', {
    start: 'top 88%',
    onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: .09, ease: 'power3.out', overwrite: true }),
  });

  // Immagini che si svelano dal basso e poi si muovono lente (parallasse)
  document.querySelectorAll('.tenda-img').forEach(el => {
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  document.querySelectorAll('[data-parallasse] img').forEach(img => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // SISTEMAZIONI IN ORIZZONTALE: la sezione si ferma e le card scorrono di lato
  const orz = document.querySelector('.orizzontale');
  if (orz) {
    const bin = orz.querySelector('.orizzontale__binario');
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const dist = () => bin.scrollWidth - innerWidth;
      gsap.to(bin, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: orz, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1 } });
      bin.querySelectorAll('.card-s img').forEach(img => gsap.fromTo(img, { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: orz, start: 'top top', end: () => '+=' + dist(), scrub: true } }));
    });
    mm.add('(max-width: 899px)', () => { orz.style.overflowX = 'auto'; orz.style.scrollSnapType = 'x mandatory'; bin.querySelectorAll('.card-s').forEach(c => c.style.scrollSnapAlign = 'center'); });
  }

  // PANNELLI: spiaggia, pineta, oasi si impilano uno sull'altro
  const pann = gsap.utils.toArray('.pannello');
  pann.forEach((p, n) => {
    const img = p.querySelector('.pannello__img img');
    gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'top top', scrub: true } });
    gsap.from(p.querySelectorAll('.pannello__corpo > *'), { y: 50, opacity: 0, duration: 1, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 45%' } });
    if (n < pann.length - 1) {
      ScrollTrigger.create({ trigger: p, start: 'top top', pin: true, pinSpacing: false, end: () => '+=' + p.offsetHeight });
      gsap.to(p.querySelector('.pannello__corpo'), { opacity: 0, y: -60, ease: 'none', scrollTrigger: { trigger: pann[n + 1], start: 'top 70%', end: 'top 20%', scrub: true } });
    }
  });

  // GALLERIA SPARSA: le foto arrivano da fuori e si dispongono attorno al titolo
  const sparsa = document.querySelector('.sparsa');
  if (sparsa) {
    const foto = gsap.utils.toArray('.sparsa__foto');
    const tl = gsap.timeline({ scrollTrigger: { trigger: sparsa, start: 'top top', end: 'bottom bottom', scrub: 1 } });
    foto.forEach((f, n) => {
      const dx = (+f.dataset.x - 50) * 3, dy = (+f.dataset.y - 50) * 3 + 60;
      tl.from(f, { xPercent: dx, yPercent: dy, scale: .4, rotate: (n % 2 ? 1 : -1) * 12, opacity: 0, ease: 'power2.out', duration: 1 }, n * .06);
    });
    tl.from('.sparsa__titolo', { scale: .85, opacity: 0, duration: .8 }, .2);
  }
})();
