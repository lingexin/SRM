"use client"

import Layout from '@/components/layout/Layout'
import { invoices } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export default function InvoicesPaymentsPage() {
  const [rows, setRows] = useState(invoices)

  const approve = (id: number) => setRows(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i))
  const pay = (id: number) => setRows(prev => prev.map(i => i.id === id ? { ...i, status: 'paid', paymentHistory: [...i.paymentHistory, { id: i.paymentHistory.length + 1, amount: i.amount, paymentDate: new Date().toISOString(), method: 'bank_transfer', reference: `PAY-${i.id}-${Date.now()}` }] } : i))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Invoices & Payments</h1>
          <p className="text-gray-600 mt-2">Approve invoices and record payments with simple actions.</p>
        </div>
        <div className="bg-white rounded-lg shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Supplier</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Due</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(i => (
                <tr key={i.id} className="border-t">
                  <td className="px-4 py-3">{i.supplierName}</td>
                  <td className="px-4 py-3">${i.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{formatDate(i.dueDate)}</td>
                  <td className="px-4 py-3 capitalize">{i.status}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="secondary" onClick={() => approve(i.id)} disabled={i.status !== 'pending'}>Approve</Button>
                    <Button variant="primary" onClick={() => pay(i.id)} disabled={i.status !== 'approved'}>Pay Now</Button>
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


