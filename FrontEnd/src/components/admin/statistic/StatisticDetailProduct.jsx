

import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import AxiosAdmin from '../../../apis/AxiosAdmin';
import { CiSearch } from 'react-icons/ci';
import { IoReload } from 'react-icons/io5';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';



const builderQueryString = (filters, page, itemsPerPage) => {
    const params = new URLSearchParams();

    Object.entries({
        ...filters,
        pageNumber: page || '',
        pageSize: itemsPerPage || '',
    }).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    return params.toString();
}


const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};



const StatisticDetailProduct = ({
    isOpen,
    handleOpen,
    data
}) => {

    const [shoeSizes, setShoeSizes] = useState([])
    const [filterValues, setFilterValues] = useState({
        minDate: '',
        maxDate: '',
        shoeId: data.shoeId
    });

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const query = builderQueryString(filterValues)
        const fetchShoeSizes = async () => {
            const response = await AxiosAdmin.get(`http://localhost:8080/Statistic/BestSellerBySize?${query}`)
            if (response.status === 200) {
                setShoeSizes(response.data)
            }
        }

        fetchShoeSizes()

    }, [data])


    console.log(shoeSizes)


    const validateDates = () => {
        if (!minDate || !maxDate) {
            setError('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.');
            return false;
        }

        if (new Date(minDate) > new Date(maxDate)) {
            setError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
            return false;
        }

        setError('');
        return true;
    };


    const handleSearch = () => {
        if (validateDates()) {
            setFilterValues({
                minDate: formatDate(minDate),
                maxDate: formatDate(maxDate)
            });
        }
    };


    const handleReset = () => {
        setFilterValues({ minDate: '', maxDate: '' });
        setMinDate('');
        setMaxDate('');
        setError('');
    };



    return (
        <div className={isOpen ? 'w-full animate-dropdown h-screen fixed left-0 top-0 overflow-hidden flex items-center justify-center ' : 'hidden'}

        >
            <div className='relative w-[30rem] md:w-[50rem] bg-white border rounded-md shadow-md  overflow-y-auto p-3 space-y-4'>
                <button className='absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition' onClick={handleOpen}>
                    <CloseIcon className='text-2xl' />
                </button>

                <h3 className='font-semibold text-xl text-center'>Sản phẩm với mã {data.shoeId}</h3>

                <div className='flex gap-4 items-center bg-[#ece9e9] p-3 rounded-md'>
                    <label htmlFor="from">Ngày bắt đầu</label>
                    <input
                        type="date"
                        className='rounded-md'
                        value={minDate}
                        onChange={(e) => setMinDate(e.target.value)}
                    />
                    <label htmlFor="to">Ngày kết thúc</label>
                    <input
                        type="date"
                        className='rounded-md'
                        value={maxDate}
                        onChange={(e) => setMaxDate(e.target.value)}
                    />
                    <button className='bg-white p-1 rounded-md' onClick={handleSearch}><CiSearch size={25} /></button>
                    <button className='bg-white p-1 rounded-md' onClick={handleReset}><IoReload size={25} /></button>
                </div>
                
            {error && <div className="text-red-500">{error}</div>}

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