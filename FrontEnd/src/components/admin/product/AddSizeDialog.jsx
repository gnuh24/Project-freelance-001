import React from 'react';
import { Form, useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CloseIcon from '@mui/icons-material/Close';
import AxiosAdmin from '../../../apis/AxiosAdmin';
import toast from 'react-hot-toast';
const AddSizeDialog = ({
    isOpen,
    onClose,
    productId,
    setSizeSelected
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
       
        const newForm = new FormData()
        newForm.append('size', data.size)
        newForm.append('price', data.price)
        try {
            const response = await AxiosAdmin.post(`http://localhost:8080/ShoeSize/${productId}`, newForm)
            const newSize  = {
                size: data.size,
                price: data.price,
                status: data.status,
                quantity: data.quantity
            }
            if(response.data){
                setSizeSelected((prevSelected) => [...prevSelected, newSize]);
                console.log(response.data);
                toast.success("Thêm size thành công")
            }
        } catch (error) {
            toast.error("Thêm size thất bại")
            console.error(error)
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className="overflow-hidden">
                <div className='relative w-[35rem] space-y-2 overflow-hidden'>
                    <button
                        className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
                        onClick={onClose}
                    >
                        <CloseIcon className="text-2xl" />
                    </button>
                    <DialogTitle className='text-center'>
                        Thêm size mới
                    </DialogTitle>

                    <form className="space-y-4 overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="size" className="font-semibold">Size</label>
                            <TextField
                                id="size"
                                variant="outlined"
                                placeholder="Nhập size"
                                {...register('size', { required: 'Size không được để trống' })}
                                error={!!errors.size}
                                helperText={errors.size?.message}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="font-semibold">Giá</label>
                            <TextField
                                id="price"
                                variant="outlined"
                                placeholder="Nhập giá"
                                {...register('price', { 
                                    required: 'Giá không được để trống',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Giá phải là số'
                                    }
                                })}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        </div>

                        <Button className='w-full' type="submit" variant="contained" color="primary">
                            Thêm
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddSizeDialog;
