create table public.practice_areas (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  order_index int not null default 0,
  title text not null,
  icon_name text not null,
  summary text not null,
  intro text not null,
  items text[] not null default '{}',
  closing text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create index practice_areas_order_idx on public.practice_areas (order_index);

create trigger set_updated_at
  before update on public.practice_areas
  for each row execute function public.set_updated_at();

alter table public.practice_areas enable row level security;
