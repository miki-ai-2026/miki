'use client'

import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    const hero = document.querySelector<HTMLElement>('.hero-section')
    if (!header || !hero) return
    let ticking = false
    const update = () => {
      setScrolled(hero.getBoundingClientRect().bottom <= header.offsetHeight + 8)
      ticking = false
    }
    const request = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand-mark" href="#top" aria-label="MiKi home">
          <img src="/assets/miki-logo-7414a10a.jpg" alt="MiKi Logo" width="48" height="32" />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#ai-team">AI team</a>
          <a href="#learns">What MiKi learns</a>
          <a href="#demo">Concept</a>
        </nav>
      </div>
    </header>
  )
}
