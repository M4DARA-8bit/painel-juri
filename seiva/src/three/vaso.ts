import * as THREE from 'three'

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

export function materialDoVaso(material: MaterialVaso, cor: string): THREE.Material {
  switch (material) {
    case 'ceramicaEsmaltada':
      return new THREE.MeshPhysicalMaterial({ color: cor, roughness: 0.12, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.08 })
    case 'terracota':
      return new THREE.MeshStandardMaterial({ color: cor, roughness: 0.85, metalness: 0 })
    case 'concreto':
      return new THREE.MeshStandardMaterial({ color: cor, roughness: 0.95, metalness: 0 })
    case 'metal':
      return new THREE.MeshStandardMaterial({ color: cor, roughness: 0.32, metalness: 0.95 })
    case 'vidro':
      return new THREE.MeshPhysicalMaterial({
        color: cor,
        roughness: 0.06,
        metalness: 0,
        transparent: true,
        opacity: 0.45,
        transmission: 0.6,
        thickness: 0.02,
      })
    case 'fibra':
      return new THREE.MeshStandardMaterial({ color: cor, roughness: 0.98, metalness: 0 })
    default:
      return new THREE.MeshStandardMaterial({ color: cor, roughness: 0.68, metalness: 0 })
  }
}

/** Perfil (meia-seção) de cada forma, em fração do raio e da altura. */
function perfil(forma: FormaVaso, raio: number, altura: number): THREE.Vector2[] {
  const p: THREE.Vector2[] = []
  const pontos = 24
  const curva = (t: number) => {
    switch (forma) {
      case 'cilindro':
        return 0.9 + 0.1 * t
      case 'cone':
        return 0.6 + 0.4 * t
      case 'tigela':
        return Math.sqrt(Math.max(0.02, t)) * 0.98 + 0.08
      case 'anfora':
        return 0.52 + 0.62 * Math.sin(Math.PI * (0.18 + t * 0.72))
      case 'cubo':
        return 0.92 + 0.08 * t
      case 'organico':
        return 0.78 + 0.16 * Math.sin(t * 7) + 0.14 * t
      default:
        return 1
    }
  }
  for (let i = 0; i <= pontos; i++) {
    const t = i / pontos
    p.push(new THREE.Vector2(curva(t) * raio, t * altura))
  }
  // lábio da boca: dobra para dentro
  p.push(new THREE.Vector2(curva(1) * raio * 0.93, altura))
  p.push(new THREE.Vector2(curva(1) * raio * 0.9, altura - raio * 0.08))
  return p
}

export type VasoMontado = {
  grupo: THREE.Group
  /** altura total da peça em metros, incluindo suporte */
  alturaTotal: number
  /** y onde a planta nasce (superfície do substrato) */
  yPlanta: number
  /** raio da boca em metros */
  raioBoca: number
}

export function montarVaso(m: Montagem): VasoMontado {
  const grupo = new THREE.Group()
  const raio = (m.diametroCm / 100) / 2
  const altura = raio * (m.forma === 'tigela' ? 1.1 : 1.85)
  const sup = suportes.find((s) => s.id === m.suporte)!
  const yBase = sup.altura

  const mat = materialDoVaso(m.material, m.cor)
  let corpo: THREE.Mesh
  if (m.forma === 'cubo') {
    corpo = new THREE.Mesh(new THREE.BoxGeometry(raio * 1.9, altura, raio * 1.9), mat)
    corpo.position.y = yBase + altura / 2
  } else {
    const geo = new THREE.LatheGeometry(perfil(m.forma, raio, altura), m.forma === 'organico' ? 48 : 40)
    corpo = new THREE.Mesh(geo, mat)
    corpo.position.y = yBase
  }
  corpo.castShadow = true
  corpo.receiveShadow = true
  grupo.add(corpo)

  // substrato
  const substrato = new THREE.Mesh(
    new THREE.CylinderGeometry(raio * 0.86, raio * 0.8, raio * 0.12, 28),
    new THREE.MeshStandardMaterial({ color: '#30261d', roughness: 1 }),
  )
  substrato.position.y = yBase + altura * 0.9
  grupo.add(substrato)
  // casca de pinus espalhada
  for (let i = 0; i < 18; i++) {
    const g = new THREE.Mesh(
      new THREE.DodecahedronGeometry(raio * (0.035 + Math.random() * 0.03)),
      new THREE.MeshStandardMaterial({ color: i % 3 ? '#4a3a2b' : '#5d4a36', roughness: 0.95 }),
    )
    const a = Math.random() * Math.PI * 2
    const d = Math.random() * raio * 0.76
    g.position.set(Math.cos(a) * d, yBase + altura * 0.9 + raio * 0.06, Math.sin(a) * d)
    g.rotation.set(Math.random(), Math.random(), Math.random())
    grupo.add(g)
  }

  if (m.prato && m.suporte !== 'macrame' && m.suporte !== 'parede') {
    const prato = new THREE.Mesh(
      new THREE.CylinderGeometry(raio * 1.18, raio * 1.1, raio * 0.1, 32),
      materialDoVaso(m.material, m.cor),
    )
    prato.position.y = yBase + raio * 0.05
    prato.receiveShadow = true
    grupo.add(prato)
  }

  grupo.add(montarSuporte(m.suporte, raio, altura))

  return {
    grupo,
    alturaTotal: yBase + altura,
    yPlanta: yBase + altura * 0.93,
    raioBoca: raio,
  }
}

function montarSuporte(id: Suporte, raio: number, altura: number): THREE.Group {
  const g = new THREE.Group()
  const madeira = new THREE.MeshStandardMaterial({ color: '#a2763f', roughness: 0.8 })
  const corda = new THREE.MeshStandardMaterial({ color: '#d9cdb4', roughness: 1 })
  const metal = new THREE.MeshStandardMaterial({ color: '#4a4a4a', roughness: 0.4, metalness: 0.8 })
  const palha = new THREE.MeshStandardMaterial({ color: '#c3a878', roughness: 1 })
  const sup = suportes.find((s) => s.id === id)!

  switch (id) {
    case 'tripe': {
      for (let i = 0; i < 3; i++) {
        const perna = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.007, sup.altura * 1.12, 8), madeira)
        const a = (i / 3) * Math.PI * 2
        perna.position.set(Math.cos(a) * raio * 0.72, sup.altura / 2, Math.sin(a) * raio * 0.72)
        perna.rotation.set(Math.cos(a) * 0.16, 0, -Math.sin(a) * 0.16)
        perna.castShadow = true
        g.add(perna)
      }
      const anel = new THREE.Mesh(new THREE.TorusGeometry(raio * 0.84, 0.007, 6, 28), madeira)
      anel.position.y = sup.altura
      anel.rotation.x = Math.PI / 2
      g.add(anel)
      break
    }
    case 'pedestal': {
      const coluna = new THREE.Mesh(
        new THREE.LatheGeometry(
          [
            new THREE.Vector2(raio * 0.95, 0),
            new THREE.Vector2(raio * 0.6, sup.altura * 0.12),
            new THREE.Vector2(raio * 0.42, sup.altura * 0.6),
            new THREE.Vector2(raio * 0.8, sup.altura),
          ],
          28,
        ),
        madeira,
      )
      coluna.castShadow = true
      g.add(coluna)
      break
    }
    case 'macrame': {
      const altoY = altura * 2.6
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2
        const pontos = [
          new THREE.Vector3(Math.cos(a) * raio * 0.95, altura * 0.35, Math.sin(a) * raio * 0.95),
          new THREE.Vector3(Math.cos(a) * raio * 1.15, altura * 1.1, Math.sin(a) * raio * 1.15),
          new THREE.Vector3(0, altoY, 0),
        ]
        const tubo = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pontos), 20, 0.004, 5, false),
          corda,
        )
        g.add(tubo)
        // nós do trançado
        for (let k = 1; k <= 3; k++) {
          const no = new THREE.Mesh(new THREE.SphereGeometry(0.008, 6, 5), corda)
          no.position.copy(new THREE.CatmullRomCurve3(pontos).getPointAt(k / 5))
          g.add(no)
        }
      }
      const aro = new THREE.Mesh(new THREE.TorusGeometry(raio * 1.02, 0.005, 6, 24), corda)
      aro.position.y = altura * 0.42
      aro.rotation.x = Math.PI / 2
      g.add(aro)
      break
    }
    case 'cesto': {
      const cesto = new THREE.Mesh(
        new THREE.CylinderGeometry(raio * 1.2, raio * 1.05, altura * 0.8, 30, 1, true),
        palha,
      )
      cesto.position.y = sup.altura + altura * 0.4
      cesto.material.side = THREE.DoubleSide
      g.add(cesto)
      for (let i = 0; i < 5; i++) {
        const anel = new THREE.Mesh(new THREE.TorusGeometry(raio * (1.2 - i * 0.03), 0.006, 5, 30), palha)
        anel.position.y = sup.altura + altura * 0.08 + i * altura * 0.16
        anel.rotation.x = Math.PI / 2
        g.add(anel)
      }
      break
    }
    case 'parede': {
      const chapa = new THREE.Mesh(new THREE.BoxGeometry(raio * 2.4, 0.012, raio * 2.4), metal)
      chapa.position.y = -0.006
      g.add(chapa)
      const braco = new THREE.Mesh(new THREE.BoxGeometry(0.012, raio * 1.6, 0.012), metal)
      braco.position.set(0, -raio * 0.8, -raio * 1.2)
      g.add(braco)
      const costas = new THREE.Mesh(new THREE.BoxGeometry(raio * 1.8, raio * 1.9, 0.014), metal)
      costas.position.set(0, -raio * 0.3, -raio * 1.25)
      g.add(costas)
      break
    }
    case 'rodinhas': {
      const base = new THREE.Mesh(new THREE.CylinderGeometry(raio * 1.1, raio * 1.1, 0.02, 28), metal)
      base.position.y = sup.altura - 0.01
      g.add(base)
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2
        const roda = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 8), metal)
        roda.position.set(Math.cos(a) * raio * 0.8, 0.022, Math.sin(a) * raio * 0.8)
        g.add(roda)
      }
      break
    }
    default:
      break
  }
  return g
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
