export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

/** Converte o intervalo de dias entre regas em linguagem de rotina. */
export function textoRega([min, max]: [number, number]) {
  const media = (min + max) / 2
  if (media <= 4) return 'quase todo dia'
  if (media <= 8) return '1 vez por semana'
  if (media <= 12) return 'a cada 10 dias'
  if (media <= 18) return '2 vezes por mês'
  if (media <= 32) return '1 vez por mês'
  return 'a cada 2 meses'
}

export function vezesPorMes([min, max]: [number, number]) {
  const media = (min + max) / 2
  const v = 30 / media
  return v >= 1 ? `${v.toFixed(v < 2 ? 1 : 0).replace('.', ',')}×/mês` : `${(v * 12).toFixed(0)}×/ano`
}

export const cm = (n: number) => (n >= 100 ? `${(n / 100).toFixed(1).replace('.', ',')} m` : `${n} cm`)
export const faixaCm = ([a, b]: [number, number]) => `${cm(a)} – ${cm(b)}`
