import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../reducers/eventReducer/EventSlice';
import TableEvent from '../../components/admin/events/TableEvent';

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const builderQueryString = (filters, page, itemsPerPage) => {
    const params = new URLSearchParams();

    Object.entries({
        ...filters,
        pageNumber: page || '',
        pageSize: itemsPerPage || '',
    }).forEach(([key , value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    console.log(params.toString());
    return params.toString();
}

const Event = () => {
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const events = useSelector((state) => state.events.data.content || []);
    const totalPages = useSelector((state) => state.events.data.totalPages);
    const [searchValue, setSearchValue] = useState('');

    const [filterValues, setFilterValues] = useState({
        status: '',
        search: '',
        minPercent: '',
        maxPercent: '',
        eventTime: ''
    });

    useEffect(() => {
        const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE);
        console.log(query);
        dispatch(fetchEvents(query));
    }, [dispatch, filterValues, currentPage]);

    const onSubmit = (e) => {
        e.preventDefault();
        setFilterValues({
            ...filterValues,
            search: searchValue
        });
    }

    console.log(totalPages)

    return (
        <div className="h-[90.2vh]">
            <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Quản lý sự kiện
                        </h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0 gap-4">
                            <form className="flex gap-2 items-center justify-center " onSubmit={onSubmit}>
                               
                                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        name="search"
                                        id="products-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Nhập tên sự kiện"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>Tìm</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {events.length > 0 && (
                <TableEvent events={events}/>
            )}

            <div className='flex items-center justify-center mb-5 mt-10 pb-10'>
                <div className='flex items-center justify-center gap-10'>
                    <button className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                        Trước
                    </button>
                    <span>
                        Trang {currentPage} of {totalPages}
                    </span>
                    <button className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Event;
