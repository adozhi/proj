// shahri-tav: page script shared by other_links/shahri-tav.html, ru/shahri-tav_ru.html, eng/shahri-tav_eng.html
const LANG = nbtPageLang();

const I18N = {
  tj: {
    halfI: "Нимсолаи I",
    annual: "Солона",
    half: "Нимсола",
  },
  ru: {
    halfI: "I полугодие",
    annual: "Годовой",
    half: "Полугодие",
  },
  en: {
    halfI: "H1",
    annual: "Annual",
    half: "H1",
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
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2024, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2023, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2022, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2021, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2020, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2019, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2018, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2017, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2016, periods: [
      { label: I18N.annual, slug: "annual" }
    ]},
    { year: 2015, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2014, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2013, periods: [
      { label: I18N.halfI, slug: "H1"     },
      { label: I18N.annual,     slug: "annual" }
    ]},
    { year: 2012, periods: [
      { label: I18N.half, slug: "H1"     },
      { label: I18N.annual,  slug: "annual" }
    ]},
    { year: 2011, periods: [
      { label: I18N.half, slug: "H1"     },
      { label: I18N.annual,  slug: "annual" }
    ]},
    { year: 2010, periods: [
      { label: I18N.half, slug: "H1"     },
      { label: I18N.annual,  slug: "annual" }
    ]},
    { year: 2009, periods: [
      { label: I18N.annual, slug: "annual" }
    ]}
  ];

  nbtRenderReports({
    years: DATA.map(function (entry) {
      return {
        year: entry.year,
        items: entry.periods.map(function (p) {
          return {
            end:   p.slug === 'H1' ? 6 : 12,  // calendar column: half-year issues in June, annual in December
            title: p.label,
            short: p.slug === 'H1' ? (LANG === 'en' ? 'H1' : LANG === 'ru' ? '6 мес' : '6 моҳ') : (LANG === 'en' ? 'FY' : LANG === 'ru' ? 'Год' : 'Сол'),
            files: [
              { type: 'pdf',  href: fileHref(entry.year, p.slug, 'pdf') },
              { type: 'xlsx', href: fileHref(entry.year, p.slug, 'xlsx') },
            ],
          };
        }),
      };
    }),
  });
})();
