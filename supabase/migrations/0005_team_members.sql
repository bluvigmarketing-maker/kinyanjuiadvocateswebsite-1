create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  order_index int not null default 0,
  name text not null,
  role text not null,
  bio text[] not null default '{}',
  tags text[] not null default '{}',
  photo_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create index team_members_order_idx on public.team_members (order_index);

create trigger set_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

alter table public.team_members enable row level security;
