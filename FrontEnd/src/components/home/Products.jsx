import FilterProduct from './FilterProduct'
import Product from './Product'

const Products = () => {
  const mockJsonProduct = {
    shopName: 'Shoe Haven',
    location: '123 Shoe St, Footwear City',
    categories: [
      {
        categoryName: "Men's Shoes",
        products: [
          {
            id: 1,
            name: 'Classic Leather Loafers',
            sizes: [40, 41, 42, 43, 44],
            price: 79.99,
            image: [
              '../../public/image/images.jpg',
              '../../public/image/images.jpg',
              '../../public/image/images.jpg',
              '../../public/image/images.jpg',
              '../../public/image/images.jpg',
            ],
            inStock: true,
          },
          {
            id: 2,
            name: 'Sport Running Shoes',
            sizes: [39, 40, 41, 42, 43, 44, 45],
            price: 89.99,
            image: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ],
            inStock: false,
          },
        ],
      },
      {
        categoryName: "Women's Shoes",
        products: [
          {
            id: 3,
            name: 'Elegant Heels',
            sizes: [36, 37, 38, 39, 40],
            price: 69.99,
            image: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ],
            inStock: true,
          },
          {
            id: 4,
            name: 'Comfortable Flats',
            sizes: [35, 36, 37, 38, 39, 40],
            price: 49.99,
            image: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ],
            inStock: true,
          },
        ],
      },
      {
        categoryName: "Children's Shoes",
        products: [
          {
            id: 5,
            name: 'Colorful Sneakers',
            sizes: [28, 29, 30, 31, 32, 33, 34],
            price: 39.99,
            image: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ],
            inStock: true,
          },
          {
            id: 6,
            name: 'Cute Sandals',
            sizes: [26, 27, 28, 29, 30],
            price: 29.99,
            image: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ],
            inStock: false,
          },
        ],
      },
    ],
  }

  return (
    <>
      <div className="container mx-auto">
        <FilterProduct />
        <div className="grid grid-cols-4 grid-rows-2 gap-2">
          {mockJsonProduct.categories.map((category) =>
            category.products.map((product) => (
              <Product key={product.id} product={product} />
            )),
          )}
        </div>
      </div>
    </>
  )
}

export default Products
