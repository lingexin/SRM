'use client'

import { useState } from 'react'
import { Plus, Search, Filter, FileText, Package, Handshake, DollarSign, Clock, CheckCircle, AlertTriangle, Eye, Edit } from 'lucide-react'
import { formatCurrency, formatDate, formatRelativeTime } from '@/lib/utils'
import { procurementStats, recentRFPs, pendingApprovals, upcomingDeadlines } from '@/data/mockData'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/hooks/useToast'

export default function ProcurementOverviewEnhanced() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedRFP, setSelectedRFP] = useState<any>(null)
  const [selectedApproval, setSelectedApproval] = useState<any>(null)
  const [showRFPModal, setShowRFPModal] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showCreateRFPModal, setShowCreateRFPModal] = useState(false)
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { success, error, warning, info, ToastContainer } = useToast()

  const handleApprove = async (approval: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      success('审批成功', `${approval.title} 已批准`)
      setShowApprovalModal(false)
    } catch (err) {
      error('审批失败', '处理审批时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (approval: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      warning('审批已拒绝', `${approval.title} 已被拒绝`)
      setShowApprovalModal(false)
    } catch (err) {
      error('拒绝失败', '处理拒绝时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRFP = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('RFP已创建', '新RFP已成功创建')
      setShowCreateRFPModal(false)
    } catch (err) {
      error('创建失败', '创建RFP时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRFQ = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      success('RFQ已创建', '新RFQ已成功创建')
      setShowCreateRFQModal(false)
    } catch (err) {
      error('创建失败', '创建RFQ时出错')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      published: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
      closed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    }
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rfp':
        return FileText
      case 'contract':
        return Handshake
      case 'payment':
        return DollarSign
      default:
        return Clock
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {procurementStats.map((stat) => (
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
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => setShowCreateRFPModal(true)}
            >
              <FileText className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">创建RFP</p>
                <p className="text-xs text-gray-500">启动新采购</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => setShowCreateRFQModal(true)}
            >
              <Package className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">生成RFQ</p>
                <p className="text-xs text-gray-500">请求报价</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('合同管理', '合同管理功能即将推出')}
            >
              <Handshake className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">新建合同</p>
                <p className="text-xs text-gray-500">起草协议</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 justify-start"
              onClick={() => info('付款处理', '付款处理功能即将推出')}
            >
              <DollarSign className="w-6 h-6 text-primary mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">处理付款</p>
                <p className="text-xs text-gray-500">处理发票</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent RFPs */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">近期RFP</h3>
              <Button variant="ghost" size="sm">
                查看全部
              </Button>
            </div>
            <div className="space-y-4">
              {recentRFPs.map((rfp) => (
                <div key={rfp.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{rfp.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {rfp.category} • {formatCurrency(rfp.budget)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        创建人：{rfp.createdBy} • {rfp.suppliers} 个供应商
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(rfp.status)}`}>
                      {rfp.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      截止日期：{formatDate(rfp.deadline)}
                    </span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedRFP(rfp)
                          setShowRFPModal(true)
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        查看
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">待审批</h3>
              <Button variant="ghost" size="sm">
                查看全部
              </Button>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900">{approval.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatCurrency(approval.amount)} • {approval.type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        提交人：{approval.submittedBy} • 截止 {formatDate(approval.dueDate)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(approval.priority)}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedApproval(approval)
                        setShowApprovalModal(true)
                      }}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      审核
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleApprove(approval)}
                    >
                      批准
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">即将截止</h3>
            <Button variant="ghost" size="sm">
              查看日历
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => {
              const IconComponent = getTypeIcon(deadline.type)
              return (
                <div key={deadline.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    deadline.priority === 'high' ? 'bg-red-100 text-red-600' :
                    deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{deadline.title}</h4>
                    <p className="text-sm text-gray-500">{deadline.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatDate(deadline.deadline)}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
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
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedRFP.title}</h3>
                <p className="text-gray-600 mt-1">{selectedRFP.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRFP.status)}`}>
                {selectedRFP.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">基本信息</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">类别：</span>
                    <span className="text-sm font-medium">{selectedRFP.category}</span>
                  </div>
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
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">需求</h4>
                <ul className="space-y-2">
                  {selectedRFP.requirements.map((req: string, index: number) => (
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
                编辑RFP
              </Button>
              <Button variant="secondary" className="flex-1">
                查看响应
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="审批审核"
        size="lg"
      >
        {selectedApproval && (
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{selectedApproval.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                提交人：{selectedApproval.submittedBy} • 截止 {formatDate(selectedApproval.dueDate)}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                金额：{formatCurrency(selectedApproval.amount)}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-2">详情</h5>
              <p className="text-sm text-gray-600">
                此{selectedApproval.type.replace('_', ' ')}需要您的审核和批准。请在做出决定前仔细查看所有详情。
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => handleApprove(selectedApproval)}
                loading={loading}
                className="flex-1"
              >
                批准
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleReject(selectedApproval)}
                loading={loading}
                className="flex-1"
              >
                拒绝
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create RFP Modal */}
      <Modal
        isOpen={showCreateRFPModal}
        onClose={() => setShowCreateRFPModal(false)}
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
                <option value="technology">技术</option>
                <option value="manufacturing">制造业</option>
                <option value="services">服务</option>
                <option value="office-supplies">办公用品</option>
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

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleCreateRFP}
              loading={loading}
              className="flex-1"
            >
              创建RFP
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreateRFPModal(false)}
              className="flex-1"
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create RFQ Modal */}
      <Modal
        isOpen={showCreateRFQModal}
        onClose={() => setShowCreateRFQModal(false)}
        title="创建新RFQ"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RFQ标题
            </label>
            <input
              type="text"
              className="input"
              placeholder="输入RFQ标题"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              描述
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="描述所需的物品或服务"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                有效期至
              </label>
              <input 
                type="date" 
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              所需物品
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="input flex-1" 
                  placeholder="物品描述"
                />
                <input
                  type="number"
                  className="input w-24"
                  placeholder="数量"
                />
                <input
                  type="number"
                  className="input w-32"
                  placeholder="单价"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                添加物品
              </Button>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleCreateRFQ}
              loading={loading}
              className="flex-1"
            >
              创建RFQ
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowCreateRFQModal(false)}
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









