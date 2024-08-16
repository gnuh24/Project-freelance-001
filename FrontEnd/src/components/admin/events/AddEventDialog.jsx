import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import AxiosAdmin from "../../../apis/AxiosAdmin";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import ProductSelected from "./ProductSelected";
import { IoMdClose } from "react-icons/io";
import { addEvents } from "../../../reducers/eventReducer/EventSlice";

const builderQueryString = (filter, page, itemsPerPage) => {
    const params = new URLSearchParams();

    Object.entries({
        ...filter,
        pageNumber: page || '',
        pageSize: itemsPerPage || '',
    }).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    return params.toString();
}

const AddEventDialog = ({ isOpen, handleOpen }) => {

    const dispatch = useDispatch();
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [currentProductPage, setCurrentProductPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [productTypes, setProductsTypes] = useState([]);
    const [productBrand, setProductsBrand] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [validate, setValidate] = useState({
        eventName: '',
        banner: null,
        startTime: '',
        endTime: '',
        percentage: 0,
        saleCreateForm: '',
    })
    const [filterValues, setFilterValues] = useState({
        search: '',
        shoeTypeId: '',
        brandId: ''
    });
    const [formValues, setFormValues] = useState({
        eventName: '',
        banner: File || null,
        startTime: '',
        endTime: '',
        percentage: 0,
        saleCreateForm: [],
    });
    const [selectedFilter, setSelectedFilter] = useState({
        search: '',
        shoeTypeName: ''
    });

    useEffect(() => {
        const query = builderQueryString(filterValues, currentProductPage, 10);
        const fetchProducts = async () => {
            try {
                const responseProducts = await AxiosAdmin.get(`http://localhost:8080/Shoe/Admin?${query}`);
                const responseProductTypes = await AxiosAdmin.get(`http://localhost:8080/ShoeType/noPaging`);
                const responseBrand = await AxiosAdmin.get(`http://localhost:8080/Brand/noPaging`)
                setProducts(responseProducts.data.content);
                setTotalPages(responseProducts.data.totalPages);
                setProductsTypes(responseProductTypes.data);
                setProductsBrand(responseBrand.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [dispatch, filterValues, currentProductPage]);

    const onSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        let newValidate = {
            eventName: '',
            banner: '',
            startTime: '',
            endTime: '',
            percentage: '',
            saleCreateForm: '',
        };

    
        if (!formValues.eventName.trim()) {
            newValidate.eventName = 'Tên sự kiện không được để trống.';
            isValid = false;
        }

        if (!formValues.startTime) {
            newValidate.startTime = 'Thời gian bắt đầu không được để trống.';
            isValid = false;
        }

        if (!formValues.endTime) {
            newValidate.endTime = 'Thời gian kết thúc không được để trống.';
            isValid = false;
        }

        if (new Date(formValues.startTime) >= new Date(formValues.endTime)) {
            newValidate.endTime = 'Thời gian kết thúc phải sau thời gian bắt đầu.';
            isValid = false;
        }

        if (formValues.percentage < 0 || formValues.percentage > 100) {
            newValidate.percentage = 'Phần trăm giảm giá phải trong khoảng từ 0 đến 100.';
            isValid = false;
        }

        if (formValues.banner && !['image/jpeg', 'image/png'].includes(formValues.banner.type)) {
            newValidate.banner = 'Vui lòng chọn định dạng hình ảnh hợp lệ (JPEG hoặc PNG).';
            isValid = false;
        }

        if (!isValid) {
            setValidate(newValidate);
            return;
        }

        const formData = new FormData();
        formData.append('eventName', formValues.eventName);
        formData.append('banner', formValues.banner);
        formData.append('startTime', formValues.startTime);
        formData.append('endTime', formValues.endTime);
        formData.append('percentage', formValues.percentage);


        selectedProduct.forEach((product, index)=> {
           

            formData.append(`saleCreateForm[${index}].shoeId`, product.shoeId);
        })

     
        
        try {
            await AxiosAdmin.post('http://localhost:8080/Event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };



    const onSearchSubmit = (e) => {
        e.preventDefault();
        setSelectedFilter({
            ...selectedFilter,
            search: formValues.search
        });
    };

    const handleProductOpen = () => {
        setIsProductOpen(!isProductOpen);
    };

    const handleProductSelection = (selectedProducts) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            saleCreateForm: selectedProducts,
        }));
        setSelectedProduct(selectedProducts);
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProduct(prevSelectedProducts =>
            prevSelectedProducts.filter(product => product.shoeId !== productId)
        );
    };


    const filteredSelectedProducts = selectedProduct
        .filter(product =>
            String(product.shoeName).toLowerCase().includes(selectedFilter.search.toLowerCase()) &&
            (selectedFilter.shoeTypeName === '' || (product.shoeType && product.shoeType.shoeTypeName === selectedFilter.shoeTypeName))
        );










    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} w-full h-screen top-0 left-0`}>
            <div className={`flex w-full h-screen relative items-center justify-center`}>
                <div className="relative p-5 bg-white overflow-x-hidden border rounded-md shadow-2xl ">
                    <button
                        className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition'
                        onClick={() => handleOpen()}
                    >
                        <CloseIcon className='text-2xl' />
                    </button>

                    <h3 className="text-center font-semibold text-2xl">Thêm sự kiện mới</h3>
                    <div className=" border-b-[2px] border-zinc-700 mt-2" />

                    <div className="flex gap-0 overflow-x-hidden">
                        <div className="w-[35rem] p-5">
                            <h3 className="font-semibold text-lg text-center">Nhập thông tin sự kiện</h3>
                            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="eventName">Tên sự kiện</label>
                                    <input
                                        className={`rounded-md ${validate.eventName ? 'border-red-500' : ''}`}
                                        type="text"
                                        placeholder="Tên sự kiện"
                                        value={formValues.eventName}
                                        onChange={(e) => setFormValues({ ...formValues, eventName: e.target.value })}
                                    />
                                    {validate.eventName && <p className="text-red-500 text-sm">{validate.eventName}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="banner">Hình ảnh</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setFormValues({ ...formValues, banner: e.target.files[0] })}
                                    />
                                    {validate.banner && <p className="text-red-500 text-sm">{validate.banner}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="startTime">Thời gian bắt đầu</label>
                                    <input
                                        className={`rounded-md ${validate.startTime ? 'border-red-500' : ''}`}
                                        type="datetime-local"
                                        value={formValues.startTime}
                                        onChange={(e) => setFormValues({ ...formValues, startTime: e.target.value })}
                                    />
                                    {validate.startTime && <p className="text-red-500 text-sm">{validate.startTime}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="endTime">Thời gian kết thúc</label>
                                    <input
                                        className={`rounded-md ${validate.endTime ? 'border-red-500' : ''}`}
                                        type="datetime-local"
                                        value={formValues.endTime}
                                        onChange={(e) => setFormValues({ ...formValues, endTime: e.target.value })}
                                    />
                                    {validate.endTime && <p className="text-red-500 text-sm">{validate.endTime}</p>}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="percentage">Phần trăm giảm giá</label>
                                    <input
                                        className={`rounded-md ${validate.percentage ? 'border-red-500' : ''}`}
                                        type="number"
                                        min={0}
                                        value={formValues.percentage}
                                        onChange={(e) => setFormValues({ ...formValues, percentage: e.target.value })}
                                    />

                                </div>

                                <div>
                                    <button className='w-full py-2 bg-[#6b7280] rounded-md text-white hover:bg-[#818589] transition'>
                                        Thêm sự kiện
                                    </button>
                                </div>
                            </form>
                        </div>


                        <div className="w-[35rem] p-5 space-y-8">
                            <div className="flex items-center justify-center relative w-full ">
                                <h3 className="font-semibold text-lg text-center">Sản phẩm đã chọn</h3>
                                <div className="absolute right-0 top-0">
                                    <Tooltip title="Thêm sản phẩm mới" className="absolute right-0 -top-2">
                                        <IconButton onClick={() => setIsProductOpen(true)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="flex gap-2 justify-between items-center">
                                <form className="flex items-center justify-center gap-2" onSubmit={onSearchSubmit}>
                                    <input
                                        placeholder="Nhập tên sản phẩm"
                                        type="text"
                                        className="w-full rounded-md"
                                        value={formValues.search}
                                        onChange={(e) => setFormValues({ ...formValues, search: e.target.value })}
                                    />
                                    <button className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                        Tìm
                                    </button>
                                </form>

                                <div className="flex gap-2 items-center">
                                    <label htmlFor="shoType">Loại</label>
                                    <select
                                        name="shoeType"
                                        id="shoeType"
                                        className="rounded-md"
                                        onChange={(e) => setSelectedFilter({ ...selectedFilter, shoeTypeName: e.target.value })}
                                    >
                                        <option value="">Tất cả</option>
                                        {productTypes.length > 0 && productTypes.map((type) => (
                                            <option key={type.shoeTypeName} value={type.shoeTypeName}>
                                                {type.shoeTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-10">
                                {filteredSelectedProducts.length <= 0 && (
                                    <div className="flex flex-col gap-3 items-center justify-center">
                                        <span className="font-semibold text-zinc-400">
                                            Chưa có sản phẩm nào được chọn
                                        </span>
                                        <button onClick={() => setIsProductOpen(true)} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                            Thêm sản phẩm
                                        </button>
                                    </div>
                                )}
                                {filteredSelectedProducts.length > 0 && filteredSelectedProducts.map((product) => (
                                    <div className="flex gap-2" key={product.shoeId}>
                                        <img
                                            src={product.shoeImage ? product.shoeImage : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'}
                                            className="object-cover rounded-md w-10"
                                            alt="ShoeImage"
                                        />
                                        <label className="text-xs" htmlFor={product.shoeId}>{product.shoeName}</label>
                                        <button
                                            className='bg-red-500 w-4 h-4 rounded-sm flex items-center justify-center text-white hover:bg-rose-700 transition'
                                            onClick={() => handleRemoveProduct(product.shoeId)}
                                        >
                                            <IoMdClose size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div>
                <ProductSelected
                    isOpen={isProductOpen}
                    handleOpen={handleProductOpen}
                    products={products}
                    onProductSelect={handleProductSelection}
                    productTypes={productTypes}
                    ProductBrands={productBrand}
                    onFilterSelect={setFilterValues}
                    filterValues={filterValues}
                    totalPages={totalPages}
                    currentPage={currentProductPage}
                    setCurrentPage={setCurrentProductPage}
                />
            </div>
        </div>
    );
};

export default AddEventDialog;
