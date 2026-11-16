import { plantas } from '../data/plantas'

export function PaginaCuidado() {
  const todas = new Map<string, { titulo: string; veiculo: string; url: string; usos: string[] }>()
  for (const p of plantas) {
    for (const f of p.fontes) {
      const atual = todas.get(f.url)
      if (atual) atual.usos.push(p.nome)
      else todas.set(f.url, { titulo: f.titulo, veiculo: f.veiculo, url: f.url, usos: [p.nome] })
    }
  }
  const lista = [...todas.values()].sort((a, b) => b.usos.length - a.usos.length)

  return (
    <article className="recuo pagina-texto">
      <h1>Como a ficha foi escrita</h1>
      <p>
        Cada número desta loja veio de uma fonte pública e está citado na página da planta. Quando as
        fontes divergiam — e divergem muito sobre rega e horas de sol — a ficha mostra o intervalo
        inteiro em vez de escolher um número e fingir precisão.
      </p>

      <h2>A ordem de preferência das fontes</h2>
      <ol className="lista-ordem">
        <li>
          <strong>Extensões universitárias e jardins botânicos</strong>
          <span>
            Purdue, Clemson, University of Illinois, UC Master Gardeners, Royal Horticultural Society,
            New York Botanical Garden. Material revisado, com valor numérico.
          </span>
        </li>
        <li>
          <strong>Publicações de horticultura de referência</strong>
          <span>Gardeners’ World, The Old Farmer’s Almanac, Gardening Know How, Bob Vila.</span>
        </li>
        <li>
          <strong>Viveiros e produtores</strong>
          <span>
            Costa Farms, White Flower Farm, Logee’s, Gardener’s Supply. Úteis para porte comercial e
            condições de floração.
          </span>
        </li>
      </ol>

      <h2>Sobre “planta que purifica o ar”</h2>
      <p>
        A lista famosa vem do relatório da NASA de 1989, feito em câmara selada, sem troca de ar. Em
        2020, Cummings e Waring, da Universidade Drexel, reanalisaram 196 experimentos de 12 estudos
        e concluíram que plantas em vaso não mudam de forma relevante a concentração de compostos
        orgânicos voláteis num ambiente real: a ventilação do prédio, ou uma janela aberta, faz muito
        mais. Por isso nenhuma ficha aqui promete ar mais limpo. O que as plantas entregam de
        concreto é o que está escrito em “o que ela agrega no ambiente”: forma, cor, cheiro, sombra,
        comida, rotina.
      </p>

      <h2>Sobre toxicidade</h2>
      <p>
        O aviso de pet e criança segue a lista de plantas tóxicas e não tóxicas da ASPCA, citada pelas
        fontes de cada ficha. “Tóxica” aqui quer dizer que mastigar causa irritação ou mal-estar, não
        que a presença da planta no ambiente faça mal. Na dúvida, mantenha fora do alcance.
      </p>

      <h2>Todas as fontes usadas</h2>
      <ul className="lista-fontes">
        {lista.map((f) => (
          <li key={f.url}>
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              {f.titulo}
            </a>
            <span className="veiculo">{f.veiculo}</span>
            <span className="nota">Usada em: {f.usos.join(', ')}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
