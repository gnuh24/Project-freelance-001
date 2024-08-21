


import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

const AddProductDialog = ({
  open,
  handleOpen,
  types,
  brands
}) => {

  const [formValues, setFormValues] = useState({
    shoeName: '',
    status: '',
    description: '',
    priority: '',
    brandId: '',
    shoeTypeId: '',
    shoeColors: [],
    shoeSizes: [],
    shoeImages: [],
  })
  return (
    <Dialog open={open}>
      <div>
        <DialogTitle>
          Thêm sản phẩm mới
        </DialogTitle>

        <DialogContent>

          <form className='space-y-4' >
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Tên sản phẩm mới</label>
              <input type="text" placeholder='Nhập tên sản phẩm' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Trạng thái</label>
              <select>
                <option value="true">Còn</option>
                <option value="true">Hết</option>
               
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Tên sản phẩm mới</label>
              <input type="text" placeholder='Nhập tên sản phẩm' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Tên sản phẩm mới</label>
              <input type="text" placeholder='Nhập tên sản phẩm' />
            </div>
          </form>


        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AddProductDialog