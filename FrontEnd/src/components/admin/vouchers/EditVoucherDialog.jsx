import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editVoucher } from '../../../reducers/voucherReducer/VoucherSlice';
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditVoucherDialog = ({ isOpen, handleOpen, data }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    title: data.title || '',
    code: data.code || '',
    expirationTime: data.expirationTime,
    condition: data.condition || 0,
    discountAmount: data.discountAmount || 0,
    isFreeShip: data.isFreeShip !== undefined ? data.isFreeShip : false,
    status: data.status !== undefined ? data.status : false,
  });

  const [errors, setErrors] = useState({});
  const textInputRef = useRef(null);

  const formatDateForInput = (dateString) => {
 
    const [time, date] = dateString.split(' '); 
    const [day, month, year] = date.split('/'); 
    const isoString = `${year}-${month}-${day}T${time}`; 
    
    const dateObject = new Date(isoString);
    if (isNaN(dateObject)) {
      throw new Error('Invalid date format');
    }
    
    return dateObject.toISOString().slice(0, 19); 
  };
  
  
  const validateForm = () => {
    const newErrors = {};

    if (!formValues.title.trim()) newErrors.title = 'Tiêu đề không được để trống';
    if (!formValues.code.trim()) newErrors.code = 'Mã giảm giá không được để trống';
    if (!formValues.expirationTime) newErrors.expirationTime = 'Thời gian hết hạn không được để trống';
    if (formValues.discountAmount <= 0) newErrors.discountAmount = 'Giá được giảm phải lớn hơn 0';
    if (formValues.isFreeShip === undefined) newErrors.isFreeShip = 'Phải chọn FreeShip';
    if (formValues.status === undefined) newErrors.status = 'Phải chọn trạng thái';

    if (formValues.title === data.title && formValues.code === data.code && formValues.condition === data.condition && formValues.expirationTime === data.expirationTime && formValues.isFreeShip === data.isFreeShip && formValues.status === data.status) newErrors.original = 'Bạn chưa thay đổi gì';


    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: name === 'expirationTime' ? value : value,
    }));
  };



  const handleDateBlur = (e) => {
    if (!e.currentTarget.value) {
      setIsDateInputMode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('voucherId', data.voucherId);
    if (formValues.title !== data.title) {
      formData.append('title', formValues.title);
    }
    if (formValues.code !== data.code) {
      formData.append('code', formValues.code);
    }
    if (formValues.expirationTime !== data.expirationTime) {
      formData.append('expirationTime', formValues.expirationTime);
    }
    if (formValues.condition !== data.condition) {
      formData.append('condition', formValues.condition);
    }
    if (formValues.discountAmount !== data.discountAmount) {
      formData.append('discountAmount', formValues.discountAmount);
    }
    if (formValues.isFreeShip !== data.isFreeShip) {
      formData.append('isFreeShip', formValues.isFreeShip);
    }
    if (formValues.status !== data.status) {
      formData.append('status', formValues.status);
    }

    formData.forEach((value, key) => {
      console.log(`Form data: ${key} = ${value}`);
    })

    dispatch(editVoucher(formData))
      .unwrap()
      .then(() => {
        toast.success('Sửa voucher thành công');
        handleOpen();
        setErrors({});
      })
      .catch((error) => {
        toast.error(`Sửa voucher thất bại ${error}`);

        console.error(error)
      });


  };



  console.log(formatDateForInput(formValues.expirationTime))

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
        <CloseIcon className='text-2xl' />
      </button>

      <div className='w-[35rem]'>
        <DialogTitle className='text-center font-semibold text-3xl'>Chỉnh sửa voucher</DialogTitle>
        <DialogContent className='space-y-2'>
          <form className='flex flex-col items-start gap-4' onSubmit={handleSubmit}>
            <div className='font-semibold flex flex-col gap-2 w-full'>
              <label htmlFor="title">Tiêu đề</label>
              <input type="text" name="title" value={formValues.title} onChange={handleChange} className='w-full rounded-md' />
              {errors.title && <p className='text-red-500'>{errors.title}</p>}
            </div>
            <div className='font-semibold flex flex-col gap-2 w-full'>
              <label htmlFor="code">Mã giảm giá</label>
              <input type="text" name="code" value={formValues.code} onChange={handleChange} className='w-full rounded-md' />
              {errors.code && <p className='text-red-500'>{errors.code}</p>}
            </div>
            <div className='font-semibold flex flex-col gap-2 w-full'>
              <label htmlFor="expirationTime">Thời gian hết hạn</label>
                <input
                  type="datetime-local"
                  name="expirationTime"
                  value={formatDateForInput(formValues.expirationTime)}
                  onChange={handleChange}
                  onBlur={handleDateBlur}
                  className='w-full rounded-md'
                  ref={textInputRef}
                />
              {errors.expirationTime && <p className='text-red-500'>{errors.expirationTime}</p>}
            </div>
            <div className='font-semibold flex flex-col gap-2 w-full'>
              <label htmlFor="condition">Điều kiện giảm giá</label>
              <div className='flex items-center justify-center gap-2 w-full'>
                <input type="number" name="condition" value={formValues.condition} onChange={handleChange} className='w-full rounded-md' step={1000} min={0} placeholder='Áp dụng cho đơn có giá từ...' />
                <span>VNĐ</span>
              </div>
              {errors.condition && <p className='text-red-500'>{errors.condition}</p>}
            </div>
            <div className='font-semibold flex flex-col gap-2 w-full'>
              <label htmlFor="discountAmount">Giá được giảm</label>
              <div className='flex items-center justify-center gap-2 w-full'>
                <input type="number" name="discountAmount" value={formValues.discountAmount} onChange={handleChange} className='w-full rounded-md' step={1000} min={0} placeholder='Giá được giảm...' />
                <span>VNĐ</span>
              </div>
              {errors.discountAmount && <p className='text-red-500'>{errors.discountAmount}</p>}
            </div>
            <div className='flex gap-4 items-center'>
              <label htmlFor="isFreeShip">FreeShip</label>
              <select name="isFreeShip" value={formValues.isFreeShip} onChange={handleChange} className='rounded-md'>
                <option value={true}>Có</option>
                <option value={false}>Không</option>
              </select>
              {errors.isFreeShip && <p className='text-red-500'>{errors.isFreeShip}</p>}
            </div>
            <div className='flex gap-4 items-center'>
              <label htmlFor="status">Trạng thái</label>
              <select name="status" value={formValues.status} onChange={handleChange} className='rounded-md'>
                <option value={true}>Có</option>
                <option value={false}>Không</option>
              </select>
              {errors.status && <p className='text-red-500'>{errors.status}</p>}
            </div>
            {errors.original && <p className='text-red-500'>{errors.original}</p>}
            <button className='w-full py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition'>
              Cập nhật voucher
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditVoucherDialog;
