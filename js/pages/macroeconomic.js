const LANG = nbtPageLang();

const I18N = {
  tj: {
    q1: "Январ-март",
    h1: "Январ-июн",
    m9: "Январ-сентябр",
    y: "Январ-декабр",
  },
  ru: {
    q1: "Январь-март",
    h1: "Январь-июнь",
    m9: "Январь-сентябрь",
    y: "Январь-декабрь",
  },
  en: {
    q1: "Jan–Mar",
    h1: "Jan–Jun",
    m9: "Jan–Sep",
    y: "Jan–Dec",
  },
}[LANG];

(function () {

  function fileHref(year, slug, ext) {
    return 'files/' + year + '-' + slug + '.' + ext;
  }

  var DATA = [
    { year: 2015, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2014, periods: [
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2013, periods: [
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
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
      { label: I18N.q1,    slug: "01-03" },
      { label: I18N.h1,     slug: "01-06" },
      { label: I18N.m9, slug: "01-09" },
      { label: I18N.y,  slug: "01-12" }
    ]},
    { year: 2007, periods: [
      { label: I18N.q1,   slug: "01-03" },
      { label: I18N.h1,    slug: "01-06" },
      { label: I18N.y, slug: "01-12" }
    ]}
  ];

  nbtRenderReports({
    archive: true,
    years: DATA.map(function (entry) {
      return {
        year: entry.year,
        items: entry.periods.map(function (p) {
          var name = nbtPeriodName[p.slug];
          return {
            end:   nbtPeriodEnd(p.slug),
            title: name || p.label,
            short: nbtPeriodShort[p.slug] || p.label.replace(/^.*[-–]/, '').slice(0, 3),
            sub:   name ? p.label : '',
            files: [{ type: 'pdf', href: fileHref(entry.year, p.slug, 'pdf') }],
          };
        }),
      };
    }),
  });
})();
