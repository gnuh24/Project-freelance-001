import Carousel from '../../components/product/Carousel.jsx'
import Products from '../../components/product/Products.jsx'
import BackHome from '../../components/ingredient/BackHome.jsx'
import CartShow from '../../components/ingredient/Cart.jsx'
import ButtonCart from '../../components/product/ButtonCart.jsx'
import { useState } from 'react'
const PageProduct = () => {
  const [open, setOpen] = useState(false)
  const onSetOpen = () => {
    setOpen(!open)
  }
  return (
    <>
      <Carousel />
      <Products />
      <BackHome />
      <ButtonCart onSetOpen={onSetOpen} />
      <CartShow open={open} onSetOpen={onSetOpen} />
    </>
  )
}

export default PageProduct
