# Bibliotecas de terceiros

Ficam versionadas aqui, dentro do repositório, em vez de vir de CDN. Assim a página abre
sem internet, sem depender do proxy da empresa e sem etapa de build.

| Arquivo | Biblioteca | Versão | Licença |
|---|---|---|---|
| `xlsx.full.min.js` | SheetJS (community) | 0.18.5 | Apache-2.0 |
| `chart.umd.js` | Chart.js | 4.4.1 | MIT |

Obtidas do registro npm (`npm pack xlsx@0.18.5 chart.js@4.4.1`), arquivo `package/dist/` de cada uma.

## Nota sobre a versão do SheetJS

O plano previa a 0.20.x, que só é distribuída em `cdn.sheetjs.com`. Esse host é bloqueado pelo
proxy deste ambiente (CONNECT 403), e `cdnjs.cloudflare.com` também. A última versão publicada no
npm é a **0.18.5**, que é a usada aqui.

A 0.18.5 tem o **CVE-2023-30533** (prototype pollution ao abrir planilha criada para explorar a
falha), corrigido a partir da 0.19.3. O risco é aceitável neste contexto: a página é uma ferramenta
local, roda sem servidor, e só processa planilha que a própria pessoa abre do seu disco. Não há
nenhum caminho em que um terceiro forneça o arquivo.

**Para atualizar**, num ambiente com acesso a `cdn.sheetjs.com`:

```bash
curl -o xlsx.full.min.js https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js
```

Nenhuma mudança de código é necessária: a API usada (`XLSX.read`, `XLSX.utils.sheet_to_json`,
`XLSX.writeFile`) é a mesma nas duas versões.
