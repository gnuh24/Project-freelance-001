import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotNews } from '../../reducers/news/NewSlice'
import { Link } from 'react-router-dom'

const HotNew = () => {
  const dispatch = useDispatch()
  const {
    data: dataNews,
    hotNews,
    status: statusNews,
    error: errorNews,
  } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(getHotNews())
  }, [dispatch])

  console.log(hotNews)

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Tin mới nổi bật
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {hotNews?.map((item) => (
            <div
              key={item.id} // Add a unique key for each element
              className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800"
            >
              <Link to={`/pageDetailNew/${item.id}`}>
                <img
                  src={`http://localhost:8080/NewsImage/${item.banner}`}
                  alt="Nature"
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.content}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HotNew
