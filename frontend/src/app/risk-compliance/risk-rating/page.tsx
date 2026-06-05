"use client"

import Layout from '@/components/layout/Layout'
import { suppliers, riskAssessments } from '@/data/mockData'
import { useMemo, useState } from 'react'

type Weights = { financial: number; operational: number; geopolitical: number; cybersecurity: number; compliance: number }

const defaultWeights: Weights = { financial: 30, operational: 20, geopolitical: 10, cybersecurity: 20, compliance: 20 }

export default function SupplierRiskRatingPage() {
  const [weights, setWeights] = useState<Weights>(defaultWeights)

  const rows = useMemo(() => {
    const total = Object.values(weights).reduce((a, b) => a + b, 0)
    return suppliers.map(s => {
      const assessments = riskAssessments.filter(r => r.supplierId === s.id)
      const typeToScore: Record<string, number> = {}
      assessments.forEach(a => { typeToScore[a.type] = a.score })
      const weighted = (
        (typeToScore['financial'] ?? s.riskScore) * (weights.financial/total) +
        (typeToScore['operational'] ?? 70) * (weights.operational/total) +
        (typeToScore['geopolitical'] ?? 70) * (weights.geopolitical/total) +
        (typeToScore['cybersecurity'] ?? 70) * (weights.cybersecurity/total) +
        (typeToScore['compliance'] ?? 70) * (weights.compliance/total)
      )
      return { supplier: s, score: Math.round(weighted) }
    }).sort((a, b) => b.score - a.score)
  }, [weights])

  const setWeight = (key: keyof Weights, value: number) => setWeights(prev => ({ ...prev, [key]: value }))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Supplier Risk Rating</h1>
          <p className="text-gray-600 mt-2">Adjust factor weights to recalculate supplier risk scores.</p>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow p-4">
            <div className="text-sm font-semibold text-gray-900 mb-2">Weights</div>
            {Object.entries(weights).map(([k, v]) => (
              <label key={k} className="block text-sm text-gray-600 mb-3 capitalize">
                {k}
                <input aria-label={`${k} weight`} type="number" value={v} onChange={e => setWeight(k as keyof Weights, Number(e.target.value || 0))} className="ml-2 border rounded px-2 py-1 w-20" />
              </label>
            ))}
            <div className="text-xs text-gray-500">Weights are normalized automatically.</div>
          </aside>
          <section className="col-span-8 xl:col-span-9 bg-white rounded-lg shadow overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Supplier</th>
                  <th className="text-left px-4 py-2">Weighted Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.supplier.id} className="border-t">
                    <td className="px-4 py-3">{r.supplier.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(r.score)}`}>{r.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </Layout>
  )
}

function getRiskColor(score: number) {
  if (score >= 80) {
    return 'bg-green-100 text-green-700'
  }
  if (score >= 60) {
    return 'bg-yellow-100 text-yellow-700'
  }
  if (score >= 40) {
    return 'bg-orange-100 text-orange-700'
  }
  return 'bg-red-100 text-red-700'
}


