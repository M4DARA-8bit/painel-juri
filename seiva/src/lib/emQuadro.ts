import { useEffect, useRef, useState } from 'react'

/**
 * Diz se o elemento está em quadro. Serve para montar cena pesada só quando
 * ela aparece e para congelar o laço de render quando ela sai.
 */
export function useEmQuadro<T extends HTMLElement>(margem = '200px') {
  const ref = useRef<T | null>(null)
  const [visivel, setVisivel] = useState(false)
  const [jaApareceu, setJaApareceu] = useState(false)

  useEffect(() => {
    const no = ref.current
    if (!no) return
    const obs = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          setVisivel(e.isIntersecting)
          if (e.isIntersecting) setJaApareceu(true)
        }),
      { rootMargin: margem },
    )
    obs.observe(no)
    return () => obs.disconnect()
  }, [margem])

  return { ref, visivel, jaApareceu }
}
