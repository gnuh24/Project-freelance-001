import { DialogContent } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../reducers/productReducer/ProductsSlice';
import { getShoeTypesNoPageApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice';
import { getBrandsNoPageApiThunk } from '../../../reducers/productReducer/BrandSlice';
import ProductsSelectedIventory from './ProductsSelectedIventory';
import SizeSelected from './SizeSelected';

import AxiosAdmin from '../../../apis/AxiosAdmin';
import _ from 'lodash'; 



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
const EditInventoryDialog = ({
    open,
    handleOpen,
    inventoryId
}) => {

    if (!inventoryId) {
        return null;
    }

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productOpen, setProductOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState([]);
    const [currentProductId, setCurrentProductId] = useState('');
    const [currentInventoryData, setCurrentInventoryData] = useState()

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
        theSame: '',
        inventoryReportDetailCreateFormList: []
    });




    useEffect(() => {

        const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE)


        dispatch(getProducts(query))
        dispatch(getShoeTypesNoPageApiThunk())
        dispatch(getBrandsNoPageApiThunk())
        const fetchCurrentInventory = async () => {
            try {
                const response = await AxiosAdmin.get(`http://localhost:8080/InventoryReport/${inventoryId}`)


                setCurrentInventoryData(response.data)
                setCurrentInventoryData(response.data)
                setFormValues({
                    totalPrice: response.data.totalPrice,
                    supplier: response.data.supplier,
                    supplierPhone: response.data.supplierPhone,

                })


                setSelectedProduct(response.data.inventoryReportDetails)
                const newUnitPrice = response.data.inventoryReportDetails.map(item => item.unitPrice)
                setUnitPrice(newUnitPrice)
                const newQuantity = response.data.inventoryReportDetails.map(item => item.quantity)
                setQuantity(newQuantity)
                const newTotal = response.data.inventoryReportDetails.map(item => item.total)
                setTotal(newTotal)





            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentInventory()


    }, [dispatch, filterValues, currentPage, inventoryId])



    const handleProductSelection = (selectedProducts) => {

        setSelectedProduct(selectedProducts);


    };
    const handleUnitPriceChange = (index, value) => {
        setUnitPrice(prev => {
            const newPrices = [...prev];
            newPrices[index] = value;
            return newPrices;
        });
    }

    const handleQuantityChange = (index, value) => {
        setQuantity(prev => {
            const newQuantities = [...prev];
            newQuantities[index] = value;
            return newQuantities;
        });
    }

    const handleTotalChange = (index, value) => {
        setTotal(prev => {
            const newTotals = [...prev];
            newTotals[index] = value;
            return newTotals;
        });
    }




    const handleProductOpen = () => {
        setProductOpen(!productOpen)
    }
    const handleSizeOpen = () => {
        setSizeOpen(!sizeOpen)
    }
 

    const validateForm = () => {
        let valid = true;
        let errors = {
            totalPrice: '',
            supplier: '',
            supplierPhone: '',
            theSame: '',
            inventoryReportDetailCreateFormList: []
        };
    
        if (!formValues.totalPrice) {
            errors.totalPrice = 'Tổng giá không được để trống';
            valid = false;
        } else if (isNaN(formValues.totalPrice) || parseFloat(formValues.totalPrice) <= 0) {
            errors.totalPrice = 'Tổng giá phải là số dương';
            valid = false;
        }
    
        if (!formValues.supplier) {
            errors.supplier = 'Nhà cung cấp không được để trống';
            valid = false;
        }
    
        if (!formValues.supplierPhone) {
            errors.supplierPhone = 'Số điện thoại nhà cung cấp không được để trống';
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
    
            if (!total[index]) {
                productErrors.total = 'Tổng không được để trống';
                valid = false;
            } else if (isNaN(total[index]) || parseFloat(total[index]) <= 0) {
                productErrors.total = 'Tổng phải là số dương';
                valid = false;
            }
    
            errors.inventoryReportDetailCreateFormList[index] = productErrors;
        });
    
        const oj1 = {
            totalPrice: formValues.totalPrice,
            supplier: formValues.supplier,
            supplierPhone: formValues.supplierPhone,
            inventoryReportDetailCreateFormList: selectedProduct.map((product, index) => ({
                idShoeId: product.shoeId,
                idSize: selectedSize[index],
                quantity: quantity[index],
                unitPrice: unitPrice[index],
                total: total[index]
            }))
        };
        const oj2 = {
            totalPrice: currentInventoryData.totalPrice,
            supplier: currentInventoryData.supplier,
            supplierPhone: currentInventoryData.supplierPhone,
            inventoryReportDetailCreateFormList: currentInventoryData.inventoryReportDetails.map(product => {
                return {
                    idShoeId: product.shoeId,
                    idSize: product.idSize,
                    quantity: product.quantity,
                    unitPrice: product.unitPrice,
                    total: product.total
                };
            })
        };
    
        // So sánh sâu
        if (_.isEqual(oj1, oj2)) {
            errors.theSame = 'Bạn chưa thay đổi gì';
            console.error('Chưa thay đổi gì');
            valid = false;
        }
    
        setFormErrors(errors);
        return valid;
    };
    

    const handleSubmit = () => {
         console.log(currentInventoryData)
        if (!validateForm()) {
            return;
        }

        const newForm = new FormData()
        newForm.append('totalPrice', formValues.totalPrice)
        newForm.append('supplierPhone', formValues.supplierPhone)
        newForm.append('supplier', formValues.supplier)

        selectedProduct.forEach((product, index) => {
            newForm.append(`inventoryReportDetailCreateFormList[${index}].idShoeId`, product.shoeId)
            newForm.append(`inventoryReportDetailCreateFormList[${index}].idSize`, selectedSize[index])
            newForm.append(`inventoryReportDetailCreateFormList[${index}].quantity`, quantity[index])
            newForm.append(`inventoryReportDetailCreateFormList[${index}].unitPrice`, unitPrice[index])
            newForm.append(`inventoryReportDetailCreateFormList[${index}].total`, total[index])
        })

      

        newForm.forEach((value, key) => {
            console.log(key, value)
        })


       

        // dispatch(createInventoryReportApiThunk(newForm))
        //     .unwrap()
        //     .then(() => {
        //         toast.success('Thêm phiếu nhập kho thành công');



        //     })
        //     .catch((error) => {
        //         toast.error(`Thêm phiếu nhập kho thất bại: ${error}`);

        //         console.error(error)
        //     });

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





    return (
        <div className={open ? 'w-full h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
           
        >
            <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>
                <DialogTitle className='text-center'>
                    Sửa phiếu nhập
                </DialogTitle>

                <DialogContent>
                    <div className='space-y-4 max-h-[40rem] pb-10' >
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
                            <input value={formValues.totalPrice} onChange={(e) => setFormValues({ ...formValues, totalPrice: e.target.value })} className='rounded-md' type="text" placeholder='Tổng giá' />
                            {formErrors.totalPrice && <p className='text-red-500 text-sm'>{formErrors.totalPrice}</p>}
                        </div>
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





                        {selectedProduct.length > 0 && selectedProduct.map((product, index) => (
                            <div key={index} className='space-y-4'>
                                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={() => handleRemoveProduct(index)}>
                                    <CloseIcon className='text-2xl' />
                                </button>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <input type="text" className='rounded-md' value={product.shoeName} readOnly />

                                </div>


                                <button className='bg-blue-600 px-4 text-white rounded-md py-2 hover:bg-blue-700 transition' onClick={() => { setCurrentProductId(product.shoeId), setSizeOpen(true) }}>Chọn size</button>

                                {selectedSize[index] && (
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="unitPrice">Size</label>
                                        <input value={selectedSize[index]} readOnly className='rounded-md' type="text" />
                                    </div>
                                )}
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="unitPrice">đơn vị giá</label>
                                    <input className='rounded-md' value={unitPrice[index] || ''} onChange={(e) => handleUnitPriceChange(index, e.target.value)} type="text" placeholder='Đơn vị giá' />
                                    {formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                                    <input className='rounded-md' value={quantity[index] || ''} onChange={(e) => handleQuantityChange(index, e.target.value)} type="text" placeholder='quantity' />
                                    {formErrors.inventoryReportDetailCreateFormList[index]?.quantity && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.quantity}</p>}

                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="total">Tổng</label>
                                    <input className='rounded-md' value={total[index] || ''} onChange={(e) => handleTotalChange(index, e.target.value)} type="text" placeholder='total' />
                                    {formErrors.inventoryReportDetailCreateFormList[index]?.total && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.total}</p>}
                                </div>

                            </div>

                        ))}
                        <button onClick={() => setProductOpen(true)} className='bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Thêm sản phẩm</button>

                        {formErrors.theSame && <p className='text-red-500 text-sm'>{formErrors.theSame}</p>}
                        <button onClick={() => handleSubmit()} className='bg-blue-600 w-full text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Lưu</button>
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

                <SizeSelected
                    open={sizeOpen}
                    handleOpen={handleSizeOpen}
                    shoeId={currentProductId}

                    setSizeSelected={setSelectedSize}
                />

            </div>
        </div>
    )
}

export default EditInventoryDialog