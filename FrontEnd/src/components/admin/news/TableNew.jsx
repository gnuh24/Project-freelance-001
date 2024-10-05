import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaSortUp, FaSortDown, FaEdit, FaEye } from 'react-icons/fa';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import { setEditId } from '../../../reducers/news/NewSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function TableNew({ news , filterValues, setFilterValues }) {
    const dispath = useDispatch()
    const redirect = useNavigate()
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const newId = useSelector(state => state.news)



    const handleSort = (sortKey) => {
        setSortConfig((prevSort) => {
            const { key, direction } = prevSort;
            const newDirection = key === sortKey && direction === 'asc' ? 'desc' : 'asc';
            return { key: sortKey, direction: newDirection };
        });
    
       
        setFilterValues(prevFilterValues => ({
            ...prevFilterValues,
            sort: `${sortKey},${sortConfig.direction === 'asc' ? 'desc' : 'asc'}`
        }));
    };
    

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return null;
    };

    const handleEdit = (id) => {
        dispath(setEditId(id))
        console.log(newId)
        redirect('/dashboard/news/edit')

    }

    const handleView = (id) => {
        dispath(setEditId(id))
        console.log(newId)
        redirect('/dashboard/news/view')

    }

    return (
        <div className='space-y-10'>
            <Table className='border'>
                <TableHead className='bg-[#f9fafb]'>
                    <TableRow>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('id')}>
                            <div className='flex items-center gap-2'>
                                Id {getSortIcon('id')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('title')}>
                            <div className='flex items-center gap-2'>
                                Tiêu đề {getSortIcon('title')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center'>
                            <div className='flex items-center gap-2'>
                                Hình ảnh
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('createTime')}>
                            <div className='flex items-center gap-2'>
                                Thời gian tạo {getSortIcon('createTime')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('status')}>
                            <div className='flex items-center gap-2'>
                                Trạng thái {getSortIcon('status')}
                            </div>
                        </TableCell>
                        <TableCell className='cursor-pointer flex items-center' onClick={() => handleSort('priorityFlag')}>
                            <div className='flex items-center gap-2'>
                                Ưu tiên {getSortIcon('priorityFlag')}
                            </div>
                        </TableCell>
                        <TableCell>Sửa</TableCell>
                        <TableCell>Xem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {news && news.map((newsItem, index) => (
                        <TableRow
                            key={index}
                            className='table-row'
                            role="checkbox"
                        >
                            <TableCell>{newsItem.id}</TableCell>
                            <TableCell>{newsItem.title}</TableCell>
                            <TableCell>
                                <img className='w-10 h-10 object-cover' src={`http://localhost:8080/NewsImage/${newsItem.banner}`} alt="thumbnail" />
                            </TableCell>
                            <TableCell>{newsItem.createTime}</TableCell>
                            <TableCell>{newsItem.status ? "Hiển thị" : "Ẩn"}</TableCell>
                            <TableCell>{newsItem.priorityFlag ? "Có" : "Không"}</TableCell>
                            <TableCell>
                                <FaEdit onClick={() => handleEdit(newsItem.id)} size={20} className='cursor-pointer' />
                            </TableCell>
                            <TableCell>
                                <FaEye onClick={() => handleView(newsItem.id)} size={20} className='cursor-pointer' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {news.length === 0 && (
                <div className='flex items-center justify-center mt-20'>Không tìm thấy dữ liệu nào</div>
            )}
        </div>
    );
}
