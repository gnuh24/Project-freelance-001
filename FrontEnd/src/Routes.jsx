import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(() => import('./layouts/user/Home'))
const SignIn = lazy(() => import('./layouts/auth/SignIn'))
const SignUp = lazy(() => import('./layouts/auth/SignUp'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const DetailProduct = lazy(() => import('./layouts/user/DetailProduct.jsx'))
const DashBoard = lazy(() => import('./layouts/dashboard/Dashboard.jsx'))
const Checkout = lazy(() => import('./layouts/user/CheckOut.jsx'))
const ProductsDashBoard = lazy(() => import('./layouts/dashboard/Products.jsx'))
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
      { path: '/signIn', element: <SignIn /> },
      { path: '/signUp', element: <SignUp /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
  {
    path: '/dashboard',
    element: <BaseLayoutDashBoard />,
    children: [
      { element: <DashBoard />, index: true }, // Change path to '/' for dashboard
      { path: '/dashboard/products', element: <ProductsDashBoard /> },
      { path: '/dashboard/profile', element: <ProfileDashBoard /> },
      { path: '/dashboard/orders', element: <OrderDashboard /> },
      { path: '/dashboard/brands', element: <BrandDashboard /> },
      { path: '/dashboard/type', element: <TypeDashboard /> },
      { path: '/dashboard/users', element: <UsersDashBoard /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
