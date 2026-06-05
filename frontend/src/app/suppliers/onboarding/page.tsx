"use client"

import Layout from '@/components/layout/Layout'
import { useMemo, useState } from 'react'
import { suppliers } from '@/data/mockData'
import Button from '@/components/ui/Button'
import { CheckCircle2, Clock, FileCheck2, FileText, ShieldCheck, UserPlus } from 'lucide-react'

type StepKey = 'registration' | 'compliance' | 'documents' | 'review' | 'approval'

const defaultSteps: { key: StepKey; label: string; description: string }[] = [
  { key: 'registration', label: 'Registration', description: 'Company info and banking details' },
  { key: 'compliance', label: 'Compliance', description: 'Certifications and questionnaires' },
  { key: 'documents', label: 'Documents', description: 'Upload contracts and policies' },
  { key: 'review', label: 'Internal Review', description: 'Procurement and legal review' },
  { key: 'approval', label: 'Final Approval', description: 'Approve and activate supplier' },
]

type OnboardingState = Record<number, { current: StepKey; completed: StepKey[] }>

export default function OnboardingWorkflowPage() {
  const [state, setState] = useState<OnboardingState>(() => Object.fromEntries(suppliers.map(s => [s.id, { current: 'registration', completed: [] } as any])))
  const [activeSupplierId, setActiveSupplierId] = useState<number>(() => suppliers[0]?.id ?? 1)

  const active = useMemo(() => suppliers.find(s => s.id === activeSupplierId)!, [activeSupplierId])
  const progress = state[activeSupplierId]

  const markComplete = (key: StepKey) => {
    setState(prev => {
      const existing = prev[activeSupplierId]
      const completed = Array.from(new Set([...(existing?.completed ?? []), key]))
      const nextIndex = Math.min(defaultSteps.findIndex(s => s.key === key) + 1, defaultSteps.length - 1)
      return { ...prev, [activeSupplierId]: { current: defaultSteps[nextIndex].key, completed } }
    })
  }

  const approveSupplier = () => {
    markComplete('approval')
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Workflow</h1>
            <p className="text-gray-600 mt-2">Track and progress new suppliers through registration to approval.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow p-4">
            <div className="text-sm font-semibold text-gray-900 mb-3">Pending Suppliers</div>
            <div className="divide-y">
              {suppliers.map(s => (
                <button key={s.id} onClick={() => setActiveSupplierId(s.id)} className={`w-full text-left py-3 px-2 hover:bg-gray-50 ${activeSupplierId === s.id ? 'bg-gray-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.industry} • {s.location}</div>
                    </div>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{progress?.completed?.length ?? 0}/{defaultSteps.length}</div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="col-span-8 xl:col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xl font-semibold text-gray-900">{active.name}</div>
                  <div className="text-sm text-gray-500">{active.email} • {active.phone}</div>
                </div>
                <Button variant="primary" onClick={approveSupplier}>
                  <UserPlus className="mr-2" size={16} /> Approve & Activate
                </Button>
              </div>

              <ol className="relative border-l ml-3">
                {defaultSteps.map((s, idx) => {
                  const isDone = progress?.completed?.includes(s.key)
                  const isActive = progress?.current === s.key
                  return (
                    <li key={s.key} className="mb-8 ml-6">
                      <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ${isDone ? 'bg-green-100 text-green-700' : isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {isDone ? <CheckCircle2 size={14} /> : isActive ? <Clock size={14} /> : <Clock size={14} />}
                      </span>
                      <h3 className="font-medium text-gray-900">{idx + 1}. {s.label}</h3>
                      <p className="text-sm text-gray-600">{s.description}</p>
                      <div className="mt-3 flex gap-2">
                        {s.key === 'registration' && <Button onClick={() => markComplete('registration')}><FileText className="mr-2" size={16}/>Submit Registration</Button>}
                        {s.key === 'compliance' && <Button onClick={() => markComplete('compliance')}><ShieldCheck className="mr-2" size={16}/>Complete Compliance</Button>}
                        {s.key === 'documents' && <Button onClick={() => markComplete('documents')}><FileCheck2 className="mr-2" size={16}/>Upload Documents</Button>}
                        {s.key === 'review' && <Button onClick={() => markComplete('review')}><Clock className="mr-2" size={16}/>Finish Review</Button>}
                        {s.key === 'approval' && <Button onClick={() => markComplete('approval')}><CheckCircle2 className="mr-2" size={16}/>Approve</Button>}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}


