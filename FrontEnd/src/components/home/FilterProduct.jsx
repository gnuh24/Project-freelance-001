const FilterProduct = () => {
  return (
    <>
      <div className="sloganShop grid grid-cols-3 items-center p-10">
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-6 h-6 text-blue-500"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-center">Hỗ trợ đổi size trong vòng 7 ngày</h1>
        </div>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-6 h-6 text-blue-500"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </div>
      </div>
      <div className="content">
        <span>Sản phảm - giày nam</span>
        <div className="typeProduct">
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="filter"></div>
    </>
  )
}
export default FilterProduct
