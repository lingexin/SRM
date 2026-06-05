"use client"

import Layout from '@/components/layout/Layout'
import { contracts } from '@/data/mockData'
import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export default function ContractsPage() {
  const [rows, setRows] = useState(contracts)
  const renew = (id: number) => {
    setRows(prev => prev.map(c => c.id === id ? { ...c, endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' } : c))
  }

  const soonToExpire = useMemo(() => {
    const now = Date.now()
    return rows.filter(c => new Date(c.endDate).getTime() - now < 60 * 24 * 60 * 60 * 1000)
  }, [rows])

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Contract Management</h1>
          <p className="text-gray-600 mt-2">Track terms and renew expiring contracts.</p>
        </div>

        {soonToExpire.length > 0 && (
          <div className="mb-4 p-3 rounded bg-amber-50 text-amber-800 text-sm">{soonToExpire.length} contract(s) expiring soon.</div>
        )}

        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Start</th>
                <th className="text-left px-4 py-2">End</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3">{c.title}</td>
                  <td className="px-4 py-3">{c.supplierName}</td>
                  <td className="px-4 py-3 capitalize">{c.type}</td>
                  <td className="px-4 py-3">{formatDate(c.startDate)}</td>
                  <td className="px-4 py-3">{formatDate(c.endDate)}</td>
                  <td className="px-4 py-3 capitalize">{c.status}</td>
                  <td className="px-4 py-3">
                    <Button variant="secondary" onClick={() => renew(c.id)}>Renew 12 months</Button>
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


