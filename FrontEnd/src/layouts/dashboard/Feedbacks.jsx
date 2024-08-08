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

    const formattedFromDate = fromDate;
    const formattedToDate = toDate;

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
                                            placeholder="Tìm kiếm dựa trên title của feedback"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center mb-4 sm:mb-0">
                                <label htmlFor="checked-status" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status:
                                </label>
                                <select
                                    id="checked-status"
                                    value={checkedStatus}
                                    onChange={handleCheckedStatusChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Mặc định</option>
                                    <option value="true">Đã xem</option>
                                    <option value="false">Chưa xem</option>
                                </select>
                            </div>
                            <div className="flex items-center mb-4 sm:mb-0">
                                <label htmlFor="from-date" className="sr-only">
                                    From
                                </label>
                                <input
                                    type="date"
                                    id="from-date"
                                    value={fromDate}
                                    onChange={handleFromDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="flex items-center mb-4 sm:mb-0">
                                <label htmlFor="to-date" className="sr-only">
                                    To
                                </label>
                                <input
                                    type="date"
                                    id="to-date"
                                    value={toDate}
                                    onChange={handleToDateChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
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
}

export default Feedbacks;
