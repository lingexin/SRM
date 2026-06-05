"use client"

import Layout from '@/components/layout/Layout'
import { feedbackItems } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

type Status = 'open' | 'in_progress' | 'resolved' | 'closed'

export default function FeedbackIssuesPage() {
  const [rows, setRows] = useState(feedbackItems)

  const updateStatus = (id: number, status: Status) => setRows(prev => prev.map(f => f.id === id ? { ...f, status } : f))
  const assign = (id: number) => setRows(prev => prev.map(f => f.id === id ? { ...f, assignedTo: 'You' } : f))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Feedback & Issues</h1>
          <p className="text-gray-600 mt-2">Track supplier feedback, issues, and corrective actions.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Priority</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Assigned</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(f => (
                <tr key={f.id} className="border-t">
                  <td className="px-4 py-3">{f.supplierName}</td>
                  <td className="px-4 py-3">{f.title}</td>
                  <td className="px-4 py-3 capitalize">{f.type}</td>
                  <td className="px-4 py-3 capitalize">{f.priority}</td>
                  <td className="px-4 py-3 capitalize">{f.status}</td>
                  <td className="px-4 py-3">{f.assignedTo ?? '-'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => assign(f.id)}>Assign to me</Button>
                    <Button variant="secondary" onClick={() => updateStatus(f.id, 'in_progress')}>Start</Button>
                    <Button variant="secondary" onClick={() => updateStatus(f.id, 'resolved')}>Resolve</Button>
                    <Button variant="secondary" onClick={() => updateStatus(f.id, 'closed')}>Close</Button>
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


