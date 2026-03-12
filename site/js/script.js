document.addEventListener('DOMContentLoaded', () => {
  const datasets = [
    {
      title: "Тағйирёбии сатҳи таваррум",
      type: "line",
      label: "Тағйирот CPI (%)",
      data: [3.6, 3.7, 3.4, 3.6, 3.8, 3.6, 3.5, 3.1, 2.8, 3.1, 3.2, 3.5, 3.6],
      labels: ["Янв 25", "Фев", "Мар", "Апр", "Май", "Июн", "Июл","Авг", "Сен", "Окт", "Ноя", "Дек", "Янв 26"],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.12)",
      tension: 0,
      pointRadius: 2,
      pointHoverRadius: 4,
      borderWidth: 2,
      fill: true,
      minY: 2.5,
      maxY: 4.0,
      stepSize: 0.5
    },
    {
      title: "Тағйирёбии меъёри бозтамвил",
      type: "line",
      label: "Меъёри бозтамвил (%)",
      data: [9.00, 8.75, 8.75, 8.75, 8.25, 8.25, 8.25, 7.75, 7.75, 7.75, 7.75, 7.75, 7.50],
      labels: ["Янв 25", "Фев", "Мар", "Апр", "Май", "Июн", "Июл","Авг", "Сен", "Окт", "Ноя", "Дек", "Янв 26"],
      borderColor: "#64748b",
      borderDash: [4, 3],
      tension: 0,
      pointRadius: 2,
      borderWidth: 2,
      fill: false,
      minY: 7.0,
      maxY: 9.5,
      stepSize: 0.25
    },
        {
      title: "Фоизи қоғазҳои қиматноки БМТ",
      type: "line",
      label: "Тағйирот (%)",
      data: [5.06, 4.82, 3.70, 4.74, 4.20, 5.56, 6.50, 6.17, 7.04, 7.49, 7.45, 7.28, 6.65],
      labels: ["Янв 25", "Фев", "Мар", "Апр", "Май", "Июн", "Июл","Авг", "Сен", "Окт", "Ноя", "Дек", "Янв 26"],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.12)",
      tension: 0,
      pointRadius: 2,
      pointHoverRadius: 4,
      borderWidth: 2,
      fill: true,
      minY: 2.5,
      maxY: 4.0,
      stepSize: 0.5
    },
        {
      title: "Фоизи қарзҳои байнибонкӣ",
      type: "line",
      label: "Тағйирот CPI (%)",
      data: [8.68, 9.83, 9.44, 9.62, 8.47, 8.83, 8.40, 8.26, 8.61, 8.79, 8.53, 9.54, 8.14],
      labels: ["Янв 25", "Фев", "Мар", "Апр", "Май", "Июн", "Июл","Авг", "Сен", "Окт", "Ноя", "Дек", "Янв 26"],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.12)",
      tension: 0,
      pointRadius: 2,
      pointHoverRadius: 4,
      borderWidth: 2,
      fill: true,
      minY: 2.5,
      maxY: 4.0,
      stepSize: 0.5
    }
  ];

  let currentSlide = 0;
  const canvas = document.getElementById('chartCanvas');
  if (!canvas) {
    console.error("Canvas элемент не найден!");
    return;
  }
  const ctx = canvas.getContext('2d');
  let chart;
  let autoSlideInterval;

  function createChart(index) {
    if (chart) chart.destroy();
    const ds = datasets[index];

    chart = new Chart(ctx, {
      type: ds.type,
      data: {
        labels: ds.labels,
        datasets: [{
          label: ds.label,
          data: ds.data,
          borderColor: ds.borderColor,
          backgroundColor: ds.backgroundColor,
          fill: ds.fill ?? false,
          tension: ds.tension ?? 0,
          pointRadius: ds.pointRadius ?? 0,
          pointHoverRadius: ds.pointHoverRadius ?? 0,
          borderWidth: ds.borderWidth ?? 2,
          borderDash: ds.borderDash ?? []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: { label: ctx => `${ctx.parsed.y.toFixed(2)}%` }
          }
        },
        scales: {
          y: {
            ticks: { callback: v => v + '%', font: { size: 12 }, padding: 8 },
            grid: { color: '#e0e0e0' },
            beginAtZero: false
          },
          x: {
            ticks: { font: { size: 12 }, padding: 8 },
            grid: { display: false }
          }
        }
      }
    });

    const titleEl = document.getElementById('chartTitle');
    if (titleEl) titleEl.textContent = ds.title;
  }

  function showSlide(n) {
    currentSlide = (n + datasets.length) % datasets.length;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    createChart(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  document.querySelectorAll('.dot').forEach(dot => {
    dot.onclick = () => {
      clearInterval(autoSlideInterval);
      showSlide(Number(dot.dataset.index));
      startAutoSlide();
    };
  });

  showSlide(0);
  startAutoSlide();
});




