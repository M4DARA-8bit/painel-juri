import { useEffect, useRef } from 'react'
import { Gavinhas } from '../lib/gavinhas'

/**
 * Fundo vivo do herói: gavinhas que crescem das bordas e emolduram o texto.
 * Fica atrás do conteúdo, não recebe clique, pausa fora de quadro e, sob
 * prefers-reduced-motion, desenha um quadro só, já crescido.
 */
export function FundoGavinhas({ className }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null)
  const fundo = useRef<HTMLCanvasElement>(null)
  const frente = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const no = caixa.current
    const cA = fundo.current
    const cB = frente.current
    if (!no || !cA || !cB) return

    const ctxA = cA.getContext('2d')
    const ctxB = cB.getContext('2d')
    if (!ctxA || !ctxB) return // sem canvas, fica só o gradiente do CSS

    const parado = matchMedia('(prefers-reduced-motion: reduce)').matches
    let quadro = 0
    let sim: Gavinhas | null = null
    let visivel = true
    let rolando = 0
    let ultimo = performance.now()

    const montar = () => {
      const r = no.getBoundingClientRect()
      const dpr = Math.min(1.5, devicePixelRatio || 1)
      const estreito = r.width < 760
      for (const c of [cA, cB]) {
        c.width = Math.max(1, Math.round(r.width * dpr))
        c.height = Math.max(1, Math.round(r.height * dpr))
        c.style.width = `${r.width}px`
        c.style.height = `${r.height}px`
      }
      ctxA.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctxB.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctxA.clearRect(0, 0, r.width, r.height)
      ctxB.clearRect(0, 0, r.width, r.height)
      sim = new Gavinhas(ctxA, ctxB, r.width, r.height, {
        corCaule: '#3f7a2e',
        corFolha: '#8cc63f',
        corNervura: '#2a5a22',
        corBotao: '#f7faf2',
        evitar: estreito
          ? { cx: 0.5, cy: 0.34, rx: 0.95, ry: 0.62 }
          : { cx: 0.3, cy: 0.5, rx: 0.42, ry: 0.54 },
        sementes: estreito ? 5 : 10,
        somenteBase: estreito,
        segundosMax: 45,
      })
      if (parado) sim.imediato()
    }

    const laco = (agora: number) => {
      const dt = Math.min(0.05, (agora - ultimo) / 1000)
      ultimo = agora
      if (sim && visivel && !sim.terminou) sim.passo(dt, rolando > 0 ? 2 : 1)
      rolando = Math.max(0, rolando - dt)
      quadro = requestAnimationFrame(laco)
    }

    montar()
    if (!parado) quadro = requestAnimationFrame(laco)

    const aoRolar = () => {
      rolando = 0.4
    }
    const observador = new IntersectionObserver((e) => e.forEach((x) => (visivel = x.isIntersecting)))
    observador.observe(no)
    const aoTrocarAba = () => {
      visivel = !document.hidden
    }
    const redimensionar = new ResizeObserver(() => montar())
    redimensionar.observe(no)
    addEventListener('scroll', aoRolar, { passive: true })
    document.addEventListener('visibilitychange', aoTrocarAba)

    return () => {
      cancelAnimationFrame(quadro)
      observador.disconnect()
      redimensionar.disconnect()
      removeEventListener('scroll', aoRolar)
      document.removeEventListener('visibilitychange', aoTrocarAba)
    }
  }, [])

  return (
    <div className={'gavinhas ' + (className ?? '')} ref={caixa} aria-hidden="true">
      <canvas ref={fundo} />
      <canvas ref={frente} />
    </div>
  )
}
