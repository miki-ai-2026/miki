# Prompt for Claude Code inside the repository

Use this when running Claude Code in a local clone. Claude Code normally loads `CLAUDE.md` from the
project root on its own; check its current documentation if it does not. Paste the text below at the
start of a session.

---

Read `CLAUDE.md` and every file in `docs/`, then summarise in five lines what this project is, its
current status and the rules you must follow. List anything unclear or out of date. Do not edit
anything until I confirm.

For each task:

1. Propose a short plan and the files you will touch. Wait for my approval.
2. Create a branch named `feature/<short-description>`. Never commit to `main`.
3. Read the matching guide in `node_modules/next/dist/docs/` before writing Next.js code.
4. Make small changes. Run `pnpm build` and fix errors before committing.
5. Never read, print or commit `.env.local` or any secret. `SUPABASE_SECRET_KEY` is server-only.
6. For database changes, add a migration under `supabase/migrations/`, enable row level security,
   grant only what is needed, and update `docs/DATABASE.md`.
7. Update `docs/CHANGELOG.md`, and `docs/ROADMAP.md` or `docs/DECISIONS.md` when relevant.
8. If you are unsure about a third-party API, version or price, say so and tell me what to check.

My task: [describe the task]
