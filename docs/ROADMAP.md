# Roadmap

Status as of 2026-10-30. Tick items when done and log them in `docs/CHANGELOG.md`.

## Now

- [ ] Vercel: one project only, Framework Preset Next.js, Supabase variables set, production deploy
      green, `miki-xi.vercel.app` serving the new app
- [ ] Remove the duplicate Vercel project
- [ ] Mark: set up locally and read the docs (see `docs/partner/WELCOME_MARK.md`)

## Phase 1: foundation (done unless noted)

- [x] Next.js app scaffolded; old Vite site later removed
- [x] Supabase project `miki-dev`; clients wired
- [x] `profiles` and `leads` migration applied; owner set
- [x] Sign-in page and auth-gated console with leads list
- [x] `/api/early-access` route, duplicate-email handling tested
- [x] Landing page ported to React; privacy page; documentation
- [x] Merged to `main` (PR #7); `vercel.json` fixed; `legacy/` and `/api/health` deleted

## Phase 2: make the early-access list real

- [ ] Rate limiting or a bot check on the form
- [ ] Confirmation email to the visitor and a notification to the team
- [ ] Console: lead detail, status changes, notes, search, CSV export
- [ ] Real social URLs, square favicon, sharper hero image
- [ ] Decide the repository's visibility (currently public) and Vercel plan (see OPEN_QUESTIONS)

## Phase 3: founder console

- [ ] Design-partner pipeline (stages, notes, next actions)
- [ ] Content calendar with an approval queue
- [ ] `audit_log` for sensitive actions
- [ ] Separate production Supabase project, backups, environment separation

## Phase 4: agents (proposed)

- [ ] Orchestrator agent with worker agents (writer, monitor, reply drafter, reporter)
- [ ] Every run logged (`agent_runs`); every external action needs a human approval
- [ ] Per-organisation spend cap, prompt versioning, saved test cases per agent

## Phase 5: manager agent

- [ ] Simulator: one fake store with scripted events producing the three daily moments
- [ ] WhatsApp delivery with approved templates
- [ ] Multi-tenant model (`stores`, `staff`, `incidents`, `briefs`, `handovers`)

## Phase 6: cameras

- [ ] Edge gateway for on-site cameras, only after a design partner commits
- [ ] Data protection review (see `docs/OPEN_QUESTIONS.md`)

## Proposed website pages

Home, Product, A day with MiKi, For retailers, Team, Security and privacy, Updates, Early access.
