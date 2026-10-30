# MiKi platform: guide for AI assistants

Read this file first, then `docs/`. `AGENTS.md` (written by Next.js tooling) says Next.js 16 here
differs from older versions, and that the matching guides are bundled in
`node_modules/next/dist/docs/`. Read the relevant guide before writing Next.js code.
Last updated: 2026-10-30.

## What this project is

MiKi AI (miki.ai, now miki.si) is building an AI-native operating system for physical retail in
Kenya: one personal AI agent for each store manager, backed by Security, Operations and Customer
Care agents, working from the CCTV a store already has.

**The store product is not built.** There is no finished product, demo or pilot. Never describe it
as live. This repository holds only:

1. The public website: home page, privacy page, early-access form.
2. A private team console: sign-in and the early-access leads list, backed by Supabase.

## Status snapshot (2026-10-30)

- Shipped to `main`: Next.js app, Supabase schema (`profiles`, `leads`), sign-in, console,
  `/api/early-access`, the React landing page, documentation.
- Being sorted out: Vercel deployment (a bad `vercel.json` failed deployments; fixed in the repo,
  dashboard settings still to be confirmed) and removing a duplicate Vercel project.
- Not started: anything about cameras, agents, WhatsApp or multi-store data.
- Two people now build this: the owner and Mark, who joined on 2026-10-28.

## Stack

Next.js 16.4 (App Router, TypeScript, Cache Components enabled), React 19, Tailwind CSS 4
(platform area only), Supabase (Postgres, Auth, row level security; `supabase-js` 2.x and
`@supabase/ssr`), pnpm 11, Vercel.

## Commands

```bash
pnpm install    # dependencies
pnpm dev        # http://localhost:3000
pnpm build      # production build: run before every commit
```

Environment variable names are in `.env.example`. Values live in `.env.local` (git-ignored).

## Rules

1. **No secrets in git.** Never commit `.env.local`. `SUPABASE_SECRET_KEY` is server-only: no
   `NEXT_PUBLIC_` prefix, never imported in client code. Never ask a person to paste a key.
2. **Every table has row level security** and explicit grants. New tables come from a migration in
   `supabase/migrations/`, and `docs/DATABASE.md` is updated in the same change.
3. **Public input never writes to the database directly.** It goes through a server route that
   validates it (see `app/api/early-access/route.ts`).
4. **Never push to `main`.** Branch, push, open a pull request, check the Vercel preview, merge.
5. **Two areas, two stylesheets.** The site (`app/(site)`) uses plain CSS; the platform
   (`app/(platform)`) uses Tailwind. Link between them with plain `<a>` tags, not `next/link`.
6. **Cache Components.** Anything reading cookies or headers (including the Supabase server
   client) must sit inside `<Suspense>`. Avoid `Date.now()` and randomness in statically rendered
   parts. `app/(platform)/console/layout.tsx` exports `instant = false` because it needs the
   session on every request.
7. **Vercel config.** `vercel.json` may hold only valid properties (now `$schema` and
   `framework`). Root directory and similar options are dashboard settings. Keep exactly one
   Vercel project connected to this repository.
8. **Do not invent facts.** No fake customers, metrics or capabilities. The website demo is scripted
   and labelled illustrative. If unsure, say so and list what needs checking, with sources.
9. **Agents propose, humans approve.** Anything sent outside (posts, messages, emails) needs a
   human approval step. No auto-replies on social media.
10. **Tone.** Plain and concrete, no hype. MiKi supports teams; it does not watch them.

## Working with the builders

Builders work on Windows with Git Bash, and some are first-time founders. Give small steps with
exact paths and commands, explain why, and ask for pasted output before the next step. Verify
third-party behaviour against current documentation and cite it. Prefer one clear recommendation
over a menu of options.

## Keeping the docs true

After meaningful work, update `docs/CHANGELOG.md` and, when relevant, `docs/ROADMAP.md`,
`docs/DECISIONS.md`, `docs/DATABASE.md` and `docs/OPEN_QUESTIONS.md`. Code and docs must agree. If
they do not, say so and fix the docs.

## Documentation map

| File | Purpose |
|------|---------|
| `docs/PROJECT_OVERVIEW.md` | Product concept, users, principles, brand |
| `docs/ARCHITECTURE.md` | Structure, routes, data flows, security model |
| `docs/DATABASE.md` | Schema, policies, migrations |
| `docs/DECISIONS.md` | Why things are the way they are |
| `docs/ROADMAP.md` | Done, in progress, next |
| `docs/CHANGELOG.md` | Dated log of what changed |
| `docs/SETUP.md` | Run it locally, Vercel and Supabase settings, troubleshooting |
| `docs/OPEN_QUESTIONS.md` | Unverified claims and pending decisions |
| `docs/PARTNER_HANDOFF.md` | Onboarding a developer and their AI assistant |
| `docs/partner/` | Welcome note and ready-to-paste prompts |
| `structure.md` | Where files belong |
