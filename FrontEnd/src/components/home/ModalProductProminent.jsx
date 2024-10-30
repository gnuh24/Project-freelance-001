import { Card, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesFormHomeThunk } from '../../reducers/productReducer/ShoeSlice'
import './Modal.css'
import { Link } from 'react-router-dom'

export function ModalProductProminent() {
  const dispatch = useDispatch()
  const { dataForHome } = useSelector((state) => state.shoeReducer)

  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    dispatch(getShoesFormHomeThunk({ pageNumber: 0, pageSize: 10 }))
  }, [dispatch])

  return (
    <>
      <Modal
        size="7xl"
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="modal"
      >
        <Modal.Header>Sản phẩm nổi bật</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-sm:gap-2">
            {dataForHome?.content?.slice(0, 9).map((product) => {
              // Giới hạn tối đa 9 sản phẩm
              return (
                <Link
                  key={product?.shoeId} // Thêm khóa cho mỗi phần tử trong danh sách
                  to={`/products/${product?.shoeId}`}
                  className="cursor-pointer relative max-w-full rounded-lg border border-black pb-5 space-y-5 shadow-md hover:shadow-lg transition-shadow duration-200"
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                >
                  <div className="w-full h-64">
                    <img
                      className="w-full h-full object-cover rounded-t-lg"
                      src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product.image}`}
                      alt={`imageShoe_${product?.shoeId}`} // Sử dụng tên mô tả duy nhất cho ảnh
                    />
                  </div>
                  <button>
                    <h5 className="text-left text-xs px-5 md:text-sm mt-2 md:mt-5 md:px-5 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product?.shoeName}
                    </h5>
                  </button>
                  <div className="flex items-center justify-between">
                    <p className="text-xs px-5 md:text-sm md:px-5 font-bold tracking-tight">
                      <span>{product.price.toLocaleString('vi-VN')}đ</span>
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
