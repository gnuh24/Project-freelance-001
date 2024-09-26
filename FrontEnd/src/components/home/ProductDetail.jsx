const ProductDetail = () => {
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
          <h2 className="text-4xl font-bold">Air Jordan</h2>
          <h3 className="text-2xl text-gray-400">
            Air Jordan 1 Mid Light Smoke Grey
          </h3>
          <p className="text-gray-300 my-4">
            The popularity of Jordan 1s hasn’t changed since their release in
            1984. Sneakerheads in their teens and twenties also love to wear Air
            Jordan 1s, in their eyes the original AJ1s are already part of
            sneaker history.
          </p>

          <p className="text-gray-300">
            SKU: 554724-073 EU40.5-EU47
            <br />
            SKU: 554725-073 (GS) EU36-EU40
            <br />
            Release date: October 2020
          </p>

          {/* Color Selection */}
          {/* <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="themeToggle"
                className="toggle-checkbox hidden"
              />
              <label
                htmlFor="themeToggle"
                className="cursor-pointer flex items-center justify-between w-14 h-7 bg-gray-600 rounded-full p-1"
              >
                <span className="toggle-circle bg-white w-6 h-6 rounded-full"></span>
              </label>
              <span className="ml-3 text-xl">BLACK</span>
            </div>
          </div> */}
        </div>

        {/* Right Section - Image */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/400"
            alt="Air Jordan 1"
            className="w-96 h-auto"
          />
        </div>
      </div>

      {/* Price and Buy Button */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold">290$</h2>
        <button className="mt-4 bg-white text-black py-2 px-10 rounded-full text-lg font-bold">
          Buy
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
