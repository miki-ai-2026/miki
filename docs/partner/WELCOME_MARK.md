# Welcome, Mark

A short guide to your first day. Anything marked [fill in] is for the founders to decide.

## MiKi in one paragraph

MiKi is building an AI team inside physical retail stores in Kenya: one personal agent for each store
manager, backed by Security, Operations and Customer Care agents, working from the CCTV a store
already has. The store product is not built. What exists is the public website, a private team console
with sign-in, and an early-access list stored in Supabase.

## Day one

1. Accept your invitations (GitHub, Vercel, Supabase if invited). Turn on two-factor authentication.
2. Install Git, a current Node.js LTS and pnpm.
3. Clone and run it (`docs/SETUP.md`). Nobody should paste secrets into chat.
4. Read `CLAUDE.md`, then `docs/PROJECT_OVERVIEW.md` and `docs/ARCHITECTURE.md`.
5. Give your own Claude the context: `PROMPT_claude-chat.md` with `MIKI_CONTEXT_PACK.md`, or
   `PROMPT_claude-code.md` if you use Claude Code inside the repo.

## Your own Supabase project (recommended)

Create a free project, apply the files in `supabase/migrations/` in order, create your own user and
make yourself owner (SQL in `docs/DATABASE.md`), and use your own keys in `.env.local`. Create it with
automatic RLS on and "automatically expose new tables" off. The free plan limits how many projects an
account can have: check the current limit.

## How we work

- Never push to `main`. One branch per change, then a pull request.
- The other builder reviews each pull request. Enforcing this with GitHub branch protection depends
  on the plan (unverified): check the repository settings.
- Check `docs/ROADMAP.md` before starting and `docs/CHANGELOG.md` after finishing.

| Area | Where | Owner |
|------|-------|-------|
| Website pages and copy | `app/(site)`, `components/site` | [fill in] |
| Console, sign-in, database | `app/(platform)`, `lib/supabase`, `supabase/migrations` | [fill in] |
| API routes and integrations | `app/api` | [fill in] |

## Good first tasks (proposals; the founders decide)

1. Rate limiting or a bot check on `/api/early-access`.
2. Console: lead detail page with status changes and notes.
3. Console: search and CSV export.
4. Real social URLs in `components/site/SocialLinks.tsx`; a square favicon.

## What matters most

No secrets in git. No fake claims about the product. Every table has row level security. Ask when
unsure, and say when you are unsure.
