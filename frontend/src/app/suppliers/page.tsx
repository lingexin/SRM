import Layout from '@/components/layout/Layout'
import SupplierDirectoryEnhanced from '@/components/suppliers/SupplierDirectoryEnhanced'

export default function SuppliersPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-gray-600 mt-2">Manage your supplier relationships, onboarding, and performance.</p>
        </div>
        
        <SupplierDirectoryEnhanced />
      </div>
    </Layout>
  )
}
