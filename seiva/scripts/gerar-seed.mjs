/**
 * Gera supabase/seed.sql a partir de src/data/plantas.ts.
 * Uso: node --experimental-strip-types scripts/gerar-seed.mjs
 * (Node 22 lê TypeScript direto com essa flag.)
 */
import { writeFileSync } from 'node:fs'
import { plantas } from '../src/data/plantas.ts'

const txt = (v) => (v === null || v === undefined ? 'null' : `'${String(v).replace(/'/g, "''")}'`)
const bool = (v) => (v ? 'true' : 'false')
const num = (v) => (v === null || v === undefined ? 'null' : String(v))
const arr = (v) => `array[${v.map(txt).join(', ')}]::text[]`
const json = (v) => `${txt(JSON.stringify(v))}::jsonb`

const linhas = ['-- Gerado por scripts/gerar-seed.mjs. Não edite à mão.', 'begin;']

const fontes = new Map()
for (const p of plantas) for (const f of p.fontes) fontes.set(f.id, f)

for (const f of fontes.values()) {
  linhas.push(
    `insert into public.fontes (id, titulo, veiculo, url) values (${txt(f.id)}, ${txt(f.titulo)}, ${txt(
      f.veiculo,
    )}, ${txt(f.url)}) on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;`,
  )
}

for (const p of plantas) {
  const v = p.porte.valor
  linhas.push(
    `insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 ${txt(p.id)}, ${txt(p.nome)}, ${txt(p.cientifico)}, ${txt(p.resumo)}, ${txt(p.arquetipo)}, ${p.dificuldade}, ${p.precoBase},
 ${v.alturaCm[0]}, ${v.alturaCm[1]}, ${v.larguraCm[0]}, ${v.larguraCm[1]}, ${txt(v.classe)}, ${txt(p.porte.texto)},
 ${p.rega.valor.diasEntreRegas[0]}, ${p.rega.valor.diasEntreRegas[1]}, ${txt(p.rega.texto)}, ${txt(p.rega.valor.inverno)},
 ${p.luz.valor.nivel}, ${num(p.luz.valor.horasSolDireto?.[0])}, ${num(p.luz.valor.horasSolDireto?.[1])}, ${txt(p.luz.texto)},
 ${bool(p.ambiente.valor.interno)}, ${bool(p.ambiente.valor.externo)}, ${num(p.ambiente.valor.umidadePct?.[0])}, ${num(
      p.ambiente.valor.umidadePct?.[1],
    )}, ${num(p.ambiente.valor.tempC?.[0])}, ${num(p.ambiente.valor.tempC?.[1])}, ${txt(p.ambiente.texto)},
 ${bool(p.cheiro.valor.tem)}, ${txt(p.cheiro.valor.nota)}, ${p.cheiro.valor.intensidade}, ${txt(p.cheiro.texto)},
 ${arr(p.agrega.valor)}, ${txt(p.agrega.texto)}, ${json(p.lugares.valor)}, ${txt(p.lugares.texto)},
 ${txt(p.pet.valor)}, ${txt(p.pet.texto)}, ${json(p.paleta)})
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;`,
  )
  for (const campo of ['porte', 'rega', 'luz', 'ambiente', 'cheiro', 'agrega', 'lugares', 'pet']) {
    for (const idFonte of p[campo].fontes) {
      linhas.push(
        `insert into public.planta_fontes (planta_id, fonte_id, campo) values (${txt(p.id)}, ${txt(
          idFonte,
        )}, ${txt(campo)}) on conflict do nothing;`,
      )
    }
  }
}

linhas.push('commit;')
writeFileSync(new URL('../supabase/seed.sql', import.meta.url), linhas.join('\n') + '\n')
console.log(`seed.sql gerado: ${plantas.length} plantas, ${fontes.size} fontes.`)
