import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { plantas } from '../data/plantas'
import { cm } from '../lib/formato'
import { ir } from '../lib/rota'
import { montagemPadrao, useLoja, useOficina } from '../lib/estado'
import { Cena3DTardia as Cena3D } from './Cena3DTardia'

type Foto = { url: string; largura: number; altura: number }

export function EstudioFoto({ id }: { id: string }) {
  const planta = plantas.find((p) => p.id === id)
  const montagem = useOficina((s) => s.porPlanta[id]) ?? montagemPadrao
  const adicionar = useLoja((s) => s.adicionar)

  const [foto, setFoto] = useState<Foto | null>(null)
  const [camera, setCamera] = useState<'desligada' | 'ligando' | 'ligada' | 'negada'>('desligada')
  const [erroCamera, setErroCamera] = useState('')
  const [pos, setPos] = useState({ x: 50, y: 72 })
  const [largura, setLargura] = useState(34)
  const [angulo, setAngulo] = useState(20)
  const [luz, setLuz] = useState({ intensidade: 1, anguloGraus: 35 })
  const [sombra, setSombra] = useState(0.45)
  const [arrastando, setArrastando] = useState(false)

  const video = useRef<HTMLVideoElement>(null)
  const fluxo = useRef<MediaStream | null>(null)
  const palco = useRef<HTMLDivElement>(null)
  const sobreposicao = useRef<HTMLDivElement>(null)
  const glRef = useRef<THREE.WebGLRenderer | null>(null)

  const pararCamera = useCallback(() => {
    fluxo.current?.getTracks().forEach((t) => t.stop())
    fluxo.current = null
    setCamera('desligada')
  }, [])

  useEffect(() => () => pararCamera(), [pararCamera])

  async function ligarCamera() {
    setCamera('ligando')
    setErroCamera('')
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 } },
        audio: false,
      })
      fluxo.current = s
      setCamera('ligada')
      queueMicrotask(() => {
        if (video.current) {
          video.current.srcObject = s
          void video.current.play()
        }
      })
    } catch (e) {
      setCamera('negada')
      setErroCamera(
        e instanceof DOMException && e.name === 'NotAllowedError'
          ? 'O navegador bloqueou a câmera. Libere o acesso ou envie uma foto do rolo.'
          : 'Não foi possível abrir a câmera neste aparelho. Envie uma foto do rolo.',
      )
    }
  }

  function tirarFoto() {
    const v = video.current
    if (!v) return
    const c = document.createElement('canvas')
    c.width = v.videoWidth
    c.height = v.videoHeight
    c.getContext('2d')!.drawImage(v, 0, 0)
    c.toBlob((b) => {
      if (!b) return
      definirFoto(URL.createObjectURL(b), c.width, c.height)
      pararCamera()
    }, 'image/jpeg', 0.92)
  }

  function definirFoto(url: string, largura: number, altura: number) {
    setFoto((antiga) => {
      if (antiga) URL.revokeObjectURL(antiga.url)
      return { url, largura, altura }
    })
  }

  function enviarArquivo(arquivo: File) {
    const url = URL.createObjectURL(arquivo)
    const img = new Image()
    img.onload = () => definirFoto(url, img.naturalWidth, img.naturalHeight)
    img.src = url
  }

  function aoArrastar(e: React.PointerEvent) {
    if (!arrastando || !palco.current) return
    const r = palco.current.getBoundingClientRect()
    setPos({
      x: Math.min(98, Math.max(2, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.min(100, Math.max(10, ((e.clientY - r.top) / r.height) * 100)),
    })
  }

  function baixarComposicao() {
    const gl = glRef.current
    if (!gl || !foto || !palco.current || !sobreposicao.current) return
    const img = new Image()
    img.onload = () => {
      const saida = document.createElement('canvas')
      const maxLado = 2200
      const fator = Math.min(1, maxLado / Math.max(img.naturalWidth, img.naturalHeight))
      saida.width = Math.round(img.naturalWidth * fator)
      saida.height = Math.round(img.naturalHeight * fator)
      const ctx = saida.getContext('2d')!
      ctx.drawImage(img, 0, 0, saida.width, saida.height)

      const rp = palco.current!.getBoundingClientRect()
      const rs = sobreposicao.current!.getBoundingClientRect()
      const escala = saida.width / rp.width
      ctx.drawImage(
        gl.domElement,
        (rs.left - rp.left) * escala,
        (rs.top - rp.top) * escala,
        rs.width * escala,
        rs.height * escala,
      )
      saida.toBlob((b) => {
        if (!b) return
        const a = document.createElement('a')
        a.href = URL.createObjectURL(b)
        a.download = `${id}-no-meu-espaco.png`
        a.click()
        setTimeout(() => URL.revokeObjectURL(a.href), 4000)
      }, 'image/png')
    }
    img.src = foto.url
  }

  if (!planta) return null

  const alturaMedia = (planta.porte.valor.alturaCm[0] + planta.porte.valor.alturaCm[1]) / 2

  return (
    <section className="estudio">
      <div className="recuo estudio-cabeca">
        <nav className="migalha">
          <a
            href={`#planta/${id}`}
            onClick={(e) => {
              e.preventDefault()
              ir(`planta/${id}`)
            }}
          >
            {planta.nome}
          </a>
          <span aria-hidden="true">/</span>
          <span>No meu espaço</span>
        </nav>
        <h1>Veja antes de comprar</h1>
        <p>
          Fotografe o canto onde a planta vai ficar, arraste o modelo até o lugar e ajuste o tamanho
          usando um móvel como referência. A foto não sai do seu aparelho: o encaixe é feito aqui no
          navegador.
        </p>
      </div>

      <div className="recuo estudio-grade">
        <div className="estudio-palco-caixa">
          {!foto && camera !== 'ligada' && (
            <div className="estudio-entrada">
              <h2>De onde vem a foto</h2>
              <div className="estudio-entrada-acoes">
                <button className="botao botao--principal" onClick={ligarCamera} disabled={camera === 'ligando'}>
                  {camera === 'ligando' ? 'Abrindo a câmera…' : 'Usar a câmera'}
                </button>
                <label className="botao botao--vazado">
                  Enviar foto do rolo
                  <input
                    type="file"
                    accept="image/*"
                    className="visualmente-oculto"
                    onChange={(e) => e.target.files?.[0] && enviarArquivo(e.target.files[0])}
                  />
                </label>
              </div>
              {erroCamera && <p className="erro">{erroCamera}</p>}
              <p className="nota">
                Dica: fotografe de frente, com a parede e o chão visíveis. Assim a escala fica fiel.
              </p>
            </div>
          )}

          {camera === 'ligada' && (
            <div className="estudio-camera">
              <video ref={video} playsInline muted className="estudio-video" />
              <div className="estudio-camera-acoes">
                <button className="botao botao--principal" onClick={tirarFoto}>
                  Tirar a foto
                </button>
                <button className="botao botao--texto" onClick={pararCamera}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {foto && (
            <>
              <div
                className={'estudio-palco' + (arrastando ? ' is-arrastando' : '')}
                ref={palco}
                style={{ aspectRatio: `${foto.largura} / ${foto.altura}` }}
                onPointerMove={aoArrastar}
                onPointerUp={() => setArrastando(false)}
                onPointerLeave={() => setArrastando(false)}
              >
                <img src={foto.url} alt="Foto do seu ambiente" className="estudio-foto" />
                <div
                  ref={sobreposicao}
                  className="estudio-sobreposicao"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: `${largura}%`,
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault()
                    setArrastando(true)
                  }}
                >
                  <Cena3D
                    planta={planta}
                    montagem={montagem}
                    altura="100%"
                    transparente
                    anguloY={angulo}
                    luz={luz}
                    opacidadeSombra={sombra}
                    aoRenderizar={(gl) => {
                      glRef.current = gl
                    }}
                    rotulo={`${planta.nome} posicionada na sua foto`}
                  />
                </div>
                <p className="estudio-arraste">Arraste a planta</p>
              </div>
              <div className="estudio-palco-pe">
                <button className="botao botao--texto" onClick={() => setFoto(null)}>
                  Trocar a foto
                </button>
                <button className="botao botao--vazado" onClick={baixarComposicao}>
                  Baixar a imagem
                </button>
              </div>
            </>
          )}
        </div>

        <div className="estudio-painel">
          <h2>Ajustes</h2>
          <Deslizador
            rotulo="Tamanho na foto"
            valor={largura}
            min={10}
            max={90}
            passo={1}
            sufixo="%"
            aoMudar={setLargura}
            nota={`A planta real tem cerca de ${cm(alturaMedia)} de altura. Use a altura de uma porta (2,10 m) ou de uma mesa (75 cm) como régua.`}
            desabilitado={!foto}
          />
          <Deslizador
            rotulo="Girar a planta"
            valor={angulo}
            min={-180}
            max={180}
            passo={5}
            sufixo="°"
            aoMudar={setAngulo}
            desabilitado={!foto}
          />
          <Deslizador
            rotulo="Direção da luz"
            valor={luz.anguloGraus}
            min={-180}
            max={180}
            passo={5}
            sufixo="°"
            aoMudar={(v) => setLuz({ ...luz, anguloGraus: v })}
            nota="Gire até a sombra da planta cair para o mesmo lado das sombras da foto."
            desabilitado={!foto}
          />
          <Deslizador
            rotulo="Força da luz"
            valor={Math.round(luz.intensidade * 100)}
            min={40}
            max={160}
            passo={5}
            sufixo="%"
            aoMudar={(v) => setLuz({ ...luz, intensidade: v / 100 })}
            desabilitado={!foto}
          />
          <Deslizador
            rotulo="Sombra no chão"
            valor={Math.round(sombra * 100)}
            min={0}
            max={90}
            passo={5}
            sufixo="%"
            aoMudar={(v) => setSombra(v / 100)}
            desabilitado={!foto}
          />

          <div className="estudio-resumo">
            <p>
              Montagem atual: vaso {montagem.forma} de {montagem.diametroCm} cm,{' '}
              {montagem.suporte === 'nenhum' ? 'sem suporte' : montagem.suporte}.
            </p>
            <div className="estudio-resumo-acoes">
              <button className="botao botao--vazado" onClick={() => ir(`montador/${id}`)}>
                Mudar vaso e suporte
              </button>
              <button className="botao botao--principal" onClick={() => adicionar(id, montagem)}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Deslizador({
  rotulo,
  valor,
  min,
  max,
  passo,
  sufixo,
  aoMudar,
  nota,
  desabilitado,
}: {
  rotulo: string
  valor: number
  min: number
  max: number
  passo: number
  sufixo: string
  aoMudar: (v: number) => void
  nota?: string
  desabilitado?: boolean
}) {
  return (
    <div className={'deslizador' + (desabilitado ? ' is-mudo' : '')}>
      <label>
        <span className="deslizador-rotulo">
          {rotulo}
          <output>
            {valor}
            {sufixo}
          </output>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={passo}
          value={valor}
          disabled={desabilitado}
          onChange={(e) => aoMudar(Number(e.target.value))}
        />
      </label>
      {nota && <p className="nota">{nota}</p>}
    </div>
  )
}
