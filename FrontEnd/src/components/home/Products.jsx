import { useDispatch, useSelector } from 'react-redux'
import FilterProduct from './FilterProduct'
import Product from './Product'
import { useEffect } from 'react'
import { getShoesApiThunk } from '../../reducers/productReducer/ShoeSlice'

import Loader from '../loader/Loader.jsx'
const Products = () => {
  const dispatch = useDispatch()
  const {
    data: dataShoeInHome,
    loading: loadingShoeInHome,
    error: errorShoeInHome,
  } = useSelector((state) => {
    return state.shoeReducer
  })

  useEffect(() => {
    dispatch(getShoesApiThunk({ pageSize: 8 }))
  }, [dispatch])

  if (loadingShoeInHome) return <Loader />
  if (errorShoeInHome) return <div>Error: {errorShoeInHome}</div>
  return (
    <>
      <div className="container mx-auto">
        <FilterProduct />
        {dataShoeInHome?.content && (
          <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {dataShoeInHome.content.map((properties) => (
              <Product key={properties.shoeId} product={properties} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Products
