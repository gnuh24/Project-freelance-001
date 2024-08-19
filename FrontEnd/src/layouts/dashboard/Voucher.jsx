import { useEffect, useState } from "react";
import TableVoucher from "../../components/admin/vouchers/TableVoucher";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVouchers } from '../../reducers/voucherReducer/VoucherSlice';
import VoucherConditionDialog from "../../components/admin/vouchers/VoucherConditionDialog";
import VoucherDiscountAmountDialog from "../../components/admin/vouchers/VoucherDiscountAmountDialog";
import AddVoucherDialog from "../../components/admin/vouchers/AddVoucherDialog";

const ITEM_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

const buildQueryString = (filters, page, itemsPerPage) => {
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
};

const Voucher = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchValue, setSearchValue] = useState('')
  const error = useSelector(state => state.vouchers.error);
  let voucherData = useSelector(state => state.vouchers.data.content ? state.vouchers.data.content : state.vouchers.data);
  


  
  let vouchers = Array.isArray(voucherData) ? voucherData : [voucherData]

  if(error){
    vouchers = []
  }
  
  const totalPages = useSelector(state => state.vouchers.data.totalPages)
  const [filterValues, setFilterValues] = useState({
    status: '',
    isFreeShip: '',
    minCondition: '',
    maxCondition: '',
    minDiscountAmount: '',
    maxDiscountAmount: '',
    sort: '',
    searchValue: '',
  });
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isDisCountAmountOpen, setIsDisCountAmountOpen] = useState(false);
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);

  useEffect(() => {
    const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE);
    console.log(query);
    dispatch(fetchVouchers(query));

  }, [dispatch, filterValues, currentPage]);

  if (!vouchers) return <div>Loading...</div>;

  if (vouchers.length <= 0) {

  
    return (
      <div className="text-center text-lg font-medium text-gray-900 dark:text-white">
        No vouchers found
      </div>
    );
  }

  console.log(vouchers)
  const handleNextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePreviousPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setFilterValues(prev => ({ ...prev, searchValue: searchValue }))
  }



  const handleConditionClickOpen = () => {
    setIsConditionOpen(!isConditionOpen);
  }
  const handleDiscountAmountClickOpen = () => {
    setIsDisCountAmountOpen(!isDisCountAmountOpen);
  }
  const handleAddVoucherClickOpen = () => {
    setIsAddVoucherOpen(!isAddVoucherOpen);
  }

 
  return (
    <div className="h-[90.2vh]">
      <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Quản lý vouchers
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0 gap-4">
              <form className="flex gap-2 items-center" action="#" method="GET">
                <label htmlFor="products-search" className="sr-only">
                  Tìm
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    name="search"
                    id="voucher-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập mã voucher"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />

                </div>
                  <button onClick={onSubmit} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>Search</button>
              </form>

              <div>
                <label htmlFor="status">Status </label>
                <select
                  name="Status"
                  id="status"
                  className="px-4 py-2 rounded-md cursor-pointer"
                  onChange={(e) =>
                    setFilterValues(prev => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>


              <div>
                <label htmlFor="isFreeShip">Freeship </label>
                <select
                  name="isFreeShip"
                  id="isFreeShip"
                  className="px-4 py-2 rounded-md cursor-pointer"
                  onChange={(e) =>
                    setFilterValues(prev => ({ ...prev, isFreeShip: e.target.value }))
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </select>
              </div>


              <button onClick={() => setIsConditionOpen(true)} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                Lọc theo điều kiện
              </button>
              <button onClick={() => setIsDisCountAmountOpen(true)} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                Lọc theo giá giảm
              </button>
              <button onClick={() => setIsAddVoucherOpen(true)} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
                Thêm voucher mới
              </button>

            </div>
          </div>
        </div>
      </div>

      <TableVoucher vouchers={vouchers} totalPages={totalPages} />



      <div className='flex items-center justify-center mb-5 mt-10  pb-10'>
        <div className='flex items-center justify-center gap-10'>

          <button onClick={handlePreviousPage} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNextPage} className='bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition'>
            Next
          </button>
        </div>
      </div>


      <div>
        <VoucherConditionDialog
          isOpen={isConditionOpen}
          handleOpen={handleConditionClickOpen}
          onChangeFilterValue={setFilterValues}
        />

        <VoucherDiscountAmountDialog
          isOpen={isDisCountAmountOpen}
          handleOpen={handleDiscountAmountClickOpen}
          onChangeFilterValue={setFilterValues}
        />



        <AddVoucherDialog
          isOpen={isAddVoucherOpen}
          handleOpen={handleAddVoucherClickOpen}
          
        />





      </div>
    </div>
  );
};

export default Voucher;
