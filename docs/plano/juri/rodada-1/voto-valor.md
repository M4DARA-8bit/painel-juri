# Voto: valor para o usuário

Rodada: 1
Voto: APROVAR COM RESSALVAS
Confiança: média

## Evidências
- "01-analise.md › Problema" e "00-ideia.md › Q1": o usuário confirmou lag em dois pontos, fps do 3D e atraso entre aparelhos. O problema é real e afeta P1, P2, P3 e P4. Não há medição nem relato de jogadores (A5, Q4, Q8 em aberto). Como o custo de errar é baixo, aceito a premissa, porque T16 mede a linha de base antes de qualquer mudança.
- "04-plano.md › Fases e marcos, M1": o primeiro marco dura cerca de 6 semanas (24,5 d, F1) e entrega só CI, testes, diagnóstico e linha de base. O jogador não percebe nada de diferente. A primeira melhoria perceptível (RF1, T19) só chega em M2, por volta da semana 11. Para P1 e P2 o primeiro marco não é "algo que o usuário consegue usar".
- "04-plano.md › Totais": 110 d para 1 pessoa, dos quais F4 (polimento audiovisual e entrada tardia) pesa 35,5 d (T45 a T65). O pedido era reduzir lag e polir. Respondendo à minha pergunta de sempre: sem T47 a T58 (efeitos por jogo, partículas, pops), o usuário ainda resolve o problema dele, que é o lag. F4 é Should/Could, e KE4 já prevê o corte, o que é bom. O O5 ("jogo mais vivo") foi pedido pelo usuário em "melhorias de gráficos e animações", então não o elimino.
- O1, O2, O3 e O4: mensuráveis, com método (T12, T13, T14, T15, T44). Está bem feito. O5 só é "verificável por uma lista de eventos", isto é, mede entrega e não efeito percebido. Nenhuma tarefa pergunta a um grupo real se a segunda partida aconteceu (a razão de existir do projeto, "01-analise.md › Problema").
- T38 e T37 (chip e banner de conexão, estado "reconectando", botões "enviado ✓"/"aguardando conexão"): cobrem a jornada de queda de rede sem fricção e dão visibilidade de status. [Nielsen 1] [Nielsen 9]
- T72 (modo desempenho manual, em F2) e T30 (aviso uma vez por sessão): bom controle do usuário sobre o aparelho dele sem interromper a partida. [Nielsen 3] [Nielsen 7]
- T61 e "Conflitos encontrados › Sala cheia": o texto muda conforme o modo ("entra na próxima rodada" ou "entra na próxima partida") e a decisão por `reason`. Boa correspondência com o mundo real. [Nielsen 2]
- T63 (alvos ≥ 44 px, contraste, foco, `lang`) e T46 (reduzir movimento) estão em F4, a fase que KE4 manda cortar. RNF7 é obrigatório na análise, mas a entrega dele pode ser cortada sem que um Must seja afetado ("Rastreabilidade": RNF7 → T52, T63, T45).
- "04-plano.md › Base": o plano cita `02-arquitetura.md` e `03-design.md` (jornadas S1 a S14, UI1 a UI12, J3, J4), mas esses arquivos não existem em `/home/user/painel-juri/docs/plano/`. Não consegui conferir se as jornadas cobrem o uso principal sem fricção. Avalio só o que o 04 resume: T38, T43, T61.
- Q6 (áudio: TV, celular ou ambos) segue em aberto, mas "Conflitos encontrados › Roteamento de som" fixa um padrão razoável (TV toca tudo, celular só o próprio e "sua vez") e T49 isola a tabela, então mudar depois custa pouco.

## Fundamentação normativa
- [Nielsen 1] visibilidade do status: T11, T37, T38 e o diagnóstico `?diag=1` atendem ao status da conexão e do desempenho.
- [Nielsen 3] controle e liberdade: T72, T45 e o mudo persistente (T49) atendem. O aviso de queda de qualidade tem "Usar modo desempenho" (T30), mas não diz se o usuário pode voltar atrás. Fica como detalhe de implementação.
- [Nielsen 8] design minimalista: F4 acrescenta pops, partículas, cortinas de transição e contagem 3-2-1 em todos os 13 jogos. Há risco de poluir a cena e de pesar no 3D (K1). T65 mede o fps, mas nada mede se a cena continua legível.
- [WCAG 2.2]: contraste AA, alvo de toque e foco visível previstos em RNF7 e T63. Atende no texto, mas T63 está numa fase cortável, o que enfraquece o cumprimento. O texto da WCAG 2.2 exige conferência por quem implementar, e eu não citei critério numerado porque a base não os lista.
- [LBI art. 63]: se o Party Deck for um site de empresa com representação no Brasil, a acessibilidade é obrigatória. O plano não diz se é o caso. Não é parecer jurídico. Citação só como risco baixo.
- CDC e eMAG: nenhuma aplicável (sem venda ao consumidor, sem site público de governo).

## Riscos
- O valor percebido só aparece tarde: a F1 inteira, cerca de 6 semanas, não muda nada para o jogador. Com 1 pessoa e a "falácia do planejamento" (110 d, 118 d úteis), o usuário pode ficar semanas sem ver melhora e o projeto pode parar antes de F2 (K5).
- Acessibilidade (RNF7) e reduzir movimento (RF11) ficam em F4, cortáveis por KE4, apesar de serem requisitos declarados (alvos de 44 px, contraste, foco).
- Sem teste com jogadores reais, o objetivo "ninguém deixa de jogar uma segunda partida" fica sem sinal. Atingir 50 fps e p95 ≤ 600 ms não garante que a festa melhorou.
- Efeitos (partículas, sons nos 13 jogos) podem cansar ou atrapalhar o jogo em celular pequeno, por exemplo som da TV mais som do celular juntos (Q6 em aberto).
- Os artefatos `02-arquitetura.md` e `03-design.md` estão ausentes na pasta do plano, então as jornadas não são auditáveis por quem lê só o 04.

## Propostas de melhoria
| ID | Severidade | Responsável | Arquivo | Problema | Solução proposta | Como verificar |
|----|-----------|-------------|---------|----------|------------------|----------------|
| JU1 | condição | planejador | 04-plano.md | M1 (F1, ~6 semanas) não entrega nada que o jogador use. O primeiro ganho percebido (RF1, T19) só chega em M2 (~semana 11). | Dividir F1: após T7, T11 e T12 mínimos, antecipar um "M1b" com T17+T18+T19+T72 (qualidade automática e modo desempenho) sobre as 2 ou 3 cenas piores. Entregar o modo desempenho manual (T72) logo depois do diagnóstico. A linha de base completa (T16) continua em paralelo. | O Gantt tem um marco de uso real antes da semana 6. M1b descreve o que o anfitrião ou jogador nota. O critério de saída cita um ganho de fps medido numa cena. |
| JU2 | condição | planejador | 04-plano.md | O5 e o relatório final medem entrega de efeitos (checklist), não o efeito sobre o usuário. Nada confirma que a "segunda partida" acontece, a razão do projeto. | Em T71, ou em nova tarefa na F5 de ~1 d, incluir um teste de jogo com 1 grupo real (5 a 8 pessoas, aparelhos mistos incluindo o de referência): duas partidas seguidas, anotar travadas notadas, dúvidas e se pediram outra rodada. Registrar em `docs/bench/RELATORIO-FINAL.md` ao lado das metas O1 a O3. | O relatório final tem uma seção "Teste com jogadores" com data, nº de pessoas, aparelhos e ao menos 3 observações. |
| JU3 | condição | planejador | 04-plano.md | T63 (alvos ≥ 44 px, contraste, foco) e T46 (reduzir movimento) estão em F4, cortável por KE4. RNF7 e RF11 viram opcionais na prática, [WCAG 2.2]. | Mover T63 e T46 para F2 ou F3 (cerca de 2,5 d), ou declarar explicitamente em KE4 que essas duas tarefas não entram na lista de corte. Atualizar a rastreabilidade de RNF7 e RF11. | KE4 não lista T63 nem T46 como cortáveis. A auditoria Lighthouse de T63 roda antes de M3. |
| JU4 | sugestão | planejador | 04-plano.md | O plano referencia `02-arquitetura.md` e `03-design.md` que não estão na pasta, então as jornadas S1 a S14 e J3/J4 não são verificáveis a partir do 04. | Incluir os dois arquivos no pacote do plano, ou colocar no 04 um resumo da jornada principal em 5 passos (criar sala, entrar por QR, jogar, cair a rede, voltar) com as telas de cada passo. | O 04 tem a jornada principal descrita ou os arquivos existem. |
| JU5 | sugestão | designer | 04-plano.md | F4 acrescenta pops, partículas, cortinas e contagens em todos os 13 jogos e no tabuleiro, com risco de poluição visual e de som duplicado TV mais celular ([Nielsen 8]). T65 só mede fps. | Em T56/T57, antes de generalizar, aprovar um jogo-piloto (ex.: Basquete) com 2 pessoas: efeitos curtos (≤ 400 ms), volume baixo no celular. Só então replicar. Ajustar o critério de T65 para incluir "legibilidade: placar e alvo visíveis durante o efeito". | Nota do piloto no PR. T65 tem o critério de legibilidade. |
| JU6 | sugestão | planejador | 04-plano.md | Q4 e Q8 (quais aparelhos e quais jogos têm mais lag) seguem abertas; o esforço de F2 pode ser mal distribuído. | Perguntar ao usuário Q4 e Q8 agora (2 perguntas) e priorizar T28 e T29 pelas respostas e pelo ranking de T16. | Respostas registradas em `01-analise.md`; T28 cita o ranking. |

## O que mudaria meu voto
- Para APROVAR: JU1, JU2 e JU3 aplicadas, de modo que o usuário veja melhora antes da semana 6, que haja um teste com jogadores reais e que acessibilidade e reduzir movimento deixem de ser cortáveis.
- Para REJEITAR: se na rodada seguinte os arquivos `02-arquitetura.md` e `03-design.md` seguirem ausentes e o 04 não descrever a jornada principal, de modo que o valor ao usuário fique inverificável.

— Designer Bia Takahashi, jurado(a) de valor para o usuário
