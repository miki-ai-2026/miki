'use client'

import { useState, type FormEvent } from 'react'

type Status = { kind: 'idle' | 'sending' | 'ok' | 'error'; message: string }

export default function JoinForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'error', message: 'Please add your name and a valid work email.' })
      return
    }
    setStatus({ kind: 'sending', message: 'Sending…' })
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error(result?.error ?? 'request failed')
      form.reset()
      setStatus({ kind: 'ok', message: 'Thank you. We will be in touch.' })
    } catch {
      setStatus({
        kind: 'error',
        message: 'Something went wrong. Please try again, or email hello@miki.si.',
      })
    }
  }

  return (
    <form className="join-form" onSubmit={onSubmit} noValidate>
      <label>
        Your name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Work email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Store or company
        <input name="company" autoComplete="organization" />
      </label>
      <label>
        Number of stores
        <input name="stores" inputMode="numeric" />
      </label>
      {/* Honeypot: hidden from people, filled in by simple bots. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="primary-button" type="submit" disabled={status.kind === 'sending'}>
        Request early access
      </button>
      <p className="form-note" role="status">
        {status.message}
      </p>
    </form>
  )
}
