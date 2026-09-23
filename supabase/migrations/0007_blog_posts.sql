create type public.post_status as enum ('draft', 'published');

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_json jsonb not null,
  cover_image_url text,
  tags text[] not null default '{}',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  meta_title text,
  meta_description text,
  og_image_url text,
  canonical_url text,
  author_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_status_published_idx on public.blog_posts (status, published_at desc);

create trigger set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

alter table public.blog_posts enable row level security;
