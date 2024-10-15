import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice'
import { Pagination, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react'
import { getAllShoeSizesByUser } from '../../reducers/productReducer/ShoeSizeSlice'
import './style.css'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice'
import { FaChevronDown } from 'react-icons/fa'
import { LuLoader2 } from 'react-icons/lu'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice'

const ITEM_PER_PAGE = 10

const buildQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams()

  Object.entries({
    ...filters,
    pageNumber: page || '',
    pageSize: itemsPerPage || '',
  }).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        params.append(key, val)
      })
    } else if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const ProductList = ({ eventId, percentage }) => {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.products)
  const { data: dataSize, status: statusSize } = useSelector(
    (state) => state.shoeSizeReducer || [],
  )
  const { data: dataColors, status: statusColors } = useSelector(
    (state) => state.colorReducer || [],
  )
  const { data: dataBrand } = useSelector((state) => state.brandReducer || [])
  const { data: dataShoeType } = useSelector(
    (state) => state.shoeTypeReducer || [],
  )

  const [selectedColors, setSelectedColors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = data.totalPages || 0
  const [isColorOpen, setIsColorOpen] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const [filterValues, setFilterValues] = useState({
    size: '',
    search: '',
    specialSort: '',
    colorId: '',
    brandId: '',
    shoeTypeId: '',
  })

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('Debounced search value:', inputValue)
      setFilterValues((prevFilterValues) => ({
        ...prevFilterValues,
        search: inputValue,
      }))
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

  useEffect(() => {
    const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE)
    console.log(query)
    try {
      dispatch(getProductsInEvent(query))
    } catch (error) {
      console.log(error)
    }
    dispatch(getAllShoeSizesByUser())
    dispatch(getColorsNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
  }, [eventId, currentPage, dispatch, filterValues])

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  if (status === 'loading' || statusSize === 'loading') {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LuLoader2 className="animate-spin" />
      </div>
    )
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (!originalPrice || !discountPercentage) return originalPrice
    return originalPrice - originalPrice * (discountPercentage / 100)
  }

  if (!data || !dataSize) {
    return <div>No products found.</div>
  }

  const handleColorChange = (colorId) => {
    let updatedSelectedColors
    if (selectedColors.includes(colorId)) {
      updatedSelectedColors = selectedColors.filter((id) => id !== colorId)
    } else {
      updatedSelectedColors = [...selectedColors, colorId]
    }
    setSelectedColors(updatedSelectedColors)

    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      listShoeColorId: updatedSelectedColors,
    }))
  }

  return (
    <div className="container mx-auto mt-10 space-y-5">
      <div>
        <input
          className="border px-4 py-2 rounded-md focus:ring-0 focus-visible:ring-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div
        className={`flex items-center gap-10  max-md:pl-10 ${filterOpen && 'max-md:border max-md:p-3'}`}
      >
        <button
          className={`filterIcon ${filterOpen ? 'open' : ''}`}
          href="#"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {filterOpen && (
          <div
            className={`filterContainer flex md:flex-row flex-col items-start md:items-center gap-10 ${filterOpen ? 'show' : ''}`}
          >
            <select
              className="font-semibold px-4 py-2 border-2 border-black md:text-md text-sm"
              value={filterValues.size}
              onChange={(e) =>
                setFilterValues({ ...filterValues, size: e.target.value })
              }
            >
              {!filterValues.size && (
                <option className="font-semibold" value="">
                  Kích thước
                </option>
              )}
              {dataSize.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <select
              className="font-semibold px-4 py-2 border-2 border-black md:text-md text-sm"
              value={filterValues.brandId}
              onChange={(e) =>
                setFilterValues({ ...filterValues, brandId: e.target.value })
              }
            >
              {!filterValues.brandId && (
                <option className="font-semibold" value="">
                  Thương hiệu
                </option>
              )}
              {dataBrand.map((brand) => (
                <option key={brand?.brandId} value={brand?.brandId}>
                  {brand?.brandName}
                </option>
              ))}
            </select>
            <select
              className="font-semibold px-4 py-2 border-2 border-black md:text-md text-sm"
              value={filterValues.brandId}
              onChange={(e) =>
                setFilterValues({ ...filterValues, brandId: e.target.value })
              }
            >
              {!filterValues.shoeTypeId && (
                <option className="font-semibold" value="">
                  Loại sản phẩm
                </option>
              )}
              {dataShoeType.map((type) => (
                <option key={type?.shoeTypeId} value={type?.shoeTypeId}>
                  {type?.shoeTypeName}
                </option>
              ))}
            </select>
            <div className="px-4 py-2 font-semibold border-2 border-black md:text-md text-sm">
              <div
                className="flex items-center justify-center gap-3"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                <label className=" md:text-md text-sm" htmlFor="color-select">
                  Chọn màu
                </label>
                <FaChevronDown size={13} className="text-zinc-500 font-bold" />
              </div>

              <div className="relative z-50">
                {isColorOpen && (
                  <div className="colorFilter w-full absolute flex flex-col items-start justify-start gap-2 p-2 top-0 left-0 bg-white z-50 border border-zinc-500 rounded-md h-[10rem] overflow-y-auto">
                    {dataColors.map((color) => (
                      <label
                        key={color.id}
                        className="text-sm flex items-center"
                      >
                        <input
                          type="checkbox"
                          value={color.id}
                          checked={selectedColors.includes(color.id)}
                          onChange={() => handleColorChange(color.id)}
                        />
                        <span className="ml-2">{color.colorName}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <select
              className="font-semibold px-4 py-2 border-2 border-black md:text-md text-sm"
              value={filterValues.specialSort}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  specialSort: e.target.value,
                })
              }
            >
              {!filterValues.sort && (
                <option className="font-semibold" value="">
                  Sắp xếp theo
                </option>
              )}
              <option value="price,desc">Giá giảm dần </option>
              <option value="price,asc">Giá tăng dần </option>
            </select>

            <button
              className="px-4 py-2 border-2 md:text-md text-sm border-black hover:bg-green-700 bg-green-600 transition text-white"
              onClick={() => setFilterValues({ size: '', sort: '' })}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-4">
        {data.content && data.content.length > 0 ? (
          data.content.map((product) => {
            const originalPrice = parseInt(product?.lowestPrice)
            const discount = parseInt(percentage) || 0

            const discountedPrice = calculateDiscountedPrice(
              originalPrice,
              discount,
            )

            return (
              <div
                key={product.shoeId}
                className="relative card-container z-10"
              >
                <Card className="max-w-none rounded-none border border-black pb-5 space-y-5">
                  <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md transform">
                    Sale {percentage}%
                  </div>
                  <div className="w-full h-64">
                    <img
                      className="w-full h-full object-cover"
                      src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product?.defaultImage}`}
                      alt="imageShoe"
                    />
                  </div>
                  <div className="flex items-center justify-between px-2 md:px-5">
                    <span className=" text-[8px] md:text-xs font-bold text-gray-900 dark:text-white">
                      {product?.numberOfShoeSize} sizes
                    </span>
                    {product?.top3Size?.map((size) => (
                      <span
                        key={size}
                        className="text-[8px] md:text-xs font-medium bg-zinc-300 flex items-center justify-center text-gray-900 dark:text-white w-5 h-5 md:w-6 md:h-6 p-1 rounded-full"
                      >
                        {size}
                      </span>
                    ))}{' '}
                  </div>
                  <Link to={`/detailProduct/${product?.shoeId}`}>
                    <h5 className="text-xs md:text-sm mt-2 md:mt-5 md:px-5 font-semibold tracking-tight text-gray-900 dark:text-white card-title">
                      {product?.shoeName}
                    </h5>
                  </Link>
                  <div className="flex items-center justify-between card-price">
                    <p className="text-xs md:text-sm px-2 md:px-5 font-bold tracking-tight">
                      <span className="line-through">{originalPrice}</span>
                      <span className="ml-2 text-rose-500">
                        {discountedPrice.toFixed(0)}
                      </span>
                    </p>
                  </div>
                </Card>
              </div>
            )
          })
        ) : (
          <div>Không có sản phẩm nào.</div>
        )}
      </div>

      <div className="flex items-center justify-center mb-5 mt-10 pb-10">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  )
}

export default ProductList
