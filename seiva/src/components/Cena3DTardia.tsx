import { lazy, Suspense, useEffect, useState } from 'react'
import type { Props } from './Cena3D'

/**
 * O three.js é o maior pedaço do site. Carregá-lo junto com a página fazia a
 * primeira pintura esperar por ele, então a cena vira um pedaço separado,
 * buscado só quando alguém realmente vai ver um modelo.
 */
const Cena3D = lazy(() => import('./Cena3D').then((m) => ({ default: m.Cena3D })))

export function Cena3DTardia(props: Props & { esperaMs?: number }) {
  const { esperaMs = 0, altura = 320, ...resto } = props
  const [montar, setMontar] = useState(esperaMs === 0)

  useEffect(() => {
    if (montar) return
    const janela = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
    }
    if (janela.requestIdleCallback) {
      const id = janela.requestIdleCallback(() => setMontar(true), { timeout: esperaMs })
      return () => (window as unknown as { cancelIdleCallback?: (i: number) => void }).cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setMontar(true), esperaMs)
    return () => clearTimeout(t)
  }, [montar, esperaMs])

  const vazio = (
    <div className="cena-carregando" style={{ height: altura }} aria-hidden="true">
      <span />
    </div>
  )

  if (!montar) return vazio
  return (
    <Suspense fallback={vazio}>
      <Cena3D {...resto} altura={altura} />
    </Suspense>
  )
}
