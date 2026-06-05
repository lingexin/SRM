import Layout from '@/components/layout/Layout'
import ApprovalsClient from './ui/ApprovalsClient'

export default function ApprovalsCenterPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">审批中心</h1>
          <p className="text-gray-600 mt-2">拖拽卡片进行审批或拒绝。此为演示示例数据。</p>
        </div>
        <ApprovalsClient />
      </div>
    </Layout>
  )
}


