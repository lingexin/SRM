"use client"

import Layout from '@/components/layout/Layout'
import { messages } from '@/data/mockData'
import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import { Search, Send } from 'lucide-react'

export default function MessagingPage() {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState(messages)
  const [compose, setCompose] = useState({ to: '', subject: '', content: '' })

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return rows.filter(m => m.sender.toLowerCase().includes(q) || m.receiver.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q))
  }, [query, rows])

  const markRead = (id: number) => setRows(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m))
  const send = () => {
    if (!compose.to || !compose.subject) {
      return alert('Enter recipient and subject')
    }
    setRows(prev => [{ id: prev.length + 1, sender: 'You', receiver: compose.to, subject: compose.subject, content: compose.content, time: new Date().toISOString(), unread: false, priority: 'low', attachments: 0 }, ...prev])
    setCompose({ to: '', subject: '', content: '' })
    alert('Message sent (simulated)')
  }

  return (
    <Layout>
      <div className="p-6 grid grid-cols-12 gap-6">
        <aside className="col-span-4 xl:col-span-3 bg-white rounded-lg shadow p-4">
          <div className="text-sm font-semibold text-gray-900 mb-2">Inbox</div>
          <div className="flex items-center gap-2 border rounded px-3 py-2 text-gray-600">
            <Search size={16} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="w-full outline-none" />
          </div>
          <div className="mt-4 max-h-[600px] overflow-auto divide-y">
            {filtered.map(m => (
              <button key={m.id} onClick={() => markRead(m.id)} className={`w-full text-left py-3 px-2 hover:bg-gray-50 ${m.unread ? 'font-semibold' : ''}`}>
                <div className="text-gray-900">{m.subject}</div>
                <div className="text-xs text-gray-500">{m.sender} → {m.receiver}</div>
              </button>
            ))}
          </div>
        </aside>

        <section className="col-span-8 xl:col-span-9 bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold text-gray-900 mb-3">Compose</div>
          <div className="grid md:grid-cols-2 gap-3">
            <input placeholder="To" value={compose.to} onChange={e => setCompose({ ...compose, to: e.target.value })} className="border rounded px-3 py-2" />
            <input placeholder="Subject" value={compose.subject} onChange={e => setCompose({ ...compose, subject: e.target.value })} className="border rounded px-3 py-2" />
          </div>
          <textarea placeholder="Message" value={compose.content} onChange={e => setCompose({ ...compose, content: e.target.value })} className="mt-3 w-full border rounded px-3 py-2 h-32" />
          <div className="mt-3">
            <Button variant="primary" onClick={send}><Send className="mr-2" size={16}/>Send</Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}


