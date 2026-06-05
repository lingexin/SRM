"use client"

import Layout from '@/components/layout/Layout'
import { securityPolicies } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function SecurityAccessControlsPage() {
  const [policies, setPolicies] = useState(securityPolicies)

  const toggle = (id: number) => setPolicies(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  const updateValue = (id: number, value: string | number) => setPolicies(prev => prev.map(p => p.id === id ? { ...p, value } : p))

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Security & Access Controls</h1>
          <p className="text-gray-600 mt-2">Manage MFA, sessions, and network restrictions.</p>
        </div>
        <div className="bg-white rounded-lg shadow divide-y">
          {policies.map(p => (
            <div key={p.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-600">{p.description}</div>
              </div>
              <div className="flex items-center gap-2">
                {'value' in p && (
                  <input aria-label={`${p.name} value`} value={(p as any).value ?? ''} onChange={e => updateValue(p.id, isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))} className="border rounded px-2 py-1 w-28" />
                )}
                <Button variant="secondary" onClick={() => toggle(p.id)}>{p.enabled ? 'Disable' : 'Enable'}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}


