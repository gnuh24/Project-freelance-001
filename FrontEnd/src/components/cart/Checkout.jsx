import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataCartThunk } from '../../reducers/shopping/CartSlice'
import { getAccountAndUserInformationByIdApiThunk } from '../../reducers/auth/AccountSlice'
import { getNewestShippingFeesApiThunk } from '../../reducers/shopping/ShippingFeeSlice'
const Checkout = () => {
  const dispatch = useDispatch()
  const {
    data: dataCartItem,
    loading: loadingCartItem,
    error: errorCartItem,
  } = useSelector((state) => state.cartReducer)
  const {
    data: dataAccount,
    accountDetail,
    status: statusAccount,
    error: errorAccount,
  } = useSelector((state) => state.accountReducer)
  const {
    data: shippingFee,
    status: statusShippingFee,
    error: errorShippingFee,
  } = useSelector((state) => state.shippingFees)
  const ACCOUNT_ID = localStorage.getItem('id')

  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedShippingFee, setSelectedShippingFee] = useState(null)

  useEffect(() => {
    dispatch(getDataCartThunk(ACCOUNT_ID))
    dispatch(getAccountAndUserInformationByIdApiThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  useEffect(() => {
    dispatch(getNewestShippingFeesApiThunk())
  }, [dispatch])

  const handleShippingChange = () => {
    setSelectedShippingFee((prev) =>
      prev === shippingFee.id ? '' : shippingFee.id,
    )
  }

  const convertDateFormat = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const convertDateFormatFormData = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('-')
    return `${year}/${month}/${day}`
  }
  console.log(selectedShippingFee)
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-blue-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="w-32 flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Giỏ hàng
              </span>
            </li>

            <li className="flex shrink-0 items-center text-blue-700 dark:text-blue-500">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Thanh toán
              </span>
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Thông tin giao hàng
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="your_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      id="your_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Bonnie Green"
                      value={accountDetail?.fullname}
                      disabled
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="your_email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="your_email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="name@flowbite.com"
                      value={accountDetail?.email}
                      disabled
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-country-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Địa chỉ*
                      </label>
                    </div>
                    <input
                      placeholder="Hồ Chí Minh"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      disabled
                      value={accountDetail?.address}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone-input-3"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại*
                    </label>
                    <div className="flex items-center relative">
                      <button
                        id="dropdown-phone-button-3"
                        className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        +1
                      </button>
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="phone-input"
                          className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder="123-456-7890"
                          disabled
                          value={accountDetail?.phoneNumber}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Giới tính
                    </label>
                    <select
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={accountDetail?.gender}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="vat_number"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="vat_number"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={convertDateFormat(accountDetail?.birthday) || ''}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Phương thức vận chuyển
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="dhl"
                          aria-describedby="dhl-text"
                          type="checkbox"
                          name="delivery-method"
                          value={shippingFee?.id}
                          className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          checked
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="dhl"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          {shippingFee?.fee} VNĐ
                        </label>
                        <p
                          id="dhl-text"
                          className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                        >
                          Phí vận chuyển
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="voucher"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter a gift card, voucher or promotional code
                </label>
                <div className="flex max-w-md items-center gap-4">
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=""
                    required
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {dataCartItem.reduce((acc, item) => acc + item.total, 0)}{' '}
                      VNĐ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tax
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $199
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      $8,392.00
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default Checkout
