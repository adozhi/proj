document.addEventListener('DOMContentLoaded', () => {

  /* ---------- i18n ---------- */

  const MONTHS = {
    tj: ['Мар 25','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек','Янв 26','Фев','Мар 26'],
    ru: ['Мар 25','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек','Янв 26','Фев','Мар 26'],
    en: ['Mar 25','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan 26','Feb','Mar 26'],
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
      section_period: 'Март 2026',
      chart_subtitle: 'Марти 2025 — Марти 2026',
      footer_copy:    '© 2026 Бонки Миллии Тоҷикистон. Ҳамаи ҳуқуқҳо ҳифз шудаанд.',
      menu_policy: 'Сиёсати пулӣ',
      menu_goal: 'Мақсад ва вазифаҳо',
      menu_tools: 'Фишангҳои сиёсати пулӣ',
      menu_committee: 'Кумитаи сиёсати пулию қарзии',
      menu_strategy: 'Самтҳои асосии сиёсати пулию қарзии ҶТ',
      menu_reports: 'Шарҳ ва интишорот',
      menu_report_monthly_inflation: 'Шарҳи моҳонаи таваррум',
      menu_report_monetary: 'Шарҳи монетарӣ',
      menu_report_macro: 'Шарҳи макроиқтисодӣ',
      menu_report_inflation: 'Шарҳи таваррум',
      rate_title: 'Меъёри бозтамвил',
      rate_date: 'аз 02 феврали соли 2026',
      next_meeting: 'Ҷаласаи навбатии Кумита: 30.07.2026',
      inflation_title: 'Таварруми солона',
      inflation_month: 'Март 2026',
      inflation_target: 'Ҳадафи таваррум: 5% (±2 б.ф.) — доираи 3–7%',
      chart_title: 'Тағйирёбии сатҳи таваррум',
      section_desc:          'Ҳолати ҷорӣ ва тағйироти нишондиҳандаҳои асосии монетарии кишвар',
      rate_badge:            '↓ Коҳиш ёфт',
      rate_change:           '↓ −0,25 б.ф. аз феврали 2026',
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
    },
    ru: {
      header_name:    'Национальный банк Таджикистана',
      header_tagline: 'NATIONAL BANK OF TAJIKISTAN',
      section_heading:'Монетарные показатели',
      section_period: 'Март 2026',
      chart_subtitle: 'Март 2025 — Март 2026',
      footer_copy:    '© 2026 Национальный банк Таджикистана. Все права защищены.',
      menu_policy: 'Монетарная политика',
      menu_goal: 'Цели и задачи',
      menu_tools: 'Инструменты денежно–кредитной политики',
      menu_committee: 'Комитет по денежно-кредитной политике',
      menu_strategy: 'Основные направления денежно-кредитной политики РТ',
      menu_reports: 'Отчёты и публикации',
      menu_report_monthly_inflation: 'Ежемесячный обзор инфляции',
      menu_report_monetary: 'Монетарный обзор',
      menu_report_macro: 'Макроэкономический обзор',
      menu_report_inflation: 'Обзор инфляции',
      rate_title: 'Ставка рефинансирования',
      rate_date: 'с 02 февраля 2026',
      next_meeting: 'Следующее заседание: 30.07.2026',
      inflation_title: 'Годовая инфляция',
      inflation_month: 'Март 2026',
      inflation_target: 'Цель инфляции: 5% (±2 п.п.) — диапазон 3–7%',
      chart_title: 'Изменение уровня инфляции',
      section_desc:          'Текущее состояние и изменения ключевых монетарных показателей',
      rate_badge:            '↓ Снижена',
      rate_change:           '↓ −0,25 п.п. с февраля 2026',
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
    },
    en: {
      header_name:    'National Bank of Tajikistan',
      header_tagline: 'NATIONAL BANK OF TAJIKISTAN',
      section_heading:'Monetary Indicators',
      section_period: 'March 2026',
      chart_subtitle: 'March 2025 — March 2026',
      footer_copy:    '© 2026 National Bank of Tajikistan. All rights reserved.',
      menu_policy: 'Monetary Policy',
      menu_goal: 'Goals & Objectives',
      menu_tools: 'Monetary Policy Instruments',
      menu_committee: 'Monetary Policy Committee',
      menu_strategy: ' The main directions of the monetary policy of RT',
      menu_reports: 'Reports & Publications',
      menu_report_monthly_inflation: 'Monthly Inflation Report',
      menu_report_monetary: 'Monetary Review',
      menu_report_macro: 'Macroeconomic Review',
      menu_report_inflation: 'Inflation Report',
      rate_title: 'Refinancing Rate',
      rate_date: 'from 02 Feb 2026',
      next_meeting: 'Next meeting: 30.07.2026',
      inflation_title: 'Annual Inflation',
      inflation_month: 'March 2026',
      inflation_target: 'Inflation target: 5% (±2 pp) — range 3–7%',
      chart_title: 'Inflation Dynamics',
      section_desc:          'Current status and changes in key monetary indicators',
      rate_badge:            '↓ Decreased',
      rate_change:           '↓ −0.25 pp since Feb 2026',
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
    },
  };

  /* ---------- chart datasets ---------- */

  const DATASETS = [
    { labelKey: 0, data: [3.4,3.6,3.8,3.6,3.5,3.1,2.8,3.1,3.2,3.5,3.6,3.7,3.4],               color: '#3b82f6' },
    { labelKey: 1, data: [8.75,8.75,8.3145,8.25,8.25,7.7984,7.75,7.75,7.5167,7.5,7.5,7.5,7.5], color: '#1e40af', stepped: 'before', tension: 0, pointRadius: 'change' },
    { labelKey: 2, data: [3.70,4.74,4.2,5.56,6.5,6.17,7.04,7.49,7.45,7.28,6.71,6.45,6.09],     color: '#22c55e' },
    { labelKey: 3, data: [9.4,9.6,8.5,8.8,8.4,8.3,8.6,8.8,8.5,9.5,8.1,9.5,8.5],               color: '#f59e0b' },
  ];

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

  /* ---------- plugins ---------- */

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
        const text   = `${sign}${Math.abs(delta).toFixed(2).replace('.', ',')}%`;
        const color  = delta < 0 ? '#16a34a' : '#dc2626';
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

  /* ---------- dynamic y-axis range ---------- */

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

  /* ---------- Excel loading ---------- */

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

  function computeCardState(arr, dates, rateDates) {
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
    const day       = rateDates && rateDates[changeIdx] != null ? rateDates[changeIdx] : null;
    const sinceDate = day ? { ...base, day } : base;
    return { direction: delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0, delta: Math.abs(delta), sinceDate, currentValue: current };
  }

  function fmtVal(val, decimals, lang) {
    return lang === 'en' ? val.toFixed(decimals) : val.toFixed(decimals).replace('.', ',');
  }

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
        const unit = lang === 'en' ? 'pp' : 'б.ф.';
        badgeEl.className   = `trend-badge ${state.direction < 0 ? 'trend-down' : 'trend-up'}`;
        badgeEl.textContent = `${sign}${fmtVal(state.delta, 2, lang)} ${unit}`;
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
      const unchanged = lang === 'en' ? 'unchanged' : lang === 'ru' ? 'без изменений' : 'бетағйир';
      if (state.direction === 0) {
        badgeEl.className   = 'trend-badge trend-flat';
        badgeEl.textContent = `${vsMonth} ${unchanged}`;
      } else {
        const sign = state.direction > 0 ? '+' : '−';
        badgeEl.className   = `trend-badge ${state.direction > 0 ? 'trend-up' : 'trend-down'}`;
        badgeEl.textContent = `${sign}${fmtVal(state.delta, 1, lang)}% ${vsMonth}`;
      }
    }
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
      const resp = await fetch('data/data.xlsx');
      if (!resp.ok) return false;
      const buf  = await resp.arrayBuffer();
      const wb   = XLSX.read(buf, { type: 'array' });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: null });
      if (!rows.length) return false;

      const allDates = [], allCols = [[], [], [], []], allRateDates = [];
      for (const row of rows) {
        const d = parseDate(row.date);
        if (!d) continue;
        allDates.push(d);
        allCols[0].push(row.inflation_y != null ? +row.inflation_y : null);
        allCols[1].push(row.rate_eom    != null ? +row.rate_eom    : null);
        allCols[2].push(row.bonds       != null ? +row.bonds       : null);
        allCols[3].push(row.interbank   != null ? +row.interbank   : null);
        allRateDates.push(row.rate_date != null ? +row.rate_date   : null);
      }
      if (!allDates.length) return false;

      const n      = Math.min(13, allDates.length);
      const offset = allDates.length - n;
      const dates  = allDates.slice(offset);
      DATASETS[0].data = allCols[0].slice(offset);
      DATASETS[1].data = allCols[1].slice(offset);
      DATASETS[2].data = allCols[2].slice(offset);
      DATASETS[3].data = allCols[3].slice(offset);
      const rateDates  = allRateDates.slice(offset);

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
        rate:      computeCardState(DATASETS[1].data, dates, rateDates),
        inflation: computeMonthChange(DATASETS[0].data),
      };

      loadedDates = dates;
      return true;
    } catch (e) {
      console.warn('Excel load failed, using fallback data:', e);
      return false;
    }
  }

  /* ---------- state ---------- */

  let currentSlide    = 0;
  let currentLang     = localStorage.getItem('lang') || 'tj';
  let chart;
  let loadedInflation = null;
  let cardState       = null;
  let loadedDates     = [];

  /* ---------- tooltip ---------- */

  function tooltipLabel(c) {
    if (c.parsed.y === null) return '';
    const val = c.parsed.y;
    const dec = currentSlide === 1 ? 2 : 1;
    const vs  = val.toFixed(dec).replace('.', ',');
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
        return `${lbl}: ${vs}% (${delta >= 0 ? '▲' : '▼'} ${delta >= 0 ? '+' : ''}${delta.toFixed(2).replace('.', ',')}%)`;
      }
    }
    return `${lbl}: ${vs}%`;
  }

  /* ---------- chart init ---------- */

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
      animation: { duration: 350, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: () => '',
            label: tooltipLabel,
            labelColor: c => {
              const color = typeof c.dataset.borderColor === 'string' ? c.dataset.borderColor : '#3b82f6';
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
          ticks: { color: '#475569', font: { size: 11 }, padding: 6 },
          grid: { display: false },
        },
      },
    },
  });

  /* ---------- update chart ---------- */

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
  }

  /* ---------- slider ---------- */

  function showSlide(n) {
    currentSlide = (n + DATASETS.length) % DATASETS.length;
    updateChart(currentSlide);
    document.querySelectorAll('.chart-tab').forEach((tab, i) =>
      tab.classList.toggle('active', i === currentSlide)
    );
  }

  document.querySelectorAll('.chart-tab').forEach(tab =>
    tab.addEventListener('click', () => showSlide(+tab.dataset.index))
  );

  /* ---------- language ---------- */

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (LABELS[lang]?.[key]) el.textContent = LABELS[lang][key];
    });
    if (loadedInflation != null) {
      const el = document.getElementById('val-inflation');
      if (el) el.textContent = lang === 'en' ? loadedInflation.toFixed(1) : loadedInflation.toFixed(1).replace('.', ',');
    }
    renderCards(lang);
    updateChart(currentSlide);
  }

  function highlightActiveLang(lang) {
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const code = btn.dataset.lang || btn.getAttribute('onclick')?.match(/'([a-z]+)'/)?.[1];
      btn.classList.toggle('active', code === lang);
    });
  }

  function updateLinks(lang) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (!link.dataset.hrefBase) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        link.dataset.hrefBase = href.split('/').pop();
      }
      const base = link.dataset.hrefBase;
      const paths = {
        tj: `other_links/${base}`,
        ru: `ru/${base.replace('.html', '_ru.html')}`,
        en: `eng/${base.replace('.html', '_eng.html')}`,
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

  /* ---------- init ---------- */

  (function initLanguage() {
    const urlLang = new URLSearchParams(location.search).get('lang');
    if (urlLang && LABELS[urlLang]) {
      currentLang = urlLang;
      localStorage.setItem('lang', urlLang);
    } else {
      currentLang = localStorage.getItem('lang') || 'tj';
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
