"use client"

import { useState } from 'react'

type ApprovalCard = {
  id: string
  title: string
  type: 'Onboarding' | 'Contract' | 'PO' | 'Invoice'
  supplier: string
  amount?: string
  submittedAt: string
}

const typeLabel: Record<ApprovalCard['type'], string> = {
  Onboarding: '入驻',
  Contract: '合同',
  PO: '采购订单',
  Invoice: '发票',
}

const initialQueue: ApprovalCard[] = [
  { id: 'A-10021', title: 'New Supplier Onboarding', type: 'Onboarding', supplier: 'Zenith Components', submittedAt: '2025-08-21' },
  { id: 'A-10022', title: 'Contract Renewal – FY26', type: 'Contract', supplier: 'Nova Metals', submittedAt: '2025-08-21' },
  { id: 'A-10023', title: 'PO #450009817', type: 'PO', supplier: 'Orbit Fasteners', amount: '$146,300', submittedAt: '2025-08-20' },
  { id: 'A-10024', title: 'Invoice #INV-33219', type: 'Invoice', supplier: 'Apex Plastics', amount: '$18,945', submittedAt: '2025-08-19' },
]

export default function ApprovalsClient() {
  const [queue, setQueue] = useState<ApprovalCard[]>(initialQueue)
  const [approved, setApproved] = useState<ApprovalCard[]>([])
  const [rejected, setRejected] = useState<ApprovalCard[]>([])

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, cardId: string) => {
    event.dataTransfer.setData('text/plain', cardId)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDropTo = (list: 'approved' | 'rejected' | 'queue') => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const cardId = event.dataTransfer.getData('text/plain')
    const all = [...queue, ...approved, ...rejected]
    const card = all.find(c => c.id === cardId)
    if (!card) return

    const without = (items: ApprovalCard[]) => items.filter(c => c.id !== cardId)
    const nextQueue = without(queue)
    const nextApproved = without(approved)
    const nextRejected = without(rejected)

    setQueue(list === 'queue' ? [...nextQueue, card] : nextQueue)
    setApproved(list === 'approved' ? [...nextApproved, card] : nextApproved)
    setRejected(list === 'rejected' ? [...nextRejected, card] : nextRejected)
  }

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

  const Column = ({ title, items, onDrop }: { title: string; items: ApprovalCard[]; onDrop: (e: React.DragEvent<HTMLDivElement>) => void }) => (
    <div onDrop={onDrop} onDragOver={allowDrop} className="bg-white rounded-lg border border-gray-200 p-4 min-h-[440px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-xs text-gray-500">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.map(card => (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => onDragStart(e, card.id)}
            className="bg-gray-50 border border-gray-200 rounded-md p-3 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-800">{card.title}</div>
              <div className="text-xs text-gray-500">{card.id}</div>
            </div>
            <div className="mt-1 text-xs text-gray-600">{typeLabel[card.type]} • {card.supplier}{card.amount ? ` • ${card.amount}` : ''}</div>
            <div className="mt-1 text-[11px] text-gray-500">提交于 {card.submittedAt}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-sm text-gray-400 text-center py-12">拖拽项目到此处</div>
        )}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Column title="待审核" items={queue} onDrop={onDropTo('queue')} />
      <Column title="已批准" items={approved} onDrop={onDropTo('approved')} />
      <Column title="已拒绝" items={rejected} onDrop={onDropTo('rejected')} />
    </div>
  )
}









