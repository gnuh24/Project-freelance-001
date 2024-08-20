import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { postColorApiThunk } from '../../../reducers/productReducer/ColorSlice';

const AddColorDialog = ({ open, handleOpen }) => {
  const dispatch = useDispatch();

  const [messageError, setMessageError] = useState({
    message: '',
    status: true
  });

  const handleSubmitShoeType = async (e) => {
    e.preventDefault();

    const colorName = e.target.colorName.value.trim();

    if (colorName === '') {
      setMessageError({ message: 'Tên màu không được để trống', status: true });

    } else {
      setMessageError({ message: '', status: false });
    }

    const newForm = new FormData();
    newForm.append('colorName', colorName);

    console.log(colorName)


    if (!messageError.status) {
      try {
        await dispatch(postColorApiThunk(newForm)).unwrap();
        toast.success('Thêm màu mới thành công');
        handleOpen();
        e.target.reset();

        location.reload();
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'Có lỗi xảy ra khi thêm màu mới');
      }

    }

  };

  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="relative w-[35rem]">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">
          Thêm màu mới
        </DialogTitle>
        <DialogContent>
          <form className="space-y-5" onSubmit={handleSubmitShoeType}>
            <div className="flex flex-col gap-2">
              <label htmlFor="colorName" className="font-semibold">Tên màu</label>
              <input
                type="text"
                placeholder="Nhập tên màu"
                className="rounded-md"
                name="colorName"
              />
              {messageError.status && (
                <span className="text-rose-500 text-sm font-semibold">{messageError.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center hover:bg-blue-700 transition"
            >
              <span>thêm</span>
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddColorDialog;
