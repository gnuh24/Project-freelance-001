import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesApiThunk } from '../../../reducers/productReducer/ShoeSlice'
import { checkEmailApiThunk } from '../../../reducers/auth/AccountSlice'
import { getVoucherByCodeApiThunk } from '../../../reducers/voucherReducer/VoucherSlice'
import { Pagination, Stack } from '@mui/material'
import { Modal } from 'flowbite-react'
import AxiosAdmin from '../../../apis/AxiosAdmin'

const CreateOrder = () => {
  const dispatch = useDispatch()
  const {
    data: dataShoe,
    loading,
    error,
  } = useSelector((state) => state.shoeReducer)
  const { checkEmail } = useSelector((state) => state.accountReducer)
  const { data: dataVoucher } = useSelector((state) => state.vouchers)
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageDataShoe, setPageDataShoe] = useState(1)
  const [pageUserInformation, setPageUserInformation] = useState(1)
  const [openModal, setOpenModal] = useState(true)

  const handleChangeDataShoe = (event, value) => {
    setPageDataShoe(value)
  }
  const handleChangeUserInformation = (event, value) => {
    setPageUserInformation(value)
  }

  useEffect(() => {
    dispatch(
      getShoesApiThunk({
        pageSize: 6,
        pageNumber: pageDataShoe,
        search: searchTerm,
      }),
    )
  }, [dispatch, pageDataShoe, searchTerm])

  const handleAddToCart = (shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.shoeId === shoe.shoeId)
      if (existingItem) {
        // If item is already in cart, increase its quantity
        return prevItems.map((item) =>
          item.shoeId === shoe.shoeId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        // If item is not in the cart, add it with quantity 1
        return [...prevItems, { ...shoe, quantity: 1 }]
      }
    })
  }

  const handleRemoveFromCart = (shoeId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.shoeId !== shoeId),
    )
  }

  const handleUpdateQuantity = (shoeId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.shoeId === shoeId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }
  const [email, setEmail] = useState('')
  const [voucherCode, setVoucherCode] = useState('')
  const [timeoutId, setTimeoutId] = useState(null)

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    // Nếu có timeout đang hoạt động, xóa nó
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Tạo timeout mới để gọi API sau 1 giây
    const id = setTimeout(() => {
      dispatch(checkEmailApiThunk(value))
    }, 500)

    setTimeoutId(id)
  }

  useEffect(() => {
    // Dọn dẹp khi component unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const [selectedAccount, setSelectedAccount] = useState(null)

  const [dataUserInformation, setDataUserInformation] = useState([])
  const [searchSDT, setSearchSDT] = useState('')
  const handleSDTChange = (e) => {
    const value = e.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      setPageUserInformation(1)
      setSearchSDT(value)
    }, 500)
    setTimeoutId(id)
  }

  const handleSelectAccount = (accountId) => {
    // Nếu tài khoản đang chọn đã được chọn thì bỏ chọn, ngược lại chọn tài khoản mới
    if (selectedAccount === accountId) {
      setSelectedAccount(null) // Bỏ chọn
    } else {
      setSelectedAccount(accountId) // Chọn tài khoản mới
    }
  }

  useEffect(() => {
    if (!checkEmail) {
      setEmail('')
    }
  }, [checkEmail])

  const handleVoucherChange = (e) => {
    const value = e.target.value
    setVoucherCode(value)

    // Nếu có timeout đang hoạt động, xóa nó
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Tạo timeout mới để gọi API sau 1 giây
    const id = setTimeout(() => {
      dispatch(getVoucherByCodeApiThunk(value))
    }, 500)

    setTimeoutId(id)
  }

  useEffect(() => {
    // Dọn dẹp khi component unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])
  const fetchUserInformation = async (pageSize, pageNumber, search) => {
    try {
      const response = await AxiosAdmin.get(`/UserInformation`, {
        params: {
          pageSize,
          pageNumber,
          search,
        },
      })
      setDataUserInformation(response.data)
    } catch (error) {
      console.log('Failed to fetch data: ', error)
    }
  }

  useEffect(() => {
    fetchUserInformation(8, pageUserInformation, searchSDT)
  }, [pageUserInformation, searchSDT])

  console.log(dataUserInformation)

  const subtotal = cartItems.reduce(
    (total, item) => total + item.lowestPrice * item.quantity,
    0,
  )

  let discountAmount = 0
  if (dataVoucher && dataVoucher.status) {
    discountAmount = dataVoucher.isFreeShip ? 0 : dataVoucher.discountAmount
  }
  let total = 0
  if (dataVoucher && subtotal >= dataVoucher.condition) {
    total = subtotal - discountAmount
  } else {
    total = subtotal
  }

  const handlePayment = () => {
    const payload = {}
  }
  console.log(dataShoe)
  return (
    <>
      <div>
        <div>
          <h1 className="text-center mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            TẠO ĐƠN HÀNG
          </h1>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-6">
            <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Thông tin sản phẩm
            </h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {dataShoe?.content?.length > 0 ? (
                dataShoe.content.map((item) => {
                  const originalPrice = item.originalPrice || item.lowestPrice
                  const discount = item.sale
                    ? Math.round((1 - item.lowestPrice / originalPrice) * 100)
                    : 0
                  const discountedPrice = item.lowestPrice

                  return (
                    <div
                      onClick={() => handleAddToCart(item)}
                      key={item.shoeId}
                      className="cursor-pointer relative rounded-none border border-black"
                    >
                      {item.sale && (
                        <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
                          Sale {discount}%
                        </div>
                      )}
                      <div className="w-full h-64">
                        <img
                          className="w-full h-full object-cover"
                          src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.defaultImage}`}
                          alt={item.shoeName}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[8px] md:text-xs font-bold text-gray-900">
                            {item.numberOfShoeSize} sizes
                          </span>
                          <div className="flex space-x-4">
                            {item.top3Size?.map((size) => (
                              <span
                                key={size}
                                className="text-[8px] md:text-xs font-medium bg-zinc-300 flex items-center justify-center text-gray-900 w-5 h-5 md:w-6 md:h-6 p-1 rounded-full"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button>
                          <h5 className="text-left text-xs md:text-sm font-semibold tracking-tight text-gray-900 mt-2">
                            {item.shoeName}
                          </h5>
                        </button>
                        {item.sale ? (
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs md:text-sm font-bold tracking-tight">
                              <span className="line-through">
                                {originalPrice.toLocaleString('vi-VN')} VNĐ
                              </span>
                              <span className="ml-2 text-rose-500">
                                {discountedPrice.toLocaleString('vi-VN')} VNĐ
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs md:text-sm font-bold tracking-tight">
                              {originalPrice.toLocaleString('vi-VN')} VNĐ
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-span-3 text-center text-gray-500 mt-5">
                  Không có sản phẩm nào.
                </div>
              )}
            </div>

            {dataShoe?.content?.length > 0 && (
              <div className="flex justify-center items-center mt-5">
                <Stack spacing={2}>
                  <Pagination
                    count={dataShoe?.totalPages}
                    page={pageDataShoe}
                    onChange={handleChangeDataShoe}
                    shape="rounded"
                    variant="outlined"
                  />
                </Stack>
              </div>
            )}
          </div>
          <div className="col-span-4">
            <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Thanh toán
            </h1>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.shoeId} className="flex justify-between">
                    <div>
                      <p>{item.shoeName}</p>
                      <p>{item.lowestPrice} VNĐ</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.shoeId, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="px-2 py-1 bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.shoeId, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.shoeId)}
                        className="ml-4 text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
              <div className="mt-4">
                <span className="text-xl font-bold">Giá tạm tính: </span>
                <span>{subtotal} VNĐ</span>
              </div>

              <div>
                <span className="text-xl font-bold">Giảm giá: </span>
                <span>
                  {discountAmount} VNĐ
                  {dataVoucher && subtotal < dataVoucher.condition ? (
                    <span className="text-red-500">
                      {' '}
                      (Không thỏa mãn điều kiện)
                    </span>
                  ) : null}
                </span>
              </div>

              {dataVoucher?.isFreeShip ? (
                <div>
                  <span className="text-xl font-bold">Freeship: </span>
                  <span>{dataVoucher?.isFreeShip ? 'Có' : 'Không'}</span>
                </div>
              ) : null}

              <div>
                <span className="text-xl font-bold">Tổng tính: </span>
                <span>{total} VNĐ</span>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="vocher"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã voucher
                </label>
                <input
                  type="text"
                  id="voucher"
                  onChange={handleVoucherChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Note
                </label>
                <input
                  type="email"
                  id="email"
                  // onChange={handleNoteChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex gap-5 items-center">
                <button className="w-full bg-blue-700 text-white py-2 rounded">
                  Thanh toán
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full bg-blue-700 text-white py-2 rounded"
                >
                  Tài khoản
                </button>
              </div>
            </div>

            <Modal
              show={openModal}
              size="5xl"
              onClose={() => setOpenModal(false)}
            >
              <Modal.Header>Tài khoản</Modal.Header>
              <Modal.Body>
                {/* Input search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài khoản..."
                    onChange={handleSDTChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tên
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          SĐT
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataUserInformation.content?.map((account) => (
                        <tr key={account.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={selectedAccount === account.id}
                              onChange={() => handleSelectAccount(account.id)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {account.fullname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {account.phoneNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {dataUserInformation.content?.length > 0 && (
                  <div className="flex justify-center items-center mt-5">
                    <Stack spacing={2}>
                      <Pagination
                        count={dataUserInformation?.totalPages}
                        page={pageUserInformation}
                        onChange={handleChangeUserInformation}
                        shape="rounded"
                        variant="outlined"
                      />
                    </Stack>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="w-full bg-blue-700 text-white py-2 rounded"
                  onClick={() => setOpenModal(false)}
                >
                  I accept
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
