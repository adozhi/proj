window.NBT_COLORS = {
  inflation:        '#3b82f6',
  inflationOverlay: '#c0504d',
  deflation:        '#ef4444',
  rate:             '#1e40af',
  bonds:            '#22c55e',
  interbank:        '#f59e0b',
  target:           '#059669',
  corridor:         '#94a3b8',
  realrate:         '#0f766e',
  food:             '#3b82f6',
  nonfood:          '#f59e0b',
  services:         '#22c55e',
  core:             '#8b5cf6',
  expect:           '#f59e0b',
  dollar:           '#6366f1',
  opDeposits:       '#0ea5e9',
  heatUp:           '#c0504d',
  heatDown:         '#0d9488',
  m4: '#8b5cf6', m2: '#10b981', m1: '#3b82f6', m0: '#f59e0b',
};

window.nbtAlpha = function (hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};
