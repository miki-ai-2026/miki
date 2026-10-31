# Decisions

Format: what was decided, why, and what follows. Add new entries at the end; do not rewrite history.
If a decision is reversed, add a new entry that says so.

**D1. Agent-first, not dashboard-first.** The personal agent is the interface for store managers.
The console exists for MiKi's own operations, not as the product UI.

**D2. One platform, three surfaces, built in order of risk.** Website, then internal console, then
the manager agent (simulator, then WhatsApp, then cameras). The camera pipeline is the hardest and
least proven part, so it waits for a committed design partner.

**D3. Next.js on Vercel with Supabase.** One deployable for pages and server routes; Supabase gives
Postgres, Auth and row level security. A static Vite site could not host server routes or auth.

**D4. Honest demo.** The website demo is scripted with illustrative data and labelled as such,
because no product exists. No fake metrics, customers or "live" claims.

**D5. Public form goes through a server route.** `leads` has no anonymous policy. The route validates
input, uses a honeypot, and inserts with the secret key. Rate limiting is still to come.

**D6. Email and password sign-in, invite-only.** No public sign-ups and no magic links (email
delivery is not set up). Users are created in the Supabase dashboard.

**D7. Two CSS systems, isolated by route groups.** The website keeps its hand-written CSS; the
platform uses Tailwind. Plain `<a>` links between them.

**D8. Landing page rebuilt as React components** rather than mounting the old HTML, as the base for a
multi-page site.

**D9. Console opts out of instant-navigation validation** (`export const instant = false`). The
session check runs per request by design.

**D10. Social links are data, not markup.** `SocialLinks.tsx` shows only entries with a URL, so there
are no dead placeholder links.

**D11. WhatsApp is the primary manager channel, with constraints.** Meta barred general-purpose AI
chatbots from its Business API from 15 January 2026; task-specific business use remains allowed and
proactive messages need pre-approved templates. A store-manager agent must stay task-specific. See
`docs/OPEN_QUESTIONS.md`.

**D12. Business planning stays out of the repository.** Investor, partner and marketing details live
elsewhere.

**D13. The `legacy/` Vite site was removed** after the React port was verified. It remains in git
history.

**D14. One Vercel project, minimal `vercel.json`.** An invalid `rootDirectory` property in
`vercel.json` failed every deployment on 2026-10-28. Dashboard settings stay in the dashboard, and a
duplicate Vercel project connected to the same repository is removed.

**D15. Two builders, one branch rule.** Mark joined on 2026-10-28. Nobody pushes to `main`; every
change is a branch and a pull request. Each builder may use their own Supabase project so the shared
secret key is not passed around.

**D16. Backend in stages: a Go core API and a Python agent service.** The frontend stays Next.js and
the database stays Supabase. New backend work goes in `services/api` (Go) and `services/agents`
(Python); the working Next.js and Supabase code is not rewritten. Go takes public intake, webhooks,
notification delivery and later the camera gateway; Python takes AI agents, which only draft and
never send without human approval. Rules: every endpoint except explicitly public ones verifies the
caller's Supabase access token against the project's published signing keys; a service that uses the
secret key or a database password bypasses row level security, so it must authorise in code and test
it; database changes live only in `supabase/migrations/`; services talk to the frontend over HTTP and
JSON, with an OpenAPI file per service. Hosting is undecided (a later decision).
