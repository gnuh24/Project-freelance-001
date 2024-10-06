import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice';
import { Pagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { getAllShoeSizesByUser } from '../../reducers/productReducer/ShoeSizeSlice';
import './style.css'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice';

const ITEM_PER_PAGE = 10;

const buildQueryString = (filters, page, itemsPerPage) => {
    const params = new URLSearchParams();

    Object.entries({
        ...filters,
        pageNumber: page || '',
        pageSize: itemsPerPage || '',
    }).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    return params.toString();
};

const ProductList = ({ eventId, percentage }) => {
    const dispatch = useDispatch();
    const { data, status } = useSelector(state => state.products);
    const { data: dataSize, status: statusSize } = useSelector(state => state.shoeSizeReducer);
    const { data: dataColors , status: statusColors} = useSelector(state => state.colorReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = data.totalPages || 0;

    const [filterValues, setFilterValues] = useState({
        eventId: eventId,
        size: '',
        sort: '',
        colorId: ''
    })
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE);
        try {
            dispatch(getProductsInEvent(query));
        } catch (error) {
            console.log(error)
        }
        dispatch(getAllShoeSizesByUser())
        dispatch(getColorsNoPageApiThunk())
    }, [eventId, currentPage, dispatch, filterValues]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    if (status === 'loading' || statusSize === 'loading') {
        return <div>Loading...</div>;
    }

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
        if (!originalPrice || !discountPercentage) return originalPrice;
        return originalPrice - (originalPrice * (discountPercentage / 100));
    };

    if (!data || !dataSize) {
        return <div>No products found.</div>;
    }


    console.log(dataColors)

    return (
        <div className='container mx-auto mt-10 space-y-20'>
            <div className='flex items-center gap-10'>

                <button class={`filterIcon ${filterOpen ? 'open' : ''}`} href="#" onClick={() => setFilterOpen(!filterOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                {filterOpen && (
                    <div className={`filterContainer flex items-center gap-10 ${filterOpen ? 'show' : ''}`} >
                        <select className='font-semibold border-2 border-black md:text-md text-sm' value={filterValues.size} onChange={(e) => setFilterValues({ ...filterValues, size: e.target.value })}>
                            {!filterValues.size && <option className='font-semibold' value="">Kích thước</option>}
                            {dataSize.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        <select className='font-semibold border-2 border-black md:text-md text-sm' value={filterValues.size} onChange={(e) => setFilterValues({ ...filterValues, size: e.target.value })}>
                            {!filterValues.colorId && <option className='font-semibold' value="">Màu sắc</option>}
                            {dataColors.map(color => (
                                <option value="test" key={color?.id} >{color?.colorName}</option>
                            ))}
                        </select>
                        <select className='font-semibold border-2 border-black md:text-md text-sm' value={filterValues.size} onChange={(e) => setFilterValues({ ...filterValues, size: e.target.value })}>
                            {!filterValues.sort && <option className='font-semibold' value="">Sắp xếp theo</option>}
                            <option value="">Giá giảm dần  </option>
                            <option value="">Giá tăng dần </option>
                            <option value="">Giá tăng dần </option>
                        </select>

                        <button className='px-4 py-2 border-2 md:text-md text-sm border-black hover:bg-green-700 bg-green-600 transition text-white' onClick={() => setFilterValues({ size: '', sort: '' })}>
                            Xóa bộ lọc
                        </button>


                    </div>
                )}

            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-4">
                {
                    data.content && data.content.length > 0 ? (
                        data.content.map(product => {
                            const originalPrice = parseInt(product?.lowestPrice);
                            const discount = parseInt(percentage) || 0;

                            const discountedPrice = calculateDiscountedPrice(originalPrice, discount);

                            return (
                                <div key={product.shoeId} className="relative card-container">
                                    <Card className="max-w-none rounded-none border border-black pb-5 space-y-5">
                                        <div className='absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md transform'>
                                            Sale {percentage}%
                                        </div>
                                        <div className="w-full h-64">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={`http://localhost:8080/ShoeImage/Image/${product?.defaultImage}`}
                                                alt="imageShoe"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between px-2 md:px-5">
                                            <span className=" text-[8px] md:text-xs font-bold text-gray-900 dark:text-white">
                                                {product?.numberOfShoeSize} sizes
                                            </span>
                                            {product?.top3Size?.map((size) => (
                                                <span
                                                    key={size}
                                                    className="text-[8px] md:text-xs font-medium bg-zinc-300 flex items-center justify-center text-gray-900 dark:text-white w-5 h-5 md:w-6 md:h-6 p-1 rounded-full"
                                                >
                                                    {size}
                                                </span>
                                            ))}{' '}
                                        </div>
                                        <Link to={`/detailProduct/${product?.shoeId}`}>
                                            <h5 className="text-xs md:text-sm mt-2 md:mt-5 md:px-5 font-semibold tracking-tight text-gray-900 dark:text-white card-title">
                                                {product?.shoeName}
                                            </h5>
                                        </Link>
                                        <div className="flex items-center justify-between card-price">
                                            <p className="text-xs md:text-sm px-2 md:px-5 font-bold tracking-tight">
                                                <span className='line-through'>
                                                    {originalPrice}
                                                </span>
                                                <span className='ml-2 text-rose-500'>
                                                    {discountedPrice.toFixed(0)}
                                                </span>
                                            </p>
                                        </div>
                                    </Card>
                                </div>

                            );
                        })
                    ) : (
                        <div>Không có sản phẩm nào.</div>
                    )
                }
            </div>

            <div className='flex items-center justify-center mb-5 mt-10 pb-10'>
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" />
                </Stack>
            </div>
        </div>
    );
};

export default ProductList;
