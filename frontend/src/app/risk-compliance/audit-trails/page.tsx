"use client"

import Layout from '@/components/layout/Layout'
import { auditLogs } from '@/data/mockData'
import { useMemo, useState } from 'react'

export default function AuditTrailsPage() {
  const [action, setAction] = useState<'all' | 'CREATE' | 'UPDATE' | 'DELETE'>('all')
  const [resource, setResource] = useState<'all' | 'RFP' | 'Contract' | 'Document'>('all')

  const rows = useMemo(() => {
    return auditLogs
      .filter(a => action === 'all' ? true : a.action === action)
      .filter(a => resource === 'all' ? true : a.resource === resource)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [action, resource])

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Audit Trails</h1>
          <p className="text-gray-600 mt-2">System-wide audit logs with filters.</p>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex gap-3">
            <label className="text-sm text-gray-600">Action
              <select aria-label="Action filter" value={action} onChange={e => setAction(e.target.value as any)} className="ml-2 border rounded px-2 py-1">
                <option value="all">All</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
              </select>
            </label>
            <label className="text-sm text-gray-600">Resource
              <select aria-label="Resource filter" value={resource} onChange={e => setResource(e.target.value as any)} className="ml-2 border rounded px-2 py-1">
                <option value="all">All</option>
                <option value="RFP">RFP</option>
                <option value="Contract">Contract</option>
                <option value="Document">Document</option>
              </select>
            </label>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Timestamp</th>
                  <th className="text-left px-4 py-2">User</th>
                  <th className="text-left px-4 py-2">Action</th>
                  <th className="text-left px-4 py-2">Resource</th>
                  <th className="text-left px-4 py-2">Details</th>
                  <th className="text-left px-4 py-2">IP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(a => (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3">{new Date(a.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3">{a.user}</td>
                    <td className="px-4 py-3">{a.action}</td>
                    <td className="px-4 py-3">{a.resource} #{a.resourceId}</td>
                    <td className="px-4 py-3">{a.details}</td>
                    <td className="px-4 py-3">{a.ipAddress}</td>
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


