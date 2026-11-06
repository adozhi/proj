const LANG = nbtPageLang();

const I18N = {
  tj: { label: 'Ҳадафи таваррум', pp: 'б.ф.', now: (m, y) => `Таварруми солона, ${m} ${y}`, inBand: 'дар доираи ҳадаф', outBand: 'берун аз ҳадаф', band: 'ҳадаф',
        months: ['январ','феврал','март','апрел','май','июн','июл','август','сентябр','октябр','ноябр','декабр'] },
  ru: { label: 'Цель по инфляции', pp: 'п.п.', now: (m, y) => `Годовая инфляция, ${m} ${y}`, inBand: 'в пределах цели', outBand: 'вне цели', band: 'цель',
        months: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'] },
  en: { label: 'Inflation target', pp: 'pp', now: (m, y) => `Annual inflation, ${m} ${y}`, inBand: 'within target', outBand: 'outside target', band: 'target',
        months: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
}[LANG];

const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');

(function () {
  const hero = document.getElementById('goalHero');
  if (!hero) return;

  const lead = (document.querySelector('#goal .x-block__body p') || {}).textContent || '';

  function render(last) {
    const t = nbtTargetFor(last ? last.date : '9999-12') || window.NBT_INFLATION_TARGETS.slice(-1)[0];
    const [y, m] = last ? last.date.split('-').map(Number) : [null, null];
    const v = last ? +last.inflation_y : null;
    const inside = v != null && Math.abs(v - t.center) <= t.band;
    hero.innerHTML = `
      <div class="x-hero__main">
        <span class="x-hero__label">${I18N.label}</span>
        <span class="x-hero__big">${t.center}<small>%</small></span>
        <span class="x-hero__band">± ${t.band} ${I18N.pp}</span>
      </div>
      <div class="x-hero__side">
        ${last ? `<span class="x-hero__label">${I18N.now(I18N.months[m - 1], y)} — <b class="${inside ? 'is-in' : 'is-out'}">${num(v, 1)}%, ${inside ? I18N.inBand : I18N.outBand}</b></span>` : ''}
        <div class="x-hero__gauge"></div>
      </div>
      ${lead ? `<p class="x-hero__lead">${lead}</p>` : ''}`;
    nbtGauge(hero.querySelector('.x-hero__gauge'), {
      min: 0, max: 12, step: 2, band: [t.center - t.band, t.center + t.band], center: t.center, bandText: I18N.band,
      value: v, valueText: v != null ? num(v, 1) + '%' : '',
    });
    hero.querySelector('.gauge').classList.add('gauge--dark');
  }

  render(null);
  nbtLoadRows().then(rows => render(rows.filter(r => r.inflation_y != null).pop())).catch(() => {});
})();

(function () {
  const tl = document.querySelector('#previous .timeline');
  if (!tl) return;
  const W = { tj: n => `${n} сол омодагӣ`, ru: n => `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'год' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'года' : 'лет'} подготовки`, en: n => `${n} years of preparation` }[LANG];
  const steps = Array.from(tl.querySelectorAll('.timeline-step')).map((el, i) => {
    const m = (el.querySelector('.timeline-year') || {}).textContent.match(/(\d{4})(?:\s*[–-]\s*(\d{4}))?/);
    if (!m) return null;
    if (!el.id) el.id = 'stage-' + (i + 1);
    return { el, from: +m[1], to: +(m[2] || m[1]), years: m[0].replace('-', '–'), name: ((el.querySelector('.timeline-body > strong') || {}).textContent || '').replace(/&/g, '&amp;').replace(/</g, '&lt;') };
  }).filter(Boolean);
  if (steps.length < 2) return;
  const first = steps[0].from, last = steps[steps.length - 1].to, total = last - first + 1;
  const prepEnd = steps[steps.length - 2].to, prep = prepEnd - first + 1;
  const shades = ['#bfdbfe', '#60a5fa', '#2563eb', '#1e40af', '#1e3a8a'];
  const ruler = document.createElement('div');
  ruler.className = 'tl-ruler';
  ruler.innerHTML = `
    <div class="tl-ruler__brace" aria-hidden="true"><span style="width:calc(${prep / total * 100}% - 3px)"></span><b style="left:${prep / total * 50}%">${W(prep)}</b></div>
    <div class="tl-ruler__track">${steps.map((s, i) => {
      const final = i === steps.length - 1;
      return `<a class="tl-ruler__seg${final ? ' is-final' : ''}" href="#${s.el.id}" style="--n:${s.to - s.from + 1};--c:${final ? '#059669' : shades[Math.min(i, shades.length - 1)]}">
        <span class="tl-ruler__bar"></span><span class="tl-ruler__years">${s.years}</span><span class="tl-ruler__name">${s.name}</span></a>`;
    }).join('')}</div>`;
  tl.parentNode.insertBefore(ruler, tl);
})();
