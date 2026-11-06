// Main page additions on top of the classic three cards (js/script.js stays as it is; index_classic.html does not load this file).
//  - rate and inflation cards get a "back side" opened by a small button: the corridor and recent decisions,
//    inflation by group and versus target;
(function () {
  const T = {
    tj: { more: 'Муфассал', close: 'Пӯшидан', corridor: 'Долони меъёри фоизӣ', credit: 'Қарзи шабонарӯзӣ', rate: 'Меъёри бозтамвил', deposit: 'Амонати шабонарӯзӣ',
          interbank: 'Байнибонкӣ', decisions: 'Қарорҳои охирин', hold: 'бетағйир', pp: 'б.ф.', toCommittee: 'Кумита →',
          groups: 'Таварруми солона аз рӯи гурӯҳҳо', food: 'Хӯрокворӣ', nonfood: 'Ғайрихӯрокворӣ', services: 'Хизматрасонӣ',
          monthly: 'Таваррум дар моҳ', target: 'Ҳадаф', inBand: 'дар доираи ҳадаф', outBand: 'берун аз ҳадаф', toInflation: 'Таваррум →',
          band: 'ҳадаф', corr: 'долон', last: 'Қарори охирини Кумита', views: ['Классикӣ', 'Тира', 'Хат'], view: 'Намуд' },
    ru: { more: 'Подробнее', close: 'Закрыть', corridor: 'Процентный коридор', credit: 'Кредит овернайт', rate: 'Ставка рефинансирования', deposit: 'Депозит овернайт',
          interbank: 'Межбанк', decisions: 'Последние решения', hold: 'без изменений', pp: 'п.п.', toCommittee: 'Комитет →',
          groups: 'Годовая инфляция по группам', food: 'Продовольственные', nonfood: 'Непродовольственные', services: 'Услуги',
          monthly: 'Инфляция за месяц', target: 'Цель', inBand: 'в пределах цели', outBand: 'вне цели', toInflation: 'Инфляция →',
          band: 'цель', corr: 'коридор', last: 'Последнее решение Комитета', views: ['Классический', 'Тёмный', 'Лента'], view: 'Вид' },
    en: { more: 'Details', close: 'Close', corridor: 'Interest rate corridor', credit: 'Overnight loan', rate: 'Refinancing rate', deposit: 'Overnight deposit',
          interbank: 'Interbank', decisions: 'Latest decisions', hold: 'unchanged', pp: 'pp', toCommittee: 'Committee →',
          groups: 'Annual inflation by group', food: 'Food', nonfood: 'Non-food', services: 'Services',
          monthly: 'Monthly inflation', target: 'Target', inBand: 'within target', outBand: 'outside target', toInflation: 'Inflation →',
          band: 'target', corr: 'corridor', last: 'Latest Committee decision', views: ['Classic', 'Dark', 'Strip'], view: 'View' },
  };
  const EMBED = window.NBT_EMBED || null;   // see js/script.js: embedded in another site
  const lang = () => { if (EMBED && EMBED.lang) return EMBED.lang; const l = (document.documentElement.lang || 'tg').slice(0, 2); return l === 'ru' ? 'ru' : l === 'en' ? 'en' : 'tj'; };
  const L = () => T[lang()];
  const num = (v, d) => lang() === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const pagePath = slug => ((EMBED && EMBED.base) || '') + (lang() === 'ru' ? `ru/${slug}_ru.html` : lang() === 'en' ? `eng/${slug}_eng.html` : `other_links/${slug}.html`);
  const todayISO = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ROWS = [];
  const last = key => { for (let i = ROWS.length - 1; i >= 0; i--) if (ROWS[i][key] != null) return { date: String(ROWS[i].date).slice(0, 7), v: +ROWS[i][key] }; return null; };

  // ---------- back sides ----------
  const ICON = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/></svg>';

  function setupCard(card, key) {
    card.classList.add('has-back');
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'card-flip'; btn.innerHTML = ICON + '<span></span>';
    btn.setAttribute('aria-expanded', 'false');
    const back = document.createElement('div');
    back.className = 'card-back'; back.id = 'back-' + key; back.hidden = true;
    btn.setAttribute('aria-controls', back.id);
    card.querySelector('.statistic-body').appendChild(btn);
    card.appendChild(back);
    btn.addEventListener('click', () => open(card, true));
    back.addEventListener('click', e => { if (e.target.closest('.card-back__close')) open(card, false); });
    card.addEventListener('keydown', e => { if (e.key === 'Escape' && card.classList.contains('is-open')) { open(card, false); btn.focus(); } });
  }

  function open(card, on) {
    const back = card.querySelector('.card-back'), btn = card.querySelector('.card-flip');
    btn.setAttribute('aria-expanded', String(on));
    if (on) {
      const b = btn.getBoundingClientRect(), c = card.getBoundingClientRect();
      card.style.setProperty('--ox', (b.left + b.width / 2 - c.left) + 'px');
      card.style.setProperty('--oy', (b.top + b.height / 2 - c.top) + 'px');
      back.hidden = false;
      requestAnimationFrame(() => card.classList.add('is-open'));
      back.querySelector('.card-back__close').focus({ preventScroll: true });
    } else {
      card.classList.remove('is-open');
      setTimeout(() => { if (!card.classList.contains('is-open')) back.hidden = true; }, reduce ? 0 : 420);
    }
  }

  function renderBacks() {
    const t = L();
    document.querySelectorAll('.card-flip span').forEach(s => { s.textContent = t.more; });
    document.querySelectorAll('.card-flip').forEach(b => b.setAttribute('aria-label', t.more));
    const closeBtn = `<button type="button" class="card-back__close" aria-label="${esc(t.close)}">×</button>`;

    // rate: corridor ladder + interbank + last decisions
    const rate = last('rate_eom'), ib = last('interbank');
    const rb = document.getElementById('back-rate');
    if (rb && rate) {
      const rates = {}; ROWS.forEach(r => { if (r.rate_eom != null) rates[String(r.date).slice(0, 7)] = +r.rate_eom; });
      const past = [].concat(...Object.values(window.NBT_MEETINGS || {})).filter(m => m.iso < todayISO).sort((a, b) => a.iso < b.iso ? 1 : -1).slice(0, 3);
      const chip = o => !o ? '<span class="cb-chip">—</span>' : o.kind === 'hold' ? `<span class="cb-chip cb-chip--hold" title="${esc(t.hold)}">= ${esc(t.hold)}</span>`
        : `<span class="cb-chip cb-chip--${o.kind}">${o.delta < 0 ? '↓ −' : '↑ +'}${num(Math.abs(o.delta), 2)} ${t.pp}</span>`;
      rb.innerHTML = `${closeBtn}
        <span class="card-back__title">${esc(t.corridor)}</span>
        <ol class="cb-ladder">
          <li><span>${esc(t.credit)}</span><b>${num(rate.v + 3, 2)}%</b></li>
          <li class="is-centre"><span>${esc(t.rate)}</span><b>${num(rate.v, 2)}%</b></li>
          <li><span>${esc(t.deposit)}</span><b>${num(rate.v - 3, 2)}%</b></li>
        </ol>
        ${ib ? `<p class="cb-note">${esc(t.interbank)} · <b>${num(ib.v, 1)}%</b></p>` : ''}
        <span class="card-back__title">${esc(t.decisions)}</span>
        <ul class="cb-decisions">${past.map(m => `<li><span>${m.iso.slice(8, 10)}.${m.iso.slice(5, 7)}.${m.iso.slice(2, 4)}</span>${chip(window.nbtDecision ? nbtDecision(m, rates) : null)}</li>`).join('')}</ul>
        <a class="card-back__link" href="${pagePath('kumita_bmt')}#meeting">${esc(t.toCommittee)}</a>`;
    }

    // inflation: groups, monthly, target
    const inf = last('inflation_y'), mon = last('inflation');
    const ib2 = document.getElementById('back-inflation');
    if (ib2 && inf) {
      const tg = (window.nbtTargetFor && nbtTargetFor(inf.date)) || { center: 5, band: 2 };
      const inside = Math.abs(inf.v - tg.center) <= tg.band;
      const g = [['inflation_y_f', t.food], ['inflation_y_nf', t.nonfood], ['inflation_y_s', t.services]].map(([k, n]) => [n, last(k)]).filter(x => x[1]);
      ib2.innerHTML = `${closeBtn}
        <span class="card-back__title">${esc(t.groups)}</span>
        <ul class="cb-groups">${g.map(([n, p]) => `<li><span>${esc(n)}</span><b>${num(p.v, 1)}%</b></li>`).join('')}</ul>
        <div class="cb-row">
          ${mon ? `<div><span class="card-back__title">${esc(t.monthly)}</span><b class="cb-big">${mon.v > 0 ? '+' : mon.v < 0 ? '−' : ''}${num(Math.abs(mon.v), 1)}%</b></div>` : ''}
          <div><span class="card-back__title">${esc(t.target)}</span><b class="cb-big">${tg.center}% ± ${tg.band}</b><span class="cb-status ${inside ? 'is-in' : 'is-out'}">${esc(inside ? t.inBand : t.outBand)}</span></div>
        </div>
        <a class="card-back__link" href="${pagePath('inflation')}">${esc(t.toInflation)}</a>`;
    }
  }

  // ---------- rate card footer: the latest decision while the next meeting is not announced ----------
  // inflation card footer: the target in force for the latest month (columns target / target_band in data.xlsx)
  function renderTarget() {
    const el = document.querySelector('.inflation-card .fz-value');
    const last = ROWS.filter(r => r.inflation_y != null).pop();
    const tg = last && window.nbtTargetFor ? nbtTargetFor(String(last.date).slice(0, 7)) : null;
    if (!el || !tg) return;
    el.removeAttribute('data-i18n');
    el.textContent = `${tg.center}% (±${tg.band} ${L().pp})`;
  }

  function renderFooter() {
    const el = document.getElementById('next-meeting');
    const zone = el && el.closest('.statistic-footer');
    if (!zone || (window.nbtNextMeeting && nbtNextMeeting())) return;   // the classic script shows the next meeting
    const t = L();
    const past = [].concat(...Object.values(window.NBT_MEETINGS || {})).filter(m => m.iso < todayISO).sort((a, b) => a.iso < b.iso ? 1 : -1)[0];
    if (!past) return;
    const rates = {}; ROWS.forEach(r => { if (r.rate_eom != null) rates[String(r.date).slice(0, 7)] = +r.rate_eom; });
    const o = window.nbtDecision ? nbtDecision(past, rates) : null;
    const label = zone.querySelector('.fz-label');
    if (label) { label.removeAttribute('data-i18n'); label.textContent = t.last; }
    el.innerHTML = past.iso.split('-').reverse().join('.') + (o ? ` <span class="cb-chip cb-chip--${o.kind} fz-chip">${o.kind === 'hold' ? '= ' + esc(t.hold) : (o.delta < 0 ? '↓ −' : '↑ +') + num(Math.abs(o.delta), 2) + ' ' + t.pp}</span>` : '');
    zone.hidden = false;
  }

  window.nbtHomeFooter = () => renderFooter();

  // ---------- three looks for the cards, remembered per visitor ----------
  function setView(v) {
    // embedded: the look is fixed and set on the block's own wrapper, not on the host page's <body>
    const host = (EMBED && document.querySelector((EMBED.root || '') + ' .nbt-home')) || document.body;
    host.classList.remove('view-1', 'view-2', 'view-3');
    host.classList.add('view-' + v);
    document.querySelectorAll('#viewSwitch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === String(v))));
  }
  function labelViews() {
    const t = L(), sw = document.getElementById('viewSwitch');
    if (!sw) return;
    sw.setAttribute('aria-label', t.view);
    sw.querySelectorAll('button').forEach((b, i) => { b.title = `${t.view}: ${t.views[i]}`; b.setAttribute('aria-label', b.title); });
  }

  // ---------- start ----------
  document.addEventListener('DOMContentLoaded', () => {
    const rateCard = document.querySelector('.rate-card'), inflCard = document.querySelector('.inflation-card');
    if (rateCard) setupCard(rateCard, 'rate');
    if (inflCard) setupCard(inflCard, 'inflation');
    renderBacks();
    labelViews();
    let v = '3';   // look 3 is the site's look (the 1/2/3 switch was removed)
    if (EMBED && EMBED.view) v = String(EMBED.view);
    setView(v);
    const sw = document.getElementById('viewSwitch');
    if (sw) sw.addEventListener('click', e => { const b = e.target.closest('button[data-view]'); if (b) setView(b.dataset.view); });
    nbtLoadRows().then(rows => { ROWS = rows; renderBacks(); renderFooter(); renderTarget(); }).catch(() => {});
    // the classic script switches language in place: follow it
    new MutationObserver(() => { renderBacks(); renderFooter(); renderTarget(); labelViews(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  });
})();
