import { Carousel } from 'flowbite-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'
import Loader from '../loader/Loader'

const Carusel = () => {
  const dispatch = useDispatch()
  const { data, status, err } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])
  console.log(data)
  return (
    <>
      <div className="h-9/10-screen pt-3">
        <Carousel slideInterval={2000}>
          <img src="../../../public/image/banner.png" alt="..." />
          {data && Array.isArray(data) && data.length > 0 && data[0].banner ? (
            <img
              src={`http://localhost:8080/Event/Banner/${data[0].banner}`}
              alt={data[0].title || 'Event Banner'}
            />
          ) : (
            <img src="../../../public/image/banner.png" alt="..." />
          )}
        </Carousel>
      </div>
    </>
  )
}

export default Carusel
