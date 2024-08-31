import * as React from 'react';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { FaSortUp, FaSortDown, FaEdit, FaEye } from 'react-icons/fa';
import '../style.css'; 


export default function TableNew({ news }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortedNews = React.useMemo(() => {
        let sortableItems = [...news];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [news, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
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
                    {sortedNews && sortedNews.map((newsItem, index) => (
                    <TableRow
                        key={index}
                        className='table-row' // Thêm lớp CSS cho hiệu ứng hover
                        role="checkbox"
                    >
                        <TableCell>{newsItem.id}</TableCell>
                        <TableCell>{newsItem.title}</TableCell>
                        <TableCell>
                            <img src={`http://localhost:8080/NewsImage/${newsItem.banner}`} alt="thumbnail" />
                        </TableCell>
                        <TableCell>{newsItem.createTime}</TableCell>
                        <TableCell>{newsItem.status ? "Hiển thị" : "Ẩn"}</TableCell>
                        <TableCell>{newsItem.priorityFlag ? "Có" : "Không"}</TableCell>
                        <TableCell>
                            <FaEdit size={20} className='cursor-pointer' />
                        </TableCell>
                        <TableCell>
                            <FaEye size={20} className='cursor-pointer' />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
