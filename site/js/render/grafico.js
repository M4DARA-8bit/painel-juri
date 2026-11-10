/* grafico.js — gráficos Chart.js com paleta e tema do site. Expõe R.grafico*. */
(function (global) {
  'use strict';
  var R = global.R = global.R || {}, U = global.U;
  var vivos = [];

  function cssVar(n) {
    return getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  }
  function paleta() {
    return ['--c1', '--c2', '--c3', '--c4', '--c5', '--c6', '--c7', '--c8'].map(cssVar);
  }
  /** Série categórica: cor por posição, repetindo a paleta quando passa de 8. */
  function cores(n) {
    var p = paleta(), out = [];
    for (var i = 0; i < n; i++) out.push(p[i % p.length]);
    return out;
  }

  /** Destrói os gráficos de uma aba antes de redesenhar, senão o Chart.js vaza canvas. */
  function destroi(dentroDe) {
    vivos = vivos.filter(function (c) {
      if (!dentroDe || (c.canvas && dentroDe.contains(c.canvas))) { c.destroy(); return false; }
      return true;
    });
  }

  function base(tipo, dados, ops) {
    var tx = cssVar('--text-soft'), grade = cssVar('--border'), fundo = cssVar('--surface');
    var comum = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320 },
      plugins: {
        legend: { labels: { color: tx, font: { size: 12 }, boxWidth: 12, usePointStyle: true } },
        tooltip: {
          backgroundColor: fundo, titleColor: cssVar('--text'), bodyColor: tx,
          borderColor: grade, borderWidth: 1, padding: 10, displayColors: true
        }
      },
      scales: {
        x: { ticks: { color: tx, font: { size: 11 } }, grid: { color: grade, drawTicks: false }, border: { color: grade } },
        y: { ticks: { color: tx, font: { size: 11 } }, grid: { color: grade, drawTicks: false }, border: { color: grade }, beginAtZero: true }
      }
    };
    return { type: tipo, data: dados, options: fundir(comum, ops || {}) };
  }

  function fundir(a, b) {
    var o = {}, k;
    for (k in a) o[k] = a[k];
    for (k in b) {
      o[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object')
        ? fundir(a[k], b[k]) : b[k];
    }
    return o;
  }

  function tela(alta) {
    var d = R.el('div', 'tela' + (alta ? ' alta' : ''));
    d.appendChild(R.el('canvas'));
    return d;
  }
  function pinta(div, cfg) {
    var cv = div.querySelector('canvas');
    // Chart.js precisa do canvas já no documento para medir; a pintura fica para o próximo frame
    requestAnimationFrame(function () {
      if (!document.body.contains(cv)) return;
      vivos.push(new Chart(cv.getContext('2d'), cfg));
    });
    return div;
  }

  /** Barras verticais (série temporal, contagem por mês). */
  function barras(rotulos, valores, ops) {
    ops = ops || {};
    var d = tela(ops.alta);
    return pinta(d, base('bar', {
      labels: rotulos,
      datasets: [{
        label: ops.titulo || 'Quantidade', data: valores,
        backgroundColor: ops.cor || cssVar('--c1'), borderRadius: 3, maxBarThickness: 54
      }]
    }, fundir({
      plugins: { legend: { display: false } },
      scales: { y: { ticks: { callback: function (v) { return ops.moeda ? U.moedaCurta(v) : U.inteiro(v); } } } }
    }, ops.extra || {})));
  }

  /** Barras horizontais (ranking). */
  function barrasH(rotulos, valores, ops) {
    ops = ops || {};
    var d = tela(ops.alta);
    return pinta(d, base('bar', {
      labels: rotulos,
      datasets: [{
        label: ops.titulo || 'Quantidade', data: valores,
        backgroundColor: ops.multicor ? cores(valores.length) : (ops.cor || cssVar('--c1')),
        borderRadius: 3
      }]
    }, fundir({
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: function (c) { return ops.moeda ? U.moeda(c.parsed.x) : U.inteiro(c.parsed.x); } } }
      },
      scales: {
        x: { beginAtZero: true, ticks: { callback: function (v) { return ops.moeda ? U.moedaCurta(v) : U.inteiro(v); } } },
        y: { grid: { display: false } }
      }
    }, ops.extra || {})));
  }

  /** Rosca (composição). */
  function rosca(rotulos, valores, ops) {
    ops = ops || {};
    var d = tela(ops.alta);
    var total = U.soma(valores);
    return pinta(d, base('doughnut', {
      labels: rotulos,
      datasets: [{
        data: valores, backgroundColor: cores(valores.length),
        borderColor: cssVar('--surface'), borderWidth: 2
      }]
    }, fundir({
      cutout: '58%',
      scales: { x: { display: false }, y: { display: false } },
      plugins: {
        legend: { position: 'right' },
        tooltip: {
          callbacks: {
            label: function (c) {
              var v = c.parsed;
              return ' ' + c.label + ': ' + (ops.moeda ? U.moeda(v) : U.inteiro(v)) +
                (total ? '  (' + U.pct(v / total, 1) + ')' : '');
            }
          }
        }
      }
    }, ops.extra || {})));
  }

  R.cores = cores; R.graficoBarras = barras; R.graficoBarrasH = barrasH;
  R.graficoRosca = rosca; R.destroiGraficos = destroi; R.cssVar = cssVar;
})(window);
