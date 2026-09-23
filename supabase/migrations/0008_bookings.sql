-- Read cache of Calendly bookings for the admin dashboard. Calendly stays the
-- system of record; nothing writes into this table yet (see app/book/page.tsx
-- and the admin Bookings page) until a Calendly plan tier is confirmed and
-- either a webhook or client-capture sync is added. Created now so the
-- schema is ready without a further migration when that lands.

create type public.booking_status as enum ('active', 'canceled');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  calendly_event_uri text not null unique,
  invitee_name text not null,
  invitee_email text not null,
  event_type_name text,
  start_time timestamptz not null,
  end_time timestamptz,
  status public.booking_status not null default 'active',
  source text not null default 'webhook',
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create index bookings_start_time_idx on public.bookings (start_time desc);

alter table public.bookings enable row level security;
