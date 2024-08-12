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
    HiOutlineChat
} from 'react-icons/hi'
import { FaCircleUser } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'

export function SidebarDashboard() {
    return (
        <Sidebar
            className="fixed h-[100vh] bg-gray-50 dark:bg-gray-800"
            aria-label="Sidebar with logo branding example"
        >
            <Sidebar.Items className="rounded-none">
                <Sidebar.ItemGroup className="rounded-none">
                  
                    <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie}>
                        Dashboard
                    </Sidebar.Item>

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
                        <Sidebar.Item href="#">Color</Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Item as={Link} to="/dashboard/profile" icon={HiInbox}>
                        Profile
                    </Sidebar.Item>

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

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
