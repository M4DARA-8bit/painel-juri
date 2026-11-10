/* app.js — estado, leitura dos arquivos, abas e overlay. Expõe window.App. */
(function (global) {
  'use strict';
  var U = global.U, R = global.R, Deteccao = global.Deteccao, Leitor = global.Leitor;

  /* Telas registradas por módulo. Cada fase do projeto acrescenta uma entrada. */
  var VISTAS = {
    emissao: function () { return global.VistaEmissao; },
    curva: function () { return global.VistaCurva; },
    externa: function () { return global.VistaExterna; },
    financeiro: function () { return global.VistaFinanceiro; }
  };

  var estado = { bases: {}, estados: {}, ativa: null };
  var dom = {};

  function pronta(id) { return !!estado.bases[id]; }
  function implementada(id) {
    var f = VISTAS[id];
    return !!(f && f());
  }

  // ---------- overlay ----------
  function manto(aberto, texto) {
    dom.manto.setAttribute('data-aberto', aberto ? '1' : '0');
    if (texto) dom.mantoTexto.textContent = texto;
  }

  // ---------- avisos ----------
  function avisa(tipo, html) {
    dom.avisos.appendChild(R.aviso(tipo, html));
  }
  function limpaAvisos() { R.limpa(dom.avisos); }

  // ---------- leitura ----------
  function recebeArquivos(lista) {
    var arquivos = Array.prototype.slice.call(lista).filter(function (f) {
      return /\.(xlsx|xlsm|xls)$/i.test(f.name);
    });
    if (!arquivos.length) {
      avisa('bad', 'Nenhum arquivo <b>.xlsx</b> no que você soltou. O site lê planilha do Excel; CSV e PDF não servem.');
      return;
    }
    limpaAvisos();
    manto(true, 'Lendo ' + arquivos[0].name + '…');
    // deixa o navegador pintar o overlay antes de travar na leitura
    setTimeout(function () { processaFila(arquivos, 0); }, 30);
  }

  function processaFila(arquivos, i) {
    if (i >= arquivos.length) {
      manto(false);
      atualizaAbas();
      var primeira = estado.ativa || Object.keys(estado.bases)[0];
      if (primeira) mostra(primeira);
      return;
    }
    var f = arquivos[i];
    manto(true, 'Lendo ' + f.name + '…');
    Leitor.ler(f).then(function (res) {
      if (!res.bases.length) {
        var det = res.recusadas.filter(function (r) { return r.colunas; })[0];
        var motivos = res.recusadas.filter(function (r) { return !r.colunas; })
          .map(function (r) { return escapa(r.aba) + ' (' + escapa(r.motivo) + ')'; });
        avisa('bad', 'Não reconheci nenhuma base em <b>' + escapa(f.name) + '</b>.' +
          (det ? ' A aba <b>' + escapa(det.aba) + '</b> tem as colunas: <code>' +
                 escapa(det.colunas.slice(0, 12).join(' · ')) + '</code>.' : '') +
          (!det && motivos.length ? ' Abas descartadas: ' + motivos.join(', ') + '.' : '') +
          ' Confira se é um dos extratos esperados — o site aceita: ' +
          Deteccao.catalogo().map(function (a) { return '<b>' + a.nome + '</b>'; }).join(', ') + '.');
      }
      res.bases.forEach(function (b) {
        estado.bases[b.id] = b;
        estado.estados[b.id] = {};
        if (!estado.ativa) estado.ativa = b.id;
        var msg = 'Reconheci <b>' + escapa(b.assinatura.nome) + '</b> em <b>' + escapa(f.name) +
          '</b> › aba <b>' + escapa(b.aba) + '</b> — ' + U.inteiro(b.linhas.length) + ' linhas.';
        if (!implementada(b.id)) {
          msg += ' <b>Esse módulo ainda não está no ar</b> nesta versão; os dados ficaram carregados e aparecem quando ele entrar.';
          avisa('warn', msg);
        } else {
          avisa('ok', msg);
        }
      });
      processaFila(arquivos, i + 1);
    }).catch(function (e) {
      avisa('bad', 'Falhou ao ler <b>' + escapa(f.name) + '</b>: ' + escapa(e && e.message ? e.message : String(e)));
      processaFila(arquivos, i + 1);
    });
  }

  function escapa(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---------- abas ----------
  function montaAbas() {
    R.limpa(dom.abas);
    Deteccao.catalogo().forEach(function (a) {
      var b = R.el('button', null, a.icone + '  ' + a.nome);
      b.type = 'button';
      b.id = 'aba-' + a.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', 'painel-' + a.id);
      b.setAttribute('aria-selected', 'false');
      b.onclick = function () { if (!b.disabled) mostra(a.id); };
      b.onkeydown = function (e) {
        var ids = Deteccao.catalogo().map(function (x) { return x.id; });
        var i = ids.indexOf(a.id), d = e.key === 'ArrowRight' ? 1 : (e.key === 'ArrowLeft' ? -1 : 0);
        if (!d) return;
        e.preventDefault();
        for (var p = 1; p <= ids.length; p++) {
          var alvo = ids[(i + d * p + ids.length * p) % ids.length];
          var btn = document.getElementById('aba-' + alvo);
          if (btn && !btn.disabled) { btn.focus(); mostra(alvo); return; }
        }
      };
      dom.abas.appendChild(b);
    });
    atualizaAbas();
  }

  function atualizaAbas() {
    Deteccao.catalogo().forEach(function (a) {
      var b = document.getElementById('aba-' + a.id);
      if (!b) return;
      var carregada = pronta(a.id), viva = implementada(a.id);
      b.disabled = !(carregada && viva);
      b.classList.toggle('marca-pronto', carregada && viva);
      b.title = carregada
        ? (viva ? 'Base carregada: ' + a.descricao : 'Base carregada, módulo ainda não disponível nesta versão')
        : (viva ? 'Carregue uma planilha: ' + a.descricao : 'Módulo previsto para uma próxima fase');
      b.tabIndex = b.disabled ? -1 : 0;
    });
    var algumaViva = Deteccao.catalogo().some(function (a) { return pronta(a.id) && implementada(a.id); });
    dom.abas.classList.toggle('ocultar', !algumaViva);
    dom.solta.classList.toggle('compacta', Object.keys(estado.bases).length > 0);
    dom.btnLimpar.classList.toggle('ocultar', !Object.keys(estado.bases).length);
  }

  function mostra(id) {
    if (!pronta(id) || !implementada(id)) return;
    estado.ativa = id;
    Deteccao.catalogo().forEach(function (a) {
      var b = document.getElementById('aba-' + a.id);
      if (b) b.setAttribute('aria-selected', a.id === id ? 'true' : 'false');
      var p = document.getElementById('painel-' + a.id);
      if (p) p.hidden = a.id !== id;
    });
    var painel = document.getElementById('painel-' + id);
    dom.inicio.classList.add('ocultar');
    try {
      VISTAS[id]().desenha(painel, estado.bases[id], estado.estados[id]);
    } catch (e) {
      R.limpa(painel);
      painel.appendChild(R.aviso('bad', 'Erro ao montar o painel: <b>' + escapa(e && e.message ? e.message : String(e)) +
        '</b>. Os dados foram lidos, o problema está no cálculo ou na tela.'));
      if (global.console) console.error(e);
    }
  }

  function limpaTudo() {
    estado.bases = {}; estado.estados = {}; estado.ativa = null;
    Deteccao.catalogo().forEach(function (a) {
      var p = document.getElementById('painel-' + a.id);
      if (p) { R.destroiGraficos(p); R.limpa(p); p.hidden = true; }
    });
    limpaAvisos();
    dom.inicio.classList.remove('ocultar');
    dom.entrada.value = '';
    atualizaAbas();
  }

  // ---------- tema ----------
  function tema() {
    var atual = document.documentElement.getAttribute('data-theme');
    if (!atual) {
      atual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var novo = atual === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', novo);
    try { localStorage.setItem('painel-tema', novo); } catch (e) { /* modo privado */ }
    dom.btnTema.textContent = novo === 'dark' ? '☀' : '☾';
    dom.btnTema.setAttribute('aria-label', novo === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
    if (estado.ativa) mostra(estado.ativa);   // redesenha os gráficos com as cores novas
  }

  function aplicaTemaSalvo() {
    var t = null;
    try { t = localStorage.getItem('painel-tema'); } catch (e) { /* modo privado */ }
    if (t) document.documentElement.setAttribute('data-theme', t);
    var escuro = (t || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
    dom.btnTema.textContent = escuro ? '☀' : '☾';
  }

  // ---------- início ----------
  function inicia() {
    dom.abas = document.getElementById('abas');
    dom.avisos = document.getElementById('avisos');
    dom.solta = document.getElementById('solta');
    dom.entrada = document.getElementById('entrada');
    dom.manto = document.getElementById('manto');
    dom.mantoTexto = document.getElementById('manto-texto');
    dom.inicio = document.getElementById('inicio');
    dom.btnTema = document.getElementById('btn-tema');
    dom.btnLimpar = document.getElementById('btn-limpar');

    if (typeof XLSX === 'undefined' || typeof Chart === 'undefined') {
      dom.avisos.appendChild(R.aviso('bad',
        'As bibliotecas de <code>site/vendor/</code> não carregaram. Confira se a pasta <code>vendor</code> está ao lado de <code>index.html</code>.'));
      return;
    }

    montaAbas();
    aplicaTemaSalvo();

    dom.entrada.onchange = function () { if (dom.entrada.files.length) recebeArquivos(dom.entrada.files); };
    document.getElementById('btn-escolher').onclick = function () { dom.entrada.click(); };
    dom.btnTema.onclick = tema;
    dom.btnLimpar.onclick = limpaTudo;
    document.getElementById('btn-imprimir').onclick = function () { window.print(); };

    ['dragenter', 'dragover'].forEach(function (ev) {
      dom.solta.addEventListener(ev, function (e) {
        e.preventDefault(); e.stopPropagation(); dom.solta.classList.add('sobre');
      });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dom.solta.addEventListener(ev, function (e) {
        e.preventDefault(); e.stopPropagation(); dom.solta.classList.remove('sobre');
      });
    });
    dom.solta.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files.length) recebeArquivos(e.dataTransfer.files);
    });
    // soltar fora da zona não deve abrir o arquivo no navegador
    window.addEventListener('dragover', function (e) { e.preventDefault(); });
    window.addEventListener('drop', function (e) { e.preventDefault(); });
  }

  global.App = { inicia: inicia, estado: estado, mostra: mostra, recebeArquivos: recebeArquivos };
})(window);
