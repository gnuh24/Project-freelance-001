

import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import AxiosAdmin from '../../../apis/AxiosAdmin';
const ViewInventoryDialog = ({
    open,
    handleOpen,
    inventoryId
}) => {

    if (!inventoryId) {
        return null;
    }
    const [currentInventoryData, setCurrentInventoryData] = useState()

    useEffect(() => {


        const fetchCurrentInventory = async () => {
            try {
                const response = await AxiosAdmin.get(`http://localhost:8080/InventoryReport/${inventoryId}`)
                console.log(response.data);

                setCurrentInventoryData(response.data)

            } catch (error) {
                console.error(error);
            }
        }
        fetchCurrentInventory()


    }, [inventoryId])
    return (
        <div className={open ? 'w-full h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}

        >

            {currentInventoryData && (

                <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto'>
                    <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                        <CloseIcon className='text-2xl' />
                    </button>
                    <DialogTitle className='text-center'>
                        Thông tin chi tiết phiếu nhập
                    </DialogTitle>

                    <DialogContent>
                        <div className='space-y-4 max-h-[40rem] pb-10' >
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor="totalPrice">Tổng giá</label>
                                <input readOnly value={currentInventoryData.totalPrice} type='text' className='rounded-md' />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor="supplier">Nhà cung cấp</label>
                                <input readOnly type='text' className='rounded-md' value={currentInventoryData.supplier} />

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold' htmlFor="supplierPhone">Số điện thoại nhà cung cấp</label>
                                <input readOnly type='text' className='rounded-md' value={currentInventoryData.supplierPhone} />

                            </div>





                            {currentInventoryData.inventoryReportDetails.length > 0 && currentInventoryData.inventoryReportDetails.map((product, index) => (
                                <div key={index} className='space-y-4'>
                                    <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={() => handleRemoveProduct(index)}>
                                        <CloseIcon className='text-2xl' />
                                    </button>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="name">Tên sản phẩm</label>
                                        <input readOnly type="text" className='rounded-md' value={product.shoeName} />

                                    </div>




                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="unitPrice">Size</label>
                                        <input readOnly value={product.size} className='rounded-md' type="text" />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="unitPrice">đơn vị giá</label>
                                        <input readOnly className='rounded-md' type='text' value={product.unitPrice} />

                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="quantity">Số lượng</label>
                                        <input readOnly className='rounded-md' type='text' value={product.quantity} />


                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="total">Tổng</label>
                                        <input readOnly className='rounded-md' type='text' value={product.total} />

                                    </div>



                                </div>

                            ))}

                            {currentInventoryData.inventoryReportStatuses.length > 0 && currentInventoryData.inventoryReportStatuses.map((item, index) => (
                                <div key={index}>
                                    <div className='flex flex-col gap-2 pb-4'>
                                        <label className='font-semibold' htmlFor="quantity">Cập nhập</label>
                                        <div className='flex flex-col gap-2'>
                                        <label>Thời gian</label>
                                        <span className='border px-4 py-2 rounded-md'>{item.updateTime}</span>

                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <label>Trạng thái</label>
                                        <span className='border px-4 py-2 rounded-md'>{item.status}</span>

                                        </div>

                                   


                                    </div>

                                </div>
                            ))}

                        </div>
                    </DialogContent>
                </div>
            )}


        </div>
    )
}

export default ViewInventoryDialog