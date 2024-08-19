import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import ImageUpload from './ImageUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { postBrandApiThunk } from '../../../reducers/productReducer/BrandSlice';
import toast from 'react-hot-toast';

const AddBrandDialog = ({ open, handleOpen }) => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        brandName: '',
        logo: null,
    });

    const [messageError, setMessageError] = useState({
        brandName: '',
        logo: '',
        status: true,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (formValues.brandName === '') {
            setMessageError((prevState) => ({
                ...prevState,
                brandName: 'Tên thương hiệu không được để trống',
                status: true,
            }));

        }
        if (formValues.logo === null) {
            setMessageError((prevState) => ({
                ...prevState,
                logo: 'Logo thương hiệu không được để trống',
                status: true,
            }));

        }

        if (formValues.logo) {
            const fileType = formValues.logo.name.split('.').pop()

            if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'GIF' && fileType !== 'BMP' && fileType !== 'SVG' && fileType !== 'WebP') {
                setMessageError((prevState) => ({
                    ...prevState,
                    logo: 'Chỉ chấp nhận định dạng của hình ảnh',
                    status: true,
                }));


            }

            if (file.size > 4 * 1024 * 1024) {
                setMessageError((prevState) => ({
                    ...prevState,
                    logo: 'File không được vượt quá 4mb',
                    status: true,
                }));
            }
        }

        if (!messageError.status) {
            const newForm = new FormData();
            newForm.append('brandName', formValues.brandName);
            newForm.append('logo', formValues.logo);

            dispatch(postBrandApiThunk(newForm))
                .unwrap()
                .then(() => {
                    toast.success('Brand added successfully!');

                    handleOpen();

                    window.location.reload();


                })
                .catch((error) => {
                    toast.error(`Failed to add brand: ${error}`);

                    console.error(error)
                });
        }
    };

    return (
        <Dialog open={open}>
            <div className='relative w-[35rem] space-y-2'>
                <button
                    className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition'
                    onClick={handleOpen}
                >
                    <CloseIcon className='text-2xl' />
                </button>
                <DialogTitle className='text-center'>
                    Thêm thương hiệu mới
                </DialogTitle>
                <DialogContent>
                    <form className='space-y-4' onSubmit={onSubmit}>
                        <div className='space-y-6'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="brandName" className='font-semibold'>Tên thương hiệu</label>
                                <input
                                    value={formValues.brandName}
                                    onChange={(e) => setFormValues({ ...formValues, brandName: e.target.value })}
                                    type="text"
                                    className='rounded-md w-full'
                                    placeholder='Nhập tên thương hiệu'
                                />
                                {messageError.brandName && <span className='text-rose-500 text-sm font-semibold'>{messageError.brandName}</span>}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="brandLogo" className='font-semibold'>Logo thương hiệu</label>
                                <div className='flex items-center justify-center'>

                                    
                                    <ImageUpload
                                        onChangeFormValues={setFormValues}
                                        formValues={formValues}
                                    />
                                </div>
                                {messageError.logo && <span className='text-rose-500 text-sm font-semibold'>{messageError.logo}</span>}
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white flex items-center justify-center px-4 py-2 rounded-lg">
                            Thêm
                        </button>
                    </form>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default AddBrandDialog;
