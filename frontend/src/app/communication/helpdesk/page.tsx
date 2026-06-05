"use client"

import Layout from '@/components/layout/Layout'
import { tickets } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

type Status = 'open' | 'in_progress' | 'resolved' | 'closed'

export default function SupplierHelpdeskPage() {
  const [rows, setRows] = useState(tickets)
  const update = (id: number, status: Status) => setRows(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  const assign = (id: number) => setRows(prev => prev.map(t => t.id === id ? { ...t, assignedTo: 'You' } : t))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Supplier Helpdesk</h1>
          <p className="text-gray-600 mt-2">Manage support tickets from suppliers.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Priority</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Assigned</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-3">{t.title}</td>
                  <td className="px-4 py-3">{t.supplier}</td>
                  <td className="px-4 py-3 capitalize">{t.category}</td>
                  <td className="px-4 py-3 capitalize">{t.priority}</td>
                  <td className="px-4 py-3 capitalize">{t.status}</td>
                  <td className="px-4 py-3">{t.assignedTo ?? '-'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => assign(t.id)}>Assign</Button>
                    <Button variant="secondary" onClick={() => update(t.id, 'in_progress')}>Start</Button>
                    <Button variant="secondary" onClick={() => update(t.id, 'resolved')}>Resolve</Button>
                    <Button variant="secondary" onClick={() => update(t.id, 'closed')}>Close</Button>
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


