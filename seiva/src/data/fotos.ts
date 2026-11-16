import type { Planta } from './tipos'

/**
 * Fotos das espécies, baixadas do Wikimedia Commons e recortadas em quadrado.
 * Todas são de licença livre; o crédito e o link para o arquivo original estão
 * aqui e aparecem na página da planta e na página de fontes.
 */
export type Foto = {
  /** 1000 px, usada na página da planta */
  arquivo: string
  /** 560 px, usada no cartão do catálogo */
  pequena: string
  /** nome do arquivo no Commons */
  original: string
  autor: string
  licenca: string
  pagina: string
}

export const fotos: Record<string, Foto> = {
  'espada-de-sao-jorge': {
    arquivo: '/plantas/espada-de-sao-jorge-1000.jpg',
    pequena: '/plantas/espada-de-sao-jorge-560.jpg',
    original: "Sansevieria trifasciata Plant 3264px.jpg",
    autor: "Photo by and (c)2006 Derek Ramsey (Ram-Man). Location credit to the Chanticleer Garden.",
    licenca: 'CC BY-SA 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Sansevieria_trifasciata_Plant_3264px.jpg',
  },
  'jiboia': {
    arquivo: '/plantas/jiboia-1000.jpg',
    pequena: '/plantas/jiboia-560.jpg',
    original: "Epipremnum aureum (Marble Queen) houseplant.png",
    autor: "Spnq",
    licenca: 'CC BY-SA 4.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Marble_Queen)_houseplant.png',
  },
  'zamioculca': {
    arquivo: '/plantas/zamioculca-1000.jpg',
    pequena: '/plantas/zamioculca-560.jpg',
    original: "Zamioculcas zamiifolia 1.jpg",
    autor: "User:WeFt",
    licenca: 'CC BY-SA 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia_1.jpg',
  },
  'lirio-da-paz': {
    arquivo: '/plantas/lirio-da-paz-1000.jpg',
    pequena: '/plantas/lirio-da-paz-560.jpg',
    original: "Spathiphyllum wallisii in Jardin des Plantes de Toulouse 03.jpg",
    autor: "Krzysztof Golik",
    licenca: 'CC BY-SA 4.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Spathiphyllum_wallisii_in_Jardin_des_Plantes_de_Toulouse_03.jpg',
  },
  'costela-de-adao': {
    arquivo: '/plantas/costela-de-adao-1000.jpg',
    pequena: '/plantas/costela-de-adao-560.jpg',
    original: "Monstera deliciosa Monstera dziurawa 2023-10-31 03.jpg",
    autor: "Agnieszka Kwiecień, Nova",
    licenca: 'CC BY-SA 4.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_Monstera_dziurawa_2023-10-31_03.jpg',
  },
  'lavanda': {
    arquivo: '/plantas/lavanda-1000.jpg',
    pequena: '/plantas/lavanda-560.jpg',
    original: "Lavandula angustifolia prg 1.jpg",
    autor: "Karelj",
    licenca: 'Public domain',
    pagina: 'https://commons.wikimedia.org/wiki/File:Lavandula_angustifolia_prg_1.jpg',
  },
  'jasmim': {
    arquivo: '/plantas/jasmim-1000.jpg',
    pequena: '/plantas/jasmim-560.jpg',
    original: "Starr 080219-2953 Jasminum polyanthum.jpg",
    autor: "Forest & Kim Starr",
    licenca: 'CC BY 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Starr_080219-2953_Jasminum_polyanthum.jpg',
  },
  'samambaia': {
    arquivo: '/plantas/samambaia-1000.jpg',
    pequena: '/plantas/samambaia-560.jpg',
    original: "Boston Fern (Nephrolepis exaltata).jpg",
    autor: "Mokkie",
    licenca: 'CC BY-SA 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Boston_Fern_(Nephrolepis_exaltata).jpg',
  },
  'aglaonema': {
    arquivo: '/plantas/aglaonema-1000.jpg',
    pequena: '/plantas/aglaonema-560.jpg',
    original: "Starr 080117-1531 Aglaonema sp..jpg",
    autor: "Forest & Kim Starr",
    licenca: 'CC BY 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Starr_080117-1531_Aglaonema_sp..jpg',
  },
  'babosa': {
    arquivo: '/plantas/babosa-1000.jpg',
    pequena: '/plantas/babosa-560.jpg',
    original: "Aloe vera plant in a container.jpg",
    autor: "Andikan Efiok Eduok",
    licenca: 'CC BY-SA 4.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Aloe_vera_plant_in_a_container.jpg',
  },
  'clorofito': {
    arquivo: '/plantas/clorofito-1000.jpg',
    pequena: '/plantas/clorofito-560.jpg',
    original: "Spider Plant (Chlorophytum comosum).jpg",
    autor: "Mokkie",
    licenca: 'CC BY-SA 3.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Spider_Plant_(Chlorophytum_comosum).jpg',
  },
  'manjericao': {
    arquivo: '/plantas/manjericao-1000.jpg',
    pequena: '/plantas/manjericao-560.jpg',
    original: "Ocimum basilicum CG NBG LR.jpg",
    autor: "PumpkinSky",
    licenca: 'CC BY-SA 4.0',
    pagina: 'https://commons.wikimedia.org/wiki/File:Ocimum_basilicum_CG_NBG_LR.jpg',
  },
}

/** Texto curto de crédito, do jeito que as licenças do Commons pedem. */
export const creditoDe = (planta: Pick<Planta, 'id' | 'nome'>) => {
  const f = fotos[planta.id]
  return `Foto: ${f.autor}, ${f.licenca}, via Wikimedia Commons`
}
