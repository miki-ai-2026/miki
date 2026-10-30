# Database

Postgres on Supabase. Migrations live in `supabase/migrations/` and are applied by pasting each file
into the Supabase SQL Editor, in order (the CLI is not set up). Every table has RLS enabled, starts
from zero access (`revoke all` from `anon` and `authenticated`), then grants only what is needed.
The dev project was created with automatic RLS on and "automatically expose new tables" off.

## Tables

### `public.profiles` (team members)

`id` (uuid, PK, references `auth.users`), `email`, `full_name`, `role` (`owner` | `member`, default
`member`), `created_at`, `updated_at`. A trigger on `auth.users` creates a profile for each new user.

- Policies: team members read all profiles; users update their own row.
- Grants: `authenticated` gets `select` and `update (full_name)` only, so a role cannot be changed
  from the app. Change roles in the SQL Editor.

### `public.leads` (early-access list)

`id` (uuid), `email` (unique, case-insensitive), `name`, `company`, `stores`, `message`, `source`
(default `website`), `status` (`new` | `contacted` | `qualified` | `closed`), `notes`, `created_at`,
`updated_at`. Check constraints limit email format and field lengths.

- Policies: team members select, insert and update; only owners delete. Anonymous has none.
- Website inserts happen in `/api/early-access` with the secret key.

## Functions

`set_updated_at()` and `handle_new_user()` are triggers. `is_team_member()` and `is_owner()` are
security-definer helpers used by policies; only signed-in users may call them. All use
`set search_path = ''`.

## Process for a new table

1. New file `supabase/migrations/YYYYMMDDHHMMSS_description.sql`.
2. Create the table, enable RLS, revoke default grants, grant only what is needed, write policies.
3. Run it in a dev project, then verify (queries below).
4. Update this file and add a line to `docs/CHANGELOG.md`.

## Useful queries

```sql
-- RLS must be true for every table
select tablename, rowsecurity from pg_tables where schemaname = 'public';
-- Policies
select tablename, policyname, cmd, roles from pg_policies where schemaname = 'public';
-- Make someone an owner
update public.profiles set role = 'owner' where email = 'person@example.com';
```

## Planned tables (not created)

`deals` and stages (design-partner pipeline), `content_items` and `approvals`, `agent_runs` and
`audit_log`, later `stores`, `staff`, `incidents`, `briefs`, `handovers`.
