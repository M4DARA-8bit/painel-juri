import { useMemo, useState } from 'react'
import { plantas } from '../data/plantas'
import { textoRega } from '../lib/formato'
import { ir } from '../lib/rota'
import { useLoja } from '../lib/estado'

const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
const SEMANAS = 4
const PADRAO = ['samambaia', 'manjericao', 'lirio-da-paz', 'jiboia', 'espada-de-sao-jorge', 'babosa']

/** Cores de identificação, tiradas do sistema, distinguíveis entre si. */
const CORES = ['#3f7a2e', '#2f6f86', '#d59a2b', '#c7347a', '#6b4a35', '#17301f', '#7b9b3a', '#8d6fb0']

const corDe = (id: string, lista: string[]) => CORES[Math.max(0, lista.indexOf(id)) % CORES.length]

/**
 * Deslocamento inicial por espécie: sem isso toda planta cairia no mesmo dia
 * e a semana da compra viraria um mutirão.
 */
const deslocamento = (id: string, passo: number) => {
  let soma = 0
  for (let i = 0; i < id.length; i++) soma += id.charCodeAt(i)
  return soma % passo
}

/** Intervalo médio de rega da espécie, em dias inteiros. */
const intervalo = (id: string) => {
  const p = plantas.find((x) => x.id === id)!
  const [a, b] = p.rega.valor.diasEntreRegas
  return Math.max(1, Math.round((a + b) / 2))
}

/** Segunda-feira da semana corrente, para a grade começar alinhada. */
function segundaDestaSemana(hoje: Date) {
  const d = new Date(hoje)
  d.setHours(0, 0, 0, 0)
  const desloca = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - desloca)
  return d
}

export function Rotina() {
  const itens = useLoja((s) => s.itens)
  const doCarrinho = [...new Set(itens.map((i) => i.plantaId))]
  const [escolhidas, setEscolhidas] = useState<string[]>(doCarrinho.length ? doCarrinho : PADRAO)
  const [emFoco, setEmFoco] = useState<string | null>(null)
  const [fixada, setFixada] = useState<string | null>(null)
  const destacada = fixada ?? emFoco

  const hoje = useMemo(() => new Date(), [])
  const inicio = useMemo(() => segundaDestaSemana(hoje), [hoje])

  const proximaRega = (id: string) => {
    const passo = intervalo(id)
    return (deslocamento(id, passo) + passo * 10) % passo
  }

  const { dias, regasDaSemana } = useMemo(() => {
    const total = SEMANAS * 7
    const dias = Array.from({ length: total }, (_, i) => {
      const data = new Date(inicio)
      data.setDate(inicio.getDate() + i)
      const passado = data < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
      const regas = escolhidas.filter((id) => {
        const passo = intervalo(id)
        const base = new Date(hoje)
        base.setHours(0, 0, 0, 0)
        const desde = Math.round((data.getTime() - base.getTime()) / 86400000)
        return desde >= 0 && (desde - deslocamento(id, passo) + passo * 10) % passo === 0
      })
      return { data, passado, regas }
    })
    const regasDaSemana = dias.slice(0, 7).reduce((s, d) => s + d.regas.length, 0)
    return { dias, regasDaSemana }
  }, [escolhidas, inicio, hoje])

  const alternar = (id: string) =>
    setEscolhidas((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id].slice(0, 8),
    )

  return (
    <article className="rotina">
      <div className="recuo rotina-cabeca">
        <h1>Rotina de rega</h1>
        <p>
          Quatro semanas com as plantas que você escolher. O intervalo de cada espécie é a média da
          faixa da ficha — ajuste pelo dedo no substrato, não pelo calendário: luz, calor e tamanho do
          vaso mudam tudo.
        </p>
      </div>

      <div className="recuo rotina-grade">
        <section className="rotina-calendario" aria-label="Calendário de quatro semanas">
          <p className="rotina-resumo" aria-live="polite">
            Nesta semana: <strong>{regasDaSemana}</strong> {regasDaSemana === 1 ? 'rega' : 'regas'}
            {destacada && (
              <span className="rotina-resumo-filtro">
                {(() => {
                  const nome = plantas.find((p) => p.id === destacada)!.nome
                  const naJanela = dias.some((d) => d.regas.includes(destacada))
                  if (naJanela) return `destacando ${nome}`
                  const falta = proximaRega(destacada)
                  return `${nome} não rega nestes 28 dias: a próxima cai em ${falta} dias`
                })()}
              </span>
            )}
          </p>

          <div className="rotina-cabecalho-dias" aria-hidden="true">
            {DIAS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <ol className="rotina-dias">
            {dias.map((d, i) => {
              const ehHoje = d.data.toDateString() === new Date().toDateString()
              const mostradas = destacada ? d.regas.filter((r) => r === destacada) : d.regas
              return (
                <li
                  key={i}
                  className={
                    'rotina-dia' +
                    (d.passado ? ' is-passado' : '') +
                    (ehHoje ? ' is-hoje' : '') +
                    (destacada && !mostradas.length ? ' is-apagado' : '')
                  }
                >
                  <span className="rotina-numero">{d.data.getDate()}</span>
                  <span className="rotina-pontos">
                    {mostradas.map((id) => (
                      <span
                        key={id}
                        className="rotina-ponto"
                        style={{ background: corDe(id, escolhidas) }}
                        title={`Regar ${plantas.find((x) => x.id === id)!.nome}`}
                      />
                    ))}
                  </span>
                  <span className="visualmente-oculto">
                    {d.data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}:{' '}
                    {mostradas.length
                      ? `regar ${mostradas.map((id) => plantas.find((p) => p.id === id)!.nome).join(', ')}`
                      : 'sem rega'}
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rotina-legenda" aria-label="Plantas na rotina">
          <h2>Quem está na rotina</h2>
          <ul>
            {plantas.map((p) => {
              const dentro = escolhidas.includes(p.id)
              return (
                <li key={p.id} className={dentro ? 'is-dentro' : ''}>
                  <button
                    type="button"
                    className={'rotina-linha' + (fixada === p.id ? ' is-fixada' : '')}
                    aria-pressed={dentro}
                    onPointerEnter={() => setEmFoco(p.id)}
                    onPointerLeave={() => setEmFoco(null)}
                    onFocus={() => setEmFoco(p.id)}
                    onBlur={() => setEmFoco(null)}
                    onClick={() => alternar(p.id)}
                    onDoubleClick={() => setFixada(fixada === p.id ? null : p.id)}
                  >
                    <span
                      className="rotina-cor"
                      style={{ background: dentro ? corDe(p.id, escolhidas) : 'var(--musgo-18)' }}
                      aria-hidden="true"
                    />
                    <span className="rotina-nome">
                      {p.nome}
                      <em>{p.cientifico}</em>
                    </span>
                    <span className="rotina-intervalo">
                      {textoRega(p.rega.valor.diasEntreRegas)}
                      <small>a cada {intervalo(p.id)} dias</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="nota">
            Clique para entrar ou sair da rotina; passe o mouse para ver só os dias daquela planta.
            Até oito plantas por vez.
          </p>
          <button className="botao botao--vazado" onClick={() => ir('')}>
            Escolher mais plantas
          </button>
        </section>
      </div>
    </article>
  )
}
