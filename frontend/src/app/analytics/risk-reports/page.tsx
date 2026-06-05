"use client"

import Layout from '@/components/layout/Layout'
import { riskAssessments, complianceDocuments } from '@/data/mockData'

export default function RiskComplianceReportsPage() {
  const riskSummary = riskAssessments.map(r => ({ supplierName: r.supplierName, type: r.type, score: r.score }))
  const complianceSummary = complianceDocuments.reduce<Record<string, number>>((acc, d) => {
    acc[d.status] = (acc[d.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <Layout>
      <div className="p-6 grid grid-cols-12 gap-6">
        <section className="col-span-7 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Reports</h1>
          <p className="text-gray-600 mb-4">Latest risk assessments by supplier.</p>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Supplier</th>
                  <th className="text-left px-4 py-2">Type</th>
                  <th className="text-left px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {riskSummary.map((r, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-3">{r.supplierName}</td>
                    <td className="px-4 py-3 capitalize">{r.type}</td>
                    <td className="px-4 py-3">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="col-span-5 bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-900 mb-2">Compliance Summary</div>
          <ul className="space-y-2 text-sm">
            {Object.entries(complianceSummary).map(([k, v]) => (
              <li key={k} className="flex items-center justify-between">
                <span className="capitalize">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Layout>
  )
}


