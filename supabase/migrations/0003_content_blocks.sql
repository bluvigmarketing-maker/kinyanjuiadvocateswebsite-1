-- One JSONB row per singleton page section (home hero, about "who we are",
-- contact hero copy, etc.). Shape of `content` for each (page, section_key)
-- pair is defined once in lib/content-schemas.ts (zod) and shared by the
-- admin form and the public query mapper.

create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  content jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  unique (page, section_key)
);

create trigger set_updated_at
  before update on public.content_blocks
  for each row execute function public.set_updated_at();

alter table public.content_blocks enable row level security;
