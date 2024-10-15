import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  const { shoeId, originalPrice, discountedPrice, discount, ...otherProps } =
    product

  return (
    <Card
      href={`/detailProduct/${product?.shoeId}`}
      className="cursor-pointer relative max-w-none rounded-none border border-black pb-5 space-y-5"
    >
      {product.sale && (
        <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md transform">
          Sale {discount}%
        </div>
      )}
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
      <button>
        <h5 className="text-left text-xs md:text-sm mt-2 md:mt-5 md:px-5 font-semibold tracking-tight text-gray-900 dark:text-white">
          {product?.shoeName}
        </h5>
      </button>
      {product.sale ? (
        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm px-2 md:px-5 font-bold tracking-tight">
            <span className="line-through">
              {originalPrice.toLocaleString('vi-VN')} VNĐ
            </span>
            <span className="ml-2 text-rose-500">
              {discountedPrice.toLocaleString('vi-VN')}đ
            </span>
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm px-2 md:px-5 font-bold tracking-tight">
            <span>{originalPrice.toLocaleString('vi-VN')}đ</span>
          </p>
        </div>
      )}
    </Card>
  )
}

export default Product
