# Architecture

## Layout

```text
app/
  layout.tsx                 Root layout: html, body, Geist font, metadata
  globals.css                Tailwind import (loaded only by the platform area)
  (site)/                    Public website. Plain CSS (site.css), no Tailwind.
    layout.tsx               Imports site.css; wraps content in <div id="top">
    page.tsx                 Home page, composed from components/site/*
    privacy/page.tsx         Draft privacy page (needs legal review)
    site.css                 Design system for the website
  (platform)/                Private area. Tailwind.
    layout.tsx               Imports globals.css
    login/                   Email + password sign-in (client form)
    console/                 Auth-gated team console (leads list)
  api/
    early-access/route.ts    POST: public sign-up form -> leads table (secret key, server only)
components/site/             Website components (see below)
lib/supabase/                client.ts (browser), server.ts (server), admin.ts (secret key), proxy.ts
proxy.ts                     Next.js 16 proxy: refreshes the Supabase session on each request
supabase/migrations/         SQL migrations, applied in order
vercel.json                  Minimal Vercel config (framework: nextjs)
docs/                        This documentation
```

Route groups `(site)` and `(platform)` do not appear in URLs. They exist so each area loads only its
own CSS. Cross-area links are plain `<a>` tags so the page reloads and styles never mix.

## Website components (`components/site/`)

Server components: `Footer`, `SocialLinks`. Client components (they need state or the browser):
`Header` (shrinks after the hero), `HeroCanvas` (WebGL wave and parallax), `Reveal` (fade-in on
scroll), `BlurText` (words sharpen on scroll), `LearnedPanel`, `DemoChat` (scripted preview),
`Faq`, `JoinForm`. `SocialLinks` renders only entries that have a URL.

## Data flows

**Early-access sign-up:** visitor fills `JoinForm` -> `POST /api/early-access` -> route validates,
checks a honeypot field, then inserts into `public.leads` with the secret key. A duplicate email
(unique index, Postgres error 23505) is treated as success so nothing leaks.

**Team console:** the browser signs in with Supabase Auth (email + password). The proxy refreshes
the session cookie. `console/layout.tsx` verifies the session with `getClaims()` inside
`<Suspense>` and redirects to `/login` otherwise. Queries use the server client, so row level
security applies as the signed-in user.

## Security model

- Row level security is on for every table. Anonymous visitors have no policies, so no access.
- Team members (a row in `profiles`) can read and update leads. Only owners can delete.
- The secret key bypasses RLS and exists only in server code and server environment variables.
- The layout redirect is a convenience. The database policies are the real protection.
- Sign-ups are disabled in Supabase Auth; users are created by an admin in the dashboard.

## Cache Components notes

Cache Components is enabled (scaffold default). Consequences already handled:
- The console layout wraps its session check in `<Suspense>`.
- The console layout exports `instant = false` to skip instant-navigation validation.
- Static pages (`/`, `/privacy`, `/login`) contain no per-request data.

## Environment variables

See `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
`SUPABASE_SECRET_KEY`. They must also be set in the Vercel project (Production and Preview).

## Hosting

Vercel (framework: Next.js) from this repository, one project only. `vercel.json` stays minimal;
root directory and similar options are dashboard settings. Supabase project `miki-dev` is in West Europe
(London). A separate production project is planned before real data arrives.
