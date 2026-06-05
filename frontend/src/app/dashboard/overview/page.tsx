import Layout from '@/components/layout/Layout'
import DashboardOverviewEnhanced from '@/components/dashboard/DashboardOverviewEnhanced'

export const metadata = {
  title: 'SRM 仪表盘 • 概览',
  description: '供应商绩效、风险、支出和待处理事项的执行摘要。'
}

export default function DashboardOverviewPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">概览</h1>
          <p className="text-gray-600 mt-2">供应商、支出、风险和沟通的高级摘要。</p>
        </div>

        <DashboardOverviewEnhanced />
      </div>
    </Layout>
  )
}




