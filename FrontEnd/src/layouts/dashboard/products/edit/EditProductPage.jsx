import { useProductTypesQuery } from "../../../../hook/useProductTypesQuery";
import { useProductBrandsQuery } from '../../../../hook/useProductBrandsQuery';
import { useProductColorsQuery } from "../../../../hook/useProductColorsQuery";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { LuLoader2 } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from "react";
import { ProductIdQuery } from '../components/ProductIdQuery.jsx'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosAdmin from "../../../../apis/AxiosAdmin.jsx";




export default function EditProductPage() {
    const { data: types, isLoading: isLoadingTypes, error: errorTypes } = useProductTypesQuery();
    const { data: brands, isLoading: isLoadingBrands, error: errorBrands } = useProductBrandsQuery();
    const { data: colors, isLoading: isLoadingColors, error: errorColors } = useProductColorsQuery();
    const params = useParams()
    const navigate = useNavigate()
    const { data: product, isLoading: isLoadingProduct, error: errorProduct } = ProductIdQuery(params?.id)


    console.log(product)
    if (errorProduct && !product) {
        return navigate('/dashboard/products')
    }
    const queryClient = useQueryClient()

    const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            name: '',
            description: '',
            priority: product?.priority ? product?.priority : 'true',
            status: product?.status ? product?.status : 'true',
            brandId: product?.brandId ? product?.brandId : '',
            shoeTypeId: product?.shoeTypeId ? product?.shoeTypeId : '',
            colorIds: [],
            sizes: [{ size: '', price: '' }],
            imageFiles: []
        }
    });


    useEffect(() => {
        if (product) {
            setValue('name', product.shoeName);
            setValue('description', product.description);
            setValue('priority', product.priority);
            setValue('status', product.status);

            const brand = brands?.find(brand => brand.brandName === product.brand.brandName);
            if (brand) {
                setValue('brandId', brand.brandId);
            }

            const type = types?.find(type => type.shoeTypeName === product.shoeType.shoeTypeName);
            if (type) {
                setValue('shoeTypeId', type.shoeTypeId);
            }

            const selectedColorIds = product.shoeColors.map(color => {
                const foundColor = colors?.find(c => c.colorName === color.colorName);
                return foundColor ? foundColor.id : null;
            }).filter(Boolean);
            setValue('colorIds', selectedColorIds);

            const sizeData = product.shoeSizes.map(size => ({
                size: size.size,
                price: size.price
            }));
            setValue('sizes', sizeData);
        }
    }, [product, brands, types, colors]);

    const [thumbnail, setThumbnail] = useState(null);

    const colorIds = watch('colorIds');
    const sizes = watch('sizes');
    const imageFiles = watch('imageFiles').sort((a, b) => {
        if (a === thumbnail) {
            return -1
        }
        if (b === thumbnail) {
            return 1
        }
        return 0
    });

    const addSize = () => {
        setValue('sizes', [...sizes, { size: '', price: '' }]);
    };

    const removeSize = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setValue('sizes', updatedSizes);
    };


    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setValue('imageFiles', [...imageFiles, ...newFiles]);

        if (!thumbnail) {
            setThumbnail(newFiles[0]);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop })



    const removeImage = (index) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setValue('imageFiles', updatedFiles);
        if (thumbnail === imageFiles[index]) {
            setThumbnail(null);
        }
    };

    const setAsThumbnail = (file) => {
        setThumbnail(file);
    };

    const mutationPost = useMutation({
        mutationFn: (formData) => {
            return AxiosAdmin.post('/Shoe', formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success("Sản phẩm đã được thêm thành công.");
            navigate('/dashboard/products')
        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi thêm sản phẩm.");
        },
    });
    const mutationDelete = useMutation({
        mutationFn: (id) => {
            return AxiosAdmin.delete(`/Shoe/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success("Xóa ảnh thành công");
            navigate('/dashboard/products')
        },
        onError: (error) => {
            console.error("Error:", error);
            toast.error("Xóa ảnh thất bại");
        },
    });

    const onSubmit = (data) => {
        const formData = new FormData()
        if (data.name) {
            formData.append('shoeName', data.name)
        }
        if (data.description) {
            formData.append('description', data.description)
        }
        if (data.priority) {
            formData.append('priority', data.priority)
        }
        if (data.status) {
            formData.append('status', data.status)
        }
        if (data.brandId) {
            formData.append('brandId', data.brandId)
        }
        if (data.shoeTypeId) {
            formData.append('shoeTypeId', data.shoeTypeId)
        }
        data?.colorIds?.map((color, index) => {
            formData.append(`shoeColors[${index}].colorId`, color)
        })

        data?.sizes?.map((size, index) => {
            formData.append(`shoeSizes[${index}].size`, size.size)
            formData.append(`shoeSizes[${index}].price`, size.price)
        })
        data?.imageFiles?.map((file, index) => {
            formData.append(`shoeImages[${index}].shoeImage`, file);
            if (file === thumbnail) {
                formData.append(`shoeImages[${index}].priority`, 'true');
            } else {
                formData.append(`shoeImages[${index}].priority`, 'false');
            }
        })

        mutationPost.mutate(formData);
    };

    const onDeleteImage = (id) => {
        mutationDelete.mutate(id)
    }



    if (isLoadingBrands || isLoadingColors || isLoadingTypes || isLoadingProduct) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LuLoader2 size={30} className="animate-spin" />
            </div>
        )
    }

    if (errorBrands || errorColors || errorTypes) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h2>Some things went wrong! :(( </h2>
            </div>
        )
    }



    return (
        <div className="flex w-full h-auto bg-[#f6f8fa] p-4">
            {/* image area */}
            <div className="w-1/2 h-full p-4">
                <h2 className="text-lg font-semibold mb-4">Hình ảnh sản phẩm</h2>

                {/* Hiển thị thumbnail */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {imageFiles.map((file, index) => (
                        <div key={index} className={`relative`}>
                            {/* Khung hình vuông với tỉ lệ 1:1 */}
                            {thumbnail === file ? (
                                <div className='border-gray-300 w-full rounded-md flex items-center justify-center cursor-pointer relative group'>
                                    <div className="w-full aspect-square overflow-hidden relative">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                                            alt={`Thumbnail ${index}`}
                                            className="object-cover w-full h-full rounded-sm shadow-2xl"
                                        />

                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-white text-lg font-semibold">Ảnh mặc định</span>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <div>
                                    <div className="w-full aspect-square overflow-hidden relative">
                                        <img src={file.preview} alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                    </div>
                                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-rose-500 flex items-center justify-center p-1 rounded-sm shadow-lg">
                                        <IoMdClose size={16} className="text-white" />
                                    </button>
                                    <button type="button" onClick={() => setAsThumbnail(file)} className={`absolute bottom-1 right-1 ${'bg-white text-blue-500'}`}>
                                        Đặt làm thumbnail
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}

                    {
                        product.shoeImages && product.shoeImages.sort((a, b) => { if (a.priority) { return -1 } if (b.priority) { return 1 } return 0 }).map((image, index) => (
                            <div key={index} className={`relative`}>
                                {image.priority ? (
                                    <div className='border-gray-300 w-full rounded-md flex items-center justify-center cursor-pointer' >
                                        <div className="w-full aspect-square overflow-hidden relative">
                                            <img src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                                                alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-full aspect-square overflow-hidden relative">
                                            <img src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                                                alt={`Thumbnail ${index}`} className="object-cover w-full h-full rounded-sm shadow-2xl" />
                                        </div>
                                        <button type="button" onClick={() => onDeleteImage(image.shoeImageId)} className="absolute top-1 right-1 bg-rose-500 flex items-center justify-center p-1 rounded-sm shadow-lg">
                                            <IoMdClose size={16} className="text-white" />
                                        </button>
                                        <button type="button" onClick={() => setAsThumbnail(file)} className={`absolute bottom-1 right-1 ${'bg-white text-blue-500'}`}>
                                            Đặt làm thumbnail
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))
                    }

                    <div>

                        <div {...getRootProps({ className: ' w-full border-2 border-dashed border-gray-300 aspect-square rounded-md flex items-center justify-center cursor-pointer' })}>
                            <input {...getInputProps()} />
                            <span className="text-gray-400">Kéo và thả hình ảnh vào đây hoặc nhấp để tải lên</span>
                        </div>
                    </div>


                </div>

                <div
                    {...register('imageFiles', { required: "Ảnh không được để trống" })}
                >
                    {errors.imageFiles && (
                        <span className="text-red-500">{errors.imageFiles.message}</span>
                    )}
                </div>
            </div>


            {/* product info */}
            <div className="w-1/2 h-full p-4">
                <h2 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h2>
                <form className="bg-white rounded-md p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>

                    {/* field name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input
                            id="name"
                            placeholder="Tên..."
                            {...register('name', { required: 'Tên sản phẩm không được để trống' })}
                            type="text"
                            className={`mt-1 p-2 border rounded-md w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && (
                            <span className="text-red-500">{errors.name.message}</span>
                        )}
                    </div>

                    {/* field description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả sản phẩm</label>
                        <textarea
                            id="description"
                            placeholder="Mô tả..."
                            {...register('description', { required: 'Mô tả sản phẩm không được để trống' })}
                            className={`mt-1 p-2 border rounded-md w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.description && (
                            <span className="text-red-500">{errors.description.message}</span>
                        )}
                    </div>

                    {/* field priority */}
                    <div className='mb-4'>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Ưu tiên</label>
                        <select
                            id="priority"
                            className={`mt-1 p-2 border rounded-md w-full ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('priority')}
                        >
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                        </select>
                    </div>

                    {/* field status */}
                    <div className='mb-4'>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <select
                            id="status"
                            className={`mt-1 p-2 border rounded-md w-full ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('status')}
                        >
                            <option value="true">Hiển thị</option>
                            <option value="false">Ẩn</option>
                        </select>
                    </div>

                    {/* field brand */}
                    <div className='mb-4'>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Thương hiệu</label>
                        <select
                            id="brand"
                            className={`mt-1 p-2 border rounded-md w-full ${errors.brandId ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('brandId', { required: "Thương hiệu phải được lựa chọn" })}
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands && brands.map((brand) => (
                                <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                            ))}
                        </select>
                        {errors.brandId && (
                            <span className="text-red-500">{errors.brandId.message}</span>
                        )}
                    </div>

                    {/* field types */}
                    <div className='mb-4'>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loại</label>
                        <select
                            id="type"
                            className={`mt-1 p-2 border rounded-md w-full ${errors.shoeTypeId ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('shoeTypeId', { required: 'Loại giày phải được lựa chọn' })}
                        >
                            <option value="">Chọn loại</option>
                            {types && types.map((type) => (
                                <option key={type.shoeTypeId} value={type.shoeTypeId}>{type.shoeTypeName}</option>
                            ))}
                        </select>
                        {errors.shoeTypeId && (
                            <span className="text-red-500">{errors.shoeTypeId.message}</span>
                        )}
                    </div>

                    {/* field colors */}
                    <div className='mb-4'>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Màu sắc</label>
                        <Select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        border: 'none',
                                    },
                                }),
                            }}
                            className={`mt-1 border rounded-md w-full ${errors.colorIds ? 'border-red-500' : 'border-gray-300'}`}
                            label="Màu sắc"
                            {...register('colorIds', { required: "Màu sắc không được để trống" })}
                            options={colors?.map((color) => ({
                                value: color.id,
                                label: color.colorName
                            }))}
                            onChange={(selectedOptions) => {
                                const selectedColorIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                setValue('colorIds', selectedColorIds, {
                                    shouldValidate: true
                                });
                            }}
                            value={colorIds.map(id => ({ value: id, label: colors.find(color => color.id === id)?.colorName }))}
                            isMulti
                            isClearable
                        />
                        {errors.colorIds && (
                            <span className="text-red-500">{errors.colorIds.message || 'Màu sắc phải được chọn'}</span>
                        )}
                    </div>

                    {/* field sizes and prices */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kích thước và giá</label>
                        {sizes?.map((sizeItem, index) => (
                            <div key={index} className="flex mb-2 items-center">
                                <div className="w-full flex flex-col gap-2">
                                    <input
                                        placeholder="Size chỉ được nhập số"
                                        type="number"
                                        {...register(`sizes.${index}.size`, { required: 'Kích thước không được để trống' })}
                                        className={`mt-1 p-2 border rounded-md w-full ${errors.sizes?.[index]?.size ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.sizes?.[index]?.size && (
                                        <span className="text-red-500">{errors.sizes[index].size.message}</span>
                                    )}
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <input
                                        placeholder="Giá chỉ được nhập số"
                                        type="number"
                                        {...register(`sizes.${index}.price`, { required: 'Giá không được để trống' })}
                                        className={`mt-1 p-2 border rounded-md w-full ml-2 ${errors.sizes?.[index]?.price ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.sizes?.[index]?.price && (
                                        <span className="text-red-500">{errors.sizes[index].price.message}</span>
                                    )}

                                </div>
                                <div className="pl-4">
                                    <button type="button" onClick={() => removeSize(index)} className="w-8 h-8 rounded-sm flex items-center justify-center bg-red-600">
                                        <IoMdClose size={16} className="text-white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addSize} className="text-blue-600">Thêm kích thước</button>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Thêm sản phẩm</button>
                </form>
            </div>
        </div>
    );
}
