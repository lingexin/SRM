import Layout from '@/components/layout/Layout'
import PerformanceOverviewEnhanced from '@/components/performance/PerformanceOverviewEnhanced'

export default function PerformancePage() {
  return (
    <Layout>
      <div className="p-6">
        <PerformanceOverviewEnhanced />
      </div>
    </Layout>
  )
}
