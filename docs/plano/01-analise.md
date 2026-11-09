# Análise

## Problema
O Party Deck (jogos de festa 3D no navegador: tabuleiro, 13 minigames e a Arena em tempo real) já tem muito conteúdo, mas a experiência trava em aparelhos comuns: queda de quadros no 3D, atraso perceptível nas partidas e telas que "pulam". Para um grupo reunido na sala, um lag de poucos segundos ou um celular que esquenta estraga a rodada inteira. Além disso, a cobertura de testes não chega às telas nem à rede, então cada melhoria arrisca quebrar um jogo sem ninguém perceber. Vale resolver porque a fluidez é o que decide se o grupo joga uma segunda partida.

## Objetivos
- O1: Fluidez no 3D. Num celular intermediário de referência (ver A2), todo jogo e o tabuleiro mantêm mediana ≥ 50 fps e p95 do tempo de quadro ≤ 33 ms durante 60 s de partida.
- O2: Resposta rápida da sala. Numa rede boa, nos modos por polling, a mudança de estado causada por uma ação aparece em p95 ≤ 600 ms na TV e no celular do jogador da vez, e em p95 ≤ 1,2 s nos demais celulares (hoje o piso teórico é o intervalo de 300 ms mais a requisição). As duas faixas são medidas separadamente, por papel de aparelho. A faixa de 1,2 s depende de confirmação do usuário (Q10).
- O3: Arena sem travadas. Na mesma rede Wi-Fi, menos de 1 % dos retratos (snapshots) chegam com mais de 100 ms de atraso, e o boneco próprio responde ao joystick no quadro seguinte.
- O4: Rede de segurança de testes. Toda melhoria entregue vem com teste automatizado; os testes cobrem também os módulos de rede do cliente (polling, relógio, conexão da Arena) e a renderização básica de cada tela de jogo, e `npm test`, `npm run lint`, `npm run typecheck` e `npm run build` passam no CI.
- O5: Jogo mais vivo. Todo minigame e o tabuleiro têm retorno visual e sonoro nos eventos principais (ponto, erro, vitória, troca de turno), verificável por uma lista de eventos por jogo.

## Público e personas
- P1: Anfitrião da festa. Cria a sala no celular ou na TV, quer que tudo comece em menos de um minuto e que ninguém fique esperando. Usa Wi-Fi de casa, TV com navegador ou notebook no HDMI.
- P2: Jogador casual no celular. Entra pelo QR, muitas vezes com um aparelho intermediário ou antigo, às vezes no 4G. Quer entender o jogo em segundos e não sentir atraso.
- P3: Jogador competitivo da Arena. Monta o próprio atleta, joga partidas 1x1 a 3x3 em tempo real e percebe qualquer atraso de entrada ou "teletransporte" de bonecos.
- P4: Espectador/TV. Tela grande que só mostra o jogo; precisa rodar liso por horas sem esquentar nem vazar memória.
- P5: Mantenedor (dono do repositório). Quer adicionar jogos e ajustar equilíbrio sem quebrar o que existe e com sinal claro dos testes.

## Escopo
### Dentro
- Desempenho de renderização 3D em todos os jogos, no tabuleiro e na Arena (inclui ajuste de qualidade conforme o aparelho).
- Latência percebida nos modos por polling (salas) e na Arena (WebRTC e reserva via servidor).
- Melhorias gráficas e de animação (efeitos de evento, transições entre fases, legibilidade das cenas).
- Áudio nos modos de sala (hoje só a Arena tem sons).
- Polimento de funcionalidades dos jogos e modos existentes, de baixo risco, já apontadas como limitação: entrada de jogador após o lobby, reconexão, indicadores de conexão (Q2).
- Ampliação dos testes (rede do cliente, componentes, cenários de ponta a ponta) e medição de desempenho repetível.

### Fora (explicitamente)
- Novos jogos, novos modos de jogo ou novos esportes da Arena (confirmado em Q2).
- Qualquer serviço ou plano pago: servidor dedicado/WebSocket, TURN pago, upgrade de plano da Vercel ou do Upstash (confirmado em Q3).
- Anticheat / validação de placar no servidor (limitação aceita no README).
- Contas de usuário, ranking global, monetização.
- Trocar a hospedagem (Vercel serverless + Redis) ou introduzir servidor de jogo dedicado.
- Aplicativo nativo; o produto continua no navegador.
- Rebalanceamento profundo da Arena (só correções pontuais).

## Requisitos funcionais
- RF1 [Must]: O sistema deve ajustar a qualidade gráfica (densidade de pixels, sombras, antisserrilhado) automaticamente conforme o desempenho medido no aparelho, sem o jogador precisar fazer nada.
- RF2 [Must]: O jogador deve poder escolher manualmente um modo "desempenho" (qualidade mínima) que persiste no aparelho entre sessões.
- RF3 [Must]: O sistema deve exibir, sob uma opção de diagnóstico, fps atual, tempo de quadro e latência da rede/sala.
- RF4 [Must]: Em cenas cujo conteúdo não mudou (lobby, resultados, telas paradas), o sistema não deve redesenhar o 3D continuamente.
- RF5 [Must]: Após uma ação do jogador, a TV e o celular do jogador da vez devem refletir a mudança em p95 ≤ 600 ms, e os demais celulares (desafio simultâneo, fora da vez) em p95 ≤ 1,2 s, conforme O2 e sujeito a Q10.
- RF6 [Must]: Ao perder e recuperar a conexão, o aparelho deve voltar ao estado atual da sala sem recarregar a página e mostrar o estado "reconectando" enquanto isso.
- RF7 [Should]: Os modos de sala devem tocar efeitos sonoros nos eventos principais (dado, ponto, erro, vitória, fim de turno), com botão de silenciar que persiste no aparelho.
- RF8 [Should]: Cada minigame e o tabuleiro devem ter animação de transição entre fases (intro → jogo → resultado) e efeito visual nos eventos principais.
- RF9 [Should]: Um jogador deve poder entrar numa sala já iniciada como espectador e passar a jogar no próximo minigame/rodada.
- RF10 [Should]: Na Arena, se o anfitrião fechar a tela, os jogadores devem ver mensagem clara do que aconteceu e a opção de voltar à sala.
- RF11 [Should]: O sistema deve respeitar a preferência do sistema de "reduzir movimento", trocando animações intensas por versões simples.
- RF12 [Could]: Vibração curta no celular em eventos de acerto/erro, quando o aparelho suportar, com opção de desligar.
- RF13 [Could]: Tela de carregamento com progresso ao abrir um jogo 3D, em vez de tela vazia.
- RF14 [Must]: O repositório deve ter testes automatizados para os módulos de rede do cliente (polling com 204/backoff, sincronização de relógio, troca de transporte da Arena).
- RF15 [Must]: O repositório deve ter teste de renderização de cada tela de jogo (TV e celular) que falha se a tela lançar erro ao montar.
- RF16 [Should]: O repositório deve ter ao menos um teste de ponta a ponta com vários clientes simulados: criar sala, entrar 3 jogadores, jogar um minigame até o resultado.
- RF17 [Should]: O repositório deve ter um roteiro de medição de desempenho repetível (cena, duração, métrica) cujo resultado pode ser comparado antes/depois de cada mudança.
- RF18 [Must]: O roteiro de medição (RF17) e o diagnóstico (RF3) devem cobrir as duas frentes de lag confirmadas em Q1: fps/tempo de quadro do 3D e atraso entre aparelhos (salas por polling e Arena), com linha de base registrada para cada uma antes das mudanças.
- RF19 [Must]: As mudanças de funcionalidade devem se limitar a jogos, modos e telas que já existem; nenhuma entrega pode adicionar jogo, modo de jogo ou esporte da Arena (Q2).

## Requisitos não funcionais
- RNF1 (desempenho): metas de O1 no aparelho de referência; na TV/notebook, ≥ 58 fps de mediana.
- RNF2 (memória): a TV rodando 2 h seguidas de partidas não cresce mais de 20 % de memória JS/GPU entre a 1ª e a última rodada (sem vazamento de geometrias/texturas).
- RNF3 (carga inicial): o primeiro jogo 3D abre em ≤ 4 s numa rede 4G simulada (Fast 4G do navegador); cada jogo carrega só o código dele.
- RNF4 (custo): o volume de requisições por jogador/minuto e de comandos no Redis não aumenta em relação a hoje; meta de reduzir em fases paradas. Deve continuar cabendo nos planos gratuitos da Vercel e do Upstash para uma festa de 8 pessoas. Restrição confirmada (Q3): custo de infraestrutura zero; nenhuma solução pode depender de plano pago, servidor dedicado ou TURN pago. O projeto não usa IA nem chave de API paga. As licenças das dependências novas e da fonte são conferidas (MIT/OFL ou equivalente permissiva) e listadas no PR que as introduz; não há ativos licenciados (o som é sintetizado).
- RNF5 (segurança): nenhuma mudança expõe ao cliente dados hoje filtrados pelas views (seed, gabaritos, frotas, palpites); os testes de views continuam passando.
- RNF6 (compatibilidade): funciona nos dois últimos anos de Chrome Android e Safari iOS e em navegador de Smart TV com WebGL; sem WebGL, mostra mensagem clara.
- RNF7 (acessibilidade): textos com contraste AA, áreas de toque ≥ 44 px, rótulos para leitores de tela nas cenas 3D (já existe `label` no palco), respeito a "reduzir movimento".
- RNF8 (bateria/temperatura): em modo desempenho, 20 min de jogo não devem forçar o navegador a reduzir a taxa de quadros por aquecimento no aparelho de referência.
- RNF9 (qualidade): a suíte de testes atual (≈239 casos em 13 arquivos) continua passando; lint, typecheck e build sem erro.

## Contexto existente
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind 4, three.js 0.186 + @react-three/fiber 9, Vitest 5. Sem bibliotecas auxiliares de 3D (sem drei), de áudio ou de animação.
- Hospedagem serverless na Vercel, estado em Redis (Upstash) com compare-and-swap ou memória local. Sem WebSocket: salas usam polling condicional (`lib/net/useRoom.ts`, 300 ms em minigame, 900–3000 ms nas demais fases) e "lazy tick" no servidor.
- Arena: simulação a 60 Hz no anfitrião, celulares conectados por WebRTC (TURN opcional) com reserva HTTP lenta; predição do próprio jogador e interpolação já existem.
- Renderização: `components/three/Stage3D.tsx` e `components/arena/rt/MatchScreen.tsx` ligam sempre sombras (mapa 1024), antisserrilhado e dpr até 1,75/1,6, sem ajuste por aparelho nem pausa de quadros. ~81 usos de `useFrame` em 27 componentes. Nenhum uso de instanciação ou liberação explícita de recursos (dispose) encontrado nos componentes.
- Áudio só na Arena (`components/arena/rt/sound.ts`); o README declara "não há áudio" nos modos de sala.
- Testes: 13 arquivos em `tests/`, todos de lógica (reducer, minigames, física, views, store, simulações da Arena). Nenhum teste de componente, de hooks de rede do cliente ou de ponta a ponta. O README diverge na contagem (150 e 234 testes).
- Restrições documentadas a respeitar: código de minigame do servidor não pode ser importado no cliente; `onTick` deve ser idempotente; mudanças só por relógio precisam versionar o estado; ações novas precisam entrar em `KNOWN`.
- `next.config.ts` vazio; sem CLAUDE.md nem configuração de CI no repositório.

## Premissas
- A1: Confirmado (Q1): o lag aparece tanto no 3D (fps) quanto no atraso entre aparelhos; os dois entram no escopo (RF18). Como o usuário não disse em quais jogos/modos é pior, supomos que afeta todos (tabuleiro, minigames de sala e Arena) e a linha de base (A5) define a prioridade. Se for concentrado em poucos jogos, o esforço pode ser focado neles.
- A2: Aparelho de referência = Android intermediário de ~3 anos (classe Galaxy A52/Moto G) em Chrome. Se o público usar aparelhos mais fracos, as metas de O1 ficam irreais.
- A3: Confirmado (Q3): a hospedagem continua Vercel + Upstash, só no plano gratuito (RNF4). Supomos que o TURN opcional da Arena, se usado, também é gratuito; sem TURN, parte das conexões entre redes diferentes cai na reserva HTTP, mais lenta (aceito, ver K8).
- A4: Confirmado (Q2): "melhorias de funcionalidades" significa só polir os jogos existentes, sem jogos ou modos novos (RF19). Tratamos a entrada como espectador (RF9) e a reconexão (RF6) como polimento do fluxo de sala existente, não como modo novo. Se o usuário entender RF9 como modo novo, ele sai do escopo.
- A5: Não há medição atual de fps/latência; a linha de base será medida no início. Sem ela, os objetivos não podem ser comparados.
- A6: O dono do repositório aceita adicionar dependências de desenvolvimento para testes (ambiente DOM, ponta a ponta). Se não, RF15/RF16 ficam mais caros.
- A7: Gráficos devem manter o estilo atual (low-poly colorido), não trocar por visual realista.

## Riscos
- K1: Melhorias gráficas e animações pioram o desempenho, indo contra O1. Prob. alta, impacto alto. Mitigação: todo efeito novo passa pelo ajuste de qualidade (RF1) e pela medição (RF17) antes de entrar.
- K2: Reduzir latência por polling aumenta requisições e estoura cotas gratuitas da Vercel/Upstash. Prob. média, impacto alto. Mitigação: RNF4 como limite; medir requisições por minuto antes/depois.
- K3: Sem testes de tela hoje, refatorações de renderização quebram jogos silenciosamente. Prob. alta, impacto médio. Mitigação: RF15 entra antes das mudanças de renderização.
- K4: Testar WebGL em ambiente automatizado é difícil (sem GPU no CI). Prob. alta, impacto médio. Mitigação: separar lógica de cena testável e aceitar teste de montagem com renderizador simulado.
- K5: Escopo amplo e vago ("muitas coisas") gera trabalho sem fim. Prob. alta, impacto alto. Mitigação: priorizar Must, entregar por fases com metas O1–O3 medidas.
- K6: Variedade de aparelhos e redes (Wi-Fi de visitante, 4G, Smart TV) torna metas difíceis de garantir. Prob. média, impacto médio. Mitigação: aparelho de referência fixo (A2) e indicador de diagnóstico (RF3).
- K7: Alterar o fluxo de entrada após o lobby (RF9) mexe no reducer e nas regras de equipes/votação. Prob. média, impacto médio. Mitigação: cobrir com testes de modos/equipes antes de mudar.
- K8: Com custo zero (Q3), a latência fica limitada pelo polling serverless e pela falta de TURN pago; O2/O3 podem não ser atingíveis em todas as redes (ex.: 4G sem conexão direta na Arena). Prob. média, impacto médio. Mitigação: medir a linha de base (RF18) cedo e, se necessário, renegociar as metas O2/O3 com o usuário, mantendo o custo zero.

## Perguntas em aberto
- Q1 [Respondida]: Lag nos dois (fps do 3D e atraso entre aparelhos). Convertida em A1 e RF18. Fica em aberto só a parte de quais jogos/modos, ver Q8.
- Q2 [Respondida]: Só polir os jogos existentes, sem jogos ou modos novos. Convertida em A4, RF19 e no escopo "Fora".
- Q3 [Respondida]: Só plano gratuito da Vercel e do Upstash. Convertida em A3, RNF4, K8 e no escopo "Fora".
- Q4 [Não bloqueante]: Quais aparelhos o grupo realmente usa? Há algum modelo onde o lag é pior?
- Q5 [Não bloqueante]: Há preferência de estilo para as novas animações/gráficos ou referências visuais?
- Q6 [Não bloqueante]: O áudio nos modos de sala deve tocar na TV, nos celulares ou nos dois?
- Q7 [Não bloqueante]: Há CI configurado fora do repositório (ex.: checks da Vercel) onde os testes devem rodar?
- Q8 [Não bloqueante]: Em quais jogos/modos o lag é pior (tabuleiro, algum minigame de sala, Arena)? Sem resposta, vale A1 (todos, priorizados pela linha de base).
- Q9 [Não bloqueante]: A entrada de jogador como espectador numa sala já iniciada (RF9) conta como polimento ou como modo novo? Sem resposta, vale A4 (polimento, fica no escopo).
- Q10 [Não bloqueante]: Para caber no plano gratuito, os celulares que não são da vez (desafio simultâneo, fora da vez) podem ter meta de p95 ≤ 1,2 s em vez de 600 ms, mantendo 600 ms na TV e no celular da vez? Sem resposta, valem as duas faixas de O2/RF5; se o usuário recusar, a meta de 600 ms para todos entra em conflito com RNF4 e será preciso renegociar uma das duas.

## Histórico de revisão
- Q1: respondida (lag em fps e em rede); A1 confirmada e ampliada, criado RF18, parte não respondida movida para Q8.
- Q2: respondida (só polir o existente); A4 confirmada, criado RF19, "Fora" passa a incluir modos novos, item de escopo "Dentro" reescrito; dúvida residual sobre RF9 registrada em Q9.
- Q3: respondida (só plano gratuito); A3 confirmada, RNF4 reforçado, "Fora" passa a excluir qualquer serviço pago, criado K8.
- JV1: O2 e RF5 reescritos com duas faixas medidas por papel de aparelho (p95 ≤ 600 ms na TV e no celular da vez; p95 ≤ 1,2 s nos demais celulares). A troca fica como decisão do usuário na nova Q10, não como premissa da arquitetura. O ajuste de T33/T44 cabe ao planejador.
- JC6: RNF4 ganhou as declarações de não usar IA nem chave de API paga e de licenças conferidas (dependências novas e fonte MIT/OFL, listadas no PR; som sintetizado, sem ativos licenciados).
