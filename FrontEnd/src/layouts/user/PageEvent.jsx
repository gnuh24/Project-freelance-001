import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentEvent } from "../../reducers/eventReducer/EventSlice"

import { LuLoader2 } from "react-icons/lu";
import EventCarousel from "../../components/events/EventCarousel";
const PageEvent = () => {


  const dispatch = useDispatch()
  const { data, status, err } = useSelector(state => state.events)


  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])
  console.log('params', data)

  if (status === 'loading') {
    return <div className="absolute left-0 top-0 w-full h-screen flex items-center justify-center">
      <LuLoader2 className=" animate-spin " />
    </div>
  }

  if (!data) {
    return <div>Không có sự kiện nào</div>
  }
  return (
    <div className="w-full h-full">

      <EventCarousel
        event={data}
      />

      <div className='flex w-full gap-4 mt-10 p-4'>
        <div className="flex flex-col border items-center gap-4 p-2 shadow-md rounded-sm">
          <img className=" w-48 h-48" src={"http://localhost:8080/Event/Banner/" + data.banner} alt={data.name} />
          <div>
            <h2  className="text-xl font-bold">{data.eventName}</h2>
            <p className="textf-sm font-semibold">Ngày bắt đầu: {data.startTime}</p>
            <p className="text-sm font-semibold">Ngày hết hạn: {data.endTime}</p>
            <p className="text-sm font-semibold">Phần trăm giảm giá: {data.percentage} %</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PageEvent