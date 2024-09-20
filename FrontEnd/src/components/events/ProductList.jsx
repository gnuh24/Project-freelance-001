import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice';
import { Pagination, Stack } from '@mui/material';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

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
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = data.totalPages || 0;

    useEffect(() => {
        const query = buildQueryString( eventId , currentPage, ITEM_PER_PAGE);
        console.log(query)
        dispatch(getProductsInEvent(query));
    }, [eventId, currentPage, dispatch]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto mt-10'>
            <div className="grid grid-cols-2 grid-rows-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {
                    data.content && data.content.length > 0 ? (
                        data.content.map(product => (
                            <div key={product.shoeId} className='relative'>
                                <Card className="max-w-none">
                                    <div className='absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-md transform rotate-12'>
                                        {percentage}%
                                    </div>
                                    <div className="w-full h-64">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`http://localhost:8080/ShoeImage/Image/${product?.defaultImage}`}
                                            alt="imageShoe"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {product?.numberOfShoeSize} sizes
                                        </span>
                                        {product?.top3Size?.map((size) => (
                                            <span
                                                key={size}
                                                className="text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {size}
                                            </span>
                                        ))}{' '}
                                    </div>
                                    <Link to={`/detailProduct/${product?.shoeId}`}>
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {product?.shoeName}
                                        </h5>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-extrabold tracking-tight">
                                            ${product?.lowestPrice}
                                        </span>
                                    </div>
                                </Card>
                            </div>

                        ))
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
