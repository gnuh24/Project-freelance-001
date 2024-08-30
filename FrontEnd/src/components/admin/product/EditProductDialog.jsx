import { DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown, FaRegEdit, FaCheck, FaTrash, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Checkbox } from "@mui/material";
import { useDispatch } from 'react-redux';
import { createShoeSizes, deleteColor, patchProducts, patchProductSize, postColor, postImage, postProducts } from '../../../reducers/productReducer/ProductsSlice';
import toast from 'react-hot-toast';
import AxiosAdmin from '../../../apis/AxiosAdmin';
import CloseIcon from '@mui/icons-material/Close';
import { original, unwrapResult } from '@reduxjs/toolkit';
import ImageDialog from './ImageDialog';
import _ from "lodash"
import { MdAdd, MdOutlineCancel, MdPriorityHigh } from 'react-icons/md';
import AddSizeDialog from './AddSizeDialog';

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


  const dispatch = useDispatch();


  const [formValues, setFormValues] = useState({
    shoeName: '',
    status: true,
    description: '',
    priority: true,
    brandId: '',
    shoeTypeId: '',
    shoeColors: [],
    shoeSizes: [],
    shoeImages: [],
  });

  const [isColorOpen, setIsColorOpen] = useState(false);

  const [colorSelected, setColorSelected] = useState([]);
  const [isSubEdit, setIsSubEdit] = useState([]);
  const [sizeSelected, setSizeSelected] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [isAddSizeOpen, setIsAddSizeOpen] = useState(false)

  const [imagePriority, setImagePriority] = useState(null);
  const [originalData, setOriginalData] = useState()

  const [imageDialog, setImageDialog] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [imageId, setImageId] = useState('')

  const [messageError, setMessageError] = useState({
    shoeName: '',
    shoeDescription: '',
    shoeColor: '',
    shoeSize: '',
    shoePrice: '',
    shoeImage: '',
    brandId: '',
    shoeTypeId: '',
    defaultMessage: '',
    status: true,
  });

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const response = await AxiosAdmin.get(`http://localhost:8080/Shoe/Admin/${productId}`);
        const data = response.data;
        console.log(data)

        if (data) {
          setOriginalData(response.data)
          setFormValues({
            shoeName: data.shoeName,
            status: data.status,
            description: data.description,
            priority: data.priority,
            brandId: brands.filter(brand => _.isEqual(brand.brandName, data.brand.brandName))[0].brandId,
            shoeTypeId: types.filter(type => _.isEqual(type.shoeTypeName, data.shoeType.shoeTypeName))[0].shoeTypeId,
            shoeColors: data.shoeColors,
            shoeImages: data.shoeImages,
          })
          setIsSubEdit(data.shoeSizes.map((detail, index) => false));
          setSizeSelected(data.shoeSizes)
          setColorSelected(data.shoeColors ? data.shoeColors : [])

        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct()

  }, [types, brands, colors, productId])

  const handleColorOpen = () => {
    setIsColorOpen(!isColorOpen);
  };
  const handleImageDialog = () => {
    setImageDialog(!imageDialog);
  };

  const handleChecked = (array, object) => {
    const exists = array.some(item => _.isEqual(item.colorName, object.colorName));
    return exists
  }

  const handleColorChange = async (color) => {
    let deleteColor = false
    setColorSelected((prevSelected) => {
      if (handleChecked(prevSelected, color)) {
        deleteColor = true;
        return prevSelected.filter((c) => c.colorName !== color.colorName);
      } else {
        return [...prevSelected, color];
      }
    });

    const newForm = new FormData();
    newForm.append('colorId', color.id);
    newForm.append('shoeId', productId);


    if (deleteColor) {
      try {
        const response = await AxiosAdmin.delete('http://localhost:8080/ShoeColor', newForm);
        if (response) {
          toast.success('Xóa màu thành công');
        }
      } catch (error) {
        toast.error("Xoa màu thất bại");
      }
    }

    if (!deleteColor) {
      dispatch(postColor(newForm))
        .unwrap()
        .then(() => {
          toast.success('Chỉnh màu thành công');



        })
        .catch((error) => {
          toast.error(`Thêm màu thất bại: ${error}`);

          console.error(error)
        });

    }


  };

  const handleAddSize = async () => {
    const newForm = new FormData();
    newForm.append('size', newSize.size);
    newForm.append('price', newSize.price);

    try {
      const actionResult = dispatch(createShoeSizes(productId, newForm));
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


  const removeColorSelected = async (color) => {
    setColorSelected(prevSelected => prevSelected.filter((c) => c !== color));
    const newForm = new FormData()
    newForm.append('colorId', color.id);
    newForm.append('shoeId', productId)
    try {
      const response = await AxiosAdmin.delete('http://localhost:8080/ShoeColor', newForm);
      if (response) {
        toast.success('Xóa màu thành công');
      }
    } catch (error) {
      toast.error("Xoa màu thất bại");
    }
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

  const handleAddSizeOpen = () => {
    setIsAddSizeOpen(!isAddSizeOpen);
  }



  const addImage = async () => {

    const newForm = new FormData()
    newForm.append('shoeImage', newImage);
    newForm.append('priority', false);
    try {
      const response = await AxiosAdmin.post(`http://localhost:8080/ShoeImage/${productId}`, newForm)

      if (response.data) {
        setFormValues((prevValues) => ({
          ...prevValues,
          shoeImages: [
            ...prevValues.shoeImages,
            { ...response.data }
          ]
        }));
      }

      toast.success("Thêm ảnh thành công");
      setNewImage(null);
      setImagePriority(null);
    } catch (error) {
      toast.error("Thêm ảnh thất bại")
    }
  };

  const removeImage = (index) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      shoeImages: prevValues.shoeImages.filter((_, i) => i !== index)
    }));
  };

  const handleSetThumbnail = async (index) => {


    try {
      const newForm = new FormData()
      newForm.append('priority', true);
      const id = formValues.shoeImages[index].shoeImageId
      console.log(id)
      const response = await AxiosAdmin.patch(`http://localhost:8080/ShoeImage/${id}`, newForm)
      if (response.data) {
        toast.success("Đặt thumbnail thành công")
      }
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
    } catch (error) {
      console.log(error)
    }
  };


  const handleSubmit = async () => {
    let valid = true;


    console.log('formvalud', formValues)
    console.log('rootdata', originalData)


    if (!formValues.shoeName) {
      setMessageError(prev => ({ ...prev, shoeName: 'Vui lòng nhập tên sản phẩm', status: true }));
      valid = false;

    } else {
      setMessageError(prev => ({ ...prev, shoeName: '', status: false }));
    }


    if (!formValues.description) {
      setMessageError(prev => ({ ...prev, shoeDescription: 'Vui lòng nhập mô tả sản phẩm', status: true }));
      valid = false;

    } else {
      setMessageError(prev => ({ ...prev, shoeDescription: '', status: false }));
    }


    if (colorSelected.length <= 0) {
      setMessageError(prev => ({ ...prev, shoeColor: 'Vui lòng chọn màu sản phẩm', status: true }));
      valid = false;

    } else {
      setMessageError(prev => ({ ...prev, shoeColor: '', status: false }));
    }

    const brandId = brands.filter(brand => _.isEqual(brand.brandName, originalData.brand.brandName))[0].brandId
    const shoeTypeId = types.filter(type => _.isEqual(type.shoeTypeName, originalData.shoeType.shoeTypeName))[0].shoeTypeId

    if (formValues.shoeName === originalData.shoeName && formValues.description === originalData.description && formValues.brandId === brandId && formValues.shoeTypeId === shoeTypeId) {
      setMessageError(prev => ({ ...prev, status: true, defaultMessage: 'Bạn chưa thay đổi thông tin gì của sản phẩm' }));
      valid = false
    }

    if (valid) {



      const newForm = new FormData()
      newForm.append('shoeId', productId)
      newForm.append('shoeName', formValues.shoeName)
      newForm.append('status', formValues.status)
      newForm.append('description', formValues.description)
      newForm.append('priority', formValues.priority)
      newForm.append('brandId', formValues.brandId)
      newForm.append('shoeTypeId', formValues.shoeTypeId)

      try {
        const response = await AxiosAdmin.patch('http://localhost:8080/Shoe', newForm)
        if (response.data) {
          toast.success('Cập nhật sản phẩm thành công');
          location.reload()
        }
      } catch (error) {
        toast.error(`Cập nhật sản phẩm thất bại: ${error.message}`);
        console.error(error);
      }




      newForm.forEach((value, key) => {
        console.log(value, key)
      })


    }
  };





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


  const handleChangeIitemSize = ({ index, valuePrice, quantity, status }) => {

    console.log(originalData.shoeSizes)



    setSizeSelected((prevSizes) => {
      const newSizes = [...prevSizes];
      if (valuePrice !== undefined) {
        newSizes[index].price = valuePrice;
      }
      if (quantity !== undefined) {
        newSizes[index].quantity = quantity;
      }
      if (status !== undefined) {
        newSizes[index].status = status;
      }
      return newSizes;
    });


  };



  const handleEditToggle = async (index) => {
    const newSubEdit = Array(isSubEdit.length).fill(false);


    newSubEdit[index] = true;



    setIsSubEdit(newSubEdit);
  };

  const handleCancelEdit = (index) => {




    setIsSubEdit(prev => {
      const newSubEdit = [...prev];
      newSubEdit[index] = !newSubEdit[index];
      return newSubEdit;
    });


  };


  const handleSaveEdit = async (index) => {


    let valid = true;


    if (sizeSelected.length <= 0) {
      setMessageError(prev => ({ ...prev, shoeSize: 'Chưa lấy được size', status: true }));
      valid = false;
    }
    else if (sizeSelected[index].price === '') {
      setMessageError(prev => ({ ...prev, shoePrice: 'Vui lòng nhập giá', status: true }));
      valid = false;
    } else {
      setMessageError(prev => ({ ...prev, shoePrice: '', status: false }));
    }

    if (sizeSelected[index].quantity === '') {
      setMessageError(prev => ({ ...prev, shoeQuantity: 'Vui lòng nhập số lượng', status: true }));
      valid = false;
    }
    else {
      setMessageError(prev => ({ ...prev, shoeQuantity: '', status: false }));
    }



    if (valid) {
      const newForm = new FormData()
      newForm.append('idSize', sizeSelected[index].size)
      newForm.append('price', sizeSelected[index].price)
      newForm.append('quantity', sizeSelected[index].quantity)
      newForm.append('status', sizeSelected[index].status)
      newForm.append('idShoeId', productId)

      newForm.forEach((value, key) => {
        console.log(key, value)
      })

      try {
        const response = await AxiosAdmin.patch(`http://localhost:8080/ShoeSize`, newForm)
        if (response.data) {
          toast.success('Cập nhật size thành công');
          setSizeSelected((prevSizes) => {
            const newSizes = [...prevSizes];
            newSizes[index] = { ...response.data };
            return newSizes;
          });


        }
      } catch (error) {
        toast.error(`Cập nhật size thất bại: ${error}`);
        console.error(error)
      }
    }

    setIsSubEdit(prev => {
      const newSubEdit = [...prev];
      newSubEdit[index] = false;
      return newSubEdit;
    });
  };






  return (
    <div className={open ? 'w-full h-full z-50 fixed left-0 top-0 flex items-center justify-center' : 'hidden'}>
      <div className=' md:w-[50rem] w-[30rem] relative bg-white shadow-md h-[720px] overflow-auto'>
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
              <label className='font-semibold' htmlFor="name">Tên sản phẩm</label>
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
                    <div key={1} className='flex items-center gap-2'>
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
                      {colors.map((color, index) => (
                        <div key={color.colorId} className='flex items-center gap-2'>
                          <Checkbox
                            id={color.colorId}
                            checked={handleChecked(colorSelected, color) ? true : false}
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

                <div className='flex items-center justify-between'>
                  <label className='font-semibold' >Sizes</label>
                  <Tooltip title="Thêm size mới">
                    <IconButton onClick={() => setIsAddSizeOpen(true)}>
                      <MdAdd />
                    </IconButton>
                  </Tooltip>
                </div>

                {sizeSelected.map((item, index) => (
                  <div key={index} className='relative flex flex-col gap-4 p-4 border rounded-md '>


                    <div className='flex items-center relative justify-end gap-2 '>
                      <button
                        className={`${isSubEdit[index] ? 'hidden' : 'flex'} top-1 right-1 bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition`}
                        onClick={() => handleEditToggle(index)}
                      >
                        <FaRegEdit size={16} />
                      </button>


                      <button
                        className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-rose-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition`}
                        onClick={() => handleCancelEdit(index)}
                      >
                        <MdOutlineCancel size={16} />
                      </button>
                      <button
                        className={`${isSubEdit[index] ? 'flex' : 'hidden'} top-1 right-1 bg-blue-600 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-blue-700 transition`}
                        onClick={() => handleSaveEdit(index)}
                      >
                        <FaCheck size={16} />
                      </button>


                    </div>

                    <label className='font-semibold'>Size {index + 1}</label>
                    <input
                      type="text"
                      value={item.size}

                      className='rounded-md'
                      readOnly

                    />

                    {messageError.shoeSize && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeSize}</span>}

                    <label className='font-semibold'>Giá {index + 1}</label>
                    <input
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e) => handleChangeIitemSize({ index, valuePrice: e.target.value })}
                      className='rounded-md'

                      readOnly={!isSubEdit[index]}

                    />
                    {messageError.shoePrice && <span className='text-xs font-semibold text-rose-500'>{messageError.shoePrice}</span>}
                    <div className='flex flex-col gap-2 rounded-md'>
                      <label >Trạng thái</label>

                      {isSubEdit[index] ? (
                        <select className='rounded-md' value={item.status} onChange={(e) => handleChangeIitemSize({ index, status: e.target.value })} >

                          <option value="true">Còn</option>
                          <option value="false">Hết</option>
                        </select>

                      ) : (

                        <input
                          type="text"
                          value={item.status ? 'Còn' : "Hết"}
                          className='rounded-md'
                          readOnly

                        />
                      )}
                    </div>

                    <label htmlFor="quantity">Số lượng</label>
                    <input type="text"
                      value={item.quantity}
                      onChange={(e) => handleChangeIitemSize({ index, quantity: e.target.value })}
                      className='rounded-md'
                      readOnly={!isSubEdit[index]}
                    />


                  </div>
                ))}
              </div>
            )}





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
                            onClick={() => { setCurrentUrl(image.path), setImageId(image.shoeImageId), setImageDialog(true) }}
                            className='px-2 py-1 text-[10px] bg-blue-600 text-white rounded-md'
                          >
                            <FaEdit size={15} />
                          </button>
                          {!image.priority && (
                            <button
                              onClick={() => handleSetThumbnail(index)}
                              className='px-2 py-1 text-[10px] bg-green-600 text-white rounded-md'
                            >
                              <MdPriorityHigh size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {messageError.shoeImage && <span className='text-xs font-semibold text-rose-500'>{messageError.shoeImage}</span>}



            {messageError.defaultMessage && <span className='text-xs font-semibold text-rose-500'>{messageError.defaultMessage}</span>}

            <button onClick={handleSubmit} className='bg-blue-600 w-full px-4 py-2 rounded-md text-white hover:bg-blue-700 transition'>
              Lưu
            </button>

          </div>
        </DialogContent>


        <div>

        </div>
      </div>

      <div>

        <ImageDialog
          open={imageDialog}
          handleOpen={handleImageDialog}
          url={currentUrl}
          onChangeUrl={setCurrentUrl}
          values={formValues}
          onChangeImage={setFormValues}
          imageId={imageId}
        />

        <AddSizeDialog
          isOpen={isAddSizeOpen}
          onClose={handleAddSizeOpen}
          productId={productId}
          setSizeSelected={setSizeSelected}
        />
      </div>


    </div>
  );
};

export default EditProductDialog;
