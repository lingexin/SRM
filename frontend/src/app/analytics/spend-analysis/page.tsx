"use client"

import Layout from '@/components/layout/Layout'
import { spendAnalysis, topSuppliersBySpend } from '@/data/mockData'
import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'

export default function SpendAnalysisPage() {
  const [minPercent, setMinPercent] = useState(0)
  const [category, setCategory] = useState<'all' | string>('all')

  const categories = useMemo(() => ['all', ...spendAnalysis.map(s => s.category)], [])
  const rows = useMemo(() => spendAnalysis.filter(s => (category === 'all' ? true : s.category === category) && s.percentage >= minPercent), [category, minPercent])

  const exportCsv = () => {
    const header = 'Category,Amount,Percentage,Trend,Change\n'
    const body = rows.map(r => `${r.category},${r.amount},${r.percentage},${r.trend},${r.change}`).join('\n')
    const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'spend-analysis.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="p-6 grid grid-cols-12 gap-6">
        <section className="col-span-8 xl:col-span-9 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spend Analysis</h1>
              <p className="text-gray-600 mt-2">Analyze spend by category and export results.</p>
            </div>
            <Button variant="primary" onClick={exportCsv}>Export CSV</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <label className="text-sm text-gray-600">Category
              <select aria-label="Category filter" value={category} onChange={e => setCategory(e.target.value)} className="ml-2 border rounded px-2 py-1">
                {categories.map(c => (<option key={c} value={c}>{c}</option>))}
              </select>
            </label>
            <label className="text-sm text-gray-600">Min %
              <input aria-label="Min percentage" type="number" value={minPercent} onChange={e => setMinPercent(Number(e.target.value || 0))} className="ml-2 border rounded px-2 py-1 w-20" />
            </label>
          </div>
          <div className="space-y-4">
            {rows.map(r => (
              <div key={r.category} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900">{r.category}</div>
                  <div className="text-sm text-gray-600">{r.percentage}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`h-2 rounded-full ${r.trend === 'up' ? 'bg-green-500' : r.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'}`} style={{ width: `${r.percentage}%` }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">${r.amount.toLocaleString()} • {r.trend} ({r.change}%)</div>
              </div>
            ))}
          </div>
        </section>
        <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow p-6">
          <div className="text-sm font-semibold text-gray-900 mb-2">Top Suppliers by Spend</div>
          <div className="space-y-3">
            {topSuppliersBySpend.map(s => (
              <div key={s.id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-600">{s.percentage}%</div>
                </div>
                <div className="text-xs text-gray-500">${s.spend.toLocaleString()} • {s.contracts} contracts</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  )
}


