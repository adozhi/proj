const LANG = nbtPageLang();

const I18N = {
  tj: {
    months: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
  },
  ru: {
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  },
  en: {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
}[LANG];

(function () {

  function fileHref(year, month, ext) {
    var mm = month < 10 ? '0' + month : '' + month;
    return 'files/' + year + '-' + mm + '.' + ext;
  }

  var FIRST_YEAR  = 2016;
  var FIRST_MONTH = 9;

  var now   = new Date();
  var lastY = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  var lastM = now.getMonth() === 0 ? 12 : now.getMonth();

  var years = [];
  for (var year = lastY; year >= FIRST_YEAR; year--) {
    var items = [];
    var mStart = year === FIRST_YEAR ? FIRST_MONTH : 1;
    var mEnd   = year === lastY ? lastM : 12;
    for (var m = mStart; m <= mEnd; m++) {
      items.push({
        end:   m,
        title: I18N.months[m - 1],
        files: [
          { type: 'pdf',  href: fileHref(year, m, 'pdf') },
          { type: 'xlsx', href: fileHref(year, m, 'xlsx') },
        ],
      });
    }
    years.push({ year: year, items: items });
  }

  nbtRenderReports({ years: years });
})();
