import Header from '../components/ingredient/Header.jsx'
import Footer from '../components/ingredient/Footer'
import Carousel from '../components/home/Carousel'
import Products from '../components/home/Products'
import Navigation from '../components/home/Navigation'
const Home = () => {
  return (
    <>
      <Header></Header>
      <Navigation></Navigation>
      <Carousel></Carousel>
      <Products></Products>
      <Footer></Footer>
    </>
  )
}

export default Home
