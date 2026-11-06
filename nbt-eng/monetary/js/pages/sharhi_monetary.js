// sharhi_monetary: page script shared by other_links/sharhi_monetary.html, ru/sharhi_monetary_ru.html, eng/sharhi_monetary_eng.html
const LANG = nbtPageLang();

const I18N = {
  tj: {
    q1: "Январ-март",
    h1: "Январ-июн",
    m9: "Январ-сентябр",
    y: "Январ-декабр",
    jan: "Январ",
    m5: "Январ-май",
    m4: "Январ-апрел",
    m7: "Январ-июл",
    m11: "Январ-ноябр",
  },
  ru: {
    q1: "Январь-март",
    h1: "Январь-июнь",
    m9: "Январь-сентябрь",
    y: "Январь-декабрь",
    jan: "Январь",
    m5: "Январь-май",
    m4: "Январь-апрель",
    m7: "Январь-июль",
    m11: "Январь-ноябрь",
  },
  en: {
    q1: "Jan–Mar",
    h1: "Jan–Jun",
    m9: "Jan–Sep",
    y: "Jan–Dec",
    jan: "January",
    m5: "Jan–May",
    m4: "Jan–Apr",
    m7: "Jan–Jul",
    m11: "Jan–Nov",
  },
}[LANG];

(function () {

  // ===== file addresses — edit here =====
  function fileHref(year, slug, ext) {
    return 'files/' + year + '-' + slug + '.' + ext;
  }
  // =======================================

  var DATA = [
    { year: 2025, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2024, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2023, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2022, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2021, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2020, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2019, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2018, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2017, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2016, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2015, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2014, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2013, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2012, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2011, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2010, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2009, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2008, periods: [
      { label: I18N.jan,         slug: "01"    },
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2007, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.m5,     slug: "01-05" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2006, periods: [
      { label: I18N.jan,         slug: "01"    },
      { label: I18N.m4,   slug: "01-04" },
      { label: I18N.m5,     slug: "01-05" },
      { label: I18N.m7,     slug: "01-07" },
      { label: I18N.m11,   slug: "01-11" },
      { label: I18N.y,  slug: "01-12" }
    ]}
  ];

  nbtRenderReports({
    archive: false,
    years: DATA.map(function (entry) {
      return {
        year: entry.year,
        items: entry.periods.map(function (p) {
          var name = nbtPeriodName[p.slug];
          return {
            end:   nbtPeriodEnd(p.slug),      // calendar column: the month the period ends
            title: name || p.label,           // "I квартал", or the label for non-standard periods
            short: nbtPeriodShort[p.slug] || p.label.replace(/^.*[-–]/, '').slice(0, 3),
            sub:   name ? p.label : '',       // "январь–март"
            files: [{ type: 'pdf', href: fileHref(entry.year, p.slug, 'pdf') }],
          };
        }),
      };
    }),
  });
})();
