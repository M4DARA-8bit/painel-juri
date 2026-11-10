# Painel Júri

Painel de agentes do Claude Code para planejar e auditar ideias. Um escritório de planejamento transforma a ideia em plano, e um júri de cinco jurados independentes decide se o plano merece ser executado. Quem rejeita precisa trazer a solução, e a solução volta para o júri validar.

Tudo roda dentro do Claude Code, com a sua assinatura. Não há servidor, chave de API nem instalação.

## Painel de Indicadores (`site/`)

Além do painel de agentes, o repositório traz um **site que calcula indicadores de compras a partir de uma planilha**: você arrasta o `.xlsx`, ele reconhece qual base é e monta os KPIs. Roda inteiro no navegador — a planilha nunca sai do computador, não há servidor nem instalação, e funciona até abrindo `site/index.html` por duplo clique. Guia completo: [`site/README.md`](site/README.md).

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

| Jurado | Persona | Critério | Base normativa |
|--------|---------|----------|----------------|
| `jurado-viabilidade` | Eng. Marta Quintela | Dá para construir com essa stack, prazo e ambiente? | ISO/IEC 25010:2023, AWS Well-Architected |
| `jurado-custo` | Contador Rui Barreto | Quanto custa construir, rodar e manter? Existe opção gratuita? | Princípios FinOps, Well-Architected Custo |
| `jurado-seguranca` | Dra. Helena Prado | Dados pessoais, segredos, permissões. **Tem veto.** | LGPD, Resoluções ANPD 2/2022 e 15/2024, Marco Civil, OWASP Top 10:2025 |
| `jurado-valor` | Designer Bia Takahashi | Resolve um problema real do usuário pelo caminho mais curto? | Heurísticas de Nielsen, LBI art. 63, WCAG 2.2, eMAG, CDC |
| `jurado-diabo` | Promotor Otávio Vargas | Por que isso vai falhar? No mínimo 3 objeções; nunca aprova sem ressalvas. | Pre-mortem (Klein, HBR 2007), vieses de planejamento |
| `relator` | Escrivã Lúcia Mendes | Não vota. Consolida, aplica a regra, expõe divergências e confere as citações de norma. | — |

As personas são fictícias: dão tom e foco a cada voto, nunca autoridade além da evidência.

**Base normativa.** [`.claude/juri/BASE-NORMATIVA.md`](.claude/juri/BASE-NORMATIVA.md) reúne os dispositivos que os jurados podem citar (`[LGPD art. 46]`, `[OWASP A01:2025]`...), com link para o texto oficial e o grau de conferência de cada item. Os jurados não podem inventar artigo, inciso ou prazo, e o relator lista as citações que precisam ser conferidas. O júri aponta riscos de conformidade; não substitui parecer jurídico.

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
  juri/          REGRAS.md, PROCEDIMENTO.md, BASE-NORMATIVA.md
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
