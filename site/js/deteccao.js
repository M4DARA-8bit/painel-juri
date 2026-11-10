/* deteccao.js — descobre qual base é a planilha, pelo cabeçalho.
   Expõe window.Deteccao. Depende de window.U. */
(function (global) {
  'use strict';
  var U = global.U;

  /* Uma assinatura por módulo. `exige` são as colunas que precisam estar
     presentes; `pontos` são as que reforçam, para desempatar quando duas
     assinaturas casam. `meses` exige ao menos 10 colunas de mês. */
  var ASSINATURAS = [
    {
      id: 'emissao', nome: 'Emissão de OCs', icone: '📋',
      descricao: 'Extrato de OCs com filial e responsável',
      exige: ['NOME', 'DATA', 'SITUACAO', 'FILIAL', 'CRIADO POR'],
      pontos: ['FORNECEDOR', 'SOLICITANTE', 'DATA ENTREGA', 'OBSERVACAO']
    },
    {
      id: 'curva', nome: 'Curva ABC e Regime Tributário', icone: '🏛️',
      descricao: 'Fornecedores com CNPJ, regime tributário e curva',
      exige: ['CNPJ', 'REGIME NO SIGEPRO', 'REGIME TRIB ATUAL'],
      pontos: ['RAZAO SOCIAL', 'REGIME POS REFORMA', 'CURVA', 'VALIDACAO', 'SEGMENTO ATUACAO']
    },
    {
      id: 'externa', nome: 'Base Externa', icone: '💰',
      descricao: 'Insumos com preço mês a mês e total por linha',
      exige: ['CODIGO', 'INSUMO', 'TOTAL LINHA'],
      pontos: ['OC', 'FORNECEDOR', 'QUANTIDADE', 'UNIDADE'],
      meses: true
    },
    {
      id: 'financeiro', nome: 'Financeiro / Gasto', icone: '📊',
      descricao: 'OCs linha a linha com valor e categoria',
      exige: ['OC', 'INSUMO'],
      /* Cada grupo precisa de ao menos um. Sem isso a aba VARIAÇÃO da base externa,
         que também tem OC e INSUMO mas é derivada, cairia aqui por engano. */
      exigeAlgum: [
        ['VL TOTAL LINHA', 'NVRFINAL', 'NCUSTO'],
        ['DDATA', 'DATA CRIACAO', 'DDATADEENTREGA', 'DATA ENTREGA']
      ],
      pontos: ['VL TOTAL LINHA', 'NVRFINAL', 'NQUANTIDADE', 'CATEGORIAINSUMO', 'CATEGORIA',
               'DDATA', 'DATA CRIACAO', 'TPO', 'QNTD', 'NCUSTO', 'FORMAPAGAMENTO']
    }
  ];

  /* Abas que são painel montado à mão, não base. Nunca servem de entrada. */
  var ABA_IGNORADA = /^(INDICADOR|INDICADORES|PAINEL|RESUMO|DASHBOARD|GRAFICO|GRAFICOS|CAPA|LEITURA)/;

  /** Conta quantas colunas de mês existem no cabeçalho. */
  function contaMeses(chaves) {
    var vistos = {};
    chaves.forEach(function (c) { if (U.MES_POR_ROTULO[c]) vistos[U.MES_POR_ROTULO[c]] = 1; });
    return Object.keys(vistos).length;
  }

  /**
   * Pontua um cabeçalho contra cada assinatura.
   * Devolve a melhor com `ok: true`, ou `ok: false` com as candidatas que mais perto chegaram.
   */
  function classifica(cabecalho) {
    var chaves = cabecalho.map(U.chaveCol).filter(Boolean);
    var conj = {};
    chaves.forEach(function (c) { conj[c] = 1; });

    var res = ASSINATURAS.map(function (a) {
      var faltam = a.exige.filter(function (c) { return !conj[c]; });
      (a.exigeAlgum || []).forEach(function (grupo) {
        var achou = grupo.some(function (c) { return conj[c]; });
        if (!achou) faltam = faltam.concat(['uma de: ' + grupo.join(' / ')]);
      });
      var reforco = a.pontos.filter(function (c) { return conj[c]; }).length;
      var nMeses = contaMeses(chaves);
      if (a.meses && nMeses < 10) faltam = faltam.concat(['colunas de mês (JAN..DEZ)']);
      return {
        assinatura: a, faltam: faltam, reforco: reforco, meses: nMeses,
        nota: faltam.length ? -faltam.length : a.exige.length * 10 + reforco
      };
    }).sort(function (x, y) { return y.nota - x.nota; });

    var melhor = res[0];
    if (melhor && melhor.faltam.length === 0) {
      return { ok: true, id: melhor.assinatura.id, assinatura: melhor.assinatura, colunas: chaves };
    }
    return { ok: false, colunas: chaves, candidatas: res.slice(0, 3) };
  }

  /** Lista de módulos, para montar as abas e o seletor manual. */
  function catalogo() { return ASSINATURAS.slice(); }
  function porId(id) {
    for (var i = 0; i < ASSINATURAS.length; i++) if (ASSINATURAS[i].id === id) return ASSINATURAS[i];
    return null;
  }

  global.Deteccao = {
    classifica: classifica, catalogo: catalogo, porId: porId,
    abaIgnorada: function (n) { return ABA_IGNORADA.test(U.chaveCol(n)); }
  };
})(window);
