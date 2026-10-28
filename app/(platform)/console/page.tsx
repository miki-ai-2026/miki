import { createClient } from '@/lib/supabase/server'

export default async function ConsoleHome() {
  const supabase = await createClient()
  const { data: leads, count, error } = await supabase
    .from('leads')
    .select('id, email, name, company, status, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <section>
      <h1 className="text-2xl font-semibold">Early-access leads</h1>
      {error ? (
        <p className="mt-4 text-sm text-red-700">
          Could not load leads. Check that the migration ran and your profile exists.
        </p>
      ) : (
        <>
          <p className="mt-1 text-sm text-zinc-600">{count ?? 0} total, newest first.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {(leads ?? []).map((lead) => (
                  <tr key={lead.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3">{lead.email}</td>
                    <td className="px-4 py-3">{lead.name ?? '-'}</td>
                    <td className="px-4 py-3">{lead.company ?? '-'}</td>
                    <td className="px-4 py-3">{lead.status}</td>
                    <td className="px-4 py-3">{String(lead.created_at).slice(0, 10)}</td>
                  </tr>
                ))}
                {(leads ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-zinc-500">No leads yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
