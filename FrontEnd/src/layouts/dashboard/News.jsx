import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../reducers/news/NewSlice';
import { LuLoader2 } from "react-icons/lu";
import TableNew from '../../components/admin/news/TableNew';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

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

const News = () => {
    const dispatch = useDispatch();
    const redirect = useNavigate()
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [searchValue, setSearchValue] = useState('');
    const [filterValues, setFilterValues] = useState({
        status: '',
        from: '',
        to: '',
        search: ''
    });


    const news = useSelector(state => state.news.data.content);
    const totalPages = useSelector(state => state.news.data.totalPages);
    const status = useSelector(state => state.news.status);

    useEffect(() => {
        const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE);
        dispatch(getNews(query));
    }, [dispatch, filterValues, currentPage]);

    const onSubmit = (e) => {
        e.preventDefault();
        setFilterValues(prev => ({ ...prev, search: searchValue }));
    };


    if (status === 'loading') {
        return (
            <div className='h-full w-full flex items-center justify-center'>
                <LuLoader2 size={20} className='animate-spin' />
            </div>
        );
    }

    const handleChangePage = (e, p) => {
        setCurrentPage(p);
    }

    console.log(news)
    return (
        <div className="h-[90.2vh]">
            <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Quản lý vouchers
                        </h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0 gap-4">
                            <form className="flex gap-2 items-center" onSubmit={onSubmit}>
                                <label htmlFor="products-search" className="sr-only">
                                    Tìm
                                </label>
                                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        name="search"
                                        id="voucher-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nhập tiêu đề"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className='bg-blue-600 px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-blue-700 transition'>
                                    Tìm
                                </button>
                            </form>
                            <div>
                                <label htmlFor="status">Trạng thái </label>
                                <select
                                    name="Status"
                                    id="status"
                                    className="px-4 py-2 rounded-md cursor-pointer"
                                    onChange={(e) =>
                                        setFilterValues(prev => ({ ...prev, status: e.target.value }))
                                    }
                                >
                                    <option value="">Tất cả</option>
                                    <option value="true">Hiển thị</option>
                                    <option value="false">Ẩn</option>
                                </select>
                            </div>

                            <button onClick={() => redirect('/dashboard/news/add')} className='bg-blue-600 px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-blue-700 transition'>
                                Thêm bài viết
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-10'>

                <TableNew news={news || []} />
            </div>
            <div className='flex items-center justify-center pb-10'>
                <Stack spacing={2}>

                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded" />
                </Stack>

            </div>



        </div>
    );
};

export default News;
