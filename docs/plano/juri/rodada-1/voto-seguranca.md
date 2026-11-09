# Voto: segurança e privacidade

Rodada: 1
Voto: APROVAR COM RESSALVAS
Confiança: média

## Evidências
- "02-arquitetura.md › Segurança e privacidade": autenticação por token em cabeçalho, comparação em tempo constante e ação por papel não mudam. O jogador em espera (D11) só recebe token de jogador e o reducer rejeita as ações dele (`activePlayers`). Isso mantém o controle de acesso atual. [OWASP A01:2025]
- RNF5, C7, T3, T66: `changedAt`, `status` e `hostAway` são públicos por natureza. O detector de eventos roda só sobre views já filtradas, e há teste anti-vazamento (`secrets`, `seed`, gabarito, frota) nos fixtures e em cada resposta do ponta a ponta. É uma boa salvaguarda. [LGPD art. 46]
- C6d, C11d, T42: `host_left` por `sendBeacon` leva o token no corpo (`auth`), aceito só para essa ação e só com papel `host`. A comparação é em tempo constante e o token não vai na URL. O abuso restante (marcar ausente o anfitrião de uma sala da qual o atacante já tem o token) é tolerável e se desfaz sozinho. Não há risco grave aqui. [OWASP A07:2025]
- "02-arquitetura.md › Segurança e privacidade" (última linha): "o único dado pessoal é o apelido, que expira com a sala em 6 h". O modelo de dados (`GameState`, TTL 6 h) confirma. A minimização é boa. Porém o plano não declara base legal nem aviso ao usuário, e o público de festa pode incluir menores. Nenhuma tarefa de T1 a T72 trata disso. [LGPD art. 6º] [LGPD art. 7º] [LGPD art. 14]
- "02-arquitetura.md › Infraestrutura e operação" (Observabilidade) e "Backup: não se aplica": usa logs de função da Vercel e Upstash, sem política de guarda de registros de acesso e sem plano de resposta a incidente. Nada em T1 a T72. [OWASP A09:2025] [LGPD art. 48]
- "02-arquitetura.md › Infraestrutura" (Orçamento de cota), KT5, KE5, RNF4: a cota gratuita do Upstash (500 mil comandos/mês) é o único limite. Não há tarefa de limite de taxa nem de criação de salas por origem. `POST /api/rooms` e `join` ficam abertos, e a entrada tardia (T60) aumenta a superfície de join. Uma pessoa mal-intencionada, ou uma varredura de códigos de 4 caracteres, esgota a cota e derruba o serviço (disponibilidade). Uma busca no repositório não achou nenhum limite de taxa nem cabeçalho de segurança (CSP). [OWASP A06:2025] [OWASP A02:2025]
- T2, T13 (Playwright dev) e C14 (CI): entram novas dependências de desenvolvimento (`jsdom`, `@testing-library/react`, `@react-three/test-renderer`) sem auditoria de dependências no CI. [OWASP A03:2025]
- C2, S10, T11: "Copiar relatório" exclui tokens (T11 testa `playerToken`), e o diagnóstico fica no aparelho, sem telemetria remota. Está correto. Falta só decidir se o código da sala entra no relatório (S10 o inclui). O código da sala dá acesso de espectador, então é um risco menor.

## Fundamentação normativa
- [LGPD art. 6º]: princípios de finalidade, necessidade e transparência. O plano minimiza (só apelido, TTL 6 h) mas não declara a finalidade nem informa o titular.
- [LGPD art. 7º]: exige base legal para tratar o apelido. O plano não a nomeia (provavelmente execução de contrato ou legítimo interesse). Falta registrar.
- [LGPD art. 14]: jogo de festa tem público possivelmente infantil. O dado é só um apelido, e o texto da base está marcado `conferir` no §1º. Não sustenta rejeição, mas pede decisão registrada e aviso claro.
- [LGPD art. 18]: o titular consegue apagar o apelido ao sair da sala e pelo TTL de 6 h. O plano não descreve isso nem como acessar e corrigir. Ressalva leve (a base marca `conferir`, citado sem inciso).
- [LGPD art. 46]: segurança desde a concepção. Atendida em parte (tokens, comparação em tempo constante, anti-vazamento). Faltam limite de taxa e cabeçalhos.
- [LGPD art. 48] e [Resolução CD/ANPD 15/2024]: comunicação de incidente em 3 dias úteis. O plano não tem resposta a incidente. O risco é baixo porque só há apelido temporário, mas continua sendo uma lacuna.
- [Marco Civil art. 15] (`conferir`): se o mantenedor operar como pessoa jurídica, há dever de guardar registros de acesso. O plano não diz nada. Fica como pergunta, não como achado.
- [OWASP A01:2025], [OWASP A07:2025]: atendidos no desenho atual, e o plano não os enfraquece.
- [OWASP A02:2025], [OWASP A06:2025]: faltam cabeçalhos de segurança e modelagem de abuso (esgotamento de cota).
- [OWASP A03:2025]: dependências novas sem auditoria automática.
- [OWASP A09:2025]: sem log de segurança nem alerta de cota.
- [OWASP A04:2025]: segredos (Redis, TURN) só em variáveis de ambiente do servidor, e o CI não precisa de segredo. Atendido.

## Riscos
- Esgotamento da cota gratuita por abuso (sem limite de taxa em criar sala e em `join`). O plano trata só o consumo legítimo (KT5, KE5). Efeito: negação de serviço da festa inteira.
- O plano não tem aviso de privacidade, base legal nem resposta a incidente. Probabilidade baixa e impacto baixo (só apelido, TTL 6 h), mas o `/play` aceita crianças.
- Eventuais XSS ou injeção via apelido renderizado em TV, `aria-live` (T52) e `label` do `Stage3D` (T63). O plano novo cria mais superfícies de renderização do apelido (pops, faixa "Vez de…", região `aria-live`). Não há tarefa de validação e escape do nome.
- O token de jogador fica no `localStorage` (sessão salva, C5). Qualquer XSS o expõe. Isso é consequência do desenho atual e sem CSP não há segunda linha de defesa.
- `/bench` fica acessível em produção (A-arq6). Baixo risco, só fixtures. É ferramenta de medição sem dados reais.

## Propostas de melhoria
| ID | Severidade | Responsável | Arquivo | Problema | Solução proposta | Como verificar |
|----|-----------|-------------|---------|----------|------------------|----------------|
| JS1 | condição | planejador | 04-plano.md | Sem limite de taxa em `POST /api/rooms`, `join` e rotas de ação. A cota gratuita do Upstash é o único freio, e a entrada tardia (T60) amplia a superfície. | Nova tarefa em F3 (~1 d): limite por origem (IP via cabeçalho da Vercel) para criar sala e `join`, teto de salas ativas e alerta ao passar de 60% da cota (já previsto em KE5). Usar o próprio Upstash (contador com TTL) para não pagar nada. Resposta `429` tratada no cliente. | Teste de rota: a N+1ª criação de sala em 1 min pela mesma origem recebe `429`; `netbench` de uma festa de 8 pessoas não é afetado; consumo adicional de comandos documentado no orçamento de cota. |
| JS2 | condição | arquiteto | 02-arquitetura.md | Seção de segurança não declara finalidade, base legal, nem aviso ao titular. O público pode incluir menores. | Acrescentar em "Segurança e privacidade": finalidade (identificar o jogador na sala), base legal escolhida, retenção (TTL 6 h), como o usuário apaga (sair da sala / expiração) e um aviso curto de privacidade na tela de entrada (S1/S2), com nota de que menores devem jogar com responsável. Se o projeto virar serviço público com operador identificável, consultar profissional jurídico. | Seção revisada cita [LGPD art. 7º] e a retenção; S2 mostra o aviso; teste de montagem confere o texto; "sair da sala" remove o jogador do estado. |
| JS3 | condição | planejador | 04-plano.md | Nenhuma tarefa valida o apelido nem garante o escape em novos pontos de renderização (pops, faixa de vez, `aria-live`, `label` 3D). | Nova tarefa em F1 ou F4: validar nome no servidor (tamanho máximo, caracteres de controle removidos) e garantir que todo texto de jogador vá como texto, nunca como HTML. Adicionar nos testes de montagem (T4/T5) um apelido com `<img onerror>` e verificar que não vira marcação. | Teste unitário do `join` rejeita ou normaliza nomes inválidos; teste de tela com apelido malicioso não cria nó HTML nem erro. |
| JS4 | condição | arquiteto | 02-arquitetura.md | Sem plano de resposta a incidente nem política de guarda e retenção de logs de acesso. | Adicionar em "Infraestrutura e operação": quem decide, como revogar tokens do Redis e rotacionar `Bearer` do Upstash, comunicação em 3 dias úteis à ANPD se houver vazamento relevante, e a guarda dos logs de função da Vercel como são (sem criar log novo com dados pessoais). Registrar que, se o mantenedor operar como pessoa jurídica, conferir o dever de guarda de registros de acesso. | Documento `docs/SEGURANCA.md` com o roteiro de incidente de 1 página e o responsável nomeado; revisão por quem opera o projeto. |
| JS5 | sugestão | planejador | 04-plano.md | CI (T1) não audita dependências, e o plano adiciona dependências de dev. Também não há cabeçalhos de segurança em `next.config.ts`. | Em T1, adicionar `npm audit --omit=dev --audit-level=high` e Dependabot/Renovate. Nova tarefa pequena (0,5 d): cabeçalhos básicos (CSP compatível com three.js e WebRTC, `X-Content-Type-Options`, `Referrer-Policy`) em `next.config.ts`, testados com o build. | CI falha com dependência vulnerável de alta gravidade (verificar com versão antiga proposital); resposta HTTP do preview mostra os cabeçalhos; o jogo 3D e a Arena continuam abrindo. |
| JS6 | sugestão | arquiteto | 02-arquitetura.md | O relatório de diagnóstico inclui o código da sala (S10), que dá acesso de espectador. `/bench` fica em produção. | Remover o código do relatório copiado (ou mascarar) e manter `/bench` fora do build de produção ou atrás de variável de ambiente. | Teste de T11 também falha se o relatório contiver o código; `/bench` retorna 404 em produção se a variável não estiver ligada. |

## O que mudaria meu voto
- Para APROVAR: JS1 a JS4 aplicados e visíveis no plano (tarefas, seção de segurança e critério de aceite).
- Para REJEITAR: evidência de que o apelido ou o token vaza para o cliente de outros jogadores (violação de RNF5) ou que o mantenedor opera como serviço público com crianças sem nenhum aviso. Nada disso está no plano hoje.

— Dra. Helena Prado, jurado(a) de segurança e privacidade
