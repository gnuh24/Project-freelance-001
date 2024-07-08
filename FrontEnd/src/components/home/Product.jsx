import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card
      className="max-w-sm h-5/6 w-5/6"
      imgSrc={product.avatar}
      imgAlt="Image 1"
    >
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

      <Link to={`/detailProduct?id=${product.id}`}>
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
