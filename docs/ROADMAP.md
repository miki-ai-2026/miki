# Roadmap

Status as of 2026-10-28.

## Phase 1: foundation
- [x] Next.js app scaffolded; old Vite site removed
- [x] Supabase project `miki-dev`; clients wired; health check passes
- [x] `profiles` and `leads` migration applied; owner set
- [x] Sign-in page and auth-gated console with leads list
- [x] `/api/early-access` route (tested with duplicate emails)
- [x] Landing page ported to React components; privacy page; documentation
- [x] Merged to `main` (PR #7)
- [x] `vercel.json` fixed (invalid `rootDirectory` removed, `framework: nextjs`)
- [x] Deleted `legacy/` and `/api/health`
- [ ] Vercel: one project only, Framework Preset Next.js, Supabase variables set, production deploy green
- [ ] Production site (`miki-xi.vercel.app`) serves the new app

## Phase 2: make the early-access list real
- [ ] Rate limiting or bot check on the form
- [ ] Confirmation email to the visitor and notification to the team
- [ ] Console: lead detail, status changes, notes, search, CSV export
- [ ] Real social URLs, proper square favicon, sharper hero image

## Phase 3: founder console
- [ ] Design-partner pipeline (stages, notes, next actions)
- [ ] Content calendar with an approval queue
- [ ] `audit_log` for sensitive actions
- [ ] Separate production Supabase project, backups and environment separation

## Phase 4: agents (proposed)
- [ ] Orchestrator agent with worker agents (writer, monitor, reply drafter, reporter)
- [ ] Every run logged (`agent_runs`); every external action needs a human approval
- [ ] Per-organisation spend cap, prompt versioning, a few saved test cases per agent

## Phase 5: manager agent
- [ ] Simulator: one fake store with scripted events producing the three daily moments
- [ ] WhatsApp delivery with approved templates
- [ ] Multi-tenant model (`stores`, `staff`, `incidents`, `briefs`, `handovers`)

## Phase 6: cameras
- [ ] Edge gateway for on-site cameras; only after a design partner commits
- [ ] Data protection review (see `docs/OPEN_QUESTIONS.md`)

## Multi-page website (proposed pages)
Home, Product, A day with MiKi, For retailers, Team, Security and privacy, Updates, Early access.
