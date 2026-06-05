'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileText,
  BarChart3,
  Activity,
  Calendar,
  Bell,
  Eye,
  ArrowRight,
  Plus,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'
import { dashboardStats, recentActivities, pendingApprovals } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface DashboardWidget {
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

const widgets: DashboardWidget[] = [
  {
    id: 'total-suppliers',
    title: '供应商总数',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-primary',
    trend: 'up',
    subtitle: '活跃供应商'
  },
  {
    id: 'active-contracts',
    title: '活跃合同',
    value: '89',
    change: '+5%',
    changeType: 'positive',
    icon: CheckCircle,
    color: 'bg-primary',
    trend: 'up',
    subtitle: '进行中'
  },
  {
    id: 'monthly-spend',
    title: '月度支出',
    value: '$2.4M',
    change: '-3%',
    changeType: 'negative',
    icon: DollarSign,
    color: 'bg-secondary',
    trend: 'down',
    subtitle: '本月'
  },
  {
    id: 'risk-alerts',
    title: '风险预警',
    value: '7',
    change: '-2',
    changeType: 'positive',
    icon: AlertTriangle,
    color: 'bg-primary',
    trend: 'down',
    subtitle: '需关注'
  }
]

export default function DashboardOverviewEnhanced() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [selectedApproval, setSelectedApproval] = useState<any>(null)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)
  const [showCreateRFPModal, setShowCreateRFPModal] = useState(false)
  const [showProcessPaymentModal, setShowProcessPaymentModal] = useState(false)
  const [showRiskAssessmentModal, setShowRiskAssessmentModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const handleApprove = async (approval: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('审批成功', `${approval.title} 已批准`)
      setShowApprovalModal(false)
    } catch (err) {
      error('审批失败', '处理审批时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (approval: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      warning('审批已拒绝', `${approval.title} 已拒绝`)
      setShowApprovalModal(false)
    } catch (err) {
      error('拒绝失败', '处理拒绝时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleAddSupplier = async (supplierData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('供应商已添加', `${supplierData.name} 已成功注册`)
      setShowAddSupplierModal(false)
    } catch (err) {
      error('注册失败', '注册供应商时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRFP = async (rfpData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('RFP已创建', `${rfpData.title} 已成功创建`)
      setShowCreateRFPModal(false)
    } catch (err) {
      error('创建失败', '创建RFP时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleProcessPayment = async (paymentData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      success('付款已处理', `${paymentData.amount} 付款已成功处理`)
      setShowProcessPaymentModal(false)
    } catch (err) {
      error('付款失败', '处理付款时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleRiskAssessment = async (assessmentData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('评估已创建', `${assessmentData.supplier} 的风险评估已完成`)
      setShowRiskAssessmentModal(false)
    } catch (err) {
      error('评估失败', '完成风险评估时出错')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'supplier':
        return Users
      case 'contract':
        return FileText
      case 'payment':
        return DollarSign
      case 'risk':
        return AlertTriangle
      case 'performance':
        return BarChart3
      default:
        return Activity
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">仪表盘概览</h1>
            <p className="text-gray-600 mt-1">监控您的供应商关系和采购活动</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              快捷操作
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {widgets.map((widget) => {
            const IconComponent = widget.icon
            return (
              <div key={widget.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{widget.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{widget.value}</p>
                    <p className="text-xs text-gray-500 mb-3">{widget.subtitle}</p>
                    <div className="flex items-center">
                      {widget.changeType === 'positive' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : widget.changeType === 'negative' ? (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      ) : (
                        <div className="w-4 h-4 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        widget.changeType === 'positive' ? 'text-green-600' : 
                        widget.changeType === 'negative' ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {widget.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">较上月</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${widget.color} text-white ml-4 flex-shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - Takes 2 columns */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">近期活动</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  筛选
                </Button>
                <Button variant="ghost" size="sm">
                  查看全部
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type)
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedActivity(activity)
                      setShowActivityModal(true)
                    }}
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'supplier' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'contract' ? 'bg-green-100 text-green-600' :
                      activity.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'risk' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatRelativeTime(new Date(activity.time))}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending Approvals - Takes 1 column */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">待审批</h3>
              <Button variant="ghost" size="sm">
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{approval.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        提交人：{approval.submittedBy}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        截止 {formatDate(approval.dueDate)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(approval.priority)}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedApproval(approval)
                        setShowApprovalModal(true)
                      }}
                      className="flex-1"
                    >
                      审核
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleApprove(approval)}
                      className="flex-1"
                    >
                      批准
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
              onClick={() => setShowAddSupplierModal(true)}
            >
              <Users className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">添加供应商</p>
                <p className="text-xs text-gray-500">注册新供应商</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
              onClick={() => setShowCreateRFPModal(true)}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">创建RFP</p>
                <p className="text-xs text-gray-500">启动新采购</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
              onClick={() => setShowProcessPaymentModal(true)}
            >
              <DollarSign className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">处理付款</p>
                <p className="text-xs text-gray-500">处理发票付款</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
              onClick={() => setShowRiskAssessmentModal(true)}
            >
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">风险评估</p>
                <p className="text-xs text-gray-500">评估供应商风险</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">绩效趋势</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">准时交付</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">94.2%</span>
                  <span className="text-xs text-green-600 ml-2">+1.8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">质量评分</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">91.7%</span>
                  <span className="text-xs text-green-600 ml-2">+0.5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">成本节约</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">$1.2M</span>
                  <span className="text-xs text-green-600 ml-2">+15%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">即将截止</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">合同续签</p>
                  <p className="text-xs text-gray-500">ABC Corp - 5天后截止</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium">高</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">绩效评审</p>
                  <p className="text-xs text-gray-500">XYZ Tech - 12天后截止</p>
                </div>
                <span className="text-xs text-blue-600 font-medium">中</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">资质续期</p>
                  <p className="text-xs text-gray-500">DEF Industries - 20天后截止</p>
                </div>
                <span className="text-xs text-green-600 font-medium">低</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      <Modal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        title="活动详情"
        size="lg"
      >
        {selectedActivity && (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className={`p-3 rounded-lg ${
                selectedActivity.type === 'supplier' ? 'bg-blue-100 text-blue-600' :
                selectedActivity.type === 'contract' ? 'bg-green-100 text-green-600' :
                selectedActivity.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                selectedActivity.type === 'risk' ? 'bg-red-100 text-red-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {React.createElement(getActivityIcon(selectedActivity.type), { className: "w-6 h-6" })}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">{selectedActivity.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {formatRelativeTime(new Date(selectedActivity.time))}
                </p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(selectedActivity.status)}`}>
                  {selectedActivity.status}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">详情</h5>
              <p className="text-sm text-gray-600">
                此活动已记录在系统中，需要您的关注。请查看详情并根据需要采取适当措施。
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                查看完整详情
              </Button>
              <Button variant="secondary" className="flex-1">
                标记为已读
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="审批审核"
        size="lg"
      >
        {selectedApproval && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{selectedApproval.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                提交人：{selectedApproval.submittedBy} • 截止 {formatDate(selectedApproval.dueDate)}
              </p>
              {selectedApproval.amount && (
                <p className="text-sm text-gray-600 mt-2">
                  金额：{formatCurrency(selectedApproval.amount)}
                </p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">详情</h5>
              <p className="text-sm text-gray-600">
                此{selectedApproval.type.replace('_', ' ')}需要您的审核和批准。请在做出决定前仔细查看所有详情。
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => handleApprove(selectedApproval)}
                loading={loading}
                className="flex-1"
              >
                批准
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleReject(selectedApproval)}
                loading={loading}
                className="flex-1"
              >
                拒绝
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Quick Action Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="快捷操作"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => {
                setShowCreateModal(false)
                info('添加供应商', '供应商入驻功能即将推出')
              }}
            >
              <Users className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">添加新供应商</p>
                <p className="text-xs text-gray-500">注册并入驻新供应商</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => {
                setShowCreateModal(false)
                info('创建RFP', 'RFP创建功能即将推出')
              }}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">创建RFP</p>
                <p className="text-xs text-gray-500">发起新的提案请求</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => {
                setShowCreateModal(false)
                info('生成报告', '报告生成功能即将推出')
              }}
            >
              <BarChart3 className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">生成报告</p>
                <p className="text-xs text-gray-500">创建自定义分析报告</p>
              </div>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={showAddSupplierModal}
        onClose={() => setShowAddSupplierModal(false)}
        title="添加新供应商"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                公司名称 *
              </label>
              <input
                type="text"
                className="input"
                placeholder="输入公司名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                行业 *
              </label>
              <select className="input" aria-label="选择行业">
                <option value="">选择行业</option>
                <option value="制造业">制造业</option>
                <option value="技术">技术</option>
                <option value="汽车">汽车</option>
                <option value="物流">物流</option>
                <option value="医疗">医疗</option>
                <option value="金融">金融</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱 *
              </label>
              <input
                type="email"
                className="input"
                placeholder="输入邮箱地址"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                电话 *
              </label>
              <input
                type="tel"
                className="input"
                placeholder="输入电话号码"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              位置 *
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入位置"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类别 *
              </label>
              <select className="input" aria-label="选择类别">
                <option value="">选择类别</option>
                <option value="strategic">战略</option>
                <option value="preferred">首选</option>
                <option value="approved">已批准</option>
                <option value="restricted">受限</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                状态
              </label>
              <select className="input" aria-label="选择状态">
                <option value="pending">待处理</option>
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleAddSupplier({ name: 'New Supplier' })}
              loading={loading}
              className="flex-1"
            >
              注册供应商
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAddSupplierModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create RFP Modal */}
      <Modal
        isOpen={showCreateRFPModal}
        onClose={() => setShowCreateRFPModal(false)}
        title="创建新RFP"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RFP标题 *
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入RFP标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述 *
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="描述采购需求"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类别 *
              </label>
              <select className="input" aria-label="选择类别">
                <option value="">选择类别</option>
                <option value="Technology">技术</option>
                <option value="办公用品">办公用品</option>
                <option value="设备">设备</option>
                <option value="服务">服务</option>
                <option value="原材料">原材料</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                预算 *
              </label>
              <input
                type="number"
                className="input"
                placeholder="输入预算金额"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                截止日期 *
              </label>
              <input
                type="date"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                优先级
              </label>
              <select className="input" aria-label="选择优先级">
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
                <option value="urgent">紧急</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleCreateRFP({ title: 'New RFP' })}
              loading={loading}
              className="flex-1"
            >
              创建RFP
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreateRFPModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Process Payment Modal */}
      <Modal
        isOpen={showProcessPaymentModal}
        onClose={() => setShowProcessPaymentModal(false)}
        title="处理付款"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                供应商 *
              </label>
              <select className="input" aria-label="选择供应商">
                <option value="">选择供应商</option>
                <option value="ABC Corporation">ABC Corporation</option>
                <option value="XYZ Technologies">XYZ Technologies</option>
                <option value="DEF Industries">DEF Industries</option>
                <option value="GHI Logistics">GHI Logistics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                发票编号 *
              </label>
              <input
                type="text"
                className="input"
                placeholder="输入发票编号"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                金额 *
              </label>
              <input
                type="number"
                className="input"
                placeholder="输入金额"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                币种
              </label>
              <select className="input" aria-label="选择币种">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              付款方式 *
            </label>
            <select className="input" aria-label="选择付款方式">
              <option value="">选择付款方式</option>
              <option value="bank_transfer">银行转账</option>
              <option value="wire_transfer">电汇</option>
              <option value="check">支票</option>
              <option value="ach">ACH</option>
              <option value="credit_card">信用卡</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              备注
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="添加付款备注或参考"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleProcessPayment({ amount: '$10,000' })}
              loading={loading}
              className="flex-1"
            >
              处理付款
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowProcessPaymentModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Risk Assessment Modal */}
      <Modal
        isOpen={showRiskAssessmentModal}
        onClose={() => setShowRiskAssessmentModal(false)}
        title="创建风险评估"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              供应商 *
            </label>
            <select className="input" aria-label="选择供应商">
              <option value="">选择供应商</option>
              <option value="ABC Corporation">ABC Corporation</option>
              <option value="XYZ Technologies">XYZ Technologies</option>
              <option value="DEF Industries">DEF Industries</option>
              <option value="GHI Logistics">GHI Logistics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评估类型 *
            </label>
            <select className="input" aria-label="选择评估类型">
              <option value="">选择评估类型</option>
              <option value="financial">财务风险</option>
              <option value="operational">运营风险</option>
              <option value="cybersecurity">网络安全风险</option>
              <option value="compliance">合规风险</option>
              <option value="reputational">声誉风险</option>
              <option value="supply_chain">供应链风险</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                优先级
              </label>
              <select className="input" aria-label="选择优先级">
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
                <option value="critical">严重</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                截止日期
              </label>
              <input
                type="date"
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              风险因素
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">财务不稳定</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">监管合规问题</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">地理集中度</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">技术依赖</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">环境问题</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评估备注
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="添加详细的评估备注和建议"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleRiskAssessment({ supplier: 'Selected Supplier' })}
              loading={loading}
              className="flex-1"
            >
              完成评估
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowRiskAssessmentModal(false)}
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