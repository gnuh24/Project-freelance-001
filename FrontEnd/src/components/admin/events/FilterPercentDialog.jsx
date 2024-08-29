import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';


import '../style.css'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FilterPercentDialog = ({ isOpen, handleOpen, onChangeFilterValue }) => {
    const [minPercent, setMinPercent] = useState('');
    const [maxPercent, setMaxPercent] = useState('');

    const onSubmit = () => {
        if (minPercent === '' && maxPercent === '') {
            toast.error('Vui lòng nhập phần trăm để lọc');
            return;
        } else if(minPercent === ''){
            toast.error('Phần trăm thấp không được để trống');
            return;
        }
         else if (maxPercent === '') {
            toast.error('Phần trăm cao không được để trống');
            return;
        }

        if (parseFloat(minPercent) > parseFloat(maxPercent)) {
            toast.error('Phần trăm thấp không được lớn hơn phần trăm cao');
            return;
        }


        if(maxPercent !== '' && minPercent === ''){
            onChangeFilterValue(prev => ({
                ...prev,
                minPercent: parseFloat(0),
                maxPercent: parseFloat(maxPercent)
            }));
        }

        onChangeFilterValue(prev => ({
            ...prev,
            minPercent: parseFloat(minPercent),
            maxPercent: parseFloat(maxPercent)
        }));

        console.log(minPercent, maxPercent);
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
            <button
                className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition'
                onClick={handleOpen}
            >
                <CloseIcon className='text-2xl'/>
            </button>
            <DialogTitle className='text-center'>Lọc theo phần trăm giảm</DialogTitle>
            <DialogContent className='space-y-2'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex items-center gap-2'>
                        <input
                            type="number"
                            className='rounded-md no-spinner w-[10rem]'
                            min={0}
                            max={100}
                            placeholder='Nhập số 0 - 100'
                            value={minPercent}
                            onChange={(e) => setMinPercent(e.target.value)}
                        />
                        <span className='text-black font-semibold'>%</span>
                    </div>
                    đến
                    <div className='flex items-center gap-2'>
                        <input
                            type="number"
                            className='rounded-md no-spinner w-[10rem]'
                            placeholder='Nhập số 0 - 100'
                            
                            min={0}
                            max={100}
                            value={maxPercent}
                            onChange={(e) => setMaxPercent(e.target.value)}
                        />
                        <span className='text-black font-semibold'>%</span>
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

export default FilterPercentDialog;
