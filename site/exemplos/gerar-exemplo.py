#!/usr/bin/env python3
"""Gera uma planilha de exemplo do módulo Emissão, com dados inventados.

As planilhas reais trazem razão social, CNPJ e faturamento de fornecedores de
verdade, então não entram no repositório. Este arquivo existe para alguém abrir
o site e ver como ele funciona sem precisar de dado sensível.

    python3 exemplos/gerar-exemplo.py
"""
import random
from datetime import date, timedelta

try:
    import openpyxl
except ImportError:
    raise SystemExit("Precisa do openpyxl:  pip install openpyxl")

ANO = 2026
FILIAIS = ["UNIDADE CENTRO", "UNIDADE NORTE", "UNIDADE SUL", "UNIDADE LESTE",
           "UNIDADE OESTE", "UNIDADE PORTO", "UNIDADE SERRA"]
# peso de cada filial: desequilíbrio parecido com o da base real
PESO_FILIAL = [30, 18, 14, 12, 11, 9, 6]
RESPONSAVEIS = ["ANA.MOURA", "BRUNO.LIMA", "CARLA.REIS", "DIEGO.SOUTO", "ELISA.PRADO",
                "FABIO.NUNES", "GISELE.ARAUJO", "HENRIQUE.SA", "IVONE.CAMPOS"]
PESO_RESP = [28, 20, 15, 11, 8, 6, 5, 4, 3]
SOLICITANTES = ["ALMOXARIFADO CENTRO", "ALMOXARIFADO NORTE", "FROTA", "TI",
                "INFRAESTRUTURA", "FACILITIES", "JURIDICO"]
SITUACOES = ["Conferida"] * 74 + ["Aguardando envio"] * 14 + \
            ["Parcialmente Conferida"] * 6 + ["Encerrada"] * 4 + ["Aguardando Aprovação"] * 2
FORNECEDORES = [f"FORNECEDOR EXEMPLO {i:02d} LTDA" for i in range(1, 31)]

# volume por mês; set em diante vazio, para mostrar o mês zerado no gráfico
POR_MES = [132, 118, 151, 129, 117, 144, 138, 136, 9, 0, 0, 0]


def gerar(caminho="exemplos/exemplo-emissao.xlsx", semente=20261110):
    rnd = random.Random(semente)
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Base OCs"
    ws.append(["NOME", "DATA", "FORNECEDOR", "SOLICITANTE", "SITUAÇÃO",
               "DATA ENTREGA", "FILIAL", "CRIADO POR"])

    n = 0
    for mes, qtd in enumerate(POR_MES, start=1):
        for _ in range(qtd):
            n += 1
            dia = rnd.randint(1, 28)
            d = date(ANO, mes, dia)
            ws.append([
                f"OC-{100000 + n:06d}",
                d,
                rnd.choice(FORNECEDORES),
                rnd.choice(SOLICITANTES),
                rnd.choice(SITUACOES),
                d + timedelta(days=rnd.choice([0, 0, 1, 3, 7, 15, 30])),
                rnd.choices(FILIAIS, weights=PESO_FILIAL)[0],
                rnd.choices(RESPONSAVEIS, weights=PESO_RESP)[0],
            ])

    # algumas OCs do ano anterior, para o filtro de ano ter o que mostrar
    for i in range(140):
        d = date(ANO - 1, rnd.randint(1, 12), rnd.randint(1, 28))
        ws.append([f"OC-{90000 + i:06d}", d, rnd.choice(FORNECEDORES),
                   rnd.choice(SOLICITANTES), rnd.choice(SITUACOES),
                   d + timedelta(days=rnd.choice([0, 1, 5, 20])),
                   rnd.choices(FILIAIS, weights=PESO_FILIAL)[0],
                   rnd.choices(RESPONSAVEIS, weights=PESO_RESP)[0]])

    for col, larg in zip("ABCDEFGH", [14, 12, 34, 24, 23, 14, 20, 18]):
        ws.column_dimensions[col].width = larg
    ws.freeze_panes = "A2"
    wb.save(caminho)
    print(f"{caminho}: {ws.max_row - 1} linhas, {sum(POR_MES)} OCs em {ANO}")


if __name__ == "__main__":
    gerar()
