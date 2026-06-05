'use client'

import { useState, useMemo } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Calendar,
  Clock,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Filter,
  Settings,
  ArrowUpDown,
  Activity,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Zap,
  Users,
  Building2,
  Globe,
  Lock,
  Unlock,
  Search,
  Plus,
  MoreVertical,
  Bell,
  Flag,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  BarChart,
  FileCheck,
  FileX,
  FileClock,
  FileAlert,
  UserCheck,
  UserX,
  UserClock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Warning,
  Error,
  Success
} from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { riskAssessments, complianceDocuments, auditLogs } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface RiskWidget {
  id: string
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  color: string
  trend?: 'up' | 'down' | 'stable'
  subtitle?: string
}

const riskWidgets: RiskWidget[] = [
  {
    id: 'total-risks',
    title: '总风险数',
    value: '47',
    change: '+3',
    changeType: 'negative',
    icon: AlertTriangle,
    color: 'bg-red-500',
    trend: 'up',
    subtitle: '活跃风险项'
  },
  {
    id: 'high-risks',
    title: '高风险',
    value: '12',
    change: '-2',
    changeType: 'positive',
    icon: AlertCircle,
    color: 'bg-orange-500',
    trend: 'down',
    subtitle: '需要立即关注'
  },
  {
    id: 'compliance-rate',
    title: '合规率',
    value: '94.2%',
    change: '+1.8%',
    changeType: 'positive',
    icon: Shield,
    color: 'bg-green-500',
    trend: 'up',
    subtitle: '总体合规'
  },
  {
    id: 'expiring-certs',
    title: '即将过期证书',
    value: '8',
    change: '+2',
    changeType: 'negative',
    icon: Calendar,
    color: 'bg-yellow-500',
    trend: 'up',
    subtitle: '未来30天'
  },
  {
    id: 'audit-items',
    title: '审计项',
    value: '23',
    change: '+5',
    changeType: 'neutral',
    icon: FileText,
    color: 'bg-blue-500',
    trend: 'up',
    subtitle: '待审核'
  },
  {
    id: 'risk-score',
    title: '平均风险评分',
    value: '72.5',
    change: '-2.1',
    changeType: 'positive',
    icon: Target,
    color: 'bg-purple-500',
    trend: 'down',
    subtitle: '越低越好'
  }
]

const riskTypes = [
  { value: 'all', label: '所有风险类型' },
  { value: 'financial', label: '财务' },
  { value: 'operational', label: '运营' },
  { value: 'geopolitical', label: '地缘政治' },
  { value: 'cybersecurity', label: '网络安全' },
  { value: 'compliance', label: '合规' },
]

const complianceStatuses = [
  { value: 'all', label: '所有状态' },
  { value: 'valid', label: '有效' },
  { value: 'expiring', label: '即将过期' },
  { value: 'expired', label: '已过期' },
  { value: 'pending', label: '待处理' },
]

const auditActions = [
  { value: 'all', label: '所有操作' },
  { value: 'CREATE', label: '创建' },
  { value: 'UPDATE', label: '更新' },
  { value: 'DELETE', label: '删除' },
  { value: 'VIEW', label: '查看' },
]

const getRiskTypeLabel = (type: string) => {
  const found = riskTypes.find(r => r.value === type)
  return found ? found.label : type
}

const getComplianceStatusLabel = (status: string) => {
  const found = complianceStatuses.find(s => s.value === status)
  return found ? found.label : status
}

const getAuditActionLabel = (action: string) => {
  const found = auditActions.find(a => a.value === action)
  return found ? found.label : action
}

export default function RiskComplianceOverviewEnhanced() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedRiskType, setSelectedRiskType] = useState('all')
  const [selectedComplianceStatus, setSelectedComplianceStatus] = useState('all')
  const [selectedAuditAction, setSelectedAuditAction] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState<any>(null)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [selectedAudit, setSelectedAudit] = useState<any>(null)
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const filteredRisks = useMemo(() => {
    return riskAssessments.filter(risk => {
      const matchesType = selectedRiskType === 'all' || risk.type === selectedRiskType
      return matchesType
    })
  }, [selectedRiskType])

  const filteredDocuments = useMemo(() => {
    return complianceDocuments.filter(doc => {
      const matchesStatus = selectedComplianceStatus === 'all' || doc.status === selectedComplianceStatus
      return matchesStatus
    })
  }, [selectedComplianceStatus])

  const filteredAudits = useMemo(() => {
    return auditLogs.filter(audit => {
      const matchesAction = selectedAuditAction === 'all' || audit.action === selectedAuditAction
      return matchesAction
    })
  }, [selectedAuditAction])

  const highRiskSuppliers = useMemo(() => {
    return filteredRisks.filter(risk => risk.score < 50)
  }, [filteredRisks])

  const expiringDocuments = useMemo(() => {
    return filteredDocuments.filter(doc => doc.status === 'expiring' || doc.status === 'expired')
  }, [filteredDocuments])

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    if (score >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getComplianceColor = (status: string) => {
    const colors = {
      valid: 'bg-green-100 text-green-800',
      expiring: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      pending: 'bg-blue-100 text-blue-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getAuditActionColor = (action: string) => {
    const colors = {
      CREATE: 'bg-green-100 text-green-800',
      UPDATE: 'bg-blue-100 text-blue-800',
      DELETE: 'bg-red-100 text-red-800',
      VIEW: 'bg-gray-100 text-gray-800',
    }
    return colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return DollarSign
      case 'operational':
        return Settings
      case 'geopolitical':
        return Globe
      case 'cybersecurity':
        return Shield
      case 'compliance':
        return FileCheck
      default:
        return AlertTriangle
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'iso':
        return Award
      case 'safety':
        return Shield
      case 'environmental':
        return Globe
      default:
        return FileText
    }
  }

  const handleExport = () => {
    success('导出成功', '风险与合规数据已成功导出')
  }

  const handleCreateAssessment = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('评估已创建', '新风险评估已创建')
      setShowCreateModal(false)
    } catch (err) {
      error('创建失败', '创建评估时发生错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">风险与合规</h1>
            <p className="text-gray-600 mt-1">监控供应商风险、合规状态和审计追踪</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              新建评估
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="card">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  风险类型
                </label>
                <select
                  value={selectedRiskType}
                  onChange={(e) => setSelectedRiskType(e.target.value)}
                  className="input"
                >
                  {riskTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  合规状态
                </label>
                <select
                  value={selectedComplianceStatus}
                  onChange={(e) => setSelectedComplianceStatus(e.target.value)}
                  className="input"
                >
                  {complianceStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  审计操作
                </label>
                <select
                  value={selectedAuditAction}
                  onChange={(e) => setSelectedAuditAction(e.target.value)}
                  className="input"
                >
                  {auditActions.map(action => (
                    <option key={action.value} value={action.value}>
                      {action.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Key Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {riskWidgets.map((widget) => {
            const IconComponent = widget.icon
            const TrendIcon = widget.trend === 'up' ? TrendingUp : widget.trend === 'down' ? TrendingDown : Activity
            return (
              <div key={widget.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{widget.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{widget.value}</p>
                    <p className="text-xs text-gray-500 mb-2">{widget.subtitle}</p>
                    <div className="flex items-center">
                      <TrendIcon className={`w-4 h-4 mr-1 ${
                        widget.changeType === 'positive' ? 'text-green-600' : 
                        widget.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        widget.changeType === 'positive' ? 'text-green-600' : 
                        widget.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {widget.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">较上月</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${widget.color} text-white`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: '概览', icon: BarChart3 },
                { id: 'risks', label: '风险评估', icon: AlertTriangle },
                { id: 'compliance', label: '合规', icon: Shield },
                { id: 'audit', label: '审计追踪', icon: FileText },
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* High Risk Suppliers */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">高风险供应商</h3>
                <Button variant="ghost" size="sm">
                  查看全部
                </Button>
              </div>
              <div className="space-y-4">
                {highRiskSuppliers.map((risk) => (
                  <div 
                    key={risk.id} 
                    className="flex items-center space-x-3 p-3 border border-red-200 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100"
                    onClick={() => {
                      setSelectedRisk(risk)
                      setShowRiskModal(true)
                    }}
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{risk.supplierName}</p>
                      <p className="text-xs text-gray-500">{getRiskTypeLabel(risk.type)} • {risk.assessedBy}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.score)}`}>
                        {risk.score}
                      </span>
                      <p className="text-xs text-red-600 mt-1">高风险</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiring Certificates */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">即将过期证书</h3>
                <Button variant="ghost" size="sm">
                  查看全部
                </Button>
              </div>
              <div className="space-y-4">
                {expiringDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center space-x-3 p-3 border border-yellow-200 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100"
                    onClick={() => {
                      setSelectedDocument(doc)
                      setShowDocumentModal(true)
                    }}
                  >
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.supplierName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(doc.status)}`}>
                        {getComplianceStatusLabel(doc.status)}
                      </span>
                      <p className="text-xs text-yellow-600 mt-1">
                        过期时间：{formatDate(doc.expiryDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">风险评估</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  新建评估
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredRisks.map((risk) => {
                const RiskIcon = getRiskIcon(risk.type)
                return (
                  <div
                    key={risk.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                    onClick={() => {
                      setSelectedRisk(risk)
                      setShowRiskModal(true)
                    }}
                  >
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <RiskIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{risk.supplierName}</h4>
                      <p className="text-sm text-gray-500 mt-1">{getRiskTypeLabel(risk.type)} 风险评估</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>评估人：{risk.assessedBy}</span>
                        <span>日期：{formatDate(risk.assessedAt)}</span>
                        <span>下次审核：{formatDate(risk.nextReview)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.score)}`}>
                        {risk.score}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">风险评分</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">合规文档</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  上传文档
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredDocuments.map((doc) => {
                const DocumentIcon = getDocumentIcon(doc.type)
                return (
                  <div 
                    key={doc.id} 
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                    onClick={() => {
                      setSelectedDocument(doc)
                      setShowDocumentModal(true)
                    }}
                  >
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <DocumentIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{doc.supplierName}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>类型：{doc.type}</span>
                        <span>签发日期：{formatDate(doc.issueDate)}</span>
                        <span>过期时间：{formatDate(doc.expiryDate)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceColor(doc.status)}`}>
                        {getComplianceStatusLabel(doc.status)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">状态</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">审计追踪</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  配置
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredAudits.map((audit) => (
                <div 
                  key={audit.id} 
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                  onClick={() => {
                    setSelectedAudit(audit)
                    setShowAuditModal(true)
                  }}
                >
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{audit.resource} - {audit.resourceId}</h4>
                    <p className="text-sm text-gray-500 mt-1">{audit.details}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>用户：{audit.user}</span>
                      <span>IP：{audit.ipAddress}</span>
                      <span>时间：{formatRelativeTime(new Date(audit.timestamp))}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAuditActionColor(audit.action)}`}>
                      {getAuditActionLabel(audit.action)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">操作</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('风险评估', '风险评估创建功能即将推出')}
            >
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">新建风险评估</p>
                <p className="text-xs text-gray-500">创建风险评估</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('合规检查', '合规检查功能即将推出')}
            >
              <Shield className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">合规检查</p>
                <p className="text-xs text-gray-500">验证合规状态</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('生成报告', '报告生成功能即将推出')}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">生成报告</p>
                <p className="text-xs text-gray-500">创建合规报告</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('设置提醒', '提醒设置功能即将推出')}
            >
              <Bell className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">设置提醒</p>
                <p className="text-xs text-gray-500">配置风险提醒</p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Risk Details Modal */}
      <Modal
        isOpen={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        title="风险评估详情"
        size="lg"
      >
        {selectedRisk && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                {React.createElement(getRiskIcon(selectedRisk.type), { className: "w-8 h-8 text-gray-600" })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedRisk.supplierName}</h3>
                <p className="text-sm text-gray-500 mt-1">{getRiskTypeLabel(selectedRisk.type)} 风险评估</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedRisk.score)}`}>
                    风险评分：{selectedRisk.score}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">评估详情</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>评估人：</span>
                  <span>{selectedRisk.assessedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span>评估日期：</span>
                  <span>{formatDate(selectedRisk.assessedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>下次审核：</span>
                  <span>{formatDate(selectedRisk.nextReview)}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">风险因素</h4>
              <div className="space-y-2">
                {selectedRisk.factors.map((factor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">{factor.name}</span>
                    <span className="text-sm font-medium text-gray-900">{factor.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                更新评估
              </Button>
              <Button variant="secondary" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                生成报告
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Document Details Modal */}
      <Modal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        title="合规文档详情"
        size="lg"
      >
        {selectedDocument && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                {React.createElement(getDocumentIcon(selectedDocument.type), { className: "w-8 h-8 text-gray-600" })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedDocument.supplierName}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceColor(selectedDocument.status)}`}>
                    {getComplianceStatusLabel(selectedDocument.status)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">文档信息</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>类型：</span>
                  <span>{selectedDocument.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>签发日期：</span>
                  <span>{formatDate(selectedDocument.issueDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>过期日期：</span>
                  <span>{formatDate(selectedDocument.expiryDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>上传者：</span>
                  <span>{selectedDocument.uploadedBy}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
              <Button variant="secondary" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                更新状态
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Audit Details Modal */}
      <Modal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        title="审计追踪详情"
        size="lg"
      >
        {selectedAudit && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <FileText className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedAudit.resource} - {selectedAudit.resourceId}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedAudit.details}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAuditActionColor(selectedAudit.action)}`}>
                    {getAuditActionLabel(selectedAudit.action)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">审计信息</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>用户：</span>
                  <span>{selectedAudit.user}</span>
                </div>
                <div className="flex justify-between">
                  <span>IP地址：</span>
                  <span>{selectedAudit.ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>时间戳：</span>
                  <span>{formatDate(selectedAudit.timestamp)}</span>
                </div>
                <div className="flex justify-between">
                  <span>资源：</span>
                  <span>{selectedAudit.resource}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                导出详情
              </Button>
              <Button variant="secondary" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                查看完整日志
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Assessment Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="创建风险评估"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              供应商
            </label>
            <select className="input">
              <option value="">选择供应商</option>
              <option value="abc-corp">ABC Corporation</option>
              <option value="xyz-tech">XYZ Technologies</option>
              <option value="def-ind">DEF Industries</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              风险类型
            </label>
            <select className="input">
              <option value="">选择风险类型</option>
              <option value="financial">财务</option>
              <option value="operational">运营</option>
              <option value="geopolitical">地缘政治</option>
              <option value="cybersecurity">网络安全</option>
              <option value="compliance">合规</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评估备注
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="输入评估备注和发现"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleCreateAssessment}
              loading={loading}
              className="flex-1"
            >
              创建评估
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      <ToastContainer />
    </>
  )
}
