'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      className="rounded-md border border-zinc-300 px-3 py-1.5 hover:bg-zinc-100"
      onClick={async () => {
        await createClient().auth.signOut()
        router.push('/login')
        router.refresh()
      }}
    >
      Sign out
    </button>
  )
}
