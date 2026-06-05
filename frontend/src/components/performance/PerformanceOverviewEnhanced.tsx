'use client'

import { useState, useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3, 
  Users, 
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Eye,
  Edit,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Settings,
  ArrowUpDown,
  Activity,
  Zap,
  Shield,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  FileText,
  Plus,
  MoreVertical,
  Search,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { performanceMetrics, kpis, feedbackItems } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface PerformanceWidget {
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

const performanceWidgets: PerformanceWidget[] = [
  {
    id: 'overall-score',
    title: '总体绩效',
    value: '87.5%',
    change: '+2.1%',
    changeType: 'positive',
    icon: Target,
    color: 'bg-blue-500',
    trend: 'up',
    subtitle: '所有供应商平均'
  },
  {
    id: 'on-time-delivery',
    title: '准时交付',
    value: '94.2%',
    change: '+1.8%',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-green-500',
    trend: 'up',
    subtitle: '最近30天'
  },
  {
    id: 'quality-score',
    title: '质量评分',
    value: '91.7%',
    change: '+0.5%',
    changeType: 'positive',
    icon: Award,
    color: 'bg-purple-500',
    trend: 'up',
    subtitle: '合规率'
  },
  {
    id: 'cost-variance',
    title: '成本差异',
    value: '8.4%',
    change: '-1.2%',
    changeType: 'positive',
    icon: TrendingDown,
    color: 'bg-orange-500',
    trend: 'down',
    subtitle: '预算内'
  },
  {
    id: 'responsiveness',
    title: '响应能力',
    value: '89.1%',
    change: '-0.8%',
    changeType: 'negative',
    icon: Zap,
    color: 'bg-yellow-500',
    trend: 'down',
    subtitle: '响应时间'
  },
  {
    id: 'satisfaction',
    title: '满意度',
    value: '4.2/5',
    change: '+0.1',
    changeType: 'positive',
    icon: Star,
    color: 'bg-pink-500',
    trend: 'up',
    subtitle: '客户评分'
  }
]

const timeRanges = [
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: '90d', label: '最近90天' },
  { value: '1y', label: '去年' },
]

const performanceCategories = [
  { value: 'all', label: '所有类别' },
  { value: 'delivery', label: '交付' },
  { value: 'quality', label: '质量' },
  { value: 'cost', label: '成本' },
  { value: 'responsiveness', label: '响应能力' },
]

export default function PerformanceOverviewEnhanced() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<any>(null)
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)
  const [showMetricModal, setShowMetricModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const filteredMetrics = useMemo(() => {
    return performanceMetrics.filter(metric => {
      // Apply time range and category filtering logic here
      return true
    })
  }, [selectedTimeRange, selectedCategory])

  const filteredKPIs = useMemo(() => {
    return kpis.filter(kpi => {
      const matchesCategory = selectedCategory === 'all' || kpi.category === selectedCategory
      return matchesCategory
    })
  }, [selectedCategory])

  const filteredFeedback = useMemo(() => {
    return feedbackItems.filter(feedback => {
      // Apply filtering logic here
      return true
    })
  }, [])

  const topPerformers = useMemo(() => {
    return filteredMetrics
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 5)
  }, [filteredMetrics])

  const bottomPerformers = useMemo(() => {
    return filteredMetrics
      .sort((a, b) => a.overallScore - b.overallScore)
      .slice(0, 5)
  }, [filteredMetrics])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return TrendingUp
      case 'down':
        return TrendingDown
      default:
        return Activity
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100'
    if (score >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
      critical: 'bg-red-200 text-red-900',
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'compliment':
        return ThumbsUp
      case 'issue':
        return AlertTriangle
      case 'suggestion':
        return MessageSquare
      case 'complaint':
        return ThumbsDown
      default:
        return MessageSquare
    }
  }

  const handleExport = () => {
    success('导出成功', '绩效数据已成功导出')
  }

  const handleCreateReview = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('评审已创建', '新绩效评审已创建')
      setShowCreateModal(false)
    } catch (err) {
      error('创建失败', '创建评审时出错')
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
            <h1 className="text-3xl font-bold text-gray-900">绩效管理</h1>
            <p className="text-gray-600 mt-1">监控供应商绩效、追踪KPI并管理反馈</p>
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
              新建评审
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="card">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时间范围
                </label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="input"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  类别
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  {performanceCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  视图类型
                </label>
                <select className="input">
                  <option value="overview">概览</option>
                  <option value="detailed">详细</option>
                  <option value="comparative">对比</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {performanceWidgets.map((widget) => {
            const IconComponent = widget.icon
            const TrendIcon = getTrendIcon(widget.trend || 'stable')
            return (
              <div key={widget.id} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{widget.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{widget.value}</p>
                    <p className="text-xs text-gray-500 mb-2">{widget.subtitle}</p>
                    <div className="flex items-center">
                      <TrendIcon className={`w-4 h-4 mr-1 ${getTrendColor(widget.trend || 'stable')}`} />
                      <span className={`text-sm font-medium ${getTrendColor(widget.trend || 'stable')}`}>
                        {widget.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">较上期</span>
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

        {/* Main Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KPI Trends - Takes 2 columns */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">KPI趋势</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <LineChart className="w-4 h-4 mr-1" />
                  折线图
                </Button>
                <Button variant="ghost" size="sm">
                  <BarChart className="w-4 h-4 mr-1" />
                  柱状图
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  查看详情
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredKPIs.map((kpi) => (
                <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        kpi.category === 'delivery' ? 'bg-green-500' :
                        kpi.category === 'quality' ? 'bg-blue-500' :
                        kpi.category === 'cost' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{kpi.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{kpi.current}{kpi.unit}</span>
                      <span className={`text-xs ml-2 ${
                        kpi.trend === 'up' ? 'text-green-600' :
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        目标： {kpi.target}{kpi.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{kpi.period}</span>
                    <div className="flex items-center">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : kpi.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <Activity className="w-3 h-3 text-gray-500" />
                      )}
                      <span className={`text-xs ml-1 ${
                        kpi.trend === 'up' ? 'text-green-600' :
                        kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {kpi.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        kpi.current >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers - Takes 1 column */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">最佳表现者</h3>
              <Button variant="ghost" size="sm">
                查看全部
              </Button>
            </div>
            <div className="space-y-4">
              {topPerformers.map((supplier, index) => (
                <div key={supplier.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{supplier.supplierName}</p>
                    <p className="text-xs text-gray-500">{supplier.period}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(supplier.overallScore)}`}>
                      {supplier.overallScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Analysis & Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Analysis */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">绩效分析</h3>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                配置
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">高于目标</span>
                </div>
                <span className="text-sm text-green-600 font-medium">12 个供应商</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-900">有风险</span>
                </div>
                <span className="text-sm text-yellow-600 font-medium">5 个供应商</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-900">低于目标</span>
                </div>
                <span className="text-sm text-red-600 font-medium">3 个供应商</span>
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">近期反馈</h3>
              <Button variant="ghost" size="sm">
                查看全部
              </Button>
            </div>
            <div className="space-y-4">
              {filteredFeedback.slice(0, 5).map((feedback) => {
                const FeedbackIcon = getFeedbackIcon(feedback.type)
                return (
                  <div 
                    key={feedback.id} 
                    className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setSelectedFeedback(feedback)
                      setShowFeedbackModal(true)
                    }}
                  >
                    <div className={`p-2 rounded-lg ${
                      feedback.type === 'compliment' ? 'bg-green-100 text-green-600' :
                      feedback.type === 'issue' ? 'bg-red-100 text-red-600' :
                      feedback.type === 'suggestion' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <FeedbackIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{feedback.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{feedback.supplierName}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                          {feedback.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(feedback.priority)}`}>
                          {feedback.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Performers */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">需要关注的供应商</h3>
            <Button variant="ghost" size="sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              查看所有问题
            </Button>
          </div>
          <div className="space-y-4">
            {bottomPerformers.map((supplier) => (
              <div key={supplier.id} className="flex items-center space-x-4 p-4 border border-red-200 bg-red-50 rounded-lg">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{supplier.supplierName}</h4>
                  <p className="text-sm text-gray-500 mt-1">总体评分： {supplier.overallScore}% • {supplier.period}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>交付： {supplier.kpis.find(k => k.name === 'On-Time Delivery')?.score}%</span>
                    <span>质量： {supplier.kpis.find(k => k.name === 'Quality Compliance')?.score}%</span>
                    <span>成本： {supplier.kpis.find(k => k.name === 'Cost Variance')?.score}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(supplier.overallScore)}`}>
                    {supplier.overallScore}%
                  </span>
                  <p className="text-xs text-red-600 mt-1">需要行动</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('安排评审', '绩效评审安排功能即将推出')}
            >
              <Calendar className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">安排评审</p>
                <p className="text-xs text-gray-500">设置绩效评审</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('生成报告', '绩效报告生成功能即将推出')}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">生成报告</p>
                <p className="text-xs text-gray-500">创建绩效报告</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('发送反馈', '反馈发送功能即将推出')}
            >
              <MessageSquare className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">发送反馈</p>
                <p className="text-xs text-gray-500">提供供应商反馈</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('设置提醒', '绩效提醒配置功能即将推出')}
            >
              <Bell className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">设置提醒</p>
                <p className="text-xs text-gray-500">配置绩效提醒</p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Details Modal */}
      <Modal
        isOpen={showMetricModal}
        onClose={() => setShowMetricModal(false)}
        title="绩效指标详情"
        size="lg"
      >
        {selectedMetric && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedMetric.name}</h3>
                <p className="text-sm text-gray-500 mt-1">绩效指标详情</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">当前绩效</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>当前值：</span>
                  <span className="font-medium">{selectedMetric.current}{selectedMetric.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>目标：</span>
                  <span className="font-medium">{selectedMetric.target}{selectedMetric.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span>趋势：</span>
                  <span className={`font-medium ${
                    selectedMetric.trend === 'up' ? 'text-green-600' :
                    selectedMetric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {selectedMetric.trend}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                编辑目标
              </Button>
              <Button variant="secondary" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                查看趋势
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Feedback Details Modal */}
      <Modal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        title="反馈详情"
        size="lg"
      >
        {selectedFeedback && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className={`p-4 rounded-lg ${
                selectedFeedback.type === 'compliment' ? 'bg-green-100 text-green-600' :
                selectedFeedback.type === 'issue' ? 'bg-red-100 text-red-600' :
                selectedFeedback.type === 'suggestion' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {React.createElement(getFeedbackIcon(selectedFeedback.type), { className: "w-8 h-8" })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedFeedback.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedFeedback.supplierName} • {formatDate(selectedFeedback.createdAt)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                    {selectedFeedback.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedFeedback.priority)}`}>
                    {selectedFeedback.priority}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">描述</h4>
              <p className="text-sm text-gray-600">{selectedFeedback.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">详情</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>创建人：</span>
                    <span>{selectedFeedback.createdBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>指派给：</span>
                    <span>{selectedFeedback.assignedTo || '未指派'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                更新状态
              </Button>
              <Button variant="secondary" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                添加评论
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Review Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="创建绩效评审"
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
              评审周期
            </label>
            <select className="input">
              <option value="q1-2024">Q1 2024</option>
              <option value="q2-2024">Q2 2024</option>
              <option value="q3-2024">Q3 2024</option>
              <option value="q4-2024">Q4 2024</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              评审类型
            </label>
            <select className="input">
              <option value="quarterly">季度评审</option>
              <option value="annual">年度评审</option>
              <option value="ad-hoc">临时评审</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              备注
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="输入评审备注和评论"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleCreateReview}
              loading={loading}
              className="flex-1"
            >
              创建评审
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
