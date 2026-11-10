/* leitor.js — lê o .xlsx, escolhe a aba certa e normaliza o cabeçalho.
   Expõe window.Leitor. Depende de window.U, window.Deteccao e do SheetJS (XLSX). */
(function (global) {
  'use strict';
  var U = global.U, Deteccao = global.Deteccao;

  /* Cabeçalhos genéricos de OC_s_2026.xlsx. O arquivo traz Campo1/Campo2/Campo3
     em vez de nome de coluna; pela posição e pelo conteúdo são Fornecedor,
     Status e Solicitante. Só renomeia quando a posição confere. */
  var GENERICOS = { 'CAMPO 1': 'FORNECEDOR', 'CAMPO 2': 'STATUS', 'CAMPO 3': 'SOLICITANTE' };
  var POS_GENERICA = { 'CAMPO 1': 1, 'CAMPO 2': 2, 'CAMPO 3': 3 };

  function normalizaCabecalho(bruto) {
    return bruto.map(function (c, i) {
      var k = U.chaveCol(c);
      if (GENERICOS[k] && POS_GENERICA[k] === i) return GENERICOS[k];
      return k;
    });
  }

  /** Acha a linha do cabeçalho: a primeira das 8 primeiras com 3+ células de texto. */
  function achaCabecalho(matriz) {
    for (var i = 0; i < Math.min(8, matriz.length); i++) {
      var linha = matriz[i] || [];
      var textos = linha.filter(function (c) {
        return typeof c === 'string' && c.trim().length > 0;
      }).length;
      if (textos >= 3) return i;
    }
    return -1;
  }

  /**
   * Lê um File e devolve { arquivo, bases: [...], recusadas: [...] }.
   * Varre todas as abas, ignora as que são painel montado e classifica as demais.
   */
  function ler(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onerror = function () { reject(new Error('Não foi possível ler o arquivo do disco.')); };
      fr.onload = function (ev) {
        var wb;
        try {
          wb = XLSX.read(new Uint8Array(ev.target.result), {
            type: 'array', cellDates: true, cellNF: false, cellText: false, dense: false
          });
        } catch (e) {
          reject(new Error('Não parece ser uma planilha válida (' + (e && e.message ? e.message : e) + ').'));
          return;
        }
        if (!wb.SheetNames || !wb.SheetNames.length) {
          reject(new Error('A planilha não tem nenhuma aba.'));
          return;
        }

        var bases = [], recusadas = [];
        wb.SheetNames.forEach(function (nome) {
          if (Deteccao.abaIgnorada(nome)) {
            recusadas.push({ aba: nome, motivo: 'é aba de indicadores montada à mão, não base' });
            return;
          }
          var matriz = XLSX.utils.sheet_to_json(wb.Sheets[nome], {
            header: 1, raw: true, defval: null, blankrows: false
          });
          if (matriz.length < 2) {
            recusadas.push({ aba: nome, motivo: 'vazia ou só com cabeçalho' });
            return;
          }
          var iCab = achaCabecalho(matriz);
          if (iCab < 0) {
            recusadas.push({ aba: nome, motivo: 'não achei uma linha de cabeçalho' });
            return;
          }

          var colunas = normalizaCabecalho(matriz[iCab]);
          var cls = Deteccao.classifica(colunas);
          if (!cls.ok) {
            recusadas.push({
              aba: nome, motivo: 'cabeçalho não reconhecido', colunas: colunas.filter(Boolean),
              candidatas: cls.candidatas
            });
            return;
          }

          var idx = {};
          colunas.forEach(function (c, i) { if (c && !(c in idx)) idx[c] = i; });

          var linhas = [];
          for (var r = iCab + 1; r < matriz.length; r++) {
            var l = matriz[r];
            if (!l) continue;
            var temAlgo = false;
            for (var c = 0; c < l.length; c++) {
              if (l[c] !== null && l[c] !== undefined && l[c] !== '') { temAlgo = true; break; }
            }
            if (temAlgo) linhas.push(l);
          }

          bases.push({
            id: cls.id, assinatura: cls.assinatura, aba: nome,
            colunas: colunas, idx: idx, linhas: linhas, arquivo: file.name
          });
        });

        resolve({ arquivo: file.name, tamanho: file.size, bases: bases, recusadas: recusadas });
      };
      fr.readAsArrayBuffer(file);
    });
  }

  /* ---- acesso às células por nome de coluna ---- */

  function campo(base, linha, nome) {
    var i = base.idx[nome];
    return i == null ? null : linha[i];
  }
  /** Primeiro nome de coluna que existir — para quando bases equivalentes usam nomes diferentes. */
  function qualquer(base, linha, nomes) {
    for (var i = 0; i < nomes.length; i++) {
      var j = base.idx[nomes[i]];
      if (j != null) {
        var v = linha[j];
        if (v !== null && v !== undefined && v !== '') return v;
      }
    }
    return null;
  }
  function temColuna(base, nome) { return base.idx[nome] != null; }
  function texto(base, linha, nome) {
    var v = campo(base, linha, nome);
    return v == null ? '' : String(v).trim();
  }

  global.Leitor = {
    ler: ler, campo: campo, qualquer: qualquer, temColuna: temColuna, texto: texto,
    normalizaCabecalho: normalizaCabecalho, achaCabecalho: achaCabecalho
  };
})(window);
