'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users, Download, Calendar, Filter, Eye } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const analyticsStats = [
  {
    name: '总支出',
    value: '$12.4M',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'text-green-600 bg-green-100',
  },
  {
    name: '活跃供应商',
    value: '247',
    change: '+12',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    name: '平均绩效',
    value: '87.5%',
    change: '+2.3%',
    changeType: 'positive' as const,
    icon: TrendingUp,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    name: '成本节约',
    value: '$1.2M',
    change: '+15.6%',
    changeType: 'positive' as const,
    icon: BarChart3,
    color: 'text-orange-600 bg-orange-100',
  },
]

const spendByCategory = [
  { category: 'Technology', amount: 3200000, percentage: 25.8, trend: 'up' },
  { category: 'Manufacturing', amount: 2800000, percentage: 22.6, trend: 'up' },
  { category: 'Services', amount: 2100000, percentage: 16.9, trend: 'down' },
  { category: 'Office Supplies', amount: 1800000, percentage: 14.5, trend: 'stable' },
  { category: 'Logistics', amount: 1500000, percentage: 12.1, trend: 'up' },
  { category: 'Other', amount: 1000000, percentage: 8.1, trend: 'down' },
]

const topSuppliers = [
  {
    id: 1,
    name: 'ABC Corporation',
    spend: 2400000,
    percentage: 19.4,
    contracts: 12,
    performance: 96.5,
    trend: 'up',
  },
  {
    id: 2,
    name: 'XYZ Technologies',
    spend: 1800000,
    percentage: 14.5,
    contracts: 8,
    performance: 94.2,
    trend: 'up',
  },
  {
    id: 3,
    name: 'DEF Industries',
    spend: 1200000,
    percentage: 9.7,
    contracts: 6,
    performance: 89.8,
    trend: 'down',
  },
  {
    id: 4,
    name: 'GHI Logistics',
    spend: 900000,
    percentage: 7.3,
    contracts: 4,
    performance: 87.2,
    trend: 'stable',
  },
]

const recentReports = [
  {
    id: 1,
    title: 'Q4 2023 Spend Analysis',
    type: 'Spend Analysis',
    period: 'Oct - Dec 2023',
    generatedBy: 'John Smith',
    generatedAt: '2024-01-15',
    status: 'completed',
    downloads: 24,
  },
  {
    id: 2,
    title: 'Supplier Performance Report',
    type: 'Performance',
    period: 'Q4 2023',
    generatedBy: 'Sarah Johnson',
    generatedAt: '2024-01-14',
    status: 'completed',
    downloads: 18,
  },
  {
    id: 3,
    title: 'Risk Assessment Summary',
    type: 'Risk Analysis',
    period: 'January 2024',
    generatedBy: 'Mike Wilson',
    generatedAt: '2024-01-13',
    status: 'generating',
    downloads: 0,
  },
]

const upcomingReports = [
  {
    id: 1,
    title: 'Monthly Spend Report',
    schedule: 'Monthly',
    nextRun: '2024-02-01',
    recipients: 8,
    status: 'active',
  },
  {
    id: 2,
    title: 'Quarterly Performance Review',
    schedule: 'Quarterly',
    nextRun: '2024-04-01',
    recipients: 12,
    status: 'active',
  },
  {
    id: 3,
    title: 'Annual Supplier Analysis',
    schedule: 'Yearly',
    nextRun: '2024-12-31',
    recipients: 15,
    status: 'paused',
  },
]

export default function AnalyticsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('ytd')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      generating: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      completed: '已完成',
      generating: '生成中',
      active: '活跃',
      paused: '已暂停',
    }
    return texts[status] || status
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">较上期</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">分析仪表盘</h3>
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input"
            >
              <option value="ytd">年初至今</option>
              <option value="q4">2023年第四季度</option>
              <option value="q3">2023年第三季度</option>
              <option value="monthly">最近12个月</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="all">所有类别</option>
              <option value="technology">Technology</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
            </select>
            <button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              更多筛选
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend by Category */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">按类别支出</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看详情
            </button>
          </div>
          <div className="space-y-4">
            {spendByCategory.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                  <span className={`text-sm ${getTrendColor(item.trend)}`}>
                    {getTrendIcon(item.trend)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">支出最高的供应商</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {topSuppliers.map((supplier) => (
              <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-primary font-semibold text-sm">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{supplier.name}</h4>
                      <p className="text-xs text-gray-500">{supplier.contracts} 个合同</p>
                    </div>
                  </div>
                  <span className={`text-sm ${getTrendColor(supplier.trend)}`}>
                    {getTrendIcon(supplier.trend)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${supplier.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(supplier.spend)}</p>
                    <p className="text-xs text-gray-500">{supplier.performance}% 绩效</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期报告</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{report.type} • {report.period}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      生成人：{report.generatedBy} • {formatDate(report.generatedAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    {report.downloads} 次下载
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-xs text-primary hover:text-primary/80 font-medium">
                      <Eye className="w-3 h-3 inline mr-1" />
                      查看
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                      <Download className="w-3 h-3 inline mr-1" />
                      下载
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">定时报告</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              管理
            </button>
          </div>
          <div className="space-y-4">
            {upcomingReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{report.schedule} • {report.recipients} 个接收者</p>
                    <p className="text-xs text-gray-400 mt-1">
                      下次运行：{formatDate(report.nextRun)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>

                <div className="flex space-x-2 mt-3">
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    编辑
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                    {report.status === 'active' ? '暂停' : '恢复'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">快速操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">创建报告</p>
              <p className="text-xs text-gray-500">生成自定义分析</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">定时报告</p>
              <p className="text-xs text-gray-500">设置自动报告</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">导出数据</p>
              <p className="text-xs text-gray-500">下载原始数据</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">绩效洞察</p>
              <p className="text-xs text-gray-500">查看详细指标</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}









