import { useDispatch, useSelector } from 'react-redux'
import { getNewsByUser } from '../../reducers/news/NewSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Pagination, Stack } from '@mui/material'

const ITEM_PER_PAGE = 10

const buildQueryString = (page, itemsPerPage) => {
  const params = new URLSearchParams()

  Object.entries({
    pageNumber: page || '',
    pageSize: itemsPerPage || '',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const ListNews = () => {
  const dispatch = useDispatch()

  const { data: dataNews } = useSelector((state) => state.news)

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = dataNews.totalPages

  useEffect(() => {
    const query = buildQueryString(currentPage, ITEM_PER_PAGE)
    dispatch(getNewsByUser(query))
  }, [dispatch, currentPage])

  const handleChangePage = (e, p) => {
    setCurrentPage(p)
  }

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

          <div className="w-full flex items-center justify-center mb-5 mt-10  pb-10">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListNews
