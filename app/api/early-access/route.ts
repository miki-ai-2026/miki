import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function clean(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim().slice(0, max)
  return trimmed === '' ? null : trimmed
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    const parsed = await request.json()
    if (!parsed || typeof parsed !== 'object') throw new Error('bad body')
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real visitors leave this hidden field empty. Bots fill it.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: false, error: 'Spam detected.' }, { status: 400 })
  }

  const email = clean(body.email, 254)?.toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })
  }

  const { error } = await createAdminClient().from('leads').insert({
    email,
    name: clean(body.name, 200),
    company: clean(body.company, 200),
    stores: clean(body.stores, 50),
    message: clean(body.message, 2000),
  })

  // 23505 = this email is already on the list. Treat it as success and reveal nothing.
  if (error && error.code !== '23505') {
    console.error('early-access insert failed', error.code)
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
