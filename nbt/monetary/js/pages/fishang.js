const LANG = nbtPageLang();

const I18N = {
  tj: { title: 'Меъёрҳои фишангҳо', note: 'Ҳамаи фишангҳо аз меъёри бозтамвил ҳисоб карда мешаванд. Чап — БМТ пулро аз бонкҳо ҷалб мекунад, рост — ба бонкҳо пешниҳод мекунад',
        absorb: 'Ҷалби пардохтпазирӣ', provide: 'Пешниҳоди пардохтпазирӣ', rate: 'Меъёри бозтамвил', corridor: 'Долони меъёри фоизӣ',
        upTo: 'то', from: 'аз', free: 'бе фоиз', more: 'Муфассал', table: 'Дар ҷадвал', now: 'Ҳоло', give: 'БМТ медиҳад', take: 'БМТ ҷалб мекунад' },
  ru: { title: 'Ставки инструментов', note: 'Все инструменты привязаны к ставке рефинансирования. Слева — НБТ забирает деньги у банков, справа — предоставляет банкам',
        absorb: 'Абсорбирование ликвидности', provide: 'Предоставление ликвидности', rate: 'Ставка рефинансирования', corridor: 'Процентный коридор',
        upTo: 'до', from: 'от', free: 'без процентов', more: 'Подробнее', table: 'В таблице', now: 'Сейчас', give: 'НБТ предоставляет', take: 'НБТ забирает' },
  en: { title: 'Instrument rates', note: 'All instruments are tied to the refinancing rate. Left — the NBT absorbs money from banks, right — provides it to banks',
        absorb: 'Liquidity absorption', provide: 'Liquidity provision', rate: 'Refinancing rate', corridor: 'Interest rate corridor',
        upTo: 'up to', from: 'from', free: 'interest-free', more: 'Details', table: 'In the table', now: 'Now', give: 'NBT provides', take: 'NBT absorbs' },
}[LANG];

const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

(function () {
  const host = document.getElementById('rateScale');
  if (!host) return;

  const rows = side => Array.from(document.querySelectorAll(`.moc-block.${side} .moc-row`));
  const name = (side, i) => (rows(side)[i]?.querySelector('.moc-row__name')?.textContent || '').trim();
  const secTerms = Array.from((rows('absorb')[2] || document).querySelectorAll('.moc-params__value span')).map(s => s.textContent.trim());
  const target = (side, i) => { const r = rows(side)[i]; if (r && !r.id) r.id = `moc-${side}-${i}`; return r ? '#' + r.id : null; };

  const ITEMS = [
    { side: 'absorb',  label: name('absorb', 0),                                  d: -3,   kind: 'fixed', href: target('absorb', 0) },
    { side: 'absorb',  label: `${name('absorb', 2)} · ${secTerms[0] || '7'}`,     d: 0,    kind: 'max',   href: target('absorb', 2) },
    { side: 'absorb',  label: `${name('absorb', 2)} · ${secTerms[1] || '91'}`,    d: 0.5,  kind: 'max',   href: target('absorb', 2) },
    { side: 'absorb',  label: name('absorb', 1),                                  d: 2,    kind: 'max',   href: target('absorb', 1) },
    { side: 'provide', label: name('provide', 0),                                 d: null, kind: 'zero',  href: target('provide', 0) },
    { side: 'provide', label: name('provide', 2),                                 d: 0,    kind: 'min',   href: target('provide', 2) },
    { side: 'provide', label: name('provide', 1),                                 d: 3,    kind: 'fixed', href: target('provide', 1) },
  ];

  function render(rate) {
    const val = it => it.kind === 'zero' ? 0 : rate + it.d;
    const lo = 0, hi = Math.ceil(rate + 4);
    const pos = v => ((v - lo) / (hi - lo) * 100).toFixed(2) + '%';
    const valueText = it => it.kind === 'zero' ? I18N.free
      : `${it.kind === 'max' ? I18N.upTo + ' ' : it.kind === 'min' ? I18N.from + ' ' : ''}${num(val(it), 2)}%`;

    const lanes = {};
    ['absorb', 'provide'].forEach(side => {
      const ends = [];
      ITEMS.filter(i => i.side === side).sort((a, b) => val(a) - val(b)).forEach(it => {
        const x = (val(it) - lo) / (hi - lo);
        let lane = ends.findIndex(e => x - e > 0.26);
        if (lane < 0) { lane = ends.length; ends.push(x); } else ends[lane] = x;
        it.lane = lane;
      });
      lanes[side] = Math.max(1, ends.length);
    });
    const mark = it => `
      <a class="rs-mark rs-mark--${it.side} rs-mark--${it.kind}" style="--x:${pos(val(it))};--lane:${it.lane}" href="${it.href || '#'}" title="${esc(I18N.more)}">
        <span class="rs-mark__value">${esc(valueText(it))}</span>
        <span class="rs-mark__name">${esc(it.label)}</span>
      </a>`;
    const ticks = Array.from({ length: hi + 1 }, (_, i) => i).filter(i => i % (hi > 12 ? 2 : 1) === 0)
      .map(i => `<span class="rs-tick" style="--x:${pos(i)}">${i}%</span>`).join('');

    host.innerHTML = `
      <div class="rs-head"><h2>${esc(I18N.title)}</h2><p>${esc(I18N.note)}</p></div>
      <div class="rs">
        <div class="rs-side rs-side--provide" style="--lanes:${lanes.provide}"><span class="rs-side__label">↑ ${esc(I18N.provide)}</span>${ITEMS.filter(i => i.side === 'provide').map(mark).join('')}</div>
        <div class="rs-axis">
          <span class="rs-corridor" style="--a:${pos(rate - 3)};--b:${pos(rate + 3)}"><em>${esc(I18N.corridor)}</em></span>
          <span class="rs-policy" style="--x:${pos(rate)}"><b>${num(rate, 2)}%</b><small>${esc(I18N.rate)}</small></span>
          ${ticks}
        </div>
        <div class="rs-side rs-side--absorb" style="--lanes:${lanes.absorb}"><span class="rs-side__label">↓ ${esc(I18N.absorb)}</span>${ITEMS.filter(i => i.side === 'absorb').map(mark).join('')}</div>
      </div>`;
  }

  const rangeText = (its, rate) => {
    const v = it => it.kind === 'zero' ? 0 : rate + it.d;
    if (its[0].kind === 'zero') return I18N.free;
    const a = num(v(its[0]), 2), b = its.length > 1 ? num(v(its[its.length - 1]), 2) : null;
    const pre = its[0].kind === 'max' ? I18N.upTo + ' ' : its[0].kind === 'min' ? I18N.from + ' ' : '';
    return pre + (b ? `${a}–${b}%` : `${a}%`);
  };
  function decorate(rate) {

    ITEMS.forEach(it => {
      const row = it.href && document.querySelector(it.href); if (!row) return;
      const same = ITEMS.filter(o => o.href === it.href);
      let live = row.querySelector('.moc-live');
      if (!live) { live = document.createElement('div'); live.className = 'moc-live'; row.querySelector('.moc-row__name').after(live); }
      live.innerHTML = `<small>${esc(I18N.now)}</small> ${esc(rangeText(same, rate))}`;
    });
  }

  document.querySelectorAll('.moc-note a').forEach(a => {
    if (a.getAttribute('href')) return;
    const no = (a.textContent.match(/(?:№|No\.?)\s*(\d+)/) || [])[1];
    const src = no && Array.from(document.querySelectorAll('.x-block .doc-link[href]:not([href=""]):not([href^="#"])')).find(d => new RegExp('(?:№|No\\.?)\\s*' + no + '(?!\\d)').test(d.textContent));
    if (src) a.href = src.getAttribute('href'); else { a.removeAttribute('href'); a.removeAttribute('target'); a.classList.add('is-pending'); }
  });

  nbtLoadRows().then(rows => {
    const last = rows.filter(r => r.rate_eom != null).pop();
    if (last) { render(+last.rate_eom); decorate(+last.rate_eom); }
  }).catch(() => {});
})();
