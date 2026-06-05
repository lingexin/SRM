"use client"

import Layout from '@/components/layout/Layout'
import { performanceMetrics } from '@/data/mockData'
import { useMemo, useState } from 'react'

export default function SupplierPerformanceReportsPage() {
  const [period, setPeriod] = useState<'all' | string>('all')
  const periods = useMemo(() => ['all', ...new Set(performanceMetrics.map(p => p.period))] as string[], [])
  const rows = useMemo(() => performanceMetrics.filter(p => period === 'all' ? true : p.period === period), [period])

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Performance Reports</h1>
            <p className="text-gray-600 mt-2">Filter by period and review KPI performance.</p>
          </div>
          <label className="text-sm text-gray-600">Period
            <select aria-label="Period filter" value={period} onChange={e => setPeriod(e.target.value)} className="ml-2 border rounded px-2 py-1">
              {periods.map(p => (<option key={p} value={p}>{p}</option>))}
            </select>
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {rows.map(pm => (
            <div key={pm.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{pm.supplierName}</div>
                  <div className="text-sm text-gray-500">{pm.period}</div>
                </div>
                <div className="text-3xl font-semibold text-gray-900">{pm.overallScore}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {pm.kpis.map(k => (
                  <div key={k.name} className="p-3 rounded border">
                    <div className="text-gray-500 text-xs">{k.name}</div>
                    <div className="font-medium">{k.score} (target {k.target})</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


