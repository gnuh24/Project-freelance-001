import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import toast, { Toaster } from 'react-hot-toast';
const VoucherConditionDialog = ({
    isOpen,
    handleOpen,
    onChangeFilterValue
}) => {
    const [minCondition, setMinCondition] = useState(Number);
    const [maxCondition, setMaxCondition] = useState(Number);
    

    const onSubmit = () => {


        if(minCondition === '' && maxCondition === '') {
            toast.error('Vui lòng nhập giá để lọc');
            return;
        }else if(minCondition === ''){
            toast.error('Giá thấp không được để trống');
            return;
        }else if(maxCondition === ''){
            toast.error('Giá cao không được để trống');
            return;
        }
       
        if (minCondition && maxCondition && parseFloat(minCondition) > parseFloat(maxCondition)) {
            toast('Giá thấp không được lớn hơn giá cao');
            return;
        }

        onChangeFilterValue(prev => ({ ...prev, minCondition: minCondition, maxCondition: maxCondition }))

      
       
        console.log(minCondition, maxCondition)
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
            <DialogTitle className='text-center'>Lọc theo điều kiện giá</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex items-center gap-2 '>
                        <input
                            type="number"
                            className='rounded-md'
                            step={1000}
                            value={minCondition}
                            onChange={(e) => setMinCondition(e.target.value)}
                        />
                        <span className='text-black font-semibold'>VNĐ</span>
                    </div>
                    đến
                    <div className='flex items-center gap-2 '>
                        <input
                            type="number"
                            className='rounded-md'
                            value={maxCondition}
                            onChange={(e) => setMaxCondition(e.target.value)}
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

export default VoucherConditionDialog;
