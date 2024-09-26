import BestChoice from '../../components/home/BestChoice.jsx'
import NewsSection from '../../components/home/NewsSection.jsx'
import ProductDetail from '../../components/home/ProductDetail.jsx'
import BackHome from '../../components/ingredient/BackHome.jsx'
import CartShow from '../../components/ingredient/Cart.jsx'
import ButtonCart from '../../components/product/ButtonCart.jsx'
import { useState } from 'react'
const PageHome = () => {
  const [open, setOpen] = useState(false)
  const onSetOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className="flex justify-center items-center py-4 container">
        <span className="text-red-700 uppercase text-4xl font-bold">New</span>
      </div>
      <ProductDetail />
      <BestChoice />
      <NewsSection />
      <BackHome />
      <ButtonCart onSetOpen={onSetOpen} />
      <CartShow open={open} onSetOpen={onSetOpen} />
    </>
  )
}

export default PageHome
