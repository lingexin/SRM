"use client"

import Layout from '@/components/layout/Layout'
import { useMemo, useState } from 'react'
import { suppliers, riskAssessments, complianceDocuments } from '@/data/mockData'
import { AlertTriangle, Shield, FlagTriangleRight, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function RiskAssessmentPage() {
  const [minScore, setMinScore] = useState(0)
  const [type, setType] = useState<'all' | 'financial' | 'operational' | 'geopolitical' | 'cybersecurity' | 'compliance'>('all')

  const rows = useMemo(() => {
    return suppliers.map(s => {
      const assessments = riskAssessments.filter(r => r.supplierId === s.id)
      const latest = assessments[0]
      const docs = complianceDocuments.filter(d => d.supplierId === s.id)
      const expiring = docs.filter(d => d.status !== 'valid').length
      const score = latest?.score ?? s.riskScore
      return { supplier: s, score, type: latest?.type ?? 'financial', expiring }
    })
    .filter(r => r.score >= minScore)
    .filter(r => type === 'all' ? true : r.type === type)
    .sort((a, b) => b.score - a.score)
  }, [minScore, type])

  const flagSupplier = (id: number) => {
    alert(`Flagged supplier #${id} for risk review`) // simple simulation
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
            <p className="text-gray-600 mt-2">Monitor risk scores, expiring compliance docs, and flag suppliers.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600"><Filter size={16}/>Filters:</div>
            <label className="text-sm text-gray-600">Min Score
              <input type="number" min={0} max={100} value={minScore} onChange={e => setMinScore(parseInt(e.target.value || '0'))} className="ml-2 border rounded px-2 py-1 w-20" />
            </label>
            <label className="text-sm text-gray-600">Type
              <select value={type} onChange={e => setType(e.target.value as any)} className="ml-2 border rounded px-2 py-1">
                <option value="all">All</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="geopolitical">Geopolitical</option>
                <option value="cybersecurity">Cybersecurity</option>
                <option value="compliance">Compliance</option>
              </select>
            </label>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Supplier</th>
                  <th className="text-left px-4 py-2">Risk Score</th>
                  <th className="text-left px-4 py-2">Risk Type</th>
                  <th className="text-left px-4 py-2">Compliance Alerts</th>
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
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getRiskColor(r.score)}`}>{r.score}</span>
                    </td>
                    <td className="px-4 py-3 capitalize">{r.type}</td>
                    <td className="px-4 py-3">
                      {r.expiring > 0 ? (
                        <span className="flex items-center gap-1 text-amber-700"><AlertTriangle size={16}/> {r.expiring} issues</span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-700"><Shield size={16}/> Clear</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="secondary" onClick={() => flagSupplier(r.supplier.id)}>
                        <FlagTriangleRight className="mr-2" size={16}/> Flag for Review
                      </Button>
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


