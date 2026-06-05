"use client"

import Layout from '@/components/layout/Layout'
import { complianceDocuments } from '@/data/mockData'
import { useMemo } from 'react'

export default function CertificationsManagementPage() {
  const certs = useMemo(() => complianceDocuments.filter(d => ['iso','safety','environmental'].includes(d.type)), [])
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Certifications Management</h1>
          <p className="text-gray-600 mt-2">Overview of supplier certifications and validity.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map(c => (
            <div key={c.id} className="bg-white rounded-lg shadow p-5">
              <div className="text-lg font-semibold text-gray-900">{c.name}</div>
              <div className="text-sm text-gray-600">{c.supplierName}</div>
              <div className="mt-2 text-sm">Issued: {c.issueDate}</div>
              <div className="text-sm">Expiry: {c.expiryDate}</div>
              <div className="mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${c.status === 'valid' ? 'bg-green-100 text-green-700' : c.status === 'expiring' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


