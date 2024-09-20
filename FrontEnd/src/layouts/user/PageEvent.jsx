import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentEvent } from "../../reducers/eventReducer/EventSlice"

import { LuLoader2 } from "react-icons/lu";
import EventInfo from "../../components/events/EventInfo.jsx";
import ProductList from "../../components/events/ProductList";
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

      <EventInfo
        event={data}
      />





      <div>

        {data && (
          <ProductList
            eventId={data}
            percentage={data.percentage}
          />
        )}

      </div>
    </div>
  )
}

export default PageEvent