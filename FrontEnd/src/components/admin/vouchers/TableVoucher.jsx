import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaEdit, FaEye, FaSortUp, FaSortDown } from "react-icons/fa";

import EditVoucherDialog from './EditVoucherDialog';
import ViewVoucherDialog from './ViewVoucherDialog';

export default function TableVoucher({ vouchers, filterValues, onChangeFilter }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState(null);
    const [isViewVoucher, setIsViewVoucher] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen);
    };

    const handleViewOpen = () => {
        setIsViewVoucher(!isViewVoucher);
    };



    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        onChangeFilter({ ...filterValues, sort: `${key},${direction}` })
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('voucherId')}>
                            <div className='flex items-center gap-2'>

                                Id {getSortIcon('voucherId')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('title')}>
                            <div className='flex items-center gap-2'>
                                Tiêu đề {getSortIcon('title')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('code')}>
                            <div className='flex items-center gap-2'>

                                Mã {getSortIcon('code')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('status')}>
                            <div className='flex items-center gap-2'>

                                Trạng thái {getSortIcon('status')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('expirationTime')}>
                            <div className='flex items-center gap-2'>

                                Thời gian hết hạn {getSortIcon('expirationTime')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('isFreeShip')}>
                            <div className='flex items-center gap-2'>
                                Free Ship {getSortIcon('isFreeShip')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('condition')}>
                            <div className='flex items-center gap-2'>
                                Giá điều kiện {getSortIcon('condition')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('discountAmount')}>

                            <div className='flex items-center gap-2'>
                                Giá giảm {getSortIcon('discountAmount')}

                            </div>
                        </TableCell>
                        <TableCell>Sửa</TableCell>
                        <TableCell>Xem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vouchers && vouchers.map((voucher, index) => (
                        <TableRow
                            key={index}
                            hover
                            role="checkbox"
                        >
                            <TableCell>{voucher.voucherId}</TableCell>
                            <TableCell>{voucher.title}</TableCell>
                            <TableCell>{voucher.code}</TableCell>
                            <TableCell>{voucher.status ? 'Công khai' : 'Ẩn'}</TableCell>
                            <TableCell>{voucher.expirationTime}</TableCell>
                            <TableCell>{voucher.isFreeShip ? 'Có' : 'Không'}</TableCell>
                            <TableCell>{voucher.condition}</TableCell>
                            <TableCell>{voucher.discountAmount}</TableCell>
                            <TableCell>

                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                    onClick={() => { setIsEditOpen(true); setCurrentVoucher(voucher); }}                 >
                                    <FaEdit size={20} />
                                </button>
                            </TableCell>
                            <TableCell>

                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                    onClick={() => { setIsViewVoucher(true); setCurrentVoucher(voucher); }}         >
                                    <FaEye size={20} />
                                </button>

                            </TableCell>
                        </TableRow>
                    ))}
                    {vouchers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10}>No data found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {currentVoucher && (
                <EditVoucherDialog
                    isOpen={isEditOpen}
                    handleOpen={handleEditOpen}
                    data={currentVoucher}
                />
            )}

            {currentVoucher && (
                <ViewVoucherDialog
                    isOpen={isViewVoucher}
                    handleOpen={handleViewOpen}
                    data={currentVoucher}
                />
            )}
        </div>
    );
}
