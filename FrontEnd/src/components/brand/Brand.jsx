import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'

const Brand = () => {
  const dispatch = useDispatch()
  const {
    data: dataBrand,
    status: statusBrand,
    error: errorBrand,
  } = useSelector((state) => state.brandReducer)
  useEffect(() => {
    dispatch(getBrandsNoPageApiThunk())
  }, [dispatch])
  return (
    <>
      <div className="container grid grid-cols-3 gap-4">
        {dataBrand?.map((brand) => (
          <div
            key={brand.brandId}
            className="bg-gray-200 flex justify-center items-center"
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
