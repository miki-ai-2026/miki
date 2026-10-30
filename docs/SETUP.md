# Setup

## Prerequisites
Git, a current Node.js LTS, pnpm, and access to the GitHub repo, the Supabase project and the
Vercel project. Turn on two-factor authentication for all three.

## First run
```bash
git clone https://github.com/miki-ai-2026/miki.git
cd miki
git checkout platform/foundation
pnpm install
cp .env.example .env.local     # then fill in the values (ask the owner; never paste them in chat)
pnpm dev
```
Check `http://localhost:3000` (website), `/login` and `/console` (sign in with a user created in
Supabase), and `/api/health` (should return `"ok": true`).

## Supabase
Project `miki-dev`, West Europe (London). Project settings -> API Keys has the publishable and
secret keys. Public sign-ups are off. Create users in Authentication -> Users, then set their role
in the SQL Editor (see `docs/DATABASE.md`). Apply migrations by pasting each file from
`supabase/migrations/` into the SQL Editor, in order.

## Vercel
One project only, connected to this repository. In its settings: Framework Preset = Next.js, no
Build or Output Directory overrides, root directory blank. Under Environment Variables add
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`
(Production and Preview; mark the secret key as sensitive). Without them every page can fail,
because `proxy.ts` runs on each request. Variable changes apply only to new deployments, so redeploy
afterwards. Read a failed deployment's log in the Vercel dashboard, or with
`npx vercel inspect <deployment-id> --logs`.

## Daily workflow
1. `git switch -c feature/short-description` from the latest branch.
2. Make a small change, run `pnpm build`, check it in the browser.
3. Commit, push, open a pull request, review the Vercel preview, then merge.

## Troubleshooting
- "LF will be replaced by CRLF" warnings on Windows are harmless.
- After editing `.env.local`, stop and restart `pnpm dev`.
- The first request to a page in dev can take several seconds while it compiles.
- A red "1 Issue" badge in dev is often a Next.js diagnostic; read the terminal message first.
- Two pages resolving to the same path (for example a leftover `app/page.tsx`) break the build.
