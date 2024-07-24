import Carousel from '../../components/home/Carousel'
import Products from '../../components/home/Products'
import BackHome from '../../components/ingredient/BackHome.jsx'
import CartShow from '../../components/ingredient/Cart.jsx'
import ButtonCart from '../../components/home/Cart.jsx'
import { useState } from 'react'
const Home = () => {
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

export default Home
