export type Fonte = {
  id: string
  titulo: string
  veiculo: string
  url: string
}

/** Arquétipo de forma usado pelo gerador 3D procedural. */
export type Arquetipo =
  | 'rosetaLancas'
  | 'trepadeiraPendente'
  | 'penaComposta'
  | 'espataLarga'
  | 'folhaFenestrada'
  | 'arbustoEspigas'
  | 'trepadeiraFlorida'
  | 'frondeSamambaia'
  | 'folhaPintada'
  | 'rosetaSuculenta'
  | 'arqueadaFilhotes'
  | 'arbustoFolhasPares'

export type NivelLuz = 1 | 2 | 3 | 4

export const rotuloLuz: Record<NivelLuz, string> = {
  1: 'Sombra',
  2: 'Luz indireta fraca',
  3: 'Luz indireta forte',
  4: 'Sol direto',
}

export type Porte = 'pequeno' | 'medio' | 'grande'

export const rotuloPorte: Record<Porte, string> = {
  pequeno: 'até 60 cm',
  medio: '60 cm a 1,2 m',
  grande: 'acima de 1,2 m',
}

export type SegurancaPet = 'seguro' | 'atencao' | 'toxico'

export type Campo<T> = { valor: T; texto: string; fontes: string[] }

export type Planta = {
  id: string
  nome: string
  cientifico: string
  resumo: string
  arquetipo: Arquetipo
  dificuldade: 1 | 2 | 3
  precoBase: number
  porte: Campo<{ alturaCm: [number, number]; larguraCm: [number, number]; classe: Porte }>
  rega: Campo<{ diasEntreRegas: [number, number]; inverno: string }>
  luz: Campo<{ nivel: NivelLuz; horasSolDireto: [number, number] | null }>
  ambiente: Campo<{
    interno: boolean
    externo: boolean
    umidadePct: [number, number] | null
    tempC: [number, number] | null
  }>
  cheiro: Campo<{ tem: boolean; nota: string; intensidade: 0 | 1 | 2 | 3 }>
  agrega: Campo<string[]>
  lugares: Campo<{ lugar: string; porque: string }[]>
  pet: Campo<SegurancaPet>
  paleta: { folha: string; folha2?: string; caule: string; flor?: string; vaso: string }
  fontes: Fonte[]
}
