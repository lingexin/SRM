'use client'

import { useState } from 'react'
import { MessageSquare, FileText, Users, HeadphonesIcon, Send, Paperclip, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'

const communicationStats = [
  {
    name: '未读消息',
    value: '12',
    change: '+3',
    changeType: 'positive' as const,
    icon: MessageSquare,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    name: '活跃讨论',
    value: '8',
    change: '+2',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-green-600 bg-green-100',
  },
  {
    name: '共享文档',
    value: '156',
    change: '+12',
    changeType: 'positive' as const,
    icon: FileText,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    name: '待处理工单',
    value: '5',
    change: '-2',
    changeType: 'negative' as const,
    icon: HeadphonesIcon,
    color: 'text-orange-600 bg-orange-100',
  },
]

const recentMessages = [
  {
    id: 1,
    sender: 'ABC Corporation',
    subject: 'Contract Amendment Discussion',
    preview: 'We would like to discuss the proposed changes to the service level agreement...',
    time: '2024-01-15T10:30:00Z',
    unread: true,
    priority: 'high',
  },
  {
    id: 2,
    sender: 'XYZ Technologies',
    subject: 'Monthly Performance Review',
    preview: 'Please find attached our monthly performance report for December...',
    time: '2024-01-15T09:15:00Z',
    unread: true,
    priority: 'medium',
  },
  {
    id: 3,
    sender: 'DEF Industries',
    subject: 'Delivery Schedule Update',
    preview: 'We need to adjust the delivery schedule for next week due to...',
    time: '2024-01-14T16:45:00Z',
    unread: false,
    priority: 'low',
  },
]

const activeDiscussions = [
  {
    id: 1,
    title: 'Q1 2024 Procurement Strategy',
    category: 'Strategy',
    participants: 8,
    lastActivity: '2024-01-15T11:20:00Z',
    unreadPosts: 3,
    author: 'John Smith',
  },
  {
    id: 2,
    title: 'New Supplier Onboarding Process',
    category: 'Process',
    participants: 5,
    lastActivity: '2024-01-15T09:30:00Z',
    unreadPosts: 1,
    author: 'Sarah Johnson',
  },
  {
    id: 3,
    title: 'Quality Standards Discussion',
    category: 'Quality',
    participants: 12,
    lastActivity: '2024-01-14T14:15:00Z',
    unreadPosts: 0,
    author: 'Mike Wilson',
  },
]

const recentDocuments = [
  {
    id: 1,
    name: 'ABC Corp - Service Agreement v2.1.pdf',
    type: 'Contract',
    size: '2.4 MB',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-01-15T10:00:00Z',
    sharedWith: 3,
  },
  {
    id: 2,
    name: 'XYZ Tech - Performance Report Q4.xlsx',
    type: 'Report',
    size: '1.8 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-15T09:30:00Z',
    sharedWith: 5,
  },
  {
    id: 3,
    name: 'DEF Industries - Compliance Certificate.pdf',
    type: 'Certificate',
    size: '856 KB',
    uploadedBy: 'Mike Wilson',
    uploadedAt: '2024-01-14T16:20:00Z',
    sharedWith: 2,
  },
]

const openTickets = [
  {
    id: 1,
    title: 'Login Issues with Portal',
    category: 'Technical',
    priority: 'high',
    status: 'open',
    supplier: 'ABC Corporation',
    assignedTo: 'Tech Support',
    createdAt: '2024-01-15T08:30:00Z',
    lastUpdate: '2024-01-15T10:15:00Z',
  },
  {
    id: 2,
    title: 'Payment Processing Delay',
    category: 'Billing',
    priority: 'medium',
    status: 'in_progress',
    supplier: 'XYZ Technologies',
    assignedTo: 'Finance Team',
    createdAt: '2024-01-14T14:20:00Z',
    lastUpdate: '2024-01-15T09:45:00Z',
  },
  {
    id: 3,
    title: 'Document Upload Problem',
    category: 'General',
    priority: 'low',
    status: 'open',
    supplier: 'DEF Industries',
    assignedTo: 'Support Team',
    createdAt: '2024-01-13T11:10:00Z',
    lastUpdate: '2024-01-14T15:30:00Z',
  },
]

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

const statusLabels: Record<string, string> = {
  open: '待处理',
  in_progress: '处理中',
  resolved: '已解决',
}

const fileTypeLabels: Record<string, string> = {
  Contract: '合同',
  Report: '报告',
  Certificate: '证书',
}

const categoryLabels: Record<string, string> = {
  Technical: '技术',
  Billing: '账单',
  General: '一般',
}

export default function CommunicationOverview() {
  const [activeTab, setActiveTab] = useState('messages')

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'bg-red-100 text-red-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getFileTypeColor = (type: string) => {
    const colors = {
      Contract: 'bg-blue-100 text-blue-800',
      Report: 'bg-green-100 text-green-800',
      Certificate: 'bg-purple-100 text-purple-800',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {communicationStats.map((stat) => (
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
                  <span className="text-sm text-gray-500 ml-1">本周</span>
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
            <Send className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">发送消息</p>
              <p className="text-xs text-gray-500">开始新对话</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Paperclip className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">共享文档</p>
              <p className="text-xs text-gray-500">上传和共享文件</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">发起讨论</p>
              <p className="text-xs text-gray-500">创建论坛主题</p>
            </div>
          </button>
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <HeadphonesIcon className="w-6 h-6 text-primary mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">创建工单</p>
              <p className="text-xs text-gray-500">请求支持</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期消息</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                message.unread ? 'border-primary/20 bg-primary/5' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{message.subject}</h4>
                      {message.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{message.sender}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.preview}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                      {priorityLabels[message.priority] || message.priority}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(message.time)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Discussions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">活跃讨论</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {activeDiscussions.map((discussion) => (
              <div key={discussion.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{discussion.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {discussion.participants} 位参与者 • 发起人：{discussion.author}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full mt-2">
                      {discussion.category}
                    </span>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {discussion.unreadPosts > 0 && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
                        {discussion.unreadPosts} 条新
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(discussion.lastActivity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Documents */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">近期文档</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {recentDocuments.map((document) => (
              <div key={document.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{document.name}</h4>
                  <p className="text-sm text-gray-500">
                    {document.size} • 共享给 {document.sharedWith} 人
                  </p>
                  <p className="text-xs text-gray-400">
                    上传者：{document.uploadedBy} • {formatRelativeTime(document.uploadedAt)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(document.type)}`}>
                  {fileTypeLabels[document.type] || document.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Tickets */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">待处理工单</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              查看全部
            </button>
          </div>
          <div className="space-y-4">
            {openTickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{ticket.supplier}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {priorityLabels[ticket.priority] || ticket.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                      {statusLabels[ticket.status] || ticket.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500">
                      指派给：{ticket.assignedTo}
                    </span>
                    <span className="text-xs text-gray-500">
                      类别：{categoryLabels[ticket.category] || ticket.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(ticket.lastUpdate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}









