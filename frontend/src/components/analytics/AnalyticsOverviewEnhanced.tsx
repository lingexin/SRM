'use client'

import { useState, useMemo } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Eye,
  Settings,
  ArrowUpDown,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  FileText,
  Star,
  Award,
  Zap,
  Shield,
  Globe,
  Building2
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { spendAnalysis, topSuppliersBySpend, performanceMetrics, kpis } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface AnalyticsWidget {
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

const analyticsWidgets: AnalyticsWidget[] = [
  {
    id: 'total-spend',
    title: '总支出',
    value: '$12.4M',
    change: '+8.5%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-green-500',
    trend: 'up',
    subtitle: '本季度'
  },
  {
    id: 'supplier-count',
    title: '活跃供应商',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-blue-500',
    trend: 'up',
    subtitle: '当前活跃'
  },
  {
    id: 'avg-performance',
    title: '平均绩效',
    value: '87.5%',
    change: '+2.1%',
    changeType: 'positive',
    icon: Target,
    color: 'bg-purple-500',
    trend: 'up',
    subtitle: '总体评分'
  },
  {
    id: 'risk-alerts',
    title: '风险预警',
    value: '7',
    change: '-3',
    changeType: 'positive',
    icon: AlertTriangle,
    color: 'bg-red-500',
    trend: 'down',
    subtitle: '需关注'
  },
  {
    id: 'on-time-delivery',
    title: '准时交付',
    value: '94.2%',
    change: '+1.8%',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-emerald-500',
    trend: 'up',
    subtitle: '最近30天'
  },
  {
    id: 'cost-savings',
    title: '成本节约',
    value: '$1.2M',
    change: '+15%',
    changeType: 'positive',
    icon: Award,
    color: 'bg-yellow-500',
    trend: 'up',
    subtitle: '本季度'
  }
]

const chartTypes = [
  { value: 'bar', label: '柱状图', icon: BarChart },
  { value: 'line', label: '折线图', icon: LineChart },
  { value: 'pie', label: '饼图', icon: PieChart },
]

const timeRanges = [
  { value: '7d', label: '最近7天' },
  { value: '30d', label: '最近30天' },
  { value: '90d', label: '最近90天' },
  { value: '1y', label: '去年' },
  { value: 'all', label: '全部时间' },
]

export default function AnalyticsOverviewEnhanced() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [selectedChartType, setSelectedChartType] = useState('bar')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('spend')
  const [showExportModal, setShowExportModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const filteredSpendAnalysis = useMemo(() => {
    return spendAnalysis.filter(item => {
      // Apply time range filtering logic here
      return true
    })
  }, [selectedTimeRange])

  const topPerformers = useMemo(() => {
    return topSuppliersBySpend
      .sort((a, b) => b.performance - a.performance)
      .slice(0, 5)
  }, [])

  const riskSuppliers = useMemo(() => {
    return topSuppliersBySpend
      .filter(supplier => supplier.performance < 80)
      .sort((a, b) => a.performance - b.performance)
      .slice(0, 5)
  }, [])

  const handleExport = (format: string) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      success('导出成功', `分析数据已导出为 ${format.toUpperCase()}`)
      setShowExportModal(false)
    }, 1000)
  }

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

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">分析概览</h1>
            <p className="text-gray-600 mt-1">供应商关系和采购绩效的综合洞察</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => setShowExportModal(true)}>
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
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              自定义
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
                  图表类型
                </label>
                <select
                  value={selectedChartType}
                  onChange={(e) => setSelectedChartType(e.target.value)}
                  className="input"
                >
                  {chartTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  关注指标
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="input"
                >
                  <option value="spend">支出分析</option>
                  <option value="performance">绩效</option>
                  <option value="risk">风险评估</option>
                  <option value="compliance">合规</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {analyticsWidgets.map((widget) => {
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

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spend Analysis Chart - Takes 2 columns */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">支出分析</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  查看详情
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  导出
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredSpendAnalysis.map((item) => (
                <div key={item.category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.trend === 'up' ? 'bg-green-500' :
                        item.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                      <span className={`text-xs ml-2 ${
                        item.trend === 'up' ? 'text-green-600' :
                        item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{item.percentage}% 占总支出</span>
                    <span className={`text-xs ${
                      item.trend === 'up' ? 'text-green-600' :
                      item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'} {item.trend}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.trend === 'up' ? 'bg-green-500' :
                        item.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Suppliers - Takes 1 column */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">顶级供应商</h3>
              <Button variant="ghost" size="sm">
                查看全部
              </Button>
            </div>
            <div className="space-y-4">
              {topSuppliersBySpend.slice(0, 5).map((supplier, index) => (
                <div key={supplier.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{supplier.name}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(supplier.spend)} • {supplier.contracts} 份合同</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(supplier.performance)}`}>
                      {supplier.performance}%
                    </span>
                    <div className="flex items-center mt-1">
                      {supplier.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : supplier.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <Activity className="w-3 h-3 text-gray-500" />
                      )}
                      <span className={`text-xs ml-1 ${
                        supplier.trend === 'up' ? 'text-green-600' :
                        supplier.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {supplier.change > 0 ? '+' : ''}{supplier.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance & Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">绩效趋势</h3>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <LineChart className="w-4 h-4 mr-1" />
                  折线图
                </Button>
                <Button variant="ghost" size="sm">
                  <BarChart className="w-4 h-4 mr-1" />
                  柱状图
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    <div className="flex items-center mt-1">
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
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">风险评估</h3>
              <Button variant="ghost" size="sm">
                查看详情
              </Button>
            </div>
            <div className="space-y-4">
              {riskSuppliers.map((supplier) => (
                <div key={supplier.id} className="flex items-center space-x-3 p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                    <p className="text-xs text-gray-500">绩效：{supplier.performance}% • 风险：高</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-red-600 font-medium">需要行动</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic & Industry Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Geographic Distribution */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">地域分布</h3>
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-1" />
                查看地图
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">北美</span>
                </div>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">欧洲</span>
                </div>
                <span className="text-sm text-gray-600">30%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">亚太</span>
                </div>
                <span className="text-sm text-gray-600">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">其他</span>
                </div>
                <span className="text-sm text-gray-600">5%</span>
              </div>
            </div>
          </div>

          {/* Industry Breakdown */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">行业分布</h3>
              <Button variant="ghost" size="sm">
                <Building2 className="w-4 h-4 mr-1" />
                查看详情
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">技术</span>
                </div>
                <span className="text-sm text-gray-600">25.8%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">制造业</span>
                </div>
                <span className="text-sm text-gray-600">22.6%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">服务业</span>
                </div>
                <span className="text-sm text-gray-600">16.9%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">办公用品</span>
                </div>
                <span className="text-sm text-gray-600">14.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('生成报告', '自定义报告生成功能即将推出')}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">生成报告</p>
                <p className="text-xs text-gray-500">创建自定义分析报告</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('导出数据', '数据导出功能即将推出')}
            >
              <Download className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">导出数据</p>
                <p className="text-xs text-gray-500">下载分析数据</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('定时报告', '定时报告功能即将推出')}
            >
              <Calendar className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">定时报告</p>
                <p className="text-xs text-gray-500">设置自动报告</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 justify-start"
              onClick={() => info('自定义仪表盘', '自定义仪表盘功能即将推出')}
            >
              <Settings className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">自定义仪表盘</p>
                <p className="text-xs text-gray-500">个性化您的视图</p>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="导出分析数据"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              导出格式
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleExport('csv')}
                loading={loading}
                className="h-auto p-4"
              >
                <FileText className="w-6 h-6 text-primary mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">CSV</p>
                  <p className="text-xs text-gray-500">电子表格格式</p>
                </div>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport('pdf')}
                loading={loading}
                className="h-auto p-4"
              >
                <FileText className="w-6 h-6 text-primary mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">PDF</p>
                  <p className="text-xs text-gray-500">报告格式</p>
                </div>
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              数据范围
            </label>
            <select className="input">
              <option value="30d">最近30天</option>
              <option value="90d">最近90天</option>
              <option value="1y">去年</option>
              <option value="all">全部时间</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              包含图表
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-600">支出分析图表</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-600">绩效趋势</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm text-gray-600">风险评估</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={() => setShowExportModal(false)}
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
