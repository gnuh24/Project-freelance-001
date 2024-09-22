import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AddNew from './components/admin/news/AddNew.jsx'
import EditNew from './components/admin/news/EditNews.jsx'
import ViewArticle from './components/admin/news/ViewArticle.jsx'
import IncomeStatistics from './layouts/dashboard/IncomeSatistics.jsx'
import PageEvent from './layouts/user/PageEvent.jsx'

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
const NewDashboard = lazy(() => import('./layouts/dashboard/News.jsx'))

const FeedbackDashBoard = lazy(
  () => import('./layouts/dashboard/Feedbacks.jsx'),
)

const VoucherDashboard = lazy(() => import('./layouts/dashboard/Voucher.jsx'))
const EventDashboard = lazy(() => import('./layouts/dashboard/Event.jsx'))

const InventoryDashBoard = lazy(
  () => import('./layouts/dashboard/Inventories.jsx'),
)
const ShippingFeeDashBoard = lazy(
  () => import('./layouts/dashboard/ShippingFees.jsx'),
)

const BaseLayoutUser = lazy(() => import('./layouts/user/BaseLayoutUser.jsx'))
const BaseLayoutDashBoard = lazy(
  () => import('./layouts/dashboard/BaseLayoutDashboard.jsx'),
)
const Profile = lazy(() => import('./layouts/user/Profile.jsx'))
const OrderDashboard = lazy(() => import('./layouts/dashboard/Orders.jsx'))
const BrandDashboard = lazy(() => import('./layouts/dashboard/Brand.jsx'))
const TypeDashboard = lazy(() => import('./layouts/dashboard/Type.jsx'))
const UsersDashBoard = lazy(() => import('./layouts/dashboard/Users.jsx'))
const ListOrderByUser = lazy(() => import('./layouts/user/ListOrderByUser.jsx'))
const ColorDashboard = lazy(() => import('./layouts/dashboard/Color.jsx'))
const PageBrand = lazy(() => import('./layouts/user/PageBrand.jsx'))
const PageContactUs = lazy(() => import('./layouts/user/PageContactUs.jsx'))
const PageNews = lazy(() => import('./layouts/user/PageNews.jsx'))
const PageDetailNew = lazy(() => import('./layouts/user/PageDetailNew.jsx'))
const PageFeedBack = lazy(() => import('./layouts/user/PageFeedBack.jsx'))
const PageForgetPassword = lazy(
  () => import('./layouts/auth/PageForgetPassword.jsx'),
)
const PageCreateOrder = lazy(
  () => import('./layouts/dashboard/PageCreateOrder.jsx'),
)

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
      { path: '/orderSummary/:id', element: <OrderSummary /> },
      { path: '/pageCart', element: <PageCart /> },
      { path: '/profile', element: <Profile /> },
      { path: '/listOrderByUser', element: <ListOrderByUser /> },
      { path: '/pageBrand', element: <PageBrand /> },
      { path: '/pageContactUs', element: <PageContactUs /> },
      { path: '/pageNews', element: <PageNews /> },
      { path: '/pageDetailNew/:id', element: <PageDetailNew /> },
      { path: '/pageFeedBack/:id', element: <PageFeedBack /> },
      { path: '/events', element: <PageEvent /> },
      { path: '/forgetPassword', element: <PageForgetPassword /> },
    ],
  },
  { path: '/admin', element: <SignInForAdmin /> },
  {
    path: '/dashboard',
    element: <BaseLayoutDashBoard />,
    children: [
      { element: <DashBoard />, index: true },
      { path: '/dashboard/products', element: <ProductsDashBoard /> },
      { path: '/dashboard/orders', element: <OrderDashboard /> },
      { path: '/dashboard/brands', element: <BrandDashboard /> },
      { path: '/dashboard/type', element: <TypeDashboard /> },
      { path: '/dashboard/users', element: <UsersDashBoard /> },
      { path: '/dashboard/feedback', element: <FeedbackDashBoard /> },
      { path: '/dashboard/vouchers', element: <VoucherDashboard /> },
      { path: '/dashboard/events', element: <EventDashboard /> },
      { path: '/dashboard/inventory', element: <InventoryDashBoard /> },
      { path: '/dashboard/shippingfee', element: <ShippingFeeDashBoard /> },
      { path: '/dashboard/color', element: <ColorDashboard /> },
      { path: '/dashboard/news', element: <NewDashboard /> },
      { path: '/dashboard/news/add', element: <AddNew /> },
      { path: '/dashboard/news/edit', element: <EditNew /> },
      { path: '/dashboard/news/view', element: <ViewArticle /> },
      { path: '/dashboard/income', element: <IncomeStatistics /> },
      { path: '/dashboard/orders/create', element: <PageCreateOrder /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
