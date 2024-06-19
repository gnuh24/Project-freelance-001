import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// Lazy load components
const Home = lazy(() => import('./layouts/Home.jsx'))

const Routes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default Routes
