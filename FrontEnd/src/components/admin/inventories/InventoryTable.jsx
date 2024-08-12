import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInventoryReportsApiThunk } from '../../../reducers/inventoryReducers/InventoryReportSlice.jsx'; // Adjust import paths as necessary
import Loader from '../../loader/Loader.jsx';
// import DetailForm from './DetailForm'; // Import the DetailForm component

const statusTranslations = {
    'ChoNhapKho': 'Chờ nhập kho',
    'DaNhapKho': 'Đã nhập kho',
    'Huy': 'Đã hủy',
    // Add more status translations as needed
};

const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const InventoryTable = ({ search, status, from, to }) => {
    const dispatch = useDispatch();
    const { data, status: apiStatus, error } = useSelector((state) => state.inventoryReportSlice); // Adjust according to your slice name

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 5;
    const [sort, setSort] = useState('id,asc'); // Default sorting
    const [itemDetails, setItemDetails] = useState(null); // State for storing item details

    useEffect(() => {
        dispatch(getInventoryReportsApiThunk({ pageSize, pageNumber, sort, search: search || '', status, from, to }));
    }, [dispatch, pageNumber, sort, search, status, from, to]);

    useEffect(() => {
        setPageNumber(1);
    }, [search, status, from, to]);

    if (apiStatus === 'loading') return <Loader />;
    if (apiStatus === 'failed') return <div>Error: {error}</div>;

    const handleSort = (field) => {
        // Check if the field is sortable
        if (['id', 'createTime', 'totalPrice', 'supplier', 'supplierPhone'].includes(field)) {
            setSort(prevSort => {
                const [currentField, currentDirection] = prevSort.split(',');
                const newDirection = currentField === field && currentDirection === 'asc' ? 'desc' : 'asc';
                return `${field},${newDirection}`;
            });
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (data?.totalPages && pageNumber < data.totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handleShowDetails = (itemId) => {
        // Fetch details for the selected item
        const item = data.content.find(i => i.id === itemId);
        setItemDetails(item);
    };

    const handleCloseDetails = () => {
        setItemDetails(null);
    };

    return (
        <>
            {itemDetails && (
                <DetailForm
                    item={itemDetails}
                    onClose={handleCloseDetails}
                />
            )}
            <section className="px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                {data?.content?.length === 0 ? (
                                    <div className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                                        Không có phiếu nhập kho thỏa mản yêu cầu tại thời điểm này
                                    </div>
                                ) : (
                                    <>
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        <button
                                                            className="flex items-center gap-x-2"
                                                            onClick={() => handleSort('id')}
                                                        >
                                                            <span>ID</span>
                                                            {sort.startsWith('id') && (
                                                                <span className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
                                                                    {sort.endsWith('asc') ? '▲' : '▼'}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        <button
                                                            className="flex items-center gap-x-2"
                                                            onClick={() => handleSort('createTime')}
                                                        >
                                                            Thời gian tạo
                                                            {sort.startsWith('createTime') && (
                                                                <span className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
                                                                    {sort.endsWith('asc') ? '▲' : '▼'}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        <button
                                                            className="flex items-center gap-x-2"
                                                            onClick={() => handleSort('totalPrice')}
                                                        >
                                                            Tổng giá trị
                                                            {sort.startsWith('totalPrice') && (
                                                                <span className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
                                                                    {sort.endsWith('asc') ? '▲' : '▼'}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        <button
                                                            className="flex items-center gap-x-2"
                                                            onClick={() => handleSort('supplier')}
                                                        >
                                                            Nhà cung cấp
                                                            {sort.startsWith('supplier') && (
                                                                <span className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
                                                                    {sort.endsWith('asc') ? '▲' : '▼'}
                                                                </span>
                                                            )}
                                                        </button>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                    
                                                        Số điện thoại
                                                     
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                    >
                                                        Trạng thái
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {data?.content?.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.id}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.createTime}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {formatCurrency(item.totalPrice)}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.supplier}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {item.supplierPhone}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {statusTranslations[item.status] || item.status}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <button onClick={() => handleShowDetails(item.id)} className="text-blue-600 dark:text-blue-500 hover:underline">
                                                                Xem chi tiết
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="py-3 flex items-center justify-between">
                                            <button
                                                onClick={handlePreviousPage}
                                                disabled={pageNumber === 1}
                                                className={`px-4 py-2 text-white font-semibold ${pageNumber === 1 ? 'bg-gray-500' : 'bg-blue-500'} rounded`}
                                            >
                                                Previous
                                            </button>
                                            <span className="text-sm font-medium">
                                                Page {pageNumber} of {data?.totalPages || 1}
                                            </span>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={data?.totalPages && pageNumber >= data.totalPages}
                                                className={`px-4 py-2 text-white font-semibold ${data?.totalPages && pageNumber >= data.totalPages ? 'bg-gray-500' : 'bg-blue-500'} rounded`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InventoryTable;
