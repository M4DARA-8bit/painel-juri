# Consumo de tokens

Sessão: `8103f1f3-1c6f-5d04-97e8-ac46062ba34b`  
Gerado em: 2026-11-09 18:12  
Fonte: logs locais do Claude Code. Com assinatura, isto consome cota, não dinheiro.

| Agente | Tarefa | Chamadas | Entrada | Cache (escrita) | Cache (leitura) | Saída | Total | Modelo |
|--------|--------|---------:|--------:|----------------:|----------------:|------:|------:|--------|
| coordenador (sessão principal) |  | 19 | 48 | 104.227 | 1.870.534 | 12.102 | 1.986.911 | claude-opus-5-5 |
| jurado-valor | Júri rodada 1 valor | 3 | 6 | 22.328 | 25.821 | 3.135 | 51.290 | claude-sonnet-5-5 |
| jurado-seguranca | Júri rodada 1 segurança | 4 | 8 | 23.432 | 46.698 | 3.813 | 73.951 | claude-sonnet-5-5 |
| jurado-custo | Júri rodada 1 custo | 4 | 8 | 22.506 | 45.612 | 3.307 | 71.433 | claude-sonnet-5-5 |
| jurado-diabo | Júri rodada 1 diabo | 4 | 8 | 23.525 | 46.025 | 4.223 | 73.781 | claude-sonnet-5-5 |
| jurado-viabilidade | Júri rodada 1 viabilidade | 3 | 6 | 22.840 | 25.917 | 3.583 | 52.346 | claude-sonnet-5-5 |
| relator | Relator rodada 1 | 4 | 8 | 47.023 | 63.314 | 13.381 | 123.726 | claude-sonnet-5-5 |
| analista | Etapa 1 análise | 8 | 16 | 37.103 | 155.907 | 7.926 | 200.952 | claude-opus-5-5 |
| **Total** | | 49 | 108 | 302.984 | 2.279.828 | 51.470 | **2.634.390** | |

## Por agente (somando chamadas repetidas)

| Agente | Total | % |
|--------|------:|--:|
| coordenador (sessão principal) | 1.986.911 | 75% |
| analista | 200.952 | 8% |
| relator | 123.726 | 5% |
| jurado-seguranca | 73.951 | 3% |
| jurado-diabo | 73.781 | 3% |
| jurado-custo | 71.433 | 3% |
| jurado-viabilidade | 52.346 | 2% |
| jurado-valor | 51.290 | 2% |

Leitura de cache custa bem menos cota do que entrada nova. Para comparar agentes, olhe principalmente Entrada, Cache (escrita) e Saída.


## Nota do coordenador: chamadas não contadas pelo script
O script não registrou as chamadas que rodaram em segundo plano. Valores de `subagent_tokens` informados pelo resultado de cada chamada:

| Agente | Tarefa | Tokens |
|--------|--------|--------|
| arquiteto | Etapa 2 | 91.438 |
| arquiteto | Correção da revisão | 59.813 |
| arquiteto | Correção do júri | 98.465 |
| designer | Etapa 2 | 89.022 |
| planejador | Etapa 3 | 73.683 |
| planejador | Correção da revisão | 78.341 |
| planejador | Correção do júri | 165.146 |
| revisor | Etapa 4 | 101.472 |
| revisor | Verificação final | 80.113 |
| **Subtotal** | | **837.493** |

Total estimado da execução: 2.634.390 + 837.493 = **3.471.883** tokens.
