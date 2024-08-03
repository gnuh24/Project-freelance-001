import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsApiThunk, putAccountApiThunk } from '../../../reducers/auth/AccountSlice.jsx';
import Loader from '../../loader/Loader';

const TableUser = () => {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector((state) => state.accountReducer);

    useEffect(() => {
        dispatch(getAccountsApiThunk({ pageSize: 5 }));
    }, [dispatch]);

    if (status === 'loading') return <Loader />;
    if (status === 'failed') return <div>Error: {error}</div>;

    const handleToggleStatus = (accountId, currentStatus) => {
        const formData = {
            accountId: accountId,
            status: !currentStatus,
        };

        dispatch(putAccountApiThunk(formData));
    };

    return (
        <>
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
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                    />
                                                    <button className="flex items-center gap-x-2">
                                                        <span>ID</span>
                                                    </button>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Ngày tạo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Trạng thái
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Quyền
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                Loại tài khoản
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {data?.content?.map((account) => (
                                            <tr key={account.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <input
                                                            type="checkbox"
                                                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                        />
                                                        <span>{account.id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>{account.email}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>{account.createAt}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>{account.status ? 'Active' : 'Inactive'}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>{account.role}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <span>{account.type}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        {account.role !== 'Admin' && (
                                                            <>
                                                                {account.status ? (
                                                                    <button
                                                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
                                                                        onClick={() => handleToggleStatus(account.id, account.status)}
                                                                    >
                                                                        Khóa
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
                                                                        onClick={() => handleToggleStatus(account.id, account.status)}
                                                                    >
                                                                        Mở khóa
                                                                    </button>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6 gap-5">
                    <a
                        href="#"
                        className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <i className="fa-solid fa-angle-left"></i>
                        <span className="ml-2">Previous</span>
                    </a>
                    <ul className="flex h-8 items-center -space-x-px text-sm">
                        <li>
                            <a
                                href="#"
                                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="z-10 flex h-8 items-center justify-center border border-blue-300 bg-blue-50 px-3 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                ...
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                100
                            </a>
                        </li>
                    </ul>
                    <a
                        href="#"
                        className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                    >
                        <span className="mr-2">Next</span>
                        <i className="fa-solid fa-angle-right"></i>
                    </a>
                </div>
            </section>
        </>
    );
};

export default TableUser;
