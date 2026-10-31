# Architecture

## Layout

See `structure.md` for the file tree. In short:

- `app/(site)`: public website, plain CSS (`site.css`).
- `app/(platform)`: sign-in and console, Tailwind (`globals.css`).
- `app/api/early-access`: the only public write path.
- `lib/supabase`: four Supabase helpers (see below).
- `proxy.ts`: refreshes the Supabase session cookie on every request.

Route groups do not appear in URLs. They exist so each area loads only its own CSS. Links between
areas are plain `<a>` tags, so the page reloads and stylesheets never mix.

## Routes

| Path | Area | Notes |
|------|------|-------|
| `/` | site | Home page, static |
| `/privacy` | site | Draft privacy page (noindex) |
| `/login` | platform | Email + password sign-in, static shell |
| `/console` | platform | Auth-gated leads list, streamed per request |
| `/api/early-access` | api | POST only |

## Supabase helpers (`lib/supabase`)

- `client.ts`: browser client (publishable key). Used by the sign-in form and sign-out button.
- `server.ts`: server client reading the session cookie. Used by the console. RLS applies.
- `admin.ts`: server-only client with the secret key. Bypasses RLS. Used by `/api/early-access`.
- `proxy.ts`: `updateSession`, called from the root `proxy.ts`.

## Data flows

**Early-access sign-up.** `JoinForm` validates, then `POST /api/early-access`. The route parses
JSON, drops submissions where the hidden `website` field is filled (honeypot), validates the email,
and inserts into `public.leads` with the secret key. A duplicate email (unique index, Postgres error
23505) returns success so nothing leaks. Any other database error returns a generic 500.

**Team console.** The browser signs in with Supabase Auth. The proxy keeps the cookie fresh.
`console/layout.tsx` verifies the session with `getClaims()` inside `<Suspense>` and redirects to
`/login` otherwise. Queries run as the signed-in user, so row level security decides what is
visible.

## Security model

- RLS is on for every table. Anonymous visitors have no policies and therefore no access.
- Team members (a row in `profiles`) read and update leads. Only owners delete.
- The secret key bypasses RLS and exists only in server code and server environment variables.
- The layout redirect is a convenience; the database policies are the real protection.
- Public sign-ups are disabled in Supabase Auth. Admins create users in the dashboard.
- Still missing: rate limiting or a bot check on the public form.

## Cache Components

Enabled by the scaffold. Already handled: the console wraps its session check in `<Suspense>` and
exports `instant = false`; static pages contain no per-request data. Next.js docs for this version
are in `node_modules/next/dist/docs/`.

## Environment variables

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`.
Set locally in `.env.local` and in Vercel (Production and Preview). The proxy runs on every request,
so missing variables can break every page.

## Hosting

Vercel, framework Next.js, one project connected to this repository. `vercel.json` is minimal.
Supabase project `miki-dev` runs in West Europe (London); a separate production project is planned.

## Backend services (planned, built in stages)

- `services/api`: Go. Public intake with rate limiting, webhooks, notification delivery.
- `services/agents`: Python (FastAPI). Agents that draft; humans approve anything external.
- Both verify the caller's Supabase access token (public keys at
  `<project-url>/auth/v1/.well-known/jwks.json` when the project uses asymmetric signing keys;
  otherwise call the Auth server). Neither is trusted by default.
- The browser never receives a service secret.
