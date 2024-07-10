import { lazy } from 'react'
import BaseLayoutUser from './layouts/user/BaseLayoutUser.jsx'
import BaseLayoutDashBoard from './layouts/dashboard/BaseLayoutDashboard.jsx'
import { createBrowserRouter } from 'react-router-dom'

// Lazy load components
const Home = lazy(() => import('./layouts/user/Home'))
const SignIn = lazy(() => import('./layouts/auth/SignIn'))
const SignUp = lazy(() => import('./layouts/auth/SignUp'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const DetailProduct = lazy(() => import('./layouts/user/DetailProduct.jsx'))
const DashBoard = lazy(() => import('./layouts/dashboard/Dashboard.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayoutUser />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: '/detailProduct/:id', element: <DetailProduct /> },
      { path: '/signIn', element: <SignIn /> },
      { path: '/signUp', element: <SignUp /> },
    ],
  },
  {
    path: '/dashboard',
    element: <BaseLayoutDashBoard />,
    children: [{ element: <DashBoard />, index: true }],
  },
])

export default router
