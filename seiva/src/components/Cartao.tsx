import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Planta } from '../data/tipos'
import { brl, faixaCm } from '../lib/formato'
import { ir } from '../lib/rota'
import { fotos } from '../data/fotos'
import { EtiquetaPet, MedidorCheiro, MedidorLuz, MedidorRega } from './Medidores'

/**
 * Cartão com foto da espécie. A cena 3D ficou fora daqui de propósito:
 * doze telas WebGL abertas ao mesmo tempo travavam a rolagem. O modelo
 * continua na página da planta, no montador e no estúdio de foto.
 */
export function Cartao({ planta, indice }: { planta: Planta; indice: number }) {
  const semMovimento = useReducedMotion()
  const [carregada, setCarregada] = useState(false)
  const foto = fotos[planta.id]

  return (
    <motion.article
      className="cartao"
      initial={semMovimento ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(indice * 0.05, 0.4), ease: [0.2, 0.7, 0.2, 1] }}
    >
      <a
        className="cartao-visor"
        href={`#planta/${planta.id}`}
        onClick={(e) => {
          e.preventDefault()
          ir(`planta/${planta.id}`)
        }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={foto.pequena}
          srcSet={`${foto.pequena} 560w, ${foto.arquivo} 1000w`}
          sizes="(max-width: 720px) 92vw, 300px"
          alt=""
          width={560}
          height={560}
          loading={indice < 3 ? 'eager' : 'lazy'}
          decoding="async"
          className={'cartao-foto' + (carregada ? ' is-pronta' : '')}
          onLoad={() => setCarregada(true)}
        />
      </a>

      <div className="cartao-corpo">
        <header className="cartao-cabeca">
          <h3>
            <a
              href={`#planta/${planta.id}`}
              onClick={(e) => {
                e.preventDefault()
                ir(`planta/${planta.id}`)
              }}
            >
              {planta.nome}
            </a>
          </h3>
          <p className="cientifico">{planta.cientifico}</p>
          <span className="cartao-preco">{brl(planta.precoBase)}</span>
        </header>

        <p className="cartao-resumo">{planta.resumo}</p>

        <dl className="ficha-curta">
          <div>
            <dt>Porte</dt>
            <dd>{faixaCm(planta.porte.valor.alturaCm)}</dd>
          </div>
          <div>
            <dt>Luz</dt>
            <dd>
              <MedidorLuz nivel={planta.luz.valor.nivel} />
            </dd>
          </div>
          <div>
            <dt>Rega</dt>
            <dd>
              <MedidorRega dias={planta.rega.valor.diasEntreRegas} />
            </dd>
          </div>
          <div>
            <dt>Cheiro</dt>
            <dd>
              <MedidorCheiro intensidade={planta.cheiro.valor.intensidade} nota={planta.cheiro.valor.nota} />
            </dd>
          </div>
          <div>
            <dt>Melhor lugar</dt>
            <dd>{planta.lugares.valor[0]?.lugar}</dd>
          </div>
        </dl>

        <EtiquetaPet nivel={planta.pet.valor} />

        <div className="cartao-acoes">
          <button className="botao botao--principal" onClick={() => ir(`montador/${planta.id}`)}>
            Montar com vaso
          </button>
          <button className="botao botao--vazado" onClick={() => ir(`foto/${planta.id}`)}>
            Ver no meu espaço
          </button>
        </div>
      </div>
    </motion.article>
  )
}
