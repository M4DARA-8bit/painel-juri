/* emissao.js — Módulo M1: emissão de OCs por responsável, filial e mês.
   Reproduz o painel "PAINEL DE EMISSÃO DE OCs" das planilhas, calculado na hora.
   Expõe window.ModEmissao. Depende de window.U e window.Leitor. */
(function (global) {
  'use strict';
  var U = global.U, L = global.Leitor;

  /**
   * Normaliza a base crua em registros de OC.
   * Uma OC pode repetir na base (o extrato vem linha a linha); a contagem é sempre
   * sobre OC distinta, igual ao painel da planilha.
   */
  function prepara(base) {
    var porOC = new Map(), regs = [];
    for (var i = 0; i < base.linhas.length; i++) {
      var l = base.linhas[i];
      var oc = L.texto(base, l, 'NOME');
      if (!oc) continue;
      var d = U.data(L.campo(base, l, 'DATA'));
      /* Fica com a primeira ocorrência da OC, menos quando ela não tem data legível
         e uma repetição tem: aí vale a que dá para datar, senão a OC sumiria da
         série mensal por causa de uma célula com #DIV/0! ou em branco. */
      if (porOC.has(oc)) {
        var ja = porOC.get(oc);
        if (ja.data || !d) continue;
        regs.splice(regs.indexOf(ja), 1);
      }
      var reg = {
        oc: oc,
        data: d,
        ano: U.anoDe(d),
        mes: U.chaveMes(d),
        fornecedor: L.texto(base, l, 'FORNECEDOR'),
        solicitante: L.texto(base, l, 'SOLICITANTE') || '(Indeterminado)',
        situacao: L.texto(base, l, 'SITUACAO') || '(em branco)',
        filial: L.texto(base, l, 'FILIAL') || '(em branco)',
        responsavel: L.texto(base, l, 'CRIADO POR') || '(em branco)',
        entrega: U.data(L.campo(base, l, 'DATA ENTREGA'))
      };
      porOC.set(oc, reg);
      regs.push(reg);
    }
    var anos = {};
    regs.forEach(function (r) { if (r.ano) anos[r.ano] = (anos[r.ano] || 0) + 1; });
    var listaAnos = Object.keys(anos).map(Number).sort(function (a, b) { return b - a; });
    /* Ano padrão: o mais recente com lançamento. É o recorte que o painel da planilha
       usa ("PAINEL DE EMISSÃO DE OCs — 2026") e o que a pessoa espera ver ao abrir.
       Pelo volume cairia em 2025, que tem o ano inteiro fechado e por isso soma mais. */
    var anoPadrao = listaAnos.length ? listaAnos[0] : null;
    return {
      registros: regs, totalLinhas: base.linhas.length,
      anos: listaAnos, contagemPorAno: anos, anoPadrao: anoPadrao,
      semData: regs.filter(function (r) { return !r.data; }).length
    };
  }

  /** Calcula os indicadores para um ano ('todos' para a base inteira). */
  function calcula(dados, ano) {
    var regs = (ano === 'todos' || ano == null)
      ? dados.registros
      : dados.registros.filter(function (r) { return r.ano === +ano; });

    var porResp = U.agrupaSoma(regs, function (r) { return r.responsavel; });
    var porFilial = U.agrupaSoma(regs, function (r) { return r.filial; });
    var porSit = U.agrupaSoma(regs, function (r) { return r.situacao; });
    var porSolic = U.agrupaSoma(regs, function (r) { return r.solicitante; });

    // líder de cada filial = responsável com mais OCs ali dentro
    var porFilialDet = porFilial.map(function (f) {
      var dentro = regs.filter(function (r) { return r.filial === f.chave; });
      var m = U.moda(dentro.map(function (r) { return r.responsavel; }));
      return { filial: f.chave, qtd: f.qtd, lider: m.valor, qtdLider: m.qtd,
               participacao: regs.length ? f.qtd / regs.length : 0 };
    });

    // série mensal: com ano fixo, os 12 meses sempre aparecem, inclusive zerados —
    // é assim que a planilha mostra que out/nov/dez ainda não têm lançamento
    var cont = {};
    regs.forEach(function (r) { if (r.mes) cont[r.mes] = (cont[r.mes] || 0) + 1; });
    var serie = [];
    if (ano !== 'todos' && ano != null) {
      for (var m = 1; m <= 12; m++) {
        var ch = ano + '-' + String(m).padStart(2, '0');
        serie.push({ mes: ch, rotulo: U.MESES_CURTO[m - 1], qtd: cont[ch] || 0 });
      }
    } else {
      Object.keys(cont).sort().forEach(function (ch) {
        serie.push({ mes: ch, rotulo: U.rotuloMes(ch), qtd: cont[ch] });
      });
    }

    var datas = regs.map(function (r) { return r.data; }).filter(Boolean)
      .sort(function (a, b) { return a - b; });

    return {
      ano: ano,
      total: regs.length,
      responsaveis: porResp.length,
      filiais: porFilial.length,
      maiorEmissor: porResp[0] || null,
      porResponsavel: porResp,
      porFilial: porFilialDet,
      porSituacao: porSit,
      porSolicitante: porSolic,
      serieMensal: serie,
      mesPico: serie.reduce(function (a, b) { return (!a || b.qtd > a.qtd) ? b : a; }, null),
      mediaMensal: serie.filter(function (s) { return s.qtd > 0; }).length
        ? U.media(serie.filter(function (s) { return s.qtd > 0; }).map(function (s) { return s.qtd; }))
        : null,
      periodo: datas.length ? { de: datas[0], ate: datas[datas.length - 1] } : null,
      semData: regs.filter(function (r) { return !r.data; }).length
    };
  }

  global.ModEmissao = { prepara: prepara, calcula: calcula };
})(window);
