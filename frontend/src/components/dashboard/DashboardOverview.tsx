'use client'

import { TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const stats = [
  {
    name: '供应商总数',
    value: '1,247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    name: '活跃合同',
    value: '89',
    change: '+5%',
    changeType: 'positive' as const,
    icon: CheckCircle,
  },
  {
    name: '月度支出',
    value: '$2.4M',
    change: '-3%',
    changeType: 'negative' as const,
    icon: DollarSign,
  },
  {
    name: '风险预警',
    value: '7',
    change: '-2',
    changeType: 'positive' as const,
    icon: AlertTriangle,
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'supplier',
    title: '新供应商 ABC Corp 已注册',
    time: '2分钟前',
    status: '待处理',
  },
  {
    id: 2,
    type: 'contract',
    title: 'XYZ Ltd 合同续签',
    time: '1小时前',
    status: '已批准',
  },
  {
    id: 3,
    type: 'payment',
    title: 'DEF Inc 付款已处理',
    time: '3小时前',
    status: '已完成',
  },
  {
    id: 4,
    type: 'risk',
    title: 'GHI Corp 风险评估已更新',
    time: '5小时前',
    status: '已审核',
  },
]

const pendingApprovals = [
  {
    id: 1,
    type: 'supplier',
    title: 'ABC Corp - 供应商入驻',
    priority: '高',
    submittedBy: 'John Smith',
    submittedAt: '2小时前',
  },
  {
    id: 2,
    type: 'contract',
    title: 'XYZ Ltd - 合同修订',
    priority: '中',
    submittedBy: 'Sarah Johnson',
    submittedAt: '4小时前',
  },
  {
    id: 3,
    type: 'invoice',
    title: 'DEF Inc - 发票审批',
    priority: '低',
    submittedBy: 'Mike Wilson',
    submittedAt: '6小时前',
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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
                  <span className="text-sm text-gray-500 ml-1">较上月</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期活动</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activity.status === '待处理' ? 'bg-yellow-100 text-yellow-800' :
                  activity.status === '已批准' ? 'bg-green-100 text-green-800' :
                  activity.status === '已完成' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">待审批</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{approval.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      提交人：{approval.submittedBy} • {approval.submittedAt}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    approval.priority === '高' ? 'bg-red-100 text-red-800' :
                    approval.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {approval.priority}
                  </span>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="btn-primary btn-sm">
                    批准
                  </button>
                  <button className="btn-secondary btn-sm">
                    审核
                  </button>
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
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">添加供应商</p>
              <p className="text-xs text-gray-500">注册新供应商</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">创建RFP</p>
              <p className="text-xs text-gray-500">启动新采购</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DollarSign className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">处理付款</p>
              <p className="text-xs text-gray-500">处理发票付款</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">风险评估</p>
              <p className="text-xs text-gray-500">评估供应商风险</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

