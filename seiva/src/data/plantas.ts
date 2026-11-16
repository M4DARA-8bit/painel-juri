import type { Planta } from './tipos'

/** Fontes usadas por mais de uma planta. */
export const fonteAspca = {
  id: 'aspca',
  titulo: 'Toxic and Non-Toxic Plants List',
  veiculo: 'ASPCA — Animal Poison Control',
  url: 'https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants',
}
export const fonteNasa = {
  id: 'nasa89',
  titulo: 'NASA Clean Air Study (relatório de 1989, Wolverton et al.)',
  veiculo: 'Wikipédia — verbete com a referência do relatório',
  url: 'https://en.wikipedia.org/wiki/NASA_Clean_Air_Study',
}
export const fonteDrexel = {
  id: 'drexel20',
  titulo: 'Revisão de 196 experimentos (Cummings & Waring, Drexel, 2020): plantas em vaso não melhoram o ar de um ambiente real',
  veiculo: 'The Philadelphia Inquirer',
  url: 'https://www.inquirer.com/health/drexel-study-houseplants-indoor-air-purifying-nasa-20191108.html',
}
export const fonteMassive = {
  id: 'massive',
  titulo: 'O que o estudo da NASA sobre plantas e poluição realmente mostrou',
  veiculo: 'Massive Science',
  url: 'https://massivesci.com/articles/houseplants-air-pollution-quality-vocs-indoors-nasa-study',
}

export const plantas: Planta[] = [
  {
    id: 'espada-de-sao-jorge',
    nome: 'Espada-de-são-jorge',
    cientifico: 'Dracaena trifasciata',
    resumo:
      'Folha ereta, rígida, de borda clara. Aguenta semanas sem água e luz fraca: é a planta para quem viaja.',
    arquetipo: 'rosetaLancas',
    dificuldade: 1,
    precoBase: 69,
    porte: {
      valor: { alturaCm: [60, 120], larguraCm: [25, 45], classe: 'medio' },
      texto:
        'Dentro de casa fica entre 60 cm e 1,2 m. A variedade anã “Hahnii” para em 15 a 30 cm.',
      fontes: ['costa-espada'],
    },
    rega: {
      valor: { diasEntreRegas: [14, 56], inverno: 'Reduza quase pela metade no frio.' },
      texto:
        'Regue só quando o substrato estiver seco: de 2 a 8 semanas, conforme a luz e o calor. Excesso de água apodrece a raiz.',
      fontes: ['costa-espada', 'gkh-espada'],
    },
    luz: {
      valor: { nivel: 3, horasSolDireto: null },
      texto:
        'Prefere luz indireta forte e tolera sombra parcial. Sol direto forte queima a folha.',
      fontes: ['costa-espada', 'gkh-espada'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: null, tempC: [18, 29] },
      texto: 'Ambiente interno seco, sem corrente de ar frio. Não exige umidade nenhuma.',
      fontes: ['costa-espada'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'A folhagem não tem cheiro. A floração é rara dentro de casa.',
      fontes: ['costa-espada'],
    },
    agrega: {
      valor: [
        'Linhas verticais num canto estreito',
        'Perdoa esquecimento de rega',
        'Aparece na lista de plantas testadas pela NASA em 1989 — veja a ressalva sobre ar',
      ],
      texto:
        'Estrutura e verticalidade. Sobre purificar o ar: o teste de 1989 foi em câmara selada e a revisão de 2020 concluiu que, num quarto real, a troca de ar da casa faz o trabalho.',
      fontes: ['nasa89', 'drexel20'],
    },
    lugares: {
      valor: [
        { lugar: 'Quarto', porque: 'aguenta a luz fraca de quarto com janela pequena' },
        { lugar: 'Corredor', porque: 'ocupa pouca largura e não pede atenção' },
        { lugar: 'Escritório', porque: 'sobrevive a ar-condicionado e a fins de semana sem ninguém' },
      ],
      texto: 'Vai bem em qualquer canto com alguma luz. Evite banheiro muito úmido e fechado.',
      fontes: ['costa-espada', 'gkh-espada'],
    },
    pet: {
      valor: 'toxico',
      texto: 'Listada como tóxica para cães e gatos. Mantenha fora do alcance.',
      fontes: ['aspca'],
    },
    paleta: { folha: '#2f5d33', folha2: '#b9cf6a', caule: '#2f5d33', vaso: '#c9c2b4' },
    fontes: [
      {
        id: 'costa-espada',
        titulo: 'Snake Plant Care: The Complete Growing Guide',
        veiculo: 'Costa Farms',
        url: 'https://costafarms.com/blogs/get-growing/complete-snake-plant-growing-guide',
      },
      {
        id: 'gkh-espada',
        titulo: 'Snake Plant Care Guide',
        veiculo: 'Gardening Know How',
        url: 'https://www.gardeningknowhow.com/houseplantssnake-plant/snake-plant-care.htm',
      },
      fonteAspca,
      fonteNasa,
      fonteDrexel,
    ],
  },
  {
    id: 'jiboia',
    nome: 'Jiboia',
    cientifico: 'Epipremnum aureum',
    resumo:
      'Trepadeira de folha marmorizada. Pende de estante ou sobe em tutor de musgo, e cresce rápido o ano todo.',
    arquetipo: 'trepadeiraPendente',
    dificuldade: 1,
    precoBase: 49,
    porte: {
      valor: { alturaCm: [30, 200], larguraCm: [40, 90], classe: 'medio' },
      texto:
        'Ramo pendente de 1 a 2 m dentro de casa. Em planta adulta, a folha chega a 90 cm de comprimento.',
      fontes: ['rhs-jiboia-ficha'],
    },
    rega: {
      valor: { diasEntreRegas: [7, 14], inverno: 'Espere o substrato secar mais antes de molhar.' },
      texto:
        'Regue quando os primeiros centímetros secarem. Substrato com drenagem livre, para a raiz não ficar encharcada.',
      fontes: ['rhs-jiboia-guia'],
    },
    luz: {
      valor: { nivel: 2, horasSolDireto: null },
      texto:
        'Luz indireta clara dá o melhor desenho na folha, mas tolera ambiente de pouca luz. Sol direto queima.',
      fontes: ['rhs-jiboia-guia'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: [40, 60], tempC: [18, 28] },
      texto: 'Interno, quente. Aceita o banheiro e a cozinha, onde o vapor ajuda.',
      fontes: ['rhs-jiboia-guia'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro. Não floresce dentro de casa.',
      fontes: ['rhs-jiboia-ficha'],
    },
    agrega: {
      valor: [
        'Preenche altura e vão de estante',
        'Dá muda fácil: um galho na água cria raiz',
        'Resiste a pragas e doenças',
      ],
      texto:
        'Volume verde barato e rápido. A RHS a classifica como “geralmente livre de pragas e de doenças”.',
      fontes: ['rhs-jiboia-ficha'],
    },
    lugares: {
      valor: [
        { lugar: 'Estante alta da sala', porque: 'o ramo pendente ocupa o vão vertical' },
        { lugar: 'Banheiro com janela', porque: 'o vapor do banho substitui a borrifada' },
        { lugar: 'Cozinha', porque: 'aguenta a variação de calor perto da pia' },
      ],
      texto: 'Suporte de tutor de musgo para subir, ou pendente livre.',
      fontes: ['rhs-jiboia-ficha'],
    },
    pet: {
      valor: 'toxico',
      texto: 'Tóxica para cães e gatos se mastigada. Evite ramo pendente ao alcance do bicho.',
      fontes: ['aspca'],
    },
    paleta: { folha: '#4b8c3b', folha2: '#e4df8b', caule: '#6f9b4a', vaso: '#b9b0a0' },
    fontes: [
      {
        id: 'rhs-jiboia-ficha',
        titulo: 'Epipremnum aureum — ficha da planta (tamanho da folha, poda, pragas)',
        veiculo: 'Royal Horticultural Society',
        url: 'https://www.rhs.org.uk/plants/91403/epipremnum-aureum/details',
      },
      {
        id: 'rhs-jiboia-guia',
        titulo: 'How to grow epipremnum — guia de cultivo',
        veiculo: 'Royal Horticultural Society',
        url: 'https://www.rhs.org.uk/plants/epipremnum/growing-guide',
      },
      fonteAspca,
    ],
  },
  {
    id: 'zamioculca',
    nome: 'Zamioculca',
    cientifico: 'Zamioculcas zamiifolia',
    resumo:
      'Folha grossa e encerada que guarda água no rizoma. A planta que mais perdoa: pouca luz, pouca rega.',
    arquetipo: 'penaComposta',
    dificuldade: 1,
    precoBase: 119,
    porte: {
      valor: { alturaCm: [60, 90], larguraCm: [50, 80], classe: 'medio' },
      texto: 'Chega a 90 cm em vaso, devagar. A variedade “Zamicro” fica abaixo de 60 cm.',
      fontes: ['gw-zamio', 'ill-zamio'],
    },
    rega: {
      valor: { diasEntreRegas: [14, 21], inverno: 'No frio e na sombra, pode passar de 3 semanas.' },
      texto:
        'Regue quando os 5 a 7 cm de cima estiverem secos: cerca de 2 a 3 semanas. Quanto menos luz, menos água.',
      fontes: ['gw-zamio'],
    },
    luz: {
      valor: { nivel: 2, horasSolDireto: null },
      texto:
        'Sobrevive em luz baixa, cresce melhor em luz média a clara e indireta. Sol direto queima a folha.',
      fontes: ['gw-zamio', 'ill-zamio'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: null, tempC: [18, 26] },
      texto: 'Interno, seco, estável. Não precisa de borrifada nem de umidificador.',
      fontes: ['gw-zamio'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro na folha. Floração discreta e rara dentro de casa.',
      fontes: ['gw-zamio'],
    },
    agrega: {
      valor: [
        'Brilho: a folha encerada reflete a luz do ambiente',
        'Sobrevive a corredor sem janela',
        'Crescimento lento: o desenho do vaso dura anos igual',
      ],
      texto: 'Presença escultural num ponto que nenhuma outra planta aceita.',
      fontes: ['ill-zamio'],
    },
    lugares: {
      valor: [
        { lugar: 'Hall de entrada', porque: 'luz indireta fraca e passagem de gente não a incomodam' },
        { lugar: 'Escritório', porque: 'aguenta semanas sem rega e luz de lâmpada' },
        { lugar: 'Sala de jantar', porque: 'folha brilhante rende bem perto de luminária' },
      ],
      texto: 'Qualquer ponto interno com alguma luz. Evite sol direto da tarde.',
      fontes: ['ill-zamio'],
    },
    pet: {
      valor: 'toxico',
      texto:
        'A seiva tem cristais de oxalato de cálcio: mastigar causa irritação na boca e mal-estar em pets e crianças.',
      fontes: ['ill-zamio', 'aspca'],
    },
    paleta: { folha: '#245c2c', caule: '#3b7a3a', vaso: '#8d8577' },
    fontes: [
      {
        id: 'gw-zamio',
        titulo: 'How to grow ZZ plant (Zamioculcas zamiifolia)',
        veiculo: "BBC Gardeners' World Magazine",
        url: 'https://gardenersworld.com/house-plants/how-to-grow-zz-plant-zamioculcas-zamiifolia',
      },
      {
        id: 'ill-zamio',
        titulo: 'Houseplant spotlight: ZZ plant',
        veiculo: 'University of Illinois Extension — Good Growing',
        url: 'https://extension.illinois.edu/blogs/good-growing/2026-01-09-houseplant-spotlight-zz-plant',
      },
      fonteAspca,
    ],
  },
  {
    id: 'lirio-da-paz',
    nome: 'Lírio-da-paz',
    cientifico: 'Spathiphyllum wallisii',
    resumo:
      'A única que floresce branco em luz fraca. Avisa quando está com sede: a folha cai e levanta depois da rega.',
    arquetipo: 'espataLarga',
    dificuldade: 2,
    precoBase: 59,
    porte: {
      valor: { alturaCm: [30, 120], larguraCm: [40, 90], classe: 'medio' },
      texto: 'Entre 30 cm e 1,2 m dentro de casa, conforme a variedade e o vaso.',
      fontes: ['epic-lirio'],
    },
    rega: {
      valor: { diasEntreRegas: [5, 10], inverno: 'Espere a superfície secar; no frio demora mais.' },
      texto:
        'Regue quando a superfície estiver seca ao toque. Aguenta melhor a falta do que o excesso de água. A folha caída é o aviso.',
      fontes: ['epic-lirio'],
    },
    luz: {
      valor: { nivel: 1, horasSolDireto: null },
      texto:
        'Luz baixa a média. Folha amarela indica luz demais; risco marrom é queimadura de sol direto.',
      fontes: ['epic-lirio'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: [50, 70], tempC: [18, 27] },
      texto:
        'Gosta de ar úmido. Borrifada, umidificador ou um banheiro com luz resolvem.',
      fontes: ['epic-lirio'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro marcante', intensidade: 0 },
      texto: 'Folha e flor não perfumam o ambiente.',
      fontes: ['epic-lirio'],
    },
    agrega: {
      valor: [
        'Flor branca em ponto de pouca luz',
        'Indicador visível de rega: a folha cai antes de sofrer',
        'Entrou no teste da NASA de 1989 para benzeno e formaldeído — leia a ressalva',
      ],
      texto:
        'Floração onde quase nada floresce. Sobre o ar: o teste de 1989 foi em câmara selada; a revisão de 2020 mostrou que a troca de ar de uma casa real supera o efeito das plantas em vaso.',
      fontes: ['nasa89', 'drexel20', 'hg-lirio'],
    },
    lugares: {
      valor: [
        { lugar: 'Banheiro com janela', porque: 'o vapor cobre a umidade que ela pede' },
        { lugar: 'Quarto', porque: 'floresce mesmo longe da janela' },
        { lugar: 'Escritório', porque: 'aceita luz de lâmpada e pouca luz natural' },
      ],
      texto: 'Longe de sol direto e de corrente de ar seco.',
      fontes: ['epic-lirio'],
    },
    pet: {
      valor: 'toxico',
      texto: 'Levemente tóxica para pets e pessoas. Mantenha fora do alcance.',
      fontes: ['aspca', 'epic-lirio'],
    },
    paleta: { folha: '#1f5130', caule: '#2d6b39', flor: '#f6f4ec', vaso: '#9aa79b' },
    fontes: [
      {
        id: 'epic-lirio',
        titulo: 'How Much and How Often Should You Water Peace Lilies?',
        veiculo: 'Epic Gardening',
        url: 'https://www.epicgardening.com/peace-lily-watering/',
      },
      {
        id: 'hg-lirio',
        titulo: 'How do peace lilies purify the air?',
        veiculo: 'Homes & Gardens',
        url: 'https://www.homesandgardens.com/gardens/how-do-peace-lilies-purify-the-air',
      },
      fonteAspca,
      fonteNasa,
      fonteDrexel,
    ],
  },
  {
    id: 'costela-de-adao',
    nome: 'Costela-de-adão',
    cientifico: 'Monstera deliciosa',
    resumo:
      'Folha recortada do tamanho de uma bandeja. Com tutor para subir, vira o móvel mais alto da sala.',
    arquetipo: 'folhaFenestrada',
    dificuldade: 2,
    precoBase: 189,
    porte: {
      valor: { alturaCm: [120, 240], larguraCm: [90, 240], classe: 'grande' },
      texto:
        'De 1,8 a 2,4 m dentro de casa, com 90 cm a 2,4 m de largura. Na natureza passa de 9 m.',
      fontes: ['gkh-monstera'],
    },
    rega: {
      valor: { diasEntreRegas: [7, 14], inverno: 'Menos água no outono e no inverno, quando para de crescer.' },
      texto:
        'Deixe os 5 cm de cima secarem antes de regar de novo. Excesso de água apodrece a raiz.',
      fontes: ['epic-monstera', 'gkh-monstera'],
    },
    luz: {
      valor: { nivel: 3, horasSolDireto: null },
      texto:
        'Luz indireta clara. Tolera ambiente mais escuro, mas fica menor e a folha recorta menos.',
      fontes: ['gkh-monstera'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: [40, 60], tempC: [16, 24] },
      texto:
        'Aceita a umidade comum de casa (40% a 50%) e prefere mais. Não deixe abaixo de 13 °C.',
      fontes: ['epic-monstera'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro dentro de casa.',
      fontes: ['gkh-monstera'],
    },
    agrega: {
      valor: [
        'Escala: preenche um canto de 2 m sozinha',
        'Sombra desenhada na parede quando recebe luz lateral',
        'Folha nova a cada poucas semanas no verão',
      ],
      texto: 'É o ponto focal da sala, não um detalhe.',
      fontes: ['epic-monstera'],
    },
    lugares: {
      valor: [
        { lugar: 'Canto da sala perto de janela', porque: 'precisa de luz lateral clara e espaço de 1 m' },
        { lugar: 'Vão de escada', porque: 'aproveita pé-direito alto para subir no tutor' },
      ],
      texto: 'Longe de aquecedor e de ar seco, que deixam a ponta da folha marrom.',
      fontes: ['epic-monstera'],
    },
    pet: {
      valor: 'toxico',
      texto: 'Tóxica se ingerida e a seiva irrita a pele. Longe de pets e crianças.',
      fontes: ['epic-monstera', 'aspca'],
    },
    paleta: { folha: '#2d7439', caule: '#3f7a3c', vaso: '#8e8a7d' },
    fontes: [
      {
        id: 'gkh-monstera',
        titulo: 'How to Grow a Monstera Houseplant',
        veiculo: 'Gardening Know How',
        url: 'https://www.gardeningknowhow.com/houseplants/swiss-cheese-plant/monstera-plant-care.htm',
      },
      {
        id: 'epic-monstera',
        titulo: 'How to Plant, Grow, and Care for Monstera Deliciosa',
        veiculo: 'Epic Gardening',
        url: 'https://www.epicgardening.com/monstera-deliciosa/',
      },
      fonteAspca,
    ],
  },
  {
    id: 'lavanda',
    nome: 'Lavanda',
    cientifico: 'Lavandula angustifolia',
    resumo:
      'Cheiro de lavanda ao passar a mão na folha. Em troca, exige a janela mais ensolarada da casa.',
    arquetipo: 'arbustoEspigas',
    dificuldade: 3,
    precoBase: 54,
    porte: {
      valor: { alturaCm: [30, 60], larguraCm: [30, 50], classe: 'pequeno' },
      texto:
        'A espécie chega a 60 a 90 cm; para vaso dentro de casa use as variedades compactas, como “Hidcote”.',
      fontes: ['gardenia-lavanda', 'bv-lavanda'],
    },
    rega: {
      valor: { diasEntreRegas: [10, 14], inverno: 'Reduza muito a rega nos meses frios.' },
      texto:
        'Deixe os 5 cm de cima secarem por completo entre as regas. Drenagem é o fator que decide se ela vive.',
      fontes: ['bv-lavanda', 'gardenia-lavanda'],
    },
    luz: {
      valor: { nivel: 4, horasSolDireto: [3, 8] },
      texto:
        'Sol direto: no mínimo 3 h por dia, e de 6 a 8 h para florescer bem. Sem isso ela estica e não dá flor.',
      fontes: ['bv-lavanda', 'gardenia-lavanda'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [30, 45], tempC: [13, 24] },
      texto:
        'Quer ar seco e circulando, entre 13 °C e 24 °C. Varanda e janelão são melhores que o meio da sala.',
      fontes: ['gardenia-lavanda'],
    },
    cheiro: {
      valor: { tem: true, nota: 'floral herbáceo, canforado', intensidade: 3 },
      texto:
        'Folha e flor são aromáticas: o cheiro sai ao toque e seca bem em buquê.',
      fontes: ['bv-lavanda'],
    },
    agrega: {
      valor: [
        'Perfume que se solta ao passar a mão',
        'Flor seca que dura meses depois do corte',
        'Cor roxa fria no meio do verde',
      ],
      texto: 'É a planta de cheiro da casa, não a de preencher canto escuro.',
      fontes: ['bv-lavanda'],
    },
    lugares: {
      valor: [
        { lugar: 'Janela mais ensolarada', porque: 'no Brasil, em geral a voltada para o norte' },
        { lugar: 'Varanda', porque: 'sol direto e ar circulando, como ela pede' },
        { lugar: 'Beira da pia da cozinha', porque: 'cheiro à mão e sol de manhã' },
      ],
      texto: 'Sem sol direto, não vale a pena: ela sobrevive sem florir.',
      fontes: ['bv-lavanda', 'gardenia-lavanda'],
    },
    pet: {
      valor: 'atencao',
      texto: 'O óleo essencial da lavanda é irritante para cães e gatos se ingerido em quantidade.',
      fontes: ['aspca'],
    },
    paleta: { folha: '#7f9479', caule: '#8a9a7c', flor: '#7b5ea7', vaso: '#c7b9a1' },
    fontes: [
      {
        id: 'bv-lavanda',
        titulo: 'How to Grow Lavender Indoors',
        veiculo: 'Bob Vila',
        url: 'https://www.bobvila.com/articles/how-to-grow-lavender-indoors/',
      },
      {
        id: 'gardenia-lavanda',
        titulo: 'How to Successfully Grow and Care for a Lavender Plant Indoors',
        veiculo: 'Gardenia.net',
        url: 'https://www.gardenia.net/guide/how-to-successfully-grow-care-for-a-lavender-plant-indoors',
      },
      fonteAspca,
    ],
  },
  {
    id: 'jasmim',
    nome: 'Jasmim-dos-poetas',
    cientifico: 'Jasminum polyanthum',
    resumo:
      'Trepadeira de flor pequena e perfume que toma a casa inteira. Só floresce depois de um período frio.',
    arquetipo: 'trepadeiraFlorida',
    dificuldade: 3,
    precoBase: 79,
    porte: {
      valor: { alturaCm: [30, 180], larguraCm: [40, 80], classe: 'medio' },
      texto:
        'Em vaso com treliça, de 1 a 3 m conduzida; vendida em 30 a 90 cm. Solta e pendente também funciona.',
      fontes: ['logees-jasmim', 'wff-jasmim'],
    },
    rega: {
      valor: { diasEntreRegas: [5, 7], inverno: 'Segure a água quando o crescimento parar no frio.' },
      texto:
        'Substrato úmido, nunca encharcado. Em vaso seca mais rápido que no chão, então cheque com o dedo.',
      fontes: ['wff-jasmim', 'nybg-jasmim'],
    },
    luz: {
      valor: { nivel: 4, horasSolDireto: [2, 4] },
      texto:
        'Luz é o que decide a floração. Sol direto suave da manhã, em janela leste; sol forte queima a folha.',
      fontes: ['nybg-jasmim', 'wff-jasmim'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [40, 60], tempC: [4, 24] },
      texto:
        'Para formar botão precisa de 6 a 8 semanas entre 4 °C e 13 °C, ou noites consistentes abaixo de 15 °C. No Brasil isso quer dizer inverno de região fria, varanda ou serra.',
      fontes: ['wff-jasmim'],
    },
    cheiro: {
      valor: { tem: true, nota: 'doce, intenso, de noite mais forte', intensidade: 3 },
      texto: 'Perfume forte o bastante para ocupar uma casa inteira com uma planta só.',
      fontes: ['wff-jasmim'],
    },
    agrega: {
      valor: [
        'Perfume de inverno dentro de casa',
        'Floração branca em massa sobre treliça',
        'Pode ser conduzida em arco, cesta ou tutor',
      ],
      texto: 'Compre pela flor e pelo cheiro, não pela folhagem.',
      fontes: ['wff-jasmim', 'nybg-jasmim'],
    },
    lugares: {
      valor: [
        { lugar: 'Janela leste da sala', porque: 'sol da manhã sem queimar e perfume no ambiente de estar' },
        { lugar: 'Varanda coberta', porque: 'noite fria no outono é o que dispara os botões' },
      ],
      texto: 'Longe de aquecedor: calor constante impede a floração.',
      fontes: ['wff-jasmim'],
    },
    pet: {
      valor: 'atencao',
      texto: 'Jasmins verdadeiros não constam como tóxicos, mas plantas vendidas como “jasmim” variam de espécie: confira a etiqueta.',
      fontes: ['aspca'],
    },
    paleta: { folha: '#2f6b35', caule: '#5c7a3a', flor: '#fdf7f2', vaso: '#bfae95' },
    fontes: [
      {
        id: 'wff-jasmim',
        titulo: 'Jasmine: Fragrance Beyond Description in the Dead of Winter (cultivo e frio para florir)',
        veiculo: 'White Flower Farm',
        url: 'https://www.whiteflowerfarm.com/indoor-flowering-jasmine-flowers-plants-vines.shtml',
      },
      {
        id: 'nybg-jasmim',
        titulo: 'How can I care for my jasmine houseplant?',
        veiculo: 'New York Botanical Garden — LibAnswers',
        url: 'https://libanswers.nybg.org/faq/223270',
      },
      {
        id: 'logees-jasmim',
        titulo: 'Jasminum polyanthum — ficha de produto com altura',
        veiculo: 'Logee’s',
        url: 'https://www.logees.com/winterjasmine',
      },
      fonteAspca,
    ],
  },
  {
    id: 'samambaia',
    nome: 'Samambaia-americana',
    cientifico: "Nephrolepis exaltata 'Bostoniensis'",
    resumo:
      'Fronde arqueada que cai em cascata. Quer ar úmido: é a planta de banheiro com janela.',
    arquetipo: 'frondeSamambaia',
    dificuldade: 2,
    precoBase: 45,
    porte: {
      valor: { alturaCm: [30, 60], larguraCm: [60, 90], classe: 'pequeno' },
      texto: 'De 30 a 60 cm de altura, com fronde caindo bem além da borda do vaso.',
      fontes: ['bv-samambaia'],
    },
    rega: {
      valor: { diasEntreRegas: [3, 7], inverno: 'Uma vez por semana nos meses frios.' },
      texto:
        'Regue quando o primeiro centímetro de substrato secar. Encharcar apodrece a raiz; secar derruba os folíolos.',
      fontes: ['bv-samambaia', 'purdue-samambaia'],
    },
    luz: {
      valor: { nivel: 2, horasSolDireto: null },
      texto:
        'Luz indireta clara, sem sol do meio-dia nem da tarde. Sol fraco do início da manhã é tolerado.',
      fontes: ['bv-samambaia'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [40, 50], tempC: [16, 24] },
      texto:
        'Umidade de 30% é o limite que ela tolera; 40% a 50% é a faixa desejável. Bandeja com pedras, umidificador ou banheiro resolvem.',
      fontes: ['purdue-samambaia'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro. Não floresce: é uma pteridófita, reproduz por esporo.',
      fontes: ['purdue-samambaia'],
    },
    agrega: {
      valor: [
        'Textura miúda que contrasta com folha grande',
        'Volume pendente em suporte suspenso',
        'Não é tóxica para cães e gatos',
      ],
      texto: 'Maciez visual e segurança com pets no mesmo vaso.',
      fontes: ['bv-samambaia'],
    },
    lugares: {
      valor: [
        { lugar: 'Banheiro com janela', porque: 'o vapor do banho entrega a umidade que ela exige' },
        { lugar: 'Varanda coberta', porque: 'luz indireta e ar úmido sem sol direto' },
        { lugar: 'Cozinha', porque: 'o vapor do cozimento ajuda, longe da boca do fogão' },
      ],
      texto: 'Fuja de ar-condicionado apontado para ela e de janela de sol pleno.',
      fontes: ['bv-samambaia', 'purdue-samambaia'],
    },
    pet: {
      valor: 'seguro',
      texto: 'Listada como não tóxica para cães e gatos.',
      fontes: ['aspca', 'bv-samambaia'],
    },
    paleta: { folha: '#4f8f3e', folha2: '#7fb04a', caule: '#6f8f3c', vaso: '#a89e8c' },
    fontes: [
      {
        id: 'purdue-samambaia',
        titulo: 'Indoor Ferns (HO-141-W): umidade mínima, faixa desejável e adubação',
        veiculo: 'Purdue University Extension',
        url: 'https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-141-w.html',
      },
      {
        id: 'bv-samambaia',
        titulo: 'Boston Fern Care',
        veiculo: 'Bob Vila',
        url: 'https://www.bobvila.com/articles/boston-fern-care',
      },
      fonteAspca,
    ],
  },
  {
    id: 'aglaonema',
    nome: 'Aglaonema',
    cientifico: 'Aglaonema commutatum',
    resumo:
      'Folha pintada de prata, rosa ou creme. Entre as plantas de folhagem, é a que menos exige luz.',
    arquetipo: 'folhaPintada',
    dificuldade: 1,
    precoBase: 89,
    porte: {
      valor: { alturaCm: [30, 60], larguraCm: [30, 60], classe: 'pequeno' },
      texto:
        'Compacta e de crescimento lento: as folhas saem de pecíolos curtos, perto do substrato.',
      fontes: ['clemson-aglaonema'],
    },
    rega: {
      valor: { diasEntreRegas: [10, 14], inverno: 'Espere secar mais; no frio ela quase para.' },
      texto:
        'Substrato que drena livre, mas retém alguma umidade. Secar demais ou ar muito seco atraem ácaro e pulgão.',
      fontes: ['clemson-aglaonema'],
    },
    luz: {
      valor: { nivel: 1, horasSolDireto: null },
      texto:
        'Luz baixa a média, sempre indireta. Não deixe no peitoril da janela, onde pega sol direto.',
      fontes: ['clemson-aglaonema', 'almanac-aglaonema'],
    },
    ambiente: {
      valor: { interno: true, externo: false, umidadePct: [40, 60], tempC: [18, 27] },
      texto: 'Interno, quente. Nunca abaixo de 15 °C.',
      fontes: ['almanac-aglaonema'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro. A inflorescência é discreta, do tipo espata.',
      fontes: ['clemson-aglaonema'],
    },
    agrega: {
      valor: [
        'Cor na folha sem depender de flor',
        'Funciona em ponto escuro onde outras desbotam',
        'Mantém o mesmo porte por anos',
      ],
      texto: 'Cor em ambiente sem luz: o que nenhuma floração entrega ali.',
      fontes: ['clemson-aglaonema'],
    },
    lugares: {
      valor: [
        { lugar: 'Hall de entrada', porque: 'luz baixa e indireta é exatamente o que ela prefere' },
        { lugar: 'Escritório longe da janela', porque: 'aceita luz de lâmpada e temperatura estável' },
        { lugar: 'Mesa de apoio da sala', porque: 'porte baixo e folha colorida a meia altura' },
      ],
      texto: 'Longe de ar-condicionado frio e de sol direto.',
      fontes: ['clemson-aglaonema', 'almanac-aglaonema'],
    },
    pet: {
      valor: 'toxico',
      texto: 'Listada como tóxica para cães, gatos e cavalos.',
      fontes: ['aspca', 'clemson-aglaonema'],
    },
    paleta: { folha: '#2a5a39', folha2: '#cfd8c0', caule: '#4a7045', vaso: '#8f8878' },
    fontes: [
      {
        id: 'clemson-aglaonema',
        titulo: 'Chinese Evergreen (Aglaonema) Care, Cultivation & Growing Guide',
        veiculo: 'Clemson Cooperative Extension — HGIC',
        url: 'https://hgic.clemson.edu/factsheet/chinese-evergreen-aglaonema-care-cultivation-growing-guide/',
      },
      {
        id: 'almanac-aglaonema',
        titulo: 'Chinese Evergreen — temperatura, umidade e toxicidade',
        veiculo: 'The Old Farmer’s Almanac',
        url: 'https://www.almanac.com/plant/chinese-evergreen',
      },
      fonteAspca,
    ],
  },
  {
    id: 'babosa',
    nome: 'Babosa',
    cientifico: 'Aloe vera',
    resumo:
      'Suculenta de folha carnuda com gel dentro. Quer sol e quase nenhuma água.',
    arquetipo: 'rosetaSuculenta',
    dificuldade: 1,
    precoBase: 39,
    porte: {
      valor: { alturaCm: [30, 60], larguraCm: [30, 60], classe: 'pequeno' },
      texto: 'Dentro de casa fica em 30 a 60 cm, e pode chegar a 90 cm com o tempo.',
      fontes: ['gardeners-babosa'],
    },
    rega: {
      valor: { diasEntreRegas: [14, 21], inverno: 'Quase nada: o substrato precisa secar por completo.' },
      texto:
        'Deixe o substrato secar inteiro antes de regar. Dentro de casa ela pede ainda menos água do que fora.',
      fontes: ['gardeners-babosa'],
    },
    luz: {
      valor: { nivel: 4, horasSolDireto: [6, 8] },
      texto:
        'Luz forte, no mínimo 6 h por dia; a janela mais ensolarada é o lugar certo. Em luz baixa ela estica e tomba.',
      fontes: ['gardeners-babosa'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [20, 45], tempC: [15, 30] },
      texto: 'Ar seco, calor, vaso com dreno. Não tolera substrato encharcado.',
      fontes: ['gardeners-babosa', 'almanac-babosa'],
    },
    cheiro: {
      valor: { tem: true, nota: 'vegetal e amargo, só ao cortar a folha', intensidade: 1 },
      texto: 'Fechada não tem cheiro; cortada, solta aroma vegetal e amargo da seiva.',
      fontes: ['almanac-babosa'],
    },
    agrega: {
      valor: [
        'Gel para queimadura leve, corte e irritação de pele',
        'Forma geométrica que contrasta com folhagem solta',
        'Sobrevive a férias longas',
      ],
      texto:
        'Colha as folhas de fora quando a planta tiver 3 anos; o gel guarda até 2 semanas na geladeira em pote fechado.',
      fontes: ['gardeners-babosa'],
    },
    lugares: {
      valor: [
        { lugar: 'Janela mais ensolarada', porque: 'é a condição que ela exige para não esticar' },
        { lugar: 'Cozinha', porque: 'gel à mão para queimadura de fogão, com sol da janela' },
        { lugar: 'Varanda', porque: 'sol pleno e ar seco' },
      ],
      texto: 'Evite banheiro úmido e canto escuro.',
      fontes: ['gardeners-babosa'],
    },
    pet: {
      valor: 'atencao',
      texto:
        'A seiva amarela sob a casca da folha é irritante se ingerida. Mantenha fora do alcance de pets e crianças.',
      fontes: ['aspca', 'almanac-babosa'],
    },
    paleta: { folha: '#6f9d6a', folha2: '#cfe0b4', caule: '#6f9d6a', vaso: '#c0b7a6' },
    fontes: [
      {
        id: 'gardeners-babosa',
        titulo: 'Aloe Vera Care — luz, rega e colheita do gel',
        veiculo: 'Gardener’s Supply Company',
        url: 'https://www.gardeners.com/blogs/houseplant-encyclopedia/aloe-vera-care-9698',
      },
      {
        id: 'almanac-babosa',
        titulo: 'How to Care for Aloe Vera Plants',
        veiculo: 'The Old Farmer’s Almanac',
        url: 'https://www.almanac.com/plant/aloe-vera',
      },
      fonteAspca,
    ],
  },
  {
    id: 'clorofito',
    nome: 'Clorofito',
    cientifico: 'Chlorophytum comosum',
    resumo:
      'Folha listrada e arqueada que solta mudas penduradas. Não é tóxica para cães e gatos.',
    arquetipo: 'arqueadaFilhotes',
    dificuldade: 1,
    precoBase: 35,
    porte: {
      valor: { alturaCm: [38, 60], larguraCm: [40, 70], classe: 'pequeno' },
      texto: 'Entre 38 e 60 cm, com as hastes de muda caindo bem mais para fora do vaso.',
      fontes: ['hunker-clorofito'],
    },
    rega: {
      valor: { diasEntreRegas: [7, 10], inverno: 'Espere secar mais entre as regas.' },
      texto:
        'Regue quando o primeiro centímetro secar. Ela é sensível a flúor: água filtrada ou de chuva evita a ponta marrom.',
      fontes: ['bv-clorofito'],
    },
    luz: {
      valor: { nivel: 3, horasSolDireto: null },
      texto:
        'Luz indireta clara. Em pouca luz a listra desaparece e a folha fica toda verde; sol direto demais queima.',
      fontes: ['bv-clorofito', 'clemson-iniciantes'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [40, 60], tempC: [15, 27] },
      texto: 'Interno ou varanda sombreada. Em luz clara produz mais mudas.',
      fontes: ['clemson-iniciantes'],
    },
    cheiro: {
      valor: { tem: false, nota: 'sem cheiro', intensidade: 0 },
      texto: 'Sem cheiro. A florzinha branca das hastes é discreta.',
      fontes: ['clemson-iniciantes'],
    },
    agrega: {
      valor: [
        'Mudas de graça: cada haste vira uma planta nova',
        'Não é tóxica para cães e gatos',
        'Movimento pendente em suporte suspenso',
      ],
      texto:
        'A escolha para casa com pet e para quem quer multiplicar sem comprar.',
      fontes: ['bv-clorofito'],
    },
    lugares: {
      valor: [
        { lugar: 'Suporte suspenso perto da janela', porque: 'as hastes de muda precisam de vão livre' },
        { lugar: 'Cozinha', porque: 'luz clara e tolerância à variação de temperatura' },
        { lugar: 'Quarto de criança', porque: 'não tóxica, ainda que folha solta seja risco de engasgo' },
      ],
      texto: 'Sol direto do meio-dia queima a borda da folha.',
      fontes: ['bv-clorofito'],
    },
    pet: {
      valor: 'seguro',
      texto:
        'Não tóxica para cães e gatos. Gato costuma mastigar a folha; muita folha ingerida pode dar mal-estar leve.',
      fontes: ['aspca', 'bv-clorofito'],
    },
    paleta: { folha: '#4e8e42', folha2: '#eef2d8', caule: '#6f9b4a', vaso: '#b4aa98' },
    fontes: [
      {
        id: 'bv-clorofito',
        titulo: 'Spider Plant Care — luz, rega, flúor e segurança com pets',
        veiculo: 'Bob Vila',
        url: 'https://www.bobvila.com/articles/spider-plant-care',
      },
      {
        id: 'clemson-iniciantes',
        titulo: 'Exciting Houseplant Selections for Beginners',
        veiculo: 'Clemson Cooperative Extension — HGIC',
        url: 'https://hgic.clemson.edu/exciting-houseplant-selections-for-beginners/',
      },
      {
        id: 'hunker-clorofito',
        titulo: 'How to Care for a Spider Plant — porte adulto',
        veiculo: 'Hunker',
        url: 'https://www.hunker.com/12113186/how-to-care-for-a-spider-plant',
      },
      fonteAspca,
    ],
  },
  {
    id: 'manjericao',
    nome: 'Manjericão',
    cientifico: 'Ocimum basilicum',
    resumo:
      'Cheiro de molho de tomate na janela da cozinha. Colher folha com frequência é o que a mantém viva.',
    arquetipo: 'arbustoFolhasPares',
    dificuldade: 2,
    precoBase: 25,
    porte: {
      valor: { alturaCm: [30, 60], larguraCm: [20, 40], classe: 'pequeno' },
      texto: 'De 30 a 60 cm em vaso. Poda frequente deixa a planta mais cheia e baixa.',
      fontes: ['rhs-manjericao'],
    },
    rega: {
      valor: { diasEntreRegas: [3, 7], inverno: 'Menos água quando esfria e o crescimento para.' },
      texto:
        'Uma a duas vezes por semana, variando com calor, umidade e tamanho do vaso. Cheque o substrato antes.',
      fontes: ['rhs-manjericao', 'uc-manjericao'],
    },
    luz: {
      valor: { nivel: 4, horasSolDireto: [6, 8] },
      texto:
        'Precisa de 6 h ou mais de luz direta. Com menos, estica e empalidece; luz artificial supre com 10 a 16 h por dia.',
      fontes: ['uc-manjericao', 'rhs-manjericao'],
    },
    ambiente: {
      valor: { interno: true, externo: true, umidadePct: [40, 60], tempC: [18, 29] },
      texto:
        'Planta tropical: sofre abaixo de 10 °C e cresce melhor entre 21 °C e 29 °C. Não deixe a folha colada no vidro frio.',
      fontes: ['uc-manjericao'],
    },
    cheiro: {
      valor: { tem: true, nota: 'anisado, cravo, doce', intensidade: 3 },
      texto: 'Cheiro forte na folha, liberado ao toque e ao corte.',
      fontes: ['rhs-manjericao'],
    },
    agrega: {
      valor: [
        'Folha para cozinhar o ano todo',
        'Cheiro ao esbarrar na planta',
        'Colheita contínua: cortar faz crescer mais',
      ],
      texto: 'Uma planta saudável na janela dá folha para uso diário na temporada.',
      fontes: ['rhs-manjericao', 'uc-manjericao'],
    },
    lugares: {
      valor: [
        { lugar: 'Janela da cozinha', porque: 'sol direto e a folha ao alcance do fogão' },
        { lugar: 'Varanda ensolarada', porque: 'mais sol, mais folha' },
      ],
      texto: 'Longe de corrente de ar frio e do vidro gelado no inverno.',
      fontes: ['uc-manjericao'],
    },
    pet: {
      valor: 'seguro',
      texto: 'Erva culinária, não listada como tóxica para cães e gatos.',
      fontes: ['aspca'],
    },
    paleta: { folha: '#3f7f32', folha2: '#79a94a', caule: '#6a8f3e', flor: '#f2eee0', vaso: '#b6472f' },
    fontes: [
      {
        id: 'rhs-manjericao',
        titulo: 'How to Grow Basil',
        veiculo: 'Royal Horticultural Society',
        url: 'https://www.rhs.org.uk/herbs/basil',
      },
      {
        id: 'uc-manjericao',
        titulo: 'Basil — guia de cultivo',
        veiculo: 'UC Master Gardeners, Santa Clara County',
        url: 'https://mgsantaclara.ucanr.edu/garden-help/herbs/basil',
      },
      fonteAspca,
    ],
  },
]
