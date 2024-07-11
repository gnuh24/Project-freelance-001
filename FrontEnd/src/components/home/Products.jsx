import { useDispatch, useSelector } from 'react-redux'
import FilterProduct from './FilterProduct'
import Product from './Product'
import { useEffect } from 'react'
import { getShoesApiThunk } from '../../reducers/productReducer/ShoeSlice'

import Loader from '../loader/Loader.jsx'
const Products = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => {
    return state.shoeReducer
  })

  useEffect(() => {
    dispatch(getShoesApiThunk({ pageSize: 10 }))
  }, [dispatch])

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>
  return (
    <>
      <div className="container mx-auto">
        <FilterProduct />
        {data?.content && (
          <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {data.content.map((properties) => (
              <Product key={properties.shoeId} product={properties} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Products
