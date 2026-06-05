"use client"

import Layout from '@/components/layout/Layout'
import { useState } from 'react'
import Button from '@/components/ui/Button'

type Builder = { title: string; dataSource: 'spend' | 'performance' | 'risk'; groupBy: string; metric: string }

export default function CustomReportsPage() {
  const [b, setB] = useState<Builder>({ title: '', dataSource: 'spend', groupBy: 'category', metric: 'amount' })
  const [reports, setReports] = useState<Builder[]>([])

  const generate = () => {
    if (!b.title.trim()) {
      return alert('Enter report title')
    }
    setReports(prev => [{ ...b }, ...prev])
    alert('Report queued (simulated)')
  }

  return (
    <Layout>
      <div className="p-6 grid grid-cols-12 gap-6">
        <section className="col-span-7 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Custom Reports</h1>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="Title" value={b.title} onChange={e => setB({ ...b, title: e.target.value })} className="border rounded px-3 py-2" />
            <label className="text-sm text-gray-600">Data Source
              <select aria-label="Data source" value={b.dataSource} onChange={e => setB({ ...b, dataSource: e.target.value as any })} className="ml-2 border rounded px-2 py-1">
                <option value="spend">Spend</option>
                <option value="performance">Performance</option>
                <option value="risk">Risk</option>
              </select>
            </label>
            <input placeholder="Group by" value={b.groupBy} onChange={e => setB({ ...b, groupBy: e.target.value })} className="border rounded px-3 py-2" />
            <input placeholder="Metric" value={b.metric} onChange={e => setB({ ...b, metric: e.target.value })} className="border rounded px-3 py-2" />
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={generate}>Generate</Button>
          </div>
        </section>
        <aside className="col-span-5 bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-900 mb-2">Recent Custom Reports</div>
          <ul className="space-y-2 text-sm">
            {reports.map((r, idx) => (
              <li key={idx} className="border rounded p-3">
                <div className="font-medium text-gray-900">{r.title}</div>
                <div className="text-xs text-gray-500">{r.dataSource} • group by {r.groupBy} • metric {r.metric}</div>
              </li>
            ))}
            {reports.length === 0 && <li className="text-sm text-gray-600">No custom reports yet.</li>}
          </ul>
        </aside>
      </div>
    </Layout>
  )
}


