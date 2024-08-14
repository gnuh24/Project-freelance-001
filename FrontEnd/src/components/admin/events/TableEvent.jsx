import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
const ITEM_PER_PAGE = 2;

// banner
// : 
// "0.08260245918155185.1723601232944.png"
// endTime
// : 
// "18:00:00 18/06/2025"
// eventId
// : 
// 2
// eventName
// : 
// "Tết nguyên đán"
// percentage
// : 
// 30
// startTime
// : 
// "22:53:00 20/01/2025"
// status
// : 
// false

export default function TableEvent({ events }) {
    const [selected, setSelected] = useState([]);
  
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState({})

    
    const handleEditOpen = () => {
        setIsEditOpen(!isEditOpen);
    };


    console.log(events)
   
    
   

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
                           Edit
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
                                  kdkdk
                                </TableCell>
                                <TableCell>{event.percentage}%</TableCell>
                                <TableCell>{event.startTime}</TableCell>
                                <TableCell>{event.endTime}</TableCell>
                                <TableCell>{event.status ? 'Còn' : 'Không'}</TableCell>
                                
                                <TableCell>
                                    <FaEdit onClick={()=> {setIsEditOpen(true), setCurrentVoucher(voucher)}} size={20} className='cursor-pointer' />
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
           
            
        </div>
    );
}
