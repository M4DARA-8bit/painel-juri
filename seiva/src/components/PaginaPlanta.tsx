import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { plantas } from '../data/plantas'
import { rotuloLuz } from '../data/tipos'
import { brl, faixaCm, textoRega, vezesPorMes } from '../lib/formato'
import { ir } from '../lib/rota'
import { montagemPadrao, useOficina } from '../lib/estado'
import { Cena3DTardia as Cena3D } from './Cena3DTardia'
import { fotos } from '../data/fotos'
import { EtiquetaPet, Fontes, MedidorCheiro, MedidorLuz, MedidorRega } from './Medidores'

export function PaginaPlanta({ id }: { id: string }) {
  const planta = plantas.find((p) => p.id === id)
  const montagem = useOficina((s) => s.porPlanta[id]) ?? montagemPadrao
  const semMovimento = useReducedMotion()
  const [modelo, setModelo] = useState(false)

  if (!planta) {
    return (
      <section className="recuo vazio">
        <h2>Essa planta não está no viveiro</h2>
        <button className="botao botao--principal" onClick={() => ir('')}>
          Voltar ao catálogo
        </button>
      </section>
    )
  }

  const l = planta.luz.valor
  const a = planta.ambiente.valor

  return (
    <article className="pagina-planta">
      <div className="recuo planta-topo">
        <div className="planta-visor">
          {modelo ? (
            <Cena3D
              planta={planta}
              montagem={montagem}
              altura="min(54vh, 460px)"
              interativo
              girar={!semMovimento}
            />
          ) : (
            <img
              className="planta-foto"
              src={fotos[planta.id].arquivo}
              srcSet={`${fotos[planta.id].pequena} 560w, ${fotos[planta.id].arquivo} 1000w`}
              sizes="(max-width: 1040px) 92vw, 620px"
              width={1000}
              height={1000}
              alt={`${planta.nome} (${planta.cientifico})`}
            />
          )}
          <div className="planta-visor-pe">
            <button className="botao botao--texto" onClick={() => setModelo((v) => !v)}>
              {modelo ? 'Voltar para a foto' : 'Ver o modelo 3D'}
            </button>
            <p className="planta-dica">
              {modelo ? (
                'Arraste para girar, use a roda para aproximar.'
              ) : (
                <>
                  Foto: {fotos[planta.id].autor}, {fotos[planta.id].licenca},{' '}
                  <a href={fotos[planta.id].pagina} target="_blank" rel="noopener noreferrer">
                    via Wikimedia Commons
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <motion.div
          className="planta-cabeca"
          initial={semMovimento ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="migalha">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                ir('')
              }}
            >
              Viveiro
            </a>
            <span aria-hidden="true">/</span>
            <span>{planta.nome}</span>
          </nav>
          <h1>{planta.nome}</h1>
          <p className="cientifico cientifico--grande">{planta.cientifico}</p>
          <p className="planta-resumo">{planta.resumo}</p>
          <EtiquetaPet nivel={planta.pet.valor} />
          <p className="planta-preco">
            {brl(planta.precoBase)} <span>a planta, sem vaso</span>
          </p>
          <div className="planta-acoes">
            <button className="botao botao--principal" onClick={() => ir(`montador/${planta.id}`)}>
              Montar vaso e suporte
            </button>
            <button className="botao botao--vazado" onClick={() => ir(`foto/${planta.id}`)}>
              Ver no meu espaço
            </button>
          </div>
        </motion.div>
      </div>

      <section className="recuo ficha">
        <h2>Ficha</h2>
        <div className="ficha-linhas">
          <Linha rotulo="Tamanho adulto" fontes={planta.porte.fontes} planta={planta}>
            <strong>
              {faixaCm(planta.porte.valor.alturaCm)} de altura, {faixaCm(planta.porte.valor.larguraCm)} de
              largura
            </strong>
            <p>{planta.porte.texto}</p>
          </Linha>

          <Linha rotulo="Quantas vezes regar" fontes={planta.rega.fontes} planta={planta}>
            <strong>
              {textoRega(planta.rega.valor.diasEntreRegas)} ({vezesPorMes(planta.rega.valor.diasEntreRegas)})
            </strong>
            <MedidorRega dias={planta.rega.valor.diasEntreRegas} />
            <p>{planta.rega.texto}</p>
            <p className="nota">No frio: {planta.rega.valor.inverno}</p>
          </Linha>

          <Linha rotulo="Quanto sol" fontes={planta.luz.fontes} planta={planta}>
            <strong>
              {rotuloLuz[l.nivel]}
              {l.horasSolDireto ? ` — ${l.horasSolDireto[0]} a ${l.horasSolDireto[1]} h de sol direto` : ''}
            </strong>
            <MedidorLuz nivel={l.nivel} />
            <p>{planta.luz.texto}</p>
          </Linha>

          <Linha rotulo="Ambiente que ela precisa" fontes={planta.ambiente.fontes} planta={planta}>
            <strong>
              {[a.interno && 'interno', a.externo && 'varanda ou área externa coberta']
                .filter(Boolean)
                .join(' ou ')}
              {a.umidadePct ? `, umidade de ${a.umidadePct[0]}% a ${a.umidadePct[1]}%` : ''}
              {a.tempC ? `, entre ${a.tempC[0]} °C e ${a.tempC[1]} °C` : ''}
            </strong>
            <p>{planta.ambiente.texto}</p>
          </Linha>

          <Linha rotulo="Cheiro" fontes={planta.cheiro.fontes} planta={planta}>
            <MedidorCheiro intensidade={planta.cheiro.valor.intensidade} nota={planta.cheiro.valor.nota} />
            <p>{planta.cheiro.texto}</p>
          </Linha>

          <Linha rotulo="O que ela agrega no ambiente" fontes={planta.agrega.fontes} planta={planta}>
            <ul className="lista-agrega">
              {planta.agrega.valor.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p>{planta.agrega.texto}</p>
          </Linha>

          <Linha rotulo="Melhor lugar da casa" fontes={planta.lugares.fontes} planta={planta}>
            <ul className="lista-lugares">
              {planta.lugares.valor.map((x) => (
                <li key={x.lugar}>
                  <strong>{x.lugar}</strong>
                  <span>{x.porque}</span>
                </li>
              ))}
            </ul>
            <p>{planta.lugares.texto}</p>
          </Linha>

          <Linha rotulo="Com crianças e pets" fontes={planta.pet.fontes} planta={planta}>
            <EtiquetaPet nivel={planta.pet.valor} />
            <p>{planta.pet.texto}</p>
          </Linha>
        </div>
      </section>

      <section className="recuo fontes-lista">
        <h2>De onde vieram esses dados</h2>
        <ol>
          {planta.fontes.map((f, i) => (
            <li key={f.id} id={`fonte-${planta.id}-${i + 1}`}>
              <a href={f.url} target="_blank" rel="noopener noreferrer">
                {f.titulo}
              </a>
              <span className="veiculo">{f.veiculo}</span>
            </li>
          ))}
        </ol>
        <p className="nota">
          Os valores de rega e luz são faixas, não receitas: dependem do seu vaso, do substrato e da
          estação. Quando as fontes divergiam, a ficha mostra o intervalo em vez de escolher um número.
        </p>
      </section>
    </article>
  )
}

function Linha({
  rotulo,
  children,
  fontes,
  planta,
}: {
  rotulo: string
  children: React.ReactNode
  fontes: string[]
  planta: (typeof plantas)[number]
}) {
  return (
    <div className="ficha-linha">
      <h3>
        {rotulo}
        <Fontes ids={fontes} planta={planta} />
      </h3>
      <div className="ficha-valor">{children}</div>
    </div>
  )
}
