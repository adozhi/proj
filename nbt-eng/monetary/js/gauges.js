// Small horizontal scales shared by several pages (no chart library needed).
//
//   nbtGauge(host, { min, max, band: [lo, hi], center, value, valueText, bandText, step, unit })
//
// draws: the scale, a highlighted band (target or corridor), a thin line at `center`
// and a marker with a label at `value`. Colors come from the surrounding element:
// put it inside a dark panel and add class "gauge--dark".
(function () {
  const pct = (v, min, max) => ((Math.min(max, Math.max(min, v)) - min) / (max - min) * 100).toFixed(2) + '%';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  window.nbtGauge = function (host, o) {
    if (!host) return;
    const step = o.step || 1, unit = o.unit == null ? '%' : o.unit;
    const ticks = [];
    for (let v = o.min; v <= o.max + 1e-9; v += step) ticks.push(`<span class="gauge__tick" style="--x:${pct(v, o.min, o.max)}">${+v.toFixed(2)}${unit}</span>`);
    const inBand = o.band && o.value != null && o.value >= o.band[0] && o.value <= o.band[1];
    host.innerHTML = `
      <div class="gauge${inBand ? ' gauge--in' : o.value != null ? ' gauge--out' : ''}">
        <div class="gauge__track">
          ${o.band ? `<span class="gauge__band" style="--a:${pct(o.band[0], o.min, o.max)};--b:${pct(o.band[1], o.min, o.max)}">${o.bandText ? `<em>${esc(o.bandText)}</em>` : ''}</span>` : ''}
          ${o.center != null ? `<span class="gauge__center" style="--x:${pct(o.center, o.min, o.max)}"></span>` : ''}
          ${o.value != null ? `<span class="gauge__marker" style="--x:${pct(o.value, o.min, o.max)}"><b>${esc(o.valueText || o.value)}</b></span>` : ''}
        </div>
        <div class="gauge__ticks">${ticks.join('')}</div>
      </div>`;
  };
})();
