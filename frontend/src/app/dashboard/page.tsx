import Layout from '@/components/layout/Layout'
import DashboardOverviewEnhanced from '@/components/dashboard/DashboardOverviewEnhanced'

export default function DashboardPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
          <p className="text-gray-600 mt-2">欢迎回来！以下是今日供应商动态。</p>
        </div>
        
        <DashboardOverviewEnhanced />
      </div>
    </Layout>
  )
}
