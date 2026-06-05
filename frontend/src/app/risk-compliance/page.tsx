import Layout from '@/components/layout/Layout'
import RiskComplianceOverviewEnhanced from '@/components/risk-compliance/RiskComplianceOverviewEnhanced'

export default function RiskCompliancePage() {
  return (
    <Layout>
      <div className="p-6">
        <RiskComplianceOverviewEnhanced />
      </div>
    </Layout>
  )
}
