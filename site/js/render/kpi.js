/* kpi.js — cartões de indicador e blocos. Expõe window.R (render), parte 1. */
(function (global) {
  'use strict';
  var R = global.R = global.R || {};

  function el(tag, cls, texto) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (texto != null) n.textContent = texto;
    return n;
  }
  function limpa(n) { while (n.firstChild) n.removeChild(n.firstChild); return n; }

  /** Faixa de cartões. itens: [{rotulo, valor, nota, medio}] */
  function kpis(itens) {
    var g = el('div', 'kpis');
    itens.forEach(function (k) {
      var c = el('div', 'kpi');
      c.appendChild(el('div', 'rot', k.rotulo));
      c.appendChild(el('div', 'val' + (k.medio ? ' med' : ''), k.valor));
      if (k.nota) c.appendChild(el('div', 'nota', k.nota));
      g.appendChild(c);
    });
    return g;
  }

  /** Bloco com título, legenda e conteúdo. */
  function bloco(titulo, legenda, conteudo) {
    var b = el('section', 'bloco');
    if (titulo) b.appendChild(el('h3', null, titulo));
    if (legenda) b.appendChild(el('p', 'leg', legenda));
    if (conteudo) {
      (Array.isArray(conteudo) ? conteudo : [conteudo]).forEach(function (c) { if (c) b.appendChild(c); });
    }
    return b;
  }

  function par(a, b) {
    var d = el('div', 'par');
    if (a) d.appendChild(a);
    if (b) d.appendChild(b);
    return d;
  }

  function aviso(tipo, html) {
    var a = el('div', 'aviso' + (tipo ? ' aviso-' + tipo : ''));
    var span = el('span');
    span.innerHTML = html;      // só texto montado pelo próprio site
    a.appendChild(span);
    var x = el('button', 'fechar', '×');
    x.type = 'button';
    x.setAttribute('aria-label', 'Fechar aviso');
    x.onclick = function () { a.remove(); };
    a.appendChild(x);
    return a;
  }

  function vazio(titulo, texto) {
    var v = el('div', 'vazio');
    v.appendChild(el('h2', null, titulo));
    v.appendChild(el('p', null, texto));
    return v;
  }

  R.el = el; R.limpa = limpa; R.kpis = kpis; R.bloco = bloco; R.par = par;
  R.aviso = aviso; R.vazio = vazio;
})(window);
