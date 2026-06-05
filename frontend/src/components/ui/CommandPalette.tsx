"use client"

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface Item {
  label: string
  href: string
  group: string
}

const items: Item[] = [
  { label: '仪表盘 • 概览', href: '/dashboard/overview', group: '仪表盘' },
  { label: '仪表盘 • 审批', href: '/dashboard/approvals', group: '仪表盘' },
  { label: '供应商 • 目录', href: '/suppliers/directory', group: '供应商' },
  { label: '供应商 • 档案', href: '/suppliers/profiles', group: '供应商' },
  { label: '供应商 • 入驻', href: '/suppliers/onboarding', group: '供应商' },
  { label: '供应商 • 风险评估', href: '/suppliers/risk-assessment', group: '供应商' },
  { label: '采购 • RFP', href: '/procurement/rfp', group: '采购' },
  { label: '采购 • RFQ', href: '/procurement/rfq', group: '采购' },
  { label: '采购 • 采购订单', href: '/procurement/purchase-orders', group: '采购' },
  { label: '采购 • 合同', href: '/procurement/contracts', group: '采购' },
  { label: '采购 • 发票', href: '/procurement/invoices', group: '采购' },
  { label: '绩效 • KPI', href: '/performance/kpis', group: '绩效' },
  { label: '绩效 • 评分卡', href: '/performance/scorecards', group: '绩效' },
  { label: '绩效 • 反馈', href: '/performance/feedback', group: '绩效' },
  { label: '沟通 • 消息', href: '/communication/messaging', group: '沟通' },
  { label: '沟通 • 文档', href: '/communication/documents', group: '沟通' },
  { label: '沟通 • 论坛', href: '/communication/forums', group: '沟通' },
  { label: '沟通 • 帮助台', href: '/communication/helpdesk', group: '沟通' },
  { label: '风险与合规 • 审计追踪', href: '/risk-compliance/audit-trails', group: '风险与合规' },
  { label: '风险与合规 • 合规文档', href: '/risk-compliance/compliance-docs', group: '风险与合规' },
  { label: '风险与合规 • 资质认证', href: '/risk-compliance/certifications', group: '风险与合规' },
  { label: '风险与合规 • 供应商风险评级', href: '/risk-compliance/risk-rating', group: '风险与合规' },
  { label: '分析 • 支出分析', href: '/analytics/spend-analysis', group: '分析' },
  { label: '分析 • 绩效报告', href: '/analytics/performance-reports', group: '分析' },
  { label: '分析 • 风险报告', href: '/analytics/risk-reports', group: '分析' },
  { label: '分析 • 自定义报告', href: '/analytics/custom-reports', group: '分析' },
  { label: '设置 • 用户角色', href: '/settings/user-roles', group: '设置' },
  { label: '设置 • 数据管理', href: '/settings/data-management', group: '设置' },
  { label: '设置 • 安全', href: '/settings/security', group: '设置' },
  { label: '设置 • 集成', href: '/settings/integrations', group: '设置' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q))
  }, [query])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-full max-w-2xl bg-white rounded-xl shadow-lg border p-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索任何内容…（Ctrl/Cmd + K）"
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="max-h-80 overflow-auto custom-scrollbar divide-y">
          {filtered.map((i) => (
            <Link key={i.href} href={i.href} scroll={false} className="block px-2 py-3 hover:bg-gray-50">
              <div className="text-sm text-gray-900">{i.label}</div>
              <div className="text-xs text-gray-500">{i.group}</div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-gray-500 px-2 py-3">无结果</div>
          )}
        </div>
      </div>
    </div>
  )
}


