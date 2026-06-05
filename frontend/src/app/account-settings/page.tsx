"use client"

import Layout from '@/components/layout/Layout'
import { userPreferences } from '@/data/mockData'
import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function AccountSettingsPage() {
  const [prefs, setPrefs] = useState(userPreferences)

  const save = () => alert('设置已保存（模拟）')

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">账户设置</h1>
            <p className="text-gray-600 mt-2">个性化您的SRM体验。</p>
          </div>
          <Button variant="primary" onClick={save}>保存更改</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-semibold text-gray-900 mb-4">通用</div>
            <div className="space-y-3">
              <label className="block text-sm text-gray-600">主题
                <select aria-label="Theme" value={prefs.theme} onChange={e => setPrefs({ ...prefs, theme: e.target.value as any })} className="mt-1 border rounded px-2 py-1 ml-2">
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                  <option value="system">跟随系统</option>
                </select>
              </label>
              <label className="block text-sm text-gray-600">语言
                <select aria-label="Language" value={prefs.language} onChange={e => setPrefs({ ...prefs, language: e.target.value })} className="mt-1 border rounded px-2 py-1 ml-2">
                  <option value="en-US">英语（美国）</option>
                  <option value="en-GB">英语（英国）</option>
                </select>
              </label>
              <label className="block text-sm text-gray-600">时区
                <input aria-label="Timezone" value={prefs.timezone} onChange={e => setPrefs({ ...prefs, timezone: e.target.value })} className="mt-1 border rounded px-2 py-1 ml-2" />
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={prefs.newsletter} onChange={e => setPrefs({ ...prefs, newsletter: e.target.checked })} className="rounded border-gray-300" />
                接收新闻通讯
              </label>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-semibold text-gray-900 mb-4">通知</div>
            <div className="space-y-3 text-sm text-gray-600">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={prefs.notifications.email} onChange={e => setPrefs({ ...prefs, notifications: { ...prefs.notifications, email: e.target.checked } })} className="rounded border-gray-300" /> 邮件通知
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={prefs.notifications.sms} onChange={e => setPrefs({ ...prefs, notifications: { ...prefs.notifications, sms: e.target.checked } })} className="rounded border-gray-300" /> 短信通知
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={prefs.notifications.inApp} onChange={e => setPrefs({ ...prefs, notifications: { ...prefs.notifications, inApp: e.target.checked } })} className="rounded border-gray-300" /> 应用内通知
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={prefs.notifications.weeklyDigest} onChange={e => setPrefs({ ...prefs, notifications: { ...prefs.notifications, weeklyDigest: e.target.checked } })} className="rounded border-gray-300" /> 每周摘要
              </label>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}


