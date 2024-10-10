import BestChoice from '../../components/home/BestChoice.jsx'
import BrandDisplay from '../../components/home/BrandDisplay.jsx'
import NewsSection from '../../components/home/NewsSection.jsx'
import ProductDetail from '../../components/home/ProductDetail.jsx'
import BackHome from '../../components/ingredient/BackHome.jsx'
import CartShow from '../../components/ingredient/Cart.jsx'
import ButtonCart from '../../components/product/ButtonCart.jsx'
import { useState } from 'react'
import ButtonMessage from '../../components/product/ButtonMessage.jsx'
const PageHome = () => {
  return (
    <>
      <div className="flex justify-center items-center py-4 container">
        <span className="text-red-700 uppercase text-4xl font-bold">New</span>
      </div>
      <ProductDetail />
      <BestChoice />
      <NewsSection />
      <BrandDisplay />
    </>
  )
}

export default PageHome
