/* exportar.js — gera .xlsx com os indicadores calculados. Expõe R.exportar.
   Usa o próprio SheetJS já carregado. Nada sai da máquina. */
(function (global) {
  'use strict';
  var R = global.R = global.R || {};

  /**
   * abas: [{ nome, linhas: [[...],[...]] }] — matriz crua, primeira linha é cabeçalho.
   * O nome da aba no Excel não pode passar de 31 caracteres nem conter : \ / ? * [ ]
   */
  function exportar(nomeArquivo, abas) {
    var wb = XLSX.utils.book_new();
    var usados = {};
    abas.forEach(function (a) {
      var nome = String(a.nome).replace(/[:\\\/?*\[\]]/g, '-').slice(0, 31) || 'Aba';
      var n = nome, i = 2;
      while (usados[n]) { n = nome.slice(0, 28) + '(' + i++ + ')'; }
      usados[n] = 1;
      var ws = XLSX.utils.aoa_to_sheet(a.linhas);
      ws['!cols'] = larguras(a.linhas);
      XLSX.utils.book_append_sheet(wb, ws, n);
    });
    XLSX.writeFile(wb, nomeArquivo);
  }

  function larguras(linhas) {
    var w = [];
    linhas.forEach(function (l) {
      (l || []).forEach(function (c, i) {
        var n = c == null ? 0 : String(c).length;
        w[i] = Math.min(46, Math.max(w[i] || 9, n + 2));
      });
    });
    return w.map(function (x) { return { wch: x }; });
  }

  R.exportar = exportar;
})(window);
