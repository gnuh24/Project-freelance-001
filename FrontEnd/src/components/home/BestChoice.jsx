import { useDispatch } from 'react-redux'

const BestChoice = () => {
  const dispatch = useDispatch()
  return (
    <div className="bg-white text-black">
      {/* Best Choice Section */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-red-600">Best choice</h1>
      </div>

      {/* Product Cards */}
      <div className="flex justify-center space-x-10 px-6">
        {/* Product 1 */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <div className="flex justify-between items-start">
            <span className="bg-red-600 text-white py-1 px-3 rounded-full text-sm font-bold">
              Sale
            </span>
          </div>
          <img
            src="https://via.placeholder.com/250"
            alt="Jordan Sneaker"
            className="w-full h-48 object-contain mt-4"
          />
          <div className="mt-4 text-left">
            <h3 className="text-2xl font-bold text-black">Jordan</h3>
            <p className="text-gray-600">Air Jordan 4 Retro Premium</p>
            <p className="text-xl font-bold mt-2 text-black">200$</p>
          </div>
        </div>

        {/* Product 2 */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <div className="flex justify-between items-start">
            <span className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-bold">
              New
            </span>
          </div>
          <img
            src="https://via.placeholder.com/250"
            alt="Jordan Sneaker"
            className="w-full h-48 object-contain mt-4"
          />
          <div className="mt-4 text-left">
            <h3 className="text-2xl font-bold text-black">Jordan</h3>
            <p className="text-gray-600">Air Jordan 4 Retro Premium</p>
            <p className="text-xl font-bold mt-2 text-black">200$</p>
          </div>
        </div>

        {/* Product 3 */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <img
            src="https://via.placeholder.com/250"
            alt="Jordan Sneaker"
            className="w-full h-48 object-contain mt-4"
          />
          <div className="mt-4 text-left">
            <h3 className="text-2xl font-bold text-black">Jordan</h3>
            <p className="text-gray-600">Air Jordan 4 Retro Premium</p>
            <p className="text-xl font-bold mt-2 text-black">200$</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestChoice
