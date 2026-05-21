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
      menu_tools: 'Фишангҳо',
      menu_committee: 'Кумита',
      menu_strategy: 'Стратегия',
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
      menu_tools: 'Инструменты',
      menu_committee: 'Комитет',
      menu_strategy: 'Стратегия',
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
      menu_tools: 'Tools',
      menu_committee: 'Committee',
      menu_strategy: 'Strategy',
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
    },
  };

  /* ---------- chart datasets (fallback hardcoded) ---------- */

  const DATASETS = [
    { labelKey: 0, data: [3.4,3.6,3.8,3.6,3.5,3.1,2.8,3.1,3.2,3.5,3.6,3.7,3.4], color: '#3b82f6', fill: true  },
    { labelKey: 1, data: [8.75,8.75,8.3145,8.25,8.25,7.7984,7.75,7.75,7.5167,7.5,7.5,7.5,7.5],  color: '#64748b', fill: true },
    { labelKey: 2, data: [3.70,4.74,4.2,5.56,6.5,6.17,7.04,7.49,7.45,7.28,6.71,6.45,6.09],      color: '#22c55e', fill: true },
    { labelKey: 3, data: [9.4,9.6,8.5,8.8,8.4,8.3,8.6,8.8,8.5,9.5,8.1,9.5,8.5],                color: '#f59e0b', fill: true },
  ];

  /* ---------- dynamic y-axis range ---------- */

  function computeRange(data) {
    const vals = (data || []).filter(v => v != null && !isNaN(v) && v > 0);
    if (!vals.length) return { min: 0, max: 10, step: 2 };
    const lo   = Math.min(...vals);
    const hi   = Math.max(...vals);
    const span = hi - lo || 1;
    const step = span <= 3 ? 1 : span <= 6 ? 2 : 5;
    // center the visible range symmetrically around the data midpoint
    const mid  = (lo + hi) / 2;
    const half = Math.ceil((span / 2 + step) / step) * step;
    const min  = Math.max(0, Math.floor((mid - half) / step) * step);
    const max  = Math.ceil((mid + half) / step) * step;
    return { min, max, step };
  }

  /* ---------- Excel loading ---------- */

  // Short month names for chart axis labels
  const MONTH_NAMES = {
    tj: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  };

  // Full month names for period labels (section heading, card subtitle)
  const MONTH_FULL = {
    tj: ['Январ','Феврал','Март','Апрел','Май','Июн','Июл','Август','Сентябр','Октябр','Ноябр','Декабр'],
    ru: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  };

  // Genitive month names for "since [month]" text in badges/subtitles
  const MONTH_GENITIVE = {
    tj: ['январи','феврали','марти','апрели','майи','июни','июли','августи','сентябри','октябри','ноябри','декабри'],
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  };

  // SVG icon markup for the three states
  const SVG_DOWN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="18 14 12 20 6 14"/></svg>`;
  const SVG_UP   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/></svg>`;
  const SVG_FLAT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/></svg>`;

  // Simple month-over-month comparison (last vs previous) — used for inflation
  function computeMonthChange(arr) {
    const n = arr.length;
    if (n < 2) return null;
    const current = arr[n - 1];
    const prev    = arr[n - 2];
    const delta   = current - prev;
    return {
      direction:    delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0,
      delta:        Math.abs(delta),
      currentValue: current,
    };
  }

  // Compute direction and last-change info from a numeric series — used for rate
  function computeCardState(arr, dates) {
    const n = arr.length;
    if (n < 2) return null;
    const current = arr[n - 1];

    // Walk back to find the first index of the current stable value
    let changeIdx = n - 1;
    for (let i = n - 2; i >= 0; i--) {
      if (Math.abs(arr[i] - current) > 0.0001) break;
      changeIdx = i;
    }

    // Value before the current stable run started
    const prevValue = changeIdx > 0 ? arr[changeIdx - 1] : current;
    const delta     = current - prevValue;
    const direction = delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0;

    return { direction, delta: Math.abs(delta), sinceDate: dates[changeIdx], currentValue: current };
  }

  function fmtVal(val, decimals, lang) {
    return lang === 'en'
      ? val.toFixed(decimals)
      : val.toFixed(decimals).replace('.', ',');
  }

  function fmtSince(date, lang) {
    if (!date) return '';
    const mn = MONTH_GENITIVE[lang][date.month - 1];
    if (lang === 'en') return `since ${mn} ${date.year}`;
    if (lang === 'ru') return `с ${mn} ${date.year}`;
    return `аз ${mn} ${date.year}`;
  }

  // --- Card renderers ---

  function renderRateCard(state, lang) {
    if (!state) return;

    const valEl  = document.getElementById('val-rate');
    const iconEl = document.getElementById('stat-rate-icon');
    const badgeEl = document.getElementById('badge-rate');
    const sinceEl = document.getElementById('rate-since');

    if (valEl) valEl.textContent = fmtVal(state.currentValue, 2, lang);

    if (sinceEl) sinceEl.textContent = fmtSince(state.sinceDate, lang);

    if (iconEl) {
      const cls = state.direction < 0 ? 'kpi-icon--down'
                : state.direction > 0 ? 'kpi-icon--up'
                : 'kpi-icon--flat';
      iconEl.className = `kpi-icon ${cls}`;
      iconEl.innerHTML = state.direction < 0 ? SVG_DOWN
                       : state.direction > 0 ? SVG_UP
                       : SVG_FLAT;
    }

    if (badgeEl) {
      if (state.direction === 0) {
        badgeEl.className   = 'trend-badge trend-flat';
        badgeEl.textContent = lang === 'en' ? 'No change'
                            : lang === 'ru' ? 'Без изменений'
                            : 'Бетағйир';
      } else {
        const sign = state.direction < 0 ? '−' : '+';
        const unit = lang === 'en' ? 'pp' : 'б.ф.';
        badgeEl.className   = `trend-badge ${state.direction < 0 ? 'trend-down' : 'trend-up'}`;
        badgeEl.textContent = `${sign}${fmtVal(state.delta, 2, lang)} ${unit} ${fmtSince(state.sinceDate, lang)}`;
      }
    }
  }

  function renderInflationCard(state, lang) {
    if (!state) return;

    const iconEl  = document.getElementById('stat-inflation-icon');
    const badgeEl = document.getElementById('badge-inflation');

    if (iconEl) {
      const cls = state.direction > 0 ? 'kpi-icon--up'
                : state.direction < 0 ? 'kpi-icon--down'
                : 'kpi-icon--flat';
      iconEl.className = `kpi-icon ${cls}`;
      iconEl.innerHTML = state.direction > 0 ? SVG_UP
                       : state.direction < 0 ? SVG_DOWN
                       : SVG_FLAT;
    }

    if (badgeEl) {
      const vsMonth = lang === 'en' ? 'vs. previous month'
                    : lang === 'ru' ? 'к прошлому месяцу'
                    : 'нисбат ба моҳи гузашта';
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

  // Convert date string "YYYY-MM-DD" or Excel serial to { year, month }
  function parseDate(raw) {
    if (typeof raw === 'number') {
      // Excel serial date: days since 1899-12-30
      const d = new Date(Math.round((raw - 25569) * 86400 * 1000));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1 };
    }
    const s = String(raw).trim();
    // YYYY-MM or YYYY-MM-DD
    const m = s.match(/^(\d{4})-(\d{2})/);
    if (m) return { year: +m[1], month: +m[2] };
    return null;
  }

  // Build month label arrays for all langs from an array of {year, month} objects
  function buildMonthLabels(dates) {
    const result = { tj: [], ru: [], en: [] };
    const last = dates.length - 1;
    dates.forEach((d, i) => {
      const prevYear = i > 0 ? dates[i - 1].year : null;
      ['tj', 'ru', 'en'].forEach(lang => {
        const name = MONTH_NAMES[lang][d.month - 1];
        // Show year on first entry, whenever year changes, and always on last entry
        const needYear = i === 0 || i === last || d.year !== prevYear;
        const suffix = needYear ? ` ${String(d.year).slice(2)}` : '';
        result[lang].push(name + suffix);
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

      // Take last 13 rows (12-month window + current month)
      const slice = rows.slice(-13);

      const dates      = [];
      const inflationY = [];
      const rate       = [];
      const bonds      = [];
      const interbank  = [];

      for (const row of slice) {
        const d = parseDate(row.date);
        if (!d) continue;
        dates.push(d);
        inflationY.push(row.inflation_y != null ? +row.inflation_y : null);
        rate.push(row.rate       != null ? +row.rate       : null);
        bonds.push(row.bonds     != null ? +row.bonds      : null);
        interbank.push(row.interbank != null ? +row.interbank : null);
      }

      if (!dates.length) return false;

      // Patch DATASETS in place
      DATASETS[0].data = inflationY;
      DATASETS[1].data = rate;
      DATASETS[2].data = bonds;
      DATASETS[3].data = interbank;

      // Patch month label arrays
      const labels = buildMonthLabels(dates);
      MONTHS.tj = labels.tj;
      MONTHS.ru = labels.ru;
      MONTHS.en = labels.en;

      // Update period labels and card values from the last data row
      const last = dates[dates.length - 1];
      const lastInflation = inflationY[inflationY.length - 1];

      if (last) {
        ['tj', 'ru', 'en'].forEach(lang => {
          const fullMonth = MONTH_FULL[lang][last.month - 1];
          const period = `${fullMonth} ${last.year}`;
          LABELS[lang].section_period  = period;
          LABELS[lang].inflation_month = period;
          LABELS[lang].chart_subtitle  =
            `${MONTH_FULL[lang][dates[0].month - 1]} ${dates[0].year} — ${period}`;
        });
      }

      // Store so language switches can reformat the value
      if (lastInflation != null) loadedInflation = lastInflation;

      // Compute card states for auto icon/badge rendering
      cardState = {
        rate:      computeCardState(rate, dates),  // last-change logic (since when)
        inflation: computeMonthChange(inflationY),  // simple last vs prev month
      };

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
  let cardState       = null;   // { rate, inflation } computed from Excel

  /* ---------- chart init ---------- */

  const ctx = document.getElementById('chartCanvas').getContext('2d');
  const ds0 = DATASETS[0];
  const r0  = computeRange(ds0.data);

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS[currentLang],
      datasets: [{
        label:           CHARTS[currentLang][0],
        data:            ds0.data,
        borderColor:     ds0.color,
        backgroundColor: ds0.color + '33',
        fill:            ds0.fill,
        tension:         0.4,
        pointRadius:     2,
        spanGaps:        true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: { label: c => `${c.parsed.y.toFixed(2)}%` },
        },
      },
      scales: {
        y: {
          min: r0.min, max: r0.max,
          ticks: { stepSize: r0.step, callback: v => v + '%', color: '#475569', font: { size: 11 }, padding: 6 },
          grid: { color: '#e2e8f0' },
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
    chart.data.labels = [...MONTHS[currentLang]];
    const d = chart.data.datasets[0];
    d.label           = CHARTS[currentLang][ds.labelKey];
    d.data            = ds.data;
    d.borderColor     = ds.color;
    d.backgroundColor = ds.color + '33';
    d.fill            = ds.fill;
    d.borderDash      = [];
    chart.options.scales.y = {
      min: rng.min, max: rng.max,
      ticks: { stepSize: rng.step, callback: v => v + '%', color: '#475569', font: { size: 11 }, padding: 6 },
      grid: { color: '#e2e8f0' },
    };
    chart.update();
    document.getElementById('chartTitle').textContent = CHARTS[currentLang][ds.labelKey];
    const sub = document.getElementById('chartSubtitle');
    if (sub) sub.textContent = LABELS[currentLang].chart_subtitle;
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
    // Update inflation value and both card icons/badges from computed state
    if (loadedInflation != null) {
      const el = document.getElementById('val-inflation');
      if (el) {
        el.textContent = lang === 'en'
          ? loadedInflation.toFixed(1)
          : loadedInflation.toFixed(1).replace('.', ',');
      }
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
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const base = href.split('/').pop().replace(/_ru|_eng/g, '');
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

  // Load Excel data and refresh chart (after initial render with fallback)
  showSlide(0);

  loadFromExcel().then(loaded => {
    if (loaded) {
      applyLanguage(currentLang);   // refreshes section_period, inflation_month, etc.
      updateChart(currentSlide);
    }
  });

});
