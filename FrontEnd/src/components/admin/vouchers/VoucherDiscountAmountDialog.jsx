import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import toast, { Toaster } from 'react-hot-toast';
const VoucherDiscountAmountDialog = ({
    isOpen,
    handleOpen,
    onChangeFilterValue
}) => {
    const [minDiscountAmount, setMinDiscountAmount] = useState(Number);
    const [maxDiscountAmount, setMaxDiscountAmount] = useState(Number);
    

    const onSubmit = () => {


        if(minDiscountAmount === '' && maxDiscountAmount === '') {
            toast.error('Vui lòng nhập giá để lọc');
            return;
        }else if(minDiscountAmount === ''){
            toast.error('Giá thấp không được để trống');
            return;
        }else if(maxDiscountAmount === ''){
            toast.error('Giá cao không được để trống');
            return;
        }
       
        if (minDiscountAmount && maxDiscountAmount && parseFloat(minDiscountAmount) > parseFloat(maxDiscountAmount)) {
            toast('Giá thấp không được lớn hơn giá cao');
            return;
        }

        onChangeFilterValue(prev => ({ ...prev, minDiscountAmount: minDiscountAmount, maxDiscountAmount: maxDiscountAmount }))

      
       
        console.log(minDiscountAmount, maxDiscountAmount)
    };


    

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpen}
            aria-describedby="alert-dialog-slide-description"
            className='relative'
        >
            <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                <CloseIcon className='text-2xl'/>
            </button>
            <DialogTitle className='text-center'>Lọc theo điều kiện giá giảm cho sản phẩm</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex items-center gap-2 '>
                        <input
                            type="number"
                            className='rounded-md'
                            step={1000}
                            value={minDiscountAmount}
                            onChange={(e) => setMinDiscountAmount(e.target.value)}
                        />
                        <span className='text-black font-semibold'>VNĐ</span>
                    </div>
                    đến
                    <div className='flex items-center gap-2 '>
                        <input
                            type="number"
                            className='rounded-md'
                            value={maxDiscountAmount}
                            onChange={(e) => setMaxDiscountAmount(e.target.value)}
                        />
                        <span className='text-black font-semibold'>VNĐ</span>
                    </div>
                </div>

                

                <button
                    className='w-full py-2 bg-[#6b7280] rounded-md text-white hover:bg-[#818589] transition'
                    onClick={onSubmit}
                >
                    Lọc
                </button>
                
            </DialogContent>
        </Dialog>
    );
}

export default VoucherDiscountAmountDialog;
