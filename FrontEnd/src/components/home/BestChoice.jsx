import { useDispatch, useSelector } from 'react-redux'
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const BestChoice = () => {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.products)
  useEffect(() => {
    dispatch(getProductsInEvent())
  }, [dispatch])

  return (
    <div className="bg-white text-black">
      {/* Best Choice Section */}
      {data?.content?.length === 0 && (
        <div className="text-center py-6">
          <h1 className="text-2xl md:text-4xl font-bold text-red-600">
            Best choice
          </h1>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {data?.content?.slice(0, 3).map((item) => (
          <Link
            key={item.shoeId}
            to={`/detailProduct/${item.shoeId}`}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              {item.priority ? (
                <span className="bg-red-600 text-white py-1 px-3 rounded-full text-sm font-bold">
                  Sale
                </span>
              ) : item.sale > 0 ? (
                <span className="bg-red-600 text-white py-1 px-3 rounded-full text-sm font-bold">
                  Sale {item.sale}%
                </span>
              ) : (
                <span className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-bold">
                  New
                </span>
              )}
            </div>
            <img
              src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.defaultImage || 'placeholder.jpg'}`}
              alt={item.defaultImage || 'Product Image'}
              className="w-full h-48 object-contain mt-4"
            />
            <div className="mt-4 text-left">
              <h3 className="text-lg md:text-2xl font-bold text-black">
                {item.shoeName}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Size: {item.top3Size.join(', ')}
              </p>
              <p className="text-lg md:text-xl font-bold mt-2 text-black">
                {item.lowestPrice.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BestChoice
