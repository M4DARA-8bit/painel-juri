import { useLoja } from './lib/estado'
import { ir, useRota } from './lib/rota'
import { Carrinho } from './components/Carrinho'
import { Catalogo } from './components/Catalogo'
import { EstudioFoto } from './components/EstudioFoto'
import { Montador } from './components/Montador'
import { PaginaCuidado } from './components/PaginaCuidado'
import { PaginaPlanta } from './components/PaginaPlanta'

export default function App() {
  const rota = useRota()
  const itens = useLoja((s) => s.itens)
  const abrirGaveta = useLoja((s) => s.abrirGaveta)
  const quantidade = itens.reduce((s, i) => s + i.quantidade, 0)

  return (
    <>
      <a className="pulo-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <nav className="barra">
        <div className="recuo barra-grade">
          <a
            className="marca"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              ir('')
            }}
          >
            <span className="marca-folha" aria-hidden="true" />
            Seiva
            <small>viveiro com ficha técnica</small>
          </a>
          <div className="barra-links">
            <a
              href="#catalogo"
              onClick={(e) => {
                e.preventDefault()
                if (rota.tela !== 'catalogo') ir('')
                setTimeout(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }), 60)
              }}
            >
              Viveiro
            </a>
            <a
              href="#cuidado"
              onClick={(e) => {
                e.preventDefault()
                ir('cuidado')
              }}
            >
              Fontes
            </a>
            <button className="botao botao--carrinho" onClick={() => abrirGaveta(true)}>
              Carrinho
              {quantidade > 0 && <span className="contador">{quantidade}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main id="conteudo">
        {rota.tela === 'catalogo' && <Catalogo />}
        {rota.tela === 'planta' && <PaginaPlanta id={rota.id} />}
        {rota.tela === 'montador' && <Montador id={rota.id} />}
        {rota.tela === 'foto' && <EstudioFoto id={rota.id} />}
        {rota.tela === 'cuidado' && <PaginaCuidado />}
      </main>

      <footer className="rodape">
        <div className="recuo rodape-grade">
          <p className="rodape-marca">Seiva</p>
          <p>
            Loja de demonstração. Os modelos 3D são gerados por código a partir da forma de cada
            espécie, não são fotografias nem digitalizações do exemplar que você recebe.
          </p>
          <p>
            <a
              href="#cuidado"
              onClick={(e) => {
                e.preventDefault()
                ir('cuidado')
              }}
            >
              Fontes de cada dado da ficha
            </a>
          </p>
        </div>
      </footer>

      <Carrinho />
    </>
  )
}
