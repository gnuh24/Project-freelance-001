import { useEffect, useState } from 'react'

const ShippingActivity = ({ layout, orderStatuses, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(null)

  // Hàm xác định trạng thái tiếp theo
  const getNextStatus = (currentStatus) => {
    if (layout === 'admin') {
      switch (currentStatus) {
        case 'ChoDuyet':
          return 'DaDuyet'
        case 'DaDuyet':
          return 'DangGiao'
        default:
          return null
      }
    } else if (layout === 'user') {
      switch (currentStatus) {
        case 'DaDuyet':
          return 'Huy'
        case 'DangGiao':
          return 'GiaoThanhCong'
        default:
          return null
      }
    }
  }

  useEffect(() => {
    if (orderStatuses) {
      const lastStatus = orderStatuses[orderStatuses.length - 1]
      setCurrentStatus(lastStatus.status)
    }
  }, [orderStatuses, layout])

  // Hàm xử lý cập nhật trạng thái
  const handleUpdateStatus = (stepStatus) => {
    const nextStatus = getNextStatus(stepStatus)
    if (nextStatus) {
      onUpdateStatus(nextStatus)
    }
  }

  // Các bước trạng thái hiển thị
  const statusSteps = [
    { status: 'ChoDuyet', label: 'Đã duyệt' },
    { status: 'DaDuyet', label: 'Đang giao hàng' },
    { status: 'DangGiao', label: 'Giao hàng thành công' },
    { status: 'GiaoThanhCong', label: 'Giao hàng thành công' },
  ]

  const getStatusIndex = (status) => {
    return statusSteps.findIndex((step) => step.status === status)
  }

  const currentStatusIndex = getStatusIndex(currentStatus)
  return (
    <div className="p-4">
      <div
        className={`flex ${currentStatus === 'Huy' ? 'justify-center' : 'justify-between'} items-center`}
      >
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStatus === 'Huy'
                ? 'bg-red-500 border-2 border-red-500' // Màu đỏ cho trạng thái Hủy
                : 'bg-green-500 border-2 border-green-500' // Màu xanh cho trạng thái khác
            }`}
          >
            <span className="text-white">
              {currentStatus === 'Huy' ? '✖️' : '✔️'}{' '}
              {/* Biểu tượng Hủy hoặc Hoàn thành */}
            </span>
          </div>
          <p
            className={`mt-2 text-sm ${
              currentStatus === 'Huy'
                ? 'text-red-500 font-bold'
                : 'text-gray-600'
            }`}
          >
            {currentStatus === 'Huy' ? 'Đã hủy' : 'Chờ duyệt'}{' '}
          </p>
        </div>

        {currentStatus !== 'Huy' &&
          statusSteps.map((step, index) => {
            const isCompleted = index < currentStatusIndex // Trạng thái đã hoàn thành
            const isActive = index === currentStatusIndex // Trạng thái hiện tại

            const isDeliveredSuccessfully = step.status === 'GiaoThanhCong'

            if (isDeliveredSuccessfully) return null

            return (
              <div className="flex items-center" key={step.status}>
                <div className="flex flex-col items-center">
                  <div
                    className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'bg-gray-200 border-gray-400'
                    }`}
                    onClick={() => {
                      if (layout === 'user') {
                        const hasInProgressStatus = orderStatuses.some(
                          (status) => status.status === 'DangGiao',
                        )

                        if (!hasInProgressStatus) {
                          return
                        }
                      }
                      handleUpdateStatus(step.status)
                    }} // Gọi hàm xử lý cập nhật trạng thái
                  >
                    {isCompleted ? (
                      <span className="text-white">✔️</span>
                    ) : (
                      <span className="text-gray-600">{index + 1}</span>
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      isActive ? 'text-green-500 font-bold' : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-400'
                    } mx-2`}
                  ></div>
                )}
              </div>
            )
          })}
      </div>
      {/* Hiển thị nút Hủy nếu trạng thái hiện tại là Hủy */}
      {currentStatus === 'ChoDuyet' && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onUpdateStatus('Huy')}
          >
            Hủy đơn hàng
          </button>
        </div>
      )}
    </div>
  )
}

export default ShippingActivity
