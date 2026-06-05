"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!identifier.trim() || !password) {
      setError('请输入您的邮箱/用户名和密码。')
      return
    }
    setLoading(true)
    // Simulate authentication
    setTimeout(() => {
      setLoading(false)
      router.push('/dashboard')
    }, 700)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">SRM</h1>
              <p className="text-sm text-gray-500">供应商关系管理</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-1">登录</h2>
          <p className="text-sm text-gray-600 mb-6">使用公司邮箱或用户名登录。</p>

          {error && <div className="mb-4 text-sm text-red-700 bg-red-100 rounded px-3 py-2">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">邮箱或用户名</label>
              <input id="identifier" name="identifier" autoComplete="username" value={identifier} onChange={e => setIdentifier(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@company.com 或 johndoe" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">密码</label>
              <div className="mt-1 relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-900 px-2 py-1 rounded">
                  {showPassword ? '隐藏' : '显示'}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">记住我</span>
              </label>
              <span className="text-gray-400">忘记密码？</span>
            </div>
            <Button variant="primary" as="button" type="submit" disabled={loading}>
              {loading ? '登录中…' : '登录'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          登录即表示您同意我们的条款和隐私政策。
        </p>
      </div>
    </div>
  )
}


