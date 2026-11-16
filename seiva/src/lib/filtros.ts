import type { Planta } from '../data/tipos'

export const LUGARES = [
  { id: 'sala', nome: 'Sala', chaves: ['sala', 'estante', 'escada', 'jantar'] },
  { id: 'quarto', nome: 'Quarto', chaves: ['quarto'] },
  { id: 'cozinha', nome: 'Cozinha', chaves: ['cozinha', 'pia'] },
  { id: 'banheiro', nome: 'Banheiro', chaves: ['banheiro'] },
  { id: 'escritorio', nome: 'Escritório', chaves: ['escritório'] },
  { id: 'varanda', nome: 'Varanda', chaves: ['varanda', 'janela'] },
  { id: 'entrada', nome: 'Entrada', chaves: ['hall', 'entrada', 'corredor'] },
] as const

export type LugarId = (typeof LUGARES)[number]['id']

export function lugaresDe(p: Planta): LugarId[] {
  const texto = (p.lugares.valor.map((l) => l.lugar + ' ' + l.porque).join(' ') + ' ' + p.lugares.texto)
    .toLowerCase()
  return LUGARES.filter((l) => l.chaves.some((c) => texto.includes(c))).map((l) => l.id)
}

export type RitmoRega = 'muita' | 'media' | 'pouca'

export function ritmoRega(p: Planta): RitmoRega {
  const media = (p.rega.valor.diasEntreRegas[0] + p.rega.valor.diasEntreRegas[1]) / 2
  if (media <= 7) return 'muita'
  if (media <= 15) return 'media'
  return 'pouca'
}

export const rotuloRitmo: Record<RitmoRega, string> = {
  muita: 'Rega frequente (até 1×/semana)',
  media: 'Rega média (a cada 10 a 15 dias)',
  pouca: 'Rega rara (de 2 semanas a 2 meses)',
}

export type Filtros = {
  busca: string
  luz: number[]
  rega: RitmoRega[]
  porte: string[]
  lugar: LugarId[]
  comCheiro: boolean
  petSeguro: boolean
  facil: boolean
  ordem: 'curadoria' | 'menor-preco' | 'maior-preco' | 'nome' | 'menos-rega'
}

export const filtrosVazios: Filtros = {
  busca: '',
  luz: [],
  rega: [],
  porte: [],
  lugar: [],
  comCheiro: false,
  petSeguro: false,
  facil: false,
  ordem: 'curadoria',
}

export function contarAtivos(f: Filtros) {
  return (
    f.luz.length +
    f.rega.length +
    f.porte.length +
    f.lugar.length +
    (f.comCheiro ? 1 : 0) +
    (f.petSeguro ? 1 : 0) +
    (f.facil ? 1 : 0) +
    (f.busca.trim() ? 1 : 0)
  )
}

export function aplicar(plantas: Planta[], f: Filtros): Planta[] {
  const busca = f.busca.trim().toLowerCase()
  const saida = plantas.filter((p) => {
    if (busca) {
      const campo = [p.nome, p.cientifico, p.resumo, p.cheiro.valor.nota, ...p.agrega.valor].join(' ').toLowerCase()
      if (!campo.includes(busca)) return false
    }
    if (f.luz.length && !f.luz.includes(p.luz.valor.nivel)) return false
    if (f.rega.length && !f.rega.includes(ritmoRega(p))) return false
    if (f.porte.length && !f.porte.includes(p.porte.valor.classe)) return false
    if (f.lugar.length) {
      const meus = lugaresDe(p)
      if (!f.lugar.some((l) => meus.includes(l))) return false
    }
    if (f.comCheiro && !p.cheiro.valor.tem) return false
    if (f.petSeguro && p.pet.valor !== 'seguro') return false
    if (f.facil && p.dificuldade > 1) return false
    return true
  })

  const porRega = (p: Planta) => (p.rega.valor.diasEntreRegas[0] + p.rega.valor.diasEntreRegas[1]) / 2
  switch (f.ordem) {
    case 'menor-preco':
      return saida.sort((a, b) => a.precoBase - b.precoBase)
    case 'maior-preco':
      return saida.sort((a, b) => b.precoBase - a.precoBase)
    case 'nome':
      return saida.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    case 'menos-rega':
      return saida.sort((a, b) => porRega(b) - porRega(a))
    default:
      return saida
  }
}
