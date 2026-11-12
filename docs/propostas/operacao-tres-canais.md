# Operação Três Canais

Proposta de operação de renda extra: três canais faceless no YouTube e uma linha de quatro produtos digitais, construídos sem capital inicial num PC doméstico com Windows 11.

Data: 2026-11-12

---

## 1. Contexto e restrições

| ID | Restrição | Detalhe |
|----|-----------|---------|
| CTX1 | Tempo | Trabalho das 7h às 17h, faculdade das 19h às 21h, de segunda a sexta. Resta ~30 min por noite e os fins de semana. |
| CTX2 | Capital | **R$ 0,00.** Nenhuma ferramenta paga, nenhuma mensalidade, nenhum cartão. |
| CTX3 | Máquina | Um PC doméstico com Windows 11. GPU não confirmada. |
| CTX4 | Ativo existente | Assinatura do Claude Code já paga e em uso. Repositório `painel-juri` demonstra domínio de arquitetura de agentes. |
| CTX5 | Objetivo | Renda extra recorrente. Não substituir o emprego no primeiro ano. |
| CTX6 | Modelo de renda | Preferência explícita por renda de ativo (constrói uma vez, vende depois) sobre renda de esforço (alimenta todo dia). |

### Premissas assumidas

| ID | Premissa | Risco se falsa |
|----|----------|----------------|
| PR1 | O operador consegue sustentar 25-30 min/dia por pelo menos 6 meses | Todo o plano cai |
| PR2 | O PC aguenta renderizar 2 a 6 vídeos por noite | Volume precisa cair |
| PR3 | A conta do Google do operador consegue publicar por API | Publicação vira manual (ver R3) |
| PR4 | Narração sintetizada em inglês é aceita pela audiência do nicho | Canal não retém, RPM não se realiza |

---

## 2. Decisão estratégica

### 2.1 O que foi descartado, e por quê

| ID | Opção | Motivo da recusa |
|----|-------|------------------|
| X1 | Dropshipping / Shopify | Margem líquida de iniciante abaixo de 10%; exige 45-50% de margem bruta para escalar; anúncios consomem 20-30% do preço; capital mínimo de US$ 250-400/mês. **Viola CTX2.** É negócio de tráfego pago, não de IA. |
| X2 | Afiliado por tráfego orgânico | É renda de esforço disfarçada: produz conteúdo diário para gerar clique, R$ 0 nos primeiros meses, R$ 200-800/mês entre o mês 1 e 3, 3 a 12 meses até algo consistente. **Viola CTX6.** Mesmo trabalho do canal dark com comissão no lugar do AdSense. |
| X3 | Consultoria / agência de automação | Melhor retorno por hora de todas as opções (R$ 3.000-10.000 por projeto), mas exige prospecção fria diária. **Viola CTX1.** |
| X4 | Shorts em português | RPM de R$ 0,10 a R$ 1,50 por mil views. 540 mil views/mês renderiam R$ 54-810. Pior ativo do YouTube. |

### 2.2 O que foi escolhido

**D1.** Três canais faceless com vídeo longo, mais quatro produtos digitais vendidos pelos próprios canais.

**D2. Idioma: inglês nos canais 1 e 3, português no canal 2.** É a decisão de maior impacto financeiro do plano e não custa trabalho adicional — o TTS fala outro idioma.

| Formato e idioma | RPM | 540 mil views/mês |
|---|---|---|
| Shorts, português | R$ 0,10-1,50 | R$ 54-810 |
| Longo, português | R$ 3-10 | R$ 1.620-5.400 |
| **Longo, inglês, nicho alto** | US$ 4-8 | **R$ 11.000-22.000** |

**D3.** O canal não é a receita principal; é a **distribuição** dos produtos. Produto digital sem audiência vende zero. Canal sem produto rende só AdSense. Juntos, a mesma audiência paga duas vezes.

**D4. Volume: 2 vídeos/dia num canal ativo, não 9/dia em três.** Ver R5.

**D5. Lançamento escalonado:** canal 1 na semana 5, canal 2 na semana 9, canal 3 na semana 13. A monetização é por canal (1.000 inscritos + 4.000 horas cada); lançar três no escuro triplica o trabalho e divide o aprendizado por três.

---

## 3. Os três canais

### C1 — Histórias Curtas *(lançar primeiro)*

Ficção, fantasia, terror, histórias emocionantes.

| Atributo | Valor |
|---|---|
| Formato | Uma história por vídeo, 10-15 min, narração contínua |
| Idioma | Inglês |
| Imagens | Atmosféricas; é o único canal onde imagem gerada por IA cai bem |
| RPM de referência | US$ 4-8 (nicho terror/true crime) |

**C1.1 — Por que este primeiro.** Ficção é original por definição. Não existe erro factual, não existe risco de desinformação, e não existe o problema da persona de IA apresentada como especialista humano — que, segundo as fontes, desmonetiza conteúdo de saúde, finanças, direito e política.

### C2 — Como Foi Feito *(reformatado)*

Construções, arquitetura, agronomia, ciência, etiqueta.

| Atributo | Valor |
|---|---|
| Formato | Um assunto por vídeo, 8-12 min |
| Idioma | Português |
| Imagens | Wikimedia Commons (domínio público, acervo histórico de obras) |

**C2.1 — A reformatação.** O pedido original era "como fazer" (tutorial). Tutorial não funciona em pipeline faceless: "como fazer uma parede" exige filmar a parede, e imagem de banco não sustenta retenção. A correção troca o tutorial pelo documentário: em vez de *como fazer*, *como foi feito* e *como funciona*. Os temas sobrevivem inteiros — como construíram a ponte, por que o telhado tem essa inclinação, como o café chega à xícara, de onde veio a regra do garfo à esquerda.

**C2.2.** Português aqui por dois motivos: menos concorrência em documentário técnico lusófono, e o operador consegue auditar a qualidade do roteiro, o que não conseguiria em inglês.

### C3 — Curiosidades *(lançar por último)*

História, geografia, filosofia, filmes, séries.

| Atributo | Valor |
|---|---|
| Formato | Um assunto por vídeo, em narrativa, 8-12 min |
| Idioma | Inglês |
| Regra | Toda afirmação factual sai de fonte verificável, citada na descrição |

**C3.1 — Risco mais alto dos três**, por três motivos somados: é o nicho mais saturado, o formato mais parecido com conteúdo inautêntico, e erro factual aqui vira strike.

**C3.2 — Celebridades foram cortadas do escopo.** Pessoa real + narração de IA + possibilidade de erro é a combinação que gera processo por difamação e remoção de vídeo. Filmes e séries permanecem; as pessoas por trás deles saem.

**C3.3 — Sem formato de lista.** "A geografia que decidiu uma guerra", não "10 curiosidades sobre geografia".

---

## 4. Riscos identificados e contornos

| ID | Risco | Contorno |
|----|-------|----------|
| R1 | **Emissão de chave da API do Pexels está pausada.** Metade dos tutoriais de pipeline começa por "pegue sua chave do Pexels" e não funciona mais. | Pixabay (100 req/min) e Wikimedia Commons como fontes primárias; Openverse como terceira. |
| R2 | **edge-tts não é API oficial.** Usa serviço interno do Microsoft Edge por caminho não documentado. A Microsoft mudou o protocolo em outubro de 2026 e clientes antigos receberam HTTP 403. | Fixar `edge-tts>=7.3.1` **e instalar o Piper TTS como reserva já no primeiro fim de semana**, não quando quebrar. O Piper roda 100% offline. |
| R3 | **Vídeo enviado por API pode nascer privado.** Projetos criados após julho de 2020 e não auditados teriam envios travados em privado. Fontes de 2026 divergem sobre a regra ainda valer. | Testar no primeiro sábado com um vídeo de 10 segundos. Se nascer privado, solicitar auditoria e subir manualmente até sair. A publicação é a última etapa do pipeline justamente para ser trocável. |
| R4 | **Cota de upload: 1.600 unidades por vídeo**, contra cota diária padrão de 10.000 → 6 envios/dia por projeto. | Um projeto do Google Cloud por canal. Cada projeto tem cota própria; sobram 6 envios diários por canal, o triplo dos 2 que o plano pede. |
| R5 | **Política de conteúdo inautêntico.** O YouTube renomeou "conteúdo repetitivo" para "conteúdo inautêntico" em julho de 2025. Não proíbe IA — pune produção em massa e templada sem contribuição humana. Nove vídeos/dia em três canais novos é o padrão literal que a política descreve. | D4 (2 vídeos/dia) e E3 (aprovação humana obrigatória e não automatizável). |
| R6 | **Conteúdo reutilizado.** Baixar vídeos virais e recriá-los cai na política de conteúdo reutilizado, clarificada em 2026 para cobrir áudio de IA. | Usar vídeos virais apenas como referência de estrutura. Nunca usar o material. |
| R7 | **Skill de terceiro roda comando no PC.** As notas SAFE/CAUTION/UNSAFE dos diretórios vêm do Agent Skills Hub, que não publica critério nem método. | Ler o `SKILL.md` e os scripts antes de instalar; exigir licença MIT ou Apache declarada; preferir alcance *contido* a *privilegiado* a *remoto*. |
| R8 | **Views abaixo do previsto.** Canal novo faz 100-500 views por vídeo, não 2.000. A média de 2k é número de canal maduro. | Nenhum. É risco aceito. O custo de um mês ruim é R$ 0,00 mais o tempo. |
| R9 | **O limiar de monetização pode nunca chegar.** 1.000 inscritos e 4.000 horas por canal não são garantidos. | Nenhum. Risco aceito. |
| R10 | **Produto sem divulgação vende zero.** | D3: o canal é a distribuição. O produto só entra no ar depois que o canal 1 existe. |

---

## 5. Stack técnica

Nenhum item cobra mensalidade. O único ativo pago envolvido é a assinatura do Claude já existente (CTX4).

| ID | Etapa | Ferramenta | Observação |
|----|-------|-----------|------------|
| S1 | Roteiro | Claude Code | Assinatura já paga |
| S2 | Narração | edge-tts | Ver R2. Fixar ≥ 7.3.1 |
| S3 | Narração reserva | Piper TTS | 100% offline, nunca quebra |
| S4 | Imagem de arquivo | Wikimedia Commons | Domínio público |
| S5 | Imagem de banco | Pixabay API | 100 req/min. Licença proíbe redistribuir o arquivo solto — relevante para P1, não para o vídeo |
| S6 | Legendas | word boundaries do edge-tts | Ver S6.1 |
| S7 | Montagem | ffmpeg 6.1+ | |
| S8 | Thumbnail | Pillow | |
| S9 | Música | YouTube Audio Library | Liberada para monetização |
| S10 | Publicação | YouTube Data API v3 via MCP | Ver K10 |

**S6.1 — Economia de projeto nas legendas.** Quase todo pipeline roda Whisper para transcrever o áudio que ele mesmo acabou de gerar. É trabalho desperdiçado: o texto já existe, porque foi o operador que escreveu o roteiro. O edge-tts devolve eventos de *word boundary* com o tempo exato de cada palavra. O SRT sai daí, com sincronia perfeita, instantâneo, e elimina uma dependência pesada.

---

## 6. Skills, plugins e conectores

A operação tem quatro camadas. Todas gratuitas.

### 6.1 Camada de render — K1

**K1. `kajisho5/ffmpeg-skill`** — MIT, 5,2 mil estrelas, 42 ferramentas, sem nuvem e sem chave de API, apenas biblioteca padrão do Python 3.10+. Exige ffmpeg 6.1+.

Traz pronto: `insert.py` (imagem parada vira clipe, com Ken Burns), `sequence.py` (sequência de imagens), `caption.py` (queima SRT e monta SRT de texto cronometrado), `audio.py` (cama musical com ducking sidechain), `loudness.py` (EBU R128), `export.py` (presets), `batch.py`, `render.py`, `verify.py`.

**K1.1 — Impacto no cronograma.** Esta skill cobre o que seriam dois fins de semana de programação. É o motivo de F2 e F3 terem virado um só.

### 6.2 Camada de conhecimento — K2 a K5

| ID | Skill | O que entrega | Alcance |
|----|-------|---------------|---------|
| K2 | **Social Media Skills** (catálogo, 106 skills) | Conhecimento puro, sem API e sem mensalidade: `story-writer`, `storytelling-and-narrative`, `viral-reverse-engineering`, `hook-writer`, `youtube-publishing-and-metadata`, `hashtag-strategy`, `thumbnail-design`, `batch-content-plan`, `community-management`, `reply-and-comment-writer`, `competitor-analysis`, `creator-monetization` | privilegiado |
| K3 | **YouTube Transcriber** (catálogo) | Transcreve vídeos e playlists pelas legendas do navegador. Grátis, sem chave | contido |
| K4 | `obra/superpowers` | MIT. Disciplina de plano-antes-de-código, TDD, revisão | — |
| K5 | `anthropics/skills` | Apache 2.0. Inclui `skill-creator`, usado para construir P2 | — |

### 6.3 Camada de narração e mídia — K6 a K8

| ID | Skill | Para |
|----|-------|------|
| K6 | `aahl/skills` (Edge TTS) | E4 |
| K7 | `SecKatie/katies-ai-skills` (Piper) | E4 reserva |
| K8 | `calesthio/generative-media-skills` | E6 |

### 6.4 Camada de escrita no YouTube — K9 e K10

Todas as skills acima **leem** o YouTube. Para publicar, renomear, trocar thumbnail, mexer em tags e responder comentário é preciso um servidor MCP com acesso de escrita, usando OAuth próprio do operador. É gratuito: o projeto no Google Cloud será criado de qualquer forma (R4).

| ID | Servidor | O que dá | Sinais |
|----|----------|----------|--------|
| K9 | **`pauling-ai/youtube-mcp-server`** *(escolhido)* | 40 ferramentas: publicação, playlists, comentários, e analytics de receita, retenção, fontes de tráfego, demografia e desempenho por dia da semana. Controla a cota do lado do cliente | MIT, 32 ★ |
| K10 | `AI-Shopping-Feeds/youtube-studio-mcp` *(adiado)* | 107 ferramentas, incluindo envio em lote, `update_video` e `reply_to_comment`. Tem modo `YOUTUBE_DRY_RUN` e log de auditoria | MIT, **0 ★, é um fork** |

**K9.1 — Justificativa da escolha.** K9 tem menos ferramentas, mas 32 estrelas contra zero, não é fork de ninguém, e traz o analytics que sustenta a rotina de domingo (E10). K10 entra depois, se o envio em lote for necessário, e exige leitura do código antes — um fork sem estrela nenhuma com permissão de apagar vídeo justifica essa meia hora (R7).

**K9.2 — Resolução de incerteza.** A documentação do K9 confirmou os 1.600 unidades por upload que estavam em disputa entre as fontes, fechando R4.

### 6.5 Descartadas

| ID | Item | Motivo |
|----|------|--------|
| K11 | **TubeAlfred** (15 skills de pesquisa no YouTube) | É **somente leitura** — pesquisa hashtag, não insere — e é **paga**: planos na faixa de US$ 15/mês por 5.000 créditos. **Viola CTX2.** Substituída por K3 (transcrição) e K2 `hashtag-strategy` (estratégia). |
| K12 | `social-media-skills/video-editing-skill` | Corta pausas, "um", gagueiras e tomadas repetidas. **É para vídeo de pessoa falando na câmera.** Narração sintetizada não tem nada disso — a skill não teria o que cortar. Soma-se: 3 estrelas, 3 commits, e a publicação exige conta no WoopSocial. |
| K13 | Abracadabrax Thumbnail Maker, ManyMotions, VideoDB, OpenClip, StarZero, Riverside | Todos SaaS remoto com cobrança. **Violam CTX2** e deixam o pipeline dependente de servidor de terceiro. |

---

## 7. O pipeline

| ID | Etapa | Quem faz | Quando |
|----|-------|----------|--------|
| E1 | Fila de pautas | K2 `viral-reverse-engineering` e `batch-content-plan` + K3 | Domingo, manual |
| E2 | Roteiro | Claude Code + K2 `story-writer` e `hook-writer` | Automático |
| E3 | **Aprovação** | **O operador** | 15 min/noite |
| E4 | Narração | K6 (reserva K7) | Automático |
| E5 | Legenda | K1 `caption.py` | Automático |
| E6 | Imagens | K8 + script próprio (S4, S5) | Automático |
| E7 | Montagem | K1 `insert` → `sequence` → `audio` → `loudness` → `export` | Madrugada |
| E8 | Thumbnail | Pillow + K2 `thumbnail-design` | Automático, 3 opções |
| E9 | Publicação | K9 + K2 `youtube-publishing-and-metadata` e `hashtag-strategy` | Agendada |
| E10 | Comentários e análise | K9 `reply_to_comment` e `youtube_analytics_*` + K2 `community-management` | Domingo |

**E3.1 — A aprovação não pode ser automatizada, e não por limitação técnica.** É ela que constitui a contribuição humana que a política de conteúdo inautêntico exige (R5). Automatizar essa etapa é desmonetizar o canal.

### Estrutura de pastas

```
/canal-historias/          uma pasta por canal, pipeline idêntico, config diferente
  config.json              voz, idioma, formato, estilo visual, credencial do GCP
  fila.json                pautas aguardando roteiro
  roteiros/                pendente/ -> aprovado/ -> publicado/
  midia/                   áudio, imagens baixadas, SRT
  saida/                   MP4 final e thumbnails
/core/                     os scripts, compartilhados pelos três canais
```

---

## 8. Cronograma de construção

### F1 — Fim de semana 1: tem que sair som

1. Instalar Python 3.11+ e ffmpeg 6.1+, confirmar no PowerShell
2. `npx ffmpeg-skill` e `npx ffmpeg-skill doctor`
3. `pip install "edge-tts>=7.3.1"`, gerar o primeiro MP3
4. Instalar o Piper e gerar o mesmo áudio por ele (R2)
5. Escolher as vozes em `edge-tts --list-voices`
6. Instalar K2, K3, K4, K5
7. Instalar K9 e autenticar com OAuth próprio
8. Montar um vídeo de 60 s com `insert.py`
9. **Testar R3:** criar o projeto GCP, subir um vídeo de 10 s e verificar se nasce privado

### F2 — Fim de semana 2: assistível e publicando sozinho

Os dois fins de semana originais couberam em um por causa de K1.1. O trabalho aqui é ligar peças, não escrevê-las.

1. SRT dos word boundaries, queimar com `caption.py`
2. Baixar imagens do Pixabay e Wikimedia por palavra-chave
3. Ken Burns e sequência com `insert.py` e `sequence.py`
4. Cama musical com `audio.py`, normalizar com `loudness.py`
5. Fechar com `export.py` no preset do YouTube
6. Três thumbnails por vídeo com Pillow
7. Envio com título, descrição, tags e estreia agendada via K9
8. Fila de pautas e fluxo pendente → aprovado → publicado
9. Agendador do Windows rodando `batch.py` de madrugada
10. Rotina de domingo: `youtube_analytics_retention` e `_day_of_week`

### F3 — Fim de semana 3: escalar e virar produto

1. Gerar 10 vídeos num lote e medir o tempo real de máquina (PR2)
2. Criar o canal C1 com arte, descrição e seções
3. Publicar os 10 primeiros vídeos
4. Fazer `config.json` segurar as diferenças entre os três canais
5. **Escrever o README — ele é P1**
6. Empacotar as skills e a ordem de instalação junto

---

## 9. Rotina de operação

| Quando | Duração | O quê |
|--------|---------|-------|
| 22h00 | 15 min | Aprovar os roteiros do dia (E3) |
| 22h15 | 5 min | Escolher thumbnail e conferir títulos |
| 22h20 | 5 min | Soltar o lote e fechar o notebook |
| Madrugada | — | A máquina monta e agenda sozinha (E7, E9) |
| Domingo | 1 h | Abastecer a fila e ler as métricas (E1, E10) |

Total: **25 min/dia + 1 h no domingo.** Compatível com CTX1.

---

## 10. Linha de produtos

O mercado está declarado: a Hotmart registrou R$ 142,8 milhões em cursos de IA em 2025, crescimento de 700% em dois anos, dentro de um mercado de infoprodutos de R$ 8,8 bilhões ao ano. Templates de automação bem documentados vendem entre US$ 50 e 250.

| ID | Produto | Preço | Esforço | Quando |
|----|---------|-------|---------|--------|
| P1 | **O próprio pipeline** — canal dark gratuito no Windows, com o mapa das skills e do MCP | R$ 97-147 | incluso em F3 | Mês 1 |
| P2 | **Pacote de agentes Claude** — derivados do `painel-juri`: júri de código, de contrato, de negócio. Construído com K5 `skill-creator` | R$ 97-197 | 2 fins de semana | Mês 4 |
| P3 | **Automação de tarefas** — templates de nicho específico, não pacote genérico | R$ 147 | 2 fins de semana | Mês 6 |
| P4 | **Curso de construção de agentes** — maior ticket, maior esforço, por isso último | R$ 297-497 | 6+ fins de semana | Mês 9 |

**P1.1 — Por que P1 vem primeiro.** O esforço já foi pago: o pipeline será construído de qualquer forma. Documentar com cuidado é o único custo extra, e já estava em F3. É o único item do plano que paga duas vezes.

### Plataformas de venda

| Plataforma | Taxa | Recebimento | Para |
|---|---|---|---|
| **Cakto** | 0% + R$ 2,49 no Pix; 4,99% + R$ 2,49 no cartão | D+1, saque grátis | Brasil |
| Kiwify | 8,99% + R$ 2,49 | Pix de afiliado em 7 dias; saque R$ 3,67 | — |
| **Gumroad** | ~10% | — | Exterior, em dólar |

Numa venda de R$ 97 no Pix: Cakto desconta R$ 2,49, Kiwify desconta R$ 11,21. Nenhuma cobra mensalidade, então CTX2 é preservado.

---

## 11. Projeção financeira

| Mês | Situação | Canais | Receita estimada |
|-----|----------|--------|------------------|
| 1 | Pipeline pronto, C1 no ar, P1 à venda | 1 | R$ 0 |
| 2 | Primeiras vendas de P1 | 1 | R$ 0-300 |
| 3-4 | C2 no ar, rumo ao limiar | 2 | R$ 100-600 |
| 5-6 | C1 monetizado, C3 no ar | 3 | R$ 500-1.500 |
| 7-9 | Dois canais monetizados, 3 produtos | 3 | R$ 1.500-4.000 |
| 10-12 | Três canais maduros, P4 no ar | 3 | R$ 3.000-9.000 |

Custo de operação: **R$ 0,00/mês.** Faixas largas porque a variável decisiva — quantas pessoas assistem — não se controla. O que o plano controla é custo zero e tempo fixo, então um mês ruim não custa dinheiro.

---

## 12. Qualidade das fontes

Declaração honesta, porque o plano se apoia em números de terceiros.

| Item | Grau de confiança |
|------|-------------------|
| K1, K5, K4, K9, K10 | **Confirmado** no próprio repositório |
| R4 (1.600 unidades) | **Confirmado** na documentação do K9 |
| R1, R2 | Confirmado em fonte secundária consistente |
| R3 (auditoria/vídeo privado) | **Não confirmado.** `developers.google.com` está fora dos domínios liberados da sessão de pesquisa. Fontes de 2026 divergem. Projetado pelo pior caso e marcado para teste em F1.9 |
| RPM por nicho e país | **Baixo.** Blogs do setor e de fornecedores, com interesse comercial e números divergentes. Ordem de grandeza, não garantia |
| Taxas Cakto/Kiwify | Médio. Duas das fontes são da própria Cakto |
| R$ 142,8 mi em cursos de IA | Médio. Atribuído à Hotmart via fonte secundária |
| Notas SAFE/CAUTION/UNSAFE | **Baixo.** Agent Skills Hub não publica critério nem método (R7) |
| Preço do TubeAlfred (K11) | Médio. Docs do projeto citam US$ 15/mês; fontes antigas citam US$ 5 de lançamento |

O RPM verdadeiro só aparece no YouTube Studio do próprio canal.

---

## 13. Primeira ação

Oito itens que cabem num sábado à tarde e respondem, antes de qualquer investimento de tempo, a única pergunta capaz de derrubar o plano inteiro (PR3): *o YouTube deixa publicar por API nesta conta?*

1. Python 3.11+ e ffmpeg 6.1+
2. `npx ffmpeg-skill` e `npx ffmpeg-skill doctor`
3. Projeto no Google Cloud e YouTube Data API v3 ativada
4. Instalar K9 e rodar `youtube_auth`
5. Criar o canal C1
6. Subir um vídeo de 10 s pela API e verificar se nasce privado
7. Primeiro áudio com edge-tts, voz em inglês
8. Instalar o Piper e gerar o mesmo áudio
