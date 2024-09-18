import { useDispatch, useSelector } from 'react-redux'
import { getNewsByUser } from '../../reducers/news/NewSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ListNews = () => {
  const dispatch = useDispatch()

  const { data: dataNews } = useSelector((state) => state.news)

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 1,
  })

  useEffect(() => {
    dispatch(getNewsByUser(pagination))
  }, [dispatch, pagination])

  const handlePrevious = () => {
    if (pagination.pageNumber > 1) {
      setPagination((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber - 1,
      }))
    }
  }

  const handleNext = () => {
    if (pagination.pageNumber < dataNews?.totalPages) {
      setPagination((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }))
    }
  }

  const handlePageClick = (page) => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: page,
    }))
  }
  console.log(dataNews)

  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {dataNews?.content?.map((item) => (
            <div key={item.id} className="p-4 md:w-1/3">
              <Link to={`/pageDetailNew/${item.id}`}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={`http://localhost:8080/NewsImage/${item.banner}`}
                    alt={item.id}
                  />
                  <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {item.title || 'The Catalyzer'}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <nav className="flex justify-center w-full">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={pagination.pageNumber === 1}
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: dataNews?.totalPages }, (_, i) => (
                <li key={i + 1}>
                  <button
                    onClick={() => handlePageClick(i + 1)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                      pagination.pageNumber === i + 1
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={handleNext}
                  disabled={pagination.pageNumber === dataNews?.totalPages}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default ListNews
