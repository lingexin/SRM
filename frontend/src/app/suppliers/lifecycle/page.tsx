"use client"

import Layout from '@/components/layout/Layout'
import { useMemo, useState } from 'react'
import { suppliers, contracts } from '@/data/mockData'
import Button from '@/components/ui/Button'
import { Calendar, RefreshCw, XCircle, Play, Pause } from 'lucide-react'
import { formatDate } from '@/lib/utils'

type LifecycleStatus = 'active' | 'on_hold' | 'terminated'

export default function LifecycleManagementPage() {
  const [statusById, setStatusById] = useState<Record<number, LifecycleStatus>>({})

  const rows = useMemo(() => {
    return suppliers.map(s => {
      const supplierContracts = contracts.filter(c => c.supplierId === s.id)
      const nextExpiry = supplierContracts.length ? supplierContracts.map(c => new Date(c.endDate)).sort((a,b) => a.getTime() - b.getTime())[0] : null
      const lifecycle: LifecycleStatus = statusById[s.id] ?? (s.status === 'inactive' ? 'on_hold' : 'active')
      return { supplier: s, contracts: supplierContracts.length, nextExpiry, lifecycle }
    })
  }, [statusById])

  const updateStatus = (id: number, next: LifecycleStatus) => setStatusById(prev => ({ ...prev, [id]: next }))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Lifecycle Management</h1>
          <p className="text-gray-600 mt-2">Manage supplier activation, holds, terminations, and contract renewals.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Contracts</th>
                <th className="text-left px-4 py-2">Next Expiry</th>
                <th className="text-left px-4 py-2">Lifecycle Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.supplier.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.supplier.name}</div>
                    <div className="text-xs text-gray-500">{r.supplier.industry} • {r.supplier.location}</div>
                  </td>
                  <td className="px-4 py-3">{r.contracts}</td>
                  <td className="px-4 py-3">
                    {r.nextExpiry ? (
                      <span className="inline-flex items-center gap-1"><Calendar size={16}/>{formatDate(r.nextExpiry.toISOString())}</span>
                    ) : (
                      <span className="text-gray-500">No contracts</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                      r.lifecycle === 'active' ? 'bg-green-100 text-green-700' : r.lifecycle === 'on_hold' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>{r.lifecycle.replace('_',' ')}</span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => updateStatus(r.supplier.id, 'active')}><Play className="mr-2" size={16}/>Activate</Button>
                    <Button variant="secondary" onClick={() => updateStatus(r.supplier.id, 'on_hold')}><Pause className="mr-2" size={16}/>Hold</Button>
                    <Button variant="secondary" onClick={() => updateStatus(r.supplier.id, 'terminated')}><XCircle className="mr-2" size={16}/>Terminate</Button>
                    {r.nextExpiry && <Button variant="primary"><RefreshCw className="mr-2" size={16}/>Renew</Button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}


