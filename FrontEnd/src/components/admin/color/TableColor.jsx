import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loader/Loader'
import { getColorsApiThunk } from '../../../reducers/productReducer/ColorSlice.jsx'

const TableColor = ({ search }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.colorReducer)

  const PAGE_SIZE = 5
  const [sort, setSort] = useState('id,desc')
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(
      getColorsApiThunk({
        pageSize: PAGE_SIZE,
        pageNumber: pageNumber,
        sort: sort,
        search: search,
      }),
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
  console.log(data)

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
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
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />
                          <button
                            onClick={() => handleSort('id')}
                            className="flex items-center gap-x-2"
                          >
                            <span>ID</span>
                            {sort.startsWith('id') && (
                              <span>
                                {sort.split(',')[1] === 'desc' ? '▲' : '▼'}
                              </span>
                            )}
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          onClick={() => handleSort('colorName')}
                          className="flex items-center gap-x-2"
                        >
                          Name
                          {sort.startsWith('colorName') && (
                            <span>
                              {sort.split(',')[1] === 'desc' ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.map((color) => (
                      <tr key={color.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <span>{color.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{color.colorName}</span>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                              Archive
                            </button>
                            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              Edit
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
            disabled={pageNumber === 0}
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
                    onClick={() => handlePageChange(index)}
                    className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      pageNumber === index
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
            disabled={pageNumber === data.totalPages - 1}
            className="flex items-center px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
          >
            <span className="mr-2">Next</span>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </section>
    </>
  )
}

export default TableColor
