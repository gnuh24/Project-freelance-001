import { DialogContent } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { MdOutlineCancel } from "react-icons/md";
import "./style.css"
import AxiosAdmin from '../../../apis/AxiosAdmin';
import toast from 'react-hot-toast';



const EditInventoryDialog = ({
    open,
    handleOpen,
    inventory
}) => {

    if (!inventory) {
        return null;
    }
    const dispatch = useDispatch()

    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productOpen, setProductOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState([]);
    const [isSubEdit, setIsSubEdit] = useState([]);
    const [shoeSizes, setShoeSizes] = useState([]);
    const [unitPrice, setUnitPrice] = useState([])
    const [quantity, setQuantity] = useState([])
    const [total, setTotal] = useState([])
    const [originalData, setOriginalData] = useState([])

    const [formValues, setFormValues] = useState({
        totalPrice: '',
        supplier: '',
        supplierPhone: '',
        inventoryReportDetailCreateFormList: []
    })
    const [formErrors, setFormErrors] = useState({
        totalPrice: '',
        supplier: '',
        supplierPhone: '',
        size: '',
        products: '',
        inventoryReportDetailCreateFormList: []
    });

    

    useEffect(() => {


        if (inventory) {
            setSelectedProduct(inventory.inventoryReportDetails.map((detail) => ({
                shoeId: detail.shoeId,
                shoeName: detail.shoeName
            })));
            setIsSubEdit(inventory.inventoryReportDetails.map((detail, index) => false));


            setOriginalData(inventory.inventoryReportDetails.map((detail) => {
                return {
                    unitPrice: detail.unitPrice,
                    quantity: detail.quantity,
                    total: detail.total,
                }
            }))


            setUnitPrice(inventory.inventoryReportDetails.map(detail => detail.unitPrice));
            setQuantity(inventory.inventoryReportDetails.map(detail => detail.quantity));
            setTotal(inventory.inventoryReportDetails.map(detail => detail.total));
            setFormValues({
                totalPrice: inventory.totalPrice,
                supplier: inventory.supplier,
                supplierPhone: inventory.supplierPhone,
                inventoryReportDetailCreateFormList: inventory.inventoryReportDetails
            });
            setSelectedSize(inventory.inventoryReportDetails.map(detail => detail.size));
        }




    }, [dispatch, inventory])






    const handleUnitPriceChange = (index, value) => {
        setUnitPrice(prev => {
            const newPrices = [...prev];
            newPrices[index] = value;
            return newPrices;
        });
    }


    const handleQuantityChange = (index, value) => {

        const price = shoeSizes[index].filter(item => item.size === selectedSize[index])[0].price;


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

       

       

        setFormErrors(errors);
        return valid;
    };
    const validateFormDetail = () => {
        let valid = true;
        let errors = {
            totalPrice: '',
            supplier: '',
            supplierPhone: '',
            size: '',
            products: '',
            inventoryReportDetailCreateFormList: []
        };


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


    const handleSubmit = async () => {

        if (!validateForm()) {
            return;
        }

        const newForm = new FormData()
        newForm.append('totalPrice', formValues.totalPrice)
        newForm.append('supplierPhone', formValues.supplierPhone)
        newForm.append('supplier', formValues.supplier)
        newForm.append('id', inventory.id)


        
        try {
            const response = await AxiosAdmin.patch(`http://localhost:8080/InventoryReport`, newForm)
            if (response.data) {
                toast.success("Sửa thông tin phiếu nhập thành công")
                handleOpen()
            }

        } catch (error) {
            toast.error("Sửa thông tin phiếu nhập thất bại")
        }

       



        






    }
    const handleSizeChange = (index, value) => {
        const price = shoeSizes[index].filter(item => item.size === selectedSize[index])[0].price;


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


    const handleEditToggle = async (index) => {
        
        const newSubEdit = Array(isSubEdit.length).fill(false);

       
        newSubEdit[index] = true;

       
        const product = inventory.inventoryReportDetails[index];
        const response = await AxiosAdmin.get(`http://localhost:8080/ShoeSize/${product.shoeId}`);

        setShoeSizes(prev => {
            const newSize = [...prev];
            newSize[index] = response.data;
            return newSize;
        });

        setIsSubEdit(newSubEdit);
    };


    const handleSaveEdit = async (index) => {


        if (!validateFormDetail()) {
            return;
        }




        const newForm = new FormData()
        newForm.append('idInventoryReportId', inventory.id)
        newForm.append('idShoeId', selectedProduct[index].shoeId)
        newForm.append('idSize', selectedSize[index])
        newForm.append('quantity', quantity[index])
        newForm.append('unitPrice', unitPrice[index])
        newForm.append('total', total[index])




        try {
            const response = await AxiosAdmin.patch(`http://localhost:8080/InventoryReportDetail`, newForm)
            if (response.data) {
                toast.success("Sửa thông tin sản phẩm thành công")
            }

        } catch (error) {
            toast.error("Sửa thông tin sản phẩm thất bại")
        }




        setIsSubEdit(prev => {
            const newSubEdit = [...prev];
            newSubEdit[index] = false;
            return newSubEdit;
        });
    };


    const handleCancelEdit = (index) => {





        setQuantity(prev => {
            const newQuantities = [...prev];
            newQuantities[index] = originalData[index].quantity;
            return newQuantities;
        });


        setUnitPrice(prev => {
            const newUnitPrices = [...prev];
            newUnitPrices[index] = originalData[index].unitPrice;
            return newUnitPrices;
        })

        setTotal(prev => {
            const newTotal = [...prev];
            newTotal[index] = originalData[index].total;
            return newTotal
        })


        setIsSubEdit(prev => {
            const newSubEdit = [...prev];
            newSubEdit[index] = !newSubEdit[index];
            return newSubEdit;
        });





    };


    const finalTotal = () => {
        const totalFinal = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return totalFinal;
    }









    return (
        <div className={open ? 'w-full h-screen animation animate-dropdown fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}

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
                            <div key={index} className='space-y-4 border relative p-2 rounded-md'>

                                <div className='flex items-center relative justify-end gap-2 '>
                                    <button
                                        className={`${isSubEdit[index] ? 'hidden' : 'flex'} top-1 right-1 bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition`}
                                        onClick={() => handleEditToggle(index)}
                                    >
                                        <FaRegEdit size={16} />
                                    </button>


                                    <button
                                        className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-rose-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition`}
                                        onClick={() => handleCancelEdit(index)}
                                    >
                                        <MdOutlineCancel size={16} />
                                    </button>
                                    <button
                                        className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition`}
                                        onClick={() => handleSaveEdit(index)}
                                    >
                                        <FaCheck size={16} />
                                    </button>


                                </div>



                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="name">Tên sản phẩm</label>
                                    <input type="text" className='rounded-md' value={product.shoeName} readOnly />

                                </div>


                                {isSubEdit[index] ? (
                                    <div>
                                        {shoeSizes.length > 0 && (
                                            <select value={selectedSize[index]} className='rounded-md w-full' onChange={(e) => handleSizeChange(index, e.target.value)} >

                                                {shoeSizes[index].map((item) => (
                                                    <option value={item.size}>{item.size}</option>
                                                ))}
                                            </select>
                                        )}
                                    </div>

                                ) : (
                                    <input readOnly value={selectedSize[index]} className='rounded-md w-full' type='text' />
                                )}











                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="unitPrice">đơn vị giá</label>
                                    {
                                        isSubEdit[index] ? (
                                            <input className='rounded-md' value={unitPrice[index] || ''} onChange={(e) => handleUnitPriceChange(index, e.target.value)} type="text" placeholder='Đơn vị giá' />

                                        ) : (
                                            <input className='rounded-md' readOnly value={unitPrice[index] || ''} onChange={(e) => handleUnitPriceChange(index, e.target.value)} type="text" placeholder='Đơn vị giá' />

                                        )
                                    }
                                    {formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice && <p className='text-red-500 text-sm'>{formErrors.inventoryReportDetailCreateFormList[index]?.unitPrice}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                                    {isSubEdit[index] ? (
                                        <input className='rounded-md' value={quantity[index] || ''} onChange={(e) => handleQuantityChange(index, e.target.value)} type="number" min={0} placeholder='0' />

                                    ) : (
                                        <input className='rounded-md' readOnly value={quantity[index] || ''} onChange={(e) => handleQuantityChange(index, e.target.value)} type="number" min={0} placeholder='0' />

                                    )}
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

                        {formErrors.theSame && <p className='text-red-500 text-sm'>{formErrors.theSame}</p>}
                        <button onClick={() => handleSubmit()} className='bg-blue-600 w-full text-white rounded-md px-4 py-2 hover:bg-blue-700 transtion'>Lưu</button>
                    </div>
                </DialogContent>
            </div>


        </div>
    )
}

export default EditInventoryDialog