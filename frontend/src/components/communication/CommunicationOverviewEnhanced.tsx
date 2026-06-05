'use client'

import { useState, useMemo } from 'react'
import { 
  MessageSquare, 
  FileText, 
  Users, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  Reply, 
  Forward, 
  Archive, 
  Star, 
  Trash2, 
  MoreVertical,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Paperclip,
  Image,
  Video,
  File,
  Phone,
  Mail,
  Globe,
  Lock,
  Unlock,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share,
  Copy,
  Edit,
  Flag,
  Tag,
  UserPlus,
  UserMinus,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff
} from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'
import { messages, documents, tickets } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface Message {
  id: number
  sender: string
  receiver: string
  subject: string
  content: string
  time: string
  unread: boolean
  priority: string
  attachments: number
}

interface Document {
  id: number
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  sharedWith: number
  category: string
}

interface Ticket {
  id: number
  title: string
  category: string
  priority: string
  status: string
  supplier: string
  assignedTo: string
  createdAt: string
  lastUpdate: string
  description: string
}

const messageTypes = [
  { value: 'all', label: '所有消息' },
  { value: 'unread', label: '未读' },
  { value: 'sent', label: '已发送' },
  { value: 'archived', label: '已归档' },
]

const documentCategories = [
  { value: 'all', label: '所有类别' },
  { value: 'Contract', label: '合同' },
  { value: 'Report', label: '报告' },
  { value: 'Certificate', label: '证书' },
  { value: 'Legal', label: '法务' },
  { value: 'Performance', label: '绩效' },
  { value: 'Compliance', label: '合规' },
]

const ticketStatuses = [
  { value: 'all', label: '所有状态' },
  { value: 'open', label: '待处理' },
  { value: 'in_progress', label: '处理中' },
  { value: 'resolved', label: '已解决' },
  { value: 'closed', label: '已关闭' },
]

export default function CommunicationOverviewEnhanced() {
  const [activeTab, setActiveTab] = useState('messages')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessageType, setSelectedMessageType] = useState('all')
  const [selectedDocCategory, setSelectedDocCategory] = useState('all')
  const [selectedTicketStatus, setSelectedTicketStatus] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.sender.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedMessageType === 'all' || 
                         (selectedMessageType === 'unread' && message.unread) ||
                         (selectedMessageType === 'sent' && message.receiver.includes('@company.com')) ||
                         (selectedMessageType === 'archived' && false) // 待实现归档逻辑
      
      return matchesSearch && matchesType
    })
  }, [searchTerm, selectedMessageType])

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedDocCategory === 'all' || doc.category === selectedDocCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedDocCategory])

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedTicketStatus === 'all' || ticket.status === selectedTicketStatus
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, selectedTicketStatus])

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
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileText
      case 'image':
        return Image
      case 'video':
        return Video
      default:
        return File
    }
  }

  const handleSendMessage = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('消息已发送', '您的消息已成功发送')
      setShowComposeModal(false)
    } catch (err) {
      error('发送失败', '发送消息时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadDocument = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('文档已上传', '文档已成功上传')
      setShowUploadModal(false)
    } catch (err) {
      error('上传失败', '上传文档时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleTicketAction = async (action: string, ticket: Ticket) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('操作已完成', `对工单 ${ticket.title} 执行 ${action} 操作已完成`)
    } catch (err) {
      error('操作失败', `执行 ${action} 操作时出错`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">沟通与协作</h1>
            <p className="text-gray-600 mt-1">管理供应商沟通、文档和支持工单</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              设置
            </Button>
            <Button onClick={() => setShowComposeModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              新建消息
            </Button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">未读消息</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.unread).length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">共享文档</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待处理工单</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃供应商</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="card">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'messages', label: '消息', icon: MessageSquare },
                { id: 'documents', label: '文档', icon: FileText },
                { id: 'tickets', label: '支持工单', icon: Bell },
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

        {/* 搜索与筛选 */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`搜索${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {activeTab === 'messages' && (
                <select
                  value={selectedMessageType}
                  onChange={(e) => setSelectedMessageType(e.target.value)}
                  className="input"
                >
                  {messageTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              )}
              
              {activeTab === 'documents' && (
                <select
                  value={selectedDocCategory}
                  onChange={(e) => setSelectedDocCategory(e.target.value)}
                  className="input"
                >
                  {documentCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              )}
              
              {activeTab === 'tickets' && (
                <select
                  value={selectedTicketStatus}
                  onChange={(e) => setSelectedTicketStatus(e.target.value)}
                  className="input"
                >
                  {ticketStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              )}
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                更多筛选
              </Button>
            </div>
          </div>
        </div>

        {/* 根据选中的标签页显示内容 */}
        {activeTab === 'messages' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">消息</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-1" />
                  归档
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  删除
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    message.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedMessage(message)
                    setShowMessageModal(true)
                  }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.unread ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm font-medium ${
                      message.unread ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {message.sender.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        message.unread ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {message.sender}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatRelativeTime(new Date(message.time))}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      message.unread ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {message.content}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                      {message.attachments > 0 && (
                        <span className="flex items-center text-xs text-gray-500">
                          <Paperclip className="w-3 h-3 mr-1" />
                          {message.attachments}
                        </span>
                      )}
                      {message.unread && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">文档</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                  <Upload className="w-4 h-4 mr-1" />
                  上传
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  全部下载
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => {
                const DocumentIcon = getDocumentIcon(document.type)
                return (
                  <div 
                    key={document.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                    onClick={() => {
                      setSelectedDocument(document)
                      setShowDocumentModal(true)
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <DocumentIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {document.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {document.type} • {document.size}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          上传者：{document.uploadedBy}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="badge badge-info">
                            {document.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(new Date(document.uploadedAt))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">支持工单</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-1" />
                  归档
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  管理
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                  onClick={() => {
                    setSelectedTicket(ticket)
                    setShowTicketModal(true)
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>供应商：{ticket.supplier}</span>
                        <span>指派给：{ticket.assignedTo}</span>
                        <span>创建时间：{formatRelativeTime(new Date(ticket.createdAt))}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 消息详情弹窗 */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="消息详情"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">
                  {selectedMessage.sender.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{selectedMessage.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  发件人：{selectedMessage.sender} • {formatRelativeTime(new Date(selectedMessage.time))}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </span>
                  {selectedMessage.attachments > 0 && (
                    <span className="flex items-center text-xs text-gray-500">
                      <Paperclip className="w-3 h-3 mr-1" />
                      {selectedMessage.attachments} 个附件
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{selectedMessage.content}</p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Reply className="w-4 h-4 mr-2" />
                回复
              </Button>
              <Button variant="secondary" className="flex-1">
                <Forward className="w-4 h-4 mr-2" />
                转发
              </Button>
              <Button variant="outline" className="flex-1">
                <Archive className="w-4 h-4 mr-2" />
                归档
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 文档详情弹窗 */}
      <Modal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        title="文档详情"
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
                <p className="text-sm text-gray-500 mt-1">
                  上传者：{selectedDocument.uploadedBy} • {formatRelativeTime(new Date(selectedDocument.uploadedAt))}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="badge badge-info">
                    {selectedDocument.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedDocument.size}
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
                  <span>大小：</span>
                  <span>{selectedDocument.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>共享给：</span>
                  <span>{selectedDocument.sharedWith} 人</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                下载
              </Button>
              <Button variant="secondary" className="flex-1">
                <Share className="w-4 h-4 mr-2" />
                共享
              </Button>
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                编辑
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 工单详情弹窗 */}
      <Modal
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
        title="工单详情"
        size="lg"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  创建者：{selectedTicket.supplier} • {formatRelativeTime(new Date(selectedTicket.createdAt))}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace('_', ' ')}
                  </span>
                  <span className="badge badge-info">
                    {selectedTicket.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">描述</h4>
              <p className="text-sm text-gray-600">{selectedTicket.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">工单信息</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>指派给：</span>
                    <span>{selectedTicket.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最后更新：</span>
                    <span>{formatRelativeTime(new Date(selectedTicket.lastUpdate))}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={() => handleTicketAction('解决', selectedTicket)}
                className="flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                解决
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleTicketAction('指派', selectedTicket)}
                className="flex-1"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                指派
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                评论
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 撰写消息弹窗 */}
      <Modal
        isOpen={showComposeModal}
        onClose={() => setShowComposeModal(false)}
        title="撰写消息"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              收件人
            </label>
            <input
              type="email"
              className="input"
              placeholder="输入收件人邮箱"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入主题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              优先级
            </label>
            <select className="input">
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              消息
            </label>
            <textarea
              className="input"
              rows={6}
              placeholder="输入您的消息"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleSendMessage}
              loading={loading}
              className="flex-1"
            >
              <Send className="w-4 h-4 mr-2" />
              发送消息
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowComposeModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* 上传文档弹窗 */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="上传文档"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文档名称
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入文档名称"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              类别
            </label>
            <select className="input">
              <option value="">选择类别</option>
              <option value="Contract">合同</option>
              <option value="Report">报告</option>
              <option value="Certificate">证书</option>
              <option value="Legal">法务</option>
              <option value="Performance">绩效</option>
              <option value="Compliance">合规</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传文件
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">拖放文件到此处，或点击选择</p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleUploadDocument}
              loading={loading}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              上传文档
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowUploadModal(false)}
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
