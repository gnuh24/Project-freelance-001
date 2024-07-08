// src/App.js
import { Suspense } from 'react'
import ConfigRoutes from './Routes.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from './components/loader/Loader.jsx'

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          {Object.values(ConfigRoutes).map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            )
          })}{' '}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
