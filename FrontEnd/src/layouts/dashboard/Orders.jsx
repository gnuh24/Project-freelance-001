import { useState } from 'react'
import OrderDetail from '../../components/admin/orders/OrderDetail.jsx'
import TableOrder from '../../components/admin/orders/TableOrder.jsx'

const Orders = () => {
  const [openModalOrderDetail, setOpenModalOrderDetail] = useState(false)
  const [id, setId] = useState(null)
  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Orders
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <div>
                  <label htmlFor="products-search">Tìm kiếm mã đơn hàng:</label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="email"
                      id="products-search"
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
                      id="order-type"
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
                    <label>Từ ngày:</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>Đến ngày:</label>
                    <input type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableOrder
          setOpenModalOrderDetail={setOpenModalOrderDetail}
          setId={setId}
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
