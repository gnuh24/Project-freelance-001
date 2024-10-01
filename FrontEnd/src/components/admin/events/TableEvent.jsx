import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaEdit, FaEye, FaSortUp, FaSortDown } from "react-icons/fa";
import EditEventDialog from './EditEventDialog';
import ViewEventDialog from './ViewEventDialog';


export default function TableEvent({ events , filterValues ,onFilterchange}) {


    

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });



    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        onFilterchange({...filterValues, sort: `${key},${direction}`})
        setSortConfig({ key, direction });
    };

    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen);
    };

    const handleViewOpen = () => {
        setIsViewOpen(!isViewOpen);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp size={20} /> : <FaSortDown size={20} />;
        }
        return null;
    };

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        <TableCell className='cursor-pointer' onClick={() => handleSort('eventId')}>
                            <div className='flex items-center'>
                            <span className='mr-2'>Id</span>{getSortIcon('eventId')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer' onClick={() => handleSort('eventName')}>
                            <div className='flex items-center'>
                                <span className='mr-2'>Tên sự kiện</span>{getSortIcon('eventName')}
                                
                            </div>
                        </TableCell>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell className='cursor-pointer ' onClick={() => handleSort('percentage')}>
                            <div className='flex items-center'>
                            <span className='mr-2'>Phần trăm giảm giá</span>{getSortIcon('percentage')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer' onClick={() => handleSort('startTime')}>
                            <div className='flex items-center'>
                            <span className='mr-2'>Thời gian bắt đầu</span>{getSortIcon('startTime')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer' onClick={() => handleSort('endTime')}>
                            <div className='flex items-center'>
                            <span className='mr-2'>Thời gian hết hạn</span>{getSortIcon('endTime')}

                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer' onClick={() => handleSort('status')}>
                            <div className='flex items-center'>

                            <span className='mr-2'>Trạng thái</span>{getSortIcon('status')}
                            </div>
                        </TableCell>
                        <TableCell>
                            Sửa
                        </TableCell>
                        <TableCell>
                            Xem
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {events.length > 0 && events.map((event, index) => (
                        <TableRow
                            key={index}
                            hover
                            tabIndex={-1}
                        >
                            <TableCell>{event.eventId}</TableCell>
                            <TableCell>{event.eventName}</TableCell>
                            <TableCell>
                                <img
                                    className='object-cover w-[4rem] rounded-md'
                                    src={event.banner ? `http://localhost:8080/Event/Banner/${event.banner}` : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" />
                            </TableCell>
                            <TableCell>{event.percentage}%</TableCell>
                            <TableCell>{event.startTime}</TableCell>
                            <TableCell>{event.endTime}</TableCell>
                            <TableCell>{event.status ? 'Hiển thị' : 'Ẩn'}</TableCell>
                            <TableCell>
                                <FaEdit onClick={() => { setIsEditOpen(true), setCurrentEvent(event) }} size={20} className='cursor-pointer' />
                            </TableCell>
                            <TableCell>
                                <FaEye onClick={() => { setIsViewOpen(true), setCurrentEvent(event) }} size={20} className='cursor-pointer' />
                            </TableCell>
                        </TableRow>
                    ))}
                    {events.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10}>No data found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div>
                {currentEvent && (
                    <EditEventDialog
                        isOpen={isEditOpen}
                        handleOpen={handleEditOpen}
                        data={currentEvent}
                    />
                )}
                {currentEvent && (
                    <ViewEventDialog
                        isOpen={isViewOpen}
                        handleOpen={handleViewOpen}
                        data={currentEvent}
                    />
                )}
            </div>
        </div>
    );
}
