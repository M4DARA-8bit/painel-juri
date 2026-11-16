import { useEffect, useState } from 'react'

export type Rota =
  | { tela: 'catalogo' }
  | { tela: 'planta'; id: string }
  | { tela: 'montador'; id: string }
  | { tela: 'foto'; id: string }
  | { tela: 'cuidado' }
  | { tela: 'rotina' }

export function lerRota(): Rota {
  const h = location.hash.replace(/^#\/?/, '')
  const [tela, id] = h.split('/')
  if (tela === 'planta' && id) return { tela: 'planta', id }
  if (tela === 'montador' && id) return { tela: 'montador', id }
  if (tela === 'foto' && id) return { tela: 'foto', id }
  if (tela === 'cuidado') return { tela: 'cuidado' }
  if (tela === 'rotina') return { tela: 'rotina' }
  return { tela: 'catalogo' }
}

export const ir = (caminho: string) => {
  location.hash = caminho
}

export function useRota() {
  const [rota, setRota] = useState<Rota>(lerRota)
  useEffect(() => {
    const ao = () => {
      setRota(lerRota())
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    addEventListener('hashchange', ao)
    return () => removeEventListener('hashchange', ao)
  }, [])
  return rota
}
