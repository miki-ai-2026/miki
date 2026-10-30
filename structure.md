# Repository structure

Where things belong. When in doubt, follow the pattern of the nearest existing file.

```text
app/
  layout.tsx                 Root layout: html, body, Geist font, metadata
  globals.css                Tailwind import (loaded only by app/(platform))
  (site)/                    Public website, plain CSS
    layout.tsx, page.tsx, site.css
    privacy/page.tsx         Draft privacy page
  (platform)/                Private area, Tailwind
    layout.tsx
    login/                   Sign-in page and form
    console/                 Auth-gated team console
  api/early-access/route.ts  POST: website sign-up form -> leads table
components/site/             Website components (Header, HeroCanvas, DemoChat, Faq, JoinForm, ...)
lib/supabase/                client.ts (browser), server.ts, admin.ts (secret key), proxy.ts
proxy.ts                     Refreshes the Supabase session on every request
supabase/migrations/         SQL migrations, applied in order
docs/                        Documentation (see CLAUDE.md for the map)
public/assets/               Images used by the website
```

Top-level files: `CLAUDE.md` and `AGENTS.md` (instructions for AI assistants), `.env.example`
(variable names only), `vercel.json` (minimal), `next.config.ts`, `package.json`, `pnpm-lock.yaml`.

## Rules for adding things

- Website UI goes in `components/site/` and `app/(site)/`. Platform UI goes under `app/(platform)/`.
- Do not mix the two areas' CSS. Link between them with plain `<a>` tags.
- Database changes: a new file in `supabase/migrations/` plus an update to `docs/DATABASE.md`.
- Server-only code that uses the secret key lives in `lib/supabase/admin.ts` and API routes.
- Never commit `.env.local` or any key.
- Update `docs/ROADMAP.md` and `docs/DECISIONS.md` after meaningful work.
