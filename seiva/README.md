# Seiva

Loja de plantas com ficha técnica citada, modelo 3D gerado por código, montagem de
vaso e suporte, e prévia da peça na foto do seu próprio ambiente.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build em dist/
npm run preview  # serve dist/ em http://localhost:4173
```

## O que tem dentro

| Tela | Rota | O que faz |
| --- | --- | --- |
| Viveiro | `#/` | 12 espécies, cartões animados, filtros por luz, rega, lugar da casa, porte, cheiro, pet e dificuldade |
| Ficha | `#/planta/<id>` | tamanho, rega, luz, ambiente, cheiro, o que agrega, melhor lugar, segurança com pets — cada campo com o número da fonte |
| Montagem | `#/montador/<id>` | 6 formas de vaso × 7 acabamentos × cor livre × 6 diâmetros × 7 suportes × prato, com preço recalculado |
| No meu espaço | `#/foto/<id>` | câmera ou foto do rolo, planta posicionável por arraste, ajuste de escala, giro, direção e força da luz, sombra; baixa a composição em PNG |
| Rotina de rega | `#/rotina` | calendário de 4 semanas montado a partir do intervalo de cada espécie, com início escalonado por planta, destaque por espécie e contagem da semana |
| Fontes | `#/cuidado` | método de apuração e lista completa das referências |

## As fotos e os modelos 3D

Cada espécie tem uma foto de licença livre do Wikimedia Commons, recortada em
quadrado em duas larguras (560 px no cartão, 1000 px na página). Autor, licença
e link do arquivo original estão em `src/data/fotos.ts`, aparecem embaixo da foto
na página da planta e na lista da página de fontes.

O catálogo mostra foto, não modelo: doze telas WebGL abertas ao mesmo tempo
travavam a rolagem. O modelo 3D ficou onde ele faz diferença — botão "Ver o
modelo 3D" na página da planta, montador e estúdio de foto — e o `three.js` virou
um pedaço separado do pacote, baixado só quando alguma cena monta. Cenas fora de
quadro congelam o laço de render.

## Os modelos 3D

Não há arquivo `.glb` nem foto de banco de imagem. Cada planta é construída em
tempo de execução a partir de uma superfície paramétrica de folha
(`src/three/folha.ts`) e de um construtor por arquétipo botânico
(`src/three/planta.ts`): roseta de lanças, trepadeira pendente, pena composta,
espata larga, folha fenestrada, arbusto com espigas, trepadeira florida, fronde
de samambaia, folha pintada, roseta suculenta, arqueada com filhotes e arbusto de
folhas opostas. O vaso e o suporte saem de perfis de revolução em
`src/three/vaso.ts`.

Consequência prática: o modelo mostra a forma e a escala reais da espécie, não o
exemplar que será enviado. Isso está dito no rodapé do site.

## O fundo do herói

As gavinhas que crescem atrás do título são Canvas 2D gerado em
`src/lib/gavinhas.ts` e montado em `src/components/FundoGavinhas.tsx`: pontas de
ramo com ruído de direção, bifurcação por probabilidade, espirais e folhas que se
abrem em 700 ms. Elas desviam de uma elipse em volta do texto, param quando
atingem o orçamento de comprimento, pausam fora de quadro e, sob
`prefers-reduced-motion`, aparecem já crescidas, sem animação.

A ideia e os parâmetros vêm do prompt gratuito
[Growing Vine Tendrils](https://animatedwebs.com/templates/greenhouse-grants-growing-vines),
do AnimatedWebs, reescrito na paleta do Seiva. Licença do prompt: uso pessoal e
comercial liberado, revenda do prompt não.

## Os dados e as fontes

Tudo vive em `src/data/plantas.ts`. Cada campo da ficha é um objeto
`{ valor, texto, fontes }`, onde `fontes` aponta para as referências daquela
planta. A interface mostra esses números como marcadores clicáveis ao lado do
rótulo do campo.

Ordem de preferência das fontes: extensões universitárias e jardins botânicos
(Purdue, Clemson, Illinois, UC Master Gardeners, RHS, NYBG), depois publicações
de horticultura, depois viveiros e produtores.

Duas notas de honestidade que o site carrega:

- **Ar purificado.** A lista famosa vem do relatório da NASA de 1989, feito em
  câmara selada. A revisão de Cummings e Waring (Drexel, 2020), sobre 196
  experimentos, concluiu que plantas em vaso não mudam de forma relevante a
  concentração de compostos orgânicos voláteis num ambiente real. Nenhuma ficha
  promete ar mais limpo.
- **Faixas, não receitas.** Quando as fontes divergiam sobre rega ou horas de
  sol — e divergem bastante —, a ficha mostra o intervalo inteiro.

## Banco de dados (opcional)

O site roda inteiro sem servidor: os dados são um módulo TypeScript e o carrinho
fica no `localStorage`. Para quando o catálogo precisar ser editado por outra
pessoa, ou para gravar pedidos de verdade, há o esquema pronto:

```bash
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
node --experimental-strip-types scripts/gerar-seed.mjs   # escreve supabase/seed.sql
psql "$SUPABASE_DB_URL" -f supabase/seed.sql
```

O esquema tem `plantas`, `fontes`, `planta_fontes` (qual fonte sustenta qual
campo), `montagens`, `pedidos` e `pedido_itens`, com RLS: catálogo público para
leitura, pedido só do próprio dono.

## Limites desta versão

- Pagamento não está ligado. O botão de fechar pedido fica desabilitado e o
  carrinho é salvo apenas no navegador.
- A câmera exige `localhost` ou HTTPS; onde o navegador recusar, o envio de foto
  do rolo continua funcionando.
- A composição na foto é um encaixe visual com sombra e luz ajustáveis à mão, não
  reconhecimento de superfície por WebXR.
