import { Card } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItem } from '../../reducers/shopping/CartSlice'

const Product = ({ product }) => {
  return (
    <Card className="max-w-none">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:8080/ShoeImage/Image/${product.defaultImage}`}
          alt="imageShoe"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {product.numberOfShoeSize} sizes
        </span>
        {product.top3Size.map((size) => (
          <span
            key={size}
            className="text-sm font-medium text-gray-900 dark:text-white"
          >
            {size}
          </span>
        ))}{' '}
      </div>
      <Link to={`/detailProduct/${product.shoeId}`}>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.shoeName}
        </h5>
      </Link>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-extrabold tracking-tight">
          ${product.lowestPrice}
        </span>
      </div>
    </Card>
  )
}

export default Product
