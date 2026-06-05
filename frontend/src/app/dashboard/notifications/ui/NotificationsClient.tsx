"use client"

import { useState } from 'react'

type NotificationItem = {
  id: string
  category: 'Risk' | 'Message' | 'Workflow' | 'Invoice'
  title: string
  detail: string
  when: string
}

const categoryLabel: Record<NotificationItem['category'], string> = {
  Risk: '风险',
  Message: '消息',
  Workflow: '工作流',
  Invoice: '发票',
}

const seed: NotificationItem[] = [
  { id: 'N-9211', category: 'Risk', title: 'New risk score for Nova Metals', detail: 'Overall risk moved to Medium (62).', when: '2h ago' },
  { id: 'N-9212', category: 'Workflow', title: 'Onboarding task overdue', detail: 'Compliance documents pending for Orion Fibers.', when: '5h ago' },
  { id: 'N-9213', category: 'Message', title: 'Message from Apex Plastics', detail: 'Shared updated MSDS documentation.', when: 'Yesterday' },
  { id: 'N-9214', category: 'Invoice', title: 'Invoice approved', detail: 'INV-33219 ready for payment run.', when: 'Yesterday' },
]

export default function NotificationsClient() {
  const [inbox, setInbox] = useState<NotificationItem[]>(seed)
  const [triaged, setTriaged] = useState<NotificationItem[]>([])
  const [archived, setArchived] = useState<NotificationItem[]>([])

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, id: string) => {
    event.dataTransfer.setData('text/plain', id)
    event.dataTransfer.effectAllowed = 'move'
  }

  const allow = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const moveTo = (dest: 'inbox' | 'triaged' | 'archived') => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const everything = [...inbox, ...triaged, ...archived]
    const item = everything.find(n => n.id === id)
    if (!item) return

    const remove = (list: NotificationItem[]) => list.filter(n => n.id !== id)
    const nextInbox = remove(inbox)
    const nextTriaged = remove(triaged)
    const nextArchived = remove(archived)

    setInbox(dest === 'inbox' ? [...nextInbox, item] : nextInbox)
    setTriaged(dest === 'triaged' ? [...nextTriaged, item] : nextTriaged)
    setArchived(dest === 'archived' ? [...nextArchived, item] : nextArchived)
  }

  const Tag = ({ text }: { text: string }) => (
    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{text}</span>
  )

  const Card = ({ n }: { n: NotificationItem }) => (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, n.id)}
      className="bg-white border border-gray-200 rounded-md p-3 shadow-sm cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-800 text-sm">{n.title}</div>
        <div className="text-xs text-gray-500">{n.when}</div>
      </div>
      <div className="mt-1 text-xs text-gray-600">{n.detail}</div>
      <div className="mt-2"><Tag text={categoryLabel[n.category]} /></div>
    </div>
  )

  const Column = ({ title, items, onDrop }: { title: string; items: NotificationItem[]; onDrop: (e: React.DragEvent<HTMLDivElement>) => void }) => (
    <div onDrop={onDrop} onDragOver={allow} className="bg-gray-50 rounded-lg p-4 min-h-[420px] border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-xs text-gray-500">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.map(n => (
          <Card key={n.id} n={n} />
        ))}
        {items.length === 0 && <div className="text-sm text-gray-400 text-center py-12">将通知拖放到此处</div>}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Column title="收件箱" items={inbox} onDrop={moveTo('inbox')} />
      <Column title="已分类" items={triaged} onDrop={moveTo('triaged')} />
      <Column title="已归档" items={archived} onDrop={moveTo('archived')} />
    </div>
  )
}









