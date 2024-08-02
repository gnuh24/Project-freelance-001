import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { getShoeApiThunk } from '../../reducers/productReducer/ShoeSlice'
import { addCartItem } from '../../reducers/shopping/CartSlice'

const DetailProduct = () => {
  const [activeImg, setActiveImage] = useState('')

  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(0)
  const [focusedSize, setFocusedSize] = useState(0)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => {
    return state.shoeReducer
  })

  useEffect(() => {
    if (id) {
      dispatch(getShoeApiThunk(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (data?.shoeImages?.length > 0) {
      setActiveImage(data.shoeImages[0].path)
      setPrice(data.shoeSizes[0].price)
    }
  }, [data])

  const onChangePriceBySize = (index) => {
    setPrice(data.shoeSizes[index].price)
    setFocusedSize(index)
    setAmount(1)
  }
  const onChangePriceByAmount = (amount) => {
    setPrice(data.shoeSizes[focusedSize].price * amount)
  }

  const {
    data: dataCart,
    loading: loadingCart,
    error: errorCart,
  } = useSelector((state) => state.cartReducer)

  const handleAddToCart = () => {
    const payload = {
      accountId: localStorage.getItem('id'),
      shoeId: data.shoeId,
      idSize: data?.shoeSizes?.[focusedSize].size,
      unitPrice: data?.shoeSizes?.[focusedSize].price,
      quantity: amount,
      total: price,
    }
    for (const key in payload) {
      if (payload[key] === undefined || payload[key] === null) {
        console.error(`Error: ${key} is ${payload[key]}`)
        return
      }
    }
    const formData = new FormData()
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key])
      }
    }

    dispatch(addCartItem(formData))
    console.log(dataCart)
  }

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              {data?.shoeImages?.map((image) => {
                return (
                  <img
                    key={image.shoeImageId}
                    src={image.path}
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
            <h6 className="text-2xl font-semibold">$ {price}</h6>
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
                onClick={handleAddToCart}
                className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailProduct
