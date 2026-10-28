# Decisions

Each entry: what was decided, why, and what follows.

**D1. Agent-first, not dashboard-first.** The personal agent is the interface for store managers.
The team console exists for MiKi's own operations, not as the product UI.

**D2. One platform, three surfaces, built in order of risk.** Public website, internal console,
then the manager agent (simulator first, WhatsApp next, cameras last). The camera pipeline is the
hardest and least proven part, so it waits for a committed design partner.

**D3. Next.js on Vercel with Supabase.** One deployable for pages and server routes; Supabase gives
Postgres, Auth and row level security. Chosen over keeping a static Vite site because the platform
needs server routes and authentication.

**D4. Honest demo.** The website demo is scripted with illustrative data and labelled as such,
because no product exists yet. Do not add fake metrics, customers or "live" claims.

**D5. Public form goes through a server route.** `leads` has no anonymous policy. The route
validates input, uses a honeypot, and inserts with the secret key. Rate limiting or a bot check is
still to be added.

**D6. Email and password sign-in, invite-only.** No public sign-ups and no magic links (email
delivery is not set up). Users are created in the Supabase dashboard.

**D7. Two CSS systems, isolated by route groups.** The website keeps its original hand-written
CSS; the platform uses Tailwind. Separate groups, plain `<a>` links between them.

**D8. Rebuilt the landing page as React components** instead of mounting the old HTML. It is the
base for a multi-page site and keeps behaviour testable.

**D9. Console opts out of instant-navigation validation** (`export const instant = false`). The
session check runs per request by design.

**D10. Social links are data, not markup.** `SocialLinks.tsx` shows only entries with a URL, so
there are no dead placeholder links.

**D11. WhatsApp is the primary manager channel, with constraints.** Meta barred general-purpose AI
chatbots from its Business API from 15 January 2026; task-specific business use (support,
notifications) remains allowed, and proactive messages need pre-approved templates. A store-manager
agent must stay task-specific. See `docs/OPEN_QUESTIONS.md`.

**D12. Business planning stays out of the repository.** Investor, partner and marketing details
live elsewhere.

**D13. Keep `legacy/` temporarily** as a reference until the React port is verified in production.
