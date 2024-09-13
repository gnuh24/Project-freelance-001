import { useDispatch, useSelector } from 'react-redux'
import { getNewsByUser } from '../../reducers/news/NewSlice'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

const ListNews = () => {
  const dispatch = useDispatch()
  const {
    data: dataNews,
    status: statusNews,
    error: errorNews,
  } = useSelector((state) => state.news)

  const payload = useMemo(
    () => ({
      pageNumber: 1,
      pageSize: 10,
    }),
    [],
  )
  useEffect(() => {
    dispatch(getNewsByUser(payload))
  }, [dispatch, payload])

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
        </div>
      </div>
    </>
  )
}

export default ListNews
