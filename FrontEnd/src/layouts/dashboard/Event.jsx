import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../reducers/eventReducer/EventSlice';
import TableEvent from '../../components/admin/events/TableEvent';
import AddEventDialog from '../../components/admin/events/AddEventDialog';
import FilterPercentDialog from '../../components/admin/events/FilterPercentDialog';

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const dateTimeString = "2024-08-16T22:39";

const builderQueryString = (filters, page, itemsPerPage) => {
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
}

const Event = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [isPercentOpen, setIsPercentOpen] = useState(false);
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const events = useSelector((state) => state.events.data.content || []);
    const totalPages = useSelector((state) => state.events.data.totalPages);
    const [searchValue, setSearchValue] = useState('');

    const [filterValues, setFilterValues] = useState({
        status: '',
        search: '',
        minPercent: '',
        maxPercent: '',
        eventTime: '',
        sort: ''
    });

    useEffect(() => {
        const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE);
        console.log(query);
        dispatch(fetchEvents(query));
    }, [dispatch, filterValues, currentPage]);

    const onSubmit = (e) => {
        setIsFilter(true);
        e.preventDefault();
        setFilterValues({
            ...filterValues,
            search: searchValue
        });
    }

    const handleFilterDateSubmit = () => {
        setIsFilter(true);
        setFilterValues({
            ...filterValues,
            eventTime: new Date(dateValue).toISOString() // Ensure the date is in ISO format
        });
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePercentOpen = () => {
        setIsPercentOpen(!isPercentOpen);
    }

    const handleAddEventOpen = () => {
        setIsAddEventOpen(!isAddEventOpen);
    }

    return (
        <div className="h-[90.2vh] space-y-4">
            <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                <div className="w-full mb-1">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                            Quản lý sự kiện
                        </h1>
                    </div>
                    <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center mb-4 sm:mb-0 gap-8">
                            <form className="flex gap-2 items-center justify-center" onSubmit={onSubmit}>
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

                            <div className='block border-r border-zinc-500 h-8' />

                            <div>
                                <label htmlFor="status">Status </label>
                                <select
                                    name="Status"
                                    id="status"
                                    className="px-4 py-2 rounded-md cursor-pointer"
                                    onChange={(e) => { setFilterValues(prev => ({ ...prev, status: e.target.value })), setIsFilter(true); }}
                                >
                                    <option value="">All</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className='block border-r border-zinc-500 h-8' />
                            <div className='flex items-center justify-center gap-2'>
                                <input type="datetime-local" className='rounded-md' onChange={(e) => setDateValue(e.target.value.toString())} />
                                <button onClick={handleFilterDateSubmit} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                    Lọc
                                </button>
                            </div>
                            <div className='block border-r border-zinc-500 h-8' />

                            <button onClick={handlePercentOpen} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                Lọc theo phần trăm giảm
                            </button>
                            <div className='block border-r border-zinc-500 h-8' />

                            <button onClick={handleAddEventOpen} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                Thêm sự kiện mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {events.length > 0 && (
                <>
                    <TableEvent events={events} />

                    <div className='flex items-center justify-center mb-5 mt-10 pb-10'>
                        <div className='flex items-center justify-center gap-10'>
                            <button onClick={handlePreviousPage} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                Trước
                            </button>
                            <span>
                                Trang {currentPage} of {totalPages}
                            </span>
                            <button onClick={handleNextPage} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                                Sau
                            </button>
                        </div>
                    </div>
                </>
            )}

            {events.length <= 0 && isFilter && (
                <div className='flex flex-col gap-7 items-center justify-center mt-10'>
                    <div>
                        Không tìm thấy sự kiện nào
                    </div>
                    <button onClick={() => window.location.reload()} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                        Quay lại
                    </button>
                </div>
            )}

            <div>
                <FilterPercentDialog
                    isOpen={isPercentOpen}
                    handleOpen={handlePercentOpen}
                    onChangeFilterValue={setFilterValues}
                />

                <AddEventDialog
                    isOpen={isAddEventOpen}
                    handleOpen={handleAddEventOpen}
                />
            </div>
        </div>
    );
}

export default Event;
