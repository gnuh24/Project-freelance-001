

import { Carousel } from 'flowbite-react'
import React from 'react'




const EventCarousel = ({
  event,
}) => {
  return (
    <div className=" h-3/5-screen">
      <Carousel slideInterval={2000}>
        <img
          src={"http://localhost:8080/Event/Banner/" + event.banner}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </Carousel>

    
    </div>
  )
}

export default EventCarousel