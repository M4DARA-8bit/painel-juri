import { rotuloLuz, rotuloPorte, type NivelLuz } from '../data/tipos'
import {
  contarAtivos,
  filtrosVazios,
  LUGARES,
  rotuloRitmo,
  type Filtros as TipoFiltros,
  type RitmoRega,
} from '../lib/filtros'

type Props = {
  filtros: TipoFiltros
  mudar: (f: TipoFiltros) => void
  resultados: number
}

function alternar<T>(lista: T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor]
}

export function Filtros({ filtros, mudar, resultados }: Props) {
  const ativos = contarAtivos(filtros)

  return (
    <form className="filtros" onSubmit={(e) => e.preventDefault()} aria-label="Filtrar plantas">
      <div className="filtros-topo">
        <label className="campo-busca">
          <span className="visualmente-oculto">Buscar planta</span>
          <input
            type="search"
            value={filtros.busca}
            placeholder="Buscar por nome, cheiro, uso"
            onChange={(e) => mudar({ ...filtros, busca: e.target.value })}
          />
        </label>
        <label className="campo-ordem">
          <span className="visualmente-oculto">Ordenar</span>
          <select
            value={filtros.ordem}
            onChange={(e) => mudar({ ...filtros, ordem: e.target.value as TipoFiltros['ordem'] })}
          >
            <option value="curadoria">Ordem da curadoria</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="menos-rega">Menos rega primeiro</option>
            <option value="nome">Nome</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend>Luz que o lugar recebe</legend>
        <div className="grupo-etiquetas">
          {([1, 2, 3, 4] as NivelLuz[]).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={filtros.luz.includes(n)}
              className={'chip' + (filtros.luz.includes(n) ? ' is-ativo' : '')}
              onClick={() => mudar({ ...filtros, luz: alternar(filtros.luz, n as number) })}
            >
              <span className="chip-barra" data-nivel={n} aria-hidden="true" />
              {rotuloLuz[n]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Quanto você quer regar</legend>
        <div className="grupo-etiquetas">
          {(['muita', 'media', 'pouca'] as RitmoRega[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={filtros.rega.includes(r)}
              className={'chip' + (filtros.rega.includes(r) ? ' is-ativo' : '')}
              onClick={() => mudar({ ...filtros, rega: alternar(filtros.rega, r) })}
            >
              {rotuloRitmo[r]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Lugar da casa</legend>
        <div className="grupo-etiquetas">
          {LUGARES.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={filtros.lugar.includes(l.id)}
              className={'chip' + (filtros.lugar.includes(l.id) ? ' is-ativo' : '')}
              onClick={() => mudar({ ...filtros, lugar: alternar(filtros.lugar, l.id) })}
            >
              {l.nome}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Porte adulto</legend>
        <div className="grupo-etiquetas">
          {(['pequeno', 'medio', 'grande'] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={filtros.porte.includes(p)}
              className={'chip' + (filtros.porte.includes(p) ? ' is-ativo' : '')}
              onClick={() => mudar({ ...filtros, porte: alternar(filtros.porte, p as string) })}
            >
              {rotuloPorte[p]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>Exigências</legend>
        <div className="grupo-caixas">
          <label>
            <input
              type="checkbox"
              checked={filtros.comCheiro}
              onChange={(e) => mudar({ ...filtros, comCheiro: e.target.checked })}
            />
            Tem cheiro
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.petSeguro}
              onChange={(e) => mudar({ ...filtros, petSeguro: e.target.checked })}
            />
            Segura para cães e gatos
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.facil}
              onChange={(e) => mudar({ ...filtros, facil: e.target.checked })}
            />
            Perdoa esquecimento
          </label>
        </div>
      </fieldset>

      <footer className="filtros-pe">
        <p aria-live="polite">
          {resultados} {resultados === 1 ? 'planta' : 'plantas'}
        </p>
        {ativos > 0 && (
          <button type="button" className="botao botao--texto" onClick={() => mudar(filtrosVazios)}>
            Limpar {ativos} {ativos === 1 ? 'filtro' : 'filtros'}
          </button>
        )}
      </footer>
    </form>
  )
}
