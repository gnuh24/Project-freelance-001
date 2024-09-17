import { useDispatch, useSelector } from 'react-redux'
import FilterProduct from './FilterProduct'
import Product from './Product'
import { useEffect, useState } from 'react'
import { getShoesApiThunk } from '../../reducers/productReducer/ShoeSlice'

import Loader from '../loader/Loader.jsx'
import PagingProduct from './PagingProduct.jsx'
import { useRef } from 'react'
const Products = () => {
  const dispatch = useDispatch()
  const productSectionRef = useRef(null)
  const {
    data: dataShoeInHome,
    loading: loadingShoeInHome,
    error: errorShoeInHome,
    paramSearch,
  } = useSelector((state) => {
    return state.shoeReducer
  })

  const initialFilterState = {
    pageSize: 8,
    pageNumber: 1,
    sort: null,
    minPrice: null,
    maxPrice: null,
    search: null,
    brandId: null,
    shoeTypeId: null,
    listShoeColorId: [],
  }

  const [filterSearchPagination, setFilterSearchPagination] =
    useState(initialFilterState)

  const handleFilterSearchPagination = (updatedFilters) => {
    setFilterSearchPagination((prev) => ({
      ...prev,
      ...updatedFilters,
    }))
  }

  useEffect(() => {
    setFilterSearchPagination((prev) => ({
      ...prev,
      search: paramSearch,
    }))
    if (paramSearch !== '' && productSectionRef.current) {
      productSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [paramSearch])

  useEffect(() => {
    dispatch(getShoesApiThunk(filterSearchPagination))
  }, [dispatch, filterSearchPagination])

  if (loadingShoeInHome) return <Loader />
  if (errorShoeInHome) return <div>Error: {errorShoeInHome}</div>
  return (
    <>
      <div className="container mx-auto">
        <FilterProduct
          onFilterSearchPagination={handleFilterSearchPagination}
        />
        <div ref={productSectionRef}>
          {dataShoeInHome?.content && (
            <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {dataShoeInHome.content.map((properties) => (
                <Product key={properties.shoeId} product={properties} />
              ))}
            </div>
          )}
        </div>
        <PagingProduct
          totalPages={dataShoeInHome?.totalPages}
          pageNumber={dataShoeInHome?.pageable?.pageNumber + 1}
          onFilterSearchPagination={handleFilterSearchPagination}
        />
      </div>
    </>
  )
}

export default Products
