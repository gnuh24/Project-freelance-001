import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const FilterByDateDialog = ({
    open,
    handleOpen,
    filterValues,
    onchangeFilter
}) => {
    const [minCreateDate, setMinDateCreate] = useState('');
    const [maxCreateDate, setMaxDateCreate] = useState('');
    const [messageError, setMessageError] = useState({
        message: '',
        status: true
    });

    const onClick = () => {
        if (!minCreateDate || !maxCreateDate) {
            setMessageError({
                message: 'Vui lòng nhập đầy đủ cả hai ngày.',
                status: false
            });
        } else if (new Date(minCreateDate) > new Date(maxCreateDate)) {
            setMessageError({
                message: 'Ngày bắt đầu không được lớn hơn ngày kết thúc.',
                status: false
            });
        } else {
            setMessageError({ message: '', status: true });
            onchangeFilter({ ...filterValues, minCreateDate, maxCreateDate });
        }
    };

    return (
        <Dialog open={open}>
            <div className="relative">
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>
                <DialogTitle className="text-center">
                    Lọc theo ngày
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-10 mt-4">
                        <div className='flex items-center gap-10'>
                            <div className='flex gap-2 items-center'>
                                <label htmlFor="">Từ ngày</label>
                                <input 
                                    type="date" 
                                    className="rounded-md" 
                                    onChange={(e) => setMinDateCreate(e.target.value)} 
                                    value={minCreateDate}
                                />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <label htmlFor="">Tới ngày</label>
                                <input 
                                    type="date" 
                                    className="rounded-md" 
                                    onChange={(e) => setMaxDateCreate(e.target.value)} 
                                    value={maxCreateDate}
                                />
                            </div>
                        </div>
                        {!messageError.status && (
                            <div className='text-red-500'>
                                {messageError.message}
                            </div>
                        )}
                        <button onClick={onClick} className='px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition '>
                            Lọc
                        </button>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default FilterByDateDialog;
