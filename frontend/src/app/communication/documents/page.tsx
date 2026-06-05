"use client"

import Layout from '@/components/layout/Layout'
import { documents } from '@/data/mockData'
import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import { Filter, Upload } from 'lucide-react'

export default function DocumentSharingPage() {
  const [category, setCategory] = useState<'all' | 'Legal' | 'Performance' | 'Compliance'>('all')
  const [rows, setRows] = useState(documents)
  const filtered = useMemo(() => rows.filter(d => category === 'all' ? true : d.category === category), [rows, category])
  const upload = () => alert('Simulated upload')

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Sharing</h1>
            <p className="text-gray-600 mt-2">Organize and share documents with teams and suppliers.</p>
          </div>
          <Button variant="primary" onClick={upload}><Upload className="mr-2" size={16}/>Upload</Button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600"><Filter size={16}/>Category</div>
            <select aria-label="Document category filter" value={category} onChange={e => setCategory(e.target.value as any)} className="border rounded px-2 py-1">
              <option value="all">All</option>
              <option value="Legal">Legal</option>
              <option value="Performance">Performance</option>
              <option value="Compliance">Compliance</option>
            </select>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2">Name</th>
                  <th className="text-left px-4 py-2">Type</th>
                  <th className="text-left px-4 py-2">Size</th>
                  <th className="text-left px-4 py-2">Uploaded By</th>
                  <th className="text-left px-4 py-2">Shared With</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-3">{d.name}</td>
                    <td className="px-4 py-3">{d.type}</td>
                    <td className="px-4 py-3">{d.size}</td>
                    <td className="px-4 py-3">{d.uploadedBy}</td>
                    <td className="px-4 py-3">{d.sharedWith}</td>
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


