import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editVoucher } from '../../../reducers/voucherReducer/VoucherSlice'; 
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditVoucherDialog = ({ isOpen, handleOpen, data }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    title: '',
    code: '',
    expirationTime: '',
    condition: 0,
    discountAmount: 0,
    isFreeShip: false,
    status: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      let formattedExpirationTime = '';
      if (data.expirationTime) {
        const parsedDate = new Date(data.expirationTime);
        if (!isNaN(parsedDate.getTime())) { 
          formattedExpirationTime = parsedDate.toISOString().slice(0, 16); 
        }
      }

      setFormValues({
        title: data.title || '',
        code: data.code || '',
        expirationTime: formattedExpirationTime,
        condition: data.condition || 0,
        discountAmount: data.discountAmount || 0,
        isFreeShip: data.isFreeShip || false,
        status: data.status || false,
      });
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.title.trim()) newErrors.title = 'Tiêu đề không được để trống';
    if (!formValues.code.trim()) newErrors.code = 'Mã giảm giá không được để trống';
    if (!formValues.expirationTime) newErrors.expirationTime = 'Thời gian hết hạn không được để trống';
    if (formValues.discountAmount <= 0) newErrors.discountAmount = 'Giá được giảm phải lớn hơn 0';
    if (formValues.isFreeShip === undefined) newErrors.isFreeShip = 'Phải chọn FreeShip';
    if (formValues.status === undefined) newErrors.status = 'Phải chọn trạng thái';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    formData.append('title', formValues.title);
    formData.append('code', formValues.code);
    formData.append('expirationTime', formValues.expirationTime);
    formData.append('condition', formValues.condition);
    formData.append('discountAmount', formValues.discountAmount);
    formData.append('isFreeShip', formValues.isFreeShip);
    formData.append('status', formValues.status);

    try {
      dispatch(editVoucher(formData));
      handleOpen(); 
      setErrors({}); 
    } catch (error) {
      console.error('Error editing voucher:', error);
    }
  };

  return (
    <div>
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
                <input type="datetime-local" name="expirationTime" value={formValues.expirationTime} onChange={handleChange} className='w-full rounded-md' />
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
                <label htmlFor="discountAmount">Gía được giảm</label>
                <div className='flex items-center justify-center gap-2 w-full'>
                  <input type="number" name="discountAmount" value={formValues.discountAmount} onChange={handleChange} className='w-full rounded-md' step={1000} min={0} placeholder='Gía được giảm...' />
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
              <div className='flex gap-4 items-center '>
                <label htmlFor="status">Trạng thái</label>
                <select name="status" value={formValues.status} onChange={handleChange} className='rounded-md'>
                  <option value={true}>Có</option>
                  <option value={false}>Không</option>
                </select>
                {errors.status && <p className='text-red-500'>{errors.status}</p>}
              </div>
              <button className='w-full py-2 bg-[#6b7280] rounded-md text-white hover:bg-[#818589] transition'>
                Cập nhật voucher
              </button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default EditVoucherDialog;
