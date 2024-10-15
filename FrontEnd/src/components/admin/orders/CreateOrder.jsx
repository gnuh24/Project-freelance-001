import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesApiThunk } from '../../../reducers/productReducer/ShoeSlice'
import { checkEmailApiThunk } from '../../../reducers/auth/AccountSlice'
import { getVoucherByCodeApiThunk } from '../../../reducers/voucherReducer/VoucherSlice'

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

  useEffect(() => {
    dispatch(getShoesApiThunk({ pageSize: 10, pageNumber: 1 }))
  }, [dispatch])

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
            <div className="grid grid-cols-3 gap-4">
              {dataShoe?.content?.map((item) => (
                <div
                  key={item.shoeId}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="w-full p-8 rounded-t-lg"
                      src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.defaultImage}`}
                      alt={item.shoeName}
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.shoeName}
                      </h5>
                    </a>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {item.lowestPrice} VNĐ
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email khách hàng
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
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
              <button className="w-full bg-blue-700 text-white py-2 rounded">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
