"use client"

import Layout from '@/components/layout/Layout'
import { currentUser } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const [user, setUser] = useState(currentUser)
  const [editing, setEditing] = useState(false)

  const save = () => {
    setEditing(false)
    alert('资料已保存（模拟）')
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">个人资料</h1>
            <p className="text-gray-600 mt-2">查看和更新您的个人信息。</p>
          </div>
          {!editing ? (
            <Button variant="primary" onClick={() => setEditing(true)}>编辑资料</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => { setUser(currentUser); setEditing(false) }}>取消</Button>
              <Button variant="primary" onClick={save}>保存</Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-semibold">{user.name.split(' ').map(n=>n[0]).join('')}</div>
            <div className="mt-4">
              <div className="text-lg font-semibold text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.role} • {user.department}</div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <div>唯一编码： <span className="font-mono text-gray-900">{user.uniqueCode}</span></div>
              <div>加入时间： {user.joinedAt}</div>
              <div>最后登录： {new Date(user.lastLogin).toLocaleString()}</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="姓名" value={user.name} onChange={v => setUser({ ...user, name: v })} editing={editing} />
              <Field label="用户名" value={user.username} onChange={v => setUser({ ...user, username: v })} editing={editing} />
              <Field label="邮箱" value={user.email} onChange={v => setUser({ ...user, email: v })} editing={editing} />
              <Field label="电话" value={user.phone} onChange={v => setUser({ ...user, phone: v })} editing={editing} />
              <Field label="位置" value={user.location} onChange={v => setUser({ ...user, location: v })} editing={editing} />
              <Field label="部门" value={user.department} onChange={v => setUser({ ...user, department: v })} editing={editing} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function Field({ label, value, onChange, editing }: { label: string; value: string; onChange: (v: string) => void; editing: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {editing ? (
        <input aria-label={label} placeholder={label} value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
      ) : (
        <div className="mt-1 text-sm text-gray-900">{value}</div>
      )}
    </div>
  )
}


