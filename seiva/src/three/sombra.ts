import * as THREE from 'three'

let textura: THREE.Texture | null = null

/** Mancha radial desenhada em canvas: sombra de contato barata e previsível. */
function texturaSombra() {
  if (textura) return textura
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62)
  g.addColorStop(0, 'rgba(23,48,31,0.85)')
  g.addColorStop(0.45, 'rgba(23,48,31,0.35)')
  g.addColorStop(1, 'rgba(23,48,31,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  textura = new THREE.CanvasTexture(c)
  textura.colorSpace = THREE.SRGBColorSpace
  return textura
}

export function malhaSombra(raio: number, opacidade: number) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(raio * 2, raio * 2),
    new THREE.MeshBasicMaterial({
      map: texturaSombra(),
      transparent: true,
      opacity: opacidade,
      depthWrite: false,
      toneMapped: false,
    }),
  )
  m.rotation.x = -Math.PI / 2
  m.position.y = 0.002
  m.renderOrder = -1
  return m
}
