// samtho: page script shared by other_links/samtho.html, ru/samtho_ru.html, eng/samtho_eng.html
// The documents as a bookshelf: the current year as a cover, earlier years as spines on decade shelves.
const LANG = nbtPageLang();

const I18N = {
  tj: { current: y => `Барои соли ${y}`, shelf: (a, b) => `${a}–${b}`, open: 'Кушодан (PDF)', archive: 'Бойгонӣ' },
  ru: { current: y => `На ${y} год`, shelf: (a, b) => `${a}–${b}`, open: 'Открыть (PDF)', archive: 'Архив' },
  en: { current: y => `For ${y}`, shelf: (a, b) => `${a}–${b}`, open: 'Open (PDF)', archive: 'Archive' },
}[LANG];

(function () {
  // ===== file addresses — edit here =====
  function fileHref(year) { return 'files/' + year + '.pdf'; }
  // =======================================
  var FIRST = 2003, CURRENT = 2026;

  var host = document.getElementById('doc-grid');
  if (!host) return;
  var title = (document.querySelector('.page-title') || {}).textContent || '';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var SHADES = ['#0f172a', '#1e3a5f', '#1e40af', '#334155', '#172554'];

  var cover =
    '<a class="sh-cover" href="' + fileHref(CURRENT) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(title + ', ' + CURRENT + ' — ' + I18N.open) + '">' +
      '<span class="sh-cover__name">' + esc(title) + '</span>' +
      '<span class="sh-cover__year">' + CURRENT + '</span>' +
      '<span class="sh-cover__for">' + esc(I18N.current(CURRENT)) + '</span>' +
    '</a>';

  // decade shelves, newest first
  var shelves = [];
  for (var d = Math.floor((CURRENT - 1) / 10) * 10; d >= Math.floor(FIRST / 10) * 10; d -= 10) {
    var years = [];
    for (var y = Math.min(d + 9, CURRENT - 1); y >= Math.max(d, FIRST); y--) years.push(y);
    if (!years.length) continue;
    shelves.push(
      '<div class="sh-shelf">' +
        '<span class="sh-shelf__label">' + I18N.shelf(years[years.length - 1], years[0]) + '</span>' +
        '<div class="sh-shelf__books">' + years.map(function (y) {
          var h = 172, c = SHADES[y % SHADES.length];   // same height for every year; only the shade varies
          return '<a class="sh-book" href="' + fileHref(y) + '" target="_blank" rel="noopener noreferrer" style="--h:' + h + 'px;--c:' + c + '" ' +
                 'title="' + esc(title + ', ' + y) + '" aria-label="' + esc(title + ', ' + y + ' — ' + I18N.open) + '"><span>' + y + '</span></a>';
        }).join('') + '</div>' +
      '</div>');
  }

  host.className = 'sh';
  host.innerHTML = cover + '<div class="sh-archive"><span class="sh-archive__label">' + esc(I18N.archive) + '</span>' + shelves.join('') + '</div>';
})();
