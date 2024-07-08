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
    dispatch(getShoesApiThunk())
  }, [dispatch])

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>
  console.log(data)
  return (
    <>
      <div className="container mx-auto">
        <FilterProduct />
        {data?.content && (
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
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
