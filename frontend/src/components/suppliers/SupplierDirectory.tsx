'use client'

import { useState } from 'react'
import { Search, Filter, Plus, MoreVertical, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react'
import { formatDate, getStatusColor } from '@/lib/utils'

const suppliers = [
  {
    id: 1,
    name: 'ABC Corporation',
    email: 'contact@abccorp.com',
    phone: '+1 (555) 123-4567',
    industry: 'Manufacturing',
    category: 'strategic',
    status: 'active',
    riskScore: 85,
    location: 'New York, NY',
    contracts: 12,
    lastActivity: '2024-01-15',
    performance: 92,
  },
  {
    id: 2,
    name: 'XYZ Technologies',
    email: 'info@xyztech.com',
    phone: '+1 (555) 987-6543',
    industry: 'Technology',
    category: 'preferred',
    status: 'active',
    riskScore: 72,
    location: 'San Francisco, CA',
    contracts: 8,
    lastActivity: '2024-01-14',
    performance: 88,
  },
  {
    id: 3,
    name: 'DEF Industries',
    email: 'sales@defind.com',
    phone: '+1 (555) 456-7890',
    industry: 'Automotive',
    category: 'approved',
    status: 'pending',
    riskScore: 45,
    location: 'Detroit, MI',
    contracts: 3,
    lastActivity: '2024-01-13',
    performance: 75,
  },
  {
    id: 4,
    name: 'GHI Logistics',
    email: 'support@ghilogistics.com',
    phone: '+1 (555) 321-0987',
    industry: 'Logistics',
    category: 'restricted',
    status: 'inactive',
    riskScore: 25,
    location: 'Chicago, IL',
    contracts: 1,
    lastActivity: '2024-01-10',
    performance: 60,
  },
]

const categories = [
  { value: 'all', label: '所有类别' },
  { value: 'strategic', label: '战略' },
  { value: 'preferred', label: '首选' },
  { value: 'approved', label: '已批准' },
  { value: 'restricted', label: '受限' },
]

const statuses = [
  { value: 'all', label: '所有状态' },
  { value: 'active', label: '活跃' },
  { value: 'inactive', label: '非活跃' },
  { value: 'pending', label: '待处理' },
]

export default function SupplierDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || supplier.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    if (score >= 40) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">供应商目录</h2>
          <p className="text-gray-600 mt-1">管理和追踪所有供应商</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          添加供应商
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="按名称、邮箱或行业搜索供应商..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
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
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary"
            >
              <Filter className="w-4 h-4 mr-2" />
              更多筛选
            </button>
          </div>
        </div>

        {/* Additional Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  风险评分范围
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
                  绩效范围
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
                  最近活动
                </label>
                <select className="input">
                  <option value="">全部时间</option>
                  <option value="7">最近7天</option>
                  <option value="30">最近30天</option>
                  <option value="90">最近90天</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suppliers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">供应商</th>
                <th className="table-header-cell">类别</th>
                <th className="table-header-cell">状态</th>
                <th className="table-header-cell">风险评分</th>
                <th className="table-header-cell">绩效</th>
                <th className="table-header-cell">合同</th>
                <th className="table-header-cell">最近活动</th>
                <th className="table-header-cell">操作</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">
                          {supplier.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {supplier.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {supplier.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {supplier.industry} • {supplier.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${
                      supplier.category === 'strategic' ? 'badge-info' :
                      supplier.category === 'preferred' ? 'badge-success' :
                      supplier.category === 'approved' ? 'badge-warning' :
                      'badge-error'
                    }`}>
                      {supplier.category}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getStatusColor(supplier.status)}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(supplier.riskScore)}`}>
                        {supplier.riskScore}
                      </span>
                      {supplier.riskScore < 50 && (
                        <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance)}`}>
                      {supplier.performance}%
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-900">{supplier.contracts}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-500">
                      {formatDate(supplier.lastActivity)}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            显示 <span className="font-medium">1</span> 到 <span className="font-medium">4</span> 共{' '}
            <span className="font-medium">4</span> 条结果
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary btn-sm" disabled>
              上一页
            </button>
            <button className="btn-primary btn-sm">1</button>
            <button className="btn-secondary btn-sm" disabled>
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

