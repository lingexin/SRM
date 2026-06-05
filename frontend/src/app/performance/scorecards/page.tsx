"use client"

import Layout from '@/components/layout/Layout'
import { performanceMetrics } from '@/data/mockData'

export default function ScorecardsReviewsPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Scorecards & Reviews</h1>
          <p className="text-gray-600 mt-2">View supplier performance scorecards and KPI breakdowns.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {performanceMetrics.map(pm => (
            <div key={pm.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{pm.supplierName}</div>
                  <div className="text-sm text-gray-500">Period: {pm.period}</div>
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


