import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'

const AddInventoryDialog = ({
  open,
  handleOpen
}) => {

  const [isAddCreateFormOpen, setIsAddCreateFormOpen] = useState(false)

  return (
    <div className={open ? 'w-full h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
      open={open}
    >
      <div className='relative w-[35rem] bg-white border rounded-md shadow-md'>
        <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
          <CloseIcon className='text-2xl' />
        </button>
        <DialogTitle className='text-center'>
          Thêm phiếu nhập
        </DialogTitle>

        <DialogContent>
          <div className='space-y-4' >
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
              <input className='rounded-md' type="text" placeholder='Tổng giá' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplier">Nhà cung cấp</label>
              <input className='rounded-md' type="text" placeholder='Tên nhà cung cấp' />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplierPhone">Số điện thoại nhà cung cấp</label>
              <input className='rounded-md' type="text" placeholder='Sdt' />
            </div>
            <button onClick={() => setIsAddCreateFormOpen(true)} className='bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Thêm sản phẩm</button>
            {isAddCreateFormOpen && (
              <div>
                <button>Chọn sản phẩm</button>
                <button>Chọn size</button>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="unitPrice">đơn vị giá</label>
                  <input className='rounded-md' type="text" placeholder='Đơn vị giá' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                  <input className='rounded-md' type="text" placeholder='quantity' />
                </div>
                
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="quantity">Tổng</label>
                  <input className='rounded-md' type="text" placeholder='quantity' />
                </div>
                
              </div>
            )}
          </div>
        </DialogContent>
      </div>
    </div>
  )
}

export default AddInventoryDialog