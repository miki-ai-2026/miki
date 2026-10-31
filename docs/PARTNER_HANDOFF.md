# Partner handoff

How to onboard a developer and their AI assistant. Mark joined on 2026-10-28.

## Checklist for the owner

1. GitHub: invite with write access, not admin. Agree that nobody pushes to `main`.
2. Vercel: invite to the project. Supabase: invite to the organisation only if needed.
3. Share environment values through a password manager, never chat or email. Prefer that Mark runs
   his own Supabase project (see `docs/SETUP.md`) so the secret key stays with the owner.
4. Send: the repository, `docs/partner/WELCOME_MARK.md`, and one of the prompts below.
5. Agree who owns which area (table in `WELCOME_MARK.md`) to avoid collisions.

## Giving an AI assistant the context

- **Claude Code in the repo:** use `docs/partner/PROMPT_claude-code.md`. It reads `CLAUDE.md` itself.
- **Claude chat (claude.ai):** run `bash scripts/build-context-pack.sh`, attach the generated
  `MIKI_CONTEXT_PACK.md` (git-ignored), and paste `docs/partner/PROMPT_claude-chat.md`.
- Regenerate the pack whenever docs change, so the assistant never works from stale context.

## Definition of done

Builds without errors, behaves correctly in the browser, no secrets in git, docs and changelog
updated, pull request reviewed by the other builder.
