import React, { useEffect, useState } from 'react';
import '../style.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableProduct = ({topProducts, productsData}) => {
   

    return (
        <div className='space-y-10'>
            {topProducts.length === 0 && productsData.length === 0 && (
                <div className='text-center text-red-500'>
                    Không tìm thấy sản phẩm nào
                </div>
            )}
            <div className="award-podium">
                {productsData.length > 0 && topProducts.map((product, index) => (
                    <div key={product.id} className={`podium podium-${index + 1}  cursor-pointer`}>
                        <div className="person">
                            {index === 0 && <span role="img" aria-label="gold-cup">🏆</span>}
                            {index === 1 && <span role="img" aria-label="silver-cup">🥈</span>}
                            {index === 2 && <span role="img" aria-label="bronze-cup">🥉</span>}
                        </div>

                        <div className="brand text-[10px] font-semibold">
                            
                            {product.shoeName}

                            
                        </div>

                       
                    </div>
                ))}
            </div>

            <div>
                <Table className='border'>
                {productsData.length > 0 && (
                    <TableHead className='bg-[#f9fafb]'>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>Số lượng bán</TableCell>
                            <TableCell>Tổng thu nhập</TableCell>
                        </TableRow>
                    </TableHead>
                )}
                    <TableBody>
                        {productsData.length > 0 && productsData.map((product, index) => (
                            <TableRow key={product.shoeId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.shoeName}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableProduct;
