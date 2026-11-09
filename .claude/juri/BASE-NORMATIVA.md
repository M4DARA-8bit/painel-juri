# Base normativa do júri

Leis, normas e referências técnicas que os jurados podem citar como fundamento. Cada jurado consulta a seção do seu critério e, se o plano tocar no tema, a seção "Comum a todos".

> **Como esta base foi montada.** Levantamento feito em 2026-11-09 por busca na web. Os sites oficiais (planalto.gov.br, owasp.org) estavam bloqueados no ambiente, então os dispositivos foram conferidos em fontes secundárias (comentários jurídicos, tribunais, universidades, documentação de fornecedores). A coluna **Conferência** diz o grau de certeza. Antes de usar um item num documento formal, confira o texto oficial no link indicado.
>
> **O júri não dá parecer jurídico.** Ele aponta riscos de conformidade e recomenda consulta a um profissional quando o risco é alto.

Legenda de **Conferência**:
- `confirmado`: duas ou mais fontes concordam no dispositivo e no conteúdo.
- `conferir`: as fontes divergem num detalhe (prazo, numeração ou situação legislativa). O detalhe está anotado.

## Como citar

Use o formato `[NORMA dispositivo]` dentro da evidência ou da proposta, por exemplo: `[LGPD art. 46]`, `[OWASP A01:2025]`, `[CDC art. 49]`, `[WCAG 2.2]`.

1. Cite só o que está nesta base. Fora dela, escreva `(fora da base, conferir)` depois da citação.
2. Nunca invente número de artigo, inciso ou prazo. Na dúvida, cite só a lei: `[LGPD]`.
3. Item marcado `conferir` não sustenta sozinho um `REJEITAR`. Use-o como ressalva ou junte outra evidência.
4. A norma reforça a evidência do plano; não a substitui. Um voto com norma e sem ID do plano continua inválido.

---

## Segurança e privacidade (`jurado-seguranca`)

### LGPD: Lei 13.709/2018

Texto oficial: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

| Dispositivo | O que exige | Quando citar | Conferência |
|-------------|-------------|--------------|-------------|
| art. 6º | Boa-fé e princípios do tratamento, entre eles finalidade, adequação, necessidade (minimização), transparência, segurança (inc. VII), prevenção e responsabilização e prestação de contas (inc. X). | O plano coleta mais dados do que precisa ou não diz para que usa cada um. | confirmado |
| art. 7º | Todo tratamento precisa de uma base legal (consentimento, execução de contrato, obrigação legal, legítimo interesse etc.). | O plano trata dados pessoais sem dizer com qual base legal. | confirmado (a lista de incisos não foi conferida item a item) |
| art. 11 | Dados sensíveis (saúde, biometria, religião, origem racial etc.) só em hipóteses restritas; a primeira é consentimento específico e destacado. | O plano guarda dado sensível. | confirmado |
| art. 14 | Dados de crianças e adolescentes: tratamento no melhor interesse deles. Para crianças, consentimento específico de um dos pais ou responsável (§1º). | O público inclui menores de 18 anos. | `conferir`: o §1º não apareceu nas fontes da busca |
| art. 18 | Direitos do titular: confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento. O §6º manda avisar quem recebeu os dados sobre a correção. | O plano não prevê como o usuário vê, corrige, exporta ou apaga os próprios dados. | `conferir`: fontes numeram os incisos de forma diferente; cite `[LGPD art. 18]` sem o inciso |
| art. 38 | Relatório de impacto à proteção de dados (RIPD), quando a ANPD exigir. | Tratamento em larga escala, dado sensível ou risco alto aos titulares. | confirmado |
| art. 41 | O controlador indica um encarregado (DPO) para receber reclamações e falar com a ANPD. | O plano é de uma organização que vai tratar dados de terceiros. | confirmado |
| art. 46 | Medidas técnicas e administrativas de segurança desde a concepção (confidencialidade, integridade, disponibilidade). | Falta criptografia, controle de acesso, backup ou registro de acesso. | confirmado |
| art. 48 | Comunicar à ANPD e ao titular incidente que possa causar risco ou dano relevante. | O plano não tem resposta a incidente. | confirmado |
| art. 52 | Sanções da ANPD: de advertência até multa de até 2% do faturamento, limitada a R$ 50 milhões por infração, além de publicização e bloqueio ou eliminação dos dados. | Mostrar o tamanho do risco ao rejeitar. | confirmado |

### Resoluções da ANPD

| Norma | O que exige | Conferência |
|-------|-------------|-------------|
| Resolução CD/ANPD nº 15/2024 | Comunicação de incidente à ANPD em **3 dias úteis** a partir de quando o controlador sabe que dados pessoais foram afetados; complemento em até 20 dias úteis. | confirmado (prazo para o titular: fontes divergem entre 3 dias úteis e "sem demora injustificada") |
| Resolução CD/ANPD nº 2/2022 | Regras simplificadas para agentes de pequeno porte (ME, EPP, startups); prazos em dobro, ou seja, 6 dias úteis para comunicar incidente. | `conferir`: confirmado só por fontes secundárias |

Fonte da Resolução 15/2024 no DOU: https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-15-de-24-de-abril-de-2024-556243024

### Marco Civil da Internet: Lei 12.965/2014

Texto oficial: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm

| Dispositivo | O que exige | Quando citar | Conferência |
|-------------|-------------|--------------|-------------|
| art. 7º, I | Inviolabilidade da intimidade e da vida privada; uso de dados com consentimento livre, expresso e informado ou previsão legal. | Uso de dados além do combinado com o usuário. | confirmado |
| art. 13 | Provedor de conexão guarda registros de conexão por 1 ano, sob sigilo. | Só se o projeto for provedor de conexão (raro). | confirmado |
| art. 15 | Provedor de aplicação constituído como pessoa jurídica guarda registros de acesso (IP, data e hora) por 6 meses, sob sigilo e em ambiente seguro. | Aplicação web ou app de empresa sem plano de guarda de logs de acesso. | `conferir`: fontes divergem se 6 meses é prazo fixo ou mínimo |

### OWASP Top 10:2025

Página oficial: https://owasp.org/Top10/2025/

| ID | Categoria | Pergunta para o plano |
|----|-----------|-----------------------|
| A01:2025 | Broken Access Control (inclui SSRF) | Cada rota confere quem pode fazer o quê? |
| A02:2025 | Security Misconfiguration | Configurações padrão, CORS, cabeçalhos e ambientes estão definidos? |
| A03:2025 | Software Supply Chain Failures | Dependências fixadas, auditadas e de origem confiável? |
| A04:2025 | Cryptographic Failures | Dados em trânsito e em repouso criptografados? Segredos fora do código? |
| A05:2025 | Injection | Entradas validadas e consultas parametrizadas? |
| A06:2025 | Insecure Design | Houve modelagem de ameaças antes de codar? |
| A07:2025 | Identification and Authentication Failures | Senhas, sessões, MFA e recuperação de conta estão previstas? |
| A08:2025 | Software or Data Integrity Failures | Atualizações, pipelines e dados recebidos são verificados? |
| A09:2025 | Security Logging and Alerting Failures | Há log de eventos de segurança e alguém é alertado? |
| A10:2025 | Mishandling of Exceptional Conditions | Erros falham de forma segura, sem vazar detalhes? |

Conferência: `confirmado` para a lista e a ordem. Uma fonte antiga chamava a edição de "release candidate"; a versão final foi publicada em janeiro de 2026.

---

## Custo (`jurado-custo`)

### Princípios FinOps (FinOps Foundation)

Página oficial: https://www.finops.org/framework/principles/

Seis princípios, revisados em 2025 para cobrir toda a tecnologia, não só nuvem:

1. Equipes precisam colaborar.
2. Decisões são guiadas pelo valor de negócio da tecnologia.
3. Todos são donos do próprio uso de tecnologia (antes: "do próprio uso de nuvem").
4. Dados de custo são acessíveis, atuais e precisos.
5. FinOps é habilitado por uma equipe central.
6. Aproveite o modelo de custo variável.

Conferência: `confirmado` para os seis temas; a redação exata de 2025 mudou em quatro deles. Cite como `[FinOps princípio 3]`.

### AWS Well-Architected: pilar de otimização de custos

Página oficial: https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html

Vale para qualquer nuvem como checklist, não só AWS. Princípios de projeto do pilar:

- Implementar gestão financeira de nuvem.
- Adotar modelo de consumo (pagar pelo que usa).
- Medir a eficiência geral.
- Parar de gastar com trabalho pesado indiferenciado (use serviço gerenciado quando fizer sentido).
- Analisar e atribuir gastos.

Conferência: `confirmado` para os quatro primeiros; o quinto vem da versão oficial que conheço, e as fontes da busca não o trouxeram. Cite como `[Well-Architected Custo]`.

### Perguntas obrigatórias de custo

Não são normas, mas o jurado de custo sempre verifica:

- O plano tem custo mensal estimado para 3 cenários: protótipo, 100 usuários e 10 mil usuários?
- Há limite de gasto ou alerta configurado no provedor?
- O uso de IA consome cota de assinatura ou exige chave de API paga?
- Licenças de software e de conteúdo (fontes, imagens, bibliotecas) permitem o uso pretendido?

---

## Viabilidade técnica (`jurado-viabilidade`)

### ISO/IEC 25010:2023: modelo de qualidade de produto

Página oficial: https://www.iso.org/standard/78176.html (norma paga)

Nove características, que servem de checklist de requisitos não funcionais:

| Característica | Pergunta para o plano |
|----------------|-----------------------|
| Adequação funcional | Os requisitos "Must" estão todos cobertos? |
| Eficiência de desempenho | Há meta de tempo de resposta e de uso de recursos? |
| Compatibilidade | Convive e troca dados com os sistemas existentes? |
| Capacidade de interação (antes: usabilidade) | O usuário-alvo consegue concluir as tarefas? |
| Confiabilidade | O que acontece quando algo cai? Há meta de disponibilidade? |
| Segurança | Ver jurado de segurança. |
| Manutenibilidade | Outra pessoa consegue mudar o código daqui a 6 meses? |
| Flexibilidade (antes: portabilidade) | Roda no ambiente previsto, inclusive com restrições? |
| Proteção (safety) | Pode causar dano a pessoas, ao negócio ou ao ambiente? |

Conferência: `confirmado`. Cite como `[ISO 25010 Confiabilidade]`.

### AWS Well-Architected: seis pilares

Excelência operacional, segurança, confiabilidade, eficiência de desempenho, otimização de custos e sustentabilidade (adicionada em 2021). Conferência: `confirmado`. Cite como `[Well-Architected Confiabilidade]`.

### Restrições de ambiente

O jurado de viabilidade sempre verifica se o plano funciona com as restrições declaradas pelo usuário: PC sem permissão de administrador, proxy corporativo e sites bloqueados. Uma dependência que exige instalação com admin ou acesso a um host bloqueado é evidência de inviabilidade.

---

## Valor para o usuário (`jurado-valor`)

### Heurísticas de usabilidade de Nielsen (NN/g)

Página oficial: https://www.nngroup.com/articles/ten-usability-heuristics/

1. Visibilidade do status do sistema.
2. Correspondência entre o sistema e o mundo real.
3. Controle e liberdade do usuário.
4. Consistência e padrões.
5. Prevenção de erros.
6. Reconhecer em vez de lembrar.
7. Flexibilidade e eficiência de uso.
8. Design estético e minimalista.
9. Ajudar o usuário a reconhecer, diagnosticar e se recuperar de erros.
10. Ajuda e documentação.

Conferência: `confirmado`. Cite como `[Nielsen 5]`.

### Acessibilidade

| Norma | O que exige | Conferência |
|-------|-------------|-------------|
| Lei Brasileira de Inclusão, Lei 13.146/2015, art. 63 | Acessibilidade obrigatória nos sites de empresas com sede ou representação comercial no Brasil e de órgãos de governo, seguindo as boas práticas internacionais. | confirmado. O PL 981/2022, que cria sanções, está com situação `conferir` |
| WCAG 2.2 (W3C) | Referência técnica internacional de acessibilidade web, usada como base da LBI. Página: https://www.w3.org/TR/WCAG22/ | confirmado |
| eMAG 3.1 | Modelo de acessibilidade do governo federal, obrigatório para sites públicos. | confirmado |

Texto oficial da LBI: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm

### Código de Defesa do Consumidor: Lei 8.078/1990

Só quando o projeto vende produto ou serviço ao consumidor final.

Texto oficial: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm

| Dispositivo | O que exige | Conferência |
|-------------|-------------|-------------|
| art. 6º, III | Informação adequada e clara sobre produtos e serviços. | confirmado |
| art. 49 | Direito de arrependimento em 7 dias em compras fora do estabelecimento (internet, telefone, app), com devolução imediata e atualizada do valor pago. | confirmado |
| Decreto 7.962/2013 | Comércio eletrônico: identificação do fornecedor, informações claras, atendimento facilitado e meio para exercer o arrependimento. | confirmado no geral; os incisos não foram conferidos |

---

## Advogado do diabo (`jurado-diabo`)

### Pre-mortem (Gary Klein)

Fonte: Klein, G. "Performing a Project Premortem". Harvard Business Review, set. 2007.

Método: assuma que o projeto **já fracassou** daqui a alguns meses e liste os motivos. Imaginar o fracasso como fato consumado ("retrospectiva prospectiva") gera mais causas plausíveis do que perguntar "o que pode dar errado?".

Conferência: `confirmado` para o método. O número "30%" que circula vem de um estudo de 1989 (Mitchell, Russo e Pennington) e mede **quantidade** de motivos, não acerto: não cite como "30% mais preciso".

### Vieses que o advogado do diabo procura

Não são normas; são padrões conhecidos de erro em planejamento:

- **Falácia do planejamento**: estimativas otimistas, sem folga para imprevisto.
- **Pensamento de grupo**: todos os agentes concordam porque partiram das mesmas premissas.
- **Custo afundado**: continuar porque já se investiu, não porque vale a pena.
- **Viés de confirmação**: o plano só cita evidência a favor.
- **Dependência única**: um fornecedor, uma pessoa ou uma API que, se sumir, derruba tudo.

Cite pelo nome: `[pre-mortem]`, `[falácia do planejamento]`.

---

## Comum a todos

Normas que qualquer jurado pode citar quando o plano tocar no tema:

| Tema | Referência | Uso |
|------|------------|-----|
| Dados pessoais | `[LGPD]` | Qualquer coleta de dado de pessoa física. |
| Uso de IA | Projeto de Lei 2338/2023 (marco da IA) | **Em tramitação, não é lei.** Cite só como tendência regulatória: `[PL 2338/2023, em tramitação]`. Situação `conferir`. |
| Software livre | Licença da dependência (MIT, Apache-2.0, GPL etc.) | GPL e AGPL podem obrigar a abrir o código; confira antes de usar em produto fechado. |

---

## Fontes consultadas na montagem

- LGPD, princípios, segurança e incidentes: [Aurum, arts. 46 a 49](https://www.aurum.com.br/blog/lgpd-comentada/art-46-a-49-lgpd), [LegJur, art. 48](https://www.legjur.com/legislacao/art/lei_00137092018-48), [UFJF, princípios](https://www2.ufjf.br/lgpd/sobre/lgpd-principios/), [TJSP, informativo LGPD](https://www.tjsp.jus.br/Download/SecaoDireitoPrivado/GAPRI/INFORMATIVO-LGPD-OFICIAL.pdf)
- LGPD, direitos e sanções: [TRT-15, direitos do titular](https://trt15.jus.br/legislacao/lei-geral-de-protecao-de-dados-pessoais/direitos-do-titular), [Aurum, arts. 17 a 22](https://www.aurum.com.br/blog/lgpd-comentada/art-17-a-22-lgpd), [Modelo Inicial, art. 52](https://modeloinicial.com.br/lei/28584/x/art52), [ANPD, nota técnica de dosimetria](https://www.gov.br/anpd/pt-br/assuntos/processo_regulatorio/analise-de-impacto-regulatorio-1/nt_-28-2022-cgn-anpd_cp_dosimetria.pdf)
- ANPD, incidentes: [Mattos Filho](https://www.mattosfilho.com.br/unico/regulamento-incidente-seguranca/), [Lefosse](https://lefosse.com/noticias/client-alert-anpd-aprova-regulamento-de-comunicacao-de-incidente-de-seguranca), [Serpro](https://www.serpro.gov.br/menu/noticias/noticias-2025/incidentes-seguranca-dados-pessoais)
- Marco Civil: [Modelo Inicial, art. 15](https://modeloinicial.com.br/lei/27460/marco-civil-internet/art-15), [Modelo Inicial, art. 13](https://modeloinicial.com.br/lei/27460/marco-civil-internet/art-13), [MPF, nota técnica](https://www.mpf.mp.br/atuacao/ccr2/coordenacao/comissoes-e-grupos-de-trabalho/combate-crimes-cirberneticos/notas-tecnicas/nota-tecnica-mci-mpf)
- OWASP Top 10:2025: [OWASP, introdução](https://owasp.org/Top10/2025/0x00_2025-Introduction/), [GitLab](https://about.gitlab.com/blog/2025-owasp-top-10-whats-changed-and-why-it-matters/), [Qualys](https://blog.qualys.com/qualys-insights/2026/06/15/what-changed-in-owasp-top-10-2025-and-recommendations-for-each-category)
- CDC e comércio eletrônico: [Jus.com.br, Decreto 7.962](https://jus.com.br/artigos/37874/o-decreto-7-962-2013-e-o-comercio-eletronico), [Idec](https://idec.org.br/node/21863), [Migalhas](https://www.migalhas.com.br/coluna/abc-do-cdc/249828/o-comercio-eletronico-e-o-direito-do-consumidor)
- Acessibilidade: [MPF, recomendação sobre a LBI](https://www.mpf.mp.br/o-mpf/unidades/pr-sp/noticias/mpf-recomenda-regulamentacao-de-trecho-da-lei-brasileira-de-inclusao-sobre-acessibilidade-na-internet), [ENAP, eMAG](https://bibliotecadigital.enap.gov.br/bitstream/1/2710/3/Modulo_2_Web_Acessivel_desenvolvedor.pdf), [Governo Digital, cartilha](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/Cartilhaversao1.0.pdf)
- FinOps: [FinOps Foundation](https://www.finops.org/framework/principles/), [Microsoft Learn](https://learn.microsoft.com/en-us/cloud-computing/finops/framework/finops-framework), [DoiT](https://www.doit.com/blog/6-finops-principles-explained)
- Well-Architected: [AWS APN Blog](https://aws.amazon.com/es/blogs/apn/the-6-pillars-of-the-aws-well-architected-framework/), [DataCamp](https://www.datacamp.com/tutorial/aws-well-architected-framework)
- ISO/IEC 25010:2023: [ISO](https://www.iso.org/standard/78176.html), [arc42 Quality](https://quality.arc42.org/standards/iso-25010), [Sonar](https://www.sonarsource.com/resources/library//iso-iec-25010-explained/)
- Nielsen: [NN/g, avaliação heurística](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/), [Universidade de Edimburgo](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/hci/2023/hci2020heuristics.pdf)
- Pre-mortem: [Klein, HBR 2007 (cópia)](https://wiki.duraspace.org/download/attachments/104563925/ProjectPremortem.pdf?api=v2), [Rework](https://resources.rework.com/libraries/project-management/pre-mortem)
