# Open questions and unverified items

Items marked "unverified" were not confirmed against current documentation. Check before relying
on them.

## Pending decisions
- Real social profile URLs for `components/site/SocialLinks.tsx`.
- Whether "Reset all" on the learned-settings panel should clear toggles (current) or restore
  defaults.
- Spam protection for the early-access form (rate limit, Cloudflare Turnstile, or similar).
- Where confirmation and notification emails are sent from.
- Square favicon and a higher-resolution hero image (current one is upscaled about 1.8x).
- Whether to move text greys to a slightly darker shade (current `#71717a` on fog is about 4.4:1,
  just under the 4.5:1 body-text guideline).

## Legal and compliance (needs a qualified lawyer)
- The privacy page is a draft. It mentions Kenya's Data Protection Act, 2019 only as something to
  confirm. Registration duties and how the Act applies to CCTV footage and staff data are
  unverified.
- Retention limits, audit trails and consent for camera footage must be designed before any store
  is connected.

## Third-party constraints
- WhatsApp Business API: general-purpose AI chatbots barred from 15 January 2026; task-specific
  use allowed; proactive messages need approved templates (reported by several sources; read
  Meta's current terms before building).
- Africa's Talking offers SMS, USSD, voice and WhatsApp in Kenya. Pricing and sender-ID rules:
  unverified.
- X (Twitter) API terms for any automation: unverified. Keep posting manual until checked.
- Pricing and limits for Supabase, Vercel and any workflow engine (Inngest or Trigger.dev):
  unverified. The Supabase free tier may pause inactive projects (unverified); plan a paid
  production project.
- Supabase regions: whether an African region exists is unverified.

## Technical
- The `Date.now()` dev diagnostic on the console route is believed to come from the Supabase
  library's token-expiry check (inference). The production build is clean.
- Moving to Next.js 16 features (Cache Components, partial prefetching) is a scaffold default.
  Revisit if it causes friction.
- Camera ingestion design (ONVIF/RTSP edge gateway) is not started.
