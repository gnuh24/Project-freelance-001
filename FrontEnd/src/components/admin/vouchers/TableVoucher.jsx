import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import DeleteVoucherDialog from './DeleteVoucherDialog';
import EditVoucherDialog from './EditVoucherDialog';

const ITEM_PER_PAGE = 2;

export default function TableVoucher({ vouchers }) {
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState({})

    const handleDeleteOpen = () => {
        setIsDeleteOpen(!isDeleteOpen);
    };
    
    const handleEditOpen = (voucherId) => {
        setIsEditOpen(!isEditOpen);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = vouchers.map((voucher) => voucher.voucherId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, voucherId) => {
        const selectedIndex = selected.indexOf(voucherId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, voucherId);
        } else {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelectedAll = vouchers.length > 0 && selected.length === vouchers.length;
    const isIndeterminate = selected.length > 0 && selected.length < vouchers.length;

    const onClickDelete = () => {
        if (selected.length > 0) {
            setIsDeleteOpen(true);
        }
    };
    
   

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                color="primary"
                                indeterminate={isIndeterminate}
                                checked={isSelectedAll}
                                onChange={handleSelectAllClick}
                                inputProps={{ 'aria-label': 'select all vouchers' }}
                            />
                            Id
                        </TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Expiration Time</TableCell>
                        <TableCell>Is Free Ship</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Discount Amount</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>
                            <button 
                                onClick={onClickDelete} 
                                className={`transition text-white font-semibold rounded-md px-4 py-2 ${selected.length > 0 ? 'bg-rose-500' : 'bg-[#7f8388]'}`}
                            >
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vouchers && vouchers.map((voucher, index) => {
                        const isItemSelected = selected.indexOf(voucher.voucherId) !== -1;
                        const labelId = `checkbox-list-label-${voucher.voucherId}`;

                        return (
                            <TableRow
                                key={index}
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                            >
                                <TableCell>
                                    <Checkbox
                                        onClick={(event) => handleClick(event, voucher.voucherId)}
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                    {voucher.voucherId}
                                </TableCell>
                                <TableCell>{voucher.title}</TableCell>
                                <TableCell>{voucher.code}</TableCell>
                                <TableCell>{voucher.status ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{voucher.expirationTime}</TableCell>
                                <TableCell>{voucher.isFreeShip ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{voucher.condition}</TableCell>
                                <TableCell>{voucher.discountAmount}</TableCell>
                                <TableCell>
                                    <FaEdit onClick={()=> {setIsEditOpen(true), setCurrentVoucher(voucher)}} size={20} className='cursor-pointer' />
                                </TableCell>
                                <TableCell>
                                    <FaRegTrashAlt size={20} className='cursor-pointer' />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {vouchers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10}>No data found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DeleteVoucherDialog
                values={selected}
                isOpen={isDeleteOpen}
                handleOpen={handleDeleteOpen}
            />
            <EditVoucherDialog
                isOpen={isEditOpen}
                handleOpen={handleEditOpen}
                data={currentVoucher}
            />
        </div>
    );
}
