'use client'

import { useEffect, useRef, useState } from 'react'
import SocialLinks from './SocialLinks'

const ITEMS = [
  {
    q: 'What is MiKi?',
    a: 'MiKi is an AI team that works inside your store. It connects to the cameras you already have, learns what normal looks like, and tells your manager what needs attention.',
  },
  {
    q: 'Do I need to buy new cameras?',
    a: 'No. MiKi is designed to work with the CCTV your store already has.',
  },
  {
    q: 'How does MiKi reach my manager?',
    a: 'Through channels they already use: an alert, a text, a WhatsApp message or a call. The manager always decides what happens next.',
  },
  {
    q: 'Will MiKi watch my staff or share my footage?',
    a: 'MiKi is built to support your team, not watch them. It works by role and zone, not individual performance. Privacy controls such as retention limits and audit trails are part of the plan, and you stay in control of your footage.',
  },
  {
    q: 'How do I get early access?',
    a: "Join early access and we'll reach out to learn about your stores. MiKi is in development, and early partners help shape what we build first.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const [seen, setSeen] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shown = seen ? ' is-visible' : ''

  return (
    <section ref={sectionRef} className="container faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-layout">
        <div className={`faq-aside faq-slide-left${shown}`}>
          <div className="faq-kicker">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <span>FAQ</span>
          </div>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p className="faq-question">Still have a question?</p>
          <p className="faq-contact">
            <a href="mailto:hello@miki.si">Contact us</a>. We&apos;ll be happy to help.
          </p>
          <SocialLinks className="social-links" label="Social links" />
        </div>

        <div className={`faq-accordion faq-slide-right${shown}`} id="faq-accordion">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="faq-item" key={item.q}>
                <button
                  className="faq-trigger"
                  id={`faq-btn-${i + 1}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${i + 1}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`faq-content${isOpen ? ' is-open' : ''}`}
                  id={`faq-ans-${i + 1}`}
                  aria-labelledby={`faq-btn-${i + 1}`}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
