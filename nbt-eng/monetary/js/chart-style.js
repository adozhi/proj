// Two additions for every Chart.js chart on the site (load with `defer` right after chart.umd.min.js):
//  - the latest value of each line is written at its end, in the line's colour (no hovering needed);
//  - navy tooltips in the colours of the page header.
// A chart can switch the end labels off with options.plugins.endLabel = false,
// or set { suffix: ' п.п.', decimals: 2 }; a dataset with endLabel: false is skipped.
(function () {
  if (!window.Chart) return;
  const D = Chart.defaults;
  Object.assign(D.plugins.tooltip, {
    backgroundColor: 'rgba(15,23,42,0.94)', titleColor: '#fff', bodyColor: 'rgba(255,255,255,0.86)',
    borderColor: 'rgba(147,197,253,0.35)', borderWidth: 1, cornerRadius: 10, padding: { x: 12, y: 10 },
    titleFont: { weight: '700', size: 12 }, bodyFont: { size: 12 }, boxPadding: 5, usePointStyle: true,
  });
  const isEn = () => ((window.NBT_EMBED && window.NBT_EMBED.lang) || document.documentElement.lang || '').slice(0, 2) === 'en';
  const fmt = (v, d) => { const s = v.toFixed(d).replace('-', '−'); return isEn() ? s : s.replace('.', ','); };

  Chart.register({
    id: 'endLabel',
    afterDatasetsDraw(chart) {
      const opt = chart.options.plugins && chart.options.plugins.endLabel;
      if (opt === false || (opt && opt.display === false)) return;
      const { ctx, chartArea: area } = chart;
      if (!area) return;
      const labels = [];
      chart.data.datasets.forEach((ds, i) => {
        const meta = chart.getDatasetMeta(i);
        const type = ds.type || chart.config.type;
        if (meta.hidden || ds.hidden || ds.endLabel === false || !ds.label || String(ds.label).startsWith('_') || type !== 'line' || ds.fill === '+1' || ds.fill === '-1' || ds.showLine === false) return;
        let j = ds.data.length - 1;
        while (j >= 0 && (ds.data[j] == null || (typeof ds.data[j] === 'object' && ds.data[j].y == null))) j--;
        if (j < 0 || !meta.data[j]) return;
        const v = typeof ds.data[j] === 'object' ? ds.data[j].y : ds.data[j];
        const d = (opt && opt.decimals != null) ? opt.decimals : Math.abs(v) >= 100 ? 0 : 1;
        const color = typeof ds.borderColor === 'string' ? ds.borderColor : '#1e3a5f';
        labels.push({ x: meta.data[j].x, y: meta.data[j].y, text: fmt(v, d) + ((opt && opt.suffix != null) ? opt.suffix : '%'), color });
      });
      if (!labels.length) return;
      ctx.save();
      ctx.font = '700 11px Inter, system-ui, sans-serif';
      // stack labels that would overlap
      labels.sort((a, b) => a.y - b.y);
      for (let k = 1; k < labels.length; k++) if (labels[k].y - labels[k - 1].y < 18) labels[k].y = labels[k - 1].y + 18;
      labels.forEach(l => {
        const w = ctx.measureText(l.text).width + 12, h = 18;
        let x = Math.min(l.x + 6, area.right + 44 - w);
        const y = Math.max(area.top + h / 2, Math.min(area.bottom - h / 2, l.y));
        ctx.fillStyle = l.color;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y - h / 2, w, h, 9); else ctx.rect(x, y - h / 2, w, h);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle';
        ctx.fillText(l.text, x + 6, y + 0.5);
      });
      ctx.restore();
    },
  });
  // room on the right for the end labels
  D.layout.padding = Object.assign({}, D.layout.padding, { right: 48 });
})();
