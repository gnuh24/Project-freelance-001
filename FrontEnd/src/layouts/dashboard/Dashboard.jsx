import { HeaderDashboard } from '../../components/admin/Header'
import { SidebarDashboard } from '../../components/admin/Sidebar'

const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-700">
      <HeaderDashboard />
      <div>
        <SidebarDashboard />
      </div>
    </div>
  )
}
export default Dashboard
