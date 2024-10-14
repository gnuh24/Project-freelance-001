import { Outlet } from 'react-router-dom'
import Header from '../../components/ingredient/Header'
import Navigation from '../../components/ingredient/Navigation'
import FooterComponent from '../../components/ingredient/Footer'
import BackHome from '../../components/ingredient/BackHome'
import ButtonCart from '../../components/product/ButtonCart'
import ButtonMessage from '../../components/product/ButtonMessage'
import CartShow from '../../components/ingredient/Cart'
import { useState } from 'react'

const BaseLayoutUser = () => {
  const [open, setOpen] = useState(false)
  const onSetOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <Header />
      <div className="pt-32 sm:pt-32 md:pt-20 lg:pt-20">
        <Navigation />
        <div className="p-3 fixed z-50 bottom-43/100 right-4  text-white rounded-full shadow-lg ">
          <div className="flex flex-col gap-3">
            <BackHome />
            <ButtonCart onSetOpen={onSetOpen} />
            <ButtonMessage />
          </div>
        </div>
        <CartShow open={open} onSetOpen={onSetOpen} />
        <Outlet />
        <FooterComponent />
      </div>
    </>
  )
}
export default BaseLayoutUser
