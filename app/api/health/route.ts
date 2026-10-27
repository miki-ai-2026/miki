import { NextResponse } from 'next/server'

// Temporary check that the app can reach Supabase. We delete this later.
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) {
    return NextResponse.json({ ok: false, reason: 'missing env vars' }, { status: 500 })
  }
  try {
    const res = await fetch(`${url}/auth/v1/health`, { headers: { apikey: key } })
    return NextResponse.json({ ok: res.ok, supabaseStatus: res.status })
  } catch (e) {
    return NextResponse.json({ ok: false, reason: String(e) }, { status: 502 })
  }
}
