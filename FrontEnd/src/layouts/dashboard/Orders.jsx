import { useState } from 'react'
import OrderDetail from '../../components/admin/orders/OrderDetail.jsx'
import TableOrder from '../../components/admin/orders/TableOrder.jsx'

const Orders = () => {
  const [openModalOrderDetail, setOpenModalOrderDetail] = useState(false)
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
                <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="products-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="email"
                      id="products-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search for products"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-1 sm:ml-2">
                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                  <div>
                    <label
                      htmlFor="order-type"
                      className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select order type
                    </label>
                    <select
                      id="order-type"
                      className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>All orders</option>
                      <option value="pre-order">Pre-order</option>
                      <option value="transit">In transit</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <span className="inline-block text-gray-500 dark:text-gray-400">
                    {' '}
                    from{' '}
                  </span>

                  <div>
                    <label
                      htmlFor="duration"
                      className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select duration
                    </label>
                    <select
                      id="duration"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>this week</option>
                      <option value="this month">this month</option>
                      <option value="last 3 months">the last 3 months</option>
                      <option value="lats 6 months">the last 6 months</option>
                      <option value="this year">this year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableOrder setOpenModalOrderDetail={setOpenModalOrderDetail} />
        <OrderDetail
          openModalOrderDetail={openModalOrderDetail}
          setOpenModalOrderDetail={setOpenModalOrderDetail}
        />
      </div>
    </>
  )
}
export default Orders
