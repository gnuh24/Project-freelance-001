import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiOutlineShoppingCart,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiOutlineClipboardList,
  HiOutlineChat,
  HiOutlineTruck,
} from 'react-icons/hi'
import { MdDashboard, MdEvent, MdOutlineMonetizationOn } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCircleUser, FaRegNewspaper } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'
import { IoBagRemoveOutline } from "react-icons/io5";
export function SidebarDashboard() {
  return (
    <Sidebar
      className="fixed h-[100vh] bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar with logo branding example"
    >
      <Sidebar.Items className="rounded-none">
        <Sidebar.ItemGroup className="rounded-none">
        <Sidebar.Collapse
            icon={HiChartPie}
            label="Thống kê"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return (
                <IconComponent
                  aria-hidden
                  className={twMerge(
                    theme.label.icon.open[open ? 'on' : 'off'],
                  )}
                />
              )
            }}
          >
          <Sidebar.Item as={Link} to="/dashboard" icon={IoBagRemoveOutline}>
            Thống kê đơn hàng
          </Sidebar.Item>
          <Sidebar.Item as={Link} to="/dashboard/income" icon={MdOutlineMonetizationOn}>
            Thống kê thu nhập
          </Sidebar.Item>

          </Sidebar.Collapse>

          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm

              return (
                <IconComponent
                  aria-hidden
                  className={twMerge(
                    theme.label.icon.open[open ? 'on' : 'off'],
                  )}
                />
              )
            }}
          >
            <Sidebar.Item as={Link} to="/dashboard/products" href="#">
              Products
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/brands">
              Brand
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/type">
              Type
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/dashboard/color">
              Color
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item as={Link} to="/dashboard/users" icon={FaCircleUser}>
            Users
          </Sidebar.Item>

          <Sidebar.Item
            as={Link}
            to="/dashboard/orders"
            icon={HiOutlineShoppingCart}
          >
            Orders
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/dashboard/vouchers"
            icon={CiCreditCard1}
          >
            Vouchers
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/dashboard/events"
            icon={MdEvent}
          >
            Events
          </Sidebar.Item>

          <Sidebar.Item
            as={Link}
            to="/dashboard/feedback"
            icon={HiOutlineChat} // Replace with your preferred icon
          >
            Feedback
          </Sidebar.Item>

          <Sidebar.Item
            as={Link}
            to="/dashboard/inventory"
            icon={HiOutlineClipboardList} // Choose one of the suitable icons
          >
            Nhập kho
          </Sidebar.Item>

          <Sidebar.Item
            as={Link}
            to="/dashboard/shippingfee"
            icon={HiOutlineTruck} // Choose one of the suitable icons
          >
            Phí ship
          </Sidebar.Item>
          <Sidebar.Item
            as={Link}
            to="/dashboard/news"
            icon={FaRegNewspaper} // Choose one of the suitable icons
          >
            News
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
