"use client"

import Layout from '@/components/layout/Layout'
import { complianceDocuments } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ComplianceDocsPage() {
  const [rows, setRows] = useState(complianceDocuments)
  const renew = (id: number) => setRows(prev => prev.map(d => d.id === id ? { ...d, status: 'valid', expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString() } : d))
  const upload = () => alert('Simulated upload')

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Documents</h1>
            <p className="text-gray-600 mt-2">Track document validity and renew expiring ones.</p>
          </div>
          <Button variant="primary" onClick={upload}>Upload Document</Button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Issue</th>
                <th className="text-left px-4 py-2">Expiry</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(d => (
                <tr key={d.id} className="border-t">
                  <td className="px-4 py-3">{d.name}</td>
                  <td className="px-4 py-3">{d.supplierName}</td>
                  <td className="px-4 py-3 capitalize">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${d.status === 'valid' ? 'bg-green-100 text-green-700' : d.status === 'expiring' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3">{d.issueDate}</td>
                  <td className="px-4 py-3">{d.expiryDate}</td>
                  <td className="px-4 py-3">
                    <Button variant="secondary" onClick={() => renew(d.id)}>Renew</Button>
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


