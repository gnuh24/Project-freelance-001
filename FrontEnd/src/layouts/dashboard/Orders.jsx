import { useState } from 'react'
import OrderDetail from '../../components/admin/orders/OrderDetail.jsx'
import TableOrder from '../../components/admin/orders/TableOrder.jsx'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [openModalOrderDetail, setOpenModalOrderDetail] = useState(false)
  const [id, setId] = useState(null)
  const [params, setParams] = useState({
    pageSize: 5,
    pageNumber: 1,
    status: null,
    sort: null,
    search: null,
    type: null,
    from: null,
    to: null,
  })

  const handleChangeSearchParams = (e) => {
    const { name, value } = e.target
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }))
  }

  const handleResetParams = () => {
    setParams({
      pageSize: 5,
      pageNumber: 1,
      status: null,
      sort: null,
      search: null,
      type: null,
      from: null,
      to: null,
    })
  }

  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Quản lý đơn hàng
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <div>
                  <label htmlFor="products-search">Tìm kiếm mã đơn hàng:</label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={params.search || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-1 sm:ml-2">
                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                  <div>
                    <label htmlFor="order-type">Trạng thái:</label>
                    <select
                      id="status"
                      name="status"
                      value={params.status || ''}
                      onChange={handleChangeSearchParams}
                      className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>Tất cả</option>
                      <option value="ChoDuyet">Chờ duyệt</option>
                      <option value="DaDuyet">Đã duyệt</option>
                      <option value="DangGiao">Đang giao</option>
                      <option value="GiaoThanhCong">Giao thành công</option>
                      <option value="Huy">Hủy</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="order-type">Loại:</label>
                    <select
                      id="type"
                      name="type"
                      value={params.type || ''}
                      onChange={handleChangeSearchParams}
                      className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>Tất cả</option>
                      <option value="Web">Web</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Zalo">Zalo</option>
                      <option value="Order">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label>Từ ngày:</label>
                    <input
                      type="date"
                      name="from"
                      value={params.from || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label>Đến ngày:</label>
                    <input
                      type="date"
                      name="to"
                      value={params.to || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleResetParams}
                      className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Xóa tìm kiếm
                    </button>
                  </div>
                  {/* <Link */}
                  {/*   to="/dashboard/orders/create" */}
                  {/*   className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" */}
                  {/* > */}
                  {/*   Tạo sản phẩm */}
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableOrder
          setOpenModalOrderDetail={setOpenModalOrderDetail}
          setId={setId}
          params={params}
          setParams={setParams}
        />
        <OrderDetail
          openModalOrderDetail={openModalOrderDetail}
          setOpenModalOrderDetail={setOpenModalOrderDetail}
          id={id}
        />
      </div>
    </>
  )
}
export default Orders
