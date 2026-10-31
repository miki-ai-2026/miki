# Changelog

Newest first. One short entry per meaningful change: date, what, and why if not obvious.

## 2026-10-31

- Planned Go and Python backend services (D16).

## 2026-10-30

- Rewrote all documentation to match the code; added this changelog and `docs/partner/`.

## 2026-10-28

- Fixed failing Vercel deployments: removed the invalid `rootDirectory` property from `vercel.json`,
  set `framework: nextjs` (D14).
- Mark joined the project (D15).
- Merged PR #7 (`platform/foundation`) to `main`.
- Added documentation for AI assistants and partners (`CLAUDE.md`, `docs/`).

## 2026-10-27

- Ported the landing page to React components (route groups `(site)` and `(platform)`).
- Added sign-in, the console and `/api/early-access`.
- Applied the first migration: `profiles` and `leads` with row level security.
- Created the Supabase project `miki-dev` and scaffolded the Next.js app.

## 2026-10-26

- Moved the repository to `miki-ai-2026/miki`. Removed leftover tooling files, added a draft privacy
  page, and fixed bugs in the original Vite landing page (accessibility, animation, security).
