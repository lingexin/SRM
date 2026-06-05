"use client"

import Layout from '@/components/layout/Layout'
import { rfqs, rfps } from '@/data/mockData'
import { useMemo, useState } from 'react'
import { Filter, Search, Trophy } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function RfqManagementPage() {
  const [rfpFilter, setRfpFilter] = useState<number | 'all'>('all')
  const [sortBy, setSortBy] = useState<'amount' | 'date'>('amount')

  const rows = useMemo(() => {
    let r = rfqs.slice()
    if (rfpFilter !== 'all') {
      r = r.filter(q => q.rfpId === rfpFilter)
    }
    r.sort((a, b) => {
      if (sortBy === 'amount') {
        return b.totalAmount - a.totalAmount
      }
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    })
    return r
  }, [rfpFilter, sortBy])

  const bestBid = (rfpId: number) => rows.filter(r => r.rfpId === rfpId).reduce((min, cur) => cur.totalAmount < (min?.totalAmount ?? Infinity) ? cur : min, undefined as any)

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">RFQ Management</h1>
            <p className="text-gray-600 mt-2">Track quotations linked to RFPs. Compare and auto-select best offers.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600"><Filter size={16}/>RFP</div>
            <select aria-label="RFP filter" value={rfpFilter as any} onChange={e => setRfpFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="border rounded px-2 py-1">
              <option value="all">All</option>
              {rfps.map(r => (<option key={r.id} value={r.id}>{r.title}</option>))}
            </select>
            <div className="flex items-center gap-2 text-gray-600"><Search size={16}/>Sort</div>
            <select aria-label="Sort by" value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="border rounded px-2 py-1">
              <option value="amount">Amount (High → Low)</option>
              <option value="date">Submitted (New → Old)</option>
            </select>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">RFP</th>
                  <th className="text-left px-4 py-2">Supplier</th>
                  <th className="text-left px-4 py-2">Total Amount</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Best Bid</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(q => {
                  const best = bestBid(q.rfpId)
                  const isBest = best && best.id === q.id
                  return (
                    <tr key={q.id} className="border-t">
                      <td className="px-4 py-3">{q.rfpTitle}</td>
                      <td className="px-4 py-3">{q.supplierName}</td>
                      <td className="px-4 py-3">${q.totalAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 capitalize">{q.status}</td>
                      <td className="px-4 py-3">
                        {isBest ? <span className="inline-flex items-center gap-1 text-green-700"><Trophy size={16}/>Best</span> : '-' }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}


