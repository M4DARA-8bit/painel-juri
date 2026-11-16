import type { NivelLuz, Planta, SegurancaPet } from '../data/tipos'
import { rotuloLuz } from '../data/tipos'
import { textoRega } from '../lib/formato'

export function MedidorLuz({ nivel, compacto = false }: { nivel: NivelLuz; compacto?: boolean }) {
  return (
    <span className="medidor" title={rotuloLuz[nivel]}>
      <span className="medidor-celulas" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={'celula celula--luz' + (i <= nivel ? ' is-cheia' : '')} />
        ))}
      </span>
      {!compacto && <span className="medidor-texto">{rotuloLuz[nivel]}</span>}
      <span className="visualmente-oculto">Luz: nível {nivel} de 4, {rotuloLuz[nivel]}</span>
    </span>
  )
}

export function MedidorRega({ dias, compacto = false }: { dias: [number, number]; compacto?: boolean }) {
  const media = (dias[0] + dias[1]) / 2
  const gotas = media <= 7 ? 3 : media <= 15 ? 2 : 1
  return (
    <span className="medidor">
      <span className="medidor-celulas" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={'celula celula--agua' + (i <= gotas ? ' is-cheia' : '')} />
        ))}
      </span>
      {!compacto && <span className="medidor-texto">{textoRega(dias)}</span>}
      <span className="visualmente-oculto">Rega: {textoRega(dias)}, de {dias[0]} a {dias[1]} dias entre regas</span>
    </span>
  )
}

export function MedidorCheiro({ intensidade, nota }: { intensidade: 0 | 1 | 2 | 3; nota: string }) {
  if (intensidade === 0) return <span className="medidor-texto medidor-texto--mudo">sem cheiro</span>
  return (
    <span className="medidor">
      <span className="medidor-celulas" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={'celula celula--cheiro' + (i <= intensidade ? ' is-cheia' : '')} />
        ))}
      </span>
      <span className="medidor-texto">{nota}</span>
    </span>
  )
}

const rotuloPet: Record<SegurancaPet, string> = {
  seguro: 'Segura para cães e gatos',
  atencao: 'Atenção com pets',
  toxico: 'Tóxica para pets',
}

export function EtiquetaPet({ nivel }: { nivel: SegurancaPet }) {
  return <span className={'etiqueta etiqueta--pet-' + nivel}>{rotuloPet[nivel]}</span>
}

/** Marcador de fonte: número que leva à lista de referências da planta. */
export function Fontes({ ids, planta }: { ids: string[]; planta: Planta }) {
  const indices = ids
    .map((id) => planta.fontes.findIndex((f) => f.id === id))
    .filter((i) => i >= 0)
  if (!indices.length) return null
  return (
    <span className="fontes-ref">
      {indices.map((i) => (
        <a key={i} href={`#fonte-${planta.id}-${i + 1}`} aria-label={`Fonte ${i + 1}: ${planta.fontes[i].veiculo}`}>
          {i + 1}
        </a>
      ))}
    </span>
  )
}
