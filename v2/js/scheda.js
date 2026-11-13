/* S'Ena Arrubia — bozza V2: comportamento comune delle schede alloggio generate da genera-schede.py.
   Legge window.FOTO_SCHEDA ([src, didascalia]) e SISTEMAZIONI (dati.js). */
(function () {
  const ic = n => `<svg class="ic" aria-hidden="true"><use href="../assets/icone/sistemazione.svg#${n}"/></svg>`;

  // Altre sistemazioni con almeno gli stessi posti
  const altre = document.getElementById('altre');
  if (altre && window.SISTEMAZIONI) {
    const id = altre.dataset.alloggio, ospiti = +altre.dataset.ospiti || 0;
    altre.innerHTML = SISTEMAZIONI.filter(s => s.id !== id && s.persone >= ospiti).slice(0, 3).map(s => `
      <a class="card-s appare" href="${s.pagina || 'sistemazioni.html#' + s.id}">
        <img src="../assets/foto/${s.foto}.jpg" alt="" loading="lazy">
        <span class="card-s__vai" aria-hidden="true">${ic('freccia')}</span>
        <span class="card-s__corpo">
          <span class="card-s__tipo">${s.tipo === 'casa' ? 'Casa mobile' : 'Tenda lodge'}</span>
          <h3 class="card-s__nome">${s.nome.replace(/^(Casa mobile|Tenda Lodge) /, '')}</h3>
          <span class="card-s__dati"><span>${ic('persone')}${s.persone}</span><span>${ic('superficie')}${String(s.mq).replace('.', ',')} m²</span><span>${ic('camera')}${s.camere}</span></span>
        </span>
      </a>`).join('');
  }

  // Galleria a tutto schermo
  const FOTO = window.FOTO_SCHEDA || [];
  const lb = document.getElementById('lightbox'), img = document.getElementById('lb-img');
  if (lb && FOTO.length) {
    let i = 0, prima = null;
    const vai = n => {
      i = (n + FOTO.length) % FOTO.length;
      img.src = FOTO[i][0]; img.alt = FOTO[i][1];
      document.getElementById('lb-dida').textContent = FOTO[i][1];
      document.getElementById('lb-n').textContent = `${i + 1} / ${FOTO.length}`;
      if (window.gsap) gsap.fromTo(img, { opacity: 0, scale: .97 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
    };
    const apri = n => { prima = document.activeElement; lb.hidden = false; requestAnimationFrame(() => lb.classList.add('is-aperta')); vai(n); window.lenis?.stop(); lb.querySelector('[data-lb=chiudi]').focus(); };
    const chiudi = () => { lb.classList.remove('is-aperta'); setTimeout(() => lb.hidden = true, 400); window.lenis?.start(); prima?.focus(); };
    document.querySelectorAll('[data-foto]').forEach(b => b.addEventListener('click', () => apri(+b.dataset.foto)));
    lb.addEventListener('click', e => { const b = e.target.closest('[data-lb]'); if (!b) { if (e.target === lb || e.target.classList.contains('lightbox__scena')) chiudi(); return; } b.dataset.lb === 'chiudi' ? chiudi() : vai(i + +b.dataset.lb); });
    addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') chiudi(); if (e.key === 'ArrowRight') vai(i + 1); if (e.key === 'ArrowLeft') vai(i - 1); });
    let x0 = null; lb.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) vai(i + (d < 0 ? 1 : -1)); x0 = null; });
  }

  // Barra prenota su telefono: compare dopo le foto, sparisce quando il riquadro è visibile
  const barra = document.getElementById('barra-mobile'), box = document.getElementById('box-prenota');
  if (barra && box) {
    let boxVisibile = false;
    const aggiorna = () => barra.classList.toggle('is-visibile', scrollY > innerHeight * .6 && !boxVisibile);
    new IntersectionObserver(([e]) => { boxVisibile = e.isIntersecting; aggiorna(); }).observe(box);
    addEventListener('scroll', aggiorna, { passive: true });
    barra.querySelector('a').addEventListener('click', e => { e.preventDefault(); window.lenis ? lenis.scrollTo(box, { offset: -100 }) : box.scrollIntoView({ block: 'center' }); });
  }

  // Linea degli orari che si disegna (gsap è caricato prima di questo file)
  if (window.gsap && window.ScrollTrigger && document.getElementById('orari') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.orari__tratto', { scaleX: 0, transformOrigin: 'left', duration: 1.2, stagger: .25, ease: 'power3.inOut', scrollTrigger: { trigger: '#orari', start: 'top 80%' } });
  }
})();
