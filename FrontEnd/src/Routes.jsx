import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(() => import('./layouts/user/Home'))
const SignInForUser = lazy(() => import('./layouts/auth/SignInForUser.jsx'))
const SignUpForUser = lazy(() => import('./layouts/auth/SignUpForUser.jsx'))
const SignInForAdmin = lazy(() => import('./layouts/auth/SignInForAdmin'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const DetailProduct = lazy(() => import('./layouts/user/DetailProduct.jsx'))
const DashBoard = lazy(() => import('./layouts/dashboard/Dashboard.jsx'))
const Checkout = lazy(() => import('./layouts/user/CheckOut.jsx'))
const OrderSummary = lazy(() => import('./layouts/user/OrderSummaryLayout.jsx'))
const PageCart = lazy(() => import('./layouts/user/PageCartLayout.jsx'))
const ProductsDashBoard = lazy(() => import('./layouts/dashboard/Products.jsx'))
const FeedbackDashBoard = lazy(() => import('./layouts/dashboard/Feedbacks.jsx'))

const VoucherDashboard = lazy(() => import('./layouts/dashboard/Voucher.jsx'))

const InventoryDashBoard = lazy(() => import('./layouts/dashboard/Inventories.jsx'))

const BaseLayoutUser = lazy(() => import('./layouts/user/BaseLayoutUser.jsx'))
const BaseLayoutDashBoard = lazy(
  () => import('./layouts/dashboard/BaseLayoutDashboard.jsx'),
)
const ProfileDashBoard = lazy(() => import('./layouts/dashboard/Profile.jsx'))
const OrderDashboard = lazy(() => import('./layouts/dashboard/Orders.jsx'))
const BrandDashboard = lazy(() => import('./layouts/dashboard/Brand.jsx'))
const TypeDashboard = lazy(() => import('./layouts/dashboard/Type.jsx'))
const UsersDashBoard = lazy(() => import('./layouts/dashboard/Users.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayoutUser />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: '/detailProduct/:id', element: <DetailProduct /> },
      { path: '/signIn', element: <SignInForUser /> },
      { path: '/signUp', element: <SignUpForUser /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/orderSummary', element: <OrderSummary /> },
      { path: 'pageCart', element: <PageCart /> },
    ],
  },
  { path: '/admin', element: <SignInForAdmin /> },
  {
    path: '/dashboard',
    element: <BaseLayoutDashBoard />,
    children: [
      { element: <DashBoard />, index: true },
      { path: '/dashboard/products', element: <ProductsDashBoard /> },
      { path: '/dashboard/profile', element: <ProfileDashBoard /> },
      { path: '/dashboard/orders', element: <OrderDashboard /> },
      { path: '/dashboard/brands', element: <BrandDashboard /> },
      { path: '/dashboard/type', element: <TypeDashboard /> },
      { path: '/dashboard/users', element: <UsersDashBoard /> },
      { path: '/dashboard/feedback', element: <FeedbackDashBoard /> },
      { path: '/dashboard/vouchers', element: <VoucherDashboard /> },

    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
