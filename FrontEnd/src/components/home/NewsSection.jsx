const NewsSection = () => {
  return (
    <div className="bg-white text-black">
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-red-600">NEWs</h1>
      </div>

      {/* News Cards */}
      <div className="flex justify-center space-x-10 px-6">
        {/* News 1 */}
        <div className="relative bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <img
            src="https://via.placeholder.com/250"
            alt="News"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
            <div className="text-white">
              <h3 className="text-xl font-bold">
                Mẹo khử mùi hôi giày mà không phải giặt
              </h3>
              <p className="text-sm mt-1">
                Dưới đây là những mẹo khử mùi hôi giày hiệu quả mà không phải
                giặt thường xuyên.
              </p>
            </div>
          </div>
        </div>

        {/* News 2 */}
        <div className="relative bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <img
            src="https://via.placeholder.com/250"
            alt="News"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
            <div className="text-white">
              <h3 className="text-xl font-bold">
                Thương hiệu giày nổi tiếng ra mắt mẫu mới
              </h3>
              <p className="text-sm mt-1">
                Các thương hiệu lớn như Nike, Adidas vừa ra mắt các mẫu giày mới
                cho mùa hè.
              </p>
            </div>
          </div>
        </div>

        {/* News 3 */}
        <div className="relative bg-gray-100 p-4 rounded-lg shadow-md w-80">
          <img
            src="https://via.placeholder.com/250"
            alt="News"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
            <div className="text-white">
              <h3 className="text-xl font-bold">
                Giảm giá lớn dịp cuối năm cho các dòng giày
              </h3>
              <p className="text-sm mt-1">
                Các thương hiệu giày lớn đang giảm giá mạnh vào cuối năm nay,
                không nên bỏ lỡ!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewsSection
