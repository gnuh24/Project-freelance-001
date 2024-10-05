import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewByUser, getNewsByUser } from '../../reducers/news/NewSlice'
import { useParams } from 'react-router-dom'

const DetailNew = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  console.log(id)
  const {
    data: dataNews,
    detailNew,
    status: statusNews,
    error: errorNews,
  } = useSelector((state) => state.news)
  useEffect(() => {
    dispatch(getNewByUser({ id }))
    const payload = {
      pageNumber: 1,
      pageSize: 10,
    }
    dispatch(getNewsByUser(payload))
  }, [dispatch, id])
  console.log(detailNew, dataNews)
  return (
    <>
      <div className="bg-gray-50 py-6">
        <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
          <div className="flex flex-row flex-wrap">
            <div className="flex-shrink max-w-full w-full lg:w-2/3  overflow-hidden">
              <div className="w-full py-3 mb-3">
                <h2 className="text-gray-800 text-3xl font-bold">
                  <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>{' '}
                  {detailNew?.title}
                </h2>
              </div>
              <div className="flex flex-row flex-wrap -mx-3">
                <div className="max-w-full w-full px-4">
                  <div className="leading-relaxed pb-4">
              
                    <p className="mb-5" dangerouslySetInnerHTML={{ __html: detailNew?.content }}></p>

                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink max-w-full w-full lg:w-1/3 lg:pl-8 lg:pt-14 lg:pb-8 order-first lg:order-last relative">
              <div className="w-full bg-white">
                <div className="mb-6">
                  <div className="p-4 bg-gray-100">
                    <h2 className="text-lg font-bold">Most Popular</h2>
                  </div>
                  {dataNews?.content?.map((item) => (
                    <ul key={item.id} className="post-number">
                      <li className="border-b border-gray-100 hover:bg-gray-50">
                        <a
                          className="text-lg font-bold px-6 py-3 flex flex-row items-center"
                          href="#"
                        >
                          {item.title}
                        </a>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailNew
