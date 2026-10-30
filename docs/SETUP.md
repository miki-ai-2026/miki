# Setup

## Prerequisites

Git, a current Node.js LTS, pnpm 11, and access to the GitHub repository, the Supabase project (or
your own, see below) and the Vercel project. Turn on two-factor authentication for all of them.

## First run

```bash
git clone https://github.com/miki-ai-2026/miki.git
cd miki
pnpm install
cp .env.example .env.local     # fill in the values; never paste them in chat
pnpm dev
```

Check `http://localhost:3000` (website), `/login` and `/console` (sign in with a user created in
Supabase), and submit the early-access form to see a lead appear in the console.

## Supabase

Project `miki-dev`, West Europe (London). Project settings -> API Keys has the publishable and secret
keys. Public sign-ups are off. Create users in Authentication -> Users, then set their role in the SQL
Editor (`docs/DATABASE.md`). Apply every file in `supabase/migrations/` in order.
To use your own project, create it with automatic RLS on and "automatically expose new tables" off,
apply the migrations, create your user, and set yourself as owner.

## Vercel

One project, connected to this repository. Settings: Framework Preset = Next.js, no Build or Output
Directory overrides, root directory blank. Environment Variables: add
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY` for
Production and Preview, and mark the secret key sensitive. Variable changes apply only to new
deployments, so redeploy afterwards. Read a failed deployment's log in the dashboard, or run
`npx vercel inspect <deployment-id> --logs`.

## Daily workflow

1. `git switch main && git pull`, then `git switch -c feature/short-description`.
2. Make a small change, run `pnpm build`, check it in the browser.
3. Commit, push, open a pull request, review the Vercel preview, merge.
4. Update `docs/CHANGELOG.md` (and ROADMAP or DECISIONS if relevant).

## Troubleshooting

- "LF will be replaced by CRLF" warnings on Windows are harmless.
- After editing `.env.local`, stop and restart `pnpm dev`.
- Build error mentioning `.next/dev/types/validator.ts` or old routes: stop the dev server, run
  `rm -rf .next`, then build again. It is a stale cache.
- Two pages resolving to the same path (for example a leftover `app/page.tsx`) break the build.
- Vercel says `vercel.json` failed schema validation: remove the invalid property (D14).
- A red "1 Issue" badge in dev is often a Next.js diagnostic; read the terminal message first.
- The first request to a page in dev can take several seconds while it compiles.
