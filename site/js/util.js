/* util.js — formatação, datas, estatística e normalização de texto.
   Script clássico: expõe tudo em window.U. Sem dependências. */
(function (global) {
  'use strict';

  var MESES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  /* Grafias de mês aceitas num cabeçalho. A aba BASE da base externa escreve ABRIL
     enquanto VARIAÇÃO QUANTIDADE escreve ABR, por isso as duas entram. */
  var MES_POR_ROTULO = {
    JAN: 1, JANEIRO: 1, FEV: 2, FEVEREIRO: 2, MAR: 3, MARCO: 3, MARÇO: 3,
    ABR: 4, ABRIL: 4, MAI: 5, MAIO: 5, JUN: 6, JUNHO: 6, JUL: 7, JULHO: 7,
    AGO: 8, AGOSTO: 8, SET: 9, SETEMBRO: 9, OUT: 10, OUTUBRO: 10,
    NOV: 11, NOVEMBRO: 11, DEZ: 12, DEZEMBRO: 12
  };

  // ---------- texto ----------

  /** Remove acentos: "PROTEÇÃO" -> "PROTECAO". */
  function semAcento(s) {
    return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /** Chave de cabeçalho: maiúsculas, sem acento, sem pontuação, espaço colapsado. */
  function chaveCol(s) {
    return semAcento(s).toUpperCase().replace(/[^A-Z0-9]+/g, ' ').trim();
  }

  var SUFIXOS = /\b(LTDA|LIMITADA|ME|MEI|EPP|EIRELI|S\s?A|SA|S\s?S|SOCIEDADE ANONIMA|CIA|COMPANHIA|INC|CORP)\b/g;

  /**
   * Chave de agrupamento de fornecedor. Sem CNPJ na base, o nome é tudo que há.
   * Maiúsculas, sem acento, sem o trecho entre parênteses (que identifica filial),
   * sem sufixo societário e sem pontuação.
   *
   * De propósito só agrupa chave IDÊNTICA — nada de similaridade aproximada. Isso une
   * "NEOBETEL EPI EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL LTDA (JACAREI)" com
   * "NEOBETEL EPI, EQUIPAMENTOS DE PROTECAO INDIVIDUAL LTDA (RJ)", e mantém separados
   * tanto a variante com o erro de digitação "INDIIVIDUAL" quanto os sindicatos de
   * estados diferentes, que uma comparação por prefixo juntaria errado.
   * Perde alguma fusão legítima; não inventa nenhuma.
   */
  function chaveFornecedor(s) {
    var t = semAcento(s).toUpperCase();
    t = t.replace(/\([^)]*\)/g, ' ');       // (JACAREI), (RJ), (CLIMA RIO)
    t = t.replace(/[^A-Z0-9]+/g, ' ');
    t = t.replace(SUFIXOS, ' ');
    return t.replace(/\s+/g, ' ').trim();
  }

  function titulo(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/(^|[\s/(-])([a-zà-ú])/g,
      function (m, a, b) { return a + b.toUpperCase(); });
  }

  // ---------- números ----------

  var fmtInt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
  var fmtDec = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  var fmtBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  var fmtBRL0 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  function inteiro(n) { return Number.isFinite(n) ? fmtInt.format(n) : '—'; }
  function decimal(n) { return Number.isFinite(n) ? fmtDec.format(n) : '—'; }
  function moeda(n) { return Number.isFinite(n) ? fmtBRL.format(n) : '—'; }
  function moeda0(n) { return Number.isFinite(n) ? fmtBRL0.format(n) : '—'; }

  /** Moeda abreviada para eixo de gráfico e cartão apertado: R$ 1,2 mi. */
  function moedaCurta(n) {
    if (!Number.isFinite(n)) return '—';
    var s = n < 0 ? '-' : '', a = Math.abs(n);
    if (a >= 1e9) return s + 'R$ ' + fmtDec.format(a / 1e9) + ' bi';
    if (a >= 1e6) return s + 'R$ ' + fmtDec.format(a / 1e6) + ' mi';
    if (a >= 1e3) return s + 'R$ ' + fmtDec.format(a / 1e3) + ' mil';
    return fmtBRL0.format(n);
  }

  function pct(n, casas) {
    if (!Number.isFinite(n)) return '—';
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: casas == null ? 1 : casas,
      maximumFractionDigits: casas == null ? 1 : casas
    }).format(n);
  }

  /** Converte para número aceitando "1.234,56", "R$ 1.234,56" e "1,234.56". */
  function num(v) {
    if (typeof v === 'number') return Number.isFinite(v) ? v : null;
    if (v == null) return null;
    var s = String(v).trim();
    if (!s || s.charAt(0) === '#') return null;   // #DIV/0!, #N/A no meio da base
    s = s.replace(/[R$\s ]/g, '');
    if (s.indexOf(',') > -1 && s.indexOf('.') > -1) {
      s = s.lastIndexOf(',') > s.lastIndexOf('.')
        ? s.replace(/\./g, '').replace(',', '.')   // 1.234,56
        : s.replace(/,/g, '');                     // 1,234.56
    } else if (s.indexOf(',') > -1) {
      s = s.replace(',', '.');
    } else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) {
      s = s.replace(/\./g, '');   // "2.280" é dois mil duzentos e oitenta, não 2,28
    }
    var n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
  }

  // ---------- datas ----------

  /**
   * Converte célula em Date local, aceitando Date, serial do Excel e texto
   * dd/mm/aaaa ou aaaa-mm-dd. Devolve null quando não dá.
   */
  function data(v) {
    if (v instanceof Date) {
      return Number.isNaN(v.getTime()) ? null : new Date(v.getFullYear(), v.getMonth(), v.getDate());
    }
    if (typeof v === 'number' && Number.isFinite(v)) {
      if (v < 1 || v > 80000) return null;
      // serial do Excel: dia 1 = 1899-12-31, com o bug do ano 1900 bissexto
      var ms = Math.round((v - 25569) * 86400000);
      var d = new Date(ms);
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
    if (typeof v !== 'string') return null;
    var s = v.trim();
    if (!s) return null;
    var m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
    if (m) {
      var ano = +m[3]; if (ano < 100) ano += ano < 70 ? 2000 : 1900;
      return valida(ano, +m[2] - 1, +m[1]);
    }
    m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return valida(+m[1], +m[2] - 1, +m[3]);
    return null;
  }
  function valida(a, mes, dia) {
    var d = new Date(a, mes, dia);
    return (d.getFullYear() === a && d.getMonth() === mes && d.getDate() === dia) ? d : null;
  }

  function anoDe(d) { return d ? d.getFullYear() : null; }
  function chaveMes(d) { return d ? d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') : null; }
  function rotuloMes(ch) {
    var p = String(ch).split('-');
    return MESES_CURTO[(+p[1]) - 1] + '/' + String(p[0]).slice(2);
  }
  function dataBR(d) {
    return d ? String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear() : '—';
  }
  function diasEntre(a, b) {
    if (!a || !b) return null;
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }

  // ---------- estatística ----------

  function soma(a) { var t = 0; for (var i = 0; i < a.length; i++) t += a[i]; return t; }
  function media(a) { return a.length ? soma(a) / a.length : null; }

  /** Mediana no critério do Excel: média dos dois centrais quando o n é par. */
  function mediana(a) {
    if (!a.length) return null;
    var v = a.slice().sort(function (x, y) { return x - y; }), i = v.length >> 1;
    return v.length % 2 ? v[i] : (v[i - 1] + v[i]) / 2;
  }

  /** Percentil por interpolação linear, igual ao PERCENTIL.INC do Excel. */
  function percentil(a, p) {
    if (!a.length) return null;
    var v = a.slice().sort(function (x, y) { return x - y; });
    var pos = (v.length - 1) * p, b = Math.floor(pos), r = pos - b;
    return b + 1 < v.length ? v[b] + r * (v[b + 1] - v[b]) : v[b];
  }

  /**
   * Moda. Empate fica com quem apareceu primeiro na base — é o que a planilha faz
   * (ABILITY JI-PARANA tem 1 OC de MIRELLA.PECORA e 1 de JULIA.FIGUEREDO, e o painel
   * mostra MIRELLA.PECORA, que vem antes no extrato). O Map preserva ordem de inserção,
   * então basta exigir estritamente maior.
   */
  function moda(a) {
    var c = new Map(), melhor = null, max = -1;
    for (var i = 0; i < a.length; i++) { var k = a[i]; c.set(k, (c.get(k) || 0) + 1); }
    c.forEach(function (v, k) { if (v > max) { max = v; melhor = k; } });
    return { valor: melhor, qtd: max < 0 ? 0 : max };
  }

  /** Agrupa e soma: devolve [{chave, qtd, valor}] em ordem decrescente de `valor`. */
  function agrupaSoma(linhas, fnChave, fnValor) {
    var m = new Map();
    for (var i = 0; i < linhas.length; i++) {
      var k = fnChave(linhas[i]);
      if (k == null || k === '') k = '(em branco)';
      var o = m.get(k);
      if (!o) { o = { chave: k, qtd: 0, valor: 0 }; m.set(k, o); }
      o.qtd++;
      if (fnValor) { var v = fnValor(linhas[i]); if (Number.isFinite(v)) o.valor += v; }
    }
    return Array.from(m.values()).sort(function (a, b) {
      return (b.valor - a.valor) || (b.qtd - a.qtd) || String(a.chave).localeCompare(String(b.chave), 'pt-BR');
    });
  }

  /**
   * Curva ABC por faturamento acumulado. Corte padrão 80% / 95%, que é o que
   * reproduz a divisão da planilha de curva.
   */
  function curvaABC(itens, cortes) {
    var cA = (cortes && cortes[0]) || 0.80, cB = (cortes && cortes[1]) || 0.95;
    var ord = itens.slice().sort(function (a, b) { return b.valor - a.valor; });
    var total = soma(ord.map(function (o) { return o.valor; }));
    var acc = 0;
    return ord.map(function (o) {
      acc += o.valor;
      var p = total > 0 ? acc / total : 0;
      return Object.assign({}, o, {
        acumulado: p,
        participacao: total > 0 ? o.valor / total : 0,
        curva: p <= cA ? 'Classe A' : (p <= cB ? 'Classe B' : 'Classe C')
      });
    });
  }

  function baixaTexto(nome, texto, tipo) {
    var b = new Blob([texto], { type: (tipo || 'text/plain') + ';charset=utf-8' });
    var u = URL.createObjectURL(b), a = document.createElement('a');
    a.href = u; a.download = nome; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 2000);
  }

  global.U = {
    MESES_CURTO: MESES_CURTO, MES_POR_ROTULO: MES_POR_ROTULO,
    semAcento: semAcento, chaveCol: chaveCol, chaveFornecedor: chaveFornecedor, titulo: titulo,
    inteiro: inteiro, decimal: decimal, moeda: moeda, moeda0: moeda0, moedaCurta: moedaCurta, pct: pct, num: num,
    data: data, anoDe: anoDe, chaveMes: chaveMes, rotuloMes: rotuloMes, dataBR: dataBR, diasEntre: diasEntre,
    soma: soma, media: media, mediana: mediana, percentil: percentil, moda: moda,
    agrupaSoma: agrupaSoma, curvaABC: curvaABC, baixaTexto: baixaTexto
  };
})(window);
