// Current values written into the page text from data/data.json (data.xlsx), so the text never goes stale.
// Mark a number in the HTML and keep the old value inside as a fallback:
//   <span data-nbt="rate" data-dec="2">7,00</span>%           refinancing rate (last rate_eom)
//   <span data-nbt="rate-up">10,00</span>, data-nbt="rate-down"  corridor bounds: rate ± 3
//   <span data-nbt="rate-since">02 февраля 2026</span>        the day the current rate took effect (data/meetings.js)
//   <span data-nbt="target-center">5</span>, "target-band"     inflation target (columns target / target_band)
//   <span data-nbt="year">2026</span>                         year of the latest data month
// data-dec sets decimals (default: as many as the fallback text has). Needs js/data.js; data/meetings.js is optional.
(function () {
  if (!window.nbtLoadRows) return;
  const lang = () => {
    const l = ((window.NBT_EMBED && window.NBT_EMBED.lang) || document.documentElement.lang || '').slice(0, 2);
    return l === 'en' ? 'en' : l === 'ru' ? 'ru' : 'tj';
  };
  const MONTHS = {
    tj: ['январи','феврали','марти','апрели','майи','июни','июли','августи','сентябри','октябри','ноябри','декабри'],
    ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  };
  const fmt = (v, d) => { const s = (+v).toFixed(d); return lang() === 'en' ? s : s.replace('.', ','); };
  const decOf = el => el.dataset.dec != null ? +el.dataset.dec
    : (el.dataset.fallback || el.textContent).includes(',') || (el.dataset.fallback || el.textContent).includes('.')
      ? (el.dataset.fallback || el.textContent).trim().split(/[.,]/)[1].length : 0;

  let values = null;

  function compute(rows) {
    const rates = rows.filter(r => r.rate_eom != null);
    const last = rows[rows.length - 1];
    const v = {};
    if (rates.length) {
      const cur = +rates[rates.length - 1].rate_eom;
      let k = rates.length - 1;
      while (k > 0 && Math.abs(+rates[k - 1].rate_eom - cur) < 1e-4) k--;
      const [y, m] = rates[k].date.split('-').map(Number);
      const day = window.nbtRateEffectiveDay ? window.nbtRateEffectiveDay(y, m) : null;
      v.rate = cur; v['rate-up'] = cur + 3; v['rate-down'] = cur - 3;
      v['rate-since'] = () => {
        const L = lang(), dd = day ? String(day).padStart(2, '0') + ' ' : '';
        return L === 'tj' ? `${dd}${MONTHS.tj[m - 1]} соли ${y}` : `${dd}${MONTHS[L][m - 1]} ${y}`;
      };
    }
    const t = last && window.nbtTargetFor ? nbtTargetFor(last.date) : null;
    if (t) { v['target-center'] = t.center; v['target-band'] = t.band; }
    if (last) v.year = +last.date.slice(0, 4);
    return v;
  }

  function fill() {
    if (!values) return;
    document.querySelectorAll('[data-nbt]').forEach(el => {
      const k = el.dataset.nbt;
      if (!(k in values)) return;
      if (el.dataset.fallback == null) el.dataset.fallback = el.textContent;
      const val = values[k];
      const text = typeof val === 'function' ? val() : k === 'year' ? String(val) : fmt(val, decOf(el));
      if (el.textContent !== text) el.textContent = text;
    });
  }

  nbtLoadRows().then(rows => { values = compute(rows); fill(); }).catch(() => {});
  // the main page switches language without reloading
  if (window.MutationObserver) new MutationObserver(fill).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.nbtFillLiveValues = fill;
})();
