# Design

> Base: `00-ideia.md`, `01-analise.md` e o código atual do party-deck (`app/globals.css`, `components/ui.tsx`, `app/page.tsx`, `app/play/page.tsx`, `components/HostScreen.tsx`, `components/three/*`, `components/arena/rt/*`).
> Escopo de design: **polir telas que já existem** (RF19). Nenhuma tela de jogo, modo ou esporte novo. As telas novas abaixo são camadas transversais (ajustes, diagnóstico, reconexão, carregamento, espectador tardio) sobre o fluxo atual.

## Princípios

1. **A festa não espera.** Nenhum toque fica sem resposta. O aparelho responde ao próprio toque no mesmo quadro (som curto, brilho, "enviado ✓"), mesmo que a confirmação do servidor demore. Esperar pela rede só aparece quando é real, e sempre com um texto que diz o que está acontecendo.
2. **Fluidez antes de enfeite.** Todo efeito novo (partículas, confete, tremor de câmera) tem versão "desempenho" e "reduzir movimento", e entra só se couber na meta de quadros (O1, K1). Na dúvida, um efeito 2D por cima do canvas é melhor que um efeito 3D a mais.
3. **Funciona sozinho, ajusta quem quiser.** A qualidade se ajusta sem perguntar (RF1). Ajustes (desempenho, som, vibração, diagnóstico) ficam num lugar só, iguais em todas as telas, e são lembrados no aparelho.
4. **Diga o que aconteceu e o que fazer.** Conexão caiu, anfitrião saiu, sala já começou, sem WebGL: sempre uma frase do que houve + uma ação ("Tentar agora", "Voltar à sala", "Assistir e entrar na próxima").
5. **Mesmo jeito de sempre.** Tema escuro único, tokens de `globals.css`, `Panel`/`Button`/`PlayerChip`, emojis como ícones e o "pop" da Arena. Nada de visual realista (A7).

## Jornadas

- **J1 Anfitrião monta a festa com TV (P1)**
  1. Abre `/` no notebook/TV → "Abrir tela grande" → lobby da TV (S4) com QR.
  2. Amigos escaneiam; cada entrada aparece com "pop" e um som curto na TV (RF7).
  3. Escolhe modo e começa. Transição de fase (UI7) leva à votação e depois ao tabuleiro (S5).
  4. Ao longo da partida a TV fica parada nas telas de lobby/resultado sem esquentar (RF4).
  - Atritos: som só toca depois de um toque na página (regra do navegador) → a TV mostra o chip "🔈 Toque para ligar o som" (UI10) até o primeiro clique. TV com controle remoto: foco visível e navegação por setas nos botões.

- **J2 Jogador casual entra e joga num celular fraco (P2)**
  1. Escaneia o QR → `/play?c=ABCD` com o código preenchido (S2) → digita o nome → "Entrar".
  2. Espera no lobby (S4). Vê o próprio chip, o chip de conexão (UI3) em verde.
  3. Votação → tabuleiro (S5): toca "ROLAR O DADO", ouve o dado, sente uma vibração curta (RF12).
  4. Intro do minigame (S6): lê o "Como jogar" enquanto a barra de carregamento enche (RF13); "Pronto ✓" quando o 3D carregou.
  5. Joga (S7). O aparelho mede quadros e baixa a qualidade sozinho se precisar (RF1); um aviso discreto "Qualidade ajustada para manter o jogo liso" aparece uma vez (UI2).
  6. Resultado (S8) com animação de pódio e som de vitória/derrota.
  - Atritos: aparelho muito fraco continua travando → o aviso de qualidade oferece "Usar modo desempenho" (RF2) direto, sem ir aos ajustes. 4G: o chip de conexão fica amarelo e explica.

- **J3 Perde a conexão no meio do minigame (P2)**
  1. Wi-Fi oscila. Após a 1ª falha nada muda; a partir da 3ª tentativa (hoje `retries > 2`) aparece o banner "Reconectando…" (UI4) no topo, sem tirar o jogo da tela.
  2. Nos desafios simultâneos o jogo local continua; nas ações por turno (dado, voto, compra de estrela) o botão mostra "aguardando conexão" e fica desabilitado.
  3. Volta a rede: banner verde "De volta!" por 1,5 s e a tela salta direto para a fase atual da sala, sem recarregar (RF6). Se a fase mudou, a transição (UI7) roda em versão curta.
  4. Se ficar mais de 15 s sem rede: banner vira "Sem conexão. Confira o Wi-Fi." + botão "Tentar agora".
  - Atrito: se a pessoa recarregar a página, a sessão salva a devolve à sala (comportamento atual mantido).

- **J4 Chega atrasado na festa (P2)**
  1. Escaneia o QR de uma sala que já está no tabuleiro.
  2. Em vez do erro atual "a partida já começou", vê S2 no estado "sala em andamento": "A partida já começou. Entre como espectador e jogue a partir da próxima rodada." + "Entrar assistindo".
  3. Vê S9 (espectador): o tabuleiro/minigame atual ao vivo, sem controles, e um selo "Você entra no próximo minigame".
  4. Quando a fase vira a próxima rodada, aviso "Sua vez de entrar! 🎉" com som e vibração; a tela vira o controle normal.
  - Atritos: sala cheia (8) → "A sala está cheia; dá para assistir" (sem entrar depois). Modo equipes → o selo diz em que time vai entrar (decisão de regra fica com a análise/arquitetura; ver A-des4).

- **J5 Partida da Arena e o anfitrião fecha a tela (P3)**
  1. Na partida (S11) vê placar, chip de conexão com ms e rota, joystick e botões.
  2. Abre ⚙ (UI1) → liga "Mostrar diagnóstico" → vê fps, ms de quadro, ping e % de retratos atrasados (RF3).
  3. O anfitrião fecha a aba. Em poucos segundos sem retratos aparece S12: "O anfitrião saiu e a partida parou." + "Voltar à sala" (RF10).
  - Atrito: confundir queda própria com saída do anfitrião → a mensagem distingue "Você perdeu a conexão" (UI4) de "O anfitrião saiu" (S12) (A-des3).

- **J6 TV ligada a noite toda (P4)**
  1. `/tv?c=ABCD` em Smart TV. Chip "assistindo" no topo.
  2. Entre rodadas, cenas paradas não redesenham o 3D (RF4); a TV mantém o último quadro.
  3. Sem WebGL: S13 em vez de tela preta.
  - Atrito: TV fraca → qualidade automática desce; a TV nunca mostra o aviso UI2 em loop (no máx. 1 vez por sessão).

- **J7 Grupo reclama de lag e o anfitrião investiga (P1)**
  1. ⚙ → "Mostrar diagnóstico" (S10) no celular que trava.
  2. Lê "22 fps · 45 ms · sala 900 ms · qualidade: baixa". Toca "Copiar relatório" e cola no grupo/issue.
  3. Liga "Modo desempenho" e vê o fps subir.

- **J8 Mantenedor mexe num jogo sem medo (P5)** — experiência do desenvolvedor (S14)
  1. Antes de mexer, roda o roteiro de medição da cena e guarda a linha de base (RF17/RF18).
  2. Muda o código; roda `npm test`. Se uma tela de jogo quebrar ao montar, o teste diz qual jogo, qual papel (TV/celular) e a mensagem de erro (RF15).
  3. Roda a medição de novo e compara: a saída mostra antes/depois e Δ por métrica, marcando o que piorou.
  - Atrito: WebGL não existe no CI (K4) → mensagens de teste dizem claramente "renderizador simulado" para ninguém achar que o teste mede quadros.

## Mapa de telas

```mermaid
flowchart TD
  S1[S1 Início /] -->|Criar e jogar aqui| S4
  S1 -->|Abrir tela grande| S4
  S1 -->|Entrar numa sala| S2
  S1 -->|Arena| S11a[Arena: lobby e vestiário - existente]
  QR((QR / link)) --> S2[S2 Entrar na sala]
  S2 -->|lobby| S4[S4 Lobby celular/TV]
  S2 -->|sala em andamento| S9[S9 Espectador aguardando]
  S9 -->|próxima rodada| S7
  S4 --> V[Votação - existente]
  V --> S5[S5 Tabuleiro]
  S5 --> S6[S6 Intro do minigame + carregamento]
  S6 --> S7[S7 Minigame em jogo]
  S7 --> S8[S8 Resultado / Fim de jogo]
  S8 -->|próximo turno| S5
  S8 -->|Revanche / Voltar ao lobby| S4
  S11a --> S11[S11 Partida da Arena]
  S11 -->|anfitrião saiu| S12[S12 Anfitrião saiu]
  S12 -->|Voltar à sala| S11a
  S11 -->|fim| S11a
  TVL[/tv?c=] --> S4
  subgraph Camadas em qualquer tela
    S3[S3 Ajustes ⚙]
    S10[S10 Diagnóstico]
    UI4[UI4 Banner de reconexão]
    S13[S13 Sem WebGL]
  end
  S3 --> S10
  S14[S14 DX: testes e medição]:::dev
  classDef dev stroke-dasharray: 4 4
```

## Telas

### S1 Início (`/`) — existente
- Objetivo: criar sala, entrar ou abrir TV. Requisitos: suporte a RF2/RF7/RF12 via ⚙.
- Mudanças: botão ⚙ (UI1) no canto superior direito para ajustes antes de jogar; no cartão "Arena" corrigir o texto para incluir Beisebol (hoje diz só Basquete e Vôlei). Se o navegador não tiver WebGL, mostrar aviso S13 em linha acima dos cartões (dá para criar a sala, mas o aparelho não mostrará o 3D).
- Estados: vazio = atual; carregando = botão com "Criando…" e spinner (hoje só desabilita); erro = alerta atual (`role="alert"`); sucesso = navega.

### S2 Entrar na sala (`/play` sem sessão, e `/arena/play`) — existente, ampliada
- Objetivo: entrar pelo QR em ≤ 10 s. RF9.
- Elementos: código (4 caracteres, pré-preenchido pelo QR), nome, "Entrar". Foco automático no nome quando o código já veio no link.
- Estados:
  - vazio: botão desabilitado até código com 4 caracteres e nome.
  - carregando: "Entrando…" no botão.
  - erro "sala não existe": "Não achamos a sala ABCD. Confira o código com quem criou."
  - **sala em andamento (novo, RF9)**: painel com "A partida já começou." / "Entre assistindo e jogue a partir do próximo minigame." / botão gold "Entrar assistindo".
  - sala cheia: "A sala está cheia (8). Você pode assistir." / "Assistir" (sem promessa de entrar).
  - sucesso: vai para S4 ou S9.

```
┌──────────────────────────────┐
│        Entrar na sala        │
│  Código   [ A B C D ]        │
│  Seu nome [ Ana          ]   │
│ ┌──────────────────────────┐ │
│ │ ⏱ A partida já começou.  │ │
│ │ Entre assistindo e jogue │ │
│ │ a partir do próximo jogo.│ │
│ │ [  Entrar assistindo  ]  │ │
│ └──────────────────────────┘ │
└──────────────────────────────┘
```

### S3 Ajustes (folha sobreposta, aberta pelo ⚙) — nova camada
- Objetivo: um único lugar para RF2, RF3, RF7, RF11, RF12. Tudo salvo no aparelho.
- Elementos (em ordem):
  1. **Gráficos**: controle segmentado "Automático" (padrão) | "Desempenho". Abaixo, texto vivo: "Agora: qualidade média (ajustada automaticamente)". (RF1, RF2)
  2. **Som**: interruptor "Efeitos sonoros" (RF7). Na Arena reaproveita o mesmo estado do 🔊 atual.
  3. **Vibração**: interruptor, oculto se o aparelho não suporta (RF12).
  4. **Movimento**: texto informativo "Seu aparelho pede menos movimento — animações simplificadas" quando a preferência do sistema está ativa; interruptor "Reduzir animações" para quem quiser forçar (RF11).
  5. **Diagnóstico**: interruptor "Mostrar diagnóstico" (RF3) + "Copiar relatório".
  6. Rodapé: "Ajustes valem só neste aparelho."
- Estados: carregando não se aplica (local); erro: se o armazenamento local falhar, "Não deu para salvar neste navegador; vale só até fechar a aba." Sucesso: troca imediata, sem botão "Salvar".
- Celular: folha de baixo para cima, altura ≤ 70 %, fecha com ✕, toque fora ou voltar do navegador. TV/desktop: painel lateral direito de 360 px; foco preso na folha, `Esc` fecha.

```
┌──────────── Ajustes ───────── ✕ ┐
│ Gráficos                         │
│ [ Automático ][ Desempenho ]     │
│ Agora: qualidade média           │
│ Efeitos sonoros          (●  )   │
│ Vibração                 (●  )   │
│ Reduzir animações        (  ○)   │
│ Mostrar diagnóstico      (  ○)   │
│ [ Copiar relatório ]             │
│ Ajustes valem só neste aparelho. │
└──────────────────────────────────┘
```

### S4 Lobby (celular `/play`, TV `/host` e `/tv`) — existente
- RF4, RF7, RF6.
- Mudanças: o chip de conexão (UI3) substitui o texto "reconectando…" solto no topo; entrada de jogador toca som curto na TV; ⚙ no cabeçalho. Lobby é cena parada: sem 3D contínuo (só CSS "pop"). Espectadores aguardando (de S9) aparecem numa linha "Assistindo: 😎 Bia" abaixo da lista.
- Áreas de toque: "remover" e "sair da sala" passam a ter ≥ 44 px de altura (hoje são texto pequeno).
- Estados: vazio "Ninguém entrou ainda. Escaneie o QR." (atual); carregando "Entrando na sala ABCD…" com esqueleto da lista; erro → UI4/alerta; sucesso → lista com "pop".

### S5 Tabuleiro (celular e TV) — existente
- RF1, RF4, RF5, RF7, RF8, RF12.
- Eventos com retorno (O5): dado rolando (som de chocalho + quique), número tirado (pop dourado), casa azul/vermelha (+/− moedas flutuando na cor da casa), estrela (fanfarra + brilho), Hora da Sorte, troca de turno (faixa "Vez de 🐸 Rui" deslizando + som curto; vibração só no celular de quem é a vez).
- Ação própria ("ROLAR O DADO", "Comprar ⭐"): o botão afunda e mostra "enviado ✓" imediatamente; o dado 3D começa a girar localmente e para no número quando o servidor responder (A-des2).
- Fora do próprio turno a cena só anima quando algo muda (peão andando, dado); parada, congela (RF4).
- Estados: carregando = UI6 no lugar do canvas; erro de ação = alerta atual; reconectando = UI4; sucesso = fluxo atual.

### S6 Intro do minigame + carregamento — existente, ampliada
- RF8, RF13, RNF3.
- O "Como jogar" (já existente) vira também a tela de carregamento: abaixo dele, barra UI6 "Carregando o jogo… 60 %" que vira "Pronto ✓". Se a contagem acabar antes de carregar, a barra continua visível sobre o canvas vazio até o 3D aparecer.
- Transição de entrada: cortina UI7 com o ícone e a cor do jogo; contagem "3 · 2 · 1 · JÁ!" grande com som (beep, beep, beep, apito).
- Estados: carregando = barra; erro de carga ("Não deu para abrir o jogo. Tentar de novo") com botão; sucesso = "Pronto ✓".

```
┌──────────────────────────────┐
│ PREPARE-SE · começa em 4     │
│ ┌──────────────────────────┐ │
│ │ 🏀 Basquete 3D           │ │
│ │ Faça mais cestas em 1min │ │
│ │ 1. 👆 deslize para cima  │ │
│ │ 2. 🟩 solte na faixa verde│ │
│ └──────────────────────────┘ │
│ ▓▓▓▓▓▓▓▓▓░░░░  Carregando 70%│
└──────────────────────────────┘
```

### S7 Minigame em jogo (13 telas existentes, celular e TV)
- RF1, RF4, RF5, RF7, RF8, RF11, RF12, RF15.
- Padrão comum a todos: HUD 2D por cima do canvas (placar com números tabulares, `TimeBar`, botão "?" já existente com 44 px), pop de evento UI8, som e vibração conforme a tabela abaixo. O botão ⚙ fica no cabeçalho de `/play`, não sobre o canvas, para não competir com gestos.
- **Lista de eventos por jogo (O5)** — cada linha vira um item verificável:

| Jogo | Ponto/acerto | Erro | Evento especial | Fim |
|---|---|---|---|---|
| Tabuleiro | moedas +N (som de moeda) | moedas −N (som grave) | estrela, Hora da Sorte, troca de turno | vencedor + confete |
| 🏓 Ping-pong / 🎾 Tênis / 🏐 Vôlei | ponto: pop "PONTO!" + som de quique final | bola fora/rede: pop "FORA"/"REDE" | "AGORA!" com tique sonoro; jogada forte com rastro | set/partida |
| ⚽ Pênaltis | "GOL!" + rede balançando | "DEFENDEU!"/"PRA FORA" | troca batedor ↔ goleiro (faixa) | resultado |
| 🏀 Basquete | cesta (swish) | aro (som de aro) | bola de ouro, "EM CHAMAS" | buzina |
| ⛳ Minigolfe | bola no buraco | bate no obstáculo | hole-in-one | último buraco |
| 🏃 Corrida | moeda | batida (tremor curto) | ultrapassagem | linha de chegada |
| 🐔 Pega Galinha | pegou (cacarejo) | — | dourada (+3) | apito |
| 👻 Fuja do Fantasma | moeda | perdeu vida (flash vermelho) | fantasma novo a cada 12 s | última vida/fim |
| 🚢 Batalha Naval | acertou (explosão) | água (splash) | afundou navio | frota afundada |
| 💣 Tanques | acerto | errou | vento mudou | último tanque |
| ❓ Quiz Buzz | resposta certa | errada | buzz (púlpito acende) | placar |
| 🎯 Chute Certo | mais perto | longe | revelação | placar |

- Em "Desempenho" e "Reduzir movimento": partículas viram pop 2D simples, sem tremor de câmera, sem rastro.
- Estados: carregando = UI6; erro de montagem = cartão "Este jogo travou neste aparelho. Recarregar o jogo" (sem derrubar a sala); reconectando = UI4; sucesso = jogo.

### S8 Resultado do minigame / Fim de jogo — existente
- RF4, RF7, RF8.
- Resultado: pódio revelado de baixo para cima (3º, 2º, 1º) com som crescente; no celular, a própria colocação grande (atual) + vibração de vitória. Fim de jogo: troféu + confete low-poly curto (≤ 2 s), depois cena parada.
- Depois da animação de entrada, o 3D congela (RF4).
- Estados: sucesso = atual; reconectando = UI4; vazio (sem resultado ainda) = "Contando os pontos…".

### S9 Espectador aguardando (celular) — nova variação de `/play`
- RF9.
- Mostra a cena atual em modo TV (sem controles), selo UI9 "👀 Assistindo · você entra no próximo minigame", lista de jogadores. Quando a rodada vira: aviso cheio "Sua vez de entrar! 🎉" (som + vibração) por 2 s e passa ao controle normal.
- Estados: carregando = "Entrando como espectador…"; erro (sala acabou) = "A partida terminou. Criar outra sala?" → S1; sucesso = selo trocado por chip normal.

### S10 Diagnóstico (sobreposição) — nova camada
- RF3, RF18.
- Faixa compacta fixa no canto superior esquerdo, fonte tabular, fundo `ink/80`, não interativa (exceto tocar para expandir).
  - Salas: `48 fps · 21 ms (p95 33) · sala 410 ms · qualidade: média`
  - Arena: `57 fps · 17 ms · ping 28 ms · atrasados 0,4 % · ⚡ mesmo Wi-Fi`
- Expandida: últimos 60 s em mini-gráfico de barras, nível de qualidade atual, intervalo de atualização da sala, "Copiar relatório" (texto simples com aparelho/navegador, métricas e código da sala — sem tokens).
- Cores: verde dentro da meta (O1/O2/O3), amarelo perto, vermelho fora.
- Estados: "medindo…" nos primeiros 3 s; "sem dados de rede" quando offline.

```
┌───────────────────────────────────────────┐
│ 48 fps · 21 ms (p95 33) · sala 410 ms · ● │
└───────────────────────────────────────────┘
```

### S11 Partida da Arena (`MatchScreen`, `TvMatch`) — existente
- RF1, RF2, RF3, RF12.
- Mudanças: o grupo de botões do topo (⛶, 🔊, ✕ sair) ganha ⚙ e passa a ter alvos de 44 px (hoje ~24 px); o chip de conexão existente (`LinkChip`) vira a base de UI3. Feedback/banner da Arena ficam como estão (já são o padrão "pop").
- Estados: conectando = "Conectando no anfitrião…" (atual); reserva lenta = aviso atual; anfitrião saiu = S12; sucesso = partida.

### S12 Anfitrião saiu (Arena) — nova
- RF10.
- Sobreposição escura sobre a partida congelada: "📡 O anfitrião saiu e a partida parou." / "Quem estava rodando a partida fechou a tela ou perdeu a conexão." / botões "Voltar à sala" (gold) e "Esperar mais um pouco" (ghost, volta a tentar por 20 s).
- Distinção obrigatória da queda própria: se o próprio aparelho está sem rede, mostra UI4, não S12.
- Estados: esperando = contador "tentando de novo… 12 s"; sucesso (anfitrião voltou) = some e a partida segue.

```
┌──────────────────────────────────┐
│   📡 O anfitrião saiu            │
│   e a partida parou.             │
│ Quem rodava a partida fechou a   │
│ tela ou perdeu a conexão.        │
│ [   Voltar à sala   ] (gold)     │
│ [ Esperar mais um pouco ]        │
└──────────────────────────────────┘
```

### S13 Sem WebGL — nova (RNF6)
- Painel no lugar do canvas: "😕 Este navegador não mostra 3D." / "Tente o Chrome ou o Safari atualizados. Você ainda pode jogar pelo celular." No celular de jogador, os botões do controle continuam funcionando quando o jogo permite.

### S14 Experiência do desenvolvedor (testes e medição) — sem interface gráfica
- RF14, RF15, RF16, RF17, RF18, O4.
- **Comandos**: os atuais (`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`) continuam sendo a porta de entrada; o roteiro de medição tem um comando próprio e documentado no README (nome final com a arquitetura, A-des6).
- **Mensagens de falha de teste de tela** (RF15) dizem: jogo, papel e erro. Ex.: `Tela de "basket" (celular) lançou erro ao montar: Cannot read 'score' of undefined`.
- **Teste de vários clientes** (RF16): o relatório narra os passos ("sala criada → 3 jogadores → minigame → resultado") e, na falha, diz em qual passo e qual cliente.
- **Saída da medição** (RF17/RF18): tabela fixa, comparável:

```
Cena: basket (celular, aparelho de referência)  Duração: 60 s
Métrica            Linha de base   Agora    Δ      Meta
fps mediana        41              53       +12    ≥ 50  ✓
quadro p95 (ms)    48              31       −17    ≤ 33  ✓
sala p95 (ms)      1120            560      −560   ≤ 600 ✓
reqs/jogador/min   200             180      −20    ≤ base ✓
```
- README: seção "Medir antes de mexer" com cena, duração, como rodar e onde registrar a linha de base; contagem de testes no README passa a ser única e verdadeira.
- Estados: sem linha de base registrada → aviso "Sem linha de base para esta cena; esta medição vira a base."

## Componentes de interface

- **UI1 Botão de ajustes ⚙**: abre S3. Variações: cabeçalho (S1, S4–S9 em `/play`, TopBar da TV) e sobre canvas (S11, fundo `black/50`). 44 × 44 px, `aria-label="Ajustes"`.
- **UI2 Aviso de qualidade ajustada**: toast inferior, 1× por sessão: "Baixamos a qualidade para o jogo ficar liso." + "Usar modo desempenho" / "OK". Some em 6 s. Onde: S5–S7, S11.
- **UI3 Chip de conexão**: estende o `LinkChip` da Arena para as salas. Variações: verde "conectado", amarelo "lento" (sala > 600 ms ou ping > 120 ms), vermelho "reconectando". Na Arena mantém rota (mesmo Wi-Fi / internet / TURN / reserva). Onde: cabeçalho de `/play`, TopBar da TV, S11.
- **UI4 Banner de reconexão**: faixa fixa no topo, `role="status"`, `aria-live="polite"`. Variações: âmbar "Reconectando…" (com spinner), vermelho "Sem conexão. Confira o Wi-Fi." + "Tentar agora", verde "De volta!" (1,5 s). Não cobre os controles do jogo. Onde: todas as telas de sala e Arena.
- **UI5 Botão com confirmação imediata**: `Button` atual + estados "enviado ✓" (instantâneo, local) e "aguardando conexão" (desabilitado durante UI4). Onde: dado, comprar estrela, continuar, votar, pronto (Arena).
- **UI6 Carregamento 3D com progresso**: barra `brand` sobre `surface-2`, texto "Carregando o jogo… N %", vira "Pronto ✓". Variação sem porcentagem (indeterminada) quando o progresso não é conhecido (A-des5). Onde: S6, canvas de S5/S7/S11.
- **UI7 Transição de fase**: cortina diagonal com cor do jogo/fase e ícone, 400 ms; contagem 3-2-1. Variação "reduzir movimento": esmaecimento de 150 ms sem cortina; variação "curta" após reconexão: 150 ms. Onde: lobby→votação→tabuleiro→intro→jogo→resultado.
- **UI8 Pop de evento**: generaliza o `arena-pop` para as salas: texto curto em itálico pesado com contorno, cor por tom (good/bad/gold). Variação "grande" para eventos do próprio jogador. Onde: S5, S7, S8 (Arena já usa).
- **UI9 Selo de espectador**: pílula "👀 Assistindo · entra no próximo minigame". Onde: S9, lista do lobby/TV.
- **UI10 Chip "toque para ligar o som"**: na TV, até a primeira interação (bloqueio de áudio do navegador). Some depois.
- **UI11 Faixa de diagnóstico**: S10. Variações compacta/expandida; salas/Arena.
- **UI12 Folha de ajustes**: contêiner de S3; folha inferior no celular, painel lateral na TV.

## Linguagem visual

**Seguir o padrão existente** (`app/globals.css`, `components/ui.tsx`). Tema escuro único, sem modo claro.

- **Tipografia**: Geist Sans (`--font-display`); títulos `font-black`; números sempre com `.nums` (tabular). Pop de evento em itálico `font-black` com contorno preto (padrão Arena).
- **Cores (tokens atuais)**: `--color-ink #07060f`, `--color-surface #141129`, `--color-surface-2 #1f1b3d`, `--color-line #332c5e`, `--color-text #f4f1ff`, `--color-muted #a39cc8`, `--color-brand #8b5cf6`, `--color-gold #fbbf24`, `--color-good #34d399`, `--color-bad #fb7185`, cores das casas `--color-tile-*`.
- **Tokens novos propostos** (mínimos):
  - `--color-warn: #f59e0b` — reconectando, conexão lenta, "perto da meta" no diagnóstico (hoje a Arena usa `amber-*` solto).
  - `--dur-fast: 150ms`, `--dur-base: 220ms` (= `.pop` atual), `--dur-phase: 400ms`; curva de "salto" já usada: `cubic-bezier(0.2, 0.9, 0.3, 1.2)`.
  - Camadas: canvas < HUD (10) < pop/banner (30) < UI4 (40) < folha de ajustes/S12 (50).
- **Arena**: mantém seu subestilo "anime" (fundo `#0b1020`, `amber`, `slate`), já estabelecido; telas novas da Arena (S12) seguem esse subestilo.
- **3D**: low-poly colorido atual (A7). Efeitos novos são formas simples (confete em quads, brilho em sprite), nunca texturas realistas.
- **Som**: mesmo estilo sintetizado e curto da Arena (≤ 0,7 s, volume moderado); um timbre por tipo de evento, igual em todos os jogos (ponto = agudo subindo, erro = grave descendo, vitória = acorde).
- **Espaçamento**: `Panel` `p-4`, cantos `rounded-2xl`/`rounded-xl`, `gap-3`/`gap-4`; celular `max-w-md`, TV `max-w-7xl`.
- **Tom de voz**: português do Brasil, "você", frases curtas e animadas, sem jargão ("conexão", não "WebRTC"; "qualidade", não "dpr"). O diagnóstico pode usar fps/ms porque é opcional e para quem pediu.

## Acessibilidade

- **Contraste (AA)**: `text` e `muted` sobre `surface`/`ink` passam (muted ≈ 7:1). Revisar textos `text-white/60` e `text-[9px]/[10px]` da Arena (Hud, LinkChip): subir para ≥ 11 px e opacidade ≥ 80 %. `--color-warn` só com texto `ink` por cima ou como texto sobre fundo escuro.
- **Toque**: alvos ≥ 44 × 44 px (RNF7). Corrigir os que estão abaixo hoje: "?" (`size-10` = 40 px), ⛶/🔊/✕ da Arena, "remover", "✕" do lobby da Arena, "sair da sala".
- **Teclado/controle remoto (TV)**: todo controle da TV e de S3 alcançável por Tab/setas, foco visível (anel `brand` 2 px), `Esc` fecha folhas e sobreposições, foco volta ao ⚙ ao fechar.
- **Leitor de tela**: manter `label` do `Stage3D` e atualizá-lo com o estado ("Tabuleiro, vez de Rui, dado tirou 4"); eventos importantes (ponto, vez, vitória) anunciados por uma região `aria-live="polite"` resumida (não a cada quadro); UI4 com `role="status"`; S12 e erros com `role="alert"`. Interruptores de S3 com `role="switch"` e `aria-checked`.
- **Idioma**: `lang="pt-BR"` no documento; números e tempos no formato brasileiro (vírgula decimal no diagnóstico).
- **Movimento reduzido (RF11)**: além do CSS global já existente, as cenas 3D respeitam a preferência: sem tremor de câmera, sem confete, dado mostra o número com esmaecimento curto, transições UI7 viram esmaecimento. O interruptor de S3 permite ativar mesmo sem a preferência do sistema.
- **Som e vibração**: nunca são a única pista — todo evento sonoro tem par visual (UI8). Vibração desligável (RF12).
- **Cor**: times vermelho/azul/ciano sempre com nome ou ícone junto (já ocorre em `TeamBadge`); verde/vermelho do diagnóstico acompanhados de ✓/!.

## Responsividade e plataformas

- **Celular retrato (principal para salas)**: coluna única `max-w-md`; canvas do tabuleiro `44vh` (atual); ⚙ e chip de conexão no cabeçalho; folha de ajustes inferior. Respeitar áreas seguras (notch) nos banners fixos.
- **Celular paisagem (Arena)**: mantém `MatchScreen` em tela cheia; S10 e UI4 encolhem para uma linha e ficam acima do placar, sem cobrir joystick/botões.
- **TV / notebook HDMI**: `max-w-7xl`, textos maiores (código `text-6xl`), leitura a 3 m: pops e faixas de vez em ≥ 32 px. Controle remoto/teclado (ver Acessibilidade). Painel lateral para S3.
- **Smart TV fraca**: começa já em qualidade média/baixa se a medição inicial for ruim (RF1); UI2 no máximo 1× por sessão.
- **Navegadores**: Chrome Android e Safari iOS dos últimos 2 anos, navegador de Smart TV com WebGL; sem WebGL → S13 (RNF6). No iOS, vibração não existe → o interruptor some.
- **Rede**: Wi-Fi e 4G; o chip de conexão explica a diferença; sem rede → UI4.

## Premissas de design

- **A-des1**: O cliente consegue saber o desempenho do aparelho (fps/tempo de quadro) e mudar a qualidade sem recarregar a cena; se exigir recarga, a troca manual em S3 mostra "aplicando…" e reabre a cena.
- **A-des2**: Ações por turno (dado, compra) podem ter retorno local imediato antes da confirmação do servidor sem revelar dados secretos (RNF5). Se o número do dado só existir no servidor, o dado gira localmente até a resposta.
- **A-des3**: O cliente da Arena consegue distinguir "anfitrião sumiu" de "eu perdi a rede" (ex.: sala ainda responde mas sem retratos do anfitrião). Sem isso, S12 mostra texto neutro: "A partida parou. O anfitrião pode ter saído ou a sua conexão caiu."
- **A-des4**: As regras de espectador tardio (em que time entra, se recebe moedas/estrelas iniciais, se vota) ficam com análise/arquitetura; a interface só mostra o resultado no selo UI9.
- **A-des5**: O carregamento do jogo 3D pode informar progresso; se não puder, UI6 usa a variação indeterminada.
- **A-des6**: Nome do comando de medição, ferramenta de teste e local do registro da linha de base são definidos pela arquitetura; aqui só a experiência (entrada, saída, mensagens).
- **A-des7** (resolve Q6 do lado da experiência, até resposta do usuário): a TV toca todos os eventos públicos; o celular toca os eventos do próprio jogador e os públicos principais (dado, vez, vitória) com volume menor. Se houver resposta diferente em Q6, só muda esta regra.

## Rastreabilidade

| Requisito | Tela(s) / Jornada(s) |
|---|---|
| RF1 [Must] qualidade automática | S3, S5, S7, S11, UI2 / J2, J6 |
| RF2 [Must] modo desempenho persistente | S3, UI2 / J2, J7 |
| RF3 [Must] diagnóstico fps/quadro/latência | S3, S10, S11 / J5, J7 |
| RF4 [Must] não redesenhar cena parada | S4, S5, S8 / J1, J6 |
| RF5 [Must] mudança chega aos outros na meta O2 | S5, S7, UI3, UI5 / J1, J2 |
| RF6 [Must] reconectar sem recarregar | UI4, UI3, S4–S8 / J3 |
| RF7 [Should] sons nos modos de sala + silenciar | S3, S5–S8, UI10 / J1, J2 |
| RF8 [Should] transições e efeitos de evento | S5–S8, UI7, UI8 / J1, J2 |
| RF9 [Should] entrar como espectador | S2, S9, UI9 / J4 |
| RF10 [Should] Arena: anfitrião fechou | S12 / J5 |
| RF11 [Should] reduzir movimento | S3, UI7, Acessibilidade / J2 |
| RF12 [Could] vibração | S3, S5, S7, S9 / J2, J4 |
| RF13 [Could] carregamento com progresso | S6, UI6 / J2 |
| RF14 [Must] testes de rede do cliente | S14 / J8 |
| RF15 [Must] teste de renderização por tela | S14, S7 / J8 |
| RF16 [Should] ponta a ponta com vários clientes | S14 / J8 |
| RF17 [Should] roteiro de medição | S14 / J8 |
| RF18 [Must] medição e diagnóstico das duas frentes | S10, S14 / J7, J8 |
| RF19 [Must] sem jogos/modos novos | todas: só telas existentes + camadas transversais (S3, S9, S10, S12, S13) |
| RNF6 compatibilidade / sem WebGL | S13 / J6 |
| RNF7 acessibilidade | Acessibilidade, UI1, S11 |
| O5 retorno visual e sonoro por jogo | S7 (lista de eventos), S5, S8 |
