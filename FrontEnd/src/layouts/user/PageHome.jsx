import BestChoice from '../../components/home/BestChoice.jsx'
import BrandDisplay from '../../components/home/BrandDisplay.jsx'
import NewsSection from '../../components/home/NewsSection.jsx'
import ProductDetail from '../../components/home/ProductDetail.jsx'
import { ModalProductProminent } from '../../components/home/ModalProductProminent.jsx'
const PageHome = () => {
  return (
    <>
      <div className="flex justify-center items-center py-4 container">
        <span className="text-red-700 uppercase text-4xl font-bold">New</span>
      </div>
      <ModalProductProminent />
      <ProductDetail />
      <BestChoice />
      <NewsSection />
      <BrandDisplay />
    </>
  )
}

export default PageHome
