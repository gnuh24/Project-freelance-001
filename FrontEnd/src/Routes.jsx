import { lazy } from 'react'

// Lazy load components
const Home = lazy(() => import('./layouts/Home'))
const SignIn = lazy(() => import('./layouts/SignIn'))
const SignUp = lazy(() => import('./layouts/SignUp'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const DetailProduct = lazy(() => import('./layouts/DetailProduct'))
const Routes = {
  home: { path: '/', element: <Home /> },
  signIn: { path: '/signIn', element: <SignIn /> },
  signUp: { path: '/signUp', element: <SignUp /> },
  errorPage: { path: '*', element: <ErrorPage /> },
  detailProduct: { path: '/detailProduct', element: <DetailProduct /> },
  // mainDashboard: { path: '/admin', element: <MainDashboard /> },
  // NFTMarketplace: {
  //   path: '/admin/NFTMarketplace',
  //   element: <NFTMarketplace />,
  // },
  // dataTables: { path: '/admin/dataTables', element: <DataTables /> },
  // proFile: { path: '/admin/profile', element: <Profile /> },
}

export default Routes
