// src/App.js
import { Suspense } from 'react'
import ConfigRoutes from './Routes.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {Object.values(ConfigRoutes).map((route, index) => {
            console.log(route.path)
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
