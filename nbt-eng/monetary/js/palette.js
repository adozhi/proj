// one place for chart colors, shared by the main page and all chart pages
window.NBT_COLORS = {
  inflation:        '#3b82f6',   // inflation line / monthly bars above zero
  inflationOverlay: '#c0504d',   // inflation drawn on top of another indicator
  deflation:        '#ef4444',   // monthly bars below zero
  rate:             '#1e40af',   // refinancing rate
  bonds:            '#22c55e',   // NBT securities
  interbank:        '#f59e0b',   // interbank loans
  target:           '#059669',   // inflation target band
  corridor:         '#94a3b8',   // overnight corridor bounds
  realrate:         '#0f766e',   // real refinancing rate
  food:             '#3b82f6',
  nonfood:          '#f59e0b',
  services:         '#22c55e',
  core:             '#8b5cf6',   // core inflation
  expect:           '#f59e0b',   // inflation expectations
  dollar:           '#6366f1',   // dollarization
  opDeposits:       '#0ea5e9',   // NBT deposit auctions
  heatUp:           '#c0504d',   // heatmap: prices up
  heatDown:         '#0d9488',   // heatmap: prices down
  m4: '#8b5cf6', m2: '#10b981', m1: '#3b82f6', m0: '#f59e0b',
};

// '#rrggbb' + alpha (0–1) -> 'rgba(...)'
window.nbtAlpha = function (hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};
