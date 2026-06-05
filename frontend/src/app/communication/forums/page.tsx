"use client"

import Layout from '@/components/layout/Layout'
import { useState } from 'react'
import Button from '@/components/ui/Button'

type Topic = { id: number; title: string; posts: { id: number; author: string; content: string; createdAt: string }[] }

const initial: Topic[] = [
  { id: 1, title: 'Best practices for onboarding', posts: [ { id: 1, author: 'Jane', content: 'Share your onboarding checklists here.', createdAt: new Date().toISOString() } ] },
  { id: 2, title: 'Quality issue handling', posts: [ { id: 1, author: 'Mike', content: 'How do you track CAPAs?', createdAt: new Date().toISOString() } ] },
]

export default function DiscussionForumsPage() {
  const [topics, setTopics] = useState<Topic[]>(initial)
  const [newTopic, setNewTopic] = useState('')
  const [reply, setReply] = useState<Record<number, string>>({})

  const addTopic = () => {
    if (!newTopic.trim()) {
      return
    }
    setTopics(prev => [{ id: prev.length + 1, title: newTopic.trim(), posts: [] }, ...prev])
    setNewTopic('')
  }

  const addReply = (topicId: number) => {
    const content = (reply[topicId] ?? '').trim()
    if (!content) {
      return
    }
    setTopics(prev => prev.map(t => t.id === topicId ? { ...t, posts: [...t.posts, { id: t.posts.length + 1, author: 'You', content, createdAt: new Date().toISOString() }] } : t))
    setReply(r => ({ ...r, [topicId]: '' }))
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Discussion Forums</h1>
          <p className="text-gray-600 mt-2">Create topics and collaborate with your team.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex gap-2">
            <input value={newTopic} onChange={e => setNewTopic(e.target.value)} placeholder="New topic title" className="border rounded px-3 py-2 flex-1" />
            <Button variant="primary" onClick={addTopic}>Create Topic</Button>
          </div>
          <div className="mt-6 space-y-6">
            {topics.map(t => (
              <div key={t.id} className="border rounded p-4">
                <div className="text-lg font-semibold text-gray-900">{t.title}</div>
                <div className="mt-3 space-y-3">
                  {t.posts.map(p => (
                    <div key={p.id} className="bg-gray-50 rounded p-3 text-sm">
                      <div className="text-gray-900">{p.author}</div>
                      <div className="text-gray-700">{p.content}</div>
                      <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <input value={reply[t.id] ?? ''} onChange={e => setReply(r => ({ ...r, [t.id]: e.target.value }))} placeholder="Write a reply" className="border rounded px-3 py-2 flex-1" />
                  <Button variant="secondary" onClick={() => addReply(t.id)}>Reply</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}


