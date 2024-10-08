import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getShoeApiThunk } from '../../reducers/productReducer/ShoeSlice'
import {
  addCartItem,
  getDataCartThunk,
} from '../../reducers/shopping/CartSlice'
import {
  alertError,
  alertSuccess,
} from '../../components/sweeetalert/sweetalert.jsx'
import VoucherCard from '../../components/cart/VoucherCard.jsx'
import PolicyItem from '../../components/cart/PolicyItem.jsx'
import { getVouchersClientApiThunk } from '../../reducers/voucherReducer/VoucherSlice.jsx'
import Cookies from 'js-cookie'

const DetailProduct = () => {
  const [activeImg, setActiveImage] = useState('')

  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(0)
  const [priceDiscount, setPriceDiscount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [focusedSize, setFocusedSize] = useState(0)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => {
    return state.shoeReducer
  })
  const ACCOUNT_ID = Cookies.get('id')

  const {
    data: dataVoucher,
    status: statusVoucher,
    error: errorVoucher,
  } = useSelector((state) => state.vouchers)

  const policies = [
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Cam kết hàng đẹp chất lượng',
    },
    { icon: 'https://via.placeholder.com/24', text: 'Bảo hành 3 tháng' },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Đổi size trong vòng 7 ngày',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Đổi trả một / một khi phát hiện hàng bị lỗi',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Free ship đơn hàng trên 1 triệu',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Không kèm với khuyến mãi khác',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Hỗ trợ giao hàng 2h khi chọn hình thức giao tốc hành, áp dụng khu vực HCM T2 - T7 (giờ hành chính)',
    },
  ]

  const {
    data: dataCart,
    status: statusCart,
    error: errorCart,
  } = useSelector((state) => state.cartReducer)

  useEffect(() => {
    if (id) {
      dispatch(getShoeApiThunk(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (data?.shoeImages?.length > 0) {
      setActiveImage(data.shoeImages[0].path)
      setPrice(data.shoeSizes[0].price)
      if (data.sale) {
        setPriceDiscount(
          data.shoeSizes[0].price - (data.shoeSizes[0].price * data.sale) / 100,
        )
      } else {
        setPriceDiscount(data.shoeSizes[0].price)
      }
      setQuantity(data.shoeSizes[0].quantity)
    }
  }, [data])
  console.log(data)

  useEffect(() => {
    if (statusCart === 'succeededAddCartItem') {
      dispatch(getDataCartThunk(ACCOUNT_ID))
      alertSuccess('Thêm vào giỏ hàng thành công')
    } else if (statusCart === 'failedAddCartItem') {
      alertError(errorCart)
    }
  }, [dispatch, ACCOUNT_ID, statusCart])

  useEffect(() => {
    dispatch(getVouchersClientApiThunk())
  }, [dispatch])

  useEffect(() => {
    if (data && data.shoeImages && data.shoeImages.length > 0) {
      setActiveImage(data.shoeImages[0].path)
    } else {
      setActiveImage('defaultImagePath')
    }
  }, [data])

  const onChangePriceBySize = (index) => {
    setPrice(data.shoeSizes[index].price)
    if (data.sale) {
      setPriceDiscount(
        data.shoeSizes[index].price -
          (data.shoeSizes[index].price * data.sale) / 100,
      )
    } else {
      setPriceDiscount(data.shoeSizes[index].price)
    }

    setQuantity(data.shoeSizes[index].quantity)
    setFocusedSize(index)
    setAmount(1)
  }
  const onChangePriceByAmount = (amount) => {
    setPrice(data.shoeSizes[focusedSize].price * amount)
    if (data.sale) {
      setPriceDiscount(
        (data.shoeSizes[focusedSize].price -
          (data.shoeSizes[focusedSize].price * data.sale) / 100) *
          amount,
      )
    } else {
      setPriceDiscount(data.shoeSizes[focusedSize].price * amount)
    }
  }

  const handleAddToCart = () => {
    if (!Cookies.get('id')) {
      window.location.href = '/signIn'
    }
    const payload = {
      accountId: Cookies.get('id'),
      shoeId: data.shoeId,
      idSize: data?.shoeSizes?.[focusedSize].size,
      unitPrice: data?.shoeSizes?.[focusedSize].price,
      quantity: amount,
      total: priceDiscount,
    }

    for (const key in payload) {
      if (payload[key] === undefined || payload[key] === null) {
        console.error(`Error: ${key} is ${payload[key]}`)
        return
      }
    }

    const existingCartItem = dataCart.find(
      (item) =>
        item.idShoeId === payload.shoeId && item.idSize === payload.idSize,
    )

    if (existingCartItem) {
      payload.quantity += existingCartItem.quantity
      payload.total = payload.quantity * payload.unitPrice
    }

    const formData = new FormData()
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key])
      }
    }

    dispatch(addCartItem(formData))
  }

  useEffect(() => {
    if (statusCart === 'failed') {
      alertError(errorCart)
    }
  }, [statusCart])
  return (
    <>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={`http://localhost:8080/ShoeImage/Image/${activeImg}`}
              // src="#"
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="grid grid-cols-4 gap-2">
              {data?.shoeImages?.map((image) => {
                return (
                  <img
                    key={image.shoeImageId}
                    src={`http://localhost:8080/ShoeImage/Image/${image.path}`}
                    alt={image.shoeImageId}
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(image.path)}
                  />
                )
              })}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                {data?.shoeType?.shoeTypeName}
              </span>
              <h1 className="text-3xl font-bold">{data?.shoeName}</h1>
            </div>
            {data.sale ? (
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm font-bold tracking-tight">
                  <span className="line-through text-2xl font-semibold">
                    {price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="ml-2 text-rose-500 text-2xl font-semibold">
                    {priceDiscount.toLocaleString('vi-VN')}đ
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm font-bold tracking-tight">
                  <span className="text-2xl font-semibold">{price.toLocaleString('vi-VN')} đ</span>
                </p>
              </div>
            )}
            <span>Số lượng còn lại: {quantity}</span>
            <div className="flex items-center">
              {data?.shoeSizes?.map((item, index) => {
                return (
                  <button
                    key={index}
                    size="xs"
                    className={`outline outline-1 outline-black mx-1 px-4 ${
                      item.quantity === 0
                        ? 'bg-gray-300 text-gray-500'
                        : focusedSize === index
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                    }`}
                    onClick={() => onChangePriceBySize(index)}
                    disabled={item.quantity === 0}
                    color={item.quantity === 0 ? 'warning' : null}
                  >
                    {item.size}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => {
                    if (amount > 1) {
                      // Ensure amount is not less than 1
                      setAmount((prev) => prev - 1)
                      onChangePriceByAmount(amount - 1)
                    }
                  }}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => {
                    setAmount((prev) => prev + 1)
                    onChangePriceByAmount(amount + 1)
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-gray-700">{data?.description}</p>
            <div>
              <button
                onClick={() => {
                  handleAddToCart()
                }}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="container mx-auto">
              {dataVoucher?.map((voucher) => (
                <VoucherCard
                  key={voucher.voucherId}
                  discount={voucher.discountAmount}
                  code={voucher.code}
                  isFreeShip={voucher.isFreeShip}
                  minOrder={voucher.condition}
                  expiryDate={voucher.expirationTime}
                />
              ))}
            </div>
            {/* <div className="max-w-sm border border-black p-4">
              {policies.map((policy, index) => (
                <PolicyItem key={index} icon={policy.icon} text={policy.text} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailProduct
