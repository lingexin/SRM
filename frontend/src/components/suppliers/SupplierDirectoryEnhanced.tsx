'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Edit3,
  Trash2, 
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  ChevronDown,
  Clock,
  ArrowUpDown,
  Settings,
  Users,
  FileText,
  BarChart3,
  Send,
  Copy,
  Archive,
  Ban
} from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'
import { suppliers } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  industry: string
  category: string
  status: string
  riskScore: number
  location: string
  contracts: number
  lastActivity: string
  performance: number
  certifications: string[]
  establishedYear: number
  employees: number
  revenue: number
}

const categories = [
  { value: 'all', label: '所有类别', color: 'bg-gray-100 text-gray-800' },
  { value: 'strategic', label: '战略', color: 'bg-blue-100 text-blue-800' },
  { value: 'preferred', label: '首选', color: 'bg-green-100 text-green-800' },
  { value: 'approved', label: '已批准', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'restricted', label: '受限', color: 'bg-red-100 text-red-800' },
]

const statuses = [
  { value: 'all', label: '所有状态' },
  { value: 'active', label: '活跃' },
  { value: 'inactive', label: '非活跃' },
  { value: 'pending', label: '待处理' },
  { value: 'suspended', label: '已暂停' },
]

const sortOptions = [
  { value: 'name', label: '名称' },
  { value: 'performance', label: '绩效' },
  { value: 'riskScore', label: '风险评分' },
  { value: 'lastActivity', label: '最近活动' },
  { value: 'contracts', label: '合同' },
]

export default function SupplierDirectoryEnhanced() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [showSupplierModal, setShowSupplierModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMoreActionsMenu, setShowMoreActionsMenu] = useState<number | null>(null)
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [loading, setLoading] = useState(false)
  const [supplierData, setSupplierData] = useState(suppliers)
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    location: '',
    category: '',
    status: 'pending'
  })
  const [addFormErrors, setAddFormErrors] = useState<Record<string, string>>({})
  const [editingField, setEditingField] = useState<{id: number, field: string} | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [updatingSuppliers, setUpdatingSuppliers] = useState<number[]>([])
  const { success, error, warning, info, ToastContainer } = useToast()
  const moreActionsRef = useRef<HTMLDivElement>(null)

  const filteredAndSortedSuppliers = useMemo(() => {
    let filtered = supplierData.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || supplier.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort suppliers
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Supplier]
      let bValue: any = b[sortBy as keyof Supplier]

      if (sortBy === 'lastActivity') {
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
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder])

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

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

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.color || 'bg-gray-100 text-gray-800'
  }

  const InlineEditField = ({ 
    supplierId, 
    field, 
    value, 
    type = 'select',
    options = [],
    className = ''
  }: {
    supplierId: number
    field: string
    value: string
    type?: 'select' | 'input'
    options?: { value: string; label: string }[]
    className?: string
  }) => {
    const isEditing = editingField?.id === supplierId && editingField?.field === field
    const [isHovered, setIsHovered] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    if (isEditing) {
      if (type === 'select') {
        return (
          <div className="relative">
            <div className="flex items-center space-x-2 bg-white border-2 border-primary rounded-lg shadow-lg p-2 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <select
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, supplierId, field)}
                  className="appearance-none bg-transparent text-sm font-medium pr-8 focus:outline-none cursor-pointer"
                  autoFocus
                  aria-label={`编辑供应商 ${field} 字段`}
                >
                  {options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleSaveEdit(supplierId, field)}
                  className="p-1.5 text-white bg-green-500 hover:bg-green-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
                  title="保存更改"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
                  title="取消更改"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )
      }
    }

    const currentOption = options.find(opt => opt.value === value)
    const getBadgeColor = (val: string) => {
      if (field === 'status') {
        return getStatusColor(val)
      } else if (field === 'category') {
        return getCategoryColor(val)
      }
      return className
    }

    return (
      <div 
        className={`relative group transition-all duration-200 ${isHovered ? 'transform scale-105' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${getBadgeColor(value)} ${isHovered ? 'shadow-md ring-2 ring-primary/20' : ''} hover:shadow-lg`}
          onClick={() => handleStartEdit(supplierId, field, value)}
        >
          <div className="flex items-center space-x-2">
            <span>{currentOption?.label || value}</span>
            <Edit3 className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isHovered ? 'opacity-100' : ''}`} />
          </div>
        </div>
        
        {/* Hover tooltip */}
        {isHovered && !isEditing && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg animate-in fade-in-0 zoom-in-95 duration-200">
            点击编辑
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    )
  }

  const handleExport = () => {
    const csvContent = [
      ['名称', '邮箱', '行业', '类别', '状态', '风险评分', '绩效', '合同', '最近活动'],
      ...filteredAndSortedSuppliers.map(supplier => [
        supplier.name,
        supplier.email,
        supplier.industry,
        supplier.category,
        supplier.status,
        supplier.riskScore,
        supplier.performance,
        supplier.contracts,
        formatDate(supplier.lastActivity)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'suppliers.csv'
    a.click()
    URL.revokeObjectURL(url)
    
    success('导出成功', '供应商数据已导出为 CSV')
  }

  const handleBulkAction = (action: string) => {
    if (selectedSuppliers.length === 0) {
      warning('未选择', '请先选择供应商')
      return
    }
    info('批量操作', `${action} 操作将应用于 ${selectedSuppliers.length} 个已选供应商`)
  }

  const handleSelectSupplier = (supplierId: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    )
  }

  const handleSelectAll = () => {
    if (selectedSuppliers.length === filteredAndSortedSuppliers.length) {
      setSelectedSuppliers([])
    } else {
      setSelectedSuppliers(filteredAndSortedSuppliers.map(s => s.id))
    }
  }

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowSupplierModal(true)
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowEditModal(true)
  }

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowDeleteModal(true)
  }

  const confirmDeleteSupplier = () => {
    if (!selectedSupplier) return
    
    setSupplierData(prev => prev.filter(s => s.id !== selectedSupplier.id))
    setShowDeleteModal(false)
    setSelectedSupplier(null)
    success('供应商已删除', `${selectedSupplier.name} 已成功删除`)
  }

  const handleMoreActions = (supplierId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setShowMoreActionsMenu(showMoreActionsMenu === supplierId ? null : supplierId)
  }

  const handleMoreAction = (action: string, supplier: Supplier) => {
    setShowMoreActionsMenu(null)
    
    switch (action) {
      case 'send-email':
        success('邮件已发送', `邮件已发送至 ${supplier.name}`)
        break
      case 'copy-details':
        navigator.clipboard.writeText(`${supplier.name} - ${supplier.email} - ${supplier.phone}`)
        success('已复制', '供应商详情已复制到剪贴板')
        break
      case 'archive':
        setSupplierData(prev => prev.map(s => 
          s.id === supplier.id ? { ...s, status: 'inactive' } : s
        ))
        success('供应商已归档', `${supplier.name} 已归档`)
        break
      case 'suspend':
        setSupplierData(prev => prev.map(s => 
          s.id === supplier.id ? { ...s, status: 'suspended' } : s
        ))
        warning('供应商已暂停', `${supplier.name} 已暂停`)
        break
      default:
        info('操作', `已对 ${supplier.name} 执行 ${action} 操作`)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      success('数据已刷新', '供应商数据已刷新')
    }, 1000)
  }

  const handleImport = () => {
    info('导入功能', '导入功能将会实现')
  }

  const validateAddForm = () => {
    const errors: Record<string, string> = {}
    
    if (!newSupplier.name.trim()) {
      errors.name = '公司名称为必填'
    }
    if (!newSupplier.email.trim()) {
      errors.email = '邮箱为必填'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newSupplier.email)) {
      errors.email = '请输入有效的邮箱地址'
    }
    if (!newSupplier.phone.trim()) {
      errors.phone = '电话号码为必填'
    }
    if (!newSupplier.industry) {
      errors.industry = '行业为必填'
    }
    if (!newSupplier.location.trim()) {
      errors.location = '位置为必填'
    }
    if (!newSupplier.category) {
      errors.category = '类别为必填'
    }
    
    setAddFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAddSupplier = () => {
    if (!validateAddForm()) {
      error('验证错误', '请在提交前修正表单错误')
      return
    }

    const supplier: Supplier = {
      id: Math.max(...supplierData.map(s => s.id)) + 1,
      name: newSupplier.name,
      email: newSupplier.email,
      phone: newSupplier.phone,
      industry: newSupplier.industry,
      category: newSupplier.category,
      status: newSupplier.status,
      riskScore: Math.floor(Math.random() * 40) + 60, // Random risk score 60-100
      location: newSupplier.location,
      contracts: 0,
      lastActivity: new Date().toISOString(),
      performance: Math.floor(Math.random() * 30) + 70, // Random performance 70-100
      certifications: [],
      establishedYear: new Date().getFullYear() - Math.floor(Math.random() * 20),
      employees: Math.floor(Math.random() * 500) + 50,
      revenue: Math.floor(Math.random() * 50000000) + 1000000
    }

    setSupplierData(prev => [...prev, supplier])
    setShowAddModal(false)
    setNewSupplier({
      name: '',
      email: '',
      phone: '',
      industry: '',
      location: '',
      category: '',
      status: 'pending'
    })
    setAddFormErrors({})
    success('供应商已添加', `${supplier.name} 已成功添加`)
  }

  const handleInputChange = (field: string, value: string) => {
    setNewSupplier(prev => ({ ...prev, [field]: value }))
    if (addFormErrors[field]) {
      setAddFormErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleStartEdit = (supplierId: number, field: string, currentValue: string) => {
    setEditingField({ id: supplierId, field })
    setEditingValue(currentValue)
  }

  const handleSaveEdit = async (supplierId: number, field: string) => {
    if (!editingValue.trim()) {
      error('无效值', '请输入有效值')
      return
    }

    const supplier = supplierData.find(s => s.id === supplierId)
    const oldValue = supplier?.[field as keyof typeof supplier]
    
    setUpdatingSuppliers(prev => [...prev, supplierId])
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSupplierData(prev => prev.map(s => 
        s.id === supplierId 
          ? { ...s, [field]: editingValue }
          : s
      ))
      
      setEditingField(null)
      setEditingValue('')
      
      // Show success with change details
      const fieldLabel = field === 'status' ? '状态' : '类别'
      const options = field === 'status' ? statuses : categories
      const oldLabel = options.find(opt => opt.value === oldValue)?.label || oldValue
      const newLabel = options.find(opt => opt.value === editingValue)?.label || editingValue
      
      success('更新成功！', `${supplier?.name}: ${fieldLabel} 从「${oldLabel}」变更为「${newLabel}」`)
    } catch (err) {
      error('更新失败', '更新供应商时出错')
    } finally {
      setUpdatingSuppliers(prev => prev.filter(id => id !== supplierId))
    }
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditingValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent, supplierId: number, field: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(supplierId, field)
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedSuppliers.length === 0) {
      warning('未选择', '请先选择供应商')
      return
    }

    const selectedSupplierNames = supplierData
      .filter(s => selectedSuppliers.includes(s.id))
      .map(s => s.name)
    
    const newStatusLabel = statuses.find(s => s.value === newStatus)?.label || newStatus

    setUpdatingSuppliers(selectedSuppliers)
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      setSupplierData(prev => prev.map(supplier => 
        selectedSuppliers.includes(supplier.id)
          ? { ...supplier, status: newStatus }
          : supplier
      ))
      
      const count = selectedSuppliers.length
      setSelectedSuppliers([])
      success('批量状态更新完成！', `${count} 个供应商已更新为「${newStatusLabel}」: ${selectedSupplierNames.slice(0, 3).join(', ')}${selectedSupplierNames.length > 3 ? ' 等...' : ''}`)
    } catch (err) {
      error('更新失败', '更新供应商时出错')
    } finally {
      setUpdatingSuppliers([])
      setLoading(false)
    }
  }

  const handleBulkCategoryUpdate = async (newCategory: string) => {
    if (selectedSuppliers.length === 0) {
      warning('未选择', '请先选择供应商')
      return
    }

    const selectedSupplierNames = supplierData
      .filter(s => selectedSuppliers.includes(s.id))
      .map(s => s.name)
    
    const newCategoryLabel = categories.find(c => c.value === newCategory)?.label || newCategory

    setUpdatingSuppliers(selectedSuppliers)
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      setSupplierData(prev => prev.map(supplier => 
        selectedSuppliers.includes(supplier.id)
          ? { ...supplier, category: newCategory }
          : supplier
      ))
      
      const count = selectedSuppliers.length
      setSelectedSuppliers([])
      success('批量类别更新完成！', `${count} 个供应商已更新为「${newCategoryLabel}」: ${selectedSupplierNames.slice(0, 3).join(', ')}${selectedSupplierNames.length > 3 ? ' 等...' : ''}`)
    } catch (err) {
      error('更新失败', '更新供应商时出错')
    } finally {
      setUpdatingSuppliers([])
      setLoading(false)
    }
  }

  // Close more actions menu when clicking outside

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreActionsRef.current && !moreActionsRef.current.contains(event.target as Node)) {
        setShowMoreActionsMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">供应商目录</h2>
            <p className="text-gray-600 mt-1">使用高级筛选和分析来管理和追踪所有供应商</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              导入
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh} loading={loading}>
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              添加供应商
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">供应商总数</p>
                <p className="text-2xl font-bold text-gray-900">{supplierData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">活跃供应商</p>
                <p className="text-2xl font-bold text-gray-900">
                  {supplierData.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">高风险</p>
                <p className="text-2xl font-bold text-gray-900">
                  {supplierData.filter(s => s.riskScore < 50).length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均绩效</p>
                <p className="text-2xl font-bold text-gray-900">
                  {supplierData.length > 0 ? Math.round(supplierData.reduce((acc, s) => acc + s.performance, 0) / supplierData.length) : 0}%
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
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
                  placeholder="按名称、邮箱、行业或位置搜索供应商..."
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
                aria-label="按类别筛选"
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
                aria-label="按状态筛选"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
                aria-label="排序字段"
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
                    风险评分范围
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="最小"
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="最大"
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
                      placeholder="最小"
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="最大"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最近活动
                  </label>
                  <select className="input" aria-label="按最近活动筛选">
                    <option value="">所有时间</option>
                    <option value="7">最近 7 天</option>
                    <option value="30">最近 30 天</option>
                    <option value="90">最近 90 天</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    行业
                  </label>
                  <select className="input" aria-label="按行业筛选">
                    <option value="">所有行业</option>
                    <option value="manufacturing">制造业</option>
                    <option value="technology">技术</option>
                    <option value="automotive">汽车</option>
                    <option value="logistics">物流</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className={`card transition-all duration-300 ${selectedSuppliers.length > 0 ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  {filteredAndSortedSuppliers.length} 个供应商
                </span>
                {selectedSuppliers.length > 0 && (
                  <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-full animate-in slide-in-from-left-2 duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">
                      {selectedSuppliers.length} 已选择
                    </span>
                    <button
                      onClick={() => setSelectedSuppliers([])}
                      className="ml-1 p-0.5 hover:bg-primary/20 rounded-full transition-colors"
                      title="清除选择"
                    >
                      <XCircle className="w-3 h-3 text-primary" />
                    </button>
                  </div>
                )}
              </div>
              {selectedSuppliers.length > 0 && (
                <div className="flex items-center space-x-3 animate-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('导出')} className="text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      导出
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('邮件')} className="text-xs">
                      <Mail className="w-3 h-3 mr-1" />
                      邮件
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                    <span className="text-xs font-medium text-gray-600 mr-1">状态：</span>
                    <select
                      className="text-xs bg-transparent border-none focus:outline-none cursor-pointer"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleBulkStatusUpdate(e.target.value)
                          e.target.value = ''
                        }
                      }}
                      defaultValue=""
                      aria-label="批量更新状态"
                    >
                      <option value="">快速更新</option>
                      <option value="active">设为活跃</option>
                      <option value="inactive">设为非活跃</option>
                      <option value="pending">设为待处理</option>
                      <option value="suspended">设为已暂停</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                    <span className="text-xs font-medium text-gray-600 mr-1">类别：</span>
                    <select
                      className="text-xs bg-transparent border-none focus:outline-none cursor-pointer"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleBulkCategoryUpdate(e.target.value)
                          e.target.value = ''
                        }
                      }}
                      defaultValue=""
                      aria-label="批量更新类别"
                    >
                      <option value="">快速更新</option>
                      <option value="strategic">设为战略</option>
                      <option value="preferred">设为首选</option>
                      <option value="approved">设为已批准</option>
                      <option value="restricted">设为受限</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suppliers Display */}
        {viewMode === 'table' ? (
          <div className="card">
            {loading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                <div className="flex flex-col items-center space-y-3 bg-white p-6 rounded-xl shadow-xl border">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-primary/20 border-t-primary"></div>
                    <span className="text-sm font-medium text-gray-700">更新供应商中...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div className="overflow-x-auto relative">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">
                      <input 
                        type="checkbox" 
                        className="rounded" 
                        checked={selectedSuppliers.length === filteredAndSortedSuppliers.length && filteredAndSortedSuppliers.length > 0}
                        onChange={handleSelectAll}
                        aria-label="选择所有供应商"
                      />
                    </th>
                    <th className="table-header-cell">
                      <button 
                        onClick={() => handleSort('name')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>供应商</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">类别</th>
                    <th className="table-header-cell">状态</th>
                    <th className="table-header-cell">
                      <button 
                        onClick={() => handleSort('riskScore')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>风险评分</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">
                      <button 
                        onClick={() => handleSort('performance')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>绩效</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">合同</th>
                    <th className="table-header-cell">
                      <button 
                        onClick={() => handleSort('lastActivity')}
                        className="flex items-center space-x-1 hover:text-primary"
                      >
                        <span>最近活动</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="table-header-cell">操作</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredAndSortedSuppliers.map((supplier) => (
                    <tr key={`${supplier.id}-${supplier.status}-${supplier.category}`} className={`hover:bg-gray-50 transition-all duration-200 ${updatingSuppliers.includes(supplier.id) ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}>
                      <td className="table-cell">
                        <input 
                          type="checkbox" 
                          className="rounded" 
                          checked={selectedSuppliers.includes(supplier.id)}
                          onChange={() => handleSelectSupplier(supplier.id)}
                          aria-label={`选择供应商 ${supplier.name}`}

                        />
                      </td>
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
                        <InlineEditField
                          supplierId={supplier.id}
                          field="category"
                          value={supplier.category}
                          type="select"
                          options={categories.filter(c => c.value !== 'all')}
                          className={`badge ${getCategoryColor(supplier.category)}`}
                        />
                      </td>
                      <td className="table-cell">
                        <InlineEditField
                          supplierId={supplier.id}
                          field="status"
                          value={supplier.status}
                          type="select"
                          options={statuses.filter(s => s.value !== 'all')}
                          className={`badge ${getStatusColor(supplier.status)}`}
                        />
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center">
                          {updatingSuppliers.includes(supplier.id) ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-blue-600 font-medium">更新中...</span>
                            </div>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(supplier.riskScore)}`}>
                              {supplier.riskScore}
                            </span>
                          )}
                          {supplier.riskScore < 50 && (
                            <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getPerformanceColor(supplier.performance)}`}>
                            {supplier.performance}%
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                supplier.performance >= 90 ? 'bg-green-500' :
                                supplier.performance >= 80 ? 'bg-yellow-500' :
                                supplier.performance >= 70 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${supplier.performance}%` }}
                              aria-label={`绩效: ${supplier.performance}%`}
                            />
                          </div>
                        </div>
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
                          <button 
                            className="p-1 text-gray-400 hover:text-primary"
                            onClick={() => handleViewSupplier(supplier)}
                            title="查看供应商详情"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 text-gray-400 hover:text-primary"
                            onClick={() => handleEditSupplier(supplier)}
                            title="编辑供应商"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 text-gray-400 hover:text-red-500"
                            onClick={() => handleDeleteSupplier(supplier)}
                            title="删除供应商"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="relative" ref={moreActionsRef}>
                            <button 
                              className="p-1 text-gray-400 hover:text-gray-600"
                              onClick={(e) => handleMoreActions(supplier.id, e)}
                              title="更多操作"
                            >
                            <MoreVertical className="w-4 h-4" />
                            </button>
                            {showMoreActionsMenu === supplier.id && (
                              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <div className="py-1">
                                  <button 
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMoreAction('send-email', supplier)}
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    发送邮件
                                  </button>
                                  <button 
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMoreAction('copy-details', supplier)}
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    复制详情
                                  </button>
                                  <button 
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMoreAction('archive', supplier)}
                                  >
                                    <Archive className="w-4 h-4 mr-2" />
                                    归档
                                  </button>
                                  <button 
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    onClick={() => handleMoreAction('suspend', supplier)}
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    暂停
                          </button>
                                </div>
                              </div>
                            )}
                          </div>
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
                显示 <span className="font-medium">1</span> 到 <span className="font-medium">{filteredAndSortedSuppliers.length}</span>，共{' '}
                <span className="font-medium">{filteredAndSortedSuppliers.length}</span> 条结果
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
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                <div className="flex flex-col items-center space-y-3 bg-white p-6 rounded-xl shadow-xl border">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-primary/20 border-t-primary"></div>
                    <span className="text-sm font-medium text-gray-700">更新供应商中...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedSuppliers.map((supplier) => (
              <div key={`${supplier.id}-${supplier.status}-${supplier.category}`} className="card hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-primary font-semibold text-lg">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{supplier.name}</h3>
                      <p className="text-xs text-gray-500">{supplier.industry}</p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600" title="更多操作">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Mail className="w-3 h-3 mr-2" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone className="w-3 h-3 mr-2" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-2" />
                    {supplier.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <InlineEditField
                    supplierId={supplier.id}
                    field="category"
                    value={supplier.category}
                    type="select"
                    options={categories.filter(c => c.value !== 'all')}
                    className={`badge ${getCategoryColor(supplier.category)}`}
                  />
                  <InlineEditField
                    supplierId={supplier.id}
                    field="status"
                    value={supplier.status}
                    type="select"
                    options={statuses.filter(s => s.value !== 'all')}
                    className={`badge ${getStatusColor(supplier.status)}`}
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">风险评分</span>
                    <span className={`font-medium ${getRiskColor(supplier.riskScore)}`}>
                      {supplier.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">绩效</span>
                    <span className={`font-medium ${getPerformanceColor(supplier.performance)}`}>
                      {supplier.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">合同</span>
                    <span className="font-medium text-gray-900">{supplier.contracts}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleViewSupplier(supplier)}
                    className="flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    查看
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditSupplier(supplier)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    编辑
                  </Button>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* Supplier Details Modal */}
      <Modal
        isOpen={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        title="供应商详情"
        size="xl"
      >
        {selectedSupplier && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold text-2xl">
                  {selectedSupplier.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{selectedSupplier.name}</h3>
                <p className="text-gray-600">{selectedSupplier.industry}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`badge ${getCategoryColor(selectedSupplier.category)}`}>
                    {selectedSupplier.category}
                  </span>
                  <span className={`badge ${getStatusColor(selectedSupplier.status)}`}>
                    {selectedSupplier.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">联系信息</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedSupplier.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedSupplier.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">绩效指标</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">风险评分</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedSupplier.riskScore)}`}>
                      {selectedSupplier.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">绩效</span>
                    <span className={`text-sm font-medium ${getPerformanceColor(selectedSupplier.performance)}`}>
                      {selectedSupplier.performance}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">活跃合同</span>
                    <span className="text-sm font-medium text-gray-900">{selectedSupplier.contracts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">成立</span>
                    <span className="text-sm font-medium text-gray-900">{selectedSupplier.establishedYear}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">资质认证</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSupplier.certifications.map((cert, index) => (
                  <span key={index} className="badge badge-info">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                编辑供应商
              </Button>
              <Button variant="secondary" className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                查看合同
              </Button>
              <Button variant="outline" className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                绩效报告
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setNewSupplier({
            name: '',
            email: '',
            phone: '',
            industry: '',
            location: '',
            category: '',
            status: 'pending'
          })
          setAddFormErrors({})
        }}
        title="添加新供应商"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                公司名称 *
              </label>
              <input
                type="text"
                className={`input ${addFormErrors.name ? 'border-red-500' : ''}`}
                value={newSupplier.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="输入公司名称"
              />
              {addFormErrors.name && (
                <p className="text-sm text-red-600 mt-1">{addFormErrors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                行业 *
              </label>
              <select
                className={`input ${addFormErrors.industry ? 'border-red-500' : ''}`}
                value={newSupplier.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                aria-label="选择行业"
              >
                <option value="">选择行业</option>
                <option value="Manufacturing">制造业</option>
                <option value="Technology">技术</option>
                <option value="Automotive">汽车</option>
                <option value="Logistics">物流</option>
              </select>
              {addFormErrors.industry && (
                <p className="text-sm text-red-600 mt-1">{addFormErrors.industry}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱 *
              </label>
              <input
                type="email"
                className={`input ${addFormErrors.email ? 'border-red-500' : ''}`}
                value={newSupplier.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="输入邮箱地址"
              />
              {addFormErrors.email && (
                <p className="text-sm text-red-600 mt-1">{addFormErrors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                电话 *
              </label>
              <input
                type="tel"
                className={`input ${addFormErrors.phone ? 'border-red-500' : ''}`}
                value={newSupplier.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="输入电话号码"
              />
              {addFormErrors.phone && (
                <p className="text-sm text-red-600 mt-1">{addFormErrors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              位置 *
            </label>
            <input
              type="text"
              className={`input ${addFormErrors.location ? 'border-red-500' : ''}`}
              value={newSupplier.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="输入位置"
            />
            {addFormErrors.location && (
              <p className="text-sm text-red-600 mt-1">{addFormErrors.location}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类别 *
              </label>
              <select
                className={`input ${addFormErrors.category ? 'border-red-500' : ''}`}
                value={newSupplier.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                aria-label="选择类别"
              >
                <option value="">选择类别</option>
                <option value="strategic">战略</option>
                <option value="preferred">首选</option>
                <option value="approved">已批准</option>
                <option value="restricted">受限</option>
              </select>
              {addFormErrors.category && (
                <p className="text-sm text-red-600 mt-1">{addFormErrors.category}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                状态
              </label>
              <select
                className="input"
                value={newSupplier.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                aria-label="选择状态"
              >
                <option value="pending">待处理</option>
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleAddSupplier}
              className="flex-1"
            >
              添加供应商
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddModal(false)
                setNewSupplier({
                  name: '',
                  email: '',
                  phone: '',
                  industry: '',
                  location: '',
                  category: '',
                  status: 'pending'
                })
                setAddFormErrors({})
              }}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="删除供应商"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">确定要删除吗？</h3>
              <p className="text-sm text-gray-600">
                此操作无法撤销。这将永久删除 {selectedSupplier?.name}。
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              onClick={confirmDeleteSupplier}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              删除
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Supplier Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="编辑供应商"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                公司名称
              </label>
              <input
                type="text"
                className="input"
                defaultValue={selectedSupplier?.name}
                placeholder="输入公司名称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                行业
              </label>
              <select className="input" defaultValue={selectedSupplier?.industry} aria-label="选择行业">
                <option value="">选择行业</option>
                <option value="manufacturing">制造业</option>
                <option value="technology">技术</option>
                <option value="automotive">汽车</option>
                <option value="logistics">物流</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <input
                type="email"
                className="input"
                defaultValue={selectedSupplier?.email}
                placeholder="输入邮箱地址"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                电话
              </label>
              <input
                type="tel"
                className="input"
                defaultValue={selectedSupplier?.phone}
                placeholder="输入电话号码"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              位置
            </label>
            <input
              type="text"
              className="input"
              defaultValue={selectedSupplier?.location}
              placeholder="输入位置"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类别
              </label>
              <select className="input" defaultValue={selectedSupplier?.category} aria-label="选择类别">
                <option value="">选择类别</option>
                <option value="strategic">战略</option>
                <option value="preferred">首选</option>
                <option value="approved">已批准</option>
                <option value="restricted">受限</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                状态
              </label>
              <select className="input" defaultValue={selectedSupplier?.status} aria-label="选择状态">
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
                <option value="pending">待处理</option>
                <option value="suspended">已暂停</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={() => {
                setShowEditModal(false)
                success('供应商已更新', `${selectedSupplier?.name} 已成功更新`)
              }}
              className="flex-1"
            >
              更新供应商
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
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