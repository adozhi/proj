// kumita_bmt: page script shared by other_links/kumita_bmt.html, ru/kumita_bmt_ru.html, eng/kumita_bmt_eng.html
const LANG = nbtPageLang();

const I18N = {
  tj: {
    months: ['январ','феврал','март','апрел','май','июн','июл','август','сентябр','октябр','ноябр','декабр'],
    next: 'Ҷаласаи навбатӣ', today: 'Имрӯз', days: n => `пас аз ${n} рӯз`,
    noNext: 'Санаҳои ҷаласаҳои навбатӣ ҳанӯз эълон нашудаанд',
    rate: 'Меъёри бозтамвил', since: d => `аз ${d}`, last: 'Қарори охирин',
    cut: 'паст карда шуд', hold: 'бетағйир', raise: 'баланд карда шуд', pp: 'б.ф.',
    done: 'Гузашт', upcoming: 'Навбатӣ', planned: 'Нақша', pending: 'интизор',
    prevYear: 'Соли гузашта', nextYear: 'Соли оянда', members: 'аъзои Кумита',
    meetingsIn: (n, y) => `${n} ҷаласа дар соли ${y}`,
  },
  ru: {
    months: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    next: 'Следующее заседание', today: 'Сегодня',
    days: n => `через ${n} ${n % 10 === 1 && n % 100 !== 11 ? 'день' : [2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100) ? 'дня' : 'дней'}`,
    noNext: 'Даты следующих заседаний пока не объявлены',
    rate: 'Ставка рефинансирования', since: d => `с ${d}`, last: 'Последнее решение',
    cut: 'снижена', hold: 'без изменений', raise: 'повышена', pp: 'п.п.',
    done: 'Прошло', upcoming: 'Следующее', planned: 'План', pending: 'ожидается',
    prevYear: 'Предыдущий год', nextYear: 'Следующий год', members: 'членов Комитета',
    meetingsIn: (n, y) => `заседаний в ${y} году: ${n}`,
  },
  en: {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    next: 'Next meeting', today: 'Today', days: n => `in ${n} day${n === 1 ? '' : 's'}`,
    noNext: 'Dates of the next meetings have not been announced yet',
    rate: 'Refinancing rate', since: d => `since ${d}`, last: 'Latest decision',
    cut: 'cut', hold: 'unchanged', raise: 'raised', pp: 'pp',
    done: 'Held', upcoming: 'Next', planned: 'Scheduled', pending: 'pending',
    prevYear: 'Previous year', nextYear: 'Next year', members: 'Committee members',
    meetingsIn: (n, y) => `${n} meetings in ${y}`,
  },
}[LANG];

const MEETINGS = nbtMeetings(LANG);                    // { year: [{ iso, date, summary, presentation, resolution, extra }] }
const ALL = [].concat(...Object.values(window.NBT_MEETINGS)).sort((a, b) => a.iso < b.iso ? -1 : 1);
const DOCS = document.getElementById('mpcDocNames').dataset;

const todayISO = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
const num = (v, d) => LANG === 'en' ? v.toFixed(d) : v.toFixed(d).replace('.', ',');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const longDate = iso => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${I18N.months[m - 1]} ${y}`; };

// what each meeting decided — shared with the charts page (data/meetings.js)
const outcome = (m, rate) => nbtDecision(m, rate);

function outcomeChip(o) {
  if (!o) return '';
  const value = o.kind === 'hold' ? I18N.hold : `${o.delta < 0 ? '−' : '+'}${num(Math.abs(o.delta), 2)} ${I18N.pp}`;
  return `<span class="mpc-chip mpc-chip--${o.kind}" title="${esc(I18N[o.kind])}">${o.kind === 'cut' ? '↓' : o.kind === 'raise' ? '↑' : '='} ${esc(value)}</span>`;
}

const ICON = {
  summary:      '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  presentation: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20l4-4 4 4"/>',
  resolution:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>',
};

function docLink(kind, doc) {
  const icon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[kind]}</svg>`;
  // href "" = the document exists, its address is filled in later; null = not published yet
  if (doc && doc.href != null) {
    return `<a class="mpc-docs__item" href="${doc.href}"${doc.href ? ' target="_blank" rel="noopener noreferrer"' : ''}>${icon}<span>${esc(DOCS[kind])}</span></a>`;
  }
  return `<span class="mpc-docs__item is-pending">${icon}<span>${esc(DOCS[kind])}</span><em>${esc(I18N.pending)}</em></span>`;
}

// ---------- the year strip ----------
const years = Object.keys(MEETINGS).sort();
const nextMeeting = ALL.find(m => m.iso >= todayISO) || null;
let year = nextMeeting ? nextMeeting.iso.slice(0, 4) : years[years.length - 1];
let RATE = {};

function renderRail() {
  const rail = document.getElementById('mpcRail');
  const list = MEETINGS[year] || [];
  rail.innerHTML = list.map(m => {
    const status = m.iso < todayISO ? 'done' : nextMeeting && m.iso === nextMeeting.iso ? 'upcoming' : 'planned';
    const [y, mo, d] = m.iso.split('-').map(Number);
    return `<li class="mpc-stop mpc-stop--${status}">
      <span class="mpc-stop__dot" aria-hidden="true"></span>
      <div class="mpc-stop__date"><b>${d}</b><span>${esc(I18N.months[mo - 1])}</span></div>
      <div class="mpc-stop__meta">
        <span class="mpc-stop__status">${esc(I18N[status])}</span>${m.extra ? `<span class="mpc-stop__extra">${esc(m.extra)}</span>` : ''}
      </div>
      ${outcomeChip(outcome(m, RATE))}
      <div class="mpc-docs">${docLink('summary', m.summary)}${docLink('presentation', m.presentation || m.summary)}${docLink('resolution', m.resolution)}</div>
    </li>`;
  }).join('');
  rail.style.setProperty('--stops', Math.max(list.length, 1));

  const i = years.indexOf(year);
  document.getElementById('mpcYear').innerHTML = `
    <button type="button" class="mpc-year__step" data-step="-1" aria-label="${esc(I18N.prevYear)}" ${i <= 0 ? 'disabled' : ''}>‹</button>
    <span class="mpc-year__value"><b>${year}</b><small>${esc(I18N.meetingsIn(list.length, year))}</small></span>
    <button type="button" class="mpc-year__step" data-step="1" aria-label="${esc(I18N.nextYear)}" ${i >= years.length - 1 ? 'disabled' : ''}>›</button>`;
}

document.getElementById('mpcYear').addEventListener('click', e => {
  const b = e.target.closest('.mpc-year__step');
  if (!b || b.disabled) return;
  const i = years.indexOf(year) + Number(b.dataset.step);
  if (years[i]) { year = years[i]; renderRail(); }
});

// ---------- hero: next meeting + current rate ----------
function renderHero(rates) {
  const next = document.getElementById('mpcNext');
  if (nextMeeting) {
    const days = Math.round((new Date(nextMeeting.iso) - new Date(todayISO)) / 86400000);
    const [y, mo, d] = nextMeeting.iso.split('-').map(Number);
    next.innerHTML = `
      <span class="mpc-hero__label">${esc(I18N.next)}</span>
      <span class="mpc-hero__day">${d}</span>
      <span class="mpc-hero__month">${esc(I18N.months[mo - 1])} ${y}</span>
      <span class="mpc-hero__count">${esc(days === 0 ? I18N.today : I18N.days(days))}</span>`;
  } else {
    next.innerHTML = `<span class="mpc-hero__label">${esc(I18N.next)}</span><span class="mpc-hero__none">${esc(I18N.noNext)}</span>`;
  }

  const months = Object.keys(rates).sort();
  if (!months.length) return;
  const current = rates[months[months.length - 1]];
  const past = ALL.filter(m => m.iso < todayISO);
  const lastMeeting = past[past.length - 1];
  const lastChange = [...past].reverse().find(m => { const o = outcome(m, rates); return o && o.kind !== 'hold'; });
  const sinceISO = lastChange ? (lastChange.effective || lastChange.iso) : null;
  document.getElementById('mpcRate').innerHTML = `
    <span class="mpc-hero__label">${esc(I18N.rate)}</span>
    <span class="mpc-hero__value">${num(current, 2)}<small>%</small></span>
    ${sinceISO ? `<span class="mpc-hero__since">${esc(I18N.since(longDate(sinceISO)))}</span>` : ''}
    ${lastMeeting ? `<span class="mpc-hero__last">${esc(I18N.last)} · ${lastMeeting.iso.split('-').reverse().join('.')} ${outcomeChip(outcome(lastMeeting, rates))}</span>` : ''}`;
}

document.getElementById('mpcCountLabel').textContent = I18N.members;
renderRail();
renderHero({});

nbtLoadRows().then(rows => {
  rows.forEach(r => { if (r.date && r.rate_eom != null) RATE[String(r.date).slice(0, 7)] = +r.rate_eom; });
  renderRail();
  renderHero(RATE);
}).catch(() => {});
