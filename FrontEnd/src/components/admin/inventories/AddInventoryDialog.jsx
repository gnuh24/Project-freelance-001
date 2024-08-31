import { DialogContent, IconButton, Tooltip } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getInventoryProducts, getProducts } from '../../../reducers/productReducer/ProductsSlice';
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice';
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice';
import ProductsSelectedIventory from './ProductsSelectedIventory';

import { createInventoryReportApiThunk } from '../../../reducers/inventoryReducers/InventoryReportSlice';
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import '../style.css'


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

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productOpen, setProductOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState([]);
  const [currentProductId, setCurrentProductId] = useState('');

  const dispatch = useDispatch()

  const products = useSelector(state => state.products)
  const shoetypes = useSelector(state => state.shoeTypeReducer)
  const brands = useSelector(state => state.brandReducer)


  const totalPages = products.data.totalPages

  if (!products || !shoetypes || !brands) {
    return <div>loading... </div>
  }

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)

  const [unitPrice, setUnitPrice] = useState([])
  const [quantity, setQuantity] = useState([])
  const [total, setTotal] = useState([])




  const [formValues, setFormValues] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    inventoryReportDetailCreateFormList: []
  })


  const [filterValues, setFilterValues] = useState({
    search: '',
    brandId: '',
    shoeTypeId: '',
    priority: '',
    minCreateDate: '',
    maxCreateDate: '',
  });
  const [formErrors, setFormErrors] = useState({
    totalPrice: '',
    supplier: '',
    supplierPhone: '',
    size: '',
    products: '',
    inventoryReportDetailCreateFormList: []
  });




  useEffect(() => {
    const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE)


    dispatch(getInventoryProducts(query))
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())

  }, [dispatch, filterValues, currentPage])




  const handleUnitPriceChange = (index, value) => {
    setUnitPrice(prev => {
      const newPrices = [...prev];
      newPrices[index] = value;
      return newPrices;
    });
  }

  const getPriceBySize = (product, size) => {
    const sizeInfo = product.shoeSizes.find(item => item.size === parseInt(size, 10));
    return sizeInfo ? sizeInfo.price : 0;
  };

  const handleQuantityChange = (index, value) => {

    const price = getPriceBySize(selectedProduct[index], selectedSize[index])

    const total = price * parseInt(value)

    selectedProduct.forEach((product, index) => {
      if (!selectedSize[index]) {
        setFormErrors({ ...formErrors, size: 'Bạn phải chọn size trước' })
      }
    })


    setTotal(prev => { 
      const newTotal = [...prev];
      newTotal[index] = total;
      return newTotal;
    });
    setQuantity(prev => {
      const newQuantities = [...prev];
      newQuantities[index] = value;
      return newQuantities;
    });
  }

  const handleSizeChange = (index, value) => {
    const price = getPriceBySize(selectedProduct[index], selectedSize[index])

    const total = price * parseInt(quantity[index])

    setTotal(prev => {
      const newTotal = [...prev];
      newTotal[index] = total;
      return newTotal;
    });


    setSelectedSize(prev => {
      const newSizes = [...prev];
      newSizes[index] = value;
      return newSizes;
    });
  }

  const handleProductOpen = () => {
    setProductOpen(!productOpen)
  }

  const validateForm = () => {
    let valid = true;
    let errors = {
      totalPrice: '',
      supplier: '',
      supplierPhone: '',
      size: '',
      products: '',
      inventoryReportDetailCreateFormList: []
    };


    if (!formValues.supplier) {
      errors.supplier = 'Nhà cung cấp không được để trống';
      valid = false;
    }

    if (!formValues.supplierPhone) {
      errors.supplierPhone = 'Số điện thoại nhà cung cấp không được để trống';
      valid = false;
    } else if (!/^\d{10,15}$/.test(formValues.supplierPhone)) {
      errors.supplierPhone = 'Số điện thoại không hợp lệ';
      valid = false;
    }

    if (selectedProduct.length === 0) {
      errors.products = 'Bạn phải chọn sản phẩm';
      valid = false;
    }

    selectedProduct.forEach((product, index) => {
      let productErrors = {
        unitPrice: '',
        quantity: '',
        total: ''
      };

      if (!unitPrice[index]) {
        productErrors.unitPrice = 'Đơn giá không được để trống';
        valid = false;
      } else if (isNaN(unitPrice[index]) || parseFloat(unitPrice[index]) <= 0) {
        productErrors.unitPrice = 'Đơn giá phải là số dương';
        valid = false;
      }

      if (!quantity[index]) {
        productErrors.quantity = 'Số lượng không được để trống';
        valid = false;
      } else if (isNaN(quantity[index]) || parseInt(quantity[index], 10) <= 0) {
        productErrors.quantity = 'Số lượng phải là số dương';
        valid = false;
      }



      errors.inventoryReportDetailCreateFormList[index] = productErrors;
    });

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const totalPrice = finalTotal()
    const newForm = new FormData()
    newForm.append('totalPrice', totalPrice)
    newForm.append('supplierPhone', formValues.supplierPhone)
    newForm.append('supplier', formValues.supplier)


    selectedProduct.forEach((product, index) => {
      newForm.append(`inventoryReportDetailCreateFormList[${index}].idShoeId`, product.shoeId)
      newForm.append(`inventoryReportDetailCreateFormList[${index}].idSize`, selectedSize[index])
      newForm.append(`inventoryReportDetailCreateFormList[${index}].quantity`, quantity[index])
      newForm.append(`inventoryReportDetailCreateFormList[${index}].unitPrice`, unitPrice[index])
      newForm.append(`inventoryReportDetailCreateFormList[${index}].total`, total[index])
    })



    dispatch(createInventoryReportApiThunk(newForm))
      .unwrap()
      .then(() => {
        toast.success('Thêm phiếu nhập kho thành công');

        location.reload()



      })
      .catch((error) => {
        toast.error(`Thêm phiếu nhập kho thất bại: ${error}`);

        console.error(error)
      });

  }

  const handleRemoveProduct = (index) => {

    const newSelectedProduct = [...selectedProduct];
    const newUnitPrice = [...unitPrice];
    const newQuantity = [...quantity];
    const newTotal = [...total];


    newSelectedProduct.splice(index, 1);
    newUnitPrice.splice(index, 1);
    newQuantity.splice(index, 1);
    newTotal.splice(index, 1);


    setSelectedProduct(newSelectedProduct);
    setUnitPrice(newUnitPrice);
    setQuantity(newQuantity);
    setTotal(newTotal);


  };


  const finalTotal = () => {
    const totalFinal = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return totalFinal;
  }











  return (
    <div className={open ? 'w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
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
          <div className='space-y-4 max-h-[40rem] pb-10' >

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplier">Nhà cung cấp</label>
              <input value={formValues.supplier} onChange={(e) => setFormValues({ ...formValues, supplier: e.target.value })} className='rounded-md' type="text" placeholder='Tên nhà cung cấp' />
              {formErrors.supplier && <p className='text-red-500 text-sm'>{formErrors.supplier}</p>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="supplierPhone">Số điện thoại nhà cung cấp</label>
              <input value={formValues.supplierPhone} onChange={(e) => setFormValues({ ...formValues, supplierPhone: e.target.value })} className='rounded-md' type="text" placeholder='Sdt' />
              {formErrors.supplierPhone && <p className='text-red-500 text-sm'>{formErrors.supplierPhone}</p>}
            </div>

            <div className='flex items-center justify-between'>
              <label className='font-semibold' htmlFor="product">Sản phẩm</label>
              <Tooltip title="Thêm sản phẩm">
                <IconButton onClick={() => setProductOpen(true)}>
                  <IoMdAdd size={20} />
                </IconButton>
              </Tooltip>
            </div>

            {
              selectedProduct.length === 0 && (
                <p className='text-center text-gray-500'>Chưa chọn sản phẩm</p>
              )
            }

            {selectedProduct.length > 0 && selectedProduct.map((product, index) => (
              <div key={index} className='space-y-4 border relative p-2 rounded-md'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleRemoveProduct}>
                  <CloseIcon className='text-2xl' />
                </button>



                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Tên sản phẩm</label>
                  <input type="text" className='rounded-md' value={product.shoeName} readOnly />

                </div>


                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Chọn size</label>

                  <select className='rounded-md' onChange={(e) => handleSizeChange(index, e.target.value)} >
                    <option value=""></option>
                    {product.shoeSizes.map((item) => (
                      <option value={item.size}>{item.size}</option>
                    ))}
                  </select>

                </div>








                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="unitPrice">đơn vị giá</label>
                  <input className='rounded-md' value={unitPrice[index] || ''} onChange={(e) => handleUnitPriceChange(index, e.target.value)} type="text" placeholder='Đơn vị giá' />
                  {formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                  <input className='rounded-md' value={quantity[index] || ''} onChange={(e) => handleQuantityChange(index, e.target.value)} type="number" min={0} placeholder='0' />
                  {formErrors.inventoryReportDetailCreateFormList[index]?.quantity && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.quantity}</p>}

                </div>
                {formErrors.size && <p className='text-red-500 text-sm'>{formErrors.size}</p>}

                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="total">Tổng</label>
                  <span>{total[index] ? total[index] : '0'} VNĐ</span>
                </div>

              </div>

            ))}


            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
              <span className='flex items-center gap-2'>
                {finalTotal()}
                VNĐ
              </span>
            </div>

            {formErrors.products && <p className='text-red-500 text-sm'>{formErrors.products}</p>}




            <button onClick={() => handleSubmit()} className='bg-blue-600 w-full text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Thêm phiếu Nhập</button>
          </div>
        </DialogContent>
      </div>

      <div>
        <ProductsSelectedIventory
          isOpen={productOpen}
          products={products.data.content}
          handleOpen={handleProductOpen}
          productTypes={shoetypes.data}
          filterValues={filterValues}
          onFilterSelect={setFilterValues}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ProductBrands={brands.data}
          selectedProducts={selectedProduct}
          setSelectedProducts={setSelectedProduct}

        />

      </div>
    </div>
  )
}

export default AddInventoryDialog