document.addEventListener('DOMContentLoaded', () => {

  const EMBED = window.NBT_EMBED || null;
  const ROOT  = (EMBED && EMBED.root && document.querySelector(EMBED.root)) || document;
  const BASE  = (EMBED && EMBED.base) || '';

  const MONTHS = {
    tj: ['Сен 25','Окт','Ноя','Дек','Янв 26','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен 26'],
    ru: ['Сен 25','Окт','Ноя','Дек','Янв 26','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен 26'],
    en: ['Sep 25','Oct','Nov','Dec','Jan 26','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep 26'],
  };

  const CHARTS = {
    tj: ['Тағйирёбии сатҳи таваррум','Меъёри бозтамвил','Фоизи қоғазҳои қиматноки БМТ','Фоизи қарзҳои байнибонкӣ'],
    ru: ['Изменение уровня инфляции','Ставка рефинансирования','Проценты по ценным бумагам НБТ','Проценты по межбанковским кредитам'],
    en: ['Inflation Dynamics','Refinancing Rate','Interest on NBT securities','Interest rates on interbank loans'],
  };

  const LABELS = {
    tj: {
      header_name:    'Бонки Миллии Тоҷикистон',
      header_tagline: 'NATIONAL BANK OF TAJIKISTAN',
      section_heading:'Нишондиҳандаҳои монетарӣ',
      section_period: 'Сентябр 2026',
      chart_subtitle: 'Сентябр 2025 — Сентябр 2026',
      footer_copy:    '© 2026 Бонки Миллии Тоҷикистон. Ҳамаи ҳуқуқҳо ҳифз шудаанд.',
      rate_title: 'Меъёри бозтамвил',
      rate_date: 'аз 02 феврали соли 2026',
      inflation_title: 'Таварруми солона',
      inflation_month: 'Сентябр 2026',
      inflation_target: 'Ҳадафи таваррум: 5% (±2 б.ф.) — доираи 3–7%',
      chart_title: 'Тағйирёбии сатҳи таваррум',
      section_desc:          'Ҳолати ҷорӣ ва тағйироти нишондиҳандаҳои асосии монетарии кишвар',
      inflation_badge:       '✓ Дар ҳадаф',
      inflation_target_link: 'Ҳадафи таваррум: 5% (±2 б.ф.)',
      dot_inflation:         'Таваррум',
      dot_rate:              'Меъёри бозтамвил',
      dot_bonds:             'Қоғазҳои қиматнок',
      dot_interbank:         'Байнибонкӣ',
      year_all:              'Ҳама',
      sahm_title:            'Таваррум аз рӯи саҳм',
      sahm_f:                'Хӯрокворӣ',
      sahm_nf:               'Ғайрихӯрокворӣ',
      sahm_s:                'Хизматрасонӣ',
      meeting_label:         'Ҷаласаи навбатии Кумита',
      target_label:          'Ҳадафи таваррум',
      target_value:          '5% (±2 б.ф.)',
      events_title:          'Рӯйдодҳои наздик',
    },
    ru: {
      header_name:    'Национальный банк Таджикистана',
      header_tagline: 'NATIONAL BANK OF TAJIKISTAN',
      section_heading:'Монетарные показатели',
      section_period: 'Сентябрь 2026',
      chart_subtitle: 'Сентябрь 2025 — Сентябрь 2026',
      footer_copy:    '© 2026 Национальный банк Таджикистана. Все права защищены.',
      rate_title: 'Ставка рефинансирования',
      rate_date: 'с 02 февраля 2026',
      inflation_title: 'Годовая инфляция',
      inflation_month: 'Сентябрь 2026',
      inflation_target: 'Цель инфляции: 5% (±2 п.п.) — диапазон 3–7%',
      chart_title: 'Изменение уровня инфляции',
      section_desc:          'Текущее состояние и изменения ключевых монетарных показателей',
      inflation_badge:       '✓ В цели',
      inflation_target_link: 'Цель инфляции: 5% (±2 п.п.)',
      dot_inflation:         'Инфляция',
      dot_rate:              'Ставка рефинансирования',
      dot_bonds:             'Ценные бумаги',
      dot_interbank:         'Межбанк',
      year_all:              'Все',
      sahm_title:            'Инфляция по компонентам',
      sahm_f:                'Продовольствие',
      sahm_nf:               'Непродовольствие',
      sahm_s:                'Услуги',
      meeting_label:         'Следующее заседание',
      target_label:          'Цель по инфляции',
      target_value:          '5% (±2 п.п.)',
      events_title:          'Ближайшие события',
    },
    en: {
      header_name:    'National Bank of Tajikistan',
      header_tagline: 'NATIONAL BANK OF TAJIKISTAN',
      section_heading:'Monetary Indicators',
      section_period: 'September 2026',
      chart_subtitle: 'September 2025 — September 2026',
      footer_copy:    '© 2026 National Bank of Tajikistan. All rights reserved.',
      rate_title: 'Refinancing Rate',
      rate_date: 'from 02 Feb 2026',
      inflation_title: 'Annual Inflation',
      inflation_month: 'September 2026',
      inflation_target: 'Inflation target: 5% (±2 pp) — range 3–7%',
      chart_title: 'Inflation Dynamics',
      section_desc:          'Current status and changes in key monetary indicators',
      inflation_badge:       '✓ On target',
      inflation_target_link: 'Inflation target: 5% (±2 pp)',
      dot_inflation:         'Inflation',
      dot_rate:              'Refinancing Rate',
      dot_bonds:             'Securities',
      dot_interbank:         'Interbank',
      year_all:              'All',
      sahm_title:            'Inflation by Contribution',
      sahm_f:                'Food',
      sahm_nf:               'Non-food',
      sahm_s:                'Services',
      meeting_label:         'Next meeting',
      target_label:          'Inflation target',
      target_value:          '5% (±2 pp)',
      events_title:          'Upcoming events',
    },
  };

  const DATASETS = [
    { labelKey: 0, data: [2.8,3.1,3.2,3.5,3.6,3.6,3.4,3.6,4.1,4.1,4.1,4.1,4.1],                  color: NBT_COLORS.inflation },
    { labelKey: 1, data: [7.75,7.75,7.5,7.5,7.5,7,7,7,7,7,7,7,7],                                 color: NBT_COLORS.rate, stepped: 'before', tension: 0, pointRadius: 'change' },
    { labelKey: 2, data: [7.46,7.37,7.34,6.95,6.71,6.45,6.09,5.83,5.09,5.19,5.49,6.34,6.43],      color: NBT_COLORS.bonds },
    { labelKey: 3, data: [8.61,8.79,8.53,9.54,8.14,9.48,8.51,5.47,8.64,8.35,7.42,6.44,5.67],      color: NBT_COLORS.interbank },
  ];

  const PP = { tj: 'б.ф.', ru: 'п.п.', en: 'pp' };

  function fmtNum(val, decimals, lang) {
    const s = val.toFixed(decimals);
    return lang === 'en' ? s : s.replace('.', ',');
  }

  function dsPointRadius(ds) {
    if (ds.pointRadius === 'change') {
      return ctx2 => {
        const arr = ctx2.dataset.data;
        const j   = ctx2.dataIndex;
        return j === 0 || (arr[j] != null && arr[j-1] != null && Math.abs(arr[j] - arr[j-1]) > 0.0001) ? 2.5 : 0;
      };
    }
    return 2.5;
  }

  const crosshairPlugin = {
    id: 'crosshair',
    afterDraw(chartInst) {
      const active = chartInst.tooltip?._active;
      if (!active?.length) return;
      const x = active[0].element.x;
      const { top, bottom } = chartInst.scales.y;
      const c = chartInst.ctx;
      c.save();
      c.beginPath();
      c.moveTo(x, top);
      c.lineTo(x, bottom);
      c.lineWidth   = 1;
      c.strokeStyle = '#cbd5e1';
      c.setLineDash([3, 3]);
      c.stroke();
      c.restore();
    },
  };

  const deltaPlugin = {
    id: 'deltaLabels',
    afterDatasetsDraw(chartInst) {
      if (currentSlide !== 1) return;
      const d    = chartInst.data.datasets[0].data;
      const meta = chartInst.getDatasetMeta(0);
      const c    = chartInst.ctx;
      const area = chartInst.chartArea;
      c.save();
      c.font = '600 9px Inter,sans-serif';
      d.forEach((val, i) => {
        if (i === 0 || val == null || d[i-1] == null) return;
        if (Math.abs(val - d[i-1]) < 0.0001) return;
        const delta  = val - d[i-1];
        const sign   = delta > 0 ? '+' : '−';
        const text   = `${sign}${fmtNum(Math.abs(delta), 2, currentLang)} ${PP[currentLang]}`;
        const color  = delta < 0 ? '#16a34a' : '#c0504d';
        const pt     = meta.data[i];
        const offset = delta < 0 ? 22 : -22;
        const tw     = c.measureText(text).width;
        const pad    = 4;
        const tx     = Math.max(area.left + tw/2 + pad, Math.min(area.right - tw/2 - pad, pt.x));
        const ty     = Math.max(area.top + 10, Math.min(area.bottom - 10, pt.y + offset));
        c.fillStyle = color + '22';
        c.beginPath();
        c.roundRect(tx - tw/2 - pad, ty - 7, tw + pad*2, 13, 3);
        c.fill();
        c.fillStyle    = color;
        c.textAlign    = 'center';
        c.textBaseline = 'middle';
        c.fillText(text, tx, ty);
      });
      c.restore();
    },
  };

  function computeRange(data) {
    const vals = (data || []).filter(v => v != null && !isNaN(v));
    if (!vals.length) return { min: 0, max: 10, step: 2 };
    const lo   = Math.min(...vals);
    const hi   = Math.max(...vals);
    const span = hi - lo || 1;
    const step = span <= 3 ? 1 : span <= 6 ? 2 : 5;
    const mid  = (lo + hi) / 2;
    const half = Math.ceil((span / 2 + step) / step) * step;
    const min  = lo < 0
      ? Math.floor((mid - half) / step) * step
      : Math.max(0, Math.floor((mid - half) / step) * step);
    const max  = Math.ceil((mid + half) / step) * step;
    return { min, max, step };
  }

  const MONTH_NAMES = {
    tj: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  };

  const MONTH_FULL = {
    tj: ['Январ','Феврал','Март','Апрел','Май','Июн','Июл','Август','Сентябр','Октябр','Ноябр','Декабр'],
    ru: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  };

  const MONTH_GENITIVE = {
    tj: ['январи','феврали','марти','апрели','майи','июни','июли','августи','сентябри','октябри','ноябри','декабри'],
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  };

  const SVG_DOWN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="18 14 12 20 6 14"/></svg>`;
  const SVG_UP   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/></svg>`;
  const SVG_FLAT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/></svg>`;

  function computeMonthChange(arr) {
    const n = arr.length;
    if (n < 2) return null;
    const delta = arr[n-1] - arr[n-2];
    return { direction: delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0, delta: Math.abs(delta), currentValue: arr[n-1] };
  }

  function computeCardState(arr, dates) {
    const n = arr.length;
    if (n < 2) return null;
    const current = arr[n - 1];
    let changeIdx = n - 1;
    for (let i = n - 2; i >= 0; i--) {
      if (Math.abs(arr[i] - current) > 0.0001) break;
      changeIdx = i;
    }
    const prevValue = changeIdx > 0 ? arr[changeIdx - 1] : current;
    const delta     = current - prevValue;
    const base      = dates[changeIdx];

    const day       = base && window.nbtRateEffectiveDay ? window.nbtRateEffectiveDay(base.year, base.month) : null;
    const sinceDate = day ? { ...base, day } : base;
    return { direction: delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0, delta: Math.abs(delta), sinceDate, currentValue: current };
  }

  const fmtVal = fmtNum;

  function fmtSince(date, lang) {
    if (!date) return '';
    const mn  = MONTH_GENITIVE[lang][date.month - 1];
    const day = date.day ? (date.day < 10 ? '0' + date.day : '' + date.day) + ' ' : '';
    return lang === 'en' ? `since ${day}${mn} ${date.year}` : lang === 'ru' ? `с ${day}${mn} ${date.year}` : `аз ${day}${mn} ${date.year}`;
  }

  function renderRateCard(state, lang) {
    if (!state) return;
    const valEl   = document.getElementById('val-rate');
    const iconEl  = document.getElementById('stat-rate-icon');
    const badgeEl = document.getElementById('badge-rate');
    const sinceEl = document.getElementById('rate-since');
    if (valEl && state.currentValue != null) valEl.textContent = fmtVal(state.currentValue, 2, lang);
    if (sinceEl) sinceEl.textContent = fmtSince(state.sinceDate, lang);
    if (iconEl) {
      const cls = state.direction < 0 ? 'kpi-icon--down' : state.direction > 0 ? 'kpi-icon--up' : 'kpi-icon--flat';
      iconEl.className = `kpi-icon ${cls}`;
      iconEl.innerHTML = state.direction < 0 ? SVG_DOWN : state.direction > 0 ? SVG_UP : SVG_FLAT;
    }
    if (badgeEl) {
      if (state.direction === 0) {
        badgeEl.className   = 'trend-badge trend-flat';
        badgeEl.textContent = lang === 'en' ? 'No change' : lang === 'ru' ? 'Без изменений' : 'Бетағйир';
      } else {
        const sign = state.direction < 0 ? '−' : '+';
        badgeEl.className   = `trend-badge ${state.direction < 0 ? 'trend-down' : 'trend-up'}`;
        badgeEl.textContent = `${sign}${fmtVal(state.delta, 2, lang)} ${PP[lang]}`;
      }
    }
  }

  function renderInflationCard(state, lang) {
    if (!state) return;
    const iconEl  = document.getElementById('stat-inflation-icon');
    const badgeEl = document.getElementById('badge-inflation');
    if (iconEl) {
      const cls = state.direction > 0 ? 'kpi-icon--up' : state.direction < 0 ? 'kpi-icon--down' : 'kpi-icon--flat';
      iconEl.className = `kpi-icon ${cls}`;
      iconEl.innerHTML = state.direction > 0 ? SVG_UP : state.direction < 0 ? SVG_DOWN : SVG_FLAT;
    }
    if (badgeEl) {
      const vsMonth   = lang === 'en' ? 'vs. previous month' : lang === 'ru' ? 'к прошлому месяцу' : 'нисбат ба моҳи гузашта';
      const unchanged = lang === 'en' ? 'Unchanged' : lang === 'ru' ? 'Без изменений' : 'Бетағйир';
      if (state.direction === 0) {
        badgeEl.className   = 'trend-badge trend-flat';
        badgeEl.textContent = `${unchanged} ${vsMonth}`;
      } else {
        const sign = state.direction > 0 ? '+' : '−';
        badgeEl.className   = `trend-badge ${state.direction > 0 ? 'trend-up' : 'trend-down'}`;
        badgeEl.textContent = `${sign}${fmtVal(state.delta, 1, lang)} ${PP[lang]} ${vsMonth}`;
      }
    }
  }

  function pagePath(slug, lang) {
    return BASE + (lang === 'ru' ? `ru/${slug}_ru.html` : lang === 'en' ? `eng/${slug}_eng.html` : `other_links/${slug}.html`);
  }

  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const fmtISO = iso => iso.split('-').reverse().join('.');

  function renderLastDecision(lang) {
    const el = document.getElementById('last-decision');
    if (!el || !window.NBT_MEETINGS) return;
    const today = todayISO();
    const past  = [].concat(...Object.values(window.NBT_MEETINGS)).filter(m => m.iso < today).sort((a, b) => a.iso < b.iso ? 1 : -1);
    if (!past.length) { el.hidden = true; return; }
    const m   = past[0];
    const doc = (m[lang] || m.tj);
    const href = doc.summary?.href || doc.resolution?.href;
    const label = lang === 'en' ? 'Latest decision' : lang === 'ru' ? 'Последнее решение' : 'Қарори охирин';
    el.textContent = `${label}: ${fmtISO(m.iso)}`;
    el.href = href || pagePath('kumita_bmt', lang) + '#meeting';
    el.hidden = false;
  }

  function renderEvents(lang) {
    const list = document.getElementById('events-list');
    if (!list) return;
    const today = todayISO();
    const meetingName = { tj: 'Ҷаласаи Кумитаи сиёсати пулию қарзӣ', ru: 'Заседание Комитета по денежно-кредитной политике', en: 'Monetary Policy Committee meeting' };
    const typeName = {
      meeting:     { tj: 'Ҷаласа',  ru: 'Заседание',  en: 'Meeting' },
      publication: { tj: 'Интишор', ru: 'Публикация', en: 'Publication' },
    };
    const events = [];
    Object.values(window.NBT_MEETINGS || {}).forEach(year => year.forEach(m => {
      if (m.iso >= today) events.push({ date: m.iso, type: 'meeting', name: meetingName[lang], href: pagePath('kumita_bmt', lang) + '#meeting' });
    }));
    (window.NBT_CALENDAR || []).forEach(e => {
      if (e.date >= today) events.push({ date: e.date, type: 'publication', name: e.label[lang] || e.label.tj, href: pagePath(e.page, lang) });
    });
    events.sort((a, b) => a.date < b.date ? -1 : 1);
    const shown = events.slice(0, 3);
    list.closest('.events-wrap').hidden = !shown.length;
    list.innerHTML = shown.map(e => {
      const [y, mo, d] = e.date.split('-').map(Number);
      return `<li class="events__item events__item--${e.type}"><a href="${e.href}">
          <span class="events__date"><span class="events__day">${d}</span><span class="events__month">${MONTH_NAMES[lang][mo - 1]} ${String(y).slice(2)}</span></span>
          <span class="events__text"><span class="events__type">${typeName[e.type][lang]}</span><span class="events__name">${e.name}</span></span>
        </a></li>`;
    }).join('');
  }

  function renderMeeting(lang) {

    const el = document.getElementById('next-meeting');
    if (!el || typeof window.nbtNextMeeting !== 'function') return;
    const next  = window.nbtNextMeeting();
    const zone  = el.closest('.statistic-footer');

    if (!next) { if (window.nbtHomeFooter) window.nbtHomeFooter(); else if (zone) zone.hidden = true; return; }
    const [y, m, d] = next.split('-');
    el.textContent = `${d}.${m}.${y}`;
    if (zone) zone.hidden = false;
  }

  function renderCards(lang) {
    if (!cardState) return;
    renderRateCard(cardState.rate, lang);
    renderInflationCard(cardState.inflation, lang);
  }

  function parseDate(raw) {
    if (typeof raw === 'number') {
      const d = new Date(Math.round((raw - 25569) * 86400 * 1000));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 };
    }
    const s = String(raw).trim();
    const m = s.match(/^(\d{4})-(\d{2})/);
    if (m) return { year: +m[1], month: +m[2] };
    return null;
  }

  function buildMonthLabels(dates) {
    const result = { tj: [], ru: [], en: [] };
    const last = dates.length - 1;
    dates.forEach((d, i) => {
      const prevYear = i > 0 ? dates[i - 1].year : null;
      ['tj', 'ru', 'en'].forEach(lang => {
        const name = MONTH_NAMES[lang][d.month - 1];
        const needYear = i === 0 || i === last || d.year !== prevYear;
        result[lang].push(name + (needYear ? ` ${String(d.year).slice(2)}` : ''));
      });
    });
    return result;
  }

  async function loadFromExcel() {
    try {
      const rows = await nbtLoadRows({ defval: null });
      if (!rows.length) return false;

      const allDates = [], allCols = [[], [], [], []];
      for (const row of rows) {
        const d = parseDate(row.date);
        if (!d) continue;
        allDates.push(d);
        allCols[0].push(row.inflation_y != null ? +row.inflation_y : null);
        allCols[1].push(row.rate_eom    != null ? +row.rate_eom    : null);
        allCols[2].push(row.bonds       != null ? +row.bonds       : null);
        allCols[3].push(row.interbank   != null ? +row.interbank   : null);
      }
      if (!allDates.length) return false;

      const n      = Math.min(13, allDates.length);
      const offset = allDates.length - n;
      const dates  = allDates.slice(offset);
      DATASETS[0].data = allCols[0].slice(offset);
      DATASETS[1].data = allCols[1].slice(offset);
      DATASETS[2].data = allCols[2].slice(offset);
      DATASETS[3].data = allCols[3].slice(offset);

      const labels = buildMonthLabels(dates);
      MONTHS.tj = labels.tj;
      MONTHS.ru = labels.ru;
      MONTHS.en = labels.en;

      const last           = dates[dates.length - 1];
      const lastInflation  = DATASETS[0].data[DATASETS[0].data.length - 1];

      if (last) {
        ['tj', 'ru', 'en'].forEach(lang => {
          const fullMonth = MONTH_FULL[lang][last.month - 1];
          const period    = `${fullMonth} ${last.year}`;
          LABELS[lang].section_period  = period;
          LABELS[lang].inflation_month = period;
          LABELS[lang].chart_subtitle  =
            `${MONTH_FULL[lang][dates[0].month - 1]} ${dates[0].year} — ${period}`;
        });
      }

      if (lastInflation != null) loadedInflation = lastInflation;

      cardState = {
        rate:      computeCardState(DATASETS[1].data, dates),
        inflation: computeMonthChange(DATASETS[0].data),
      };

      loadedDates = dates;
      return true;
    } catch (e) {
      console.warn('Excel load failed, using fallback data:', e);
      return false;
    }
  }

  function readLang() {
    if (EMBED && EMBED.lang) return EMBED.lang;
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }

  let currentSlide    = 0;
  let currentLang     = readLang() || 'tj';
  let chart;
  let loadedInflation = null;

  let cardState       = { rate: null, inflation: computeMonthChange(DATASETS[0].data) };
  let loadedDates     = [];

  function tooltipLabel(c) {
    if (c.parsed.y === null) return '';
    const val = c.parsed.y;
    const dec = currentSlide === 1 ? 2 : 1;
    const vs  = fmtNum(val, dec, currentLang);
    const d   = loadedDates[c.dataIndex];
    const lbl = d ? MONTH_FULL[currentLang][d.month - 1] + ' ' + d.year
                  : c.chart.data.labels[c.dataIndex];

    if (currentSlide === 1) {
      const pd = c.chart.data.datasets[0].data;
      let prev = null;
      for (let j = c.dataIndex - 1; j >= 0; j--) {
        if (pd[j] !== null) { prev = pd[j]; break; }
      }
      if (prev !== null && Math.abs(val - prev) > 0.0001) {
        const delta = val - prev;
        return `${lbl}: ${vs}% (${delta >= 0 ? '▲ +' : '▼ −'}${fmtNum(Math.abs(delta), 2, currentLang)} ${PP[currentLang]})`;
      }
    }
    return `${lbl}: ${vs}%`;
  }

  const ctx = document.getElementById('chartCanvas').getContext('2d');
  const ds0 = DATASETS[0];
  const r0  = computeRange(ds0.data);

  chart = new Chart(ctx, {
    plugins: [deltaPlugin, crosshairPlugin],
    type: 'line',
    data: {
      labels: MONTHS[currentLang],
      datasets: [{
        label:                     CHARTS[currentLang][0],
        data:                      ds0.data,
        borderColor:               ds0.color,
        borderWidth:               1.5,
        backgroundColor:           'transparent',
        fill:                      false,
        tension:                   ds0.tension  ?? 0.4,
        stepped:                   ds0.stepped  ?? false,
        pointRadius:               dsPointRadius(ds0),
        pointBackgroundColor:      ds0.color,
        pointBorderColor:          '#fff',
        pointBorderWidth:          1.5,
        pointHoverRadius:          5,
        pointHoverBackgroundColor: ds0.color,
        pointHoverBorderColor:     '#fff',
        pointHoverBorderWidth:     2,
        spanGaps:                  true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 350, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: () => '',
            label: tooltipLabel,
            labelColor: c => {
              const color = typeof c.dataset.borderColor === 'string' ? c.dataset.borderColor : NBT_COLORS.inflation;
              return { borderColor: color, backgroundColor: color };
            },
          },
        },
      },
      scales: {
        y: {
          min: r0.min,
          max: r0.max,
          ticks: { stepSize: r0.step, callback: v => v + '%', color: '#475569', font: { size: 11 }, padding: 6 },
          grid: {
            color:     ctx => ctx.tick.value === 0 && ctx.chart.scales.y.min < 0 ? '#94a3b8' : '#e2e8f0',
            lineWidth: ctx => ctx.tick.value === 0 && ctx.chart.scales.y.min < 0 ? 1.5 : 1,
          },
        },
        x: {
          ticks: { color: '#475569', font: { size: 11 }, padding: 6, maxRotation: 0, minRotation: 0 },
          grid: { display: false },
        },
      },
    },
  });

  function updateChart(i) {
    const ds  = DATASETS[i];
    const rng = computeRange(ds.data);

    chart.data.labels = MONTHS[currentLang];
    chart.data.datasets[0] = {
      label:                     CHARTS[currentLang][ds.labelKey],
      data:                      ds.data,
      borderColor:               ds.color,
      borderWidth:               1.5,
      backgroundColor:           'transparent',
      fill:                      false,
      tension:                   ds.tension  ?? 0.4,
      stepped:                   ds.stepped  ?? false,
      pointRadius:               dsPointRadius(ds),
      pointBackgroundColor:      ds.color,
      pointBorderColor:          '#fff',
      pointBorderWidth:          1.5,
      pointHoverRadius:          5,
      pointHoverBackgroundColor: ds.color,
      pointHoverBorderColor:     '#fff',
      pointHoverBorderWidth:     2,
      spanGaps:                  true,
    };
    chart.options.scales.y.min            = rng.min;
    chart.options.scales.y.max            = rng.max;
    chart.options.scales.y.ticks.stepSize = rng.step;
    chart.update();

    document.getElementById('chartTitle').textContent = CHARTS[currentLang][ds.labelKey];
    const last = ds.data[ds.data.length - 1];
    chart.canvas.setAttribute('aria-label', `${CHARTS[currentLang][ds.labelKey]}: ${(MONTHS[currentLang][0])} — ${MONTHS[currentLang].at(-1)}` +
      (last != null ? `, ${MONTHS[currentLang].at(-1)}: ${fmtNum(last, 2, currentLang)}%` : ''));
  }

  function showSlide(n) {
    currentSlide = (n + DATASETS.length) % DATASETS.length;
    updateChart(currentSlide);
    document.querySelectorAll('.chart-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === currentSlide);
      tab.setAttribute('aria-selected', String(i === currentSlide));
      tab.tabIndex = i === currentSlide ? 0 : -1;
    });
  }

  const TIMER_MS = 8000, IDLE_MS = 30000;
  let   autoTimer  = null, idleTimer = null;
  let   paused     = false;
  const autoplay   = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let   held       = false;

  function restartTimer() {
    clearInterval(autoTimer);
    if (autoplay && !paused && !held) {
      autoTimer = setInterval(() => showSlide(currentSlide + 1), TIMER_MS);
    }
  }

  function stopAutoplay() {
    held = true;
    clearInterval(autoTimer);
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { held = false; restartTimer(); }, IDLE_MS);
  }

  const tabs = Array.from(document.querySelectorAll('.chart-tab'));
  tabs.forEach(tab => tab.addEventListener('click', () => {
    stopAutoplay();
    showSlide(+tab.dataset.index);
  }));

  const tabList = document.querySelector('.chart-tabs');
  if (tabList) {
    tabList.addEventListener('keydown', e => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      stopAutoplay();
      showSlide(currentSlide + step);
      tabs[currentSlide].focus();
    });
  }

  const chartCard = document.querySelector('.chart-card');
  if (chartCard) {
    const pause  = () => { paused = true;  clearInterval(autoTimer); };
    const resume = () => { paused = false; restartTimer(); };
    chartCard.addEventListener('mouseenter', pause);
    chartCard.addEventListener('mouseleave', resume);
    chartCard.addEventListener('focusin',    pause);
    chartCard.addEventListener('focusout',   e => { if (!chartCard.contains(e.relatedTarget)) resume(); });
    chartCard.addEventListener('touchstart', stopAutoplay, { passive: true });
  }

  restartTimer();

  const navbar = EMBED ? null : document.querySelector('.navbar');
  const menuEl = navbar && navbar.querySelector('.menu');

  function closeDropdowns(except) {
    if (!navbar) return;
    navbar.querySelectorAll('.dropdown, .dropdown-sub').forEach(dd => {
      if (except && dd.contains(except)) return;
      dd.classList.remove('open');
      dd.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
    });
  }

  if (navbar) {
    navbar.addEventListener('click', e => {
      const trigger = e.target.closest('.dropdown > a, .dropdown-sub > a');
      if (!trigger) return;
      e.preventDefault();
      const dd   = trigger.parentElement;
      const open = !dd.classList.contains('open');
      closeDropdowns(dd);
      dd.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
    navbar.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) closeDropdowns();
    });
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar')) closeDropdowns();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDropdowns();
  });

  function applyLanguage(lang) {
    currentLang = lang;
    if (!EMBED) {
      try { localStorage.setItem('lang', lang); } catch (e) {}
      document.documentElement.lang = lang === 'tj' ? 'tg' : lang;
      document.title = `${LABELS[lang].header_name} — ${LABELS[lang].section_heading}`;
    }
    ROOT.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (LABELS[lang]?.[key]) el.textContent = LABELS[lang][key];
    });
    if (loadedInflation != null) {
      const el = document.getElementById('val-inflation');
      if (el) el.textContent = fmtNum(loadedInflation, 1, lang);
    }
    if (window.nbtRenderMainMenu) window.nbtRenderMainMenu(menuEl, lang);
    renderCards(lang);
    renderMeeting(lang);
    renderLastDecision(lang);
    renderEvents(lang);
    updateChart(currentSlide);
  }

  function highlightActiveLang(lang) {
    ROOT.querySelectorAll('.lang-switcher button').forEach(btn => {
      const code = btn.dataset.lang || btn.getAttribute('onclick')?.match(/'([a-z]+)'/)?.[1];
      btn.classList.toggle('active', code === lang);
    });
  }

  function updateLinks(lang) {
    ROOT.querySelectorAll('.nav-link').forEach(link => {
      if (!link.dataset.hrefBase) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const [file, hash = ''] = href.split('/').pop().split('#');
        link.dataset.hrefBase = file.replace(/_(ru|eng)\.html$/, '.html');
        link.dataset.hrefHash = hash ? '#' + hash : '';
      }
      const base = link.dataset.hrefBase, hash = link.dataset.hrefHash || '';
      const paths = {
        tj: BASE + `other_links/${base}` + hash,
        ru: BASE + `ru/${base.replace('.html', '_ru.html')}` + hash,
        en: BASE + `eng/${base.replace('.html', '_eng.html')}` + hash,
      };
      link.href = paths[lang] || paths.tj;
    });
  }

  window.setLang = function (lang) {
    if (!LABELS[lang]) return;
    document.body.classList.add('lang-fade');
    setTimeout(() => {
      applyLanguage(lang);
      highlightActiveLang(lang);
      updateLinks(lang);
      document.body.classList.remove('lang-fade');
    }, 120);
  };

  (function initLanguage() {
    const urlLang = new URLSearchParams(location.search).get('lang');
    if (EMBED && EMBED.lang) {
      currentLang = EMBED.lang;
    } else if (urlLang && LABELS[urlLang]) {
      currentLang = urlLang;
    } else {
      currentLang = readLang() || 'tj';
    }
    applyLanguage(currentLang);
    highlightActiveLang(currentLang);
    updateLinks(currentLang);
  })();

  showSlide(0);

  loadFromExcel().then(loaded => {
    if (loaded) {
      applyLanguage(currentLang);
      updateLinks(currentLang);
    }
  });

});
