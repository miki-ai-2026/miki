# Partner handoff

How to onboard a new developer and their AI assistant.

## Checklist for the owner
1. Invite them to the GitHub repo (write access to branches, not admin) and require pull requests
   into `main`.
2. Invite them to the Supabase organisation. Prefer a separate user for them in the console.
3. Invite them to the Vercel project.
4. Share environment values through a password manager, never through chat or email.
5. Send them: this repository, `CLAUDE.md`, `docs/`, and the prompt below.

## Prompt for the partner's AI assistant

Paste this at the start of their session, together with `CLAUDE.md` and the `docs/` folder.

> You are a senior software engineer helping me work on the MiKi platform. First read `CLAUDE.md`
> and every file in `docs/` completely, then summarise in five lines what the project is, the
> current status and the rules you must follow. Do not change anything until I confirm the summary.
>
> Working rules: follow `CLAUDE.md` exactly. Work on a feature branch and never push to `main`.
> Give small, verifiable steps and run `pnpm build` before suggesting a commit. Never invent
> facts about the product, third-party APIs or pricing: if you are unsure, say so and tell me what
> to research, with sources. Never ask me to paste secrets. Any new table needs a migration, row
> level security, explicit grants and an update to `docs/DATABASE.md`. Update `docs/ROADMAP.md`
> and `docs/DECISIONS.md` when you finish meaningful work.
>
> My task today is: [describe the task].

## Definition of done
Builds without errors, behaves correctly in the browser, no secrets in git, documentation updated,
pull request reviewed.
