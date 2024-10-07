import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesFormHomeThunk } from '../../reducers/productReducer/ShoeSlice'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const {
    data: dataShoe,
    status: statusShoe,
    error: errorShoe,
  } = useSelector((state) => state.shoeReducer)

  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  // Gọi API để lấy dữ liệu giày
  useEffect(() => {
    dispatch(getShoesFormHomeThunk({ pageNumber: 0, pageSize: 10 }))
  }, [dispatch])

  // Hàm chuyển đến sản phẩm tiếp theo
  const handleNextProduct = () => {
    if (
      dataShoe?.content &&
      currentProductIndex < dataShoe.content.length - 1
    ) {
      setCurrentProductIndex((prevIndex) => prevIndex + 1)
    }
  }

  // Hàm quay lại sản phẩm trước đó
  const handlePreviousProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex((prevIndex) => prevIndex - 1)
    }
  }

  // Lấy sản phẩm hiện tại
  const currentProduct = dataShoe?.content?.[currentProductIndex]

  return (
    <div className="bg-black text-white">
      <div className="text-center py-6">
        <span className="text-4xl text-gray-400 uppercase">BigBoy</span>
        <span className="text-4xl font-bold uppercase">Sneaker</span>
        <br />
        <span className="text-3xl text-gray-400">Sneaker</span>
      </div>

      <div className="flex justify-between items-center mt-20 px-10 container">
        {/* Left Section */}
        <div className="text-left max-w-md">
          <h2 className="text-4xl font-bold">
            {currentProduct?.shoeName || 'Loading...'}
          </h2>
          <h3 className="text-2xl text-gray-400">
            {currentProduct?.description || 'Loading...'}
          </h3>
          <p className="text-gray-300 my-4">
            Price: ${currentProduct?.price || 'Loading...'}
          </p>

          {/* Arrow Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousProduct}
              disabled={currentProductIndex === 0}
              className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextProduct}
              disabled={
                currentProductIndex >= (dataShoe?.content?.length || 0) - 1
              }
              className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        {/* Right Section - Image */}
        <div className="relative">
          <img
            src={currentProduct?.image || 'https://via.placeholder.com/400'}
            alt={currentProduct?.shoeName || 'Product Image'}
            className="w-96 h-auto"
          />
        </div>
      </div>

      {/* Price and Buy Button */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold">{currentProduct?.price}$</h2>
        <button className="mt-4 bg-white text-black py-2 px-10 rounded-full text-lg font-bold">
          Buy
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
