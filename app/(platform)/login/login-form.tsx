'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const form = new FormData(event.currentTarget)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    })
    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }
    router.push('/console')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <label className="grid gap-1 text-sm font-medium">
        Email
        <input name="email" type="email" autoComplete="email" required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-base" />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Password
        <input name="password" type="password" autoComplete="current-password" required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-base" />
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading}
        className="rounded-lg bg-zinc-900 px-4 py-2.5 font-medium text-white disabled:opacity-60">
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
