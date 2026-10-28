# MiKi Repository Structure Guide

This document explains where different types of files belong in the repository. When in doubt, follow the patterns established by existing files.

## Top-Level Directories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js 16 App Router. Contains `(site)` and `(platform)` route groups. |
| `components/` | React components. Subdirectories organize by area. |
| `lib/` | Shared utilities, helpers, and clients. |
| `supabase/` | Supabase configuration, migrations, and types. |
| `docs/` | Project documentation (README, CLAUDE, ARCHITECTURE, etc.). |
| `assets/` | Static images, fonts, and other assets served to the browser. |
| `legacy/` | Original Vite landing page (kept temporarily per D13). |
| `api/` | Route handlers (app router API routes). |
| `node_modules/` | Dependencies (git-ignored). |
| `.next/` | Next.js build output (git-ignored). |

## `app/` — Next.js App Router

**Route groups** (do not appear in URLs, each loads only its own CSS):

- **`app/(site)/`** — Public website. Uses plain CSS (`site.css`, `globals.css` is NOT loaded).
  - `layout.tsx` — Wraps content in `<div id="top">`, includes no-JS fallback styles.
  - `page.tsx` — Home page composed from `components/site/*`.
  - `privacy/page.tsx` — Draft privacy page.
  - `site.css` — Design system for the website.

- **`app/(platform)/`** — Private team console. Uses Tailwind CSS (imported via `globals.css`).
  - `layout.tsx` — Imports `globals.css`, sets `export const instant = false`.
  - `login/` — Email/password sign-in page.
  - `console/` — Auth-gated team console (leads list, protected by `<Suspense>` session gate).

- **`app/api/`** — Serverless API routes (Next.js 16).
  - Route handlers are `POST`/`GET` functions in `route.ts` files.
  - Use `createAdminClient()` for operations bypassing RLS (secret key only).
  - Use `createServerClient()` for authenticated user operations.

**Root `app/layout.tsx`** — Global layout: Geist font, metadata, `<html>`/`<body>`. Do not put page-specific content here.

## `components/` — React Components

**`components/site/`** — Public website components.
- **Server components** (no `'use client'` at top): `Footer`, `SocialLinks`.
- **Client components** (have `'use client'`): `Header`, `HeroCanvas`, `Reveal`, `BlurText`, `LearnedPanel`, `DemoChat`, `Faq`, `JoinForm`.
- Components that render only when there's a URL: `SocialLinks` (filters out empty `href`).

**`components/platform/`** — (If needed) Private area components using Tailwind. Currently platform UI is split between `app/(platform)/` route folders and shared utils in `lib/`.

**Component naming convention**: PascalCase for components (`Header.tsx`, `JoinForm.tsx`). Hooks use camelCase (`useSomething.ts`).

## `lib/` — Utilities and Clients

**`lib/supabase/`** — Supabase clients (ONLY go here).

- `client.ts` — `createBrowserClient()` for use in browser/components.
- `server.ts` — `createServerClient()` for Server Components and server routes (reads cookies).
- `admin.ts` — `createClient()` with `server-only` pragma + `SUPABASE_SECRET_KEY`. **Never import in client code.** Used for admin operations (like `/api/early-access` insert).
- `proxy.ts` — Next.js 16 proxy that refreshes Supabase session on each request.

**Other `lib/` files** — General utilities, helpers, types. If a file is used by both server and client, place it here and document its usage.

## `supabase/` — Database and Auth Configuration

**`supabase/migrations/`** — SQL migration files.
- Name format: `YYYYMMDDHHMMSS_description.sql` (e.g., `20261027120000_init_profiles_leads.sql`).
- Each migration should: create table, enable RLS, revoke default grants, grant only what's needed, write policies.
- After creating a migration, update `docs/DATABASE.md`.

**`supabase/`** (root) — Contains the above `migrations/` folder. No other files typically go here.

## `app/api/` — API Routes

Each route is a `POST` or `GET` handler in `route.ts`.

- **Pattern**: `app/api/<route-name>/route.ts`
- **Auth patterns**:
  - Public form → use `createAdminClient()` (bypasses RLS with secret key).
  - Auth-required → use `createServerClient()` (reads session cookie).
- **Never** put secrets in route handlers. `SUPABASE_SECRET_KEY` must only be accessed in `lib/supabase/admin.ts`.

## `docs/` — Documentation

- `PROJECT_OVERVIEW.md` — Product concept, users, principles, brand, status.
- `ARCHITECTURE.md` — Structure, routes, data flows, security model.
- `DATABASE.md` — Schema, policies, migrations process.
- `DECISIONS.md` — Why things are the way they are.
- `ROADMAP.md` — What's done, in progress, and next.
- `SETUP.md` — Run locally, accounts, troubleshooting.
- `OPEN_QUESTIONS.md` — Unverified claims and pending decisions.
- `PARTNER_HANDOFF.md` — Onboarding guide + prompt for AI assistant.
- `structure.md` — This file (guiding where to put files).

**Never** edit documentation without updating the relevant code changes. When adding a new table/feature, update both the code AND the docs.

## `assets/` — Static Files

- Images used on the website: `/assets/*` (referenced via `/assets/filename.jpg` in JSX).
- Favicon, logos, and hero images live here.
- Referenced in JSX as `/assets/filename.jpg` (relative to repo root).

## `legacy/` — Original Vite Site

- Kept temporarily per D13 until the React port is verified in production.
- Do not add new functionality here. Delete after confirming the Next.js port works.

## Checklist: Adding Something New

| New element | Where it goes | Docs to update |
|-------------|--------------|----------------|
| New database table | `supabase/migrations/YYYYMMDDSSS_descr.sql` | `docs/DATABASE.md` |
| New table RLS policies | Same migration file | `docs/DATABASE.md` |
| New API route | `app/api/route.ts` | None (unless new env vars) |
| New component (site) | `components/site/ComponentName.tsx` | None |
| New component (platform) | `components/platform/` or `app/(platform)/` | None |
| New page (site) | `app/(site)/page.tsx` | `docs/ROADMAP.md` |
| New page (platform) | `app/(platform)/page.tsx` | `docs/ROADMAP.md` |
| New env var | `.env.example` (document only) | `docs/ARCHITECTURE.md` |
| New design decision | `docs/DECISIONS.md` | None |

## Common Pitfalls

1. **Two pages resolving to the same path** — Check that `app/(site)/page.tsx` and `app/(site)/some-page/page.tsx` don't both exist (breaks the build).
2. **Importing `admin.ts` in client code** — `admin.ts` has `import 'server-only'` and will fail in the browser. Use `lib/supabase/client.ts` for browser code.
3. **Forgetting `export const instant = false`** on console layout — The platform console needs session on every request, so it opts out of instant-navigation validation.
4. **Mixing site and platform styles** — Links between `(site)` and `(platform)` must be plain `<a>` tags (full page load), not `next/link`, so stylesheets don't mix.
5. **Cache Components session checks** — Anything reading cookies/headers (including Supabase server client) must sit inside `<Suspense>`.