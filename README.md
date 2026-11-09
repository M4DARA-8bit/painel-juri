# Painel Júri

Painel de agentes do Claude Code para planejar e auditar ideias. Um escritório de planejamento transforma a ideia em plano, e um júri de cinco jurados independentes decide se o plano merece ser executado. Quem rejeita precisa trazer a solução, e a solução volta para o júri validar.

Tudo roda dentro do Claude Code, com a sua assinatura. Não há servidor, chave de API nem instalação.

## Comandos

| Comando | O que faz | Resultado |
|---------|-----------|-----------|
| `/planejar <ideia>` | Escritório completo (analista, arquiteto, designer, planejador, revisor) e depois o júri | `docs/plano/PLANO.md` |
| `/auditar <arquivo ou ideia>` | Só o júri, sobre um documento ou uma ideia já existente | `docs/auditoria/<data>-<slug>/` |

Exemplos:

```
/planejar app de agendamento para barbearias com lembrete por WhatsApp
```

```
/auditar docs/propostas/migrar-para-supabase.md
```

## O júri

| Jurado | Critério |
|--------|----------|
| `jurado-viabilidade` | Dá para construir com essa stack, prazo e ambiente? |
| `jurado-custo` | Quanto custa construir, rodar e manter? Existe opção gratuita? |
| `jurado-seguranca` | Dados pessoais, segredos, permissões, LGPD. **Tem veto.** |
| `jurado-valor` | Resolve um problema real do usuário pelo caminho mais curto? |
| `jurado-diabo` | Por que isso vai falhar? Precisa apresentar no mínimo 3 objeções e nunca aprova sem ressalvas. |
| `relator` | Não vota. Consolida, aplica a regra e expõe as divergências com citação literal. |

**Independência.** Os jurados rodam em paralelo, cada um lê só o plano e escreve só o próprio voto. Nenhum vê o voto dos outros nem o parecer do revisor.

**Voto.** `APROVAR`, `APROVAR COM RESSALVAS` ou `REJEITAR`, sempre com evidência citada (RF3, D2, T7...). Rejeitar ou ressalvar exige uma proposta de melhoria com solução concreta e forma de verificar. Voto sem evidência ou rejeição sem proposta é inválido.

**Regra de decisão**, nesta ordem:

1. Segurança rejeitou: **BLOQUEADO**.
2. 3 ou mais rejeições: **REPROVADO**.
3. 2 rejeições: **DEVOLVIDO**.
4. 0 ou 1 rejeição, com ressalvas: **APROVADO COM CONDIÇÕES** (as condições viram tarefas).
5. Sem rejeições nem ressalvas: **APROVADO**.

**Rodadas.** Com BLOQUEADO, REPROVADO ou DEVOLVIDO, as propostas dos jurados são aplicadas ao plano e o júri inteiro vota de novo. No máximo 2 revotações. O que continuar sem solução vira pendência no resultado.

Regras completas: [`.claude/juri/REGRAS.md`](.claude/juri/REGRAS.md). Roteiro das rodadas: [`.claude/juri/PROCEDIMENTO.md`](.claude/juri/PROCEDIMENTO.md).

## Consumo de tokens

Ao fim de cada `/planejar` ou `/auditar`, o coordenador roda `scripts/tokens.py` e grava `custos.md` com o consumo por agente (entrada, cache, saída e modelo).

O script só lê os logs locais que o Claude Code já grava em `~/.claude/projects/`. Ele não usa rede nem chave de API e não precisa de admin: basta a biblioteca padrão do Python 3.8 ou mais novo. Também dá para rodar à mão:

```bash
python scripts/tokens.py
```

```bash
python scripts/tokens.py --listar
```

```bash
python scripts/tokens.py --sessao <id> --saida custos.md
```

Com assinatura, os tokens consomem a cota do plano, não dinheiro. Para poupar cota, jurados e relator usam `model: sonnet`. Troque no cabeçalho de cada agente se quiser.

Sem Python no PC, o coordenador escreve `custos.md` com os totais que cada subagente informa ao terminar.

## PC da empresa (sem admin, com proxy)

- Nada é instalado. Agentes e skills são arquivos Markdown lidos pelo Claude Code.
- A rede só é usada pelo próprio Claude Code. Os agentes do escritório podem usar WebSearch e WebFetch; os jurados não usam rede.
- Se o Python estiver bloqueado, só o relatório detalhado de tokens fica de fora.

## Estrutura

```
.claude/
  agents/        analista, arquiteto, designer, planejador, revisor,
                 jurado-viabilidade, jurado-custo, jurado-seguranca,
                 jurado-valor, jurado-diabo, relator
  juri/          REGRAS.md, PROCEDIMENTO.md
  skills/        planejar, auditar, caveman, megacave, ultracave, caveman-compress
scripts/
  tokens.py      consumo de tokens por agente
docs/plano/      pasta de trabalho do /planejar (guia em README.md)
docs/auditoria/  uma pasta por execução do /auditar
```

Guia de uso e portabilidade do escritório: [`docs/plano/README.md`](docs/plano/README.md).

## Skills caveman

`/caveman`, `/megacave` e `/ultracave` deixam as respostas do Claude mais curtas. `/caveman-compress` comprime arquivos de memória. Elas não afetam os documentos gerados pelos agentes.

## Próximos passos (ideias)

- **Escritório visual em pixel art no Vercel.** Um agente líder delega as tarefas, e as tarefas aparecem num quadro. A base já existe: `06-juri.md` termina com um bloco JSON (`## Dados`), e `python scripts/tokens.py --json` gera o consumo em JSON. Um site estático pode ler esses arquivos do repositório, sem backend.
- **Paperclip (paperclipai/paperclip) como orquestrador.** Avaliar numa fase separada, passando a própria ideia por `/auditar` antes. Pontos a conferir: se roda sem admin, se passa pelo proxy da empresa e se consegue usar a assinatura do Claude Code em vez de uma chave de API.
