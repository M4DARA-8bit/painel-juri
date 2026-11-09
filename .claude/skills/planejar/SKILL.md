---
name: planejar
description: Orquestra o escritório de planejamento (analista, arquiteto, designer, planejador, revisor) e o júri (5 jurados e relator) para transformar uma ideia em docs/plano/PLANO.md auditado. Use com /planejar <ideia>.
argument-hint: <ideia do projeto ou da funcionalidade>
disable-model-invocation: true
allowed-tools: Bash(python scripts/tokens.py:*), Bash(python3 scripts/tokens.py:*), Bash(py scripts/tokens.py:*)
---

# /planejar

Você é o **coordenador** do escritório de planejamento. Você não analisa, não desenha, não planeja e não vota: você chama os agentes na ordem certa, passa o contexto, controla as rodadas de correção e do júri e consolida o resultado.

Ideia recebida:

> $ARGUMENTS

## Fluxo

```
00-ideia ─▶ analista ─┬─▶ arquiteto ─┬─▶ planejador ─▶ revisor ─▶ correção (1 rodada) ─▶ verificação final ─┐
                      └─▶ designer  ─┘                                                                    │
  ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┘
  ▼
JÚRI: viabilidade · custo · segurança · valor · diabo (em paralelo, sem ver uns aos outros)
  ▼
relator ─▶ veredito ─┬─ APROVADO / COM CONDIÇÕES ─────────────────────────────▶ PLANO.md + custos.md
                     └─ DEVOLVIDO / REPROVADO / BLOQUEADO ─▶ propostas aplicadas ─▶ júri vota de novo (máx. 2 vezes)
```

| Etapa | Agente | Lê | Escreve |
|-------|--------|----|---------|
| 0 | coordenador | ideia | `docs/plano/00-ideia.md` |
| 1 | `analista` | 00 + projeto | `docs/plano/01-analise.md` |
| 2a | `arquiteto` | 00, 01 + projeto | `docs/plano/02-arquitetura.md` |
| 2b | `designer` | 00, 01 + projeto | `docs/plano/03-design.md` |
| 3 | `planejador` | 00 a 03 | `docs/plano/04-plano.md` |
| 4 | `revisor` | 00 a 04 | `docs/plano/05-revisao.md` |
| 5 | responsáveis | apontamentos | seus próprios arquivos |
| 6 | `revisor` | 00 a 05 | `docs/plano/05-revisao.md` (acréscimo) |
| 7 | 5 jurados | 00 a 04 | `docs/plano/juri/rodada-<n>/voto-*.md` |
| 8 | `relator` | votos | `docs/plano/06-juri.md`, `docs/plano/juri/rodada-<n>/propostas.md` |
| 8a | responsáveis | propostas | seus próprios arquivos (só se o júri devolver) |
| 9 | coordenador | tudo | `docs/plano/PLANO.md`, `docs/plano/custos.md` |

Chame cada agente com a ferramenta de subagentes (Agent/Task), usando o nome do agente como tipo (`subagent_type`). Cada agente começa sem o seu contexto: o prompt deve dizer a etapa, os arquivos a ler e o arquivo a escrever.

## Etapa 0: preparar

1. Ideia vazia? Pergunte ao usuário qual é a ideia e pare.
2. `docs/plano/` já tem arquivos de uma rodada anterior (`00-ideia.md` a `06-juri.md`, `PLANO.md`, `custos.md` ou a pasta `juri/`)? Pergunte ao usuário:
   - **Arquivar** (recomendado): mover esses arquivos para `docs/plano/arquivo/<AAAA-MM-DD-HHMM>/` e começar do zero.
   - **Sobrescrever**: apagar esses arquivos.

   Nunca mexa em `docs/plano/README.md` nem em `docs/plano/arquivo/`.
   - **Cancelar**.
3. Crie `docs/plano/00-ideia.md`:

```markdown
# Ideia

Data: <AAAA-MM-DD>
Projeto: <nome da pasta ou do repositório>

## Pedido original
<ideia exatamente como o usuário escreveu>
```

## Etapa 1: analista

Chame `analista` com: "Etapa 1 do /planejar. Leia docs/plano/00-ideia.md e o projeto atual. Escreva docs/plano/01-analise.md."

Depois, leia a seção "Perguntas em aberto" de `01-analise.md`. Havendo perguntas **Bloqueante**:

1. Faça as perguntas ao usuário de uma vez (no máximo 3).
2. Acrescente as respostas em `00-ideia.md`, numa seção `## Respostas do usuário`.
3. Chame `analista` de novo: "Atualize docs/plano/01-analise.md com as respostas em docs/plano/00-ideia.md. Converta as perguntas respondidas em requisitos ou premissas."

Faça isso uma vez só. Sem resposta do usuário, siga com as premissas do analista.

## Etapa 2: arquiteto e designer em paralelo

Chame `arquiteto` e `designer` **na mesma mensagem**, com duas chamadas de ferramenta, para rodarem em paralelo:

- `arquiteto`: "Etapa 2 do /planejar. Leia docs/plano/00-ideia.md, docs/plano/01-analise.md e o projeto atual. Escreva docs/plano/02-arquitetura.md."
- `designer`: "Etapa 2 do /planejar. Leia docs/plano/00-ideia.md, docs/plano/01-analise.md e o projeto atual. Escreva docs/plano/03-design.md."

Espere os dois terminarem antes de seguir.

## Etapa 3: planejador

Chame `planejador`: "Etapa 3 do /planejar. Leia docs/plano/00-ideia.md a docs/plano/03-design.md. Escreva docs/plano/04-plano.md."

## Etapa 4: revisor

Chame `revisor`: "Etapa 4 do /planejar, modo revisão. Leia docs/plano/00-ideia.md a docs/plano/04-plano.md. Escreva docs/plano/05-revisao.md."

Leia a linha `Veredito:` e a tabela de apontamentos de `05-revisao.md`.

- `APROVADO`: pule para a etapa 7 (júri).
- `CORRIGIR`: siga para a etapa 5.

## Etapa 5: rodada de correção (uma só)

1. Agrupe os apontamentos `alta` e `média` pela coluna **Responsável**. Apontamentos `baixa` vão junto apenas se o mesmo responsável já tiver outros.
2. Chame cada responsável com os seus apontamentos copiados no prompt: "Rodada de correção do /planejar. Corrija em docs/plano/<arquivo> apenas os apontamentos abaixo, de docs/plano/05-revisao.md: <linhas da tabela>."
3. Ordem das chamadas:
   - `analista` primeiro, se tiver apontamentos.
   - Depois `arquiteto` e `designer` em paralelo, na mesma mensagem.
   - `planejador` por último, **sempre** que qualquer outro arquivo mudou, mesmo sem apontamento próprio: "Reconcilie docs/plano/04-plano.md com as mudanças registradas no Histórico de revisão dos outros arquivos."

Não existe segunda rodada. O que não foi resolvido vira pendência.

## Etapa 6: verificação final

Só roda se houve a etapa 5. Chame `revisor`: "Verificação final do /planejar. Leia docs/plano/00-ideia.md a docs/plano/05-revisao.md e acrescente a seção Verificação final em docs/plano/05-revisao.md."

## Etapas 7 e 8: júri

Siga `.claude/juri/PROCEDIMENTO.md` com os parâmetros do `/planejar`:

- `PLANO` = `docs/plano/00-ideia.md` a `docs/plano/04-plano.md`
- `PASTA` = `docs/plano/juri`
- `RELATORIO` = `docs/plano/06-juri.md`

O júri roda sempre, mesmo que o revisor tenha aprovado: o revisor confere consistência; o júri decide se a ideia merece ser executada. Os jurados nunca leem `05-revisao.md`.

O procedimento termina com o passo de tokens, que grava `docs/plano/custos.md`.

## Etapa 9: consolidar o PLANO.md

Você mesmo escreve `docs/plano/PLANO.md`, lendo os arquivos 00 a 06. É um documento para quem vai executar o projeto: autossuficiente, sem exigir a leitura dos arquivos de trabalho, mas com links para eles nos detalhes.

```markdown
# Plano: <nome curto do projeto>

> Gerado por /planejar em <AAAA-MM-DD>. Revisão: <APROVADO | APROVADO COM PENDÊNCIAS>. Júri: <veredito do 06-juri.md>
> Arquivos de trabalho: [análise](01-analise.md) · [arquitetura](02-arquitetura.md) · [design](03-design.md) · [plano](04-plano.md) · [revisão](05-revisao.md) · [júri](06-juri.md) · [custos](custos.md)

<Se o júri deu REPROVADO ou BLOQUEADO, coloque aqui, antes de tudo, um aviso em negrito: "Não execute este plano sem resolver as pendências do júri.">

## Resumo executivo
5 a 8 linhas: problema, solução, público, tamanho do esforço, principal risco.

## Objetivos e escopo
Objetivos (O*), dentro e fora do escopo.

## Requisitos principais
Só os "Must", com IDs.

## Solução
### Arquitetura
Stack, diagrama Mermaid, componentes e decisões-chave (D*).
### Experiência
Jornadas principais, mapa de telas, princípios de design.

## Execução
Fases e marcos, tabela de tarefas, caminho crítico, cronograma, estimativa total.

## Riscos
Os mais relevantes de análise, arquitetura e entrega, com mitigação.

## Premissas e perguntas em aberto

## Pendências da revisão
Apontamentos com status parcial ou pendente. "Nenhuma" se não houver.

## Veredito do júri
Veredito final, rodada em que saiu e placar por jurado (tabela de `06-juri.md`).
Divergências que continuaram abertas, com o nome do jurado.
Propostas não aplicadas (`Aplicada?` = não ou parcial). "Nenhuma" se não houver.

## Consumo de tokens
Total da execução e os 3 agentes que mais consumiram (de `custos.md`).

## Próximos passos
3 a 5 ações concretas para começar amanhã.
```

Regras da consolidação:

- Preserve os IDs originais (RF1, C2, T5...). Não invente conteúdo que não esteja nos arquivos de trabalho.
- Divergência entre arquivos? Vale a resolução registrada em `04-plano.md`; se não houver, registre em "Pendências da revisão".
- Não suavize o veredito do júri nem omita rejeições: copie o placar como está.

## Encerramento

Responda ao usuário em até 8 linhas:

- Caminho do `docs/plano/PLANO.md`, status da revisão e veredito do júri (com placar).
- Estimativa total e número de fases e tarefas.
- Pendências e perguntas em aberto, se houver.
- Total de tokens da execução.

## Regras do coordenador

- Não escreva análise, arquitetura, design, plano ou voto você mesmo. Se um agente falhar, chame-o de novo uma vez com o erro no prompt; falhando de novo, pare e informe o usuário.
- Confira que cada arquivo esperado existe antes de passar para a etapa seguinte.
- Não leia os arquivos de trabalho inteiros entre as etapas; leia só o necessário para decidir (perguntas bloqueantes, veredito, apontamentos, propostas). Leitura completa só na etapa 9.
- Nunca passe a um jurado o voto de outro jurado, o veredito do revisor ou o veredito de uma rodada anterior.
- Não faça commit. O usuário decide o que versionar.
