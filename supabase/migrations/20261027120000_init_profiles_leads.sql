-- MiKi platform: first migration
-- Creates: profiles (team members) and leads (early-access list)
-- Safe to re-run in the dev project. Review before running in production.

-- ---------------------------------------------------------------
-- 1. Helper: keep updated_at current
-- ---------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------
-- 2. profiles: one row per team member (linked to Supabase Auth)
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text,
  role       text not null default 'member' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_full_name_length check (full_name is null or char_length(full_name) <= 200)
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create a profile automatically whenever a user is added in Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users that already exist (for example, you).
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- ---------------------------------------------------------------
-- 3. Role helpers used by the security policies
-- ---------------------------------------------------------------
create or replace function public.is_team_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles where id = (select auth.uid())
  );
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'owner'
  );
$$;

-- Only signed-in users may call the helpers; the trigger function is internal.
revoke execute on function public.is_team_member() from public, anon;
revoke execute on function public.is_owner() from public, anon;
grant execute on function public.is_team_member() to authenticated;
grant execute on function public.is_owner() to authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- ---------------------------------------------------------------
-- 4. leads: the early-access list
-- Website visitors never write here directly. The website form posts to
-- a server route that validates input and inserts using the secret key.
-- ---------------------------------------------------------------
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  name       text,
  company    text,
  stores     text,
  message    text,
  source     text not null default 'website',
  status     text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_email_format check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint leads_email_length check (char_length(email) <= 254),
  constraint leads_name_length check (name is null or char_length(name) <= 200),
  constraint leads_company_length check (company is null or char_length(company) <= 200),
  constraint leads_stores_length check (stores is null or char_length(stores) <= 50),
  constraint leads_message_length check (message is null or char_length(message) <= 2000),
  constraint leads_notes_length check (notes is null or char_length(notes) <= 5000)
);

-- One lead per email address, ignoring upper/lower case.
create unique index if not exists leads_email_unique on public.leads (lower(email));
create index if not exists leads_status_created_idx on public.leads (status, created_at desc);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- 5. Row level security
-- ---------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.leads    enable row level security;

-- Start from zero access, then grant only what is needed.
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.leads    from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;  -- role cannot be changed from the app
grant select, insert, update, delete on public.leads to authenticated;
grant all on public.profiles to service_role;
grant all on public.leads    to service_role;

-- profiles
drop policy if exists "Team members read profiles" on public.profiles;
create policy "Team members read profiles"
  on public.profiles for select to authenticated
  using ((select public.is_team_member()));

drop policy if exists "Users update their own profile" on public.profiles;
create policy "Users update their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- leads (anonymous visitors have no policy, so they have no access)
drop policy if exists "Team members read leads" on public.leads;
create policy "Team members read leads"
  on public.leads for select to authenticated
  using ((select public.is_team_member()));

drop policy if exists "Team members add leads" on public.leads;
create policy "Team members add leads"
  on public.leads for insert to authenticated
  with check ((select public.is_team_member()));

drop policy if exists "Team members update leads" on public.leads;
create policy "Team members update leads"
  on public.leads for update to authenticated
  using ((select public.is_team_member()))
  with check ((select public.is_team_member()));

drop policy if exists "Owners delete leads" on public.leads;
create policy "Owners delete leads"
  on public.leads for delete to authenticated
  using ((select public.is_owner()));
