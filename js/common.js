/**
 * common.js — shared utilities for all detail pages.
 * Provides: setLang (file-aware redirect), initLangButtons,
 *           exportChartPNG, exportChartCSV, filterChart, resetChart.
 */
(function () {

  /* ---------- helpers ---------- */

  function getBaseName() {
    const file = location.pathname.split('/').pop();
    return file.replace(/(_ru|_eng)\.html$/, '.html').replace('.html', '');
  }

  function buildUrl(lang) {
    const base = getBaseName();
    const map = {
      tj: `../other_links/${base}.html`,
      ru: `../ru/${base}_ru.html`,
      en: `../eng/${base}_eng.html`,
    };
    return map[lang] || map.tj;
  }

  /* ---------- language switcher ---------- */

  window.setLang = function (lang) {
    document.body.style.opacity = '0.4';
    setTimeout(() => {
      localStorage.setItem('lang', lang);
      window.location.href = buildUrl(lang);
    }, 150);
  };

  function initLangButtons() {
    const saved = localStorage.getItem('lang') || 'tj';
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const m = btn.getAttribute('onclick')?.match(/'([a-z]+)'/);
      btn.classList.toggle('active', m?.[1] === saved);
    });
  }

  /* ---------- chart export ---------- */

  window.exportChartPNG = function (chart, name) {
    const a = document.createElement('a');
    a.href = chart.toBase64Image();
    a.download = (name || 'chart') + '.png';
    a.click();
  };

  window.exportChartCSV = function (chart, name, col) {
    const labels = chart.data.labels;
    const vals   = chart.data.datasets[0].data;
    let csv = `Date,${col || 'Value'}\n`;
    labels.forEach((l, i) => { csv += `${l},${vals[i]}\n`; });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = (name || 'chart') + '.csv';
    a.click();
  };

  /* ---------- chart date-filter helpers ---------- */

  /**
   * filterChart(chart, allLabels, allValues, startId, endId)
   * Slices labels/values between the two <input type="month"> elements.
   */
  window.filterChart = function (chart, allLabels, allValues, startId, endId) {
    const start = document.getElementById(startId)?.value?.slice(0, 7) || '';
    const end   = document.getElementById(endId)?.value?.slice(0, 7) || '';

    let s = start ? allLabels.findIndex(l => l >= start) : 0;
    let e = end   ? allLabels.findIndex(l => l >  end)   : -1;
    if (s < 0) s = 0;
    if (e < 0) e = allLabels.length;

    chart.data.labels             = allLabels.slice(s, e);
    chart.data.datasets[0].data   = allValues.slice(s, e);
    chart.update();
  };

  /**
   * resetChart(chart, allLabels, allValues, startId, endId)
   * Restores the full date range and resets the pickers.
   */
  window.resetChartRange = function (chart, allLabels, allValues, startId, endId) {
    chart.data.labels           = allLabels;
    chart.data.datasets[0].data = allValues;
    chart.update();

    const s = document.getElementById(startId);
    const e = document.getElementById(endId);
    if (s) s.value = allLabels[0];
    if (e) e.value = allLabels[allLabels.length - 1];
  };

  /* ---------- Excel loader ---------- */

  /**
   * loadExcel(url, columns)
   * url     — path to the .xlsx file
   * columns — array of column keys to extract, first must be "date"
   * Returns: { labels: string[], [col]: number[] }
   */
  window.loadExcel = async function (url, columns) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Cannot fetch ${url}`);
    const wb    = XLSX.read(await res.arrayBuffer(), { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json  = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    const out = { labels: [] };
    columns.forEach(c => { if (c !== 'date') out[c] = []; });

    json.forEach(row => {
      const date = row.date;
      if (!date) return;

      const vals = columns.filter(c => c !== 'date').map(c => {
        const v = parseFloat(String(row[c] ?? '').replace(',', '.'));
        return isNaN(v) ? 0 : v;
      });

      if (vals.every(v => v === 0)) return;

      out.labels.push(String(date).slice(0, 7));
      columns.filter(c => c !== 'date').forEach((c, i) => out[c].push(vals[i]));
    });

    return out;
  };

  /* ---------- init on DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', initLangButtons);

})();
