"use client"

import Layout from '@/components/layout/Layout'
import { rolesPermissions } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function UserRolesPermissionsPage() {
  const [rows, setRows] = useState(rolesPermissions)
  const [selected, setSelected] = useState<number | null>(rows[0]?.id ?? null)
  const [newPerm, setNewPerm] = useState('')

  const addPermission = () => {
    if (!selected || !newPerm.trim()) {
      return
    }
    setRows(prev => prev.map(r => r.id === selected ? { ...r, permissions: Array.from(new Set([...r.permissions, newPerm.trim()])) } : r))
    setNewPerm('')
  }

  const removePermission = (perm: string) => {
    if (!selected) {
      return
    }
    setRows(prev => prev.map(r => r.id === selected ? { ...r, permissions: r.permissions.filter(p => p !== perm) } : r))
  }

  const selectedRole = rows.find(r => r.id === selected) || rows[0]

  return (
    <Layout>
      <div className="p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow divide-y">
          {rows.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id)} className={`w-full text-left p-4 hover:bg-gray-50 ${selected === r.id ? 'bg-gray-50' : ''}`}>
              <div className="font-medium text-gray-900">{r.role}</div>
              <div className="text-xs text-gray-500">{r.users} users • {r.permissions.length} permissions</div>
              <div className="text-xs text-gray-500">{r.description}</div>
            </button>
          ))}
        </aside>
        <section className="col-span-8 xl:col-span-9 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Roles & Permissions</h1>
              <p className="text-gray-600 mt-2">Manage roles, users count, and fine-grained permissions.</p>
            </div>
            <Button variant="primary">Add Role</Button>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-900">{selectedRole.role} Permissions</div>
            <div className="mt-2 flex gap-2">
              <input value={newPerm} onChange={e => setNewPerm(e.target.value)} placeholder="Add permission (e.g., procurement.manage)" className="border rounded px-3 py-2 flex-1" />
              <Button variant="secondary" onClick={addPermission}>Add</Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {selectedRole.permissions.map(p => (
              <div key={p} className="border rounded px-3 py-2 text-sm flex items-center justify-between">
                <span>{p}</span>
                <button className="text-xs text-red-600" onClick={() => removePermission(p)}>Remove</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}


