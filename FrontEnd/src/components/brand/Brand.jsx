import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'
import { setFilter } from '../../reducers/productReducer/ShoeSlice'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: dataBrand } = useSelector((state) => state.brandReducer)
  useEffect(() => {
    dispatch(getBrandsNoPageApiThunk())
  }, [dispatch])
  const handleClickBrand = (brandId) => {
    navigate('/')
    dispatch(setFilter(brandId))
  }
  return (
    <>
      <div className="container grid grid-cols-4 gap-8">
        {dataBrand?.map((brand) => (
          <div
            key={brand.brandId}
            onClick={() => handleClickBrand(brand.brandId)}
            className="cursor-pointer  flex justify-center items-center"
          >
            <img
              src={`http://localhost:8080/Brand/Image/${brand.logo}`}
              alt={brand.brandName}
              className="object-contain h-full w-full"
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default Brand
