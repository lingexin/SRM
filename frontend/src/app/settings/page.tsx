import Layout from '@/components/layout/Layout'
import SettingsOverview from '@/components/settings/SettingsOverview'

export default function SettingsPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings & Admin</h1>
          <p className="text-gray-600 mt-2">Manage users, permissions, integrations, and system configuration.</p>
        </div>
        
        <SettingsOverview />
      </div>
    </Layout>
  )
}









