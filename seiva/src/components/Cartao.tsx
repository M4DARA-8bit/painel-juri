import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Planta } from '../data/tipos'
import { brl, faixaCm } from '../lib/formato'
import { ir } from '../lib/rota'
import { Cena3D } from './Cena3D'
import { EtiquetaPet, MedidorCheiro, MedidorLuz, MedidorRega } from './Medidores'
import { montagemPadrao, useOficina } from '../lib/estado'

/** Monta a cena só quando o cartão entra em quadro: 12 canvas ao mesmo tempo pesa. */
function useEmQuadro<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const no = ref.current
    if (!no || visivel) return
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setVisivel(true)),
      { rootMargin: '220px' },
    )
    obs.observe(no)
    return () => obs.disconnect()
  }, [visivel])
  return { ref, visivel }
}

export function Cartao({ planta, indice }: { planta: Planta; indice: number }) {
  const { ref, visivel } = useEmQuadro<HTMLElement>()
  const [sobre, setSobre] = useState(false)
  const semMovimento = useReducedMotion()
  const montagem = useOficina((s) => s.porPlanta[planta.id]) ?? montagemPadrao

  return (
    <motion.article
      ref={ref as never}
      className="cartao"
      initial={semMovimento ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(indice * 0.05, 0.4), ease: [0.2, 0.7, 0.2, 1] }}
      onPointerEnter={() => setSobre(true)}
      onPointerLeave={() => setSobre(false)}
      onFocus={() => setSobre(true)}
      onBlur={() => setSobre(false)}
    >
      <div className="cartao-visor">
        {visivel ? (
          <Cena3D
            planta={planta}
            montagem={montagem}
            altura={238}
            girar={sobre && !semMovimento}
            rotulo={`Modelo 3D de ${planta.nome}`}
          />
        ) : (
          <div className="cartao-visor-vazio" aria-hidden="true" />
        )}
      </div>

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
