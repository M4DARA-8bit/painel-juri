/**
 * Simulação de gavinhas: pontas de ramo que crescem com ruído de direção,
 * bifurcam, enrolam em espiral e soltam folhas que se abrem.
 *
 * Baseado no prompt gratuito "Growing Vine Tendrils" do AnimatedWebs
 * (https://animatedwebs.com/templates/greenhouse-grants-growing-vines),
 * reescrito na paleta e na escala do Seiva.
 */

export type Opcoes = {
  corCaule: string
  corFolha: string
  corNervura: string
  corBotao: string
  /** elipse que o desenho evita, em fração do quadro: onde fica o texto */
  evitar: { cx: number; cy: number; rx: number; ry: number }
  sementes: number
  segundosMax: number
  /** em tela estreita, nasce só na borda de baixo, longe do texto */
  somenteBase?: boolean
}

type Ponta = {
  x: number
  y: number
  rumo: number
  espessura: number
  energia: number
  desdeFolha: number
  proximaFolha: number
  lado: 1 | -1
  curva: number
  giro: number
  voltas: number
  viva: boolean
}

type Folha = {
  x: number
  y: number
  angulo: number
  tamanho: number
  nascida: number
  pronta: boolean
}

/** Ruído de valor suave: barato e suficiente para desviar o rumo. */
function ruido(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export class Gavinhas {
  private pontas: Ponta[] = []
  private folhas: Folha[] = []
  private botoes: { x: number; y: number; nascido: number }[] = []
  private crescido = 0
  private orcamento = 0
  private t = 0
  private inicio = 0
  private fim = false

  constructor(
    private acumulado: CanvasRenderingContext2D,
    private vivo: CanvasRenderingContext2D,
    private largura: number,
    private altura: number,
    private o: Opcoes,
  ) {
    this.semear()
  }

  private semear() {
    const { largura: l, altura: a, o } = this
    this.orcamento = (l * a) / 420
    const bordas: [number, number, number][] = []
    for (let i = 0; i < o.sementes; i++) {
      if (o.somenteBase) {
        bordas.push([l * (0.08 + 0.84 * Math.random()), a, -Math.PI / 2 + (Math.random() - 0.5)])
        continue
      }
      const lado = i % 3
      if (lado === 0) bordas.push([0, a * (0.2 + 0.6 * Math.random()), 0])
      else if (lado === 1) bordas.push([l, a * (0.2 + 0.6 * Math.random()), Math.PI])
      else bordas.push([l * (0.15 + 0.7 * Math.random()), a, -Math.PI / 2])
    }
    for (const [x, y, rumo] of bordas) this.pontas.push(this.novaPonta(x, y, rumo, 2.6, 1))
  }

  private novaPonta(x: number, y: number, rumo: number, espessura: number, energia: number): Ponta {
    return {
      x,
      y,
      rumo,
      espessura,
      energia,
      desdeFolha: 0,
      proximaFolha: 26 + Math.random() * 18,
      lado: Math.random() > 0.5 ? 1 : -1,
      curva: 0,
      giro: 0,
      voltas: 0,
      viva: true,
    }
  }

  /** Desvio suave para fora da elipse onde mora o texto. */
  private desvio(p: Ponta) {
    const { evitar } = this.o
    const cx = evitar.cx * this.largura
    const cy = evitar.cy * this.altura
    const rx = evitar.rx * this.largura
    const ry = evitar.ry * this.altura
    const dx = (p.x - cx) / rx
    const dy = (p.y - cy) / ry
    const d = dx * dx + dy * dy
    if (d > 1) return 0
    const alvo = Math.atan2(dy * ry, dx * rx)
    let dif = alvo - p.rumo
    while (dif > Math.PI) dif -= Math.PI * 2
    while (dif < -Math.PI) dif += Math.PI * 2
    return Math.sign(dif) * 0.05
  }

  private folha(x: number, y: number, angulo: number) {
    this.folhas.push({
      x,
      y,
      angulo,
      tamanho: 11 + Math.random() * 11,
      nascida: this.t,
      pronta: false,
    })
  }

  private desenharFolha(ctx: CanvasRenderingContext2D, f: Folha, escala: number, giro: number) {
    const tam = f.tamanho * escala
    ctx.save()
    ctx.translate(f.x, f.y)
    ctx.rotate(f.angulo + giro)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(tam * 0.55, -tam * 0.42, tam, 0)
    ctx.quadraticCurveTo(tam * 0.55, tam * 0.42, 0, 0)
    ctx.fillStyle = this.o.corFolha
    ctx.globalAlpha = 0.85
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(tam * 0.92, 0)
    ctx.strokeStyle = this.o.corNervura
    ctx.lineWidth = Math.max(0.5, tam * 0.06)
    ctx.stroke()
    ctx.restore()
  }

  /** Um passo da simulação. dt em segundos. */
  passo(dt: number, aceleracao = 1) {
    if (!this.inicio) this.inicio = this.t
    this.t += dt
    const ctx = this.acumulado
    ctx.lineCap = 'round'
    ctx.strokeStyle = this.o.corCaule

    const passos = Math.min(6, Math.max(2, Math.round(aceleracao * 2)))
    for (let s = 0; s < passos; s++) {
      if (this.crescido > this.orcamento || this.t - this.inicio > this.o.segundosMax) {
        this.encerrar()
        break
      }
      for (const p of this.pontas) {
        if (!p.viva) continue
        if (p.curva > 0) {
          // gavinha: o giro aperta a cada quadro
          p.giro *= 1.03
          p.rumo += p.giro
          p.voltas += Math.abs(p.giro) / (Math.PI * 2)
          if (p.voltas > 1.5 + Math.random()) p.viva = false
        } else {
          const n = ruido(p.x * 0.004, p.y * 0.004 + this.t * 0.1) * 2 - 1
          p.rumo += n * 0.04 + this.desvio(p)
        }
        const nx = p.x + Math.cos(p.rumo) * 1.4
        const ny = p.y + Math.sin(p.rumo) * 1.4
        ctx.beginPath()
        ctx.lineWidth = p.espessura
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(nx, ny)
        ctx.stroke()
        p.x = nx
        p.y = ny
        p.espessura = Math.max(0.6, p.espessura * 0.9985)
        p.desdeFolha += 1.4
        this.crescido += 1.4

        if (p.x < -40 || p.x > this.largura + 40 || p.y < -40 || p.y > this.altura + 40) p.viva = false

        if (p.desdeFolha > p.proximaFolha && p.curva === 0) {
          p.desdeFolha = 0
          p.proximaFolha = 26 + Math.random() * 18
          this.folha(p.x, p.y, p.rumo + (p.lado * Math.PI) / 2)
          p.lado = p.lado === 1 ? -1 : 1
        }
        if (p.curva === 0 && Math.random() < 0.006 && this.pontas.length < 90) {
          const lado = Math.random() > 0.5 ? 1 : -1
          this.pontas.push(
            this.novaPonta(p.x, p.y, p.rumo + lado * 0.61, p.espessura * 0.8, p.energia * 0.7),
          )
        }
        if (p.curva === 0 && Math.random() < 0.004 && this.pontas.length < 90) {
          const gav = this.novaPonta(p.x, p.y, p.rumo, p.espessura * 0.6, 0.4)
          gav.curva = 1
          gav.giro = (Math.random() > 0.5 ? 1 : -1) * 0.06
          this.pontas.push(gav)
        }
      }
      this.pontas = this.pontas.filter((p) => p.viva)
      if (!this.pontas.length) this.encerrar()
    }

    // folhas abrindo: quadro próprio, depois assadas no acumulado
    this.vivo.clearRect(0, 0, this.largura, this.altura)
    for (const f of this.folhas) {
      if (f.pronta) continue
      const idade = (this.t - f.nascida) / 0.7
      if (idade >= 1) {
        this.desenharFolha(this.acumulado, f, 1, 0)
        f.pronta = true
        continue
      }
      const mola = idade < 0.7 ? (idade / 0.7) * 1.12 : 1.12 - ((idade - 0.7) / 0.3) * 0.12
      this.desenharFolha(this.vivo, f, mola, (1 - idade) * -0.7)
    }
    for (const b of this.botoes) {
      const idade = Math.min(1, (this.t - b.nascido) / 1.2)
      this.vivo.save()
      this.vivo.translate(b.x, b.y)
      for (let i = 0; i < 4; i++) {
        this.vivo.beginPath()
        this.vivo.ellipse(0, 0, 5 * idade, 2.4 * idade, (i * Math.PI) / 2, 0, Math.PI * 2)
        this.vivo.fillStyle = this.o.corBotao
        this.vivo.fill()
      }
      this.vivo.restore()
    }
  }

  private encerrar() {
    if (this.fim) return
    this.fim = true
    const pontas = this.pontas.slice(0, 12)
    for (const p of pontas) this.botoes.push({ x: p.x, y: p.y, nascido: this.t })
    this.pontas = []
  }

  get terminou() {
    return this.fim && this.folhas.every((f) => f.pronta) && this.t > 1.5
  }

  /** Desenha tudo de uma vez, para quem pediu menos movimento. */
  imediato() {
    for (let i = 0; i < 1800; i++) this.passo(1 / 60, 1)
    this.encerrar()
    for (const f of this.folhas) {
      if (!f.pronta) {
        this.desenharFolha(this.acumulado, f, 1, 0)
        f.pronta = true
      }
    }
    this.vivo.clearRect(0, 0, this.largura, this.altura)
  }
}
