import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsApiThunk } from '../../reducers/productReducer/BrandSlice'
import { setFilter } from '../../reducers/productReducer/ShoeSlice'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: dataBrand } = useSelector((state) => state.brandReducer)
  useEffect(() => {
    dispatch(getBrandsApiThunk({ pageSize: 8, pageNumber: 1 }))
  }, [dispatch])
  const handleClickBrand = (brandId) => {
    navigate('/pageProduct')
    dispatch(setFilter(brandId))
  }
  console.log(dataBrand)
  return (
    <>
      <div className="container grid grid-cols-4 gap-8">
        {dataBrand?.content?.map((brand, index) => (
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
