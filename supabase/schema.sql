-- The AI Footprint Meter — handtekeningen
-- Draai dit in de SQL-editor van een Supabase-project in regio EU (Frankfurt).

create extension if not exists pgcrypto;

create table if not exists public.signatures (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null check (char_length(name) between 2 and 120),
  email         text        not null unique check (char_length(email) <= 200),
  newsletter    boolean     not null default false,
  confirm_token text,
  confirmed_at  timestamptz,
  created_at    timestamptz not null default now(),
  ip_hash       text,
  user_agent    text
);

create index if not exists signatures_confirmed_idx on public.signatures (confirmed_at);
create unique index if not exists signatures_token_idx
  on public.signatures (confirm_token) where confirm_token is not null;

-- Row level security aan, en met opzet géén policies:
-- alleen de service_role sleutel (server-side) komt bij deze tabel.
alter table public.signatures enable row level security;

-- Onbevestigde handtekeningen ouder dan 48 uur opruimen.
-- Koppel dit aan pg_cron, of draai het met de hand.
create or replace function public.prune_unconfirmed()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.signatures
   where confirmed_at is null
     and created_at < now() - interval '48 hours';
  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- Dagelijks opruimen (vereist de pg_cron extensie):
-- select cron.schedule('prune-unconfirmed', '0 4 * * *', $$select public.prune_unconfirmed()$$);
