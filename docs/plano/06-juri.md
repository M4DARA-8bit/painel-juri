# Júri

Veredito: APROVADO COM CONDIÇÕES
Rodada: 1 de no máximo 3

## Placar
| Jurado | Voto | Confiança | Válido? | Propostas (bloq./cond./sug.) |
|--------|------|-----------|---------|------------------------------|
| viabilidade | APROVAR COM RESSALVAS | média | sim | 0/3/3 |
| custo | APROVAR COM RESSALVAS | média | sim | 0/3/3 |
| seguranca | APROVAR COM RESSALVAS | média | sim | 0/4/2 |
| valor | APROVAR COM RESSALVAS | média | sim | 0/3/3 |
| diabo | APROVAR COM RESSALVAS | média | sim | 0/4/2 |

## Aplicação da regra
Votos inválidos não contam; nenhum voto foi invalidado (ver "Votos inválidos"). Quórum: 0 votos inválidos, a rodada decide.

1. `jurado-seguranca` votou `REJEITAR`? Não. Votou "APROVAR COM RESSALVAS". Veto não disparado.
2. 3 ou mais `REJEITAR`? Não. Há 0.
3. 2 `REJEITAR`? Não. Há 0.
4. 0 ou 1 `REJEITAR` e alguma ressalva? Sim. 0 `REJEITAR` e 5 `APROVAR COM RESSALVAS`. Regra 4 disparou: **APROVADO COM CONDIÇÕES**.
5. Não avaliada (a regra 4 já decidiu).

Consequência prevista em `REGRAS.md › Rodadas`: as 17 propostas `condição` são aplicadas e viram tarefas no plano. Não há nova votação. Não há propostas `bloqueante`.

## Divergências

**D-1. Existência de `02-arquitetura.md` e `03-design.md` (valor × demais jurados).**
- valor: "`02-arquitetura.md` e `03-design.md` estão ausentes na pasta do plano, então as jornadas não são auditáveis por quem lê só o 04." (Evidências, "04-plano.md › Base"; JU4). Também: "Para REJEITAR: se na rodada seguinte os arquivos `02-arquitetura.md` e `03-design.md` seguirem ausentes".
- viabilidade, custo, seguranca e diabo citam conteúdo de `02-arquitetura.md` (ex.: viabilidade: "02-arquitetura.md › Stack e D1"; seguranca: "02-arquitetura.md › Segurança e privacidade"; diabo: "Decisões › A-arq3").
- Conferência do relator: os dois arquivos existem em `/home/user/painel-juri/docs/plano/` (listagem feita nesta rodada). A premissa factual de JU4 não se confirma na leitura do relator. Não sei se os arquivos estavam ausentes no momento do voto de valor. O restante do voto de valor (JU1, JU2, JU3) não depende dessa premissa. Divergência exposta, não resolvida.

**D-2. Valor dos testes de tela T2 a T5 (viabilidade × diabo).**
- viabilidade: "O plano trata a prova de conceito do `@react-three/test-renderer` como porta de entrada, o que é a ordem certa para o maior risco técnico (RF15, K4)." (04-plano.md › T2, T4 e KT3).
- diabo: "T2/T4/T5 gastam ~6 d (e KE1 pode adicionar +1 d) para provar que as telas "montam" em jsdom; nenhuma delas mede lag, que é o pedido de 00-ideia.md." (Objeção 5; JD5 propõe limitar T4 a 5 casos até T16).

**D-3. Se a medição de região e a ordem das tarefas de latência estão certas (viabilidade × diabo).**
- viabilidade: "`Server-Timing` e a região fixa atacam a latência de Redis" (04-plano.md › T39 e O2), sem citar A-arq3 como risco.
- diabo: "A-arq3 (...) admite que sem região fixa "D5 não se aplica". Hoje não há `regions` em nenhum `vercel.json` do party-deck" e "T39 custa 0,5 d e só entra em F3" (Objeção 3; JD3). Nota de conferência: o diabo fala em "depois de ~40 dias úteis"; a soma planejada de F1 e F2 no plano é 24,5 d + 25,5 d = 50 d.

**D-4. Priorização de F4 e do escopo de polimento (valor e custo × diabo; valor × KE4).**
- custo: "F4 (Should/Could) são 35,5 d, ~32% do esforço (...) Não rejeito por isso." (04-plano.md › Totais).
- valor: "O5 ("jogo mais vivo") foi pedido pelo usuário em "melhorias de gráficos e animações", então não o elimino." (04-plano.md › Totais). Ao mesmo tempo, JU3 pede tirar T63 e T46 (acessibilidade, reduzir movimento) da lista cortável de KE4.
- diabo: "00-ideia.md Q2 pede só polir jogos existentes. F4 (entrada tardia T59–T61, 6,5 d, ...) é uma funcionalidade nova com superfície de regressão alta" (Objeção 6; JD6 propõe mover T59 a T61 para backlog se Q9 for "não prioritário").

**D-5. Limite de taxa de segurança × consumo de cota (seguranca × custo, viabilidade, diabo).**
- seguranca: JS1 propõe "Usar o próprio Upstash (contador com TTL) para não pagar nada" para limitar criação de sala e `join`, e ressalva "consumo adicional de comandos documentado no orçamento de cota".
- viabilidade: "A cota gratuita do Upstash é consumida pelas próprias medições e compartilhada com a produção (T14, T16, T44, T67, KT5, KE5)." Custo e diabo registram o mesmo risco de cota. Nenhum voto quantifica o custo em comandos do contador proposto em JS1. Tensão exposta, não resolvida.

**D-6. Onde O2 deve ser medido (viabilidade, diabo × premissa da arquitetura).**
- viabilidade: "RF5 [Must] × A-arq1: (...) Um Must pode ser declarado cumprido sem ser verdadeiro nos celulares." (JV1 propõe reescrever RF5/O2 com duas metas, 600 ms e 1,2 s).
- diabo: "Quem sente "atraso entre aparelhos" em festa é principalmente o jogador no celular." (Objeção 4; JD4 propõe medir e pedir confirmação do usuário, sem fixar 1,2 s).
- Os dois concordam no diagnóstico e divergem na solução: reescrever o requisito (JV1) ou medir antes de decidir (JD4).

**D-7. Referência cruzada de evidência.** custo cita "00-ideia.md › K2"; K2 está em `01-analise.md` (Riscos). A evidência existe, só com arquivo trocado. Não afeta a validade.

## Votos inválidos
Nenhum.

Verificação de evidências: todos os IDs citados (RF, O, T, KT, KE, A-arq, C, D, S) existem em `01-analise.md`, `02-arquitetura.md`, `03-design.md` ou `04-plano.md`. Cada voto tem ao menos uma evidência que confere. Todo voto `APROVAR COM RESSALVAS` traz ao menos uma proposta com solução e forma de verificar.

## Fundamentação normativa
- viabilidade: `[ISO 25010 Adequação funcional]`, `[ISO 25010 Eficiência de desempenho]`, `[ISO 25010 Confiabilidade]`, `[ISO 25010 Manutenibilidade]`, `[ISO 25010 Flexibilidade]`, `[Well-Architected Confiabilidade]`, `[Well-Architected Eficiência de desempenho]`, `[Restrições de ambiente]` (seção da base).
- custo: `[Well-Architected Custo]` (inclui gestão financeira e trabalho indiferenciado), `[FinOps princípio 2]`, `[FinOps princípio 4]`, `[FinOps princípio 6]`.
- seguranca: `[LGPD art. 6º]`, `[LGPD art. 7º]`, `[LGPD art. 14]`, `[LGPD art. 18]`, `[LGPD art. 46]`, `[LGPD art. 48]`, `[Resolução CD/ANPD 15/2024]`, `[Marco Civil art. 15]`, `[OWASP A01:2025]`, `[OWASP A02:2025]`, `[OWASP A03:2025]`, `[OWASP A04:2025]`, `[OWASP A06:2025]`, `[OWASP A07:2025]`, `[OWASP A09:2025]`.
- valor: `[Nielsen 1]`, `[Nielsen 2]`, `[Nielsen 3]`, `[Nielsen 7]`, `[Nielsen 8]`, `[Nielsen 9]`, `[WCAG 2.2]`, `[LBI art. 63]`. Declara CDC e eMAG como não aplicáveis.
- diabo: `[pre-mortem]`, `[falácia do planejamento]`, `[dependência única]`, `[pensamento de grupo]`, `[Well-Architected Custo]` (como risco).

Itens que a base marca `conferir` e que foram citados: `[LGPD art. 14]`, `[LGPD art. 18]` e `[Marco Civil art. 15]` (seguranca). O próprio voto declara que não sustentam rejeição; não houve rejeição.

## Citações a conferir
Nenhuma. Todas as normas citadas constam da base e não alteram número de artigo nem prazo (ex.: "3 dias úteis" em JS4 coincide com `[Resolução CD/ANPD 15/2024]` da base).

## Propostas por responsável
Detalhe em [propostas.md](juri/rodada-1/propostas.md).

| Responsável | Bloqueante | Condição | Sugestão | Total |
|-------------|-----------|----------|----------|-------|
| analista | 0 | 1 (JV1) | 1 (JC6) | 2 |
| arquiteto | 0 | 6 (JC1, JC2, JS2, JS4, JD2, JD4) | 4 (JV4, JV6, JC5, JS6) | 10 |
| designer | 0 | 0 | 1 (JU5) | 1 |
| planejador | 0 | 10 (JV2, JV3, JC3, JS1, JS3, JU1, JU2, JU3, JD1, JD3) | 7 (JV5, JC4, JS5, JU4, JU6, JD5, JD6) | 17 |
| **Total** | **0** | **17** | **13** | **30** |

Propostas sobre a mesma questão, mantidas em linhas separadas: JV2 e JC3 (cota consumida pelas medições; JD2 em parte); JV1 e JD4 (O2 nos celulares); JU1 e JD1 (valor tardio de F1; JV3 em parte); JC1 e JD2 (comportamento com cota esgotada).

## Histórico de rodadas
| Rodada | Veredito | Aprovar | Ressalvas | Rejeitar | Inválidos |
|--------|----------|---------|-----------|----------|-----------|
| 1 | APROVADO COM CONDIÇÕES | 0 | 5 | 0 | 0 |

## Dados
```json
{"rodada": 1, "veredito": "APROVADO COM CONDIÇÕES", "votos": {"viabilidade": "APROVAR COM RESSALVAS", "custo": "APROVAR COM RESSALVAS", "seguranca": "APROVAR COM RESSALVAS", "valor": "APROVAR COM RESSALVAS", "diabo": "APROVAR COM RESSALVAS"}, "propostas": {"bloqueante": 0, "condicao": 17, "sugestao": 13}}
```

— Escrivã Lúcia Mendes, relatora
