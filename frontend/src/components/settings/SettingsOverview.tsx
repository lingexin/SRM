'use client'

import { useState } from 'react'
import { Users, Database, Lock, Plug, Settings, Shield, Key, Upload, Download, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const settingsStats = [
  {
    name: '活跃用户',
    value: '47',
    change: '+3',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    name: '用户角色',
    value: '8',
    change: '0',
    changeType: 'stable' as const,
    icon: Shield,
    color: 'text-green-600 bg-green-100',
  },
  {
    name: '活跃集成',
    value: '5',
    change: '+1',
    changeType: 'positive' as const,
    icon: Plug,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    name: '安全警报',
    value: '2',
    change: '-1',
    changeType: 'negative' as const,
    icon: AlertTriangle,
    color: 'text-orange-600 bg-orange-100',
  },
]

const recentUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    department: 'Procurement',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z',
    department: 'Finance',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    role: 'Buyer',
    status: 'inactive',
    lastLogin: '2024-01-10T16:45:00Z',
    department: 'Operations',
  },
]

const userRoles = [
  {
    id: 1,
    name: 'Administrator',
    description: '完整系统访问和配置权限',
    userCount: 3,
    permissions: 25,
    isSystem: true,
  },
  {
    id: 2,
    name: 'Manager',
    description: '具有审批权限的管理访问',
    userCount: 8,
    permissions: 18,
    isSystem: false,
  },
  {
    id: 3,
    name: 'Buyer',
    description: '采购和供应商管理访问',
    userCount: 15,
    permissions: 12,
    isSystem: false,
  },
  {
    id: 4,
    name: 'Viewer',
    description: '报告和数据的只读访问',
    userCount: 21,
    permissions: 5,
    isSystem: false,
  },
]

const integrations = [
  {
    id: 1,
    name: 'SAP ERP',
    type: 'ERP',
    status: 'active',
    lastSync: '2024-01-15T10:00:00Z',
    records: 12547,
    health: 'healthy',
  },
  {
    id: 2,
    name: 'Salesforce CRM',
    type: 'CRM',
    status: 'active',
    lastSync: '2024-01-15T09:30:00Z',
    records: 8932,
    health: 'healthy',
  },
  {
    id: 3,
    name: 'QuickBooks',
    type: '财务',
    status: 'error',
    lastSync: '2024-01-14T15:20:00Z',
    records: 0,
    health: 'error',
  },
  {
    id: 4,
    name: 'Microsoft Dynamics',
    type: 'ERP',
    status: 'inactive',
    lastSync: '2024-01-10T08:45:00Z',
    records: 0,
    health: 'inactive',
  },
]

const securityAlerts = [
  {
    id: 1,
    type: '登录失败',
    description: '检测到多次登录失败尝试',
    severity: 'medium',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'investigating',
    user: 'unknown@external.com',
  },
  {
    id: 2,
    type: '权限变更',
    description: '管理员修改了用户角色',
    severity: 'low',
    timestamp: '2024-01-15T09:15:00Z',
    status: 'resolved',
    user: 'john.smith@company.com',
  },
]

const dataManagement = [
  {
    id: 1,
    operation: '供应商数据导入',
    type: '导入',
    status: 'completed',
    records: 247,
    executedBy: 'John Smith',
    executedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: 2,
    operation: '合同数据导出',
    type: '导出',
    status: 'completed',
    records: 89,
    executedBy: 'Sarah Johnson',
    executedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: 3,
    operation: '数据清理 - 重复项',
    type: '清理',
    status: 'in_progress',
    records: 156,
    executedBy: '系统',
    executedAt: '2024-01-15T10:00:00Z',
  },
]

export default function SettingsOverview() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      error: 'bg-red-100 text-red-800',
      healthy: 'bg-green-100 text-green-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getSeverityColor = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    }
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'inactive':
        return <Activity className="w-4 h-4 text-gray-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: '活跃',
      inactive: '非活跃',
      healthy: '健康',
      error: '错误',
      investigating: '调查中',
      resolved: '已解决',
      completed: '已完成',
      in_progress: '进行中',
    }
    return labels[status] || status
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">本月</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">快捷操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">添加用户</p>
              <p className="text-xs text-gray-500">创建新用户账户</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">管理角色</p>
              <p className="text-xs text-gray-500">配置权限</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plug className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">添加集成</p>
              <p className="text-xs text-gray-500">连接外部系统</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Database className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">数据导入</p>
              <p className="text-xs text-gray-500">上传供应商数据</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期用户</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">{user.department}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                    {getStatusLabel(user.status)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(user.lastLogin)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Roles */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">用户角色</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              管理
            </button>
          </div>
          <div className="space-y-4">
            {userRoles.map((role) => (
              <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 flex items-center">
                      {role.name}
                      {role.isSystem && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          系统
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-4">
                    <span className="text-xs text-gray-500">
                      {role.userCount} 个用户
                    </span>
                    <span className="text-xs text-gray-500">
                      {role.permissions} 个权限
                    </span>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    编辑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrations */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">集成</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              管理
            </button>
          </div>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plug className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">{integration.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getHealthIcon(integration.health)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                      {getStatusLabel(integration.status)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-4">
                    <span className="text-xs text-gray-500">
                      {integration.records.toLocaleString()} 条记录
                    </span>
                    <span className="text-xs text-gray-500">
                      上次同步：{formatDate(integration.lastSync)}
                    </span>
                  </div>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    配置
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">安全警报</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{alert.type}</h4>
                    <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-1">用户：{alert.user}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {getStatusLabel(alert.status)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    {formatDate(alert.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">数据管理</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            查看全部
          </button>
        </div>
        <div className="space-y-4">
          {dataManagement.map((operation) => (
            <div key={operation.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`p-2 rounded-lg ${
                operation.type === '导入' ? 'bg-blue-100 text-blue-600' :
                operation.type === '导出' ? 'bg-green-100 text-green-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {operation.type === '导入' ? <Upload className="w-4 h-4" /> :
                 operation.type === '导出' ? <Download className="w-4 h-4" /> :
                 <Database className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{operation.operation}</h4>
                <p className="text-sm text-gray-500">
                  {operation.records} 条记录 • 执行人：{operation.executedBy}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(operation.executedAt)}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(operation.status)}`}>
                {getStatusLabel(operation.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}









