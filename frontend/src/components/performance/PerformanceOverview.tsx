'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Target, Star, AlertTriangle, CheckCircle, Clock, MessageSquare, FileText, BarChart3 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

const performanceStats = [
  {
    name: '平均绩效评分',
    value: '87.5%',
    change: '+2.3%',
    changeType: 'positive' as const,
    icon: Target,
    color: 'text-green-600 bg-green-100',
  },
  {
    name: '准时交付',
    value: '94.2%',
    change: '+1.8%',
    changeType: 'positive' as const,
    icon: Clock,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    name: '质量评分',
    value: '91.7%',
    change: '-0.5%',
    changeType: 'negative' as const,
    icon: Star,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    name: '活跃评分卡',
    value: '156',
    change: '+12',
    changeType: 'positive' as const,
    icon: CheckCircle,
    color: 'text-orange-600 bg-orange-100',
  },
]

const topPerformers = [
  {
    id: 1,
    name: 'ABC Corporation',
    score: 96.5,
    category: 'Strategic',
    trend: 'up',
    metrics: {
      delivery: 98,
      quality: 95,
      cost: 92,
      responsiveness: 98,
    },
  },
  {
    id: 2,
    name: 'XYZ Technologies',
    score: 94.2,
    category: 'Preferred',
    trend: 'up',
    metrics: {
      delivery: 96,
      quality: 93,
      cost: 95,
      responsiveness: 94,
    },
  },
  {
    id: 3,
    name: 'DEF Industries',
    score: 89.8,
    category: 'Approved',
    trend: 'down',
    metrics: {
      delivery: 88,
      quality: 92,
      cost: 89,
      responsiveness: 91,
    },
  },
]

const recentScorecards = [
  {
    id: 1,
    supplierName: 'ABC Corporation',
    period: 'Q4 2023',
    overallScore: 96.5,
    status: 'completed',
    reviewedBy: 'John Smith',
    reviewedAt: '2024-01-15',
    kpis: [
      { name: '准时交付', score: 98, weight: 30 },
      { name: '质量合规', score: 95, weight: 25 },
      { name: '成本绩效', score: 92, weight: 20 },
      { name: '响应能力', score: 98, weight: 25 },
    ],
  },
  {
    id: 2,
    supplierName: 'XYZ Technologies',
    period: 'Q4 2023',
    overallScore: 94.2,
    status: 'in_progress',
    reviewedBy: 'Sarah Johnson',
    reviewedAt: '2024-01-14',
    kpis: [
      { name: '准时交付', score: 96, weight: 30 },
      { name: '质量合规', score: 93, weight: 25 },
      { name: '成本绩效', score: 95, weight: 20 },
      { name: '响应能力', score: 94, weight: 25 },
    ],
  },
]

const recentFeedback = [
  {
    id: 1,
    supplierName: 'ABC Corporation',
    type: 'compliment',
    title: 'Excellent service delivery',
    description: 'Outstanding performance in meeting delivery deadlines and quality standards.',
    status: 'resolved',
    priority: 'low',
    createdBy: 'John Smith',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    supplierName: 'DEF Industries',
    type: 'issue',
    title: 'Quality concerns with recent shipment',
    description: 'Several items in the latest shipment did not meet quality specifications.',
    status: 'in_progress',
    priority: 'high',
    createdBy: 'Mike Wilson',
    createdAt: '2024-01-14',
  },
  {
    id: 3,
    supplierName: 'GHI Logistics',
    type: 'suggestion',
    title: 'Improvement in communication',
    description: 'Suggest implementing real-time tracking for better visibility.',
    status: 'open',
    priority: 'medium',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-13',
  },
]

const statusLabels: Record<string, string> = {
  completed: '已完成',
  in_progress: '进行中',
  pending: '待处理',
  resolved: '已解决',
  open: '未处理',
}

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

const feedbackTypeLabels: Record<string, string> = {
  compliment: '表扬',
  suggestion: '建议',
  issue: '问题/关注',
  complaint: '投诉',
}

const riskLevelLabels: Record<string, string> = {
  low: '低',
  medium: '中',
  high: '高',
  critical: '严重',
}

export default function PerformanceOverview() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateScorecardModal, setShowCreateScorecardModal] = useState(false)
  const [showSubmitFeedbackModal, setShowSubmitFeedbackModal] = useState(false)
  const [showPerformanceReportModal, setShowPerformanceReportModal] = useState(false)
  const [showRiskAssessmentModal, setShowRiskAssessmentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const handleCreateScorecard = async (scorecardData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('评分卡已创建', `${scorecardData.title} 已成功创建`)
      setShowCreateScorecardModal(false)
    } catch (err) {
      error('创建失败', '创建评分卡时发生错误')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFeedback = async (feedbackData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('反馈已提交', '您的反馈已成功提交')
      setShowSubmitFeedbackModal(false)
    } catch (err) {
      error('提交失败', '提交反馈时发生错误')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async (reportData: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      success('报告已生成', '绩效报告已成功生成')
      setShowPerformanceReportModal(false)
    } catch (err) {
      error('生成失败', '生成报告时发生错误')
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
      error('评估失败', '完成风险评估时发生错误')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      open: 'bg-gray-100 text-gray-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getFeedbackTypeColor = (type: string) => {
    const colors = {
      compliment: 'bg-green-100 text-green-800',
      issue: 'bg-red-100 text-red-800',
      suggestion: 'bg-blue-100 text-blue-800',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">较上季度</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">最佳表现者</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            查看全部
          </button>
        </div>
        <div className="space-y-4">
          {topPerformers.map((supplier) => (
            <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">
                      {supplier.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{supplier.name}</h4>
                    <p className="text-sm text-gray-500">{supplier.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getScoreColor(supplier.score)}`}>
                    {supplier.score}%
                  </p>
                  <div className="flex items-center">
                    {supplier.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className="text-xs text-gray-500">较上期</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">交付</p>
                  <p className={`text-sm font-medium ${getScoreColor(supplier.metrics.delivery)}`}>
                    {supplier.metrics.delivery}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">质量</p>
                  <p className={`text-sm font-medium ${getScoreColor(supplier.metrics.quality)}`}>
                    {supplier.metrics.quality}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">成本</p>
                  <p className={`text-sm font-medium ${getScoreColor(supplier.metrics.cost)}`}>
                    {supplier.metrics.cost}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">响应</p>
                  <p className={`text-sm font-medium ${getScoreColor(supplier.metrics.responsiveness)}`}>
                    {supplier.metrics.responsiveness}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scorecards */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期评分卡</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentScorecards.map((scorecard) => (
              <div key={scorecard.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{scorecard.supplierName}</h4>
                    <p className="text-sm text-gray-500">{scorecard.period}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getScoreColor(scorecard.overallScore)}`}>
                      {scorecard.overallScore}%
                    </p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(scorecard.status)}`}>
                      {statusLabels[scorecard.status] || scorecard.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {scorecard.kpis.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{kpi.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              kpi.score >= 90 ? 'bg-green-500' :
                              kpi.score >= 80 ? 'bg-yellow-500' :
                              kpi.score >= 70 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${kpi.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${getScoreColor(kpi.score)}`}>
                          {kpi.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    审核人：{scorecard.reviewedBy} • {formatDate(scorecard.reviewedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期反馈</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{feedback.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{feedback.supplierName}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFeedbackTypeColor(feedback.type)}`}>
                    {feedbackTypeLabels[feedback.type] || feedback.type}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{feedback.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                      {statusLabels[feedback.status] || feedback.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                      {priorityLabels[feedback.priority] || feedback.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatDate(feedback.createdAt)}
                  </p>
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
            onClick={() => setShowCreateScorecardModal(true)}
          >
            <Target className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">创建评分卡</p>
              <p className="text-xs text-gray-500">评估供应商绩效</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
            onClick={() => setShowSubmitFeedbackModal(true)}
          >
            <MessageSquare className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">提交反馈</p>
              <p className="text-xs text-gray-500">报告问题或建议</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
            onClick={() => setShowPerformanceReportModal(true)}
          >
            <TrendingUp className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">绩效报告</p>
              <p className="text-xs text-gray-500">生成详细分析</p>
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

      {/* Create Scorecard Modal */}
      <Modal
        isOpen={showCreateScorecardModal}
        onClose={() => setShowCreateScorecardModal(false)}
        title="创建绩效评分卡"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评分卡名称 *
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入评分卡名称"
            />
          </div>

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
              评估周期 *
            </label>
            <select className="input" aria-label="选择评估周期">
              <option value="">选择周期</option>
              <option value="monthly">月度</option>
              <option value="quarterly">季度</option>
              <option value="annually">年度</option>
              <option value="custom">自定义周期</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              绩效指标
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">准时交付（权重：30%）</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">质量合规（权重：25%）</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">成本绩效（权重：20%）</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">响应能力（权重：25%）</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleCreateScorecard({ title: 'New Scorecard' })}
              loading={loading}
              className="flex-1"
            >
              创建评分卡
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreateScorecardModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Submit Feedback Modal */}
      <Modal
        isOpen={showSubmitFeedbackModal}
        onClose={() => setShowSubmitFeedbackModal(false)}
        title="提交绩效反馈"
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
              反馈类型 *
            </label>
            <select className="input" aria-label="选择反馈类型">
              <option value="">选择类型</option>
              <option value="compliment">表扬</option>
              <option value="suggestion">建议</option>
              <option value="issue">问题/关注</option>
              <option value="complaint">投诉</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标题 *
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入反馈标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述 *
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="详细描述您的反馈"
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
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleSubmitFeedback({})}
              loading={loading}
              className="flex-1"
            >
              提交反馈
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowSubmitFeedbackModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Performance Report Modal */}
      <Modal
        isOpen={showPerformanceReportModal}
        onClose={() => setShowPerformanceReportModal(false)}
        title="生成绩效报告"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              报告类型 *
            </label>
            <select className="input" aria-label="选择报告类型">
              <option value="">选择报告类型</option>
              <option value="summary">绩效摘要</option>
              <option value="detailed">详细分析</option>
              <option value="trend">趋势分析</option>
              <option value="comparison">供应商比较</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                开始日期 *
              </label>
              <input
                type="date"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                结束日期 *
              </label>
              <input
                type="date"
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              供应商
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">所有供应商</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">ABC Corporation</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">XYZ Technologies</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">DEF Industries</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              包含指标
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">准时交付</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">质量评分</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">成本绩效</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-700">响应能力</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => handleGenerateReport({})}
              loading={loading}
              className="flex-1"
            >
              生成报告
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowPerformanceReportModal(false)}
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
        title="创建绩效风险评估"
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
              风险类别 *
            </label>
            <select className="input" aria-label="选择风险类别">
              <option value="">选择风险类别</option>
              <option value="performance">绩效风险</option>
              <option value="delivery">交付风险</option>
              <option value="quality">质量风险</option>
              <option value="capacity">产能风险</option>
              <option value="financial">财务风险</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              风险等级
            </label>
            <select className="input" aria-label="选择风险等级">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="critical">严重</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评估详情
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="描述风险评估发现和建议"
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
    </div>
  )
}
