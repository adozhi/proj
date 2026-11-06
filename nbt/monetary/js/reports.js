(function () {

  const LANG = window.nbtPageLang ? window.nbtPageLang() : 'tj';
  const T = {
    tj: { latest: 'Нашри охирин', archive: last => `Бойгонӣ: нашри охирин — соли ${last}`, issues: (n, y) => `${n} нашр аз соли ${y}`,
          calendar: 'Тақвими нашрҳо', bank: 'Бонки миллии Тоҷикистон', hint: 'Ҳар як нашр дар моҳе ҷойгир аст, ки давраи ҳисоботӣ ба охир мерасад',
          hintP: 'Ҳар як сутун — давраи ҳисоботӣ', other: 'Дигар',
          months: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'] },
    ru: { latest: 'Последний выпуск', archive: last => `Архив: последний выпуск — ${last} год`, issues: (n, y) => `выпусков с ${y} года: ${n}`,
          calendar: 'Календарь выпусков', bank: 'Национальный банк Таджикистана', hint: 'Каждый выпуск стоит в месяце, которым заканчивается отчётный период',
          hintP: 'Каждый столбец — отчётный период', other: 'Другие',
          months: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'] },
    en: { latest: 'Latest issue', archive: last => `Archive: last issue published in ${last}`, issues: (n, y) => `${n} issues since ${y}`,
          calendar: 'Publication calendar', bank: 'National Bank of Tajikistan', hint: 'Each issue sits in the month its reporting period ends',
          hintP: 'Each column is a reporting period', other: 'Other',
          months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
  }[LANG];

  const ICON = {
    pdf:  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    xlsx: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  };
  const NAME = { pdf: 'PDF', xlsx: 'Excel' };

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  window.nbtRenderReports = function (opts) {
    const years = (opts.years || []).filter(y => y.items.length).sort((a, b) => b.year - a.year);
    const nav   = document.getElementById('year-nav');
    const list  = document.getElementById('reports-list');
    if (!list || !years.length) return;
    if (nav) nav.remove();

    const pageTitle = (document.querySelector('.page-title') || {}).textContent || '';
    const newest = years[0];
    const latest = newest.items.reduce((a, b) => (b.end >= a.end ? b : a));
    const oldest = years[years.length - 1].year;
    const count  = years.reduce((n, y) => n + y.items.length, 0);

    const cover = `
      <section class="rp-latest" aria-label="${esc(T.latest)}">
        <a class="rp-cover" href="${esc(latest.files[0].href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(pageTitle + ' — ' + latest.title + ' ' + newest.year + ', PDF')}">
          <span class="rp-cover__bank">${esc(T.bank)}</span>
          <span class="rp-cover__name">${esc(pageTitle)}</span>
          <span class="rp-cover__period">${esc(latest.title)}</span>
          <span class="rp-cover__year">${newest.year}</span>
        </a>
        <div class="rp-latest__body">
          <span class="rp-latest__label">${esc(T.latest)}</span>
          <h2 class="rp-latest__title">${esc(latest.title)} ${newest.year}</h2>
          ${latest.sub ? `<p class="rp-latest__sub">${esc(latest.sub)}</p>` : ''}
          <div class="rp-latest__files">
            ${latest.files.map(f => `<a href="${esc(f.href)}" class="rp-btn rp-btn--${f.type}" target="_blank" rel="noopener noreferrer">${ICON[f.type]} ${NAME[f.type]}</a>`).join('')}
          </div>
        </div>
      </section>`;

    const freq = {};
    years.forEach(y => new Set(y.items.map(i => i.end)).forEach(e => { freq[e] = (freq[e] || 0) + 1; }));
    const monthly = Object.keys(freq).length > 6 && years.some(y => y.items.length > 6);
    const COLS = monthly ? Array.from({ length: 12 }, (_, i) => i + 1) : Object.keys(freq).map(Number).filter(e => freq[e] >= 3).sort((a, b) => a - b);
    const hasOther = !monthly && years.some(y => y.items.some(i => !COLS.includes(i.end)));
    const colName = e => {
      if (monthly) return T.months[e - 1];
      for (const y of years) { const it = y.items.find(i => i.end === e); if (it) return it.title; }
      return T.months[e - 1];
    };

    const chip = (it, y, isLatest) => {
      const label = it.title + ' ' + y.year;
      const main = it.files[0], extra = it.files.slice(1);
      return `<a class="rp-cal__main" href="${esc(main.href)}" target="_blank" rel="noopener noreferrer" title="${esc(label)}" aria-label="${esc(label + ', ' + NAME[main.type])}">
            ${it.short ? `<b>${esc(it.short)}</b>` : ''}${ICON[main.type]}
          </a>${extra.map(f => `<a class="rp-cal__extra" href="${esc(f.href)}" target="_blank" rel="noopener noreferrer" title="${esc(label + ' — ' + NAME[f.type])}" aria-label="${esc(label + ', ' + NAME[f.type])}">${ICON[f.type]}</a>`).join('')}`;
    };

    const cell = (y, m) => {
      const it = y.items.find(i => i.end === m);
      if (!it) return `<td class="rp-cal__empty"><span aria-hidden="true"></span></td>`;
      const isLatest = y === newest && it === latest;
      return `<td class="rp-cal__issue${isLatest ? ' is-latest' : ''}">${chip(it, y, isLatest)}</td>`;
    };
    const otherCell = y => {
      const rare = y.items.filter(i => !COLS.includes(i.end));
      return rare.length ? `<td class="rp-cal__issue rp-cal__other">${rare.map(it => chip(Object.assign({}, it, { short: it.short || it.title }), y, false)).join(' ')}</td>` : `<td class="rp-cal__empty"><span aria-hidden="true"></span></td>`;
    };

    const calendar = `
      <section class="rp-calendar" aria-labelledby="rp-cal-title">
        <div class="rp-calendar__head">
          <h2 id="rp-cal-title">${esc(T.calendar)}</h2>
        </div>
        <div class="rp-cal__scroll" tabindex="0"${monthly ? '' : ` style="max-width:${90 + (COLS.length + (hasOther ? 1 : 0)) * 170}px"`}>
          <table class="rp-cal${monthly ? '' : ' rp-cal--periods'}">
            <thead><tr><th scope="col"></th>${COLS.map(e => `<th scope="col">${esc(colName(e))}</th>`).join('')}${hasOther ? `<th scope="col">${esc(T.other)}</th>` : ''}</tr></thead>
            <tbody>
              ${years.map(y => `<tr id="y${y.year}"><th scope="row">${y.year}</th>${COLS.map(e => cell(y, e)).join('')}${hasOther ? otherCell(y) : ''}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>`;

    list.innerHTML = (opts.archive ? `<p class="rp-archive">${esc(T.archive(newest.year))}</p>` : '') + cover + calendar;

    function focusYear() {
      const y = location.hash.slice(1);
      list.querySelectorAll('tr.is-target').forEach(r => r.classList.remove('is-target'));
      const row = /^\d{4}$/.test(y) && document.getElementById('y' + y);
      if (row) { row.classList.add('is-target'); row.scrollIntoView({ block: 'center', behavior: 'instant' }); }
    }
    window.addEventListener('hashchange', focusYear);
    focusYear();
  };

  window.nbtPeriodName = {
    tj: { '01-03': 'Семоҳаи I', '01-06': 'Нимсолаи I', '01-09': '9 моҳ', '01-12': 'Сол' },
    ru: { '01-03': 'I квартал', '01-06': 'I полугодие', '01-09': '9 месяцев', '01-12': 'Год' },
    en: { '01-03': 'Q1', '01-06': 'H1', '01-09': '9 months', '01-12': 'Full year' },
  }[LANG];
  window.nbtPeriodShort = {
    tj: { '01-03': 'Сем I', '01-06': '6 моҳ', '01-09': '9 моҳ', '01-12': 'Сол' },
    ru: { '01-03': 'I кв', '01-06': '6 мес', '01-09': '9 мес', '01-12': 'Год' },
    en: { '01-03': 'Q1', '01-06': 'H1', '01-09': '9M', '01-12': 'FY' },
  }[LANG];

  window.nbtPeriodEnd = slug => { const m = String(slug).match(/(\d{2})$/); return m ? +m[1] : null; };

})();
