import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy | MiKi',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <main className="legal">
      <a href="/">&larr; Back to MiKi</a>
      <p className="legal-draft" role="note">
        Draft placeholder. This page has not been reviewed by a lawyer and must be reviewed before launch. It is not
        legal advice.
      </p>
      <h1>Privacy</h1>
      <p>Last updated: October 2026. This page covers the miki.si website only.</p>

      <h2>What we collect</h2>
      <p>
        If you use the early-access form, we store what you enter: your name, work email, and optionally your company,
        number of stores and a message. We use these details to reply to you about MiKi early access, and we do not
        sell them.
      </p>

      <h2>Who processes it for us</h2>
      <ul>
        <li>Our database provider stores form submissions on our behalf.</li>
        <li>Our hosting provider may keep standard server logs, such as IP address and requested pages.</li>
        <li>Fonts are bundled with the site and served from our own domain.</li>
      </ul>

      <h2>The MiKi product</h2>
      <p>
        MiKi is in development and no store data is processed today. A separate policy covering camera footage and
        staff data will be published before any store is connected.
      </p>

      <h2>Your choices</h2>
      <p>
        To ask what we hold about you, or to have it deleted, email <a href="mailto:hello@miki.si">hello@miki.si</a>.
        Applicable data protection law, for example Kenya&apos;s Data Protection Act, 2019, should be confirmed by a
        lawyer before launch.
      </p>
    </main>
  )
}
