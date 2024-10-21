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
          <h1 className="text-2xl md:text-4xl font-bold text-black">
            Best choice
          </h1>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {data?.content?.slice(0, 3).map((item) => (
          <Link
            key={item.shoeId}
            to={`/products/${item.shoeId}`}
            className="cursor-pointer relative rounded-none border border-black"
          >
            {/* Sale/New badge */}
            {item.priority ? (
              <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
                Sale
              </div>
            ) : item.sale > 0 ? (
              <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
                Sale {item.sale}%
              </div>
            ) : (
              <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-green-600 text-white p-1 rounded-md">
                New
              </div>
            )}

            {/* Product Image */}
            <div className="w-full h-64">
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.defaultImage || 'placeholder.jpg'}`}
                alt={item.defaultImage || 'Product Image'}
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h5 className="text-left text-xs md:text-sm font-semibold tracking-tight text-gray-900 mt-2">
                {item.shoeName}
              </h5>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[8px] md:text-xs font-bold text-gray-900">
                  Size: {item.top3Size.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs md:text-sm font-bold tracking-tight">
                  {item.lowestPrice.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BestChoice
