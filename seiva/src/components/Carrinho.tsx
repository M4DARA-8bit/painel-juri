import { AnimatePresence, motion } from 'framer-motion'
import { plantas } from '../data/plantas'
import { brl } from '../lib/formato'
import { useLoja } from '../lib/estado'
import { formasVaso, materiaisVaso, suportes } from '../data/vasos'

export function Carrinho() {
  const { itens, gaveta, abrirGaveta, remover, mudarQuantidade, total } = useLoja()

  return (
    <AnimatePresence>
      {gaveta && (
        <motion.div
          className="gaveta-fundo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => abrirGaveta(false)}
        >
          <motion.aside
            className="gaveta"
            role="dialog"
            aria-label="Carrinho"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <h2>Carrinho</h2>
              <button className="botao botao--texto" onClick={() => abrirGaveta(false)}>
                Fechar
              </button>
            </header>

            {itens.length === 0 ? (
              <div className="gaveta-vazia">
                <p>Nada aqui ainda. Monte uma planta com vaso e suporte para ver o preço fechado.</p>
              </div>
            ) : (
              <>
                <ul className="gaveta-itens">
                  {itens.map((i) => {
                    const planta = plantas.find((p) => p.id === i.plantaId)!
                    const forma = formasVaso.find((f) => f.id === i.montagem.forma)!
                    const material = materiaisVaso.find((m) => m.id === i.montagem.material)!
                    const suporte = suportes.find((s) => s.id === i.montagem.suporte)!
                    return (
                      <li key={i.chave}>
                        <div>
                          <h3>{planta.nome}</h3>
                          <p className="nota">
                            {forma.nome} de {i.montagem.diametroCm} cm · {material.nome}
                            {i.montagem.suporte !== 'nenhum' ? ` · ${suporte.nome}` : ''}
                            {i.montagem.prato ? ' · com prato' : ''}
                          </p>
                          <div className="gaveta-qtd">
                            <button onClick={() => mudarQuantidade(i.chave, -1)} aria-label="Diminuir">
                              −
                            </button>
                            <span>{i.quantidade}</span>
                            <button onClick={() => mudarQuantidade(i.chave, 1)} aria-label="Aumentar">
                              +
                            </button>
                            <button className="botao botao--texto" onClick={() => remover(i.chave)}>
                              Remover
                            </button>
                          </div>
                        </div>
                        <strong>{brl(i.preco * i.quantidade)}</strong>
                      </li>
                    )
                  })}
                </ul>
                <footer>
                  <div className="gaveta-total">
                    <span>Total</span>
                    <strong>{brl(total())}</strong>
                  </div>
                  <button className="botao botao--principal botao--largo" disabled>
                    Fechar pedido
                  </button>
                  <p className="nota">
                    O pagamento ainda não está ligado nesta versão: o carrinho fica salvo no seu
                    navegador.
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
