create type public.enquiry_status as enum ('new', 'read', 'archived');

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create index enquiries_status_created_idx on public.enquiries (status, created_at desc);

alter table public.enquiries enable row level security;
