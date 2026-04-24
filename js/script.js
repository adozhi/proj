document.addEventListener('DOMContentLoaded', () => {

  let currentSlide = 0;
  let currentLang = localStorage.getItem("lang") || "tj";
  let chart;

  // LANG SYSTEM 
  const LANGS = {
    tj: {
      menu_policy: "Сиёсати пулӣ",
      menu_goal: "Мақсад ва вазифаҳо",
      menu_tools: "Фишангҳо",
      menu_committee: "Кумита",
      menu_strategy: "Стратегия",

      menu_reports: "Шарҳ ва интишорот",
      menu_report_monthly_inflation: "Шарҳи моҳонаи таваррум",
      menu_report_monetary: "Шарҳи монетарӣ",
      menu_report_macro: "Шарҳи макроиқтисодӣ",
      menu_report_inflation: "Шарҳи таваррум",

      rate_title: "Меъёри бозтамвил",
      rate_date: "(аз 02 феврали соли 2026)",
      next_meeting: "Ҷаласаи навбатии Кумита: 30.04.2026",

      inflation_title: "Таварруми солона",
      inflation_month: "(Март 2026)",
      inflation_target: "Ҳадафи таваррум: 5% (±2 б.ф.)",

      chart_title: 
        "Тағйирёбии сатҳи таваррум",

      charts: [
        "Тағйирёбии сатҳи таваррум",
        "Меъёри бозтамвил",
        "Фоизи қоғазҳои қиматноки БМТ",
        "Фоизи қарзҳои байнибонкӣ"
      ],

      months: ["Мар 25","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек","Янв 26","Фев","Мар 26"]
    },

    ru: {
      menu_policy: "Монетарная политика",
      menu_goal: "Цели и задачи",
      menu_tools: "Инструменты",
      menu_committee: "Комитет",
      menu_strategy: "Стратегия",

      menu_reports: "Отчёты и публикации",
      menu_report_monthly_inflation: "Ежемесячный обзор инфляции",
      menu_report_monetary: "Монетарный обзор",
      menu_report_macro: "Макроэкономический обзор",
      menu_report_inflation: "Обзор инфляции",

      rate_title: "Ставка рефинансирования",
      rate_date: "(с 02 февраля 2026)",
      next_meeting: "Следующее заседание: 30.04.2026",

      inflation_title: "Годовая инфляция",
      inflation_month: "(Март 2026)",
      inflation_target: "Цель инфляции: 5% (±2 п.п.)",

      chart_title: "Изменение уровня инфляции",

      charts: [
        "Изменение уровня инфляции",
        "Ставка рефинансирования",
        "Проценты по ценным бумагам НБТ",
        "Проценты по межбанковским кредитам"
      ],

      months: ["Мар 25","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек","Янв 26","Фев","Мар 26"]
    },

    en: {
      menu_policy: "Monetary Policy",
      menu_goal: "Goals & Objectives",
      menu_tools: "Tools",
      menu_committee: "Committee",
      menu_strategy: "Strategy",

      menu_reports: "Reports & Publications",
      menu_report_monthly_inflation: "Monthly Inflation Report",
      menu_report_monetary: "Monetary Review",
      menu_report_macro: "Macroeconomic Review",
      menu_report_inflation: "Inflation Report",

      rate_title: "Refinancing Rate",
      rate_date: "(from 02 Feb 2026)",
      next_meeting: "Next meeting: 30.04.2026",

      inflation_title: "Annual Inflation",
      inflation_month: "(March 2026)",
      inflation_target: "Inflation target: 5% (±2 pp)",

      chart_title: "Inflation Dynamics",

      charts: [
        "Change in the inflation rate",
        "Refinancing Rate",
        "Interest on NBT securities",
        "Interest rates on interbank loans"
      ],

      months: ["Mar 25","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan 26","Feb","Mar 26"]
    }
  };

  //
  const datasets = [
    {
      labelKey: 0,
      data: [3.4, 3.6, 3.8, 3.6, 3.5, 3.1, 2.8, 3.1, 3.2, 3.5, 3.6, 3.7, 3.4],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.12)",
      fill: true
    },
    {
      labelKey: 1,
      data: [8.75, 8.75, 8.3145, 8.25, 8.25, 7.7984, 7.75, 7.75, 7.5167, 7.5, 7.5, 7.5, 7.5],
      borderColor:"#64748b",
      borderDash:[4,3],
      fill: false
    },
    {
      labelKey: 2,
      data:[3.70,4.74,4.2,5.56,6.5,6.17,7.04,7.49,7.45,7.28,6.71,6.45,6.09],
      borderColor:"#3b82f6",
      backgroundColor:"rgba(59,130,246,0.12)",
      fill:true
    },
    {
      labelKey: 3,
      data:[9.4, 9.6, 8.5, 8.8, 8.4, 8.3, 8.6, 8.8, 8.5, 9.5, 8.1, 9.5, 8.5],
      borderColor:"#3b82f6",
      backgroundColor:"rgba(59,130,246,0.12)",
      fill:true
    }
  ];

  const ctx = document.getElementById('chartCanvas').getContext('2d');

  // CHART
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: LANGS[currentLang].months,
      datasets: [{
        label: LANGS[currentLang].charts[0],
        data: datasets[0].data,
        borderColor: datasets[0].borderColor,
        backgroundColor: datasets[0].backgroundColor,
        fill: datasets[0].fill,
        tension: 0.3,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: ctx => `${ctx.parsed.y.toFixed(2)}%`
          }
        }
      },
      scales: {
        y: { ticks: { callback: v => v+'%', font:{size:12}, padding:8 }, grid:{color:'#e0e0e0'} },
        x: { ticks:{font:{size:12}, padding:8}, grid:{display:false} }
      }
    }
  });



  // UPDATE CHART
function updateChart(i){
  const d = datasets[i];

  chart.data.labels = [...LANGS[currentLang].months];

  chart.data.datasets[0].label = LANGS[currentLang].charts[d.labelKey];
  chart.data.datasets[0].data = d.data;
  chart.data.datasets[0].borderColor = d.borderColor;
  chart.data.datasets[0].backgroundColor = d.backgroundColor;
  chart.data.datasets[0].fill = d.fill;
  chart.data.datasets[0].borderDash = d.borderDash || [];

  //  фиксированный диапазон
  let yMin = 0;
  let yMax = 10;

  switch(d.labelKey){
    case 0: yMin = 0; yMax = 7; break;
    case 1: yMin = 5; yMax = 10; break;
    case 2: yMin = 0; yMax = 10; break;
    case 3: yMin = 4; yMax = 12; break;
  }

  // 
  chart.options.scales.y = {
    min: yMin,
    max: yMax,
    ticks: {
      callback: v => v + '%',
      font: { size: 12 },
      padding: 8
    },
    grid: { color: '#e0e0e0' }
  };

  chart.update();

  document.getElementById("chartTitle").textContent =
    LANGS[currentLang].charts[d.labelKey];
}
  // SLIDER
  function showSlide(n){
    currentSlide = (n + datasets.length) % datasets.length;
    updateChart(currentSlide);

    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => showSlide(Number(dot.dataset.index)));
  });

  showSlide(0);
  setInterval(() => showSlide(currentSlide + 1), 10000);

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (LANGS[lang]?.[key]) el.textContent = LANGS[lang][key];
  });

  if (typeof updateChart === "function") {
    updateChart(currentSlide);
  }
}

function highlightActiveLang(lang) {
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    if (btn.getAttribute('onclick').includes(`'${lang}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

window.setLang = function(lang) {
  if (!LANGS[lang]) return;

  document.body.classList.add("lang-fade");

  setTimeout(() => {
    applyLanguage(lang);
    highlightActiveLang(lang);
    updateLinks(lang); 

    document.body.classList.remove("lang-fade");
  }, 120);
};


function initLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get('lang');

  if (langFromUrl && LANGS[langFromUrl]) {
    currentLang = langFromUrl;
    localStorage.setItem("lang", langFromUrl);
  } else {
    currentLang = localStorage.getItem("lang") || "tj";
  }

  applyLanguage(currentLang);
  highlightActiveLang(currentLang);
  // handleNavLinks();
  updateLinks(currentLang);
}
function updateLinks(lang) {
  document.querySelectorAll(".nav-link").forEach(link => {
    let href = link.getAttribute("href");
    if (!href || href === "#") return;

    let file = href.split("/").pop();


    file = file.replace("_ru", "").replace("_eng", "");

    if (lang === "tj") {
      link.href = "other_links/" + file;
    }

    if (lang === "ru") {
      link.href = "ru/" + file.replace(".html", "_ru.html");
    }

    if (lang === "en") {
      link.href = "eng/" + file.replace(".html", "_eng.html");
    }
  });
}

initLanguage();
});

