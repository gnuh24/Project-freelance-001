import { lazy } from 'react'

// Lazy load components
const Home = lazy(() => import('./layouts/Home'))
const SignIn = lazy(() => import('./layouts/SignIn'))
const SignUp = lazy(() => import('./layouts/SignUp'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const Routes = {
  home: { path: '/', element: <Home /> },
  signIn: { path: '/signIn', element: <SignIn /> },
  signUp: { path: '/signUp', element: <SignUp /> },
  errorPage: { path: '*', element: <ErrorPage /> },
}

export default Routes
