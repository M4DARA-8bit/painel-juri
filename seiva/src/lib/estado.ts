import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { precoMontagem, type Montagem } from '../data/vasos'
import { plantas } from '../data/plantas'

export const montagemPadrao: Montagem = {
  forma: 'cilindro',
  material: 'ceramicaFosca',
  cor: '#c9c2b4',
  diametroCm: 18,
  prato: true,
  suporte: 'nenhum',
}

export type ItemCarrinho = {
  chave: string
  plantaId: string
  montagem: Montagem
  quantidade: number
  preco: number
}

type Loja = {
  itens: ItemCarrinho[]
  gaveta: boolean
  adicionar: (plantaId: string, montagem: Montagem) => void
  remover: (chave: string) => void
  mudarQuantidade: (chave: string, delta: number) => void
  abrirGaveta: (v: boolean) => void
  total: () => number
}

export const useLoja = create<Loja>()(
  persist(
    (set, get) => ({
      itens: [],
      gaveta: false,
      adicionar: (plantaId, montagem) => {
        const planta = plantas.find((p) => p.id === plantaId)
        if (!planta) return
        const chave = plantaId + '|' + JSON.stringify(montagem)
        const preco = precoMontagem(planta.precoBase, montagem)
        const existente = get().itens.find((i) => i.chave === chave)
        set({
          gaveta: true,
          itens: existente
            ? get().itens.map((i) => (i.chave === chave ? { ...i, quantidade: i.quantidade + 1 } : i))
            : [...get().itens, { chave, plantaId, montagem, quantidade: 1, preco }],
        })
      },
      remover: (chave) => set({ itens: get().itens.filter((i) => i.chave !== chave) }),
      mudarQuantidade: (chave, delta) =>
        set({
          itens: get()
            .itens.map((i) => (i.chave === chave ? { ...i, quantidade: i.quantidade + delta } : i))
            .filter((i) => i.quantidade > 0),
        }),
      abrirGaveta: (v) => set({ gaveta: v }),
      total: () => get().itens.reduce((s, i) => s + i.preco * i.quantidade, 0),
    }),
    { name: 'seiva-carrinho', partialize: (s) => ({ itens: s.itens }) as never },
  ),
)

/** Montagem em edição, por planta: o montador e o estúdio de foto compartilham. */
type Oficina = {
  porPlanta: Record<string, Montagem>
  definir: (plantaId: string, m: Partial<Montagem>) => void
  montagemDe: (plantaId: string) => Montagem
}

export const useOficina = create<Oficina>()(
  persist(
    (set, get) => ({
      porPlanta: {},
      definir: (plantaId, m) =>
        set({
          porPlanta: {
            ...get().porPlanta,
            [plantaId]: { ...montagemPadrao, ...get().porPlanta[plantaId], ...m },
          },
        }),
      montagemDe: (plantaId) => get().porPlanta[plantaId] ?? montagemPadrao,
    }),
    { name: 'seiva-oficina' },
  ),
)
