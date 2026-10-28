# MiKi platform: guide for AI assistants

Read this file first, then the files in `docs/`. `AGENTS.md` (created by create-next-app) holds
Next.js-specific agent rules; follow it too. Last updated: 2026-10-28.

## What this project is

MiKi AI (miki.ai, now miki.si) is building an AI-native operating system for physical retail in
Kenya: one personal AI agent for each store manager, backed by Security, Operations and Customer
Care agents, working from the CCTV a store already has. **The store product is not built yet.**
There is no finished product, demo or pilot. Never describe it as live.

This repository currently contains:
1. The public website (home page, privacy page, early-access form).
2. A private team console (sign-in, early-access leads list) backed by Supabase.
3. A `legacy/` folder with the original Vite landing page, kept only until the port is verified.

## Stack

Next.js 16 (App Router, TypeScript, Cache Components enabled), React 19, Tailwind CSS 4 (platform
area only), Supabase (Postgres, Auth, row level security), pnpm, Vercel for hosting.

## Commands

```bash
pnpm install        # install dependencies
pnpm dev            # http://localhost:3000
pnpm build          # production build: run before every commit
```

Environment variable names are in `.env.example`. Values live in `.env.local` (git-ignored).

## Non-negotiable rules

1. **No secrets in git.** Never commit `.env.local`. `SUPABASE_SECRET_KEY` is server-only: no
   `NEXT_PUBLIC_` prefix, never imported in client code.
2. **Every table has row level security** and explicit grants. New tables come from a migration
   file in `supabase/migrations/`, and `docs/DATABASE.md` is updated in the same change.
3. **Public input never writes to the database directly.** It goes through a server route that
   validates it (see `app/api/early-access/route.ts`).
4. **Never push to `main`.** Work on a feature branch and open a pull request. Production deploys
   from `main` once the Vercel project is switched to Next.js (see `docs/ROADMAP.md`).
5. **Site and platform areas stay separate.** The site (`app/(site)`) uses plain CSS; the platform
   (`app/(platform)`) uses Tailwind. Links between them are plain `<a>` tags (full page load), not
   `next/link`, so the stylesheets never mix.
6. **Cache Components rules.** Anything reading cookies or headers (including the Supabase server
   client) must sit inside `<Suspense>`. Avoid `Date.now()` or randomness while rendering static
   parts. `app/(platform)/console/layout.tsx` opts out of instant-navigation validation because it
   needs the session on every request.
7. **Do not invent facts.** No fake customers, metrics or capabilities. The website demo is
   scripted and labelled illustrative. Say "I am not sure" and list what needs researching.
8. **Agents propose, humans approve.** Anything sent outside (posts, messages, emails) needs a
   human approval step. No auto-replies on social media.
9. **Tone.** Plain, concrete, no hype. MiKi supports teams; it does not watch them.

## Working with the owner

The owner is a first-time founder building by hand with AI guidance on Windows (Git Bash).
Give small steps with exact file paths and commands, explain why, and ask them to paste output
before moving on. Verify third-party behaviour against current documentation and cite it.
Flag uncertainty instead of guessing.

## Documentation map

- `docs/PROJECT_OVERVIEW.md`: product concept, users, principles, brand, status.
- `docs/ARCHITECTURE.md`: structure, routes, data flows, security model.
- `docs/DATABASE.md`: schema, policies, migrations.
- `docs/DECISIONS.md`: why things are the way they are.
- `docs/ROADMAP.md`: what is done, in progress and next.
- `docs/SETUP.md`: run it locally, accounts, troubleshooting.
- `docs/OPEN_QUESTIONS.md`: unverified claims and pending decisions.
- `docs/PARTNER_HANDOFF.md`: onboarding a new developer, plus a prompt for their AI assistant.
