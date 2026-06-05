'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TrendingUp,
  MessageSquare,
  Shield,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  FileText,
  Package,
  AlertTriangle,
  Bell,
  CheckCircle,
  FileSpreadsheet,
  Database,
  Lock,
  Plug
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: '仪表盘',
    href: '/dashboard',
    icon: LayoutDashboard,
    children: [
      { id: 'overview', label: '概览', href: '/dashboard/overview', icon: BarChart3 },
      { id: 'approvals', label: '审批中心', href: '/dashboard/approvals', icon: CheckCircle },
      { id: 'notifications', label: '通知', href: '/dashboard/notifications', icon: Bell },
    ]
  },
  {
    id: 'suppliers',
    label: '供应商管理',
    href: '/suppliers',
    icon: Users,
    children: [
      { id: 'directory', label: '供应商目录', href: '/suppliers/directory', icon: Building2 },
      { id: 'profiles', label: '供应商档案', href: '/suppliers/profiles', icon: FileText },
      { id: 'onboarding', label: '入驻流程', href: '/suppliers/onboarding', icon: Users },
      { id: 'risk-assessment', label: '风险评估', href: '/suppliers/risk-assessment', icon: AlertTriangle },
      { id: 'lifecycle', label: '生命周期管理', href: '/suppliers/lifecycle', icon: TrendingUp },
    ]
  },
  {
    id: 'procurement',
    label: '采购管理',
    href: '/procurement',
    icon: ShoppingCart,
    children: [
      { id: 'rfp', label: 'RFP管理', href: '/procurement/rfp', icon: FileText },
      { id: 'rfq', label: 'RFQ管理', href: '/procurement/rfq', icon: FileSpreadsheet },
      { id: 'purchase-orders', label: '采购订单', href: '/procurement/purchase-orders', icon: Package },
      { id: 'contracts', label: '合同管理', href: '/procurement/contracts', icon: FileText },
      { id: 'invoices', label: '发票与付款', href: '/procurement/invoices', icon: FileText },
    ]
  },
  {
    id: 'performance',
    label: '绩效管理',
    href: '/performance',
    icon: TrendingUp,
    children: [
      { id: 'kpis', label: 'KPI指标', href: '/performance/kpis', icon: BarChart3 },
      { id: 'scorecards', label: '评分卡与评审', href: '/performance/scorecards', icon: FileText },
      { id: 'feedback', label: '反馈与问题', href: '/performance/feedback', icon: MessageSquare },
    ]
  },
  {
    id: 'communication',
    label: '沟通与协作',
    href: '/communication',
    icon: MessageSquare,
    children: [
      { id: 'messaging', label: '消息', href: '/communication/messaging', icon: MessageSquare },
      { id: 'documents', label: '文档共享', href: '/communication/documents', icon: FileText },
      { id: 'forums', label: '讨论论坛', href: '/communication/forums', icon: MessageSquare },
      { id: 'helpdesk', label: '供应商帮助台', href: '/communication/helpdesk', icon: Bell },
    ]
  },
  {
    id: 'risk-compliance',
    label: '风险与合规',
    href: '/risk-compliance',
    icon: Shield,
    children: [
      { id: 'audit-trails', label: '审计追踪', href: '/risk-compliance/audit-trails', icon: FileText },
      { id: 'compliance-docs', label: '合规文档', href: '/risk-compliance/compliance-docs', icon: FileText },
      { id: 'certifications', label: '资质认证管理', href: '/risk-compliance/certifications', icon: CheckCircle },
      { id: 'risk-rating', label: '供应商风险评级', href: '/risk-compliance/risk-rating', icon: AlertTriangle },
    ]
  },
  {
    id: 'analytics',
    label: '分析与报告',
    href: '/analytics',
    icon: BarChart3,
    children: [
      { id: 'spend-analysis', label: '支出分析', href: '/analytics/spend-analysis', icon: BarChart3 },
      { id: 'performance-reports', label: '供应商绩效报告', href: '/analytics/performance-reports', icon: TrendingUp },
      { id: 'risk-reports', label: '风险与合规报告', href: '/analytics/risk-reports', icon: Shield },
      { id: 'custom-reports', label: '自定义报告', href: '/analytics/custom-reports', icon: FileText },
    ]
  },
  {
    id: 'settings',
    label: '设置与管理',
    href: '/settings',
    icon: Settings,
    children: [
      { id: 'user-roles', label: '用户角色与权限', href: '/settings/user-roles', icon: Users },
      { id: 'data-management', label: '数据管理', href: '/settings/data-management', icon: Database },
      { id: 'security', label: '安全与访问控制', href: '/settings/security', icon: Lock },
      { id: 'integrations', label: '集成', href: '/settings/integrations', icon: Plug },
    ]
  },
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const STORAGE_KEY = 'srm_sidebar_expanded_items'
  const SCROLL_KEY = 'srm_sidebar_scroll_top'
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const navRef = useRef<HTMLDivElement | null>(null)

  // Load persisted expanded sections and scroll position
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setExpandedItems(parsed)
        }
      }
      const savedScroll = typeof window !== 'undefined' ? window.localStorage.getItem(SCROLL_KEY) : null
      if (savedScroll && navRef.current) {
        navRef.current.scrollTop = Number(savedScroll) || 0
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  // Persist scroll position
  useEffect(() => {
    const el = navRef.current
    if (!el) {
      return
    }
    const onScroll = () => {
      try { window.localStorage.setItem(SCROLL_KEY, String(el.scrollTop)) } catch {}
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [navRef])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const next = prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname.startsWith('/dashboard/')
    }
    return pathname.startsWith(href)
  }

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const isItemActive = isActive(item.href)

    return (
      <div key={item.id}>
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.id)}
              className={cn(
                'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                level === 0 ? 'text-gray-700 hover:text-primary hover:bg-gray-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50',
                isItemActive && 'text-primary bg-primary/10'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              scroll={false}
              className={cn(
                'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                level === 0 ? 'text-gray-700 hover:text-primary hover:bg-gray-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50',
                isItemActive && 'text-primary bg-primary/10'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">SRM</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="关闭侧边栏"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav ref={navRef} className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navigationItems.map(item => renderNavigationItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

