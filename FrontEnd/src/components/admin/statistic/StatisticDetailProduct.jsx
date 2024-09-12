

import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import AxiosAdmin from '../../../apis/AxiosAdmin';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';




const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};


const builderQueryString = (shoeId, minDate, maxDate) => {
    const params = new URLSearchParams();

    if (shoeId) {
        params.append("shoeId", shoeId);
    }

    if (minDate && minDate !== "undefined" && minDate !== "null") {
        params.append("minDate", formatDate(minDate));
    }

    if (maxDate && maxDate !== "undefined" && maxDate !== "null") {
        params.append("maxDate", formatDate(maxDate));
    }

    return params.toString();
};





const StatisticDetailProduct = ({
    isOpen,
    handleOpen,
    data,
    minDate ,
    maxDate 
}) => {

    const [shoeSizes, setShoeSizes] = useState([])

    
  
    
 

    useEffect(() => {
        const query = builderQueryString(data.shoeId, minDate, maxDate)
        console.log(query)
        const fetchShoeSizes = async () => {
            const response = await AxiosAdmin.get(`http://localhost:8080/Statistic/BestSellerBySize?${query}`)
            if (response.status === 200) {
                setShoeSizes(response.data)
            }
        }

        fetchShoeSizes()

    }, [data])

 console.log(shoeSizes)







    return (
        <div className={isOpen ? 'w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}

        >
            <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto p-3 space-y-4'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>

                <h3 className='font-semibold text-xl text-center'>Sản phẩm với mã {data.shoeId}</h3>

               

                <div>
                    <Table className='border'>
                        {shoeSizes.length > 0 && (
                            <TableHead className='bg-[#f9fafb]'>
                                <TableRow>
                                    <TableCell>Mã giày</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Số lượng bán</TableCell>
                                    <TableCell>Tổng thu nhập</TableCell>
                                </TableRow>
                            </TableHead>
                        )}
                        <TableBody>
                            {shoeSizes.length > 0 && shoeSizes.map((item, index) => (
                                <TableRow className='hover:bg-zinc-300 transition cursor-pointer' key={item.size} >
                                    <TableCell>{item.shoeId}</TableCell>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.total} VNĐ</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>

            </div>




        </div>
    )
}

export default StatisticDetailProduct