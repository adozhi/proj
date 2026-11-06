// Inflation target of the National Bank of Tajikistan by period: center ± band, percent.
// Used by the inflation page and the charts page.
window.NBT_INFLATION_TARGETS = [
  { from: '2017-08', to: '2017-12', center: 7, band: 3 },
  { from: '2018-01', to: '2019-12', center: 7, band: 2 },
  { from: '2020-01', to: '2024-12', center: 6, band: 2 },
  { from: '2025-01', to: null,      center: 5, band: 2 },
];

// target in force in a given month ('YYYY-MM'), or null before inflation targeting
window.nbtTargetFor = function (ym) {
  return window.NBT_INFLATION_TARGETS.find(p => ym >= p.from && (p.to === null || ym <= p.to)) || null;
};
