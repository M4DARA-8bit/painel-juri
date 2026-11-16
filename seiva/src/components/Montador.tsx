import { plantas } from '../data/plantas'
import { brl } from '../lib/formato'
import { ir } from '../lib/rota'
import { montagemPadrao, useLoja, useOficina } from '../lib/estado'
import { Cena3DTardia as Cena3D } from './Cena3DTardia'
import { useEmQuadro } from '../lib/emQuadro'
import {
  formasVaso,
  materiaisVaso,
  precoMontagem,
  suportes,
  type Montagem,
} from '../data/vasos'

const DIAMETROS = [12, 15, 18, 22, 26, 32]

const CORES = [
  '#c9c2b4', '#f3f1e7', '#9a9a95', '#2f6f86', '#17301f',
  '#b6472f', '#d8b25e', '#c7347a', '#6b4a35', '#8d8f93',
]

export function Montador({ id }: { id: string }) {
  const planta = plantas.find((p) => p.id === id)
  const definir = useOficina((s) => s.definir)
  const montagem = useOficina((s) => s.porPlanta[id]) ?? montagemPadrao
  const adicionar = useLoja((s) => s.adicionar)
  const palco = useEmQuadro<HTMLDivElement>('0px')

  if (!planta) return null

  const total = precoMontagem(planta.precoBase, montagem)
  const material = materiaisVaso.find((m) => m.id === montagem.material)!
  const suporte = suportes.find((s) => s.id === montagem.suporte)!
  const mudar = (m: Partial<Montagem>) => definir(id, m)

  return (
    <section className="montador">
      <div className="recuo montador-grade">
        <div className="montador-palco" ref={palco.ref}>
          <Cena3D
            planta={planta}
            montagem={montagem}
            altura="min(66vh, 560px)"
            interativo
            ativo={palco.visivel}
          />
          <p className="planta-dica">
            {planta.nome} em vaso de {montagem.diametroCm} cm, {material.nome.toLowerCase()}
            {montagem.suporte !== 'nenhum' ? `, com ${suporte.nome.toLowerCase()}` : ''}.
          </p>
        </div>

        <div className="montador-painel">
          <nav className="migalha">
            <a
              href={`#planta/${id}`}
              onClick={(e) => {
                e.preventDefault()
                ir(`planta/${id}`)
              }}
            >
              {planta.nome}
            </a>
            <span aria-hidden="true">/</span>
            <span>Montagem</span>
          </nav>
          <h1>Monte a sua</h1>
          <p className="montador-linha">
            Toda combinação é possível: a peça é montada depois do pedido, no viveiro.
          </p>

          <fieldset className="bloco">
            <legend>Forma do vaso</legend>
            <div className="grupo-etiquetas">
              {formasVaso.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={montagem.forma === f.id}
                  className={'chip' + (montagem.forma === f.id ? ' is-ativo' : '')}
                  onClick={() => mudar({ forma: f.id })}
                >
                  {f.nome}
                  <small>{f.nota}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="bloco">
            <legend>Acabamento</legend>
            <div className="grupo-etiquetas">
              {materiaisVaso.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={montagem.material === m.id}
                  className={'chip' + (montagem.material === m.id ? ' is-ativo' : '')}
                  onClick={() => mudar({ material: m.id, cor: m.corPadrao })}
                >
                  {m.nome}
                  <small>{m.nota}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="bloco">
            <legend>Cor</legend>
            <div className="grupo-cores">
              {CORES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={'amostra' + (montagem.cor.toLowerCase() === c ? ' is-ativo' : '')}
                  style={{ background: c }}
                  aria-label={`Cor ${c}`}
                  aria-pressed={montagem.cor.toLowerCase() === c}
                  onClick={() => mudar({ cor: c })}
                />
              ))}
              <label className="amostra-livre">
                <input
                  type="color"
                  value={montagem.cor}
                  onChange={(e) => mudar({ cor: e.target.value })}
                  aria-label="Escolher outra cor"
                />
                <span>Outra</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="bloco">
            <legend>Diâmetro da boca</legend>
            <div className="grupo-etiquetas">
              {DIAMETROS.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={montagem.diametroCm === d}
                  className={'chip' + (montagem.diametroCm === d ? ' is-ativo' : '')}
                  onClick={() => mudar({ diametroCm: d })}
                >
                  {d} cm
                </button>
              ))}
            </div>
            <p className="nota">
              Vaso maior que o cepo acelera o crescimento e segura mais água — e exige substrato que
              drene bem.
            </p>
          </fieldset>

          <fieldset className="bloco">
            <legend>Suporte</legend>
            <div className="grupo-etiquetas">
              {suportes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={montagem.suporte === s.id}
                  className={'chip' + (montagem.suporte === s.id ? ' is-ativo' : '')}
                  onClick={() => mudar({ suporte: s.id })}
                >
                  {s.nome}
                  <small>{s.nota}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="linha-opcao">
            <input
              type="checkbox"
              checked={montagem.prato}
              onChange={(e) => mudar({ prato: e.target.checked })}
            />
            <span>
              Prato embaixo
              <small>protege o móvel; em macramê e mão-francesa o prato não é montado</small>
            </span>
          </label>

          <div className="montador-conta">
            <dl>
              <div>
                <dt>{planta.nome}</dt>
                <dd>{brl(planta.precoBase)}</dd>
              </div>
              <div>
                <dt>
                  Vaso {formasVaso.find((f) => f.id === montagem.forma)!.nome.toLowerCase()} de{' '}
                  {montagem.diametroCm} cm, {material.nome.toLowerCase()}
                </dt>
                <dd>incluído</dd>
              </div>
              {montagem.suporte !== 'nenhum' && (
                <div>
                  <dt>{suporte.nome}</dt>
                  <dd>incluído</dd>
                </div>
              )}
              <div className="total">
                <dt>Total da peça montada</dt>
                <dd>{brl(total)}</dd>
              </div>
            </dl>
            <div className="montador-acoes">
              <button className="botao botao--principal" onClick={() => adicionar(id, montagem)}>
                Adicionar ao carrinho
              </button>
              <button className="botao botao--vazado" onClick={() => ir(`foto/${id}`)}>
                Ver essa montagem no meu espaço
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
