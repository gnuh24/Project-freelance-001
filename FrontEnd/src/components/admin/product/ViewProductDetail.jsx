import { Dialog, DialogContent, DialogTitle, Checkbox } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CloseIcon from '@mui/icons-material/Close';
import AxiosAdmin from '../../../apis/AxiosAdmin';

const ViewProductDetail = ({ open, handleOpen, productId, types = [], brands = [], colors = [] }) => {
  const [formValues, setFormValues] = useState({
    shoeName: '',
    status: true,
    description: '',
    priority: false,
    brand: '',
    shoeType: '',
    shoeColors: [],
    shoeSizes: [],
    shoeImages: [],
  });

  const [isColorOpen, setIsColorOpen] = useState(false);
  const [colorSelected, setColorSelected] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosAdmin.get(`http://localhost:8080/Shoe/Admin/${productId}`);
        const data = response.data;

        console.log(data)
      
      

        setFormValues({
          shoeName: data.shoeName || '',
          status: data.status || true,
          description: data.description || '',
          priority: data.priority || false,
          brand: data.brand,
          shoeType: data.shoeType,
          shoeColors: data.shoeColor ,
          shoeImages: data.shoeImages ,
        });

        setColorSelected(data.shoeColor || []);
        setSizeSelected(data.shoeSizes || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorOpen = () => {
    setIsColorOpen(!isColorOpen);
  };

  const handleRenderFile = (file) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return '';
  };

  



  return (
    <div className={open ? 'w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}
      
    >
      <div className='relative w-[30rem] md:w-[50rem] h-[650px] bg-white border rounded-md shadow-md  overflow-y-auto'>
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className='text-center'>
          Xem chi tiết sản phẩm
        </DialogTitle>

        <DialogContent>
          <div className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="name">Tên sản phẩm</label>
              <input
                id="name"
                className='rounded-md'
                type="text"
                value={formValues.shoeName}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="status">Trạng thái</label>
              <input
                id="status"
                className='rounded-md'
                type="text"
                value={formValues.status ? 'Hiển thị' : 'Ẩn'}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="description">Mô tả sản phẩm</label>
              <input
                id="description"
                className='rounded-md'
                type="text"
                value={formValues.description}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="priority">Ưu tiên</label>
              <input
                id="priority"
                className='rounded-md'
                type="text"
                value={formValues.priority ? 'Có' : 'Không'}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="brandId">Thương hiệu</label>
              <input
                id="brandId"
                className='rounded-md'
                type="text"
                value={formValues.brand.brandName}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="shoeTypeId">Loại</label>
              <input
                id="shoeTypeId"
                className='rounded-md'
                type="text"
                value={formValues.shoeType.shoeTypeName}
                readOnly
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="shoeColors">Màu sắc</label>
              <div className='flex flex-col gap-2 border border-black rounded-md px-4 py-2'>
                <div onClick={handleColorOpen} className='w-full cursor-pointer flex items-center justify-between'>
                  {colorSelected.length === 0 && 'Chọn màu sắc'}
                  {colorSelected.length > 0 && (
                    <div className='flex items-center gap-2'>
                      {colorSelected.map((color) => (
                        <div key={color.colorId} className='flex gap-2 items-center border rounded-md px-2 py-1'>
                          {color.colorName}
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>

               
              </div>
            </div>

            {sizeSelected.length > 0 && (
              <div className='space-y-4'>
                {sizeSelected.map((item, index) => (
                  <div key={index} className='relative flex flex-col gap-4 p-4 border rounded-md '>
                    <label className='font-semibold'>Size {index + 1}</label>
                    <input
                      type="text"
                      value={item.size}
                      className='rounded-md'
                      readOnly
                    />
                    <label htmlFor="status" className='font-semibold'>Trạng thái</label>
                    <input
                      type="text"
                      value={item.status}
                      className='rounded-md'
                      readOnly
                    />
                    <label htmlFor="status" className='font-semibold'>Số lượng</label>
                    <input
                      type="text"
                      value={item.quantity}
                      className='rounded-md'
                      readOnly
                    />
                    <label className='font-semibold'>Giá {index + 1}</label>
                    <input
                      type="text"
                      value={item.price}
                      className='rounded-md'
                      readOnly
                    />
                  </div>
                ))}
              </div>
            )}

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="shoeImages">Ảnh sản phẩm</label>
              {formValues.shoeImages.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {formValues.shoeImages
                    .sort((a, b) => b.priority - a.priority)
                    .map((image, index) => (
                      <div
                        key={index}
                        className='relative w-32 h-32'
                      >
                        <img src={`http://localhost:8080/ShoeImage/Image/${image.path}`} alt={`Product ${index}`} className='w-full h-full object-cover rounded-sm border border-zinc-300' />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </div>
    </div>
  );
};

export default ViewProductDetail;
