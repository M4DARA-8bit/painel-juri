/* tabela.js — tabela ordenável com barra de proporção. Expõe R.tabela. */
(function (global) {
  'use strict';
  var R = global.R = global.R || {}, U = global.U;

  /**
   * colunas: [{ rot, campo, tipo:'texto'|'num'|'moeda'|'pct'|'barra'|'tag',
   *             largura, casas, max, titulo }]
   * ops: { ordenarPor, desc, limite, rodape:[...] }
   */
  function tabela(linhas, colunas, ops) {
    ops = ops || {};
    var estado = {
      campo: ops.ordenarPor || null,
      desc: ops.desc !== false
    };

    var env = R.el('div', 'rolo');
    var tb = R.el('table', 'tb');
    var thead = R.el('thead'), trh = R.el('tr');
    var tbody = R.el('tbody');

    function alinhaNum(t) { return t === 'num' || t === 'moeda' || t === 'pct' || t === 'barra'; }

    colunas.forEach(function (c) {
      var th = R.el('th', (alinhaNum(c.tipo) ? 'num' : '') + (c.campo ? ' ord' : ''));
      th.textContent = c.rot;
      if (c.largura) th.style.width = c.largura;
      if (c.titulo) th.title = c.titulo;
      th.scope = 'col';
      if (c.campo) {
        th.tabIndex = 0;
        th.setAttribute('role', 'button');
        var acionar = function () {
          if (estado.campo === c.campo) estado.desc = !estado.desc;
          else { estado.campo = c.campo; estado.desc = alinhaNum(c.tipo); }
          desenha();
        };
        th.onclick = acionar;
        th.onkeydown = function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); acionar(); }
        };
      }
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    tb.appendChild(thead);
    tb.appendChild(tbody);
    env.appendChild(tb);

    function celula(l, c) {
      var v = typeof c.campo === 'function' ? c.campo(l) : l[c.campo];
      var td = R.el('td', alinhaNum(c.tipo) ? 'num' : '');
      if (c.tipo === 'moeda') td.textContent = U.moeda(v);
      else if (c.tipo === 'num') td.textContent = U.inteiro(v);
      else if (c.tipo === 'dec') td.textContent = U.decimal(v);
      else if (c.tipo === 'pct') td.textContent = U.pct(v, c.casas);
      else if (c.tipo === 'barra') {
        var cx = R.el('div', 'barra-cel');
        cx.appendChild(R.el('span', null, U.pct(v, c.casas == null ? 1 : c.casas)));
        var tr = R.el('div', 'trilho'), pr = R.el('div', 'preenche');
        var maxv = c.max || 1;
        pr.style.width = Math.max(0, Math.min(100, (v / maxv) * 100)) + '%';
        tr.appendChild(pr); cx.appendChild(tr);
        td.appendChild(cx);
      } else if (c.tipo === 'tag') {
        var inf = c.tag ? c.tag(l) : { texto: v, classe: 'neutro' };
        td.appendChild(R.el('span', 'tag tag-' + inf.classe, inf.texto));
      } else {
        td.textContent = v == null || v === '' ? '—' : String(v);
      }
      return td;
    }

    function desenha() {
      R.limpa(tbody);
      var dados = linhas.slice();
      if (estado.campo) {
        var col = colunas.filter(function (c) { return c.campo === estado.campo; })[0] || {};
        dados.sort(function (a, b) {
          var x = typeof estado.campo === 'function' ? estado.campo(a) : a[estado.campo];
          var y = typeof estado.campo === 'function' ? estado.campo(b) : b[estado.campo];
          var r;
          if (typeof x === 'number' || typeof y === 'number') {
            r = (Number.isFinite(x) ? x : -Infinity) - (Number.isFinite(y) ? y : -Infinity);
          } else {
            r = String(x == null ? '' : x).localeCompare(String(y == null ? '' : y), 'pt-BR');
          }
          return estado.desc ? -r : r;
        });
        void col;
      }
      if (ops.limite) dados = dados.slice(0, ops.limite);

      colunas.forEach(function (c, i) {
        var th = trh.children[i];
        if (c.campo === estado.campo) th.setAttribute('aria-sort', estado.desc ? 'descending' : 'ascending');
        else th.removeAttribute('aria-sort');
      });

      dados.forEach(function (l) {
        var tr = R.el('tr');
        colunas.forEach(function (c) { tr.appendChild(celula(l, c)); });
        tbody.appendChild(tr);
      });

      if (ops.rodape) {
        var trf = R.el('tr', 'total');
        ops.rodape.forEach(function (v) {
          var td = R.el('td', typeof v === 'object' && v && v.num ? 'num' : '');
          td.textContent = typeof v === 'object' && v ? v.texto : (v == null ? '' : v);
          trf.appendChild(td);
        });
        tbody.appendChild(trf);
      }
    }

    desenha();
    return env;
  }

  R.tabela = tabela;
})(window);
