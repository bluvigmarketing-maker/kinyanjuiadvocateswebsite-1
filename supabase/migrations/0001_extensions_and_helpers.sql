-- Extensions and shared helpers used by every later migration.

create extension if not exists "pgcrypto" with schema public;

-- Generic "bump updated_at on any UPDATE" trigger function, reused by every
-- table below that has an updated_at column.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
