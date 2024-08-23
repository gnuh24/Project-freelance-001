import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataCartThunk } from '../../reducers/shopping/CartSlice'
import { getAccountAndUserInformationByIdApiThunk } from '../../reducers/auth/AccountSlice'
import { getNewestShippingFeesApiThunk } from '../../reducers/shopping/ShippingFeeSlice'
import { getVouchersClientApiThunk } from '../../reducers/voucherReducer/VoucherSlice'
import { alertSave } from '../sweeetalert/sweetalert'
import { createOrderByUser } from '../../reducers/shopping/OrderSlice'
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
  const {
    data: dataVoucher,
    status: statusVoucher,
    error: errorVoucher,
  } = useSelector((state) => state.vouchers)
  const {
    data: dataOrder,
    status: statusOrder,
    error: errorOrder,
  } = useSelector((state) => state.orderReducer)
  const ACCOUNT_ID = localStorage.getItem('id')

  const [selectedVoucher, setSelectedVoucher] = useState(null)

  useEffect(() => {
    dispatch(getDataCartThunk(ACCOUNT_ID))
    dispatch(getAccountAndUserInformationByIdApiThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  useEffect(() => {
    dispatch(getNewestShippingFeesApiThunk())
    dispatch(getVouchersClientApiThunk())
  }, [dispatch])
  console.log(dataVoucher)

  const handleSubmitAddOrder = async (e) => {
    e.preventDefault()
    const payload = {
      accountId: ACCOUNT_ID,
      type: 'Facebook',
      shippingFeeId: shippingFee?.id || 0,
      voucherId: selectedVoucher.voucherId || null,
      note: e.target.note.value,
      subtotalPrice: dataCartItem.reduce((acc, item) => acc + item.total, 0),
      totalPrice: calculateTotalPrice(),
      listOrderDetail: dataCartItem.map(
        ({ idShoeId: shoeId, idSize, unitPrice, quantity, total }) => ({
          shoeId,
          idSize,
          unitPrice,
          quantity,
          total,
        }),
      ),
    }
    const result = await alertSave()
    if (result) {
      console.log(payload)
      dispatch(createOrderByUser(payload))
    } else {
      return
    }
  }

  useEffect(() => {
    if (statusOrder === 'succeededCreateOrderByUser') {
      dispatch()
    }
  }, [dispatch, statusOrder])

  const calculateTotalPrice = () => {
    let total = dataCartItem.reduce((acc, item) => acc + item.total, 0)
    if (selectedVoucher) {
      const currentDate = new Date()
      const expirationTime = selectedVoucher.expirationTime
      if (expirationTime) {
        const [time, date] = expirationTime.split(' ')
        const [day, month, year] = date.split('/')
        const formattedDate = `${year}-${month}-${day}T${time}`
        const expirationDate = new Date(formattedDate)

        if (currentDate <= expirationDate) {
          if (total >= selectedVoucher.condition) {
            total -= selectedVoucher.discountAmount
          }
          if (selectedVoucher.isFreeShip) {
            // Không tính phí vận chuyển
          } else if (shippingFee?.fee) {
            total += shippingFee.fee
          }
        } else if (shippingFee?.fee) {
          total += shippingFee.fee
        }
      }
    } else if (shippingFee?.fee) {
      total += shippingFee.fee
    }
    return total
  }

  useEffect(() => {
    if (dataVoucher.length > 0) {
      setSelectedVoucher(dataVoucher[0]) // Automatically select the first voucher
    }
  }, [dataVoucher])

  const handleSelectVoucher = (voucher) => {
    setSelectedVoucher(voucher)
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
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmitAddOrder}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
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
                        +84
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
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
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

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Vouchers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dataVoucher.map((voucher) => (
                    <div
                      key={voucher.voucherId}
                      onClick={() => handleSelectVoucher(voucher)}
                      className={`p-6 bg-white rounded-lg shadow-md cursor-pointer hover:bg-blue-100 transition duration-300 ease-in-out ${
                        selectedVoucher?.voucherId === voucher.voucherId
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {voucher.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Mã giảm giá: {voucher.code}
                      </p>
                      <p className="text-sm text-gray-500">
                        Giảm giá: {voucher.discountAmount.toLocaleString()} VND
                      </p>
                      <p className="text-sm text-gray-500">
                        Điều kiện: {voucher.condition.toLocaleString()} VND
                      </p>
                      <p className="text-sm text-gray-500">
                        Hạn sử dụng: {voucher.expirationTime}
                      </p>
                      <p className="text-sm text-gray-500">
                        {voucher.isFreeShip
                          ? 'Miễn phí vận chuyển'
                          : 'Không miễn phí vận chuyển'}
                      </p>
                      {selectedVoucher?.voucherId === voucher.voucherId && (
                        <div className="text-green-500 font-bold mt-2">
                          Đã chọn
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <label
                      htmlFor="note"
                      className="text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                      Note
                    </label>
                    <input
                      type="text"
                      id="note"
                      name="note"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Ghi chú về đơn hàng"
                    />
                  </dl>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tạm tính
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {dataCartItem
                        .reduce((acc, item) => acc + item.total, 0)
                        .toLocaleString()}{' '}
                      VNĐ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tiền vận chuyển
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {shippingFee?.fee && !selectedVoucher?.isFreeShip
                        ? `${shippingFee.fee.toLocaleString()} VNĐ`
                        : 'Miễn phí'}
                    </dd>
                  </dl>

                  <dd className="flex text-base font-medium text-gray-900 dark:text-white">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400 mr-5">
                      Voucher
                    </dt>
                    {selectedVoucher
                      ? dataCartItem.reduce(
                          (acc, item) => acc + item.total,
                          0,
                        ) >= selectedVoucher.condition
                        ? `Giảm giá ${selectedVoucher.discountAmount.toLocaleString()} VNĐ`
                        : `Không đủ điều kiện (Cần tối thiểu ${selectedVoucher.condition.toLocaleString()} VNĐ)`
                      : 'Không có voucher'}
                  </dd>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {(() => {
                        const currentDate = new Date()

                        let total = dataCartItem.reduce(
                          (acc, item) => acc + item.total,
                          0,
                        )

                        if (selectedVoucher) {
                          const expirationTime = selectedVoucher?.expirationTime

                          // Kiểm tra nếu expirationTime tồn tại
                          if (expirationTime) {
                            // Tách expirationTime thành ngày và giờ
                            const [time, date] = expirationTime.split(' ')

                            // Tách ngày thành [ngày, tháng, năm]
                            const [day, month, year] = date.split('/')

                            // Tạo lại chuỗi ngày theo định dạng YYYY-MM-DD
                            const formattedDate = `${year}-${month}-${day}T${time}`

                            // Tạo đối tượng Date từ chuỗi đã format
                            const expirationDate = new Date(formattedDate)

                            console.log(expirationDate)

                            // Kiểm tra nếu voucher còn hạn
                            if (currentDate <= expirationDate) {
                              console.log(1)

                              // Kiểm tra điều kiện tổng tiền để áp dụng giảm giá
                              if (total >= selectedVoucher.condition) {
                                total -= selectedVoucher.discountAmount
                              }

                              // Kiểm tra điều kiện miễn phí vận chuyển
                              if (selectedVoucher.isFreeShip) {
                                total += 0 // Không tính phí vận chuyển
                              } else if (shippingFee?.fee) {
                                total += shippingFee.fee
                              }
                            } else if (shippingFee?.fee) {
                              total += shippingFee.fee
                            }
                          }
                        } else if (shippingFee?.fee) {
                          total += shippingFee.fee
                        }

                        return `${total.toLocaleString()} VNĐ`
                      })()}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default Checkout
