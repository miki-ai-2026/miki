'use client'

import { Fragment, useEffect, useRef } from 'react'

// A paragraph whose words sharpen as they scroll up the screen.
export default function BlurText({ text }: { text: string }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([])
  const words = text.trim().split(/\s+/)

  useEffect(() => {
    const els = refs.current.filter((el): el is HTMLSpanElement => el !== null)
    let ticking = false
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
    const update = () => {
      const vh = window.innerHeight
      const start = vh * 0.84
      const range = start - vh * 0.38
      els.forEach((el) => {
        const progress = clamp((start - el.getBoundingClientRect().top) / range, 0, 1)
        el.style.setProperty('--reveal-blur', `${(8 * (1 - progress)).toFixed(2)}px`)
        el.style.setProperty('--reveal-opacity', (0.15 + 0.85 * progress).toFixed(3))
      })
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
    <p>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            ref={(el) => {
              refs.current[i] = el
            }}
            className="reveal-blur-word"
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}
