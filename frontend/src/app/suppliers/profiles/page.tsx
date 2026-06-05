"use client"

import Layout from '@/components/layout/Layout'
import { useMemo, useState } from 'react'
import { suppliers, performanceMetrics } from '@/data/mockData'
import { Search, FileText, Users as UsersIcon, FolderOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

type TabKey = 'overview' | 'contacts' | 'documents' | 'performance'

export default function SupplierProfilesPage() {
  const [query, setQuery] = useState('')
  const [activeSupplierId, setActiveSupplierId] = useState<number>(() => suppliers[0]?.id ?? 1)
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return suppliers.filter(s =>
      s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q)
    )
  }, [query])

  const active = useMemo(() => filtered.find(s => s.id === activeSupplierId) ?? filtered[0], [filtered, activeSupplierId])

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Profiles</h1>
            <p className="text-gray-600 mt-2">Deep dive into supplier details, contacts, docs, and performance.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 border rounded px-3 py-2 text-gray-600">
              <Search size={16} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search suppliers" className="w-full outline-none" />
            </div>
            <div className="mt-4 max-h-[600px] overflow-auto divide-y">
              {filtered.map(s => (
                <button key={s.id} onClick={() => setActiveSupplierId(s.id)} className={`w-full text-left py-3 px-2 hover:bg-gray-50 ${active?.id === s.id ? 'bg-gray-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.industry} • {s.location}</div>
                    </div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">{s.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="col-span-8 xl:col-span-9">
            {active && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{active.name}</h2>
                      <div className="text-sm text-gray-500">{active.email} • {active.phone} • {active.location}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="primary">Add Contact</Button>
                      <Button variant="secondary">Upload Document</Button>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700">Status: {active.status}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Risk: {active.riskScore}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Perf: {active.performance}</span>
                  </div>
                </div>

                <div className="px-6 pt-4">
                  <div className="flex gap-4 border-b">
                    <TabButton icon={<FileText size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <TabButton icon={<UsersIcon size={16} />} label="Contacts" active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} />
                    <TabButton icon={<FolderOpen size={16} />} label="Documents" active={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
                    <TabButton icon={<FileText size={16} />} label="Performance" active={activeTab === 'performance'} onClick={() => setActiveTab('performance')} />
                  </div>

                  <div className="py-6">
                    {activeTab === 'overview' && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card title="Business Details">
                          <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt className="text-gray-500">Industry</dt><dd>{active.industry}</dd>
                            <dt className="text-gray-500">Category</dt><dd className="capitalize">{active.category}</dd>
                            <dt className="text-gray-500">Established</dt><dd>{active.establishedYear}</dd>
                            <dt className="text-gray-500">Employees</dt><dd>{active.employees}</dd>
                            <dt className="text-gray-500">Revenue</dt><dd>${active.revenue.toLocaleString()}</dd>
                            <dt className="text-gray-500">Last Activity</dt><dd>{formatDate(active.lastActivity)}</dd>
                          </dl>
                        </Card>
                        <Card title="Certifications">
                          <ul className="list-disc ml-6 text-sm">
                            {active.certifications.map(c => (<li key={c}>{c}</li>))}
                          </ul>
                        </Card>
                      </div>
                    )}

                    {activeTab === 'contacts' && (
                      <div className="text-sm text-gray-600">No contacts data in mock yet. Use "Add Contact" to simulate.</div>
                    )}

                    {activeTab === 'documents' && (
                      <div className="text-sm text-gray-600">No documents uploaded. Click "Upload Document" to simulate.</div>
                    )}

                    {activeTab === 'performance' && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {performanceMetrics.filter(p => p.supplierId === active.id).map(pm => (
                          <Card key={pm.id} title={`Scorecard • ${pm.period}`}>
                            <div className="text-3xl font-semibold text-gray-900">{pm.overallScore}
                              <span className="text-sm text-gray-500 ml-2">overall</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                              {pm.kpis.map(k => (
                                <div key={k.name} className="p-3 rounded border">
                                  <div className="text-gray-500 text-xs">{k.name}</div>
                                  <div className="font-medium">{k.score} / {k.target}</div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  )
}

function TabButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-3 py-2 -mb-px border-b-2 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
      {icon}<span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border p-5">
      <div className="text-sm font-semibold text-gray-900 mb-3">{title}</div>
      {children}
    </div>
  )
}


