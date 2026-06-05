"use client"

import Layout from '@/components/layout/Layout'
import { integrations } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function IntegrationsPage() {
  const [rows, setRows] = useState(integrations)
  const toggle = (id: number) => setRows(prev => prev.map(i => i.id === id ? { ...i, status: i.status === 'active' ? 'inactive' : 'active' } : i))
  const sync = (id: number) => setRows(prev => prev.map(i => i.id === id ? { ...i, lastSync: new Date().toISOString(), records: (i as any).records ? (i as any).records + Math.floor(Math.random()*100) : (i as any).records } : i))
  const viewLogs = (name: string) => alert(`Viewing logs for ${name} (simulated)`) 

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Enable/disable, sync, and monitor external systems.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Type</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Last Sync</th>
                <th className="text-left px-4 py-2">Records</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(i => (
                <tr key={i.id} className="border-t">
                  <td className="px-4 py-3">{i.name}</td>
                  <td className="px-4 py-3 capitalize">{i.type}</td>
                  <td className="px-4 py-3 capitalize">{i.status}</td>
                  <td className="px-4 py-3">{i.lastSync ?? '-'}</td>
                  <td className="px-4 py-3">{(i as any).records ?? '-'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => toggle(i.id)}>{i.status === 'active' ? 'Disable' : 'Enable'}</Button>
                    <Button variant="secondary" onClick={() => sync(i.id)}>Sync Now</Button>
                    <Button variant="secondary" onClick={() => viewLogs(i.name)}>View Logs</Button>
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


