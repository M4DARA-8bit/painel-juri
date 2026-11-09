# Procedimento do júri

Roteiro do coordenador para conduzir o júri. Usado pelas skills `/planejar` (etapas 7 e 8) e `/auditar`. As regras dos votos estão em `REGRAS.md`, nesta mesma pasta.

## Parâmetros

A skill que chama este procedimento define:

| Parâmetro | `/planejar` | `/auditar` |
|-----------|-------------|------------|
| `PLANO` (o que os jurados leem) | `docs/plano/00-ideia.md` a `docs/plano/04-plano.md` | `docs/auditoria/<pasta>/documento.md` |
| `PASTA` (votos e propostas) | `docs/plano/juri` | `docs/auditoria/<pasta>/juri` |
| `RELATORIO` (saída do relator) | `docs/plano/06-juri.md` | `docs/auditoria/<pasta>/juri.md` |
| Quem aplica as propostas | os responsáveis (analista, arquiteto, designer, planejador) | o coordenador, em `documento.md` |

Os agentes começam sem o seu contexto. Todo prompt de jurado e de relator deve trazer: número da rodada, `PLANO`, `PASTA` e `RELATORIO`.

## Passo 1: votação (rodada n, começando em 1)

Chame os 5 jurados **na mesma mensagem**, com 5 chamadas de ferramenta, para rodarem em paralelo e sem ver uns aos outros:

`jurado-viabilidade`, `jurado-custo`, `jurado-seguranca`, `jurado-valor`, `jurado-diabo`.

Prompt de cada um:

> Júri, rodada <n>. Leia .claude/juri/REGRAS.md. Avalie o plano em <PLANO>. <Se n > 1: Leia também <PASTA>/rodada-<n-1>/propostas.md.> Escreva somente <PASTA>/rodada-<n>/voto-<criterio>.md.

Não inclua no prompt nada sobre o voto de outro jurado, sobre o revisor ou sobre o veredito anterior.

Confira se os 5 arquivos de voto existem. Se faltar algum, chame aquele jurado de novo, uma vez.

## Passo 2: relator

Chame `relator`:

> Júri, rodada <n>. Leia .claude/juri/REGRAS.md e os votos em <PASTA>/rodada-<n>/. Plano em <PLANO>. Escreva <PASTA>/rodada-<n>/propostas.md e reescreva <RELATORIO>.

Leia apenas a linha `Veredito:` e a seção "Votos inválidos" de `<RELATORIO>`.

- **2 ou mais votos inválidos**: chame de novo só os jurados com voto inválido, com o motivo no prompt, uma vez. Depois chame o relator de novo para a mesma rodada.

## Passo 3: decidir

| Veredito | O que fazer |
|----------|-------------|
| `APROVADO` | Fim do júri. |
| `APROVADO COM CONDIÇÕES` | Aplique as propostas `condição` (passo 4) e encerre. Sem nova votação. |
| `DEVOLVIDO`, `REPROVADO` ou `BLOQUEADO` | Se n < 3: aplique as propostas `bloqueante` e `condição` (passo 4), faça n = n + 1 e volte ao passo 1. Se n = 3: fim do júri; o veredito fica e o que não foi resolvido vira pendência. |

No máximo 3 rodadas (2 revotações). Nunca rode uma 4ª.

## Passo 4: aplicar as propostas

Leia `<PASTA>/rodada-<n>/propostas.md`. Propostas `sugestão` são opcionais: aplique só se o mesmo responsável já tiver outras.

**No /planejar**, chame cada responsável com as linhas dele copiadas no prompt:

> Rodada de correção do júri, rodada <n>. Aplique em docs/plano/<arquivo> apenas as propostas abaixo, de <PASTA>/rodada-<n>/propostas.md, e atualize a coluna Aplicada? delas: <linhas da tabela>.

Ordem: `analista` primeiro; depois `arquiteto` e `designer` em paralelo, na mesma mensagem; `planejador` por último, **sempre** que qualquer outro arquivo mudou, mesmo sem proposta própria. Com `APROVADO COM CONDIÇÕES`, peça ao planejador também para transformar cada condição em tarefa em `04-plano.md`.

**No /auditar**, você mesmo edita `documento.md`: aplique a solução proposta de cada linha, registre a mudança na seção `## Histórico de revisão` ao fim do documento (`- JS1: o que mudou`) e marque a coluna `Aplicada?`. Não altere nada além do que as propostas pedem.

## Passo 5: tokens

Ao fim do júri, rode:

```bash
python scripts/tokens.py --saida <pasta do plano ou da auditoria>/custos.md
```

Se `python` não existir, tente `python3` ou `py`. Se nenhum funcionar, escreva `custos.md` à mão, com uma linha por chamada de agente e o total de tokens que o resultado de cada chamada informou (quando informou). Não instale nada.
