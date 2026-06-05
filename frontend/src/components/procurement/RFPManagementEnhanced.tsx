'use client'

import { useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw,
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  BarChart3,
  ArrowUpDown,
  Settings,
  Send,
  Copy,
  Archive,
  Star,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'
import { rfps } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface RFP {
  id: number
  title: string
  description: string
  category: string
  budget: number
  deadline: Date
  status: string
  suppliers: number
  createdBy: string
  createdAt: Date
  requirements: string[]
}

const statuses = [
  { value: 'all', label: '所有状态' },
  { value: 'draft', label: '草稿' },
  { value: 'published', label: '已发布' },
  { value: 'closed', label: '已关闭' },
  { value: 'awarded', label: '已授予' },
]

const categories = [
  { value: 'all', label: '所有类别' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Office Supplies', label: 'Office Supplies' },
  { value: 'Equipment', label: 'Equipment' },
  { value: 'Services', label: 'Services' },
  { value: 'Manufacturing', label: 'Manufacturing' },
]

const sortOptions = [
  { value: 'title', label: '标题' },
  { value: 'budget', label: '预算' },
  { value: 'deadline', label: '截止日期' },
  { value: 'createdAt', label: '创建日期' },
  { value: 'suppliers', label: '供应商' },
]

export default function RFPManagementEnhanced() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRFP, setSelectedRFP] = useState<RFP | null>(null)
  const [showRFPModal, setShowRFPModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const filteredAndSortedRFPs = useMemo(() => {
    let filtered = rfps.filter(rfp => {
      const matchesSearch = rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rfp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           rfp.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'all' || rfp.status === selectedStatus
      const matchesCategory = selectedCategory === 'all' || rfp.category === selectedCategory
      
      return matchesSearch && matchesStatus && matchesCategory
    })

    // Sort RFPs
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof RFP]
      let bValue: any = b[sortBy as keyof RFP]

      if (sortBy === 'deadline' || sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [searchTerm, selectedStatus, selectedCategory, sortBy, sortOrder])

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-blue-100 text-blue-800',
      closed: 'bg-green-100 text-green-800',
      awarded: 'bg-purple-100 text-purple-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return FileText
      case 'published':
        return Send
      case 'closed':
        return CheckCircle
      case 'awarded':
        return Star
      default:
        return FileText
    }
  }

  const getPriorityColor = (deadline: Date) => {
    const now = new Date()
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilDeadline < 0) return 'text-red-600 bg-red-100'
    if (daysUntilDeadline <= 7) return 'text-orange-600 bg-orange-100'
    if (daysUntilDeadline <= 30) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const handleExport = () => {
    const csvContent = [
      ['标题', '类别', '预算', '截止日期', '状态', '供应商', '创建人', '创建日期'],
      ...filteredAndSortedRFPs.map(rfp => [
        rfp.title,
        rfp.category,
        formatCurrency(rfp.budget),
        formatDate(rfp.deadline),
        rfp.status,
        rfp.suppliers.toString(),
        rfp.createdBy,
        formatDate(rfp.createdAt)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rfps.csv'
    a.click()
    URL.revokeObjectURL(url)
    
    success('导出成功', 'RFP数据已导出为CSV')
  }

  const handleBulkAction = (action: string) => {
    info('批量操作', `${action} 操作将应用于选中的RFP`)
  }

  const handlePublish = async (rfp: RFP) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('RFP已发布', `${rfp.title} 已成功发布`)
    } catch (err) {
      error('发布失败', '发布RFP时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = async (rfp: RFP) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('RFP已关闭', `${rfp.title} 已关闭`)
    } catch (err) {
      error('关闭失败', '关闭RFP时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleAward = async (rfp: RFP) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('RFP已授予', `${rfp.title} 已授予选定的供应商`)
    } catch (err) {
      error('授予失败', '授予RFP时出错')
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
            <h2 className="text-2xl font-bold text-gray-900">RFP管理</h2>
            <p className="text-gray-600 mt-1">使用高级分析创建、管理和追踪提案请求</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              导入
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              创建RFP
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">RFP总数</p>
                <p className="text-2xl font-bold text-gray-900">{rfps.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃RFP</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rfps.filter(r => r.status === 'published').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Send className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总预算</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(rfps.reduce((acc, r) => acc + r.budget, 0))}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均响应时间</p>
                <p className="text-2xl font-bold text-gray-900">3.2 天</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="按标题、描述或类别搜索RFP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    排序依据 {option.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>

              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="rounded-r-none"
                >
                  表格
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-l-none"
                >
                  网格
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    预算范围
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="最小值"
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="最大值"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    截止日期范围
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className="input"
                    />
                    <input
                      type="date"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    创建人
                  </label>
                  <select className="input">
                    <option value="">所有用户</option>
                    <option value="john-smith">John Smith</option>
                    <option value="sarah-johnson">Sarah Johnson</option>
                    <option value="mike-wilson">Mike Wilson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    供应商数量
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="最小值"
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="最大值"
                      className="input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {filteredAndSortedRFPs.length} 个RFP
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Export')}>
                  导出选中
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Publish')}>
                  发布选中
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Close')}>
                  关闭选中
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('Archive')}>
                  归档选中
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* RFPs Display */}
        {viewMode === 'table' ? (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="table-header-cell">
                      <button
                        onClick={() => handleSort('title')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>RFP详情</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">类别</th>
                    <th className="table-header-cell">
                      <button
                        onClick={() => handleSort('budget')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>预算</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">
                      <button
                        onClick={() => handleSort('deadline')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>截止日期</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">
                      <button
                        onClick={() => handleSort('suppliers')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>供应商</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">状态</th>
                    <th className="table-header-cell">操作</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredAndSortedRFPs.map((rfp) => {
                    const StatusIcon = getStatusIcon(rfp.status)
                    return (
                      <tr key={rfp.id} className="hover:bg-gray-50">
                        <td className="table-cell">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="table-cell">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              rfp.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                              rfp.status === 'published' ? 'bg-blue-100 text-blue-600' :
                              rfp.status === 'closed' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <StatusIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {rfp.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {rfp.description}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                创建人：{rfp.createdBy} • {formatRelativeTime(new Date(rfp.createdAt))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="badge badge-info">
                            {rfp.category}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(rfp.budget)}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {formatDate(rfp.deadline)}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(new Date(rfp.deadline))}`}>
                              {Math.ceil((new Date(rfp.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} 天
                            </span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{rfp.suppliers}</span>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className={`badge ${getStatusColor(rfp.status)}`}>
                            {rfp.status}
                          </span>
                        </td>
                        <td className="table-cell">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="p-1 text-gray-400 hover:text-primary"
                              onClick={() => {
                                setSelectedRFP(rfp)
                                setShowRFPModal(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </button>
                            {rfp.status === 'draft' && (
                              <button 
                                className="p-1 text-gray-400 hover:text-green-500"
                                onClick={() => handlePublish(rfp)}
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                            {rfp.status === 'published' && (
                              <button 
                                className="p-1 text-gray-400 hover:text-orange-500"
                                onClick={() => handleClose(rfp)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                显示第 <span className="font-medium">1</span> 到第 <span className="font-medium">{filteredAndSortedRFPs.length}</span> 条，共{' '}
                <span className="font-medium">{filteredAndSortedRFPs.length}</span> 条结果
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="primary" size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>
                  下一页
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedRFPs.map((rfp) => {
              const StatusIcon = getStatusIcon(rfp.status)
              return (
                <div key={rfp.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${
                        rfp.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                        rfp.status === 'published' ? 'bg-blue-100 text-blue-600' :
                        rfp.status === 'closed' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{rfp.title}</h3>
                        <p className="text-xs text-gray-500">{rfp.category}</p>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                    {rfp.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">预算</span>
                      <span className="font-medium text-gray-900">{formatCurrency(rfp.budget)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">截止日期</span>
                      <span className="font-medium text-gray-900">{formatDate(rfp.deadline)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">供应商</span>
                      <span className="font-medium text-gray-900">{rfp.suppliers}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">创建于</span>
                      <span className="font-medium text-gray-900">{formatRelativeTime(new Date(rfp.createdAt))}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`badge ${getStatusColor(rfp.status)}`}>
                      {rfp.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(new Date(rfp.deadline))}`}>
                      {Math.ceil((new Date(rfp.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} 天剩余
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedRFP(rfp)
                        setShowRFPModal(true)
                      }}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      查看
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      编辑
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* RFP Details Modal */}
      <Modal
        isOpen={showRFPModal}
        onClose={() => setShowRFPModal(false)}
        title="RFP详情"
        size="xl"
      >
        {selectedRFP && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-4 rounded-lg ${
                  selectedRFP.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                  selectedRFP.status === 'published' ? 'bg-blue-100 text-blue-600' :
                  selectedRFP.status === 'closed' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {React.createElement(getStatusIcon(selectedRFP.status), { className: "w-8 h-8" })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRFP.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedRFP.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`badge ${getStatusColor(selectedRFP.status)}`}>
                      {selectedRFP.status}
                    </span>
                    <span className="badge badge-info">
                      {selectedRFP.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">基本信息</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">预算：</span>
                    <span className="text-sm font-medium">{formatCurrency(selectedRFP.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">截止日期：</span>
                    <span className="text-sm font-medium">{formatDate(selectedRFP.deadline)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">供应商：</span>
                    <span className="text-sm font-medium">{selectedRFP.suppliers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">创建人：</span>
                    <span className="text-sm font-medium">{selectedRFP.createdBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">创建日期：</span>
                    <span className="text-sm font-medium">{formatDate(selectedRFP.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">需求</h4>
                <ul className="space-y-2">
                  {selectedRFP.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                编辑RFP
              </Button>
              <Button variant="secondary" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                查看响应
              </Button>
              <Button variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                复制
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create RFP Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="创建新RFP"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RFP标题
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入RFP标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="描述需求和范围"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类别
              </label>
              <select className="input">
                <option value="">选择类别</option>
                <option value="technology">Technology</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
                <option value="office-supplies">Office Supplies</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                预算
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
                截止日期
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
              <select className="input">
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              需求
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="输入需求"
                />
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => {
                setShowCreateModal(false)
                success('RFP已创建', '新RFP已成功创建')
              }}
              className="flex-1"
            >
              创建RFP
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
