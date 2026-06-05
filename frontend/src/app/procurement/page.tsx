import Layout from '@/components/layout/Layout'
import ProcurementOverviewEnhanced from '@/components/procurement/ProcurementOverviewEnhanced'

export default function ProcurementPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Procurement</h1>
          <p className="text-gray-600 mt-2">Manage RFPs, RFQs, purchase orders, contracts, and payments.</p>
        </div>
        
        <ProcurementOverviewEnhanced />
      </div>
    </Layout>
  )
}
