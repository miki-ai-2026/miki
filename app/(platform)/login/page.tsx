import LoginForm from './login-form'

export const metadata = { title: 'Sign in | MiKi' }

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-2xl font-semibold">MiKi console</h1>
        <p className="mt-1 text-sm text-zinc-600">Team sign-in only.</p>
        <LoginForm />
      </div>
    </main>
  )
}
