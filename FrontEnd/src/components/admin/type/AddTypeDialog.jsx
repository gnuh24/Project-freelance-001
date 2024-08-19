import { useDispatch } from 'react-redux';
import { postShoeTypeApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddTypeDialog = ({ open, handleOpen }) => {
  const dispatch = useDispatch();

  const [messageError, setMessageError] = useState({
    message: '',
    status: true
  });

  const handleSubmitShoeType = async (e) => {
    e.preventDefault();

    const shoeTypeName = e.target.shoeTypeName.value.trim();

    if (shoeTypeName === '') {
      setMessageError({ message: 'Tên loại mới không được để trống', status: true });

    } else {
      setMessageError({ message: '', status: false });
    }

    const newForm = new FormData();
    newForm.append('shoeTypeName', shoeTypeName);


    if (!messageError.status) {
      try {
        await dispatch(postShoeTypeApiThunk(newForm)).unwrap();
        toast.success('Thêm loại mới thành công');
        handleOpen();
        e.target.reset();

        location.reload();
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'Có lỗi xảy ra khi thêm loại mới');
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
          Add Shoe Type
        </DialogTitle>
        <DialogContent>
          <form className="space-y-5" onSubmit={handleSubmitShoeType}>
            <div className="flex flex-col gap-2">
              <label htmlFor="shoeTypeName" className="font-semibold">Tên loại sản phẩm</label>
              <input
                type="text"
                placeholder="Nhập tên loại"
                className="rounded-md"
                name="shoeTypeName"
              />
              {messageError.status && (
                <span className="text-rose-500 text-sm font-semibold">{messageError.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center hover:bg-blue-700 transition"
            >
              <span>Add Type</span>
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AddTypeDialog;
