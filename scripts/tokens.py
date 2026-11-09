#!/usr/bin/env python3
"""Consumo de tokens por agente numa sessão do Claude Code.

Lê os logs locais que o próprio Claude Code grava em ~/.claude/projects/.
Não usa rede, não usa chave de API e não precisa de admin: só a biblioteca
padrão do Python 3.8+.

Uso:
    python scripts/tokens.py                     # sessão mais recente deste projeto
    python scripts/tokens.py --sessao <id>       # sessão específica
    python scripts/tokens.py --saida docs/plano/custos.md
    python scripts/tokens.py --json
    python scripts/tokens.py --listar            # sessões deste projeto

Com assinatura do Claude Code, os tokens consomem a cota do plano, não dinheiro.
"""

import argparse
import glob
import json
import os
import re
import sys
from datetime import datetime

CAMPOS = ("input_tokens", "cache_creation_input_tokens", "cache_read_input_tokens", "output_tokens")


def pasta_claude():
    return os.environ.get("CLAUDE_CONFIG_DIR") or os.path.join(os.path.expanduser("~"), ".claude")


def pasta_projeto(cwd):
    # O Claude Code troca todo caractere que não é letra ou número por "-".
    nome = re.sub(r"[^A-Za-z0-9]", "-", os.path.abspath(cwd))
    return os.path.join(pasta_claude(), "projects", nome)


def sessoes(pasta):
    arquivos = glob.glob(os.path.join(pasta, "*.jsonl"))
    return sorted(arquivos, key=os.path.getmtime, reverse=True)


def somar(caminho):
    """Soma o uso de todas as respostas do modelo num arquivo .jsonl."""
    total = dict.fromkeys(CAMPOS, 0)
    modelos, vistos, chamadas = set(), set(), 0
    with open(caminho, encoding="utf-8") as f:
        for linha in f:
            try:
                d = json.loads(linha)
            except ValueError:
                continue
            msg = d.get("message")
            if d.get("type") != "assistant" or not isinstance(msg, dict):
                continue
            uso = msg.get("usage")
            if not isinstance(uso, dict):
                continue
            # Uma resposta pode aparecer em várias linhas (uma por bloco); conta uma vez.
            chave = d.get("requestId") or msg.get("id") or d.get("uuid")
            if chave in vistos:
                continue
            vistos.add(chave)
            chamadas += 1
            if msg.get("model"):
                modelos.add(msg["model"])
            for c in CAMPOS:
                total[c] += int(uso.get(c) or 0)
    total["chamadas"] = chamadas
    total["modelos"] = sorted(modelos)
    total["total"] = sum(total[c] for c in CAMPOS)
    return total


def agentes(sessao):
    linhas = [dict(agente="coordenador (sessão principal)", descricao="", **somar(sessao))]
    pasta_sub = os.path.join(sessao[: -len(".jsonl")], "subagents")
    subs = sorted(glob.glob(os.path.join(pasta_sub, "agent-*.jsonl")), key=os.path.getmtime)
    for arq in subs:
        meta = {}
        try:
            with open(arq[: -len(".jsonl")] + ".meta.json", encoding="utf-8") as f:
                meta = json.load(f)
        except (OSError, ValueError):
            pass
        nome = meta.get("agentType") or os.path.basename(arq)[6:-6]
        descricao = meta.get("description", "").replace("|", "/")
        linhas.append(dict(agente=nome, descricao=descricao, **somar(arq)))
    return linhas


def fmt(n):
    return f"{n:,}".replace(",", ".")


def markdown(linhas, sessao):
    out = [
        "# Consumo de tokens",
        "",
        f"Sessão: `{os.path.basename(sessao)[:-6]}`  ",
        f"Gerado em: {datetime.now():%Y-%m-%d %H:%M}  ",
        "Fonte: logs locais do Claude Code. Com assinatura, isto consome cota, não dinheiro.",
        "",
        "| Agente | Tarefa | Chamadas | Entrada | Cache (escrita) | Cache (leitura) | Saída | Total | Modelo |",
        "|--------|--------|---------:|--------:|----------------:|----------------:|------:|------:|--------|",
    ]
    soma = dict.fromkeys(CAMPOS + ("chamadas", "total"), 0)
    por_agente = {}
    for l in linhas:
        out.append(
            f"| {l['agente']} | {l['descricao']} | {l['chamadas']} | {fmt(l['input_tokens'])} | "
            f"{fmt(l['cache_creation_input_tokens'])} | {fmt(l['cache_read_input_tokens'])} | "
            f"{fmt(l['output_tokens'])} | {fmt(l['total'])} | {', '.join(l['modelos'])} |"
        )
        for c in soma:
            soma[c] += l[c]
        por_agente[l["agente"]] = por_agente.get(l["agente"], 0) + l["total"]
    out.append(
        f"| **Total** | | {soma['chamadas']} | {fmt(soma['input_tokens'])} | "
        f"{fmt(soma['cache_creation_input_tokens'])} | {fmt(soma['cache_read_input_tokens'])} | "
        f"{fmt(soma['output_tokens'])} | **{fmt(soma['total'])}** | |"
    )
    out += ["", "## Por agente (somando chamadas repetidas)", "", "| Agente | Total | % |", "|--------|------:|--:|"]
    for nome, tot in sorted(por_agente.items(), key=lambda x: -x[1]):
        pct = 100 * tot / soma["total"] if soma["total"] else 0
        out.append(f"| {nome} | {fmt(tot)} | {pct:.0f}% |")
    out += [
        "",
        "Leitura de cache custa bem menos cota do que entrada nova. "
        "Para comparar agentes, olhe principalmente Entrada, Cache (escrita) e Saída.",
        "",
    ]
    return "\n".join(out)


def main():
    p = argparse.ArgumentParser(description="Consumo de tokens por agente (logs locais do Claude Code).")
    p.add_argument("--sessao", help="ID da sessão (padrão: a mais recente deste projeto)")
    p.add_argument("--projeto", default=os.getcwd(), help="Pasta do projeto (padrão: pasta atual)")
    p.add_argument("--saida", help="Grava o relatório em Markdown neste arquivo")
    p.add_argument("--json", action="store_true", help="Imprime JSON em vez de Markdown")
    p.add_argument("--listar", action="store_true", help="Lista as sessões deste projeto")
    a = p.parse_args()

    pasta = pasta_projeto(a.projeto)
    todas = sessoes(pasta)
    if not todas:
        sys.exit(f"Nenhuma sessão encontrada em {pasta}. Rode dentro da pasta do projeto ou use --projeto.")

    if a.listar:
        for s in todas:
            print(f"{datetime.fromtimestamp(os.path.getmtime(s)):%Y-%m-%d %H:%M}  {os.path.basename(s)[:-6]}")
        return

    sessao = todas[0]
    if a.sessao:
        sessao = os.path.join(pasta, a.sessao + ".jsonl")
        if not os.path.exists(sessao):
            sys.exit(f"Sessão não encontrada: {sessao}")

    linhas = agentes(sessao)
    if a.json:
        texto = json.dumps({"sessao": os.path.basename(sessao)[:-6], "agentes": linhas}, ensure_ascii=False, indent=2)
    else:
        texto = markdown(linhas, sessao)

    if a.saida:
        os.makedirs(os.path.dirname(os.path.abspath(a.saida)), exist_ok=True)
        with open(a.saida, "w", encoding="utf-8") as f:
            f.write(texto + "\n")
        print(f"Relatório gravado em {a.saida}")
    else:
        print(texto)


if __name__ == "__main__":
    main()
