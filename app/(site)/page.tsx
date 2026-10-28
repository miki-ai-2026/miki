import BlurText from '../../components/site/BlurText'
import DemoChat from '../../components/site/DemoChat'
import Faq from '../../components/site/Faq'
import Footer from '../../components/site/Footer'
import Header from '../../components/site/Header'
import HeroCanvas from '../../components/site/HeroCanvas'
import JoinForm from '../../components/site/JoinForm'
import LearnedPanel from '../../components/site/LearnedPanel'
import Reveal from '../../components/site/Reveal'

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section" aria-labelledby="hero-title">
          <HeroCanvas />
          <div className="container hero-content">
            <div className="hero-grid">
              <Reveal className="hero-copy">
                <h1 id="hero-title">
                  Transform{' '}
                  <img className="inline-token" src="/assets/cctv-dae03d88.jpg" alt="" aria-hidden="true" />{' '}
                  your existing systems into{' '}
                  <img className="inline-token" src="/assets/miki-12100366.jpg" alt="" aria-hidden="true" />{' '}
                  digital co-workers.
                </h1>
                <p className="hero-lede">
                  An AI team inside your store that spots what needs attention and follows through.
                </p>
                <div className="hero-cta-wrap">
                  <a className="primary-button" id="early-access" href="#join">
                    Early access
                  </a>
                </div>
              </Reveal>

              <Reveal className="hero-media" delay={1}>
                <div className="hero-media-frame">
                  <img
                    src="/assets/store-overview-3e01d400.jpg"
                    alt="Ceiling-mounted security camera above a store aisle"
                    width="512"
                    height="382"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="container section-block" id="ai-team" aria-labelledby="ai-team-title">
          <Reveal className="section-intro">
            <h2 id="ai-team-title">Your store&apos;s AI team, led by MiKi.</h2>
            <BlurText text="One personal MiKi for the manager, backed by Security, Operations and Customer Care agents that work in the background." />
          </Reveal>

          <div className="team-grid">
            <Reveal as="article" className="team-card personal-card word-bubble">
              <div className="team-card-media">
                <img
                  src="/assets/personal-miki-assistant-fd92a454.jpg"
                  alt="Personal MiKi assistant, a lavender robot carrying a basket"
                  width="382"
                  height="512"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="team-card-copy">
                <h3>Personal MiKi</h3>
                <p>Your manager&apos;s single point of contact. It alerts, texts or calls when something needs you.</p>
              </div>
            </Reveal>

            <div className="team-stack">
              <Reveal as="article" className="team-card mini-card security-card word-bubble" delay={1}>
                <img src="/assets/security-module-516689f6.jpg" alt="" width="512" height="512" loading="lazy" decoding="async" />
                <div>
                  <h3>Security</h3>
                  <p>Watches the cameras and flags unusual activity with a short clip.</p>
                </div>
              </Reveal>
              <Reveal as="article" className="team-card mini-card operations-card word-bubble" delay={2}>
                <img src="/assets/operations-module-0f414362.jpg" alt="" width="512" height="512" loading="lazy" decoding="async" />
                <div>
                  <h3>Operations</h3>
                  <p>Tracks queues, shelves and tasks, and follows each one to the end.</p>
                </div>
              </Reveal>
              <Reveal as="article" className="team-card mini-card care-card word-bubble" delay={3}>
                <img src="/assets/customer-care-module-5a28143d.jpg" alt="" width="512" height="512" loading="lazy" decoding="async" />
                <div>
                  <h3>Customer Care</h3>
                  <p>Spots customer friction and follows up on open issues.</p>
                </div>
              </Reveal>
            </div>
          </div>
          <p className="section-footnote">MiKi is in development. Visuals show the concept.</p>
        </section>

        <section className="container section-block learns-section" id="learns" aria-labelledby="learns-title">
          <Reveal className="section-intro">
            <h2 id="learns-title">Launch your store&apos;s MiKi.</h2>
            <BlurText text="It learns your store's rhythm and keeps you in charge of every decision." />
          </Reveal>

          <div className="learns-grid">
            <Reveal className="manager-media">
              <img
                src="/assets/store-manager-overview-89c9f205.jpg"
                alt="Store manager checking a phone in a supermarket aisle"
                width="512"
                height="343"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <LearnedPanel />
          </div>
          <Reveal className="closing-anchor">
            <p>Built to support your team, not watch them.</p>
          </Reveal>
        </section>

        <section className="container section-block demo-section" id="demo" aria-labelledby="demo-title">
          <div className="section-intro">
            <h2 id="demo-title">See a day with MiKi.</h2>
            <p>
              Pick a moment in a store manager&apos;s day. This is a scripted concept preview with illustrative data,
              not live software.
            </p>
          </div>
          <DemoChat />
          <p className="section-footnote">Illustrative data. MiKi is in development and no live store is connected.</p>
        </section>

        <Faq />

        <section className="container section-block join-section" id="join" aria-labelledby="join-title">
          <div className="section-intro">
            <h2 id="join-title">Join early access.</h2>
            <p>
              Tell us about your stores. MiKi is in development, and early partners help shape what we build first.
            </p>
          </div>
          <JoinForm />
        </section>
      </main>

      <Footer />
    </>
  )
}
