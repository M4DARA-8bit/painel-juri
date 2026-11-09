# Escritório de planejamento

Pasta de trabalho do comando `/planejar` do Claude Code. Cinco agentes transformam uma ideia em um plano de projeto revisado, e um júri de cinco jurados decide se o plano merece ser executado.

## Como usar

No Claude Code, dentro do projeto:

```
/planejar app de agendamento para barbearias com lembrete por WhatsApp
```

O resultado final fica em `docs/plano/PLANO.md`.

## Fluxo

```
analista ─┬─▶ arquiteto ─┬─▶ planejador ─▶ revisor ─▶ 1 rodada de correção ─▶ verificação ─▶ JÚRI ─▶ relator ─▶ PLANO.md
          └─▶ designer  ─┘                                                                    ▲          │
                                                                                              └──────────┘
                                                              propostas aplicadas e nova votação (máx. 2 vezes)
```

Detalhes do júri: `.claude/juri/REGRAS.md` (votos e regra de decisão) e `.claude/juri/PROCEDIMENTO.md` (rodadas).

| Arquivo | Autor | Conteúdo |
|---------|-------|----------|
| `00-ideia.md` | coordenador | Pedido original e respostas do usuário |
| `01-analise.md` | analista | Problema, objetivos, escopo, requisitos (RF/RNF), premissas, riscos |
| `02-arquitetura.md` | arquiteto | Stack, componentes, dados, integrações, segurança, decisões |
| `03-design.md` | designer | Jornadas, telas, componentes de interface, acessibilidade |
| `04-plano.md` | planejador | Fases, tarefas, dependências, estimativas, critérios de aceite |
| `05-revisao.md` | revisor | Veredito, apontamentos e verificação final |
| `juri/rodada-<n>/voto-*.md` | jurados | Voto de cada jurado, com evidências e propostas de melhoria |
| `juri/rodada-<n>/propostas.md` | relator | Propostas da rodada por responsável, sem os votos |
| `06-juri.md` | relator | Veredito, placar, divergências e histórico de rodadas |
| `custos.md` | `scripts/tokens.py` | Consumo de tokens por agente |
| `PLANO.md` | coordenador | Plano consolidado para execução |

Os itens têm IDs (RF1, C2, S3, T4, R5, JS1...) para rastrear cada requisito até a tarefa que o entrega.

Rodando `/planejar` de novo, o comando pergunta se deve arquivar a rodada anterior em `arquivo/<data>/`.

## Levar para outro projeto

Copie estes caminhos para a raiz do outro projeto:

```
.claude/agents/            (todos os .md: escritório, jurados e relator)
.claude/juri/              (REGRAS.md e PROCEDIMENTO.md)
.claude/skills/planejar/
.claude/skills/auditar/
scripts/tokens.py
docs/plano/README.md
```

Exemplo, a partir da raiz deste repositório:

```bash
DEST=/caminho/do/outro-projeto
mkdir -p "$DEST/.claude/agents" "$DEST/.claude/skills" "$DEST/scripts" "$DEST/docs/plano"
cp .claude/agents/*.md "$DEST/.claude/agents/"
cp -r .claude/juri "$DEST/.claude/"
cp -r .claude/skills/planejar .claude/skills/auditar "$DEST/.claude/skills/"
cp scripts/tokens.py "$DEST/scripts/"
cp docs/plano/README.md "$DEST/docs/plano/"
```

Para ter o escritório em todos os projetos sem copiar, coloque os agentes em `~/.claude/agents/` e as skills em `~/.claude/skills/`. Nesse caso, `.claude/juri/` e `scripts/tokens.py` ainda precisam estar no projeto, porque os agentes os leem por caminho relativo. A pasta `docs/plano/` é criada no projeto em que o comando rodar.

Reinicie a sessão do Claude Code depois de copiar, para os agentes e o comando serem carregados.

## Personalizar

- **Modelo por agente**: adicione `model: opus`, `sonnet` ou `haiku` no cabeçalho do agente. Sem essa linha, o agente usa o modelo da sessão.
- **Estrutura dos documentos**: edite a seção "Saída" de cada agente.
- **Fluxo**: edite as etapas em `.claude/skills/planejar/SKILL.md`.
- **Regra de decisão do júri**: edite "Regra de decisão" em `.claude/juri/REGRAS.md`. O relator aplica o que estiver lá.
- **Novo jurado** (ex.: `jurado-acessibilidade`): copie um `jurado-*.md`, troque critério, prefixo e perguntas, inclua-o na tabela de `REGRAS.md` e na lista do passo 1 de `PROCEDIMENTO.md`.
- **Novo agente** (ex.: `seguranca`): crie `.claude/agents/seguranca.md` com um arquivo de saída próprio e inclua a etapa na skill.
