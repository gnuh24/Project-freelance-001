import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { FaEdit, FaEye } from "react-icons/fa";
import EditEventDialog from './EditEventDialog';
import ViewEventDialog from './ViewEventDialog';

const ITEM_PER_PAGE = 2;


export default function TableEvent({ events }) {


    const [isEditOpen, setIsEditOpen] = useState(false);


    const [currentEvent, setCurrentEvent] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false)



    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen);
    };

    const handleViewOpen = () => {
        setIsViewOpen(!isViewOpen);
    };


    console.log(events)


    console.log(currentEvent)

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        <TableCell>

                            Id
                        </TableCell>
                        <TableCell>Tên sự kiên</TableCell>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Phần trăm giảm giá</TableCell>
                        <TableCell>Thời gian bắt đầu</TableCell>
                        <TableCell>Thời gian hết hạn</TableCell>
                        <TableCell>Trạng thái</TableCell>

                        <TableCell>
                            Sửa
                        </TableCell>
                        <TableCell>
                            Xem
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.map((event, index) => {

                        return (
                            <TableRow
                                key={index}
                                hover


                                tabIndex={-1}

                            >
                                <TableCell>

                                    {event.eventId}
                                </TableCell>
                                <TableCell>{event.eventName}</TableCell>
                                <TableCell>
                                    <img
                                        className=' object-cover w-[4rem] rounded-md'
                                        src={event.banner ? `http://localhost:8080/Event/Banner/${event.banner}` : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"} alt="" />
                                </TableCell>
                                <TableCell >{event.percentage}%</TableCell>
                                <TableCell>{event.startTime}</TableCell>
                                <TableCell>{event.endTime}</TableCell>
                                <TableCell>{event.status ? 'Còn' : 'Không'}</TableCell>

                                <TableCell>
                                    <FaEdit onClick={() => { setIsEditOpen(true), setCurrentEvent(event) }} size={20} className='cursor-pointer' />
                                </TableCell>
                                <TableCell>
                                    <FaEye onClick={() => { setIsViewOpen(true), setCurrentEvent(event) }} size={20} className='cursor-pointer' />
                                </TableCell>

                            </TableRow>
                        );
                    })}
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
