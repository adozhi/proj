const LANG = nbtPageLang();
const COLORS = window.NBT_COLORS;

let rateChart;
let chartData = null;

const I18N = {
  tj: {
    monthsGen: ['январи','феврали','марти','апрели','майи','июни','июли','августи','сентябри','октябри','ноябри','декабри'],
    since:     (day, mn, year) => `аз ${day}${mn} соли ${year}`,
    unchanged: 'Бетағйир',
    pp:        'б.ф.',
    error:     'Хато:',
    rate:      'Меъёри бозтамвил',
    dateCol:   'Сана',
    corridor:  'долони фоизӣ',
    market:    'Байнибонкӣ',
    marketOf:  (m, y) => `Меъёри байнибонкӣ, ${m} ${y}`,
  },
  ru: {
    monthsGen: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    since:     (day, mn, year) => `от ${day}${mn} ${year} года`,
    unchanged: 'Без изменений',
    pp:        'п.п.',
    error:     'Ошибка:',
    rate:      'Ставка рефинансирования',
    dateCol:   'Дата',
    corridor:  'коридор',
    market:    'Межбанк',
    marketOf:  (m, y) => `Межбанковская ставка, ${m} ${y}`,
  },
  en: {
    monthsGen: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    since:     (day, mn, year) => `as of ${day}${mn} ${year}`,
    unchanged: 'Unchanged',
    pp:        'pp',
    error:     'Error:',
    rate:      'Refinancing Rate',
    dateCol:   'Date',
    corridor:  'corridor',
    market:    'Interbank',
    marketOf:  (m, y) => `Interbank rate, ${m} ${y}`,
  },
}[LANG];

const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');

function fmtDate(d){if(!d)return'—';const[y,m]=d.split('-').map(Number);return I18N.monthsGen[m-1]+' '+y;}

function toNum(v){if(v===undefined||v===null||v==='')return null;const n=parseFloat(String(v).replace(',','.'));return isNaN(n)?null:n;}

const cbChartPlugin = {
  id: 'cbChart',
  afterDraw(chart) {
    const ds = chart.data.datasets[0];
    if (!ds) return;
    const data = ds.data;
    const meta0 = chart.getDatasetMeta(0);
    const xAxis = chart.scales.x;
    const yAxis = chart.scales.y;
    const c = chart.ctx;
    function rr(x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
    c.save();

    let lastVal = null, lastIdx = -1;
    for (let i = data.length-1; i >= 0; i--) { if (data[i] !== null) { lastVal = data[i]; lastIdx = i; break; } }
    if (lastVal !== null && meta0.data[lastIdx]) {
      const yPos = yAxis.getPixelForValue(lastVal);
      const lastX = meta0.data[lastIdx].x;
      c.strokeStyle = nbtAlpha(COLORS.rate,0.5);
      c.lineWidth = 1;
      c.setLineDash([5, 4]);
      c.beginPath(); c.moveTo(lastX, yPos); c.lineTo(xAxis.right, yPos); c.stroke();
      c.setLineDash([]);
      c.font = '600 10px Inter, system-ui, sans-serif';
      const txt = num(lastVal, 2) + '%';
      const tw = c.measureText(txt).width;
      const bx = xAxis.right - tw - 11;
      const by = yPos - 9;
      c.fillStyle = COLORS.rate;
      rr(bx - 3, by - 1, tw + 9, 16, 3); c.fill();
      c.fillStyle = '#fff'; c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText(txt, bx, by + 1);
    }

    c.font = '600 9px Inter, system-ui, sans-serif';
    let lastLabelX = -999;
    data.forEach((v, i) => {
      if (v === null) return;
      let delta = null;
      for (let j = i-1; j >= 0; j--) {
        if (data[j] !== null) { const d = v - data[j]; if (Math.abs(d) > 0.0001) delta = d; break; }
      }
      if (delta === null) return;
      const pt = meta0.data[i]; if (!pt) return;
      const x = pt.x;

      c.strokeStyle = '#94a3b8'; c.lineWidth = 1.5; c.setLineDash([]);
      c.beginPath(); c.moveTo(x, xAxis.bottom + 1); c.lineTo(x, xAxis.bottom + 5); c.stroke();

      if (x - lastLabelX < 38) return;
      lastLabelX = x;
      const isHike = delta > 0;
      const label = num(v, 2) + '%';
      const tw = c.measureText(label).width;
      const yVal = yAxis.getPixelForValue(v);
      const bx = x - tw / 2 - 4;
      const by = Math.max(yAxis.top + 2, yVal - 22);
      c.fillStyle = isHike ? '#c0504d' : '#16a34a';
      c.globalAlpha = 0.88;
      rr(bx, by, tw + 8, 14, 3); c.fill();
      c.globalAlpha = 1;
      c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(label, x, by + 7);
    });

    c.restore();
  }
};

function computeRange(values){
  const nums=values.filter(v=>v!==null&&!isNaN(v));
  if(!nums.length)return{min:0,max:10,step:2};
  const lo=Math.min(...nums),hi=Math.max(...nums);
  const step=hi-lo<5?1:hi-lo<15?2:5;
  const mid=(lo+hi)/2,half=Math.ceil(((hi-lo)/2+step)/step)*step;
  return{min:Math.max(0,Math.floor((mid-half)/step)*step),max:Math.ceil((mid+half)/step)*step,step};
}

function computeCardState(arr, dates) {
  const n = arr.length; if (n < 2) return null;
  const current = arr[n-1];
  let changeIdx = n-1;
  for (let i = n-2; i >= 0; i--) {
    if (Math.abs(arr[i] - current) > 0.0001) break;
    changeIdx = i;
  }
  const prevValue = changeIdx > 0 ? arr[changeIdx-1] : current;
  const delta = current - prevValue;
  const direction = delta > 0.0001 ? 1 : delta < -0.0001 ? -1 : 0;
  const base = dates[changeIdx];

  const day = base && window.nbtRateEffectiveDay ? window.nbtRateEffectiveDay(base.year, base.month) : null;
  return { direction, delta: Math.abs(delta), sinceDate: day ? {...base, day} : base, currentValue: current };
}

function updateCorridorTable(rate) {
  const fmt = v => num(v, 1);
  const u = document.getElementById('corridor-upper');
  const c = document.getElementById('corridor-center');
  const l = document.getElementById('corridor-lower');
  if (u) u.textContent = fmt(rate + 3);
  if (c) c.textContent = fmt(rate);
  if (l) l.textContent = fmt(rate - 3);
}

function updateRateCard(rates, dates) {
  const state = computeCardState(rates, dates);
  if (!state) return;
  const valEl = document.getElementById('val-rate-detail');
  const badgeEl = document.getElementById('badge-rate-detail');
  const subtitleEl = document.getElementById('rate-since-subtitle');
  if (valEl) valEl.textContent = num(state.currentValue, 2);
  if (state.sinceDate) {
    const mn = I18N.monthsGen[state.sinceDate.month - 1];
    const day = state.sinceDate.day ? (state.sinceDate.day < 10 ? '0' + state.sinceDate.day : '' + state.sinceDate.day) + ' ' : '';
    if (subtitleEl) subtitleEl.textContent = I18N.since(day, mn, state.sinceDate.year);
    if (badgeEl) {
      if (state.direction === 0) {
        badgeEl.textContent = I18N.unchanged;
        badgeEl.style.cssText = 'background:rgba(251,191,36,0.22);color:#fbbf24;border:1px solid rgba(251,191,36,0.35);';
      } else {
        const arrow = state.direction < 0 ? '↓ ' : '↑ ';
        const sign = state.direction < 0 ? '−' : '+';
        const deltaStr = num(state.delta, 2);
        badgeEl.textContent = `${arrow}${sign}${deltaStr} ${I18N.pp}`;
        if (state.direction < 0) {
          badgeEl.style.cssText = 'background:rgba(34,197,94,0.18);color:#86efac;border:1px solid rgba(34,197,94,0.25);';
        } else {
          badgeEl.style.cssText = 'background:rgba(192,80,77,0.3);color:#f2b8b5;border:1px solid rgba(192,80,77,0.55);';
        }
      }
    }
  }
  updateCorridorTable(state.currentValue);
}

const RATE_CUT = '#16a34a', RATE_HIKE = '#c0504d';
function rateMove(prev, cur) {
  if (prev == null || cur == null || Math.abs(cur - prev) < 0.0001) return null;
  return cur < prev ? RATE_CUT : RATE_HIKE;
}
function prevRate(data, i) { for (let k = i - 1; k >= 0; k--) if (data[k] != null) return data[k]; return null; }

document.addEventListener('DOMContentLoaded', async () => {
  let json;
  try {
    json = await nbtLoadRows({defval:""});
  } catch(err) { console.error(I18N.error, err); return; }

  const labels = [], values = [], cardRates = [], cardDates = [];
  json.forEach(row => {
    const date = row.date; if (!date) return;
    const v = toNum(row.rate_eom);
    labels.push(String(date).slice(0,7));
    values.push(v);
    if (v !== null) {
      cardRates.push(v);
      const [y,m] = String(date).slice(0,7).split('-');
      cardDates.push({year:parseInt(y),month:parseInt(m)});
    }
  });

  chartData = {labels, values};
  updateRateCard(cardRates, cardDates);

  let startIdx = labels.findIndex(l => l >= '2010-01'); if (startIdx < 0) startIdx = 0;
  const slicedLabels = labels.slice(startIdx);
  const slicedValues = values.slice(startIdx);

  const allVals = slicedValues.filter(v => v !== null);
  const r = {...computeRange(allVals), min:0};

  const ctx = document.getElementById('rateChart');
  rateChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: slicedLabels,
      datasets: [{
        label: I18N.rate,
        data: slicedValues,
        borderColor: COLORS.rate,
        backgroundColor: 'transparent',
        borderWidth: 2,
        fill: false,
        tension: 0,
        stepped: 'before',

        segment: { borderColor: c => rateMove(c.p0.parsed.y, c.p1.parsed.y) || COLORS.rate },
        pointRadius: c => rateMove(prevRate(c.chart.data.datasets[0].data, c.dataIndex), c.raw) ? 4 : 0,
        pointBackgroundColor: c => rateMove(prevRate(c.chart.data.datasets[0].data, c.dataIndex), c.raw) || COLORS.rate,
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: c => rateMove(prevRate(c.chart.data.datasets[0].data, c.dataIndex), c.raw) || COLORS.rate,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {mode:'index', intersect:false},
      plugins: {
        endLabel: { decimals: 2 },
        legend: {display:false},
        tooltip: {
          callbacks: {
            title: () => '',
            label: c => {
              if (c.parsed.y === null) return '';
              const val = c.parsed.y, lbl = c.chart.data.labels[c.dataIndex];
              const vs = num(val, 2);
              const pd = c.chart.data.datasets[0].data;
              let prev = null;
              for (let i = c.dataIndex-1; i >= 0; i--) { if (pd[i] !== null) { prev = pd[i]; break; } }
              if (prev !== null && Math.abs(val - prev) > 0.0001) {
                const d = val - prev, s2 = d >= 0 ? '+' : '−', a = d >= 0 ? '▲' : '▼';
                return `${lbl}: ${vs}% (${a} ${s2}${num(Math.abs(d), 2)} ${I18N.pp})`;
              }
              return `${lbl}: ${vs}%`;
            },
            labelColor: c => { const col = rateMove(prevRate(c.chart.data.datasets[0].data, c.dataIndex), c.parsed.y) || COLORS.rate; return { borderColor: col, backgroundColor: col }; }
          }
        }
      },
      scales: {
        x: {grid:{display:false}, ticks:{color:'#666',padding:6,maxTicksLimit:nbtTicks(),maxRotation:0,minRotation:0,callback:nbtMonthTick(I18N.monthsGen)}},
        y: {min:r.min, max:r.max, grid:{color:'#e6e6e6'}, ticks:{color:'#666',stepSize:r.step,callback:v=>v+'%'}}
      }
    }
  });

  const si = document.getElementById('rate-start');
  const ei = document.getElementById('rate-end');
  const firstRateIdx = values.findIndex(v => v !== null);
  const firstRateDate = firstRateIdx >= 0 ? labels[firstRateIdx] : labels[0];
  si.min = firstRateDate; si.max = labels[labels.length-1];
  ei.min = firstRateDate; ei.max = labels[labels.length-1];
  si.value = slicedLabels[0]; ei.value = slicedLabels[slicedLabels.length-1];
  updateRangeLabel();

  let lastDate = null;
  for (let i = values.length-1; i >= 0; i--) { if (values[i] !== null) { lastDate = labels[i]; break; } }
  const lastEl = document.getElementById('rate-last-updated');
  if (lastEl) lastEl.textContent = fmtDate(lastDate);
});

function toggleDatePicker() {
  const dd = document.getElementById('rate-dropdown');
  dd.classList.toggle('open');
}

function applyDateRange() {
  document.getElementById('rate-dropdown').classList.remove('open');
  applyRange();
  updateRangeLabel();
}

function applyRange() {
  if (!rateChart || !chartData) return;
  const start = document.getElementById('rate-start').value;
  const end = document.getElementById('rate-end').value;
  let s = chartData.labels.findIndex(l => l >= start); if (s < 0) s = 0;
  let e = chartData.labels.findIndex(l => l > end); if (e < 0) e = chartData.labels.length;
  if (e <= s) e = s + 1;
  const sliced = chartData.values.slice(s, e);
  rateChart.data.labels = chartData.labels.slice(s, e);
  rateChart.data.datasets[0].data = sliced;
  const allVals = sliced.filter(v => v !== null);
  const r = {...computeRange(allVals), min:0};
  rateChart.options.scales.y.min = r.min; rateChart.options.scales.y.max = r.max; rateChart.options.scales.y.ticks.stepSize = r.step;
  rateChart.update();
  const rb = document.getElementById('rate-reset-btn'); if (rb) rb.classList.add('btn-chart--active');
}

function resetChart() {
  if (!rateChart || !chartData) return;
  let startIdx = chartData.labels.findIndex(l => l >= '2010-01'); if (startIdx < 0) startIdx = 0;
  const labels = chartData.labels.slice(startIdx);
  const values = chartData.values.slice(startIdx);
  rateChart.data.labels = labels;
  rateChart.data.datasets[0].data = values;
  const allVals = values.filter(v => v !== null);
  const r = {...computeRange(allVals), min:0};
  rateChart.options.scales.y.min = r.min; rateChart.options.scales.y.max = r.max; rateChart.options.scales.y.ticks.stepSize = r.step;
  rateChart.update();
  const si = document.getElementById('rate-start'); const ei = document.getElementById('rate-end');
  if (si && ei) { si.value = labels[0]; ei.value = labels[labels.length-1]; updateRangeLabel(); }
  document.getElementById('rate-dropdown').classList.remove('open');
  const rb = document.getElementById('rate-reset-btn'); if (rb) rb.classList.remove('btn-chart--active');
}

function updateRangeLabel() {
  const s = document.getElementById('rate-start').value;
  const e = document.getElementById('rate-end').value;
  const lbl = document.getElementById('rate-range-label');
  const fmt = v => v ? v.split('-').reverse().join('.') : '?';
  if (lbl) lbl.textContent = fmt(s) + ' — ' + fmt(e);
}

async function exportXLS() {
  const XLSX = await nbtLoadXLSX();
  if (!rateChart) return;
  const rows = [[I18N.dateCol, I18N.rate + ' (%)']];
  rateChart.data.labels.forEach((l, i) => {
    const v = rateChart.data.datasets[0].data[i];
    if (v !== null) rows.push([l, v]);
  });
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{wch:10},{wch:22}];
  const wb2 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2, ws, 'rate');
  XLSX.writeFile(wb2, 'policy_rate.xlsx');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.date-range-wrap')) {
    const dd = document.getElementById('rate-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

(function () {
  const host = document.getElementById('corridorGauge');
  if (!host || !window.nbtGauge) return;
  const MONTHS = { tj: ['январ','феврал','март','апрел','май','июн','июл','август','сентябр','октябр','ноябр','декабр'],
                   ru: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
                   en: ['January','February','March','April','May','June','July','August','September','October','November','December'] }[LANG];
  nbtLoadRows().then(rows => {
    const r = rows.filter(x => x.rate_eom != null).pop();
    const ib = rows.filter(x => x.interbank != null).pop();
    if (!r) return;
    const rate = +r.rate_eom;
    const [y, m] = ib ? String(ib.date).split('-').map(Number) : [0, 0];
    const label = document.getElementById('corridorGaugeLabel');
    if (label && ib) label.textContent = I18N.marketOf(MONTHS[m - 1], y);
    nbtGauge(host, { min: 0, max: Math.ceil(rate + 5), step: 2, band: [rate - 3, rate + 3], center: rate, bandText: I18N.corridor,
      value: ib ? +ib.interbank : null, valueText: ib ? `${I18N.market} ${num(+ib.interbank, 1)}%` : '' });
    host.querySelector('.gauge').classList.add('gauge--dark');
  }).catch(() => {});
})();
