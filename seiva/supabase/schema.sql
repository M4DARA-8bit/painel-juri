-- Seiva — esquema do catálogo.
-- O site roda sem banco: os dados vivem em src/data/plantas.ts.
-- Este arquivo existe para quando o catálogo passar a ser editado por outra
-- pessoa, ou quando pedidos reais forem gravados.
-- Aplicar com: psql "$SUPABASE_DB_URL" -f supabase/schema.sql

create extension if not exists "pgcrypto";

create table if not exists public.plantas (
  id                text primary key,
  nome              text not null,
  cientifico        text not null,
  resumo            text not null,
  arquetipo         text not null,
  dificuldade       smallint not null check (dificuldade between 1 and 3),
  preco_base        numeric(10, 2) not null check (preco_base >= 0),

  altura_min_cm     integer not null,
  altura_max_cm     integer not null,
  largura_min_cm    integer not null,
  largura_max_cm    integer not null,
  porte_classe      text not null check (porte_classe in ('pequeno', 'medio', 'grande')),
  porte_texto       text not null,

  rega_dias_min     integer not null,
  rega_dias_max     integer not null,
  rega_texto        text not null,
  rega_inverno      text not null,

  luz_nivel         smallint not null check (luz_nivel between 1 and 4),
  luz_horas_min     integer,
  luz_horas_max     integer,
  luz_texto         text not null,

  ambiente_interno  boolean not null default true,
  ambiente_externo  boolean not null default false,
  umidade_min_pct   integer,
  umidade_max_pct   integer,
  temp_min_c        integer,
  temp_max_c        integer,
  ambiente_texto    text not null,

  cheiro_tem        boolean not null default false,
  cheiro_nota       text not null,
  cheiro_intensidade smallint not null check (cheiro_intensidade between 0 and 3),
  cheiro_texto      text not null,

  agrega            text[] not null default '{}',
  agrega_texto      text not null,
  lugares           jsonb not null default '[]'::jsonb,
  lugares_texto     text not null,

  pet               text not null check (pet in ('seguro', 'atencao', 'toxico')),
  pet_texto         text not null,

  paleta            jsonb not null,
  criado_em         timestamptz not null default now()
);

-- Uma fonte pode servir a várias plantas (ASPCA, estudo da NASA, revisão de 2020).
create table if not exists public.fontes (
  id        text primary key,
  titulo    text not null,
  veiculo   text not null,
  url       text not null unique
);

-- Liga cada campo da ficha à fonte que sustenta aquele número.
create table if not exists public.planta_fontes (
  planta_id text not null references public.plantas (id) on delete cascade,
  fonte_id  text not null references public.fontes (id) on delete restrict,
  campo     text not null check (
    campo in ('porte', 'rega', 'luz', 'ambiente', 'cheiro', 'agrega', 'lugares', 'pet')
  ),
  primary key (planta_id, fonte_id, campo)
);

-- Montagem salva (vaso, suporte) e pedido. Só passam a ser usados quando
-- houver autenticação e pagamento ligados.
create table if not exists public.montagens (
  id          uuid primary key default gen_random_uuid(),
  planta_id   text not null references public.plantas (id),
  forma       text not null,
  material    text not null,
  cor         text not null,
  diametro_cm integer not null check (diametro_cm between 8 and 60),
  prato       boolean not null default true,
  suporte     text not null,
  preco       numeric(10, 2) not null,
  criada_em   timestamptz not null default now()
);

create table if not exists public.pedidos (
  id         uuid primary key default gen_random_uuid(),
  dono       uuid references auth.users (id) on delete set null,
  situacao   text not null default 'rascunho'
             check (situacao in ('rascunho', 'pago', 'em_preparo', 'enviado', 'cancelado')),
  total      numeric(10, 2) not null default 0,
  criado_em  timestamptz not null default now()
);

create table if not exists public.pedido_itens (
  id          uuid primary key default gen_random_uuid(),
  pedido_id   uuid not null references public.pedidos (id) on delete cascade,
  montagem_id uuid not null references public.montagens (id),
  quantidade  integer not null check (quantidade > 0)
);

create index if not exists plantas_luz_idx on public.plantas (luz_nivel);
create index if not exists plantas_porte_idx on public.plantas (porte_classe);
create index if not exists plantas_pet_idx on public.plantas (pet);
create index if not exists pedido_itens_pedido_idx on public.pedido_itens (pedido_id);

-- Catálogo é público para leitura; escrita só por quem tem a chave de serviço.
alter table public.plantas       enable row level security;
alter table public.fontes        enable row level security;
alter table public.planta_fontes enable row level security;
alter table public.montagens     enable row level security;
alter table public.pedidos       enable row level security;
alter table public.pedido_itens  enable row level security;

drop policy if exists "catalogo legivel" on public.plantas;
create policy "catalogo legivel" on public.plantas for select using (true);

drop policy if exists "fontes legiveis" on public.fontes;
create policy "fontes legiveis" on public.fontes for select using (true);

drop policy if exists "vinculos legiveis" on public.planta_fontes;
create policy "vinculos legiveis" on public.planta_fontes for select using (true);

-- Montagem pode ser criada por visitante (é só uma configuração), mas não lida em massa.
drop policy if exists "montagem pode ser criada" on public.montagens;
create policy "montagem pode ser criada" on public.montagens for insert with check (true);

drop policy if exists "pedido do dono" on public.pedidos;
create policy "pedido do dono" on public.pedidos
  for all using (auth.uid() = dono) with check (auth.uid() = dono);

drop policy if exists "itens do dono" on public.pedido_itens;
create policy "itens do dono" on public.pedido_itens
  for all using (
    exists (select 1 from public.pedidos p where p.id = pedido_id and p.dono = auth.uid())
  )
  with check (
    exists (select 1 from public.pedidos p where p.id = pedido_id and p.dono = auth.uid())
  );
