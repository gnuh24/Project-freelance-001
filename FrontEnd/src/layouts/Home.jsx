import { Carousel } from 'flowbite-react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Products from '../components/Products'

const Home = () => {
  return (
    <>
      <Header></Header>
      <Carousel></Carousel>
      <Products></Products>
      <Footer></Footer>
    </>
  )
}

export default Home
