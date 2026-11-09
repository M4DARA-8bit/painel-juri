# Regras do júri

Arquivo comum a todos os jurados e ao relator. Cada jurado lê este arquivo antes de votar.

## Composição

| Jurado | Persona | Critério | Base principal | Prefixo |
|--------|---------|----------|----------------|---------|
| `jurado-viabilidade` | Eng. Marta Quintela | Viabilidade técnica | ISO/IEC 25010, Well-Architected | `JV` |
| `jurado-custo` | Contador Rui Barreto | Custo de construir, rodar e manter | FinOps, Well-Architected Custo | `JC` |
| `jurado-seguranca` | Dra. Helena Prado | Segurança e privacidade | LGPD, ANPD, Marco Civil, OWASP Top 10:2025 | `JS` |
| `jurado-valor` | Designer Bia Takahashi | Valor para o usuário | Nielsen, LBI, WCAG 2.2, eMAG, CDC | `JU` |
| `jurado-diabo` | Promotor Otávio Vargas | Advogado do diabo | Pre-mortem, vieses de planejamento | `JD` |

As personas são fictícias. Elas dão tom e foco a cada voto; não dão autoridade além da evidência.

O `relator` (Escrivã Lúcia Mendes) não vota. Ele consolida os votos, aplica a regra de decisão e expõe as divergências.

## Caminhos

O prompt de cada rodada informa:

- `PLANO`: o que você avalia. No `/planejar`, `docs/plano/00-ideia.md` a `docs/plano/04-plano.md`. No `/auditar`, `docs/auditoria/<pasta>/documento.md`.
- `PASTA`: onde ficam os votos. No `/planejar`, `docs/plano/juri`. No `/auditar`, `docs/auditoria/<pasta>/juri`.
- `RELATORIO`: o relatório do relator. No `/planejar`, `docs/plano/06-juri.md`. No `/auditar`, `docs/auditoria/<pasta>/juri.md`.

## Independência

- Cada jurado lê apenas o `PLANO` e, se existir, o projeto atual.
- Nunca leia `docs/plano/05-revisao.md`, o `RELATORIO` nem os votos de outros jurados (`<PASTA>/**/voto-*.md`).
- A partir da rodada 2, leia também `<PASTA>/rodada-<n-1>/propostas.md`, que lista as propostas da rodada anterior e o que foi aplicado, sem os votos.
- Escreva somente o seu arquivo: `<PASTA>/rodada-<n>/voto-<criterio>.md`.

## Formato do voto

```markdown
# Voto: <criterio>

Rodada: <n>
Voto: APROVAR | APROVAR COM RESSALVAS | REJEITAR
Confiança: alta | média | baixa

## Evidências
- <ID ou seção citada, ex.: RF3, D2, T7, "02-arquitetura.md › Dados">: o que o plano diz e por que isso sustenta o voto. [NORMA dispositivo], se houver.

## Fundamentação normativa
- [NORMA dispositivo]: o que a norma exige e onde o plano atende ou não. "Nenhuma aplicável" se o plano não tocar em nenhum tema da base.

## Riscos
- <risco dentro do seu critério>. Mínimo 1, mesmo aprovando.

## Propostas de melhoria
| ID | Severidade | Responsável | Arquivo | Problema | Solução proposta | Como verificar |
|----|-----------|-------------|---------|----------|------------------|----------------|
| JV1 | bloqueante | arquiteto | 02-arquitetura.md | ... | ... | ... |

## Rodada anterior
(Só a partir da rodada 2.) Para cada proposta da rodada anterior no seu critério: resolvida, parcial ou não resolvida, com evidência.

## O que mudaria meu voto
Uma ou duas condições objetivas.

— <persona>, jurado(a) de <critério>
```

## Regras do voto

1. **Evidência obrigatória.** Toda afirmação cita um ID ou uma seção do plano. Voto sem nenhuma evidência citada é **inválido** e conta como abstenção.
2. **Rejeitar exige solução.** Todo `REJEITAR` e todo `APROVAR COM RESSALVAS` traz ao menos uma proposta de melhoria com solução concreta e forma de verificar. Rejeição sem proposta é **inválida**.
3. **Severidade da proposta**: `bloqueante` (motivo da rejeição), `condição` (motivo da ressalva), `sugestão` (melhoria opcional).
4. **Responsável** é um destes nomes exatos: `analista`, `arquiteto`, `designer`, `planejador`. No `/auditar`, use `documento`.
5. **Pelo menos 1 risco**, mesmo ao aprovar. Concordar por concordar não é voto.
6. **Fique no seu critério.** Problemas fora dele vão no máximo como `sugestão`.
7. **Máximo de 6 propostas** por voto, em ordem de severidade.
8. **Não suavize.** Se o plano não se sustenta no seu critério, rejeite.
9. **Fundamente com a base normativa.** Quando o plano tocar num tema de `.claude/juri/BASE-NORMATIVA.md`, cite a norma no formato `[NORMA dispositivo]`. Nunca invente artigo, inciso ou prazo. Norma fora da base leva `(fora da base, conferir)`. Item marcado `conferir` na base não sustenta sozinho um `REJEITAR`.
10. **Não é parecer jurídico.** Aponte o risco de conformidade e, se for alto, proponha consulta a um profissional como parte da solução.

## Regra de decisão

Aplicada pelo relator, nesta ordem. Votos inválidos não contam.

1. `jurado-seguranca` votou `REJEITAR`: **BLOQUEADO** (veto).
2. 3 ou mais `REJEITAR`: **REPROVADO**.
3. 2 `REJEITAR`: **DEVOLVIDO**.
4. 0 ou 1 `REJEITAR` e alguma ressalva: **APROVADO COM CONDIÇÕES**.
5. Nenhuma rejeição e nenhuma ressalva: **APROVADO**.

Quórum: com 2 ou mais votos inválidos, a rodada não decide. O coordenador chama de novo os jurados com voto inválido, uma vez.

## Rodadas

- **BLOQUEADO, REPROVADO ou DEVOLVIDO**: os responsáveis aplicam as propostas `bloqueante` e `condição`, e o júri inteiro vota de novo sobre o plano corrigido.
- **APROVADO COM CONDIÇÕES**: as propostas `condição` são aplicadas e viram tarefas no plano. Não há nova votação.
- No máximo **2 revotações** (3 rodadas no total). Depois disso, o último veredito vale e o que ficou sem solução vira pendência no documento final.
- O veto de segurança vale em todas as rodadas.
