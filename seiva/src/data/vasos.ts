/**
 * Catálogo de vasos, suportes e cálculo de preço. Sem three.js de propósito:
 * o cartão, o carrinho e a lista de opções não devem puxar a biblioteca 3D.
 */
export type FormaVaso = 'cilindro' | 'cone' | 'tigela' | 'anfora' | 'cubo' | 'organico'
export type MaterialVaso =
  | 'ceramicaFosca'
  | 'ceramicaEsmaltada'
  | 'terracota'
  | 'concreto'
  | 'metal'
  | 'vidro'
  | 'fibra'
export type Suporte = 'nenhum' | 'tripe' | 'pedestal' | 'macrame' | 'cesto' | 'parede' | 'rodinhas'

export const formasVaso: { id: FormaVaso; nome: string; nota: string }[] = [
  { id: 'cilindro', nome: 'Cilindro', nota: 'reto, de parede fina' },
  { id: 'cone', nome: 'Cone', nota: 'boca larga, base estreita' },
  { id: 'tigela', nome: 'Tigela', nota: 'baixo e aberto, para roseta' },
  { id: 'anfora', nome: 'Ânfora', nota: 'barriga larga, boca recolhida' },
  { id: 'cubo', nome: 'Cubo', nota: 'quadrado, de canto vivo' },
  { id: 'organico', nome: 'Orgânico', nota: 'parede ondulada, feita à mão' },
]

export const materiaisVaso: {
  id: MaterialVaso
  nome: string
  nota: string
  fator: number
  corPadrao: string
}[] = [
  { id: 'ceramicaFosca', nome: 'Cerâmica fosca', nota: 'sem brilho, cor cheia', fator: 1, corPadrao: '#c9c2b4' },
  { id: 'ceramicaEsmaltada', nome: 'Cerâmica esmaltada', nota: 'brilho de vidrado', fator: 1.35, corPadrao: '#2f6f86' },
  { id: 'terracota', nome: 'Terracota', nota: 'barro poroso, respira', fator: 0.8, corPadrao: '#b6472f' },
  { id: 'concreto', nome: 'Concreto', nota: 'pesado, textura de cimento', fator: 1.5, corPadrao: '#9a9a95' },
  { id: 'metal', nome: 'Metal escovado', nota: 'reflete o ambiente', fator: 1.9, corPadrao: '#8d8f93' },
  { id: 'vidro', nome: 'Vidro', nota: 'translúcido, mostra o substrato', fator: 1.7, corPadrao: '#cfe0e6' },
  { id: 'fibra', nome: 'Fibra natural', nota: 'trançado leve', fator: 0.9, corPadrao: '#c3a878' },
]

export const suportes: { id: Suporte; nome: string; nota: string; precoFator: number; altura: number }[] = [
  { id: 'nenhum', nome: 'Sem suporte', nota: 'direto no chão ou na mesa', precoFator: 0, altura: 0 },
  { id: 'tripe', nome: 'Tripé de madeira', nota: 'três pés inclinados', precoFator: 0.35, altura: 0.28 },
  { id: 'pedestal', nome: 'Pedestal', nota: 'coluna cheia, levanta o vaso', precoFator: 0.45, altura: 0.34 },
  { id: 'macrame', nome: 'Macramê', nota: 'pendurado por cordão', precoFator: 0.3, altura: 0 },
  { id: 'cesto', nome: 'Cachepô de palha', nota: 'o vaso entra dentro', precoFator: 0.25, altura: 0.04 },
  { id: 'parede', nome: 'Mão-francesa', nota: 'fixo na parede', precoFator: 0.4, altura: 0 },
  { id: 'rodinhas', nome: 'Base com rodinhas', nota: 'move vaso grande sozinho', precoFator: 0.3, altura: 0.07 },
]

export type Montagem = {
  forma: FormaVaso
  material: MaterialVaso
  cor: string
  /** diâmetro da boca em centímetros */
  diametroCm: number
  prato: boolean
  suporte: Suporte
}


export function precoMontagem(precoBase: number, m: Montagem): number {
  const mat = materiaisVaso.find((x) => x.id === m.material)!
  const sup = suportes.find((s) => s.id === m.suporte)!
  const fatorTamanho = Math.pow(m.diametroCm / 15, 1.35)
  const vaso = 42 * mat.fator * fatorTamanho
  const prato = m.prato ? 14 * fatorTamanho : 0
  const suporte = sup.precoFator * 120 * Math.pow(m.diametroCm / 15, 0.9)
  const planta = precoBase * Math.max(0.85, Math.pow(m.diametroCm / 15, 0.55))
  return Math.round(planta + vaso + prato + suporte)
}
