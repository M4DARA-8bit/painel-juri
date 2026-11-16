import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { plantas } from '../data/plantas'
import { aplicar, filtrosVazios, type Filtros as TipoFiltros } from '../lib/filtros'
import { Cartao } from './Cartao'
import { Filtros } from './Filtros'
import { Cena3D } from './Cena3D'
import { ir } from '../lib/rota'
import { montagemPadrao } from '../lib/estado'
import { formasVaso, materiaisVaso, type Montagem } from '../three/vaso'

export function Catalogo() {
  const [filtros, setFiltros] = useState<TipoFiltros>(filtrosVazios)
  const lista = useMemo(() => aplicar(plantas, filtros), [filtros])

  return (
    <>
      <Heroi />
      <section className="recuo secao-catalogo" id="catalogo">
        <div className="catalogo-cabeca">
          <h2>O viveiro</h2>
          <p>
            Doze espécies, cada ficha com a fonte de onde o dado saiu. Filtre pelo que você tem em
            casa: a luz da janela, a paciência para regar, o bicho que mora com você.
          </p>
        </div>
        <div className="catalogo-grade">
          <aside className="catalogo-rail">
            <Filtros filtros={filtros} mudar={setFiltros} resultados={lista.length} />
          </aside>
          <div className="catalogo-cartoes">
            {lista.map((p, i) => (
              <Cartao key={p.id} planta={p} indice={i} />
            ))}
            {lista.length === 0 && (
              <div className="vazio">
                <h3>Nenhuma planta atende a tudo isso</h3>
                <p>
                  Solte o filtro de luz primeiro: é o que mais restringe. Depois volte a marcar
                  “segura para cães e gatos”, se for o seu caso.
                </p>
                <button className="botao botao--principal" onClick={() => setFiltros(filtrosVazios)}>
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

const destaques = ['costela-de-adao', 'espada-de-sao-jorge', 'samambaia', 'lavanda']

function Heroi() {
  const semMovimento = useReducedMotion()
  const [i, setI] = useState(0)
  const [montagem, setMontagem] = useState<Montagem>({ ...montagemPadrao, diametroCm: 22 })
  const planta = plantas.find((p) => p.id === destaques[i])!

  return (
    <header className="heroi">
      <div className="recuo heroi-grade">
        <div className="heroi-texto">
          <motion.h1
            initial={semMovimento ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            A planta certa para a luz que você tem
          </motion.h1>
          <p className="heroi-linha">
            Gire o modelo, troque o vaso e o suporte, e veja a peça montada na foto do seu canto antes
            de comprar. Cada número da ficha — porte, rega, luz, cheiro — vem com a fonte ao lado.
          </p>
          <div className="heroi-acoes">
            <a className="botao botao--principal" href="#catalogo">
              Ver as doze plantas
            </a>
            <button className="botao botao--vazado" onClick={() => ir(`foto/${planta.id}`)}>
              Testar na minha parede
            </button>
          </div>
          <dl className="heroi-dados">
            <div>
              <dt>Modelo 3D</dt>
              <dd>gerado por código, nada de foto de banco de imagem</dd>
            </div>
            <div>
              <dt>Ficha com fonte</dt>
              <dd>extensões universitárias, RHS, jardins botânicos</dd>
            </div>
          </dl>
        </div>

        <div className="heroi-palco">
          <div className="heroi-vidro">
          <Cena3D
            planta={planta}
            montagem={montagem}
            altura="min(58vh, 460px)"
            interativo
            girar={!semMovimento}
            rotulo={`Modelo 3D de ${planta.nome}, girável`}
          />
          </div>
          <div className="heroi-controles">
            <div className="heroi-seletor" role="group" aria-label="Escolher planta do palco">
              {destaques.map((id, k) => {
                const p = plantas.find((x) => x.id === id)!
                return (
                  <button
                    key={id}
                    className={'chip' + (k === i ? ' is-ativo' : '')}
                    aria-pressed={k === i}
                    onClick={() => setI(k)}
                  >
                    {p.nome}
                  </button>
                )
              })}
            </div>
            <div className="heroi-vaso">
              <label>
                <span>Vaso</span>
                <select
                  value={montagem.forma}
                  onChange={(e) => setMontagem({ ...montagem, forma: e.target.value as Montagem['forma'] })}
                >
                  {formasVaso.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Acabamento</span>
                <select
                  value={montagem.material}
                  onChange={(e) => {
                    const material = e.target.value as Montagem['material']
                    const padrao = materiaisVaso.find((m) => m.id === material)!.corPadrao
                    setMontagem({ ...montagem, material, cor: padrao })
                  }}
                >
                  {materiaisVaso.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="heroi-dica">
              Arraste para girar. O catálogo inteiro usa este mesmo modelo, no vaso que você escolher.
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
