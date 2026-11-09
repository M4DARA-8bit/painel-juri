---
name: auditar
description: Submete uma ideia ou um documento existente (plano, proposta, README) ao júri de 5 jurados e ao relator, sem passar pelo escritório inteiro. Rejeições voltam com propostas de solução, que são aplicadas e votadas de novo. Use com /auditar <caminho do arquivo ou texto da ideia>.
argument-hint: <caminho de um arquivo .md ou texto da ideia>
disable-model-invocation: true
allowed-tools: Bash(python scripts/tokens.py:*), Bash(python3 scripts/tokens.py:*), Bash(py scripts/tokens.py:*)
---

# /auditar

Você é o **coordenador** do júri. Você não vota e não opina. Você prepara o documento, conduz as rodadas, aplica as propostas aprovadas pelo processo e entrega o resultado.

Entrada recebida:

> $ARGUMENTS

## Etapa 0: preparar

1. Entrada vazia? Pergunte ao usuário o que auditar e pare.
2. Crie a pasta `docs/auditoria/<AAAA-MM-DD-HHMM>-<slug>/`, onde `<slug>` tem até 4 palavras da ideia ou do nome do arquivo, em minúsculas e com hífens.
3. Crie `documento.md` nessa pasta:
   - **Entrada é um arquivo existente**: copie o conteúdo integral. No topo, acrescente `> Cópia de <caminho original> para auditoria em <AAAA-MM-DD>. O original não é alterado.`
   - **Entrada é texto**: escreva:

```markdown
# Ideia em auditoria

Data: <AAAA-MM-DD>

## Pedido original
<texto exatamente como o usuário escreveu>
```

Uma ideia curta, sem plano, tende a receber muitas rejeições por falta de evidência. Isso é esperado: as propostas da rodada 1 dão corpo à ideia. Se o usuário quiser um plano completo antes, sugira `/planejar`.

Nunca altere o arquivo original. Todas as mudanças vão para `documento.md`.

## Etapas 1 e 2: júri

Siga `.claude/juri/PROCEDIMENTO.md` com os parâmetros do `/auditar`:

- `PLANO` = `docs/auditoria/<pasta>/documento.md`
- `PASTA` = `docs/auditoria/<pasta>/juri`
- `RELATORIO` = `docs/auditoria/<pasta>/juri.md`

No passo 4 (aplicar propostas), você mesmo edita `documento.md`, como o procedimento descreve. Aplique a solução que o jurado propôs, sem acrescentar ideias suas.

O passo de tokens grava `docs/auditoria/<pasta>/custos.md`.

## Encerramento

Responda ao usuário em até 8 linhas:

- Veredito final, rodada em que saiu e placar (aprovar/ressalvas/rejeitar/inválidos).
- Divergências que continuaram abertas, com o nome do jurado.
- Quantas propostas foram aplicadas e quais ficaram pendentes.
- Caminhos de `documento.md` (versão melhorada) e `juri.md`.
- Total de tokens.

## Regras

- Nunca passe a um jurado o voto de outro jurado nem o veredito de rodadas anteriores.
- Se um agente falhar, chame-o de novo uma vez com o erro no prompt; falhando de novo, pare e informe o usuário.
- Não faça commit. O usuário decide o que versionar.
