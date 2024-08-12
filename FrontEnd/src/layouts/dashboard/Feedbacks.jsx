import { useState } from 'react';
import TableFeedback from '../../components/admin/feedbacks/TableFeedback.jsx';

const Feedbacks = () => {
    const [search, setSearch] = useState('');
    const [checkedStatus, setCheckedStatus] = useState(''); // Combo box filter
    const [fromDate, setFromDate] = useState(''); // Start date filter
    const [toDate, setToDate] = useState(''); // End date filter

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCheckedStatusChange = (e) => {
        setCheckedStatus(e.target.value);
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    // Format dates before passing to TableFeedback
    const formatDateString = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const formattedFromDate = formatDateString(fromDate);
    const formattedToDate = formatDateString(toDate);

    return (
        <>
            <div className="h-[90.2vh]">
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Các feedback của khách hàng
                            </h1>
                        </div>
                        <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <form className="sm:pr-3" action="#" method="GET">
                                    <label htmlFor="feedback-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                        <input
                                            type="text"
                                            name="search"
                                            id="feedback-search"
                                            value={search}
                                            onChange={handleSearchChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                                <div className="flex items-center space-x-3">
                                    <label htmlFor="checkedStatus" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Tình trạng
                                    </label>
                                    <select
                                        id="checkedStatus"
                                        name="checkedStatus"
                                        value={checkedStatus}
                                        onChange={handleCheckedStatusChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Tất cả</option>
                                        <option value="true">Đã xem</option>
                                        <option value="false">Chưa xem</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex space-x-4 sm:space-x-3 md:pl-2">
                                <div>
                                    <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        From
                                    </label>
                                    <input
                                        type="date"
                                        id="fromDate"
                                        name="fromDate"
                                        value={fromDate}
                                        onChange={handleFromDateChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        To
                                    </label>
                                    <input
                                        type="date"
                                        id="toDate"
                                        name="toDate"
                                        value={toDate}
                                        onChange={handleToDateChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TableFeedback
                    search={search}
                    isChecked={checkedStatus}
                    from={formattedFromDate}
                    to={formattedToDate}
                />
            </div>
        </>
    );
};

export default Feedbacks;
