import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className="max-w-none">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src="../../../public/image/logo/imageShoe.jpg"
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
          Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
        </h5>
      </Link>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-extrabold tracking-tight">
          ${product.lowestPrice}
        </span>
      </div>

      <div className="flex items-center mx-auto gap-x-2">
        {/* {product.image.map((item, index) => ( */}
        {/*   <img */}
        {/*     className="w-10 h-10" */}
        {/*     key={index} */}
        {/*     alt={`Image ${index + 1}`} */}
        {/*     src={item} */}
        {/*   /> */}
        {/* ))} */}
      </div>
    </Card>
  )
}

export default Product
