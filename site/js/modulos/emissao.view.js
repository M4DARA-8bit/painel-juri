/* emissao.view.js — tela do módulo Emissão. Expõe window.VistaEmissao. */
(function (global) {
  'use strict';
  var U = global.U, R = global.R, M = global.ModEmissao;

  function desenha(alvo, base, estado) {
    var dados = estado.dados || (estado.dados = M.prepara(base));
    if (estado.ano === undefined) estado.ano = dados.anoPadrao;
    var k = M.calcula(dados, estado.ano);

    R.destroiGraficos(alvo);
    R.limpa(alvo);

    if (!k.total) {
      alvo.appendChild(R.vazio('Nenhuma OC no recorte',
        'A base tem ' + U.inteiro(dados.registros.length) + ' OCs, mas nenhuma no período escolhido. Troque o ano no filtro acima.'));
      return;
    }

    /* ---- barra de contexto ---- */
    var ctx = R.el('div', 'contexto');
    var tit = R.el('span', 'tit', base.assinatura.icone + ' ' + base.assinatura.nome);
    ctx.appendChild(tit);
    ctx.appendChild(R.el('span', 'sep', '|'));
    ctx.appendChild(R.el('span', null, base.arquivo + ' › ' + base.aba));
    ctx.appendChild(R.el('span', 'sep', '|'));
    ctx.appendChild(R.el('span', null, U.inteiro(dados.registros.length) + ' OCs distintas em ' + U.inteiro(dados.totalLinhas) + ' linhas'));

    var lab = R.el('label', null);
    lab.appendChild(R.el('span', null, 'Ano:'));
    var sel = R.el('select');
    sel.id = 'emissao-ano';
    var op = R.el('option', null, 'todos os anos'); op.value = 'todos'; sel.appendChild(op);
    dados.anos.forEach(function (a) {
      var o = R.el('option', null, a + '  (' + U.inteiro(dados.contagemPorAno[a]) + ')');
      o.value = String(a);
      if (String(a) === String(estado.ano)) o.selected = true;
      sel.appendChild(o);
    });
    if (estado.ano === 'todos') sel.value = 'todos';
    sel.onchange = function () {
      estado.ano = sel.value === 'todos' ? 'todos' : +sel.value;
      desenha(alvo, base, estado);
    };
    lab.appendChild(sel);
    ctx.appendChild(lab);

    var bx = R.el('button', 'btn', '⬇ Exportar .xlsx');
    bx.type = 'button';
    bx.onclick = function () { exporta(k, base); };
    ctx.appendChild(bx);
    alvo.appendChild(ctx);

    if (k.periodo) {
      alvo.appendChild(R.aviso(null, 'Período dos dados: <b>' + U.dataBR(k.periodo.de) +
        '</b> a <b>' + U.dataBR(k.periodo.ate) + '</b>.' +
        (k.semData ? ' <b>' + U.inteiro(k.semData) + '</b> OCs sem data legível ficaram fora da série mensal.' : '')));
    }

    /* ---- KPIs ---- */
    var rot = estado.ano === 'todos' ? 'na base' : 'em ' + estado.ano;
    alvo.appendChild(R.kpis([
      { rotulo: 'Total de OCs ' + rot, valor: U.inteiro(k.total) },
      { rotulo: 'Responsáveis ativos', valor: U.inteiro(k.responsaveis) },
      { rotulo: 'Filiais com emissão', valor: U.inteiro(k.filiais) },
      { rotulo: 'Maior emissor', medio: true,
        valor: k.maiorEmissor ? k.maiorEmissor.chave : '—',
        nota: k.maiorEmissor ? U.inteiro(k.maiorEmissor.qtd) + ' OCs  ·  ' + U.pct(k.maiorEmissor.qtd / k.total, 1) + ' do total' : '' },
      { rotulo: 'Média por mês ativo', valor: k.mediaMensal == null ? '—' : U.inteiro(Math.round(k.mediaMensal)),
        nota: k.mesPico && k.mesPico.qtd ? 'pico ' + k.mesPico.rotulo + ' com ' + U.inteiro(k.mesPico.qtd) : '' }
    ]));

    /* ---- série mensal ---- */
    alvo.appendChild(R.bloco('Emissão mês a mês',
      estado.ano === 'todos'
        ? 'Todos os meses com lançamento na base.'
        : 'Os 12 meses de ' + estado.ano + '. Mês sem lançamento aparece como zero, não é omitido.',
      R.graficoBarras(
        k.serieMensal.map(function (s) { return s.rotulo; }),
        k.serieMensal.map(function (s) { return s.qtd; }),
        { titulo: 'OCs emitidas' })));

    /* ---- filial e responsável ---- */
    var maxF = k.porFilial.length ? k.porFilial[0].qtd : 1;
    alvo.appendChild(R.bloco('Quantidade e líder por filial',
      'O líder é o responsável que emitiu mais OCs naquela filial. Em caso de empate vale quem aparece primeiro no extrato.',
      R.tabela(k.porFilial, [
        { rot: 'Filial', campo: 'filial' },
        { rot: 'OCs', campo: 'qtd', tipo: 'num', largura: '8%' },
        { rot: 'Participação', campo: 'participacao', tipo: 'barra', largura: '16%', max: maxF / k.total },
        { rot: 'Responsável com mais OCs', campo: 'lider' },
        { rot: 'Qtd. do líder', campo: 'qtdLider', tipo: 'num', largura: '11%' }
      ], { ordenarPor: 'qtd', desc: true,
           rodape: ['Total', { texto: U.inteiro(k.total), num: true }, '', '', ''] })));

    var topo = k.porResponsavel.slice(0, 12);
    alvo.appendChild(R.par(
      R.bloco('Emissão individual',
        U.inteiro(k.porResponsavel.length) + ' responsáveis no recorte.',
        R.tabela(k.porResponsavel, [
          { rot: 'Responsável', campo: 'chave' },
          { rot: 'OCs', campo: 'qtd', tipo: 'num', largura: '18%' },
          { rot: '% do total', campo: function (l) { return l.qtd / k.total; }, tipo: 'pct', largura: '18%' }
        ], { ordenarPor: 'qtd', desc: true })),
      R.bloco('Os 12 maiores emissores', 'Mesmo recorte, em ordem de volume.',
        R.graficoBarrasH(
          topo.map(function (r) { return r.chave; }),
          topo.map(function (r) { return r.qtd; }),
          { titulo: 'OCs', alta: true }))));

    /* ---- situação e solicitante ---- */
    var sit = k.porSituacao.slice(0, 8);
    alvo.appendChild(R.par(
      R.bloco('Situação das OCs', 'Como as OCs do recorte estão hoje.',
        R.graficoRosca(sit.map(function (s) { return s.chave; }), sit.map(function (s) { return s.qtd; }), {})),
      R.bloco('Solicitantes que mais pedem', 'Quem origina a demanda, não quem digita a OC.',
        R.tabela(k.porSolicitante, [
          { rot: 'Solicitante', campo: 'chave' },
          { rot: 'OCs', campo: 'qtd', tipo: 'num', largura: '18%' },
          { rot: '% do total', campo: function (l) { return l.qtd / k.total; }, tipo: 'pct', largura: '18%' }
        ], { ordenarPor: 'qtd', desc: true, limite: 15 }))));
  }

  function exporta(k, base) {
    var rot = k.ano === 'todos' ? 'todos os anos' : k.ano;
    R.exportar('indicadores-emissao-' + (k.ano === 'todos' ? 'geral' : k.ano) + '.xlsx', [
      { nome: 'Resumo', linhas: [
        ['PAINEL DE EMISSÃO DE OCs — ' + rot],
        ['Origem', base.arquivo + ' › ' + base.aba],
        ['Gerado em', new Date().toLocaleString('pt-BR')],
        [],
        ['Indicador', 'Valor'],
        ['Total de OCs', k.total],
        ['Responsáveis ativos', k.responsaveis],
        ['Filiais com emissão', k.filiais],
        ['Maior emissor', k.maiorEmissor ? k.maiorEmissor.chave : ''],
        ['OCs do maior emissor', k.maiorEmissor ? k.maiorEmissor.qtd : ''],
        ['Média por mês ativo', k.mediaMensal == null ? '' : Math.round(k.mediaMensal)],
        ['Período', k.periodo ? U.dataBR(k.periodo.de) + ' a ' + U.dataBR(k.periodo.ate) : '']
      ] },
      { nome: 'Por filial', linhas: [['Filial', 'OCs', '% do total', 'Líder', 'Qtd. do líder']]
        .concat(k.porFilial.map(function (f) { return [f.filial, f.qtd, f.participacao, f.lider, f.qtdLider]; })) },
      { nome: 'Por responsável', linhas: [['Responsável', 'OCs', '% do total']]
        .concat(k.porResponsavel.map(function (r) { return [r.chave, r.qtd, r.qtd / k.total]; })) },
      { nome: 'Por mês', linhas: [['Mês', 'OCs']]
        .concat(k.serieMensal.map(function (s) { return [s.mes || s.rotulo, s.qtd]; })) },
      { nome: 'Por situação', linhas: [['Situação', 'OCs']]
        .concat(k.porSituacao.map(function (s) { return [s.chave, s.qtd]; })) },
      { nome: 'Por solicitante', linhas: [['Solicitante', 'OCs']]
        .concat(k.porSolicitante.map(function (s) { return [s.chave, s.qtd]; })) }
    ]);
  }

  global.VistaEmissao = { desenha: desenha };
})(window);
