"use client"

import Layout from '@/components/layout/Layout'
import { purchaseOrders } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function PurchaseOrdersPage() {
  const [rows, setRows] = useState(purchaseOrders)

  const updateStatus = (id: number, status: 'approved' | 'sent' | 'received' | 'cancelled') => {
    setRows(prev => prev.map(p => p.id === id ? { ...p, status } : p))
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600 mt-2">Create, approve, and track purchase orders.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.supplierName}</td>
                  <td className="px-4 py-3">${p.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{p.status}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => updateStatus(p.id, 'approved')}>Approve</Button>
                    <Button variant="secondary" onClick={() => updateStatus(p.id, 'sent')}>Send</Button>
                    <Button variant="secondary" onClick={() => updateStatus(p.id, 'received')}>Mark Received</Button>
                    <Button variant="secondary" onClick={() => updateStatus(p.id, 'cancelled')}>Cancel</Button>
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


