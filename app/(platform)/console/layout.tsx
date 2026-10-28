import { Suspense, type ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from './sign-out-button'
import { connection } from 'next/server'

// This area depends on the signed-in user, so it cannot be an instant navigation.
export const instant = false

// Reads the session cookie, so it must sit inside <Suspense> (Cache Components).
async function Gate({ children }: { children: ReactNode }) {
  await connection() // the session check only makes sense per request
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const claims = data?.claims
  if (error || !claims) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', claims.sub)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <span className="font-semibold">MiKi console</span>
        <div className="flex items-center gap-4 text-sm text-zinc-600">
          <span>
            {profile?.full_name ?? String(claims.email ?? '')}
            {profile?.role ? ` · ${profile.role}` : ''}
          </span>
          <SignOutButton />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  )
}

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p className="p-6 text-sm text-zinc-500">Loading…</p>}>
      <Gate>{children}</Gate>
    </Suspense>
  )
}
