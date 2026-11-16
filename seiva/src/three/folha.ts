import * as THREE from 'three'

export type OpcoesFolha = {
  /** comprimento da folha em unidades de cena (1 = 1 m) */
  comprimento: number
  /** largura máxima */
  largura: number
  /** curvatura do eixo, em radianos do ápice (0 = reta) */
  curva: number
  /** concavidade da seção, 0 = plana, 1 = canoa fechada */
  concha: number
  /** onde fica a maior largura: 0,3 = lanceolada, 0,5 = elíptica */
  ventre?: number
  /** afinamento da ponta */
  ponta?: number
  segU?: number
  segV?: number
  /** desenho de cor: faixa central, borda clara, manchas ou nenhum */
  pintura?: 'nenhuma' | 'borda' | 'centro' | 'manchas' | 'nervura'
  corA: THREE.ColorRepresentation
  corB?: THREE.ColorRepresentation
  /** recortes laterais, como na costela-de-adão (0 = sem recorte) */
  recortes?: number
  furos?: boolean
  semente?: number
}

function aleatorio(semente: number) {
  let s = semente || 1
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Superfície paramétrica de uma folha: eixo curvo, perfil de largura,
 * seção em concha e cores por vértice. Sem textura, sem arquivo externo.
 */
export function geometriaFolha(o: OpcoesFolha): THREE.BufferGeometry {
  const segU = o.segU ?? 24
  const segV = o.segV ?? 10
  const ventre = o.ventre ?? 0.42
  const ponta = o.ponta ?? 1.3
  const rnd = aleatorio(o.semente ?? 7)
  const corA = new THREE.Color(o.corA)
  const corB = new THREE.Color(o.corB ?? o.corA)
  const manchas = Array.from({ length: 6 }, () => ({
    u: 0.2 + rnd() * 0.7,
    v: rnd() * 2 - 1,
    r: 0.12 + rnd() * 0.22,
  }))

  const pos: number[] = []
  const cor: number[] = []
  const idx: number[] = []

  const perfilLargura = (u: number) => {
    // sino assimétrico: sobe rápido até o ventre, afina até a ponta
    const t = u < ventre ? u / ventre : 1 - (u - ventre) / (1 - ventre)
    let w = Math.pow(Math.max(t, 0), 0.55)
    w *= Math.pow(1 - u, 1 / ponta) + u * 0.22
    if (o.recortes) {
      // recortes laterais profundos, alternando lado
      const faixa = Math.sin(u * Math.PI * o.recortes)
      w *= 0.74 + 0.26 * Math.abs(faixa)
    }
    return w * o.largura * 0.5
  }

  for (let i = 0; i <= segU; i++) {
    const u = i / segU
    const a = o.curva * u
    const sin = Math.sin(a)
    const cos = Math.cos(a)
    const alt = o.curva === 0 ? o.comprimento * u : (o.comprimento * sin) / o.curva
    const prof = o.curva === 0 ? 0 : (o.comprimento * (1 - cos)) / o.curva
    const w = perfilLargura(u)

    for (let j = 0; j <= segV; j++) {
      const v = (j / segV) * 2 - 1
      const desvio = o.concha * (v * v) * w
      // normal da seção, perpendicular ao eixo curvo
      const x = v * w
      const y = alt - desvio * sin * -1 + desvio * 0
      const z = prof + desvio * cos * -1
      pos.push(x, y - desvio * 0.0, z)

      let c = corA.clone()
      switch (o.pintura) {
        case 'borda':
          c.lerp(corB, Math.pow(Math.abs(v), 3.2))
          break
        case 'centro':
          c.lerp(corB, Math.max(0, 1 - Math.abs(v) * 3.4))
          break
        case 'nervura':
          c.lerp(corB, Math.max(0, 1 - Math.abs(v) * 12) * 0.8)
          break
        case 'manchas': {
          let m = 0
          for (const p of manchas) {
            const d = Math.hypot((u - p.u) * 1.6, (v - p.v) * 0.5)
            m = Math.max(m, 1 - Math.min(1, d / p.r))
          }
          c.lerp(corB, Math.pow(m, 0.7) * 0.95)
          break
        }
        default:
          break
      }
      // sombreado suave da base para a ponta, para a folha não ficar plana de cor
      c.multiplyScalar(0.94 + 0.08 * u)
      cor.push(c.r, c.g, c.b)
    }
  }

  const linha = segV + 1
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * linha + j
      const b = a + linha
      if (o.furos) {
        // janelas internas da costela-de-adão: pula quads perto do eixo
        const u = i / segU
        const v = (j / segV) * 2 - 1
        const fase = Math.sin(u * Math.PI * 3.2)
        const dentro = Math.abs(v) > 0.18 && Math.abs(v) < 0.52 && fase > 0.55
        if (dentro) continue
      }
      idx.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 3))
  g.setIndex(idx)
  g.computeVertexNormals()
  return g
}

export function materialFolha(brilho = 0.35) {
  return new THREE.MeshStandardMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    roughness: 1 - brilho,
    metalness: 0.02,
    flatShading: false,
  })
}

export function geometriaCaule(pontos: THREE.Vector3[], raio: number, raioPonta = raio * 0.5) {
  const curva = new THREE.CatmullRomCurve3(pontos)
  const g = new THREE.TubeGeometry(curva, Math.max(8, pontos.length * 6), raio, 7, false)
  // afina da base para a ponta
  const p = g.attributes.position as THREE.BufferAttribute
  const seg = g.parameters.tubularSegments
  for (let i = 0; i <= seg; i++) {
    const t = i / seg
    const r = THREE.MathUtils.lerp(1, raioPonta / raio, t)
    for (let j = 0; j <= g.parameters.radialSegments; j++) {
      const k = i * (g.parameters.radialSegments + 1) + j
      const base = curva.getPointAt(Math.min(1, t))
      const x = p.getX(k) - base.x
      const y = p.getY(k) - base.y
      const z = p.getZ(k) - base.z
      p.setXYZ(k, base.x + x * r, base.y + y * r, base.z + z * r)
    }
  }
  p.needsUpdate = true
  g.computeVertexNormals()
  return g
}
