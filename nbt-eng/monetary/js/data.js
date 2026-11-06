// shared data loader: rows from data/data.json (built by tools/build_data.py),
// falling back to parsing data/data.xlsx when the JSON is missing.
(function () {

  // works from index.html and from the language folders
  const base = document.currentScript.src.replace(/js\/data\.js(\?.*)?$/, '');

  let xlsxPromise = null;

  // SheetJS is ~900 KB — load it only when it is actually needed
  window.nbtLoadXLSX = function () {
    if (window.XLSX) return Promise.resolve(window.XLSX);
    if (!xlsxPromise) {
      xlsxPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = base + 'js/xlsx.full.min.js';
        s.onload  = () => resolve(window.XLSX);
        s.onerror = () => { xlsxPromise = null; reject(new Error('xlsx library failed to load')); };
        document.head.appendChild(s);
      });
    }
    return xlsxPromise;
  };

  let rowsPromise = null;

  async function fetchRows() {
    try {
      const res = await fetch(base + 'data/data.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const { columns, rows } = await res.json();
      return rows.map(r => {
        const o = {};
        columns.forEach((c, i) => { if (r[i] != null) o[c] = r[i]; });
        return o;
      });
    } catch (e) {
      console.warn('data.json unavailable, reading data.xlsx:', e);
      const XLSX = await window.nbtLoadXLSX();
      const res  = await fetch(base + 'data/data.xlsx');
      if (!res.ok) throw new Error('Cannot fetch data.xlsx: ' + res.status);
      const wb = XLSX.read(await res.arrayBuffer(), { type: 'array' });
      return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    }
  }

  // rows shaped like XLSX.utils.sheet_to_json(sheet, { defval })
  // the inflation target by month (columns target / target_band) replaces the list in data/targets.js:
  // consecutive months with the same target become one period, the last period stays open (to: null)
  function applyTargets(rows) {
    const periods = [];
    rows.forEach(r => {
      if (r.target == null || !r.date) return;
      const c = +r.target, b = r.target_band != null ? +r.target_band : 0, last = periods[periods.length - 1];
      if (last && last.center === c && last.band === b) last.to = r.date;
      else periods.push({ from: r.date, to: r.date, center: c, band: b });
    });
    if (!periods.length) return rows;
    periods[periods.length - 1].to = null;
    window.NBT_INFLATION_TARGETS = periods;
    if (!window.nbtTargetFor) window.nbtTargetFor = ym => periods.find(p => ym >= p.from && (p.to === null || ym <= p.to)) || null;
    return rows;
  }

  window.nbtLoadRows = async function (opts) {
    if (!rowsPromise) rowsPromise = fetchRows().then(applyTargets);
    const rows = await rowsPromise;
    if (!opts || !('defval' in opts)) return rows;
    const cols = new Set();
    rows.forEach(r => Object.keys(r).forEach(k => cols.add(k)));
    return rows.map(r => {
      const o = {};
      cols.forEach(c => { o[c] = c in r ? r[c] : opts.defval; });
      return o;
    });
  };

})();
