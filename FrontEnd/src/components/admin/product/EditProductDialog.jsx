import { Dialog, DialogContent, DialogTitle, selectClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Checkbox } from "@mui/material";
import { useDispatch } from 'react-redux';
import { createShoeSizes, postProducts } from '../../../reducers/productReducer/ProductsSlice';
import toast from 'react-hot-toast';
import AxiosAdmin from '../../../apis/AxiosAdmin';
import CloseIcon from '@mui/icons-material/Close';
import { unwrapResult } from '@reduxjs/toolkit';

const isNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};


const EditProductDialog = ({
  open,
  handleOpen,
  types,
  brands,
  colors,
  productId
}) => {
  if (!types || !brands || !colors || !productId) {
    return <div>loading...</div>;

  }


  const [productData, setProductData] = useState()




  const dispatch = useDispatch();

  const defaultBrandId = brands.length > 0 ? brands[0].brandId : '';
  const defaultShoeTypeId = types.length > 0 ? types[0].shoeTypeId : '';

  const [formValues, setFormValues] = useState({
    shoeName: '',
    status: true,
    description: '',
    priority: true,
    brandId: defaultBrandId,
    shoeTypeId: defaultShoeTypeId,
    shoeColors: [],
    shoeSizes: [],
    shoeImages: [],
  });

  const [isColorOpen, setIsColorOpen] = useState(false);

  const [colorSelected, setColorSelected] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [newSize, setNewSize] = useState({ size: '', price: '' });
  const [newImage, setNewImage] = useState(null);
  const [imagePriority, setImagePriority] = useState(null);
  const [checked, setChecked] = useState([])

  const [messageError, setMessageError] = useState({
    shoeName: '',
    shoeDescription: '',
    shoeColor: '',
    shoeSize: '',
    shoePrice: '',
    shoeImage: '',
    brandId: '',
    shoeTypeId: '',
    status: true,
  });

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await AxiosAdmin.get(`http://localhost:8080/Shoe/Admin/${productId}`);
        const data = response.data;
        setProductData(data);
        setFormValues({
          shoeName: data.shoeName,
          status: data.status,
          description: data.description,
          priority: data.priority,
          brandId: brands.filter(brand => brand.brandName === data.brand.name).id,
          shoeTypeId: types.filter(type => type.name === data.shoeType.shoeTypeName).id,
          shoeColors: data.shoeColors,
          shoeImages: data.shoeImages,
        })

        setChecked(data.shoeSizes.map(item => 'false'))


        setSizeSelected(data.shoeSizes)

        setColorSelected(data.shoeColor)
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct()

  }, [types, brands, colors, productId])

  console.log(formValues)
  console.log(productData)
  console.log(checked)



  const handleColorOpen = () => {
    setIsColorOpen(!isColorOpen);
  };

  const handleColorChange = (color) => {
    setColorSelected((prevSelected) => {
      if (prevSelected.includes(color)) {
        return prevSelected.filter((c) => c !== color);
      } else {
        return [...prevSelected, color];
      }
    });
  };

  const handleAddSize = async () => {
    const newForm = new FormData();
    newForm.append('size', newSize.size);
    newForm.append('price', newSize.price);

    try {
      const actionResult = await dispatch(createShoeSizes(productId, newForm));
      unwrapResult(actionResult);
      toast.success('Thêm size thành công');

      if (newSize.size && newSize.price) {
        setSizeSelected((prevSelected) => [...prevSelected, newSize]);
        setNewSize({ size: '', price: '' });
      }
    } catch (error) {
      toast.error(`Thêm size thất bại: ${error.message}`);
      console.error(error);
    }
  };


  const removeColorSelected = (color) => {
    setColorSelected(prevSelected => prevSelected.filter((c) => c !== color));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizeSelected];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setSizeSelected(updatedSizes);
  };

  const removeSizeSelected = (index) => {
    setSizeSelected(prevSelected => prevSelected.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const addImage = () => {
    if (newImage) {
      setFormValues((prevValues) => ({
        ...prevValues,
        shoeImages: [
          ...prevValues.shoeImages,
          { shoeImage: newImage, priority: prevValues.shoeImages.length === 0 }
        ]
      }));
      setNewImage(null);
      setImagePriority(null);
    }
  };

  const removeImage = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      shoeImages: prevValues.shoeImages.filter((_, i) => i !== index)
    }));
  };

  const handleSetThumbnail = (index) => {
    setFormValues((prevValues) => {
      const updatedImages = prevValues.shoeImages.map((img, i) => ({
        ...img,
        priority: i === index
      }));
      return {
        ...prevValues,
        shoeImages: updatedImages
      };
    });
    setImagePriority(index);
  };


  const handleSubmit = () => {
    let isValid = true;

    console.log(formValues)


    if (!formValues.shoeName) {
      setMessageError(prev => ({ ...prev, shoeName: 'Vui lòng nhập tên sản phẩm', status: true }));

    } else {
      setMessageError(prev => ({ ...prev, shoeName: '', status: false }));
    }


    if (!formValues.description) {
      setMessageError(prev => ({ ...prev, shoeDescription: 'Vui lòng nhập mô tả sản phẩm', status: true }));

    } else {
      setMessageError(prev => ({ ...prev, shoeDescription: '', status: false }));
    }


    if (colorSelected.length <= 0) {
      setMessageError(prev => ({ ...prev, shoeColor: 'Vui lòng chọn màu sản phẩm', status: true }));

    } else {
      setMessageError(prev => ({ ...prev, shoeColor: '', status: false }));
    }


    if (formValues.shoeImages.length === 0) {
      setMessageError(prev => ({ ...prev, shoeImage: 'Vui lòng chọn ít nhất 1 ảnh cho sản phẩm', status: true }));

    } else {
      setMessageError(prev => ({ ...prev, shoeImage: '', status: false }));
    }

    if (formValues.brandId === '') {
      setMessageError(prev => ({ ...prev, brandId: 'Vui lòng chọn thương hiệu sản phẩm', status: true }));
    } else {
      setMessageError(prev => ({ ...prev, brandId: '', status: false }));
    }

    if (formValues.shoeTypeId === '') {
      setMessageError(prev => ({ ...prev, shoeTypeId: 'Vui lòng chọn loại giày sản phẩm', status: true }));
    } else {
      setMessageError(prev => ({ ...prev, shoeTypeId: '', status: false }));
    }


    const priceValue = document.getElementById('price').value;
    const sizeValue = document.getElementById('size').value;



    if (sizeSelected.length <= 0 && priceValue === '') {
      setMessageError(prev => ({ ...prev, shoePrice: 'Vui lòng nhập giá sản phẩm', status: true }));
    }
    else if (sizeSelected.length <= 0 && !isNumber(priceValue)) {
      setMessageError(prev => ({ ...prev, shoePrice: 'Giá phải là số', status: true }));
    } else {
      setMessageError(prev => ({ ...prev, shoePrice: '', status: false }));
    }

    if (sizeSelected.length <= 0 && sizeValue === '') {
      setMessageError(prev => ({ ...prev, shoeSize: 'Vui lòng nhập kích thước sản phẩm', status: true }));

    } else {
      setMessageError(prev => ({ ...prev, shoeSize: '', status: false }));
    }

    if (!messageError.status) {
      console.log(formValues)
      console.log(sizeSelected)
      console.log(colorSelected)

      const newForm = new FormData()
      newForm.append('shoeName', formValues.shoeName)
      newForm.append('status', formValues.status)
      newForm.append('description', formValues.description)
      newForm.append('priority', formValues.priority)
      newForm.append('brandId', formValues.brandId)
      newForm.append('shoeTypeId', formValues.shoeTypeId)
      colorSelected.map((color, index) => {
        newForm.append(`shoeColors[${index}].colorId`, color.id)
      })
      sizeSelected.map((size, index) => {
        newForm.append(`shoeSizes[${index}].size`, size.size)
        newForm.append(`shoeSizes[${index}].price`, size.price)
      })
      formValues.shoeImages.forEach((image, index) => {
        newForm.append(`shoeImages[${index}].shoeImage`, new File(image.shoeImage));
        newForm.append(`shoeImages[${index}].priority`, image.priority);
      });


      newForm.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      })


      dispatch(postProducts(newForm))
        .unwrap()
        .then(() => {
          toast.success('Thêm sản phẩm thành công');



        })
        .catch((error) => {
          toast.error(`Thêm sản phẩm thất bại: ${error}`);

          console.error(error)
        });





    }






  };


  console.log(colorSelected)
  console.log(sizeSelected)



  const handleRenderFile = (file) => {

    if (file) {
      const url = URL.createObjectURL(file);

      if (url) {
        return url;
      } else {
        return `http://localhost:8080/ShoeImage/Image/${file}`
      }



    }
  };


  const handleChangeIitemSize = ({ index, valueSize, valuePrice }) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = true;
      return newChecked;
    });

    setSizeSelected((prevSizes) => {
      const newSizes = [...prevSizes];
      if (valueSize !== undefined) {
        newSizes[index].size = valueSize;
      }
      if (valuePrice !== undefined) {
        newSizes[index].price = valuePrice;
      }
      return newSizes;
    });


  };


  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className='w-[35rem] relative'>
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className='text-center'>
          Sửa sản phẩm
        </DialogTitle>

        <DialogContent>
          <div className='space-y-4'>
            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="name">Tên sản phẩm mới</label>
              <input
                id="name"
                className='rounded-md'
                type="text"
                placeholder='Nhập tên sản phẩm'
                value={formValues.shoeName}
                onChange={(e) => setFormValues({ ...formValues, shoeName: e.target.value })}
              />
              {messageError.shoeName && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeName}</span>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="status">Trạng thái</label>
              <select
                id="status"
                className='rounded-md'
                value={formValues.status}
                onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
              >
                <option value="true">Còn</option>
                <option value="false">Hết</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="description">Mô tả sản phẩm</label>
              <input
                id="description"
                className='rounded-md'
                type="text"
                placeholder='Mô tả'
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
              />

              {messageError.shoeDescription && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeDescription}</span>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="priority">Ưu tiên</label>
              <select
                id="priority"
                className='rounded-md'
                value={formValues.priority}
                onChange={(e) => setFormValues({ ...formValues, priority: e.target.value })}
              >
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="brandId">Thương hiệu</label>
              <select
                id="brandId"
                className='rounded-md'
                value={formValues.brandId}
                onChange={(e) => setFormValues({ ...formValues, brandId: e.target.value })}
              >
                <option value="">Chọn thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="shoeTypeId">Loại</label>
              <select
                id="shoeTypeId"
                className='rounded-md'
                value={formValues.shoeTypeId}
                onChange={(e) => setFormValues({ ...formValues, shoeTypeId: e.target.value })}
              >
                <option value="">Chọn loại</option>
                {types.map((type) => (
                  <option key={type.shoeTypeId} value={type.shoeTypeId}>{type.shoeTypeName}</option>
                ))}
              </select>
            </div>

            {/* màu */}

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
                          <button
                            className='bg-rose-500 cursor-pointer text-white rounded-[5px]'
                            onClick={() => removeColorSelected(color)}
                          >
                            <IoMdClose size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button>
                    {isColorOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>

                {isColorOpen && (
                  <div className='w-full border-t-2 mt-1'>
                    <div className='flex flex-col gap-2'>
                      {colors.map((color) => (
                        <div key={color.colorId} className='flex items-center gap-2'>
                          <Checkbox
                            id={color.colorId}
                            checked={colorSelected.includes(color)}
                            onChange={() => handleColorChange(color)}
                          />
                          <label>{color.colorName}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {messageError.shoeColor && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeColor}</span>}
            </div>

            {/* size */}

            {sizeSelected.length > 0 && (
              <div className='space-y-4'>
                {sizeSelected.map((item, index) => (
                  <div key={index} className='relative flex flex-col gap-4 p-4 border rounded-md '>

                    <button className='absolute top-0 right-0 text-white bg-rose-500 hover:bg-rose-700 rounded-md' onClick={() => removeSizeSelected(index)}>
                      <IoMdClose size={18} />
                    </button>

                    <label className='font-semibold'>Size {index + 1}</label>
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) => handleChangeIitemSize({ index, valueSize: e.target.value })}
                      className='rounded-md'

                    />
                    <label className='font-semibold'>Giá {index + 1}</label>
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => handleChangeIitemSize({ index, valuePrice: e.target.value })}
                      className='rounded-md'

                    />

                    {checked[index] && (
                      <button
                        onClick={() => {
                          setChecked((prevChecked) => {
                            const newChecked = [...prevChecked];
                            newChecked[index] = false;
                            return newChecked;
                          });
                          // Thực hiện các thao tác lưu dữ liệu tại đây nếu cần
                        }}
                      >
                        Lưu
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}


            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold' htmlFor="size">Size</label>
                <input
                  id="size"
                  type="text"
                  placeholder='Nhập size'
                  value={newSize.size}
                  onChange={(e) => {

                    setNewSize({ ...newSize, size: e.target.value })
                  }}
                  className='rounded-md'
                />

                {messageError.shoeSize && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeSize}</span>}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='font-semibold' htmlFor="price">Giá</label>
                <input
                  id="price"
                  type="text"
                  placeholder='Nhập giá VNĐ'
                  value={newSize.price}
                  onChange={(e) => {


                    setNewSize({ ...newSize, price: e.target.value })

                  }}
                  className='rounded-md'
                />


                {messageError.shoePrice && <span className='text-xs font-semibold text-rose-500'>{messageError.shoePrice}</span>}
              </div>
            </div>
            <button onClick={handleAddSize} className='px-4 py-2 bg-blue-600 text-white rounded-md'>
              Thêm size
            </button>

            {/* ảnh */}

            <div className='flex flex-col gap-2'>
              <label className='font-semibold' htmlFor="shoeImages">Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className='mb-2'
              />
              {newImage && (
                <div className='mb-2'>
                  <img src={handleRenderFile(newImage)} alt="Preview" className='w-32 h-32 object-cover' />
                  <div className='flex items-center gap-2 mt-2'>

                    <button
                      onClick={addImage}
                      className='px-4 py-2 bg-blue-600 text-white rounded-md'
                    >
                      Thêm ảnh

                    </button>
                  </div>
                </div>
              )}
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

                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity'>
                          <button
                            onClick={() => removeImage(index)}
                            className='px-2 py-1 bg-red-600 text-[10px] text-white rounded-md mr-2'
                          >
                            Xóa
                          </button>
                          {!image.priority && (
                            <button
                              onClick={() => handleSetThumbnail(index)}
                              className='px-2 py-1 text-[10px] bg-green-600 text-white rounded-md'
                            >
                              Đặt làm thumbnail
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {messageError.shoeImage && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeImage}</span>}



            <button onClick={handleSubmit} className='bg-blue-600 w-full px-4 py-2 rounded-md text-white hover:bg-blue-700 transition'>
              Lưu
            </button>

          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default EditProductDialog;
