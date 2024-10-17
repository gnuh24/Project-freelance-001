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
      <div className="max-sm:h-[30vh] sm:h-[50vh] lg:h-[70vh] pt-3">
        {/* Adjust the height for responsiveness */}
        <Carousel slideInterval={2000}>
          {data && Array.isArray(data) && data.length > 0 && data[0].banner ? (
            <>
              <img
                className="w-full h-full object-cover" // Ensure the image covers the area responsively
                src="/image/banner.png"
                alt="Banner"
              />
              <img
                className="w-full h-full object-cover" // Ensure the image covers the area responsively
                src={`${import.meta.env.VITE_API_URL}/Event/Banner/${data[0].banner}`}
                alt={data[0].title || 'Event Banner'}
              />
            </>
          ) : (
            <img
              className="w-full h-full object-cover" // Ensure the image covers the area responsively
              src="/image/banner.png"
              alt="Banner"
            />
          )}
        </Carousel>
      </div>
    </>
  )
}

export default Carusel
