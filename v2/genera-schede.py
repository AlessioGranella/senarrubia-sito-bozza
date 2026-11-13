#!/usr/bin/env python3
"""Schede alloggio della bozza V2, generate dallo stesso modello di casa-mobile-mirto.html.

Mirto resta fatta a mano (ha la pianta disegnata). Le altre 6 si rigenerano con:
    python3 genera-schede.py
Testi presi dalle schede del sito attuale (senarrubia.com/sistemazioni/…, 13/11/2026).
Foto: la prima è quella ad alta risoluzione in ../assets/foto, le altre sono quelle
ufficiali del motore MyGuestCare (850 px) in img/alloggi/<id>/: da sostituire con gli originali.
"""
from pathlib import Path

QUI = Path(__file__).parent
IC = '../assets/icone/sistemazione.svg'


def ic(n):
    return f'<svg class="ic" aria-hidden="true"><use href="{IC}#{n}"/></svg>'


def pill(n, t):
    return f'<li><svg class="ic"><use href="{IC}#{n}"/></svg>{t}</li>'


# foto: (file, didascalia). 'h' = foto alta risoluzione in ../assets/foto, numero = img/alloggi/<id>/<n>.jpg
# ambienti: (titolo, indice foto o None, [(icona, testo)])
ALLOGGI = [
    dict(
        id='sunset-comfort', file='casa-mobile-sunset-comfort.html', tipo='Casa mobile', nome='Sunset Comfort',
        persone=5, mq='24 m²', camere=2, camere_sotto='camere, più letto a soppalco',
        quarto=('clima', 'Sì', 'aria condizionata'),
        lead='Soggiorno con divano e angolo cottura, una camera matrimoniale e una cameretta con due letti singoli e un letto a soppalco. Fuori, una veranda coperta.',
        desc='Casa mobile Sunset Comfort: 5 persone, 24 m², due camere, aria condizionata e veranda coperta nella pineta di Arborea.',
        hero='sunset-comfort', hero_dida='Le case mobili Sunset Comfort nella pineta',
        foto=[(2, 'La casa mobile nella pineta'), (0, 'La veranda coperta'), (3, 'Angolo cottura'), (5, 'Camera matrimoniale'), (1, 'Il tavolo del soggiorno'), (4, 'Il bagno')],
        ambienti=[
            ('Soggiorno e cucina', 3, [('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 93 l'), ('microonde', 'Forno a microonde'), ('clima', 'Aria condizionata')]),
            ('Camera matrimoniale', 5, [('matrimoniale', 'Letto matrimoniale'), ('zanzariera', 'Zanzariere')]),
            ('Cameretta', None, [('singolo', '2 letti singoli'), ('castello', 'Letto a soppalco 175 × 65 cm'), ('zanzariera', 'Zanzariere')]),
            ('Bagno', 4, [('doccia', 'Box doccia e lavabo'), ('wc', 'WC')]),
            ('Veranda', 0, [('veranda', 'Coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza')]),
        ],
        dotazioni=dict(
            cucina=[('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 93 l'), ('microonde', 'Forno a microonde'), ('stoviglie', 'Stoviglie per 5 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', '2 letti singoli'), ('castello', 'Letto a soppalco 175 × 65 cm'), ('coperta', 'Cuscini e coperte'), ('zanzariera', 'Zanzariere')],
            bagno=[('doccia', 'Box doccia e lavabo'), ('wc', 'WC')],
            fuori=[('clima', 'Aria condizionata'), ('veranda', 'Veranda coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza'), ('scopa', 'Kit pulizie')],
        ),
    ),
    dict(
        id='sunset-comfort-plus', file='casa-mobile-sunset-comfort-plus.html', tipo='Casa mobile', nome='Sunset Comfort Plus',
        persone=6, mq='30 m²', camere=3, camere_sotto='camere',
        quarto=('veranda', '18 m²', 'veranda coperta'),
        lead='Soggiorno con divano e angolo cottura, una camera matrimoniale, una cameretta con due letti singoli e una con letto a castello. Fuori, una veranda coperta di 18 m².',
        desc='Casa mobile Sunset Comfort Plus: 6 persone, 30 m², tre camere, aria condizionata e veranda coperta di 18 m² nella pineta di Arborea.',
        hero='sunset-comfort-plus', hero_dida='La casa mobile con la veranda',
        foto=[(3, 'La veranda coperta di 18 m²'), (6, 'Camera matrimoniale'), (5, 'Cameretta con due letti singoli'), (4, 'Cameretta con letto a castello'), (0, 'Il bagno con box doccia'), (1, 'Il lavabo')],
        ambienti=[
            ('Soggiorno e cucina', None, [('cucina', 'Angolo cottura con lavello'), ('frigorifero', 'Frigorifero'), ('microonde', 'Forno a microonde'), ('clima', 'Aria condizionata')]),
            ('Camera matrimoniale', 6, [('matrimoniale', 'Letto matrimoniale'), ('zanzariera', 'Zanzariere')]),
            ('Cameretta con due letti', 5, [('singolo', '2 letti singoli'), ('zanzariera', 'Zanzariere')]),
            ('Cameretta con letto a castello', 4, [('castello', 'Letto a castello'), ('zanzariera', 'Zanzariere')]),
            ('Bagno', 0, [('doccia', 'Box doccia e lavabo'), ('wc', 'WC')]),
            ('Veranda', 3, [('veranda', 'Coperta, 18 m²'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza')]),
        ],
        dotazioni=dict(
            cucina=[('cucina', 'Angolo cottura con lavello'), ('frigorifero', 'Frigorifero'), ('microonde', 'Forno a microonde'), ('stoviglie', 'Stoviglie per 6 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', '2 letti singoli'), ('castello', 'Letto a castello'), ('coperta', 'Cuscini e coperte'), ('zanzariera', 'Zanzariere')],
            bagno=[('doccia', 'Box doccia e lavabo'), ('wc', 'WC')],
            fuori=[('clima', 'Aria condizionata'), ('veranda', 'Veranda coperta di 18 m²'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza'), ('scopa', 'Kit pulizie')],
        ),
    ),
    dict(
        id='fenicottero', file='casa-mobile-fenicottero.html', tipo='Casa mobile', nome='Fenicottero',
        persone=6, mq='34 m²', camere=3, camere_sotto='camere',
        quarto=('separato', 'Sì', 'WC separato dal bagno'),
        lead='Zona giorno di 15 m² con divano e angolo cottura, due camere con letti singoli e una matrimoniale con accesso diretto al bagno. Il bagno è diviso in due ambienti: doccia e lavabo da una parte, WC dall’altra.',
        desc='Casa mobile Fenicottero: 6 persone, 34 m², tre camere, WC separato, aria condizionata e veranda coperta nella pineta di Arborea.',
        hero='fenicottero', hero_dida='La casa mobile Fenicottero',
        foto=[(1, 'Zona giorno con divano e angolo cottura'), (2, 'Camera matrimoniale'), (4, 'Camera con due letti singoli'), (5, 'Zona giorno e WC indipendente'), (3, 'Box doccia e lavabo'), (6, 'Seconda camera con letti singoli'), (0, 'Le case mobili Fenicottero nella pineta')],
        ambienti=[
            ('Zona giorno', 1, [('divano-letto', 'Divano'), ('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 160 l + freezer 30 l'), ('microonde', 'Forno a microonde'), ('clima', 'Aria condizionata')]),
            ('Camera matrimoniale', 2, [('matrimoniale', 'Letto matrimoniale'), ('doccia', 'Accesso diretto al bagno'), ('zanzariera', 'Zanzariere')]),
            ('Due camere con letti singoli', 4, [('singolo', '2 letti singoli 80 × 190 cm per camera'), ('zanzariera', 'Zanzariere')]),
            ('Bagno e WC separati', 3, [('doccia', 'Box doccia e lavabo'), ('wc', 'WC in un ambiente a parte')]),
            ('Veranda', 0, [('veranda', 'In legno, coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza')]),
        ],
        evidenza='<strong>WC separato dal bagno.</strong> Doccia e lavabo da una parte, WC dall’altra: due persone possono usarli insieme.',
        dotazioni=dict(
            cucina=[('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 160 l + freezer 30 l'), ('microonde', 'Forno a microonde'), ('stoviglie', 'Stoviglie per 6 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', '4 letti singoli 80 × 190 cm'), ('coperta', 'Cuscini e coperte'), ('zanzariera', 'Zanzariere')],
            bagno=[('doccia', 'Box doccia e lavabo'), ('wc', 'WC in un ambiente a parte')],
            fuori=[('clima', 'Aria condizionata'), ('veranda', 'Veranda in legno coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza'), ('scopa', 'Kit pulizie')],
        ),
    ),
    dict(
        id='fenicottero-plus', file='casa-mobile-fenicottero-plus.html', tipo='Casa mobile', nome='Fenicottero Plus',
        persone=6, mq='36,4 m²', camere=3, camere_sotto='camere',
        quarto=('separato', 'Sì', 'WC separato dal bagno'),
        lead='La più grande: zona giorno di 17,5 m² con divano e angolo cottura, due camere con letti singoli e una matrimoniale con accesso diretto al bagno. Il bagno è diviso in due ambienti.',
        desc='Casa mobile Fenicottero Plus: 6 persone, 36,4 m², tre camere, WC separato, aria condizionata e veranda coperta nella pineta di Arborea.',
        hero='fenicottero-plus', hero_dida='La veranda coperta',
        foto=[(2, 'Zona giorno di 17,5 m²'), (3, 'Camera matrimoniale'), (8, 'Camera con due letti singoli'), (7, 'La veranda coperta'), (6, 'Seconda camera con letti singoli'), (4, 'Box doccia e lavabo'), (5, 'Zona giorno e WC indipendente'), (1, 'Le case mobili nella pineta')],
        ambienti=[
            ('Zona giorno', 2, [('divano-letto', 'Divano'), ('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 160 l + freezer 30 l'), ('microonde', 'Forno a microonde'), ('clima', 'Aria condizionata')]),
            ('Camera matrimoniale', 3, [('matrimoniale', 'Letto matrimoniale'), ('doccia', 'Accesso diretto al bagno'), ('zanzariera', 'Zanzariere')]),
            ('Due camere con letti singoli', 8, [('singolo', '2 letti singoli 80 × 190 cm per camera'), ('zanzariera', 'Zanzariere')]),
            ('Bagno e WC separati', 4, [('doccia', 'Box doccia e lavabo'), ('wc', 'WC in un ambiente a parte')]),
            ('Veranda', 7, [('veranda', 'In legno, coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza')]),
        ],
        evidenza='<strong>WC separato dal bagno.</strong> Doccia e lavabo da una parte, WC dall’altra: due persone possono usarli insieme.',
        dotazioni=dict(
            cucina=[('cucina', 'Angolo cottura attrezzato'), ('frigorifero', 'Frigo 160 l + freezer 30 l'), ('microonde', 'Forno a microonde'), ('stoviglie', 'Stoviglie per 6 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', '4 letti singoli 80 × 190 cm'), ('coperta', 'Cuscini e coperte'), ('zanzariera', 'Zanzariere')],
            bagno=[('doccia', 'Box doccia e lavabo'), ('wc', 'WC in un ambiente a parte')],
            fuori=[('clima', 'Aria condizionata'), ('veranda', 'Veranda in legno coperta'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza'), ('scopa', 'Kit pulizie')],
        ),
    ),
    dict(
        id='tenda-safari', file='tenda-lodge-safari.html', tipo='Tenda lodge', nome='Safari',
        persone=5, mq='27 m²', camere=2, camere_sotto='camere',
        quarto=('tavolo', 'Sì', 'tavolo e sedie fuori'),
        lead='I comfort di una casa per chi ama la vita all’aria aperta. Una camera matrimoniale, una cameretta con letto singolo e letto a castello, cucina attrezzata e bagno con doccia. L’ingresso si chiude con la zip.',
        desc='Tenda Lodge Safari: 5 persone, 27 m², due camere, cucina e bagno privato, nella pineta di Arborea.',
        hero='tenda-safari', hero_dida='La tenda Safari nella pineta',
        foto=[(1, 'La zona giorno con il frigorifero'), (2, 'Cucina e ingresso sulla pedana'), (4, 'Camera matrimoniale'), (3, 'Cameretta con letto singolo e castello'), (0, 'Le tende Safari nella pineta')],
        ambienti=[
            ('Cucina', 2, [('cucina', 'Piano cottura e lavello'), ('frigorifero', 'Frigorifero'), ('stoviglie', 'Stoviglie')]),
            ('Camera matrimoniale', 4, [('matrimoniale', 'Letto matrimoniale')]),
            ('Cameretta', 3, [('singolo', 'Letto singolo'), ('castello', 'Letto a castello')]),
            ('Bagno', None, [('doccia', 'Doccia e lavabo'), ('wc', 'WC')]),
            ('Fuori', 0, [('tavolo', 'Tavolo e sedie'), ('chiave', 'Ingresso con chiusura a zip')]),
        ],
        dotazioni=dict(
            cucina=[('cucina', 'Piano cottura e lavello'), ('frigorifero', 'Frigorifero'), ('stoviglie', 'Stoviglie per 5 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', 'Letto singolo'), ('castello', 'Letto a castello'), ('coperta', 'Cuscini e coperte')],
            bagno=[('doccia', 'Doccia e lavabo'), ('wc', 'WC')],
            fuori=[('tavolo', 'Tavolo e sedie all’esterno'), ('chiave', 'Ingresso con chiusura a zip'), ('scopa', 'Kit pulizie')],
        ),
    ),
    dict(
        id='tenda-oasi', file='tenda-lodge-oasi.html', tipo='Tenda lodge', nome='Oasi',
        persone=5, mq='27 m²', camere=2, camere_sotto='camere',
        quarto=('chiave', 'Sì', 'si chiude a chiave'),
        lead='L’atmosfera del campeggio senza rinunciare ai comfort di casa. Una camera matrimoniale, una cameretta con letto singolo e letto a castello, cucina attrezzata e bagno privato. Si chiude a chiave.',
        desc='Tenda Lodge Oasi: 5 persone, 27 m², due camere, cucina e bagno privato, chiudibile a chiave, nella pineta di Arborea.',
        hero='tenda-oasi', hero_dida='La tenda Oasi nella pineta',
        foto=[(5, 'La cucina'), (4, 'Camera matrimoniale'), (2, 'Cameretta con letto singolo e castello'), (3, 'Il bagno'), (0, 'Le tende Oasi')],
        ambienti=[
            ('Cucina', 5, [('cucina', 'Cucina attrezzata'), ('frigorifero', 'Frigorifero'), ('stoviglie', 'Stoviglie')]),
            ('Camera matrimoniale', 4, [('matrimoniale', 'Letto matrimoniale')]),
            ('Cameretta', 2, [('singolo', 'Letto singolo'), ('castello', 'Letto a castello')]),
            ('Bagno', 3, [('doccia', 'Doccia e lavabo'), ('wc', 'WC')]),
            ('Fuori', 'h', [('ombrellone', 'Ombrellone'), ('tavolo', 'Tavolo e sedie'), ('chiave', 'Cancelletto di sicurezza')]),
        ],
        dotazioni=dict(
            cucina=[('cucina', 'Cucina attrezzata'), ('frigorifero', 'Frigorifero'), ('stoviglie', 'Stoviglie per 5 persone')],
            dormire=[('matrimoniale', 'Letto matrimoniale'), ('singolo', 'Letto singolo'), ('castello', 'Letto a castello'), ('coperta', 'Cuscini e coperte')],
            bagno=[('doccia', 'Doccia e lavabo'), ('wc', 'WC')],
            fuori=[('chiave', 'Si chiude a chiave'), ('ombrellone', 'Ombrellone, tavolo e sedie'), ('veranda', 'Veranda con cancelletto di sicurezza'), ('scopa', 'Kit pulizie')],
        ),
    ),
]


def src(a, f):
    return f'../assets/foto/{a["hero"]}.jpg' if f == 'h' else f'img/alloggi/{a["id"]}/{f}.jpg'


def scheda(a):
    nome_pieno = f'{a["tipo"]} {a["nome"]}'
    art = 'della casa mobile' if a['tipo'] == 'Casa mobile' else 'della tenda lodge'
    # in testa la foto ad alta risoluzione, poi quelle del motore
    foto = [('h', a['hero_dida'])] + a['foto']
    mos = ''.join(
        f'\n      <button type="button" data-foto="{i}"><img src="{src(a, f)}" alt="{d}"></button>'
        for i, (f, d) in enumerate(foto[:5]))
    amb = ''
    for n, (t, fi, voci) in enumerate(a['ambienti'], 1):
        fo = (f'<div class="ambiente__foto"><img src="{src(a, fi)}" alt="" loading="lazy"></div>' if fi is not None
              else '<div class="ambiente__foto ambiente__foto--vuota"><span class="nota-bozza">Foto da avere</span></div>')
        amb += f'''
          <div class="ambiente appare">
            {fo}
            <div><h3 data-n="{n}"><span class="num">{n}</span>{t}</h3>
              <ul>{''.join(pill(i, x) for i, x in voci)}</ul></div>
          </div>'''
    ev = (f'\n        <div class="pianta__evidenza appare" style="margin:0 0 18px">{ic("separato")}<span>{a["evidenza"]}</span></div>'
          if a.get('evidenza') else '')
    d = a['dotazioni']
    dot = ''.join(f'<h3>{t}</h3><ul class="dotazioni-l">{"".join(pill(i, x) for i, x in d[k])}</ul>\n    '
                  for k, t in [('cucina', 'Cucina'), ('dormire', 'Dormire'), ('bagno', 'Bagno'), ('fuori', 'Casa e fuori')])
    fl = ',\n    '.join(f"['{src(a, f)}', '{c}']" for f, c in foto)
    qi, qs, qt = a['quarto']
    return f'''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{nome_pieno} · S'Ena Arrubia Camping Village</title>
<meta name="description" content="{a['desc']}">
<meta name="robots" content="noindex">
<!-- BOZZA V2: generata da genera-schede.py, non modificare a mano -->
<link rel="icon" href="../assets/brand/pittogramma-ufficiale.svg">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/sito.css">
<link rel="stylesheet" href="css/v2.css">
</head>
<body class="pagina-chiara">
<div data-testata></div>

<main>
  <!-- FOTO ----------------------------------------------------------->
  <section class="scheda-apertura contenitore" aria-label="Foto">
    <nav class="briciole" aria-label="Sei qui" style="color:var(--se-fg-muted)"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="sistemazioni.html">Sistemazioni</a><span aria-hidden="true">/</span><span>{a['nome']}</span></nav>
    <div class="mosaico" id="mosaico">{mos}
      <div class="mosaico__tutte"><button type="button" class="btn" data-foto="0">{ic('griglia')}Tutte le {len(foto)} foto</button></div>
    </div>
  </section>

  <div class="contenitore scheda">
    <div class="scheda__principale">
      <!-- TESTA ------------------------------------------------------->
      <header class="scheda__testa">
        <p class="occhiello">{a['tipo']}</p>
        <h1>{a['nome']}</h1>
        <p class="lead">{a['lead']}</p>
        <div class="in-breve">
          <div class="appare">{ic('persone')}<strong>{a['persone']}</strong><span>persone</span></div>
          <div class="appare">{ic('superficie')}<strong>{a['mq']}</strong><span>più la veranda</span></div>
          <div class="appare">{ic('camera')}<strong>{a['camere']}</strong><span>{a['camere_sotto']}</span></div>
          <div class="appare">{ic(qi)}<strong>{qs}</strong><span>{qt}</span></div>
        </div>
        <div class="bottoni-i">
          <button type="button" class="chip-i" data-apri="cassetto-condizioni"><span class="chip-i__i" aria-hidden="true">i</span>Condizioni di prenotazione</button>
          <button type="button" class="chip-i" data-apri="cassetto-dotazioni"><span class="chip-i__i" aria-hidden="true">i</span>Tutte le dotazioni</button>
          <a class="chip-i" href="#t-amb"><span class="chip-i__i" aria-hidden="true" style="font-style:normal">⌂</span>Com’è fatta</a>
        </div>
      </header>

      <!-- COM'È FATTA ------------------------------------------------->
      <section class="scheda__blocco" aria-labelledby="t-amb">
        <h2 id="t-amb" data-righe>Com’è fatta</h2>
        <p class="sotto">Ambiente per ambiente, cosa trovi. <span class="nota-bozza">Pianta da avere dal produttore</span></p>{ev}
        <div class="ambienti">{amb}
        </div>
      </section>

      <!-- V2 · COMPRESO E NON COMPRESO ----------------------------------->
      <section class="scheda__blocco" aria-labelledby="t-tar">
        <h2 id="t-tar" data-righe>Cosa è compreso, e cosa no</h2>
        <p class="sotto">Così sai prima cosa portare da casa e cosa si paga a parte.</p>
        <div class="compreso" id="compreso"></div>
      </section>

      <!-- ORARI ----------------------------------------------------->
      <section class="scheda__blocco" aria-labelledby="t-ora">
        <h2 id="t-ora" data-righe>Orari di arrivo e partenza</h2>
        <p class="sotto">La giornata dalle 8 alle 22.</p>
        <div class="orari" id="orari" aria-hidden="true">
          <div class="orari__linea">
            <span class="orari__tratto orari__tratto--out" style="left:0;width:17.86%"></span>
            <span class="orari__tratto orari__tratto--late" style="left:17.86%;width:53.57%"></span>
            <span class="orari__tratto orari__tratto--in" style="left:60.71%;width:25%"></span>
          </div>
          <div class="orari__ore"><span style="left:0%">8:00</span><span style="left:17.86%">10:30</span><span style="left:35.7%">13:00</span><span style="left:60.71%">16:30</span><span style="left:71.43%">18:00</span><span style="left:85.71%">20:00</span><span style="left:100%">22:00</span></div>
        </div>
        <div class="orari__voci">
          <div class="appare"><span class="pallino" style="background:var(--se-minio)"><svg class="ic"><use href="{IC}#arrivo"/></svg></span><div><strong>16:30 – 20:00</strong><span>Check-in. L’alloggio è pronto dalle 16:30.</span></div></div>
          <div class="appare"><span class="pallino" style="background:var(--se-cotto)"><svg class="ic"><use href="{IC}#partenza"/></svg></span><div><strong>Entro le 10:30</strong><span>Check-out, il giorno della partenza.</span></div></div>
          <div class="appare"><span class="pallino" style="background:var(--se-sabbia);color:var(--se-cotto)"><svg class="ic"><use href="{IC}#orologio"/></svg></span><div><strong>Fino alle 18:00 · € 30</strong><span>Late check-out, se disponibile. Si chiede in reception il giorno prima.</span></div></div>
        </div>
      </section>

      <!-- V2 · DOVE SI TROVA ---------------------------------------------->
      <section class="scheda__blocco" aria-labelledby="t-pos">
        <h2 id="t-pos" data-righe>Dove si trova nel campeggio</h2>
        <p class="sotto">La zona e quanto cammini per arrivare a mare, piscina e servizi.</p>
        <div class="posizione">
          <a class="posizione__mappa appare" href="mappa.html" aria-label="Apri la mappa del campeggio"><img src="img/mappa.jpg" alt="Mappa del campeggio" loading="lazy"></a>
          <div class="appare">
            <ul class="distanze">
              <li><img src="../assets/icone/spiaggia-cani.svg" alt=""><span>Spiaggia</span><strong><span class="vuoto-dato">—</span> m</strong></li>
              <li><img src="../assets/icone/piscina.svg" alt=""><span>Piscina</span><strong><span class="vuoto-dato">—</span> m</strong></li>
              <li><img src="../assets/icone/docce-servizi.svg" alt=""><span>Servizi igienici</span><strong><span class="vuoto-dato">—</span> m</strong></li>
              <li><img src="../assets/icone/ristorante.svg" alt=""><span>Ristorante e bar</span><strong><span class="vuoto-dato">—</span> m</strong></li>
            </ul>
            <p style="margin:14px 0 0"><span class="nota-bozza">Zona e distanze da avere dalla struttura</span></p>
          </div>
        </div>
      </section>

      <!-- SERVIZI GRATUITI ------------------------------------------>
      <section class="scheda__blocco" aria-labelledby="t-grat">
        <h2 id="t-grat" data-righe>Gratis nel campeggio</h2>
        <p class="sotto">Per tutti gli ospiti, senza costi in più.</p>
        <ul class="griglia-ic">
          <li class="appare"><span><svg class="ic"><use href="{IC}#wifi"/></svg></span><span>Wi-Fi<small>Al ristorante e al bar della piscina</small></span></li>
          <li class="appare"><img src="../assets/icone/spiaggia-cani.svg" alt=""><span>Spiaggia libera e Dog Beach</span></li>
          <li class="appare"><img src="../assets/icone/campo-calcio.svg" alt=""><span>Calcetto</span></li>
          <li class="appare"><img src="../assets/icone/beach-tennis-volley.svg" alt=""><span>Beach volley</span></li>
          <li class="appare"><img src="../assets/icone/area-cani.svg" alt=""><span>Dog Park</span></li>
          <li class="appare"><img src="../assets/icone/doccia-cani.svg" alt=""><span>Doccia per cani</span></li>
          <li class="appare"><img src="../assets/icone/parco-giochi.svg" alt=""><span>Parco giochi</span></li>
          <li class="appare"><img src="../assets/icone/barbecue.svg" alt=""><span>Aree barbecue<small>Solo carbonella</small></span></li>
        </ul>
        <h3 style="margin:36px 0 14px;font-size:1.05rem;font-weight:800">Da scaricare</h3>
        <ul class="documenti" id="documenti"></ul>
      </section>
    </div>

    <!-- PRENOTA (laterale) ----------------------------------------->
    <aside class="scheda__lato">
      <form class="box-prenota" id="box-prenota" data-prenota="{a['id']}" novalidate aria-label="Verifica disponibilità {art} {a['nome']}">
        <div class="box-prenota__testa"><strong>{nome_pieno}</strong><span>Fino a {a['persone']} persone</span></div>
        <div class="box-prenota__date">
          <label>Arrivo<input type="date" data-arrivo required></label>
          <label>Partenza<input type="date" data-partenza required></label>
        </div>
        <div class="contatore" data-conta="adulti">
          <span class="contatore__nome">Adulti<small>Dai 18 anni</small></span>
          <span class="contatore__ctrl"><button type="button" class="tondo" data-meno aria-label="Meno adulti"><svg class="ic"><use href="{IC}#meno"/></svg></button><output>2</output><button type="button" class="tondo" data-piu aria-label="Più adulti"><svg class="ic"><use href="{IC}#piu"/></svg></button></span>
        </div>
        <div class="contatore" data-conta="bambini">
          <span class="contatore__nome">Bambini<small>Da 0 a 17 anni</small></span>
          <span class="contatore__ctrl"><button type="button" class="tondo" data-meno aria-label="Meno bambini"><svg class="ic"><use href="{IC}#meno"/></svg></button><output>0</output><button type="button" class="tondo" data-piu aria-label="Più bambini"><svg class="ic"><use href="{IC}#piu"/></svg></button></span>
        </div>
        <div class="eta-bimbi" data-eta hidden></div>
        <p class="box-prenota__errore" data-errore role="alert"></p>
        <button type="submit" class="btn btn--pieno">Verifica disponibilità e prezzi</button>
        <p class="box-prenota__nota">Si apre il nostro sistema di prenotazione.<br>Preferisci parlarci? <a href="https://www.senarrubia.com/richiesta-disponibilita/" target="_blank" rel="noopener">Richiedi un preventivo</a></p>
        <div class="box-prenota__contatti"><a href="tel:+390783809011"><svg class="ic"><use href="{IC}#telefono"/></svg>Chiama</a><span aria-hidden="true">·</span><a href="https://wa.me/393456191288"><svg class="ic"><use href="{IC}#mail"/></svg>WhatsApp</a></div>
      </form>
    </aside>
  </div>

  <!-- ALTRE --------------------------------------------------------->
  <section class="sezione sezione--sabbia" aria-labelledby="t-altre">
    <div class="contenitore">
      <div class="intesta">
        <div><p class="occhiello">Anche per {a['persone']} persone</p><h2 class="titolo-l" id="t-altre" data-righe>Potrebbero piacerti anche</h2></div>
        <a class="link-freccia" href="sistemazioni.html?ospiti={a['persone']}">Confronta tutte {ic('freccia')}</a>
      </div>
      <div class="altre" id="altre" data-alloggio="{a['id']}" data-ospiti="{a['persone']}"></div>
    </div>
  </section>
</main>

<div data-piede></div>

<aside class="cassetto" id="cassetto-condizioni" role="dialog" aria-modal="true" aria-labelledby="t-cond" hidden>
  <div class="cassetto__testa"><h2 id="t-cond"><span class="chip-i__i" aria-hidden="true">i</span>Condizioni di prenotazione</h2><button type="button" class="tondo cassetto__chiudi" aria-label="Chiudi"><svg class="ic"><use href="{IC}#chiudi"/></svg></button></div>
  <div class="cassetto__corpo"><dl class="lista-def" id="condizioni"></dl><h3>Il regolamento completo</h3><ul class="documenti" data-documenti="regolamento"></ul></div>
</aside>
<aside class="cassetto" id="cassetto-dotazioni" role="dialog" aria-modal="true" aria-labelledby="t-dot" hidden>
  <div class="cassetto__testa"><h2 id="t-dot"><span class="chip-i__i" aria-hidden="true">i</span>Dotazioni {art} {a['nome']}</h2><button type="button" class="tondo cassetto__chiudi" aria-label="Chiudi"><svg class="ic"><use href="{IC}#chiudi"/></svg></button></div>
  <div class="cassetto__corpo">
    {dot}<h3>Non compreso</h3><ul class="dotazioni-l">{pill('biancheria', 'Lenzuola e asciugamani')}{pill('no', 'Teli mare, carta igienica')}</ul>
  </div>
</aside>

<!-- barra prenota su telefono -->
<div class="barra-mobile" id="barra-mobile">
  <div><strong>{nome_pieno}</strong><span>{a['persone']} persone · {a['mq']}</span></div>
  <a class="btn btn--pieno" href="#box-prenota">Verifica date</a>
</div>

<!-- lightbox -->
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Foto {art} {a['nome']}" hidden>
  <div class="lightbox__testa"><span id="lb-n"></span><button type="button" data-lb="chiudi" aria-label="Chiudi"><svg class="ic"><use href="{IC}#chiudi"/></svg></button></div>
  <div class="lightbox__scena"><img id="lb-img" alt=""></div>
  <div>
    <p class="lightbox__didascalia" id="lb-dida"></p>
    <div class="lightbox__nav"><button type="button" data-lb="-1" aria-label="Foto precedente"><svg class="ic" style="transform:scaleX(-1)"><use href="{IC}#freccia"/></svg></button><button type="button" data-lb="1" aria-label="Foto successiva"><svg class="ic"><use href="{IC}#freccia"/></svg></button></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="js/dati.js"></script>
<script>window.FOTO_SCHEDA = [
    {fl},
  ];</script>
<script src="js/scheda.js"></script>
<script src="js/sito.js"></script>
<script src="js/v2.js"></script>
</body>
</html>
'''


for a in ALLOGGI:
    (QUI / a['file']).write_text(scheda(a), encoding='utf-8')
    print('scritta', a['file'])
