const LANG = nbtPageLang();
const COLORS = window.NBT_COLORS;

let inflationChart;
let originalData = null;
let currentMode = "yearly";

const tn = v => { const x = Number.isInteger(+v) ? String(+v) : (+v).toFixed(1); return LANG === 'en' ? x : x.replace('.', ','); };
const I18N = {
  tj: {
    chPp: 'б.ф.', chVs: 'нисбат ба моҳи гузашта', chSame: 'Бетағйир нисбат ба моҳи гузашта',
    months:    ['Январ','Феврал','Март','Апрел','Май','Июн','Июл','Август','Сентябр','Октябр','Ноябр','Декабр'],
    monthsGen: ['январи','феврали','марти','апрели','майи','июни','июли','августи','сентябри','октябри','ноябри','декабри'],
    annual:    'Таварруми солона',
    monthly:   'Таварруми моҳона',
    inflation: 'Таваррум',
    target:    (c, b) => `Ҳадаф — ${tn(c)}% (±${tn(b)} б.ф.)`,
    error:     'Хато:',
    dateCol:   'Сана',
  },
  ru: {
    chPp: 'п.п.', chVs: 'к прошлому месяцу', chSame: 'Без изменений к прошлому месяцу',
    months:    ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsGen: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    annual:    'Годовая инфляция',
    monthly:   'Ежемесячная инфляция',
    inflation: 'Инфляция',
    target:    (c, b) => `Цель — ${tn(c)}% (±${tn(b)} п.п.)`,
    error:     'Ошибка:',
    dateCol:   'Дата',
  },
  en: {
    chPp: 'pp', chVs: 'vs. previous month', chSame: 'Unchanged vs. previous month',
    months:    ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthsGen: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    annual:    'Annual Inflation',
    monthly:   'Monthly Inflation',
    inflation: 'Inflation',
    target:    (c, b) => `Target — ${tn(c)}% (±${tn(b)} pp)`,
    error:     'Error:',
    dateCol:   'Date',
  },
}[LANG];

const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');

function fmtDate(d){if(!d)return'—';const[y,m]=d.split('-').map(Number);return I18N.monthsGen[m-1]+' '+y;}

const getTarget = d => nbtTargetFor(d);

function buildTargetData(labels) {
  return {
    upper:  labels.map(d => { const t = getTarget(d); return t ? t.center + t.band : null; }),
    lower:  labels.map(d => { const t = getTarget(d); return t ? t.center - t.band : null; }),
    center: labels.map(d => { const t = getTarget(d); return t ? t.center : null; }),
  };
}

function computeRange(vals) {
  const v = vals.filter(x => x != null && !isNaN(x) && x > 0);
  if (!v.length) return { min: 0, max: 20, step: 2 };
  const lo = Math.min(...v), hi = Math.max(...v);
  const span = hi - lo || 1;
  const step = span <= 3 ? 1 : span <= 6 ? 2 : 5;
  const mid = (lo + hi) / 2;
  const half = Math.ceil((span / 2 + step) / step) * step;
  return {
    min: Math.max(0, Math.floor((mid - half) / step) * step),
    max: Math.ceil((mid + half) / step) * step,
    step
  };
}

function computeRangeYearly(vals, labels) {
  const allVals = [...vals];
  labels.forEach(d => {
    const t = getTarget(d);
    if (t) { allVals.push(t.center + t.band); allVals.push(t.center - t.band); }
  });
  return computeRange(allVals.filter(v => v !== null));
}

function updateInflationCard(values_yearly, dates) {
  if (!values_yearly.length) return;
  const n = values_yearly.length;
  const current = values_yearly[n-1];
  const lastDate = dates[n-1];
  const titleEl = document.getElementById('inflation-title');
  const valEl = document.getElementById('val-inflation-detail');
  if (titleEl && lastDate) {
    titleEl.textContent = `${I18N.annual} — ${I18N.months[lastDate.month-1]} ${lastDate.year}`;
  }
  if (valEl) valEl.textContent = num(current, 1);
  const chEl = document.getElementById('infl-change');
  const prev = n > 1 ? values_yearly[n - 2] : null;
  if (chEl && prev != null && current != null) {
    const d = +(current - prev).toFixed(1);
    chEl.hidden = false;
    if (d === 0) {
      chEl.textContent = '= ' + I18N.chSame;
      chEl.style.cssText = 'background:rgba(251,191,36,0.22);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);';
    } else {
      chEl.textContent = `${d > 0 ? '↑ +' : '↓ −'}${num(Math.abs(d), 1)} ${I18N.chPp} ${I18N.chVs}`;
      chEl.style.cssText = d > 0
        ? 'background:rgba(192,80,77,0.3);color:#f2b8b5;border:1px solid rgba(192,80,77,0.55);'
        : 'background:rgba(34,197,94,0.18);color:#86efac;border:1px solid rgba(34,197,94,0.25);';
    }
  }
  const tg = (lastDate && getTarget(`${lastDate.year}-${String(lastDate.month).padStart(2, '0')}`)) || { center: 5, band: 2 };
  const cb = document.getElementById('btn-corridor');
  if (cb && cb.lastChild && cb.lastChild.nodeType === 3) cb.lastChild.textContent = ' ' + I18N.target(tg.center, tg.band) + ' ';
  const gaugeEl = document.getElementById('inflGauge');
  if (gaugeEl && window.nbtGauge && lastDate) {
    const ym = `${lastDate.year}-${String(lastDate.month).padStart(2, '0')}`;
    const t = getTarget(ym) || { center: 5, band: 2 };
    nbtGauge(gaugeEl, { min: 0, max: 12, step: 2, band: [t.center - t.band, t.center + t.band], center: t.center,
      bandText: I18N.target(t.center, t.band), value: current, valueText: num(current, 1) + '%' });
    gaugeEl.querySelector('.gauge').classList.add('gauge--dark');
  }
}

async function loadExcelData() {
  try {
    const json = await nbtLoadRows();

    const labels = [];
    const values_yearly = [];
    const values_monthly = [];
    const dates = [];

    json.forEach(row => {
      const date = row.date;
      const yearly = row.inflation_y;
      const monthly = row.inflation;

      if (!date) return;

      const y = Number(yearly);
      const m = Number(monthly);

      if (isNaN(y) && isNaN(m)) return;

      const str = String(date).slice(0, 7);
      const [yr, mo] = str.split('-');
      labels.push(str);
      values_yearly.push(isNaN(y) ? 0 : y);
      values_monthly.push(isNaN(m) ? 0 : m);
      dates.push({ year: parseInt(yr), month: parseInt(mo) });
    });

    updateInflationCard(values_yearly, dates);

    return { labels, values_yearly, values_monthly };

  } catch (err) {
    console.error(I18N.error, err);
    return { labels: [], values_yearly: [], values_monthly: [] };
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  const data = await loadExcelData();
  originalData = data;

  const startIdx2010 = data.labels.findIndex(l => l >= '2010-01');
  const startIdx = startIdx2010 >= 0 ? startIdx2010 : 0;
  const slicedLabels = data.labels.slice(startIdx);
  const slicedYearly = data.values_yearly.slice(startIdx);
  const slicedMonthly = data.values_monthly.slice(startIdx);
  originalData.td = buildTargetData(slicedLabels);
  originalData._startIdx = startIdx;

  const bgFill = ctx2 => {
    const {ctx: c, chartArea} = ctx2.chart;
    if (!chartArea) return nbtAlpha(COLORS.inflation,0.12);
    const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, nbtAlpha(COLORS.inflation,0.55));
    g.addColorStop(1, nbtAlpha(COLORS.inflation,0));
    return g;
  };

  const yr = computeRangeYearly(slicedYearly.filter(v => v !== null), slicedLabels);
  const ctx = document.getElementById('inflationChart').getContext('2d');

  inflationChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: slicedLabels,
      datasets: [{
        label: I18N.annual + ' (%)',
        data: slicedYearly,
        borderColor: COLORS.inflation,
        backgroundColor: bgFill,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        fill: true,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: COLORS.inflation,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }, {
        label: '_upper',
        data: originalData.td.upper,
        borderColor: 'rgba(16,185,129,0.20)',
        backgroundColor: 'rgba(16,185,129,0.08)',
        borderWidth: 1,
        pointRadius: 0,
        fill: '+1',
        tension: 0,
        stepped: true
      }, {
        label: '_lower',
        data: originalData.td.lower,
        borderColor: 'rgba(16,185,129,0.20)',
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
        tension: 0,
        stepped: true
      }, {
        label: (t => I18N.target(t.center, t.band))(window.NBT_INFLATION_TARGETS[window.NBT_INFLATION_TARGETS.length - 1]),
        endLabel: false,
        data: originalData.td.center,
        borderColor: 'rgba(5,150,105,0.65)',
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        tension: 0,
        stepped: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          filter: item => item.datasetIndex === 0 || item.datasetIndex === 3,
          callbacks: {
            title: () => '',
            label: c => {
              if (c.parsed.y === null) return null;
              const lbl = c.chart.data.labels[c.dataIndex];
              if (c.datasetIndex === 3) {
                const t = getTarget(lbl);
                return t ? I18N.target(t.center, t.band) : null;
              }
              return `${lbl}: ${num(c.parsed.y, 1)}%`;
            },
            labelColor: c => {
              if (c.datasetIndex === 3) return { borderColor: COLORS.target, backgroundColor: COLORS.target };
              return { borderColor: COLORS.inflation, backgroundColor: COLORS.inflation };
            }
          }
        }
      },
      scales: {
        x: {
          grid:{display:false},
          ticks: {
            padding: 6,
            maxTicksLimit: nbtTicks(),
            callback: nbtMonthTick(I18N.months),
            maxRotation: 0,
            minRotation: 0
          }
        },
        y: {
          min: yr.min,
          max: yr.max,
          ticks: { callback: v => v + '%', stepSize: yr.step }
        }
      }
    },
  });

  const si = document.getElementById('startDate');
  const ei = document.getElementById('endDate');
  const firstDataIdx = data.values_yearly.findIndex(v => v !== null);
  const firstDataDate = firstDataIdx >= 0 ? data.labels[firstDataIdx] : data.labels[0];
  si.min = firstDataDate; si.max = data.labels[data.labels.length - 1];
  ei.min = firstDataDate; ei.max = data.labels[data.labels.length - 1];
  si.value = slicedLabels[0];
  ei.value = slicedLabels[slicedLabels.length - 1];
  updateRangeLabel();

  let lastDate = null;
  for (let i = data.values_yearly.length - 1; i >= 0; i--) {
    if (data.values_yearly[i] !== null && data.values_yearly[i] !== 0) { lastDate = data.labels[i]; break; }
  }
  const lastEl = document.getElementById('inflation-last-updated');
  if (lastEl) lastEl.textContent = fmtDate(lastDate);
});

function computeRangeZero(nums){
  if(!nums.length) return {min:-2,max:2,step:1};
  const lo=Math.min(0,Math.min(...nums)),hi=Math.max(0,Math.max(...nums));
  const range=hi-lo, step=range<3?0.5:range<8?1:range<20?2:5;
  return {min:Math.floor((lo-step)/step)*step,max:Math.ceil((hi+step)/step)*step,step};
}
function barColors(data){ return data.map(v=>v===null?'transparent':v>=0?nbtAlpha(COLORS.inflation,0.85):nbtAlpha(COLORS.deflation,0.75)); }
function barBorderColors(data){ return data.map(v=>v===null?'transparent':v>=0?COLORS.inflation:COLORS.deflation); }

let yearlyRange = null;
function setRange(start, end) {
  document.getElementById('startDate').value = start;
  document.getElementById('endDate').value = end;
  updateChart();
  updateRangeLabel();
  const rb = document.getElementById('inflation-reset-btn');
  if (rb) rb.classList.remove('btn-chart--active');
}
function switchInflation(type){
  if (!inflationChart || !originalData) return;
  if (type !== currentMode) {
    const L = originalData.labels, cur = inflationChart.data.labels;
    if (type === 'monthly') {
      yearlyRange = [cur[0], cur[cur.length - 1]];
      if (cur.length > 48) { currentMode = 'monthly'; setRange(L[Math.max(0, L.length - 36)], L[L.length - 1]); }
    } else if (yearlyRange) {
      currentMode = 'yearly'; setRange(yearlyRange[0], yearlyRange[1]); yearlyRange = null;
    }
  }

  currentMode = type;

  const allLabels = originalData.labels;
  const curLabels = inflationChart.data.labels;
  const si = allLabels.indexOf(curLabels[0]);
  const ei = allLabels.indexOf(curLabels[curLabels.length - 1]);
  const allValues = type === 'monthly' ? originalData.values_monthly : originalData.values_yearly;
  const sliced = si >= 0 && ei >= 0 ? allValues.slice(si, ei + 1) : allValues;

  inflationChart.data.datasets[0].data = sliced;
  inflationChart.data.datasets[0].label = type === 'monthly' ? I18N.monthly + ' (%)' : I18N.annual + ' (%)';

  if (type === 'monthly') {
    inflationChart.config.type = 'bar';
    inflationChart.data.datasets[0].backgroundColor = barColors(sliced);
    inflationChart.data.datasets[0].borderColor = barBorderColors(sliced);
    inflationChart.data.datasets[0].borderWidth = 0;
    inflationChart.data.datasets[0].fill = false;
    inflationChart.data.datasets[0].borderRadius = 5;
    inflationChart.data.datasets[0].maxBarThickness = 26;
    inflationChart.data.datasets[0].categoryPercentage = 0.8;
    inflationChart.options.scales.x.ticks.maxTicksLimit = nbtTicks();
    inflationChart.options.scales.x.ticks.maxRotation = 0;
    inflationChart.options.scales.x.ticks.minRotation = 0;
    inflationChart.options.scales.x.offset = true;
    inflationChart.options.scales.x.grid = { display: false };
    inflationChart.options.scales.y.grid = { color: ctx => ctx.tick.value === 0 ? '#94a3b8' : '#f1f5f9' };
    inflationChart.options.plugins.tooltip.callbacks.label = c => {
      if (c.parsed.y === null) return '';
      const v = c.parsed.y, a = v >= 0 ? '▲' : '▼', s = v >= 0 ? '+' : '';
      return `${c.chart.data.labels[c.dataIndex]}: ${a} ${s}${num(v, 1)}%`;
    };
    inflationChart.options.plugins.tooltip.callbacks.labelColor = c => {
      const color = c.parsed.y >= 0 ? COLORS.inflation : COLORS.deflation;
      return { borderColor: color, backgroundColor: color };
    };
    const r = computeRangeZero(sliced.filter(v => v !== null));
    inflationChart.options.scales.y.min = r.min;
    inflationChart.options.scales.y.max = r.max;
    inflationChart.options.scales.y.ticks.stepSize = r.step;
  } else {
    inflationChart.config.type = 'line';
    inflationChart.data.datasets[0].backgroundColor = ctx2 => {
      const {ctx: c, chartArea} = ctx2.chart;
      if (!chartArea) return nbtAlpha(COLORS.inflation,0.12);
      const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      g.addColorStop(0, nbtAlpha(COLORS.inflation,0.55)); g.addColorStop(1, nbtAlpha(COLORS.inflation,0));
      return g;
    };
    inflationChart.data.datasets[0].borderColor = COLORS.inflation;
    inflationChart.data.datasets[0].borderWidth = 2;
    inflationChart.data.datasets[0].fill = true;
    inflationChart.data.datasets[0].tension = 0.4;
    inflationChart.data.datasets[0].pointRadius = 0;
    inflationChart.data.datasets[0].pointHoverRadius = 5;
    inflationChart.data.datasets[0].borderRadius = undefined;
    inflationChart.data.datasets[0].maxBarThickness = undefined;
    inflationChart.options.scales.x.ticks.maxTicksLimit = nbtTicks();
    inflationChart.options.scales.x.ticks.maxRotation = 45;
    inflationChart.options.scales.x.ticks.minRotation = 45;
    inflationChart.options.scales.x.offset = false;
    inflationChart.options.scales.x.grid = { color: '#e6e6e6' };
    inflationChart.options.scales.y.grid = { color: '#e6e6e6' };
    inflationChart.options.plugins.tooltip.callbacks.title = () => '';
    inflationChart.options.plugins.tooltip.callbacks.label = c => {
      if (c.parsed.y === null) return null;
      const lbl = c.chart.data.labels[c.dataIndex];
      if (c.datasetIndex === 3) { const t = getTarget(lbl); return t ? I18N.target(t.center, t.band) : null; }
      return `${lbl}: ${num(c.parsed.y, 1)}%`;
    };
    inflationChart.options.plugins.tooltip.callbacks.labelColor = c => {
      if (c.datasetIndex === 3) return { borderColor: COLORS.target, backgroundColor: COLORS.target };
      return { borderColor: COLORS.inflation, backgroundColor: COLORS.inflation };
    };
    const td2 = buildTargetData(curLabels);
    inflationChart.data.datasets[1].data = td2.upper;
    inflationChart.data.datasets[2].data = td2.lower;
    inflationChart.data.datasets[3].data = td2.center;
    const r = computeRangeYearly(sliced.filter(v => v !== null), curLabels);
    inflationChart.options.scales.y.min = r.min;
    inflationChart.options.scales.y.max = r.max;
    inflationChart.options.scales.y.ticks.stepSize = r.step;
  }

  const showTarget = type === 'yearly';
  const corrBtn = document.getElementById('btn-corridor');
  const corrActive = corrBtn ? corrBtn.classList.contains('btn-overlay--active') : true;
  [1, 2, 3].forEach(i => inflationChart.data.datasets[i].hidden = !showTarget || !corrActive);
  if (corrBtn) corrBtn.style.display = showTarget ? '' : 'none';

  document.getElementById('btn-yearly').classList.toggle('active', type === 'yearly');
  document.getElementById('btn-monthly').classList.toggle('active', type === 'monthly');
  inflationChart.update();
}

function toggleCorridor() {
  const btn = document.getElementById('btn-corridor');
  const wasActive = btn.classList.contains('btn-overlay--active');
  btn.classList.toggle('btn-overlay--active', !wasActive);
  btn.style.borderColor = !wasActive ? COLORS.target : '';
  btn.style.color = !wasActive ? COLORS.target : '';
  [1, 2, 3].forEach(i => inflationChart.data.datasets[i].hidden = wasActive);
  inflationChart.update();
}

function toggleDatePicker() {
  document.getElementById('inflation-dropdown').classList.toggle('open');
}

function applyDateRange() {
  document.getElementById('inflation-dropdown').classList.remove('open');
  updateChart();
  updateRangeLabel();
}

function updateRangeLabel() {
  const s = document.getElementById('startDate').value;
  const e = document.getElementById('endDate').value;
  const lbl = document.getElementById('inflation-range-label');
  const fmt = v => v ? v.split('-').reverse().join('.') : '?';
  if (lbl) lbl.textContent = fmt(s) + ' — ' + fmt(e);
}

function updateChart() {
  if (!inflationChart || !originalData) return;

  const startInput = document.getElementById('startDate').value;
  const endInput = document.getElementById('endDate').value;

  const start = startInput.slice(0, 7);
  const end = endInput.slice(0, 7);

  const labels = originalData.labels;

  const values = (currentMode === "monthly")
    ? originalData.values_monthly
    : originalData.values_yearly;

  let startIndex = labels.findIndex(l => l >= start);
  let endIndex = labels.findIndex(l => l > end) - 1;

  if (startIndex < 0) startIndex = 0;
  if (endIndex < 0) endIndex = labels.length - 1;

  const slicedLabels = labels.slice(startIndex, endIndex + 1);
  inflationChart.data.labels = slicedLabels;
  inflationChart.data.datasets[0].data = values.slice(startIndex, endIndex + 1);

  if (currentMode === 'yearly') {
    const td = buildTargetData(slicedLabels);
    inflationChart.data.datasets[1].data = td.upper;
    inflationChart.data.datasets[2].data = td.lower;
    inflationChart.data.datasets[3].data = td.center;
  }

  const sliced2 = values.slice(startIndex, endIndex + 1).filter(v => v !== null);
  if (currentMode === 'monthly') {
    inflationChart.data.datasets[0].backgroundColor = barColors(values.slice(startIndex, endIndex + 1));
    inflationChart.data.datasets[0].borderColor = barBorderColors(values.slice(startIndex, endIndex + 1));
    const r = computeRangeZero(sliced2);
    inflationChart.options.scales.y.min = r.min; inflationChart.options.scales.y.max = r.max; inflationChart.options.scales.y.ticks.stepSize = r.step;
  } else {
    const r = computeRangeYearly(sliced2, slicedLabels);
    inflationChart.options.scales.y.min = r.min; inflationChart.options.scales.y.max = r.max; inflationChart.options.scales.y.ticks.stepSize = r.step;
  }
  inflationChart.update();
  const rb = document.getElementById('inflation-reset-btn');
  if (rb) rb.classList.add('btn-chart--active');
}

function resetChart() {
  if (!inflationChart || !originalData) return;

  currentMode = "yearly";

  const si0 = originalData._startIdx || 0;
  const resetLabels  = originalData.labels.slice(si0);
  const resetYearly  = originalData.values_yearly.slice(si0);
  const resetTd = buildTargetData(resetLabels);

  inflationChart.data.labels = resetLabels;
  inflationChart.data.datasets[0].data = resetYearly;
  inflationChart.data.datasets[0].label = I18N.annual + ' (%)';

  inflationChart.data.datasets[1].data = resetTd.upper;
  inflationChart.data.datasets[2].data = resetTd.lower;
  inflationChart.data.datasets[3].data = resetTd.center;
  [1, 2, 3].forEach(i => inflationChart.data.datasets[i].hidden = false);

  inflationChart.config.type = 'line';
  inflationChart.data.datasets[0].backgroundColor = ctx2 => {
    const {ctx: c, chartArea} = ctx2.chart;
    if (!chartArea) return nbtAlpha(COLORS.inflation,0.12);
    const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    g.addColorStop(0, nbtAlpha(COLORS.inflation,0.55)); g.addColorStop(1, nbtAlpha(COLORS.inflation,0));
    return g;
  };
  inflationChart.data.datasets[0].borderColor = COLORS.inflation;
  inflationChart.data.datasets[0].borderWidth = 2;
  inflationChart.data.datasets[0].fill = true;
  inflationChart.data.datasets[0].tension = 0.4;
  inflationChart.options.scales.x.ticks.maxTicksLimit = nbtTicks();
  inflationChart.options.scales.x.ticks.maxRotation = 45;
  inflationChart.options.scales.x.ticks.minRotation = 45;
  inflationChart.options.scales.x.offset = false;
  inflationChart.options.scales.x.grid = { color: '#e6e6e6' };
  inflationChart.options.scales.y.grid = { color: '#e6e6e6' };
  const r2 = computeRangeYearly(resetYearly.filter(v => v !== null), resetLabels);
  inflationChart.options.scales.y.min = r2.min; inflationChart.options.scales.y.max = r2.max; inflationChart.options.scales.y.ticks.stepSize = r2.step;
  inflationChart.options.plugins.tooltip.callbacks.title = () => '';
  inflationChart.options.plugins.tooltip.callbacks.label = c => {
    if (c.parsed.y === null) return null;
    const lbl = c.chart.data.labels[c.dataIndex];
    if (c.datasetIndex === 3) { const t = getTarget(lbl); return t ? I18N.target(t.center, t.band) : null; }
    return `${lbl}: ${num(c.parsed.y, 1)}%`;
  };
  inflationChart.options.plugins.tooltip.callbacks.labelColor = c => {
    if (c.datasetIndex === 3) return { borderColor: COLORS.target, backgroundColor: COLORS.target };
    return { borderColor: COLORS.inflation, backgroundColor: COLORS.inflation };
  };
  inflationChart.update();

  const startIdx2010 = originalData.labels.findIndex(l => l >= '2010-01');
  const si2 = startIdx2010 >= 0 ? startIdx2010 : 0;
  document.getElementById('startDate').value = originalData.labels[si2];
  document.getElementById('endDate').value = originalData.labels[originalData.labels.length - 1];
  updateRangeLabel();

  document.getElementById('btn-yearly').classList.add('active');
  document.getElementById('btn-monthly').classList.remove('active');
  const corrBtn = document.getElementById('btn-corridor');
  if (corrBtn) { corrBtn.style.display = ''; corrBtn.classList.add('btn-overlay--active'); corrBtn.style.borderColor = COLORS.target; corrBtn.style.color = COLORS.target; }
  const rb = document.getElementById('inflation-reset-btn');
  if (rb) rb.classList.remove('btn-chart--active');
}

async function exportXLS() {
  const XLSX = await nbtLoadXLSX();
  if (!inflationChart) return;
  const labels = inflationChart.data.labels;
  const data = inflationChart.data.datasets[0].data;
  const label = inflationChart.data.datasets[0].label || I18N.inflation + ' (%)';
  const rows = [[I18N.dateCol, label]];
  labels.forEach((l, i) => { if (data[i] !== null && data[i] !== 0) rows.push([l, data[i]]); });
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{wch:10},{wch:22}];
  const wb2 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2, ws, 'inflation');
  XLSX.writeFile(wb2, 'inflation.xlsx');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.date-range-wrap')) {
    const dd = document.getElementById('inflation-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

const XP = {
  tj: { open: 'Кушодан', close: 'Пӯшидан', groups: ['Хӯрокворӣ', 'Ғайрихӯрокворӣ', 'Хизматрасонӣ'], items: 'номгӯй дар сабад', weights: 'вазни хос, %' },
  ru: { open: 'Открыть', close: 'Свернуть', groups: ['Продовольственные', 'Непродовольственные', 'Услуги'], items: 'наименований в корзине', weights: 'удельный вес, %' },
  en: { open: 'Open', close: 'Close', groups: ['Food', 'Non-food', 'Services'], items: 'items in the basket', weights: 'weight, %' },
}[LANG];
const GROUP_COLORS = [COLORS.food || '#3b82f6', COLORS.nonfood || '#f59e0b', COLORS.services || '#22c55e'];
const numsIn = t => (t.match(/\d+(?:[.,]\d+)?/g) || []).map(x => +x.replace(',', '.'));

function stackBar(values, total, fmtV) {
  return `<div class="xp-stack">${values.map((v, i) => `<span style="flex:${v} 1 0;background:${GROUP_COLORS[i]}" title="${XP.groups[i]}: ${fmtV(v)}"></span>`).join('')}</div>
    <ul class="xp-legend">${values.map((v, i) => `<li><i style="background:${GROUP_COLORS[i]}"></i>${XP.groups[i]} <b>${fmtV(v)}</b></li>`).join('')}</ul>`;
}

document.querySelectorAll('.show-more').forEach((link, k) => {
  const panel = link.nextElementSibling;
  if (!panel || !panel.classList.contains('expandable-content')) return;
  const id = 'xp-panel-' + (k + 1);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'xp-toggle';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', id);
  btn.innerHTML = `<span class="xp-toggle__icon" aria-hidden="true"></span><span class="xp-toggle__text">${link.textContent.trim()}</span><span class="xp-toggle__state">${XP.open}</span>`;
  link.replaceWith(btn);
  panel.id = id;
  panel.classList.add('xp-panel');
  panel.innerHTML = `<div class="xp-panel__inner">${panel.innerHTML}</div>`;

  const secs = panel.querySelectorAll('.xp-panel__inner > section');
  if (secs.length) {
    panel.querySelector('.xp-panel__inner').classList.add('xp-steps');
    secs.forEach(sec => {
      sec.classList.add('xp-step');
      const h = sec.querySelector('h3'); if (h) h.textContent = h.textContent.replace(/^\s*\d+\.\s*/, '');
      sec.querySelectorAll('p').forEach(p => {
        const n = numsIn(p.textContent);

        for (let i = 0; i + 3 < n.length; i++) {
          if (n[i] > 0 && n[i] === n[i + 1] + n[i + 2] + n[i + 3]) {
            const viz = document.createElement('div'); viz.className = 'xp-viz';
            viz.innerHTML = `<div class="xp-viz__big">${n[i]}<small>${XP.items}</small></div>` + stackBar([n[i + 1], n[i + 2], n[i + 3]], n[i], v => String(v));
            p.after(viz); return;
          }
        }

        for (let i = 0; i + 2 < n.length; i++) {
          if (Math.abs(n[i] + n[i + 1] + n[i + 2] - 100) < 0.15 && n[i] < 100) {
            const viz = document.createElement('div'); viz.className = 'xp-viz';
            viz.innerHTML = `<div class="xp-viz__cap">${XP.weights}</div>` + stackBar([n[i], n[i + 1], n[i + 2]], 100, v => num(v, 1) + '%');
            p.after(viz); return;
          }
        }
      });
    });
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.xp-toggle__state').textContent = open ? XP.close : XP.open;
    panel.classList.toggle('active', open);
  });
});
