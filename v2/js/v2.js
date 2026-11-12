/* S'Ena Arrubia — bozza V2: blocchi ripetuti in più pagine, riempiti da dati.js.
   #compreso → compreso / non compreso · #condizioni → condizioni di prenotazione · #documenti → PDF da scaricare */

(function () {
  const ic = window.ic;
  const icona = k => k.startsWith('img:') ? `<img src="../assets/icone/${k.slice(4)}.svg" alt="">` : ic(k);
  const voce = ([k, t, s]) => `<li>${icona(k)}<span>${t}${s ? `<small>${s}</small>` : ''}</span></li>`;

  const $c = document.getElementById('compreso');
  if ($c) $c.innerHTML = `
    <div class="compreso__col compreso__col--si appare"><h3><span class="compreso__segno">${ic('spunta')}</span>Compreso nella tariffa</h3><ul>${COMPRESO.map(voce).join('')}</ul></div>
    <div class="compreso__col compreso__col--no appare"><h3><span class="compreso__segno">${ic('no')}</span>Non compreso</h3><ul>${ESCLUSO.map(voce).join('')}</ul></div>`;

  const $k = document.getElementById('condizioni');
  if ($k) $k.innerHTML = CONDIZIONI.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('');

  document.querySelectorAll('[data-documenti], #documenti').forEach($d => {
    const solo = ($d.dataset.documenti || '').split(',').filter(Boolean);
    $d.innerHTML = DOCUMENTI.filter(d => !solo.length || solo.includes(d.id)).map(d => d.url
      ? `<li><a href="${d.url}" target="_blank" rel="noopener"><span class="doc__ico">PDF</span><span><strong>${d.nome}</strong><small>${d.peso}</small></span>${ic('freccia')}</a></li>`
      : `<li><span class="doc" title="Documento da avere dalla struttura"><span class="doc__ico">PDF</span><span><strong>${d.nome}</strong><small>Da caricare</small></span></span></li>`).join('');
  });

  // le animazioni .appare sono già registrate da sito.js: se i blocchi arrivano dopo, si rinfresca
  if (window.ScrollTrigger && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollTrigger.batch(document.querySelectorAll('#compreso .appare'), { start: 'top 88%', onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: .09, ease: 'power3.out' }) });
    ScrollTrigger.refresh();
  } else document.querySelectorAll('#compreso .appare').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
})();
