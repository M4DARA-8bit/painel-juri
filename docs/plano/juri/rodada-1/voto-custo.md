# Voto: custo

Rodada: 1
Voto: APROVAR COM RESSALVAS
Confiança: média

## Evidências
- 00-ideia.md › Q3 e RNF4: custo de infraestrutura zero, só Vercel e Upstash gratuitos, e o volume de requisições e comandos Redis não pode subir. O plano respeita isso: "Custo estimado: R$ 0" em 02-arquitetura.md › Infraestrutura e operação. Pergunta de custo respondida para o mês 1, mas só para um cenário. [Well-Architected Custo]
- 02-arquitetura.md › Infraestrutura › Orçamento de cota: faz a conta em voz alta (~35 mil comandos por festa de 8, ~12 festas por mês nos 500 mil do Upstash, saldo da política C3 de -9%). É o melhor trecho do plano em custo. Mas é um único cenário (8 pessoas), e o teto de ~12 festas/mês fica só como observação, sem consequência no plano. [FinOps princípio 4]
- 02-arquitetura.md › KT5 e 00-ideia.md › K2: a cota esgotada é "aceita (Q3)". Não há alerta de consumo, painel de limite nem comportamento definido para quando o Upstash corta (fica a mensagem do servidor sem banco?). Sem limite nem alerta, o dia em que der certo vira indisponibilidade, não fatura. [Well-Architected Custo: gestão financeira]
- 02-arquitetura.md › Orçamento de cota (última linha): "A reserva HTTP da Arena é o maior consumidor (~10 req/s por jogador)". Esse consumo não entra na conta de ~35 mil. Com 4 jogadores na reserva por 10 min, são ~24 mil requisições, se cada uma custar 1 comando (a premissa não está escrita). Isso é do tamanho de uma festa inteira, e o plano só diz "o diagnóstico mostra".
- 04-plano.md › T14, T16, T31, T44 e KE5: `netbench` com 8 clientes + TV contra um preview "no mesmo Redis gratuito" (02-arquitetura.md › Ambientes). A linha de base, a medição de F3 e as repetições (variação ≤ 15%, duas rodadas) gastam, cada uma, algo perto de uma festa (~30 mil). Dez rodadas consomem ~60% da cota do mês, que é a mesma cota da produção. KE5 só reage em 60% e manda adiar para o mês seguinte.
- 02-arquitetura.md › Stack › CI e 04-plano.md › T1: "GitHub Actions: gratuito para o repositório". Vale para repositório público. Se for privado, são minutos limitados por mês. O plano não diz a visibilidade nem o custo de `npm ci` + build + teste em cada push. Premissa A-arq4 cobre só "pode usar".
- 02-arquitetura.md › Integrações › TURN gratuito opcional: sem nome do provedor aprovado nem teto da camada gratuita. A-3 em 01-analise.md só "supõe" que é gratuito. Há risco de lock-in leve e de cobrança se passar do teto.
- 04-plano.md › Totais: 110 d-pessoa (+4 de reserva), das quais F4 (Should/Could) são 35,5 d, ~32% do esforço. O custo humano é o gasto real do projeto. Mas F1-F3 (68,5 d) fecham todos os Must e KE4 já dá a ordem de corte de F4. O gasto se paga: o pedido original cita animações e gráficos (00-ideia.md › Pedido original). Não rejeito por isso.
- 02-arquitetura.md › D1 e Stack: dependências novas só de desenvolvimento, utilitários próprios em vez de drei, framer-motion e Howler. Bom: zero custo de licença e de bundle, e a alternativa gratuita foi considerada e documentada.
- Uso de IA: o plano não usa IA nem chave de API paga (nenhuma menção em 02-arquitetura.md › Integrações). Não está dito explicitamente. Fecho como sugestão.

## Fundamentação normativa
- [FinOps princípio 4]: dados de custo acessíveis e atuais. Atende em parte: `Server-Timing`, painel do Upstash e contador de req/min (C2). Falta o consumo de comandos Redis por festa medido, e um alerta antes do teto (ver JC1).
- [FinOps princípio 2]: decisões guiadas pelo valor. Atende: D4 e o orçamento de cota trocam custo por latência onde alguém espera, com saldo calculado.
- [FinOps princípio 6]: modelo de custo variável. Atende por ser o modelo serverless/gratuito. Mas a camada gratuita é um teto fixo, não variável, e não há plano para o dia em que o uso passar dele (Q3 proíbe plano pago).
- [Well-Architected Custo: gestão financeira de nuvem]: não atende por completo. Sem limite de gasto nem alerta, e sem estimativa por cenário.
- [Well-Architected Custo: parar de gastar com trabalho indiferenciado]: atende: serviço gerenciado (Vercel, Upstash) em vez de servidor próprio.
- Perguntas obrigatórias da base: (a) 3 cenários (protótipo, 100 e 10 mil usuários): não atende, só 1 cenário; (b) limite ou alerta: não atende; (c) IA: sem uso, falta dizer; (d) licenças: Geist, three.js e deps de dev são abertas (MIT/OFL, conferir na instalação), áudio é sintetizado, sem arquivo licenciado. Nenhuma licença é citada no plano.

## Riscos
- Esgotar os 500 mil comandos do Upstash no meio do mês (festas reais + Arena na reserva HTTP + netbench em preview), com queda do jogo inteiro e sem aviso. Probabilidade média, impacto alto num produto cujo valor é a festa funcionar na hora.
- Quando o produto der certo (mais de ~12 festas/mês), o próximo degrau é pago e está proibido por Q3. O plano não define o gatilho nem o plano de saída; o lock-in é leve (Redis REST padrão), mas o limite é duro.
- Medição de linha de base e de regressão consumindo a mesma cota da produção (T14, T16, T44).
- Custo humano de 110 d com 1 pessoa: se F1+F2 passarem de 54 d, KE4 corta F4. Está previsto e é aceitável.

## Propostas de melhoria
| ID | Severidade | Responsável | Arquivo | Problema | Solução proposta | Como verificar |
|----|-----------|-------------|---------|----------|------------------|----------------|
| JC1 | condição | arquiteto | 02-arquitetura.md | Sem alerta nem limite de consumo do Upstash/Vercel; cota esgotada é "aceita" (KT5) sem comportamento definido. | Em "Infraestrutura e operação", definir (a) alerta de uso do Upstash a 60% e 80% da cota mensal (e-mail do painel) e checagem semanal do painel como rotina do mantenedor; (b) comportamento degradado ao esgotar: mensagem clara na criação de sala ("limite gratuito do mês atingido, tente amanhã") em vez de erro genérico; (c) um contador de comandos por festa no `netbench`/README. Acrescentar uma tarefa em F3. | Seção nova no arquitetura com os dois limiares e a mensagem; teste de rota com store que devolve erro de cota e responde com a mensagem definida. |
| JC2 | condição | arquiteto | 02-arquitetura.md | O orçamento de cota cobre um só cenário (festa de 8) e deixa a reserva HTTP da Arena (~10 req/s por jogador) fora da conta. | Substituir "Orçamento de cota" por tabela com 3 cenários: protótipo (1 festa/semana), 100 usuários/mês e 10 mil usuários/mês, em comandos Redis/mês, invocações Vercel e GB de banda, mais uma linha da Arena (direto vs reserva, informando comandos por requisição). Dizer em qual cenário o plano gratuito deixa de caber e qual é o gatilho de decisão (ex.: 80% da cota por 2 meses), com a alternativa gratuita avaliada (ex.: segundo banco gratuito por ambiente) e a pago-mais-barata registrada como plano B. | Tabela com os 3 cenários e o ponto de ruptura; número da Arena medido por T14 e registrado em docs/bench. |
| JC3 | condição | planejador | 04-plano.md | `netbench` e medições de F1/F3 usam o Redis de produção no preview e podem consumir ~60% da cota (T14, T16, T44, KE5 só reage depois). | Usar um segundo banco Upstash gratuito só para preview e medição (variáveis separadas por ambiente na Vercel) e rodar o `netbench` por padrão contra store em memória local; limitar a rodadas de 3 min com N reduzido para a linha de base, e registrar em T14 o consumo de comandos por rodada. Mover o gatilho de KE5 de 60% para consumo estimado antes da rodada. | T14 e T16 citam o banco de preview e o consumo medido por rodada; painel do Upstash de produção sem salto durante as medições. |
| JC4 | sugestão | planejador | 04-plano.md | CI no GitHub Actions: "gratuito para o repositório" sem checar visibilidade nem minutos. | Em T1, registrar se o repositório é público (minutos ilimitados) ou privado (cota mensal) e estimar minutos por push (build + test); usar `concurrency` para cancelar execuções antigas e cache do `.next`. | T1 mostra o tempo médio de execução e a estimativa de minutos/mês. |
| JC5 | sugestão | arquiteto | 02-arquitetura.md | TURN "gratuito opcional" sem provedor nem teto da camada gratuita. | Nomear o provedor, escrever o limite mensal gratuito (conferir na página oficial) e o que acontece ao estourar (a Arena cai para a reserva HTTP, que gasta Redis, ver JC2). | Linha na tabela de Integrações com provedor, teto e efeito. |
| JC6 | sugestão | analista | 01-analise.md | Faltam duas declarações exigidas de custo: uso de IA e licenças. | Adicionar em RNF4 ou Premissas: "O projeto não usa IA nem chave de API paga" e "licenças das dependências novas e da fonte conferidas (MIT/OFL); sem ativos licenciados (som sintetizado)". | As duas frases presentes na análise; `npm ls` das deps novas com a licença listada no PR de T2. |

## O que mudaria meu voto
- Para APROVAR: JC1, JC2 e JC3 aplicados, com a tabela de 3 cenários e o alerta de cota a 60%/80% escritos no plano.
- Para REJEITAR: se ficar comprovado que o `netbench` ou a Arena em reserva consomem a cota de produção sem separação de ambiente e sem aviso. Aí o custo zero deixa de ser verdadeiro na prática.

— Contador Rui Barreto, jurado(a) de custo
