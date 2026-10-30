# Open questions and unverified items

"Unverified" means not confirmed against current documentation. Check before relying on it.

## Decisions waiting on the owners

- Real social profile URLs for `components/site/SocialLinks.tsx`.
- Should "Reset all" on the learned-settings panel clear toggles (current) or restore defaults?
- Spam protection for the early-access form (rate limit, Cloudflare Turnstile, or similar).
- Where confirmation and notification emails are sent from.
- Square favicon and a higher-resolution hero image (the current one is upscaled about 1.8x).
- Darker text greys: `#71717a` on the fog background is about 4.4:1, just under the 4.5:1 guideline.
- Repository visibility: it was public on 2026-10-28. Public is fine without secrets, but the docs
  describe the architecture and plans. Decide on purpose.

## Hosting and plans (unverified)

- Vercel's Hobby plan terms: it may be limited to non-commercial use, which could require a paid plan
  for a company site. Read Vercel's current terms.
- Whether Vercel's build image supports the pnpm 11 pinned in `package.json`. Previous previews built
  fine; watch for pnpm or corepack errors in logs.
- Supabase free tier: project limits and pausing of inactive projects. Plan a paid production project.
- Whether Supabase offers an African region.
- Pricing and limits for any workflow engine (Inngest, Trigger.dev) before adopting one.

## Legal and compliance (needs a qualified lawyer)

- The privacy page is a draft. It mentions Kenya's Data Protection Act, 2019 only as something to
  confirm. Registration duties and how it applies to CCTV footage and staff data are unverified.
- Retention limits, audit trails and consent for footage must be designed before any store connects.

## Third-party constraints

- WhatsApp Business API: general-purpose AI chatbots barred from 15 January 2026; task-specific use
  allowed; proactive messages need approved templates (reported by several sources; read Meta's
  current terms before building).
- Africa's Talking offers SMS, USSD, voice and WhatsApp in Kenya. Pricing and sender-ID rules:
  unverified.
- X (Twitter) API terms for automation: unverified. Keep posting manual until checked.

## Technical

- A dev-only `Date.now()` diagnostic on the console route is believed to come from the Supabase
  library's token-expiry check (inference). The production build is clean.
- Cache Components and partial prefetching are scaffold defaults. Revisit if they cause friction.
- Camera ingestion design (ONVIF/RTSP edge gateway) is not started.
