// src/App.js
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import Loader from './components/loader/Loader.jsx'
import router from './Routes.jsx'

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
