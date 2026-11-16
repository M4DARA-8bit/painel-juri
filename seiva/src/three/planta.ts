import * as THREE from 'three'
import { geometriaCaule, geometriaFolha, materialFolha } from './folha'
import type { Arquetipo } from '../data/tipos'

export type Paleta = {
  folha: string
  folha2?: string
  caule: string
  flor?: string
  vaso: string
}

/** Gerador determinístico: a mesma planta sai igual em toda visita. */
function rng(semente: number) {
  let s = semente || 1
  return () => {
    s = (s * 48271) % 2147483647
    return (s - 1) / 2147483646
  }
}

const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/**
 * Cada peça recebe userData.ordem: a cena usa esse número para abrir
 * a planta em sequência quando ela entra em quadro.
 */
function peca(malha: THREE.Object3D, ordem: number) {
  malha.userData.ordem = ordem
  return malha
}

type Construtor = (p: Paleta, semente: number) => THREE.Group

const flor = (cor: string, raio: number, petalas = 5) => {
  const g = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({ color: cor, roughness: 0.6, side: THREE.DoubleSide })
  for (let i = 0; i < petalas; i++) {
    const pet = new THREE.Mesh(
      geometriaFolha({
        comprimento: raio,
        largura: raio * 0.9,
        curva: 0.6,
        concha: 0.35,
        ventre: 0.5,
        segU: 6,
        segV: 4,
        corA: cor,
      }),
      mat,
    )
    pet.rotation.y = (i / petalas) * Math.PI * 2
    pet.rotation.x = 1.1
    g.add(pet)
  }
  const miolo = new THREE.Mesh(
    new THREE.SphereGeometry(raio * 0.22, 8, 6),
    new THREE.MeshStandardMaterial({ color: '#e8c252', roughness: 0.5 }),
  )
  g.add(miolo)
  return g
}

/** Espada-de-são-jorge: lâminas eretas saindo de um ponto, borda clara. */
const rosetaLancas: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.3)
  const n = 9
  for (let i = 0; i < n; i++) {
    const h = 0.62 + r() * 0.38
    const folha = new THREE.Mesh(
      geometriaFolha({
        comprimento: h,
        largura: 0.1 + r() * 0.03,
        curva: 0.18 + r() * 0.2,
        concha: 0.5,
        ventre: 0.55,
        ponta: 2.6,
        pintura: 'borda',
        corA: p.folha,
        corB: p.folha2 ?? p.folha,
        semente: semente + i,
      }),
      mat,
    )
    folha.rotation.y = (i / n) * Math.PI * 2 + r() * 0.3
    folha.rotation.z = (r() - 0.5) * 0.22
    folha.position.set((r() - 0.5) * 0.03, 0, (r() - 0.5) * 0.03)
    g.add(peca(folha, i / n))
  }
  return g
}

/** Jiboia: coroa curta e ramos que caem pela borda do vaso. */
const trepadeiraPendente: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.4)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.8 })

  const folhaCordada = (tam: number, i: number) =>
    new THREE.Mesh(
      geometriaFolha({
        comprimento: tam,
        largura: tam * 0.82,
        curva: 0.5,
        concha: 0.22,
        ventre: 0.36,
        pintura: 'manchas',
        corA: p.folha,
        corB: p.folha2 ?? p.folha,
        semente: semente + i,
      }),
      mat,
    )

  // coroa: folhas eretas saindo do substrato
  for (let i = 0; i < 5; i++) {
    const ang = (i / 5) * Math.PI * 2 + r()
    const alt = 0.2 + r() * 0.12
    g.add(
      peca(
        new THREE.Mesh(
          geometriaCaule([v3(0, 0, 0), v3(Math.cos(ang) * 0.06, alt, Math.sin(ang) * 0.06)], 0.008, 0.005),
          matCaule,
        ),
        i / 10,
      ),
    )
    const f = folhaCordada(0.26 + r() * 0.05, i)
    f.position.set(Math.cos(ang) * 0.06, alt, Math.sin(ang) * 0.06)
    f.rotation.y = ang
    f.rotation.x = 0.7 + r() * 0.4
    g.add(peca(f, 0.2 + i / 12))
  }

  // ramos pendentes
  const ramos = 6
  for (let b = 0; b < ramos; b++) {
    const ang = (b / ramos) * Math.PI * 2 + r() * 0.5
    const raio = 0.16 + r() * 0.1
    const queda = 0.7 + r() * 0.5
    const pontos = [
      v3(0, 0.06, 0),
      v3(Math.cos(ang) * raio * 0.7, 0.18 + r() * 0.06, Math.sin(ang) * raio * 0.7),
      v3(Math.cos(ang) * raio * 1.25, 0.02, Math.sin(ang) * raio * 1.25),
      v3(Math.cos(ang) * raio * 1.45, -queda * 0.55, Math.sin(ang) * raio * 1.45),
      v3(Math.cos(ang) * raio * 1.3, -queda, Math.sin(ang) * raio * 1.3),
    ]
    g.add(peca(new THREE.Mesh(geometriaCaule(pontos, 0.008, 0.004), matCaule), 0.25 + (b / ramos) * 0.3))
    const curva = new THREE.CatmullRomCurve3(pontos)
    const folhas = 7
    for (let i = 1; i <= folhas; i++) {
      const t = i / (folhas + 0.4)
      const ponto = curva.getPointAt(t)
      const f = folhaCordada(0.22 - t * 0.08, b * 13 + i)
      f.position.copy(ponto)
      f.rotation.y = ang + (i % 2 ? 1.1 : -1.1)
      f.rotation.x = 1.5 + t * 0.9 + r() * 0.2
      f.rotation.z = (r() - 0.5) * 0.5
      g.add(peca(f, 0.35 + t * 0.55))
    }
  }
  return g
}

/** Zamioculca: hastes eretas com folíolos pares e brilho de cera. */
const penaComposta: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.62)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.45 })
  const hastes = 7
  for (let h = 0; h < hastes; h++) {
    const ang = (h / hastes) * Math.PI * 2 + r() * 0.4
    const alt = 0.68 + r() * 0.3
    const incl = 0.3 + r() * 0.22
    const pontos = [
      v3(0, 0, 0),
      v3(Math.cos(ang) * alt * incl * 0.25, alt * 0.45, Math.sin(ang) * alt * incl * 0.25),
      v3(Math.cos(ang) * alt * incl, alt * 0.95, Math.sin(ang) * alt * incl),
    ]
    const caule = new THREE.Mesh(geometriaCaule(pontos, 0.016, 0.006), matCaule)
    g.add(peca(caule, h / hastes * 0.4))
    const curva = new THREE.CatmullRomCurve3(pontos)
    const pares = 6
    for (let i = 1; i <= pares; i++) {
      const t = 0.25 + (i / pares) * 0.72
      const ponto = curva.getPointAt(Math.min(t, 1))
      for (const lado of [-1, 1]) {
        const tam = 0.14 - (t - 0.25) * 0.06
        const fol = new THREE.Mesh(
          geometriaFolha({
            comprimento: tam,
            largura: tam * 0.62,
            curva: 0.35,
            concha: 0.3,
            ventre: 0.46,
            corA: p.folha,
            semente: semente + h * 17 + i,
          }),
          mat,
        )
        fol.position.copy(ponto)
        fol.rotation.y = ang + Math.PI / 2
        fol.rotation.z = lado * (1.1 + r() * 0.2)
        g.add(peca(fol, 0.3 + t * 0.6))
      }
    }
  }
  return g
}

/** Lírio-da-paz: folhas largas brotando do chão e a espata branca. */
const espataLarga: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.42)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.7 })
  const n = 10
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + r() * 0.5
    const alt = 0.5 + r() * 0.3
    const pontos = [v3(0, 0, 0), v3(Math.cos(ang) * alt * 0.18, alt * 0.55, Math.sin(ang) * alt * 0.18)]
    g.add(peca(new THREE.Mesh(geometriaCaule(pontos, 0.009, 0.006), matCaule), i / n * 0.3))
    const folha = new THREE.Mesh(
      geometriaFolha({
        comprimento: 0.42 + r() * 0.16,
        largura: 0.2 + r() * 0.05,
        curva: 0.75,
        concha: 0.28,
        ventre: 0.42,
        pintura: 'nervura',
        corA: p.folha,
        corB: '#9fc08a',
        semente: semente + i,
      }),
      mat,
    )
    folha.position.set(Math.cos(ang) * alt * 0.18, alt * 0.55, Math.sin(ang) * alt * 0.18)
    folha.rotation.y = ang
    folha.rotation.x = 0.35 + r() * 0.3
    g.add(peca(folha, 0.2 + (i / n) * 0.6))
  }
  if (p.flor) {
    for (let f = 0; f < 2; f++) {
      const ang = r() * Math.PI * 2
      const alt = 0.8 + r() * 0.15
      const haste = new THREE.Mesh(
        geometriaCaule([v3(0, 0, 0), v3(Math.cos(ang) * 0.05, alt, Math.sin(ang) * 0.05)], 0.008, 0.006),
        matCaule,
      )
      g.add(peca(haste, 0.8))
      const espata = new THREE.Mesh(
        geometriaFolha({
          comprimento: 0.17,
          largura: 0.12,
          curva: 1.0,
          concha: 0.75,
          ventre: 0.4,
          corA: p.flor,
          semente: semente + f,
        }),
        materialFolha(0.5),
      )
      espata.position.set(Math.cos(ang) * 0.05, alt, Math.sin(ang) * 0.05)
      espata.rotation.y = ang + 1.4
      espata.rotation.x = -0.25
      g.add(peca(espata, 0.9))
      const espadice = new THREE.Mesh(
        new THREE.CylinderGeometry(0.009, 0.007, 0.07, 8),
        new THREE.MeshStandardMaterial({ color: '#e7e3c8', roughness: 0.7 }),
      )
      espadice.position.set(Math.cos(ang) * 0.05, alt + 0.045, Math.sin(ang) * 0.05)
      g.add(peca(espadice, 0.92))
    }
  }
  return g
}

/** Costela-de-adão: folha grande recortada e com janelas. */
const folhaFenestrada: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.5)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.6 })
  const n = 7
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + r() * 0.4
    const alt = 0.3 + (i / n) * 0.45 + r() * 0.1
    const raio = 0.16 + (i / n) * 0.2
    const base = v3(0, 0, 0)
    const topo = v3(Math.cos(ang) * raio, alt, Math.sin(ang) * raio)
    g.add(
      peca(
        new THREE.Mesh(
          geometriaCaule([base, v3(topo.x * 0.4, alt * 0.6, topo.z * 0.4), topo], 0.015, 0.011),
          matCaule,
        ),
        i / n * 0.4,
      ),
    )
    const tam = 0.3 + r() * 0.16
    const folha = new THREE.Mesh(
      geometriaFolha({
        comprimento: tam,
        largura: tam * 1.08,
        curva: 0.38,
        concha: 0.14,
        ventre: 0.5,
        recortes: 6,
        segU: 28,
        segV: 14,
        pintura: 'nervura',
        corA: p.folha,
        corB: '#86b96a',
        semente: semente + i * 7,
      }),
      mat,
    )
    folha.position.copy(topo)
    folha.rotation.y = ang
    folha.rotation.x = 1.45 + r() * 0.25
    g.add(peca(folha, 0.25 + (i / n) * 0.7))
  }
  return g
}

/** Lavanda: arbusto cinza-esverdeado com espigas roxas. */
const arbustoEspigas: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.2)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.9 })
  const matFlor = new THREE.MeshStandardMaterial({ color: p.flor ?? '#7b5ea7', roughness: 0.7 })
  const ramos = 16
  for (let b = 0; b < ramos; b++) {
    const ang = r() * Math.PI * 2
    const raio = 0.04 + r() * 0.12
    const alt = 0.45 + r() * 0.35
    const topo = v3(Math.cos(ang) * raio, alt, Math.sin(ang) * raio)
    g.add(peca(new THREE.Mesh(geometriaCaule([v3(0, 0, 0), topo], 0.006, 0.004), matCaule), b / ramos * 0.4))
    for (let i = 0; i < 6; i++) {
      const t = 0.2 + (i / 6) * 0.6
      const tam = 0.07 + r() * 0.03
      const fol = new THREE.Mesh(
        geometriaFolha({
          comprimento: tam,
          largura: tam * 0.2,
          curva: 0.3,
          concha: 0.4,
          ventre: 0.5,
          ponta: 2,
          segU: 8,
          segV: 4,
          corA: p.folha,
          semente: semente + b * 9 + i,
        }),
        mat,
      )
      fol.position.set(topo.x * t, alt * t, topo.z * t)
      fol.rotation.y = ang + (i % 2 ? 1.2 : -1.2)
      fol.rotation.z = (i % 2 ? 1 : -1) * 0.9
      g.add(peca(fol, 0.2 + t * 0.4))
    }
    if (b % 2 === 0) {
      // espiga: contas pequenas empilhadas
      const espiga = new THREE.Group()
      for (let k = 0; k < 9; k++) {
        const conta = new THREE.Mesh(new THREE.SphereGeometry(0.014 - k * 0.0008, 6, 5), matFlor)
        conta.position.y = k * 0.019
        conta.position.x = (r() - 0.5) * 0.008
        espiga.add(conta)
      }
      espiga.position.copy(topo)
      g.add(peca(espiga, 0.75 + r() * 0.2))
    }
  }
  return g
}

/** Jasmim: ramos trepadores com flores brancas de cinco pétalas. */
const trepadeiraFlorida: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.4)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.8 })
  // treliça em arco
  const matTrelica = new THREE.MeshStandardMaterial({ color: '#a98d6b', roughness: 0.85 })
  for (const lado of [-1, 1]) {
    const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.9, 8), matTrelica)
    haste.position.set(lado * 0.12, 0.45, 0)
    g.add(peca(haste, 0))
  }
  const arco = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.008, 6, 16, Math.PI), matTrelica)
  arco.position.y = 0.9
  arco.rotation.z = 0
  g.add(peca(arco, 0))
  const ramos = 6
  for (let b = 0; b < ramos; b++) {
    const lado = b % 2 ? 1 : -1
    const pontos = [v3(lado * 0.03, 0, 0)]
    for (let k = 1; k <= 5; k++) {
      const t = k / 5
      pontos.push(
        v3(
          lado * (0.12 * Math.sin(t * 3 + b) * 0.6 + 0.05),
          t * (0.85 + r() * 0.15),
          Math.cos(t * 4 + b) * 0.06,
        ),
      )
    }
    g.add(peca(new THREE.Mesh(geometriaCaule(pontos, 0.007, 0.004), matCaule), b / ramos * 0.4))
    const curva = new THREE.CatmullRomCurve3(pontos)
    for (let i = 1; i <= 7; i++) {
      const t = i / 7.5
      const ponto = curva.getPointAt(t)
      const tam = 0.075
      const fol = new THREE.Mesh(
        geometriaFolha({
          comprimento: tam,
          largura: tam * 0.5,
          curva: 0.4,
          concha: 0.2,
          ventre: 0.36,
          segU: 8,
          segV: 5,
          corA: p.folha,
          semente: semente + b * 11 + i,
        }),
        mat,
      )
      fol.position.copy(ponto)
      fol.rotation.y = r() * 6
      fol.rotation.z = (i % 2 ? 1 : -1) * 1.1
      g.add(peca(fol, 0.2 + t * 0.5))
      if (i % 3 === 0 && p.flor) {
        const f = flor(p.flor, 0.028, 5)
        f.position.copy(ponto).add(v3((r() - 0.5) * 0.03, 0.02, (r() - 0.5) * 0.03))
        f.rotation.set(r() * 0.6 - 0.3, r() * 6, r() * 0.6 - 0.3)
        g.add(peca(f, 0.8 + r() * 0.15))
      }
    }
  }
  return g
}

/** Samambaia: fronde arqueada com folíolos miúdos. */
const frondeSamambaia: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.3)
  const matRaque = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.85 })
  const frondes = 14
  for (let f = 0; f < frondes; f++) {
    const ang = (f / frondes) * Math.PI * 2 + r() * 0.3
    const comp = 0.55 + r() * 0.3
    const pontos = [v3(0, 0.02, 0)]
    for (let k = 1; k <= 6; k++) {
      const t = k / 6
      pontos.push(
        v3(
          Math.cos(ang) * comp * t * 1.15,
          0.35 * Math.sin(t * 2.2) - t * t * 0.42,
          Math.sin(ang) * comp * t * 1.15,
        ),
      )
    }
    const raque = new THREE.Mesh(geometriaCaule(pontos, 0.006, 0.002), matRaque)
    g.add(peca(raque, f / frondes * 0.35))
    const curva = new THREE.CatmullRomCurve3(pontos)
    const pares = 11
    for (let i = 1; i <= pares; i++) {
      const t = i / (pares + 1)
      const ponto = curva.getPointAt(t)
      const tam = (0.07 + r() * 0.02) * Math.sin(Math.PI * Math.min(0.95, t + 0.15))
      for (const lado of [-1, 1]) {
        const fol = new THREE.Mesh(
          geometriaFolha({
            comprimento: tam,
            largura: tam * 0.42,
            curva: 0.5,
            concha: 0.3,
            ventre: 0.4,
            segU: 7,
            segV: 4,
            pintura: 'borda',
            corA: p.folha,
            corB: p.folha2 ?? p.folha,
            semente: semente + f * 13 + i,
          }),
          mat,
        )
        fol.position.copy(ponto)
        fol.rotation.y = ang + Math.PI / 2
        fol.rotation.z = lado * 1.15
        fol.rotation.x = -0.3
        g.add(peca(fol, 0.25 + t * 0.6))
      }
    }
  }
  return g
}

/** Aglaonema: folhas largas pintadas, porte baixo. */
const folhaPintada: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.45)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.7 })
  const n = 11
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + r() * 0.5
    const alt = 0.22 + r() * 0.2
    const raio = 0.1 + r() * 0.1
    const topo = v3(Math.cos(ang) * raio, alt, Math.sin(ang) * raio)
    g.add(peca(new THREE.Mesh(geometriaCaule([v3(0, 0, 0), topo], 0.009, 0.006), matCaule), i / n * 0.3))
    const tam = 0.3 + r() * 0.12
    const folha = new THREE.Mesh(
      geometriaFolha({
        comprimento: tam,
        largura: tam * 0.42,
        curva: 0.7,
        concha: 0.26,
        ventre: 0.44,
        pintura: 'manchas',
        corA: p.folha,
        corB: p.folha2 ?? '#cfd8c0',
        semente: semente + i * 5,
      }),
      mat,
    )
    folha.position.copy(topo)
    folha.rotation.y = ang
    folha.rotation.x = 0.75 + r() * 0.35
    g.add(peca(folha, 0.2 + (i / n) * 0.7))
  }
  return g
}

/** Babosa: roseta de folhas carnudas, com dentes na borda. */
const rosetaSuculenta: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.35)
  const matDente = new THREE.MeshStandardMaterial({ color: '#e6eccd', roughness: 0.6 })
  const camadas = 3
  let ordem = 0
  for (let c = 0; c < camadas; c++) {
    const n = 7 - c
    for (let i = 0; i < n; i++) {
      const comp = 0.9 - c * 0.22
      const folha = new THREE.Mesh(
        geometriaFolha({
          comprimento: comp,
          largura: 0.16 - c * 0.02,
          curva: 0.5 + c * 0.25,
          concha: 0.85,
          ventre: 0.3,
          ponta: 3,
          pintura: 'manchas',
          corA: p.folha,
          corB: p.folha2 ?? '#cfe0b4',
          semente: semente + c * 31 + i,
        }),
        mat,
      )
      folha.rotation.y = (i / n) * Math.PI * 2 + c * 0.7
      folha.rotation.z = 0.5 + c * 0.3 + r() * 0.12
      folha.position.y = 0.01 + c * 0.015
      g.add(peca(folha, ordem++ / 18))
      // dentes da borda
      for (let d = 0; d < 5; d++) {
        const t = 0.25 + (d / 5) * 0.6
        const dente = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.018, 4), matDente)
        const raioLocal = (0.16 - c * 0.02) * 0.45 * Math.sin(Math.PI * t)
        dente.position.set(raioLocal * (d % 2 ? 1 : -1), comp * t * 0.92, 0)
        dente.rotation.z = (d % 2 ? -1 : 1) * 1.3
        folha.add(dente)
      }
    }
  }
  return g
}

/** Clorofito: folhas arqueadas listradas e hastes com mudas. */
const arqueadaFilhotes: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.35)
  const matHaste = new THREE.MeshStandardMaterial({ color: '#c8d79a', roughness: 0.8 })
  const n = 18
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + r() * 0.4
    const comp = 0.45 + r() * 0.3
    const folha = new THREE.Mesh(
      geometriaFolha({
        comprimento: comp,
        largura: 0.055 + r() * 0.015,
        curva: 2.15 + r() * 0.6,
        concha: 0.5,
        ventre: 0.4,
        ponta: 2.4,
        pintura: 'centro',
        corA: p.folha,
        corB: p.folha2 ?? '#eef2d8',
        semente: semente + i,
      }),
      mat,
    )
    folha.rotation.y = ang
    folha.rotation.x = -0.1
    g.add(peca(folha, (i / n) * 0.7))
  }
  // hastes com muda na ponta
  for (let h = 0; h < 3; h++) {
    const ang = r() * Math.PI * 2
    const comp = 0.5 + r() * 0.2
    const pontos = [
      v3(0, 0.1, 0),
      v3(Math.cos(ang) * comp * 0.5, 0.42, Math.sin(ang) * comp * 0.5),
      v3(Math.cos(ang) * comp, 0.12, Math.sin(ang) * comp),
    ]
    g.add(peca(new THREE.Mesh(geometriaCaule(pontos, 0.005, 0.003), matHaste), 0.6))
    const muda = new THREE.Group()
    for (let i = 0; i < 6; i++) {
      const f = new THREE.Mesh(
        geometriaFolha({
          comprimento: 0.11,
          largura: 0.022,
          curva: 1.6,
          concha: 0.5,
          ventre: 0.4,
          segU: 8,
          segV: 4,
          pintura: 'centro',
          corA: p.folha,
          corB: p.folha2 ?? '#eef2d8',
          semente: semente + h * 7 + i,
        }),
        mat,
      )
      f.rotation.y = (i / 6) * Math.PI * 2
      f.rotation.x = 0.4
      muda.add(f)
    }
    muda.position.copy(pontos[2])
    g.add(peca(muda, 0.85))
  }
  return g
}

/** Manjericão: arbusto de folhas opostas, com botão de flor. */
const arbustoFolhasPares: Construtor = (p, semente) => {
  const r = rng(semente)
  const g = new THREE.Group()
  const mat = materialFolha(0.42)
  const matCaule = new THREE.MeshStandardMaterial({ color: p.caule, roughness: 0.8 })
  const hastes = 4
  for (let h = 0; h < hastes; h++) {
    const ang = (h / hastes) * Math.PI * 2
    const alt = 0.55 + r() * 0.3
    const inc = 0.1 + r() * 0.1
    const topo = v3(Math.cos(ang) * alt * inc, alt, Math.sin(ang) * alt * inc)
    g.add(peca(new THREE.Mesh(geometriaCaule([v3(0, 0, 0), topo], 0.012, 0.006), matCaule), h / hastes * 0.3))
    const niveis = 5
    for (let k = 1; k <= niveis; k++) {
      const t = k / (niveis + 0.4)
      const pos = v3(topo.x * t, alt * t, topo.z * t)
      for (const lado of [0, 1]) {
        const tam = 0.14 - t * 0.05
        const fol = new THREE.Mesh(
          geometriaFolha({
            comprimento: tam,
            largura: tam * 0.72,
            curva: 0.45,
            concha: 0.35,
            ventre: 0.42,
            pintura: 'nervura',
            corA: p.folha,
            corB: p.folha2 ?? '#79a94a',
            semente: semente + h * 19 + k,
          }),
          mat,
        )
        fol.position.copy(pos)
        fol.rotation.y = ang + (k % 2 ? 0 : Math.PI / 2) + lado * Math.PI
        fol.rotation.x = 0.95
        g.add(peca(fol, 0.2 + t * 0.6))
      }
    }
    if (p.flor && h % 2 === 0) {
      const espiga = new THREE.Group()
      for (let k = 0; k < 6; k++) {
        const c = new THREE.Mesh(
          new THREE.SphereGeometry(0.009, 6, 5),
          new THREE.MeshStandardMaterial({ color: p.flor, roughness: 0.7 }),
        )
        c.position.y = k * 0.016
        espiga.add(c)
      }
      espiga.position.copy(topo)
      g.add(peca(espiga, 0.85))
    }
  }
  return g
}

/**
 * O porte da ficha é a medida da espécie; o modelo precisa de um ajuste
 * para trepadeira e pendente, cuja altura inclui o ramo que cai.
 */
export const fatorPorte: Record<Arquetipo, number> = {
  rosetaLancas: 1,
  trepadeiraPendente: 0.55,
  penaComposta: 1,
  espataLarga: 1,
  folhaFenestrada: 0.85,
  arbustoEspigas: 1,
  trepadeiraFlorida: 0.7,
  frondeSamambaia: 1,
  folhaPintada: 1,
  rosetaSuculenta: 1,
  arqueadaFilhotes: 0.85,
  arbustoFolhasPares: 1,
}

const construtores: Record<Arquetipo, Construtor> = {
  rosetaLancas,
  trepadeiraPendente,
  penaComposta,
  espataLarga,
  folhaFenestrada,
  arbustoEspigas,
  trepadeiraFlorida,
  frondeSamambaia,
  folhaPintada,
  rosetaSuculenta,
  arqueadaFilhotes,
  arbustoFolhasPares,
}

/**
 * Monta a planta normalizada: base no y = 0, altura aproximada de 1 unidade.
 * A cena escala conforme o porte real da espécie.
 */
export function montarPlanta(arquetipo: Arquetipo, paleta: Paleta, semente = 11): THREE.Group {
  const g = construtores[arquetipo](paleta, semente)
  const caixa = new THREE.Box3().setFromObject(g)
  const alt = Math.max(0.001, caixa.max.y - Math.min(0, caixa.min.y))
  g.scale.setScalar(1 / alt)
  return g
}
