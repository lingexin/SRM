"use client"

import Layout from '@/components/layout/Layout'
import { datasets } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function DataManagementPage() {
  const [rows, setRows] = useState(datasets)

  const importData = () => alert('Import started (simulated)')
  const exportData = () => alert('Export queued (simulated)')
  const archive = (id: number) => alert(`Archived dataset #${id} (simulated)`) 
  const purge = (id: number) => setRows(prev => prev.map(d => d.id === id ? { ...d, records: 0, status: 'healthy' } : d))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
            <p className="text-gray-600 mt-2">Import/export, retention, and dataset health.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={importData}>Import</Button>
            <Button variant="primary" onClick={exportData}>Export</Button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Dataset</th>
                <th className="text-left px-4 py-2">Records</th>
                <th className="text-left px-4 py-2">Size (MB)</th>
                <th className="text-left px-4 py-2">Last Updated</th>
                <th className="text-left px-4 py-2">Retention</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(d => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-3">{d.name}</td>
                  <td className="px-4 py-3">{d.records.toLocaleString()}</td>
                  <td className="px-4 py-3">{d.sizeMB}</td>
                  <td className="px-4 py-3">{new Date(d.lastUpdated).toLocaleString()}</td>
                  <td className="px-4 py-3">{d.retention}</td>
                  <td className="px-4 py-3 capitalize">{d.status}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => archive(d.id)}>Archive</Button>
                    <Button variant="secondary" onClick={() => purge(d.id)}>Purge</Button>
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


