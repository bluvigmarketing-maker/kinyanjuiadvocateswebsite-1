-- Singleton table for firm-wide details shown in the header/footer/contact
-- page/metadata. Real columns (not JSONB) because these fields are read on
-- every page render and need NOT NULL guarantees.

create table public.firm_info (
  id smallint primary key default 1 check (id = 1),
  name text not null,
  short_name text not null,
  tagline text not null,
  founded_year int not null,
  address_line1 text not null,
  address_line2 text not null,
  phone text not null,
  emails text[] not null default '{}',
  office_hours text not null default 'Monday – Friday, 8:00am – 5:00pm',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create trigger set_updated_at
  before update on public.firm_info
  for each row execute function public.set_updated_at();

alter table public.firm_info enable row level security;
