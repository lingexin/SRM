"use client"

import Layout from '@/components/layout/Layout'
import { kpis } from '@/data/mockData'
import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import { Filter, Save } from 'lucide-react'

type Category = 'all' | 'delivery' | 'quality' | 'cost' | 'responsiveness'

export default function KPIsMetricsPage() {
  const [rows, setRows] = useState(kpis)
  const [category, setCategory] = useState<Category>('all')

  const filtered = useMemo(() => rows.filter(r => category === 'all' ? true : r.category === category), [rows, category])

  const updateTarget = (id: number, next: number) => setRows(prev => prev.map(k => k.id === id ? { ...k, target: next } : k))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">KPIs & Metrics</h1>
          <p className="text-gray-600 mt-2">Track KPI progress; adjust targets and monitor trends.</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600"><Filter size={16}/>Category</div>
            <select aria-label="KPI category filter" value={category} onChange={e => setCategory(e.target.value as Category)} className="border rounded px-2 py-1">
              <option value="all">All</option>
              <option value="delivery">Delivery</option>
              <option value="quality">Quality</option>
              <option value="cost">Cost</option>
              <option value="responsiveness">Responsiveness</option>
            </select>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">KPI</th>
                  <th className="text-left px-4 py-2">Current</th>
                  <th className="text-left px-4 py-2">Target</th>
                  <th className="text-left px-4 py-2">Trend</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(k => (
                  <tr key={k.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{k.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{k.category} • {k.period}</div>
                    </td>
                    <td className="px-4 py-3">{k.current}{k.unit}</td>
                    <td className="px-4 py-3">
                      <input aria-label={`Target for ${k.name}`} type="number" value={k.target} onChange={e => updateTarget(k.id, Number(e.target.value || 0))} className="border rounded px-2 py-1 w-24" />
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${k.trend === 'up' ? 'bg-green-100 text-green-700' : k.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{k.trend}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="secondary"><Save className="mr-2" size={16}/>Save Target</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}


