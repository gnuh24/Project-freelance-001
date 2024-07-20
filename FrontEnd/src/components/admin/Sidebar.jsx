import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
} from 'react-icons/hi'

export function SidebarDashboard() {
  return (
    <Sidebar
      className="fixed h-[100vh] bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar with logo branding example"
    >
      <Sidebar.Items className="rounded-none">
        <Sidebar.ItemGroup className="rounded-none">
          <Link to="/dashboard">
            <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
          </Link>
          <Link to="/dashboard/profile">
            <Sidebar.Item icon={HiInbox}>Profile</Sidebar.Item>
          </Link>
          <Link to="/dashboard/products">
            <Sidebar.Item icon={HiShoppingBag}>Products</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
