# Painel de Indicadores

Site que calcula indicadores e KPIs de compras a partir de uma planilha. Você arrasta o `.xlsx`,
o site reconhece sozinho qual base é aquela e monta o painel.

**A planilha nunca sai do seu computador.** Não há servidor, banco de dados nem chamada de rede:
o arquivo é lido pelo próprio navegador. Dá para usar com a internet desligada.

## Como abrir

Duas formas, e as duas funcionam:

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000/site/>. Ou, mais simples, **dê um duplo clique em
`site/index.html`** — o site foi feito para funcionar também pelo `file://`, sem servidor nenhum.

Não precisa instalar nada, não precisa de Node, npm nem permissão de administrador.

Sem planilha à mão? Use `exemplos/exemplo-emissao.xlsx`, que tem dados inventados.

## Módulos

| Módulo | Planilha de entrada | Situação |
|---|---|---|
| 📋 **Emissão de OCs** | `OC_s_com_Filial.xlsx`, `INDICADOR RESPONSAVEL X OC.xlsx` | no ar |
| 📊 Financeiro / Gasto | `OC_s_2026.xlsx` | próxima fase |
| 🏛️ Curva ABC e Regime Tributário | `INDICADOR CURVA SIMPLES.xlsx` | próxima fase |
| 💰 Base Externa | `INDICADOR BASE - EXTERNA.xlsx` | próxima fase |

A aba de um módulo só habilita quando a planilha correspondente é carregada. Dá para carregar
várias planilhas na mesma sessão e alternar entre as abas.

### 📋 Emissão de OCs

Total de OCs, responsáveis ativos, filiais, maior emissor, média por mês, quantidade e líder por
filial, emissão individual, série mensal, situação das OCs e solicitantes que mais pedem.
Tem filtro de ano e exportação para `.xlsx` com seis abas.

Regras de cálculo:

- A contagem é sobre **OC distinta**, mesmo quando o extrato repete a OC em várias linhas.
- Quando uma OC repete e a primeira linha está com a data ilegível, vale a repetição que tem data —
  senão a OC sumiria da série mensal por causa de uma célula com `#DIV/0!`.
- O **líder de cada filial** é quem emitiu mais OCs ali. Empate fica com quem aparece primeiro no
  extrato, que é o critério da planilha original.
- Com um ano escolhido, a série mensal mostra **os 12 meses**, inclusive os zerados. É o que revela
  até onde o extrato foi de fato.
- O ano padrão é o **mais recente** com lançamento.
- Datas são lidas como data do Excel, `dd/mm/aaaa` ou `aaaa-mm-dd`.

## Por que não existe indicador de OTD (pontualidade)

As bases não têm coluna de prazo acordado. A `DATA ENTREGA` que existe é data **prevista** — há OC
criada em 03/11/2026 com entrega marcada para 29/04/2027. A planilha antiga tratava "no prazo" como
`DATA ENTREGA <= DATA CRIAÇÃO`, ou seja, só contava como pontual a OC entregue no mesmo dia em que
foi criada; daí o indicador dar 30,3%. Isso mede prazo de entrega, não pontualidade, então o
indicador ficou de fora em vez de dar um número que parece certo e não é.

## Testes

```bash
python3 -m http.server 8000
```

Abra <http://localhost:8000/site/teste/rodar.html> e selecione as planilhas que estão na sua
máquina. Cada arquivo é comparado com os valores de [`teste/casos.json`](teste/casos.json),
conferidos nas abas de indicadores das próprias planilhas originais.

Hoje são **86 conferências**, entre indicadores e invariantes. Por exemplo, a partir da base crua de
`INDICADOR RESPONSAVEL X OC.xlsx` o site tem de chegar a 13.040 OCs em 2026, 19 responsáveis,
15 filiais e MICHELE.SOUZA com 3.729 — exatamente o que a aba `Painel 2026` mostra.

A página precisa ser servida por HTTP: pelo `file://` o navegador bloqueia a leitura do
`casos.json`. O painel em si funciona dos dois jeitos.

As planilhas reais **não estão no repositório**: trazem razão social, CNPJ e faturamento de
fornecedores de verdade.

## Estrutura

```
site/
  index.html                 uma página, uma aba por módulo
  css/painel.css             tema claro e escuro, estilo de impressão
  js/
    util.js                  números, datas, estatística, nome de fornecedor
    deteccao.js              assinaturas de cabeçalho → qual módulo
    leitor.js                lê o .xlsx, escolhe a aba, normaliza o cabeçalho
    app.js                   estado, abas, leitura dos arquivos
    modulos/emissao.js       cálculo do M1
    modulos/emissao.view.js  tela do M1
    render/                  cartões, tabelas, gráficos, exportação
  vendor/                    SheetJS e Chart.js, versionados aqui (ver vendor/README.md)
  exemplos/                  planilha de demonstração com dados inventados
  teste/                     página de regressão e os valores esperados
```

Sem etapa de build. Os scripts são carregados na ordem pelo `index.html`, em `<script>` clássico —
é o que faz a página funcionar pelo `file://`, onde módulo ES e Web Worker são bloqueados por CORS.

## Acrescentar um módulo

1. Uma assinatura de cabeçalho em `js/deteccao.js`.
2. `js/modulos/<nome>.js` com o cálculo puro, sem tocar no DOM.
3. `js/modulos/<nome>.view.js` expondo `desenha(alvo, base, estado)`.
4. Registrar em `VISTAS`, no alto de `js/app.js`.
5. As tags `<script>` no `index.html` e no `teste/rodar.html`.
6. Os valores esperados em `teste/casos.json` e o testador em `teste/rodar.html`.

Enquanto um módulo não existe, a aba dele aparece desabilitada e, se a planilha correspondente for
carregada, o site avisa que os dados ficaram prontos e o módulo ainda não entrou.
