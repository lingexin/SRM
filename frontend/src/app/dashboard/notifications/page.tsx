import Layout from '@/components/layout/Layout'
import NotificationsClient from './ui/NotificationsClient'

export default function NotificationsPage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">通知</h1>
          <p className="text-gray-600 mt-2">拖拽以分类您的收件箱。数据为示意性但真实。</p>
        </div>
        <NotificationsClient />
      </div>
    </Layout>
  )
}


