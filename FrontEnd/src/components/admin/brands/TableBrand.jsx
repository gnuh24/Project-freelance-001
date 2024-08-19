import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsApiThunk } from '../../../reducers/productReducer/BrandSlice.jsx'
import Loader from '../../loader/Loader'
import EditBrandDialog from './EditBrandDialog.jsx'
import ViewBrandDialog from './ViewBrandDialog.jsx'
import DeleteBrandDialog from './DeleteBrandDialog.jsx'

const TableBrand = ({ search }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.brandReducer)
  const PAGE_SIZE = 5
  const [sort, setSort] = useState('brandId,desc')
  const [pageNumber, setPageNumber] = useState(1)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(false)

  useEffect(() => {
    dispatch(
      getBrandsApiThunk({ pageSize: PAGE_SIZE, pageNumber, sort, search }),
    )
  }, [dispatch, pageNumber, sort, search])

  const handleSort = (sortKey) => {
    setSort((prevSort) => {
      const [key, order] = prevSort.split(',')
      return key === sortKey && order === 'asc'
        ? `${sortKey},desc`
        : `${sortKey},asc`
    })
  }

  const handlePageChange = (newPage) => {
    setPageNumber(newPage)
  }


  const handleEditOpen = () => {
    setIsEditOpen(!isEditOpen)

  }
  const handleDeleteOpen = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }
  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen)
  
  }

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>

  console.log(data.content)

  return (
    <>
      <section className="px-4 mx-auto">
        <div className="flex flex-col mt-4">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          
                          <button
                            onClick={() => handleSort('brandId')}
                            className="flex items-center gap-x-2"
                          >
                            <span>ID</span>
                            {sort.startsWith('brandId') && (
                              <span>
                                {sort.split(',')[1] === 'asc' ? '▲' : '▼'}
                              </span>
                            )}
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Logo
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          onClick={() => handleSort('brandName')}
                          className="flex items-center gap-x-2"
                        >
                          Name
                          {sort.startsWith('brandName') && (
                            <span>
                              {sort.split(',')[1] === 'asc' ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xem
                      </th>

                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Sửa
                      </th >
                      <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xóa
                      </th>
                    </tr>



                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.map((brand) => (
                      <tr key={brand.brandId}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            
                            <span>{brand.brandId}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <img
                            src={`http://localhost:8080/Brand/Image/${brand.logo}`}
                            alt=""
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{brand.brandName}</span>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                          <div className="flex items-center gap-x-6 justify-center">
                            <button onClick={()=> {setCurrentBrand(brand), setIsViewOpen(true)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Xem
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                          <div className="flex items-center gap-x-6 justify-center">
                            <button onClick={()=> {setCurrentBrand(brand), setIsEditOpen(true)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Sửa
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                          <div className="flex items-center gap-x-6 justify-center">
                            <button onClick={()=> {setCurrentBrand(brand), setIsDeleteOpen(true)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-6 gap-5">
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
          >
            <i className="fa-solid fa-angle-left"></i>
            <span className="ml-2">Previous</span>
          </button>
          <ul className="flex h-8 items-center -space-x-px text-sm">
            <ul className="flex space-x-2">
              {Array.from({ length: data.totalPages }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${pageNumber === index + 1
                      ? 'border border-sky-500 text-sky-500'
                      : ''
                      }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </ul>
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber === data.totalPages}
            className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
          >
            <span className="mr-2">Next</span>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </section>


      <div>
        {currentBrand && (

          <div>
            <EditBrandDialog
              open={isEditOpen}
              handleOpen={handleEditOpen}
              data={currentBrand}
            />

            <ViewBrandDialog
              open={isViewOpen}
              handleOpen={handleViewOpen}
              data={currentBrand}
            />

            <DeleteBrandDialog
              open={isDeleteOpen}
              handleClose={handleDeleteOpen}
              data={currentBrand}
            />

          </div>
          


        )}
      </div>
    </>
  )
}

export default TableBrand
