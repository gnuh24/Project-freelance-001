import { Outlet } from 'react-router-dom'
import Header from '../../components/ingredient/Header'
import Navigation from '../../components/ingredient/Navigation'
import FooterComponent from '../../components/ingredient/Footer'

const BaseLayoutUser = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
      <FooterComponent />
    </>
  )
}
export default BaseLayoutUser
