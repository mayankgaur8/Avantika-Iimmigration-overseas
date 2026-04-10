import Link from 'next/link'
import { db } from '@/lib/server/db'

export const dynamic = 'force-dynamic'

type SearchParamsValue = string | string[] | undefined
type SearchParamsInput = Record<string, SearchParamsValue>

interface LeadsPageProps {
  searchParams?: SearchParamsInput | Promise<SearchParamsInput>
}

function firstValue(value: SearchParamsValue): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

function buildWhere(searchParams: SearchParamsInput) {
  const where: Record<string, unknown> = {}

  const status = firstValue(searchParams.status)
  const source = firstValue(searchParams.source)
  const service = firstValue(searchParams.service)
  const destination = firstValue(searchParams.destination)
  const from = firstValue(searchParams.from)
  const to = firstValue(searchParams.to)

  if (status) where.status = status
  if (source) where.source = { contains: source, mode: 'insensitive' }
  if (service) where.serviceInterest = { contains: service, mode: 'insensitive' }
  if (destination) where.destinationInterest = { contains: destination, mode: 'insensitive' }

  if (from || to) {
    const createdAt: { gte?: Date; lte?: Date } = {}
    if (from) createdAt.gte = new Date(from)
    if (to) createdAt.lte = new Date(to)
    where.createdAt = createdAt
  }

  return where
}

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {})

  const leads = await db.lead.findMany({
    where: buildWhere(resolvedSearchParams) as never,
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-black text-navy-800">Leads</h1>

      <form className="grid gap-3 rounded-2xl bg-white p-4 shadow-card md:grid-cols-6">
        <input name="status" placeholder="status" defaultValue={firstValue(resolvedSearchParams.status)} className="input-field" />
        <input name="source" placeholder="source" defaultValue={firstValue(resolvedSearchParams.source)} className="input-field" />
        <input name="service" placeholder="service" defaultValue={firstValue(resolvedSearchParams.service)} className="input-field" />
        <input name="destination" placeholder="destination" defaultValue={firstValue(resolvedSearchParams.destination)} className="input-field" />
        <input name="from" type="date" defaultValue={firstValue(resolvedSearchParams.from)} className="input-field" />
        <input name="to" type="date" defaultValue={firstValue(resolvedSearchParams.to)} className="input-field" />
        <button className="btn-secondary px-4 py-2 text-sm md:col-span-6">Apply filters</button>
      </form>

      <div className="overflow-auto rounded-2xl bg-white shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-semibold text-navy-800">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{lead.email}</div>
                  <div>{lead.phone}</div>
                </td>
                <td className="px-4 py-3">{lead.serviceInterest}</td>
                <td className="px-4 py-3">{lead.destinationInterest || '-'}</td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3">{lead.status}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="text-navy-700 font-semibold hover:text-gold-600">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
