import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../reducers/productReducer/ProductsSlice';
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice';
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice';
import { getColorsNoPageApiThunk } from '../../../reducers/productReducer/ColorSlice';
import ProductsSelectedIventory from './ProductsSelectedIventory';



const builderQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams();
  Object.entries({
    ...filters,
    pageNumber: page || ' ',
    pageSize: itemsPerPage || ' ',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}


const DEFAULT_PAGE = 1
const ITEM_PER_PAGE = 10
const AddInventoryDialog = ({
  open,
  handleOpen
}) => {

  const [isAddCreateFormOpen, setIsAddCreateFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productOpen, setProductOpen] = useState(false);

  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const shoetypes = useSelector(state => state.shoeTypeReducer)
  const brands = useSelector(state => state.brandReducer)
  const colors = useSelector(state => state.colorReducer)
  const totalPages = products.data.totalPages

  if (!products || !shoetypes || !brands) {
    return <div>loading... </div>
  }

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [isFilterDateOpen, setIsFilterDateOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)


  const [filterValues, setFilterValues] = useState({
    search: '',
    brandId: '',
    shoeTypeId: '',
    priority: '',
    minCreateDate: '',
    maxCreateDate: '',
  });




  useEffect(() => {
    const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE)


    dispatch(getProducts(query))
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getColorsNoPageApiThunk())
  }, [dispatch, filterValues, currentPage])



  const handleProductSelection = (selectedProducts) => {

    setSelectedProduct(selectedProducts);

    console.log(selectedProducts)
  };



  const handleProductOpen = () => {
    setProductOpen(!productOpen)
  }

  return (
    <div className={open ? 'w-full h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
      open={open}
    >
      <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto'>
        <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
          <CloseIcon className='text-2xl' />
        </button>
        <DialogTitle className='text-center'>
          Thêm phiếu nhập
        </DialogTitle>

        <DialogContent>
          <div className='space-y-4 max-h-[40rem]' >
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
            {selectedProduct.length > 0 && selectedProduct.map((product, index) => (
              <div key={index} className='space-y-4'>
                <p className='text-sm'>{product.shoeName}</p>
                
                <div key={index} className='relative flex flex-col gap-4 p-4 border rounded-md '>

                   

                    <label className='font-semibold'>Size </label>
                    <input
                      type="text"
                      
                      className='rounded-md'
                      readOnly

                    />
                    <label className='font-semibold'>Giá </label>
                    <input
                      type="text"
                      
                     
                      className='rounded-md'

                    />
                    <div className='flex flex-col gap-2 rounded-md'>
                      <label >Trạng thái</label>
                      <select className='rounded-md'   >
                        <option value=""></option>
                        <option value="true">Còn</option>
                        <option value="false">Hết</option>
                      </select>
                    </div>
                    <label htmlFor="quantity">Số lượng</label>
                    <input type="text"
                      
                      
                      className='rounded-md'
                    />

                   
                  </div>

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

            ))}
            <button onClick={() => setProductOpen(true)} className='bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Thêm sản phẩm</button>
          </div>
        </DialogContent>
      </div>

      <div>
        <ProductsSelectedIventory
          isOpen={productOpen}
          handleOpen={handleProductOpen}
          productTypes={shoetypes.data}
          products={products.data.content}
          onProductSelect={handleProductSelection}
          filterValues={filterValues}
          setCurrentPage={setCurrentPage}
          onFilterSelect={setFilterValues}
          totalPages={totalPages}
          ProductBrands={brands.data}
        />

      </div>
    </div>
  )
}

export default AddInventoryDialog