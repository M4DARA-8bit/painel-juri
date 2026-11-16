import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { fatorPorte, montarPlanta } from '../three/planta'
import { montarVaso, type Montagem } from '../three/vaso'
import { malhaSombra } from '../three/sombra'
import type { Planta } from '../data/tipos'

const semMovimento = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

export type Props = {
  planta: Planta
  montagem: Montagem
  /** órbita com mouse e toque */
  interativo?: boolean
  /** giro lento automático */
  girar?: boolean
  /** fundo transparente, para compor sobre foto */
  transparente?: boolean
  /** intensidade e direção da luz, para casar com a foto do ambiente */
  luz?: { intensidade: number; anguloGraus: number }
  altura?: number | string
  sombra?: boolean
  /** devolve o renderer, para exportar imagem */
  aoRenderizar?: (gl: THREE.WebGLRenderer, cena: THREE.Scene, camera: THREE.Camera) => void
  classe?: string
  rotulo?: string
  /** giro da peça em graus, usado na composição sobre a foto */
  anguloY?: number
  /** desliga a sombra de contato quando a foto já tem sombra própria */
  opacidadeSombra?: number
}

function Conjunto({
  planta,
  montagem,
  animar,
  anguloY = 0,
  aoMedir,
}: {
  planta: Planta
  montagem: Montagem
  animar: boolean
  anguloY?: number
  aoMedir?: (centro: THREE.Vector3) => void
}) {
  const grupo = useRef<THREE.Group>(null)
  const nascido = useRef(0)

  const { arvore, caixa, pecas } = useMemo(() => {
    const vaso = montarVaso(montagem)
    const alturaPlantaM = ((planta.porte.valor.alturaCm[0] + planta.porte.valor.alturaCm[1]) / 2) / 100
    const planta3d = montarPlanta(planta.arquetipo, planta.paleta, planta.nome.length * 7 + 3)
    const escala = alturaPlantaM * fatorPorte[planta.arquetipo] * (montagem.diametroCm / 18) ** 0.35
    planta3d.scale.multiplyScalar(escala)
    planta3d.position.y = montagem.suporte === 'macrame' ? vaso.yPlanta : vaso.yPlanta
    planta3d.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    const raiz = new THREE.Group()
    raiz.add(vaso.grupo, planta3d)
    const lista: { obj: THREE.Object3D; ordem: number; escala: THREE.Vector3 }[] = []
    planta3d.traverse((o) => {
      if (typeof o.userData.ordem === 'number') {
        lista.push({ obj: o, ordem: o.userData.ordem as number, escala: o.scale.clone() })
      }
    })
    const limites = new THREE.Box3().setFromObject(raiz)
    return { arvore: raiz, caixa: limites, pecas: lista }
  }, [planta, montagem])

  useEffect(() => {
    nascido.current = 0
    if (!animar) pecas.forEach((p) => p.obj.scale.copy(p.escala))
    else pecas.forEach((p) => p.obj.scale.set(0.001, 0.001, 0.001))
    return () => {
      arvore.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.isMesh) {
          m.geometry.dispose()
          const mat = m.material
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
          else mat.dispose()
        }
      })
    }
  }, [arvore, pecas, animar])

  useFrame((_, dt) => {
    if (!animar) return
    nascido.current += dt
    const t = nascido.current
    let faltando = false
    for (const p of pecas) {
      const local = THREE.MathUtils.clamp((t - p.ordem * 0.55) / 0.5, 0, 1)
      const eased = 1 - Math.pow(1 - local, 3)
      p.obj.scale.set(p.escala.x * eased, p.escala.y * eased, p.escala.z * eased)
      if (local < 1) faltando = true
    }
    if (!faltando) nascido.current = 999
  })

  useEnquadrar(caixa)

  useEffect(() => {
    aoMedir?.(caixa.getCenter(new THREE.Vector3()))
  }, [caixa, aoMedir])

  return <primitive ref={grupo} object={arvore} rotation-y={(anguloY * Math.PI) / 180} />
}

/** Enquadra pela caixa real da peça montada, não por um palpite de altura. */
function useEnquadrar(caixa: THREE.Box3) {
  const { camera, size } = useThree()
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    const tamanho = caixa.getSize(new THREE.Vector3())
    const centro = caixa.getCenter(new THREE.Vector3())
    const aspecto = Math.max(0.4, size.width / Math.max(1, size.height))
    const fovV = (cam.fov * Math.PI) / 180
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * aspecto)
    const largura = Math.max(tamanho.x, tamanho.z)
    const distancia = Math.max(
      tamanho.y / 2 / Math.tan(fovV / 2),
      largura / 2 / Math.tan(fovH / 2),
    )
    const d = distancia * 1.32 + largura * 0.2
    cam.position.set(d * 0.42, centro.y + tamanho.y * 0.18, d * 0.92)
    cam.lookAt(centro.x, centro.y, centro.z)
    cam.updateProjectionMatrix()
  }, [caixa, camera, size.width, size.height])
  return null
}

function Exportador({ aoRenderizar }: { aoRenderizar: Props['aoRenderizar'] }) {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    aoRenderizar?.(gl, scene, camera)
  }, [gl, scene, camera, aoRenderizar])
  return null
}

export function Cena3D({
  planta,
  montagem,
  interativo = false,
  girar = false,
  transparente = false,
  luz = { intensidade: 1, anguloGraus: 35 },
  altura = 320,
  sombra = true,
  aoRenderizar,
  classe,
  rotulo,
  anguloY = 0,
  opacidadeSombra,
}: Props) {
  const [animar] = useState(() => !semMovimento())
  const [centro, setCentro] = useState<[number, number, number]>([0, 0.4, 0])
  const guardarCentro = useCallback((c: THREE.Vector3) => setCentro([c.x, c.y, c.z]), [])
  const rad = (luz.anguloGraus * Math.PI) / 180

  return (
    <div
      className={classe}
      style={{ height: altura, width: '100%' }}
      role="img"
      aria-label={rotulo ?? `Modelo 3D de ${planta.nome} em vaso`}
    >
      <Canvas
        dpr={[1, 1.8]}
        shadows={sombra}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: !!aoRenderizar }}
        camera={{ fov: 32, near: 0.05, far: 60 }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0)
          gl.toneMapping = THREE.ACESFilmicToneMapping
        }}
      >
        <hemisphereLight args={['#f7fbf2', '#7d8a6e', 1.05 * luz.intensidade]} />
        <ambientLight intensity={0.35 * luz.intensidade} />
        <directionalLight
          position={[Math.cos(rad) * 3, 3.2, Math.sin(rad) * 3]}
          intensity={1.75 * luz.intensidade}
          castShadow={sombra}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
        />
        <directionalLight position={[-2, 1.4, -1.6]} intensity={0.35 * luz.intensidade} />
        <Suspense fallback={null}>
          <Conjunto
            planta={planta}
            montagem={montagem}
            animar={animar}
            anguloY={anguloY}
            aoMedir={guardarCentro}
          />
        </Suspense>
        {sombra && <Sombra planta={planta} montagem={montagem} opacidade={opacidadeSombra ?? 0.55} />}
        {interativo && (
          <OrbitControls
            enablePan={false}
            minDistance={0.45}
            maxDistance={6}
            maxPolarAngle={Math.PI / 2.02}
            autoRotate={girar}
            autoRotateSpeed={0.7}
            target={centro}
            makeDefault
          />
        )}
        {!interativo && girar && <GiroLento centro={centro} />}
        {aoRenderizar && <Exportador aoRenderizar={aoRenderizar} />}
      </Canvas>
    </div>
  )
}

function Sombra({
  planta,
  montagem,
  opacidade,
}: {
  planta: Planta
  montagem: Montagem
  opacidade: number
}) {
  const malha = useMemo(() => {
    const larguraM = ((planta.porte.valor.larguraCm[0] + planta.porte.valor.larguraCm[1]) / 2) / 100
    return malhaSombra(Math.max(0.25, larguraM * 0.75), opacidade)
  }, [planta, montagem, opacidade])
  useEffect(() => () => {
    malha.geometry.dispose()
    ;(malha.material as THREE.Material).dispose()
  }, [malha])
  return <primitive object={malha} />
}

function GiroLento({ centro }: { centro: [number, number, number] }) {
  const { camera } = useThree()
  const t = useRef(0)
  useFrame((_, dt) => {
    t.current += dt * 0.25
    const r = Math.hypot(camera.position.x, camera.position.z)
    camera.position.x = Math.cos(t.current) * r
    camera.position.z = Math.sin(t.current) * r
    camera.lookAt(centro[0], centro[1], centro[2])
  })
  return null
}
