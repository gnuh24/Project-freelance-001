// TableFeedback.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacksApiThunk, deleteFeedbackApiThunk } from '../../../reducers/other/FeedbackSlice.jsx'; // Adjust import paths as necessary
import Loader from '../../loader/Loader';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the modal component

const TableFeedback = ({ search, isChecked, from, to }) => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.feedbackReducer); // Adjust according to your slice name

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 5;
    const [sort, setSort] = useState('id,asc'); // Default sorting
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getFeedbacksApiThunk({ pageSize, pageNumber, sort, search: search || '', isChecked, from, to }));
    }, [dispatch, pageNumber, sort, search, isChecked, from, to]);

    useEffect(() => {
        setPageNumber(1);
    }, [search, isChecked, from, to]);

    if (status === 'loading') return <Loader />;
    if (status === 'failed') return <div>Error: {error}</div>;

    const handleSort = (field) => {
        setSort(prevSort => {
            const [currentField, currentDirection] = prevSort.split(',');
            const newDirection = currentField === field && currentDirection === 'asc' ? 'desc' : 'asc';
            return `${field},${newDirection}`;
        });
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

    const handlePageClick = (page) => {
        setPageNumber(page);
    };

    const handleDelete = (id) => {
        setSelectedFeedbackId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedFeedbackId !== null) {
            dispatch(deleteFeedbackApiThunk(selectedFeedbackId));
            setSelectedFeedbackId(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFeedbackId(null);
    };

    return (
        <>
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
            <section className="px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
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
                                                    onClick={() => handleSort('title')}
                                                >
                                                    Title
                                                    {sort.startsWith('title') && (
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
                                                    Create Time
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
                                                    onClick={() => handleSort('orderId')}
                                                >
                                                    Order ID
                                                    {sort.startsWith('orderId') && (
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
                                                    onClick={() => handleSort('isChecked')}
                                                >
                                                    Checked
                                                    {sort.startsWith('isChecked') && (
                                                        <span className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}>
                                                            {sort.endsWith('asc') ? '▲' : '▼'}
                                                        </span>
                                                    )}
                                                </button>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {data?.content?.map((feedback) => (
                                            <tr key={feedback.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {feedback.id}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {feedback.title}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {feedback.createTime}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {feedback.orderId}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {feedback.isChecked ? 'Yes' : 'No'}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <button
                                                        onClick={() => handleDelete(feedback.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={pageNumber === 1}
                        className={`px-4 py-2 ${pageNumber === 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg`}
                    >
                        Previous
                    </button>
                    <div>
                        Page {pageNumber} of {data?.totalPages || 1}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={pageNumber === (data?.totalPages || 1)}
                        className={`px-4 py-2 ${pageNumber === (data?.totalPages || 1) ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg`}
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};

export default TableFeedback;
