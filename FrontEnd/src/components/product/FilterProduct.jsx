import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice'
import { getSizeMenuThunk } from '../../reducers/productReducer/SizeSlice'
const FilterProduct = ({ onFilterSearchPagination }) => {
  const dispatch = useDispatch()
  const {
    data: dataColor,
    status: statusColor,
    error: errorColor,
  } = useSelector((state) => state.colorReducer)

  const {
    data: dataBrand,
    status: statusBrand,
    error: errorBrand,
  } = useSelector((state) => state.brandReducer)

  const {
    data: dataShoeType,
    status: statusShoeType,
    error: errorShoeType,
  } = useSelector((state) => state.shoeTypeReducer)

  const {
    data: dataSize,
    status: statusSize,
    error: errorSize,
  } = useSelector((state) => state.sizeSlice)

  useEffect(() => {
    dispatch(getColorsNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getSizeMenuThunk())
  }, [dispatch])

  const [openFilter, setOpenFilter] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openFilterPrice, setOpenFilterPrice] = useState(false)

  // State for filters
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedShoeType, setSelectedShoeType] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 1000000000])
  const [isResettingFilters, setIsResettingFilters] = useState(false)

  // Handle color selection
  const handleColorChange = (colorId) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(colorId)
        ? prevSelectedColors.filter((id) => id !== colorId)
        : [...prevSelectedColors, colorId],
    )
  }

  // Handle brand selection
  const handleBrandChange = (event) => {
    setSelectedBrand(+event.target.value)
  }

  const handleSizeChange = (event) => {
    setSelectedSize(+event.target.value)
  }

  // Handle shoe type selection
  const handleShoeTypeChange = (event) => {
    setSelectedShoeType(+event.target.value)
  }

  // Handle price range change
  const handlePriceChange = (event) => {
    const value = Number(event.target.value)
    setPriceRange([value, priceRange[1]])
  }

  const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value)
    setPriceRange([priceRange[0], value])
  }

  // Handle filter submission
  const handleFilterSubmit = useCallback(() => {
    const filterData = {
      listShoeColorId: selectedColors,
      brandId: selectedBrand,
      shoeTypeId: selectedShoeType,
      size: selectedSize,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }

    // Pass the filter data to the parent component
    onFilterSearchPagination(filterData)
  }, [
    selectedColors,
    selectedBrand,
    selectedShoeType,
    selectedSize,
    priceRange,
    onFilterSearchPagination,
  ])

  const handleResetFilters = () => {
    setSelectedColors([])
    setSelectedBrand(null)
    setSelectedShoeType(null)
    setSelectedSize(null)
    setPriceRange([100, 1500])

    setIsResettingFilters(true)
  }

  useEffect(() => {
    if (isResettingFilters) {
      handleFilterSubmit()
      setIsResettingFilters(false)
    }
  }, [
    selectedColors,
    selectedBrand,
    selectedShoeType,
    priceRange,
    selectedSize,
    isResettingFilters,
    handleFilterSubmit,
  ])

  return (
    <>
      <div className="sloganShop grid grid-cols-3 items-center p-10">
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-6 h-6 text-blue-500"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-center">Hỗ trợ đổi size trong vòng 7 ngày</h1>
        </div>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-6 h-6 text-blue-500"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      </div>
      <div className="content">
        <span>Sản phảm - giày nam</span>
        <div className="typeProduct">
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="filter p-4">
        <div className="flex justify-between items-center">
          <div>
            <button
              type="button"
              onClick={() => {
                setOpenFilter(!openFilter)
              }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {openFilter && (
            <div className="flex items-center">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleFilterSubmit()
                }}
              >
                <div className="flex items-center justify-center relative">
                  <button
                    id="dropdown"
                    className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mx-4"
                    type="button"
                    onClick={() => {
                      setOpenDropdown(!openDropdown)
                    }}
                  >
                    Chọn màu
                    <svg
                      className="w-4 h-4 ml-2"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  <div
                    id="dropdown"
                    className={`${openDropdown ? 'block' : 'hidden'} absolute top-12 left-0 z-10 w-44 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="dropdownDefault"
                    >
                      {dataColor?.map((color) => (
                        <li className="flex items-center" key={color.id}>
                          <input
                            id={color.id}
                            type="checkbox"
                            value={color.id}
                            {...(selectedColors.includes(color.id) && {
                              checked: true,
                            })}
                            onChange={() => handleColorChange(color.id)}
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={color.id}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                          >
                            {color.colorName}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <select
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedBrand ?? ''}
                    onChange={handleBrandChange}
                  >
                    <option value="" disabled selected>
                      Chọn thương hiệu
                    </option>
                    {dataBrand?.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>
                        {brand.brandName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ml-4">
                  <select
                    id="size"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedSize ?? ''}
                    onChange={handleSizeChange}
                  >
                    <option value="" disabled selected>
                      Chọn size
                    </option>
                    {dataSize?.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ml-4">
                  <select
                    id="shoeType"
                    value={selectedShoeType ?? ''}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleShoeTypeChange}
                  >
                    <option value="" disabled selected>
                      Chọn loại giày
                    </option>
                    {dataShoeType?.map((shoeType) => (
                      <option
                        key={shoeType.shoeTypeId}
                        value={shoeType.shoeTypeId}
                      >
                        {shoeType.shoeTypeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mx-4"
                    onClick={() => {
                      setOpenFilterPrice(!openFilterPrice)
                    }}
                  >
                    Giá
                  </button>
                  <div
                    className={`${
                      openFilterPrice ? 'block' : 'hidden'
                    } absolute bg-white rounded-lg shadow dark:bg-gray-700 p-3 mt-3 w-1/2 left-3/4-screen`}
                  >
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="min-price"
                        className="text-sm text-gray-500 dark:text-gray-400"
                      >
                        Giá thấp nhất:
                      </label>
                      <input
                        id="min-price"
                        type="number"
                        min="100"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        className="w-1/4 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 mx-4 p-2"
                        onChange={handlePriceChange}
                      />
                      <label
                        htmlFor="max-price"
                        className="text-sm text-gray-500 dark:text-gray-400"
                      >
                        Giá cao nhất:
                      </label>
                      <input
                        id="max-price"
                        type="number"
                        min={priceRange[0]}
                        max="1500"
                        value={priceRange[1]}
                        className="w-1/4 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700 mx-4 p-2"
                        onChange={handleMaxPriceChange}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Min ({priceRange[0].toLocaleString('vi-VN')} VNĐ)
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Max ({priceRange[1].toLocaleString('vi-VN')} VNĐ)
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mr-4"
                    type="button"
                    onClick={handleResetFilters}
                  >
                    Xóa bộ lọc
                  </button>
                </div>

                <div>
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    type="submit"
                  >
                    Lọc
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default FilterProduct
