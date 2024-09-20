import { Carousel } from 'flowbite-react';
import React from 'react';

const EventInfo = ({ event }) => {
  return (
    <div className="relative h-3/5-screen">
      <img
        src={"http://localhost:8080/Event/Banner/" + event.banner}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      {/* Lớp phủ tối màu */}
      <div className="absolute inset-0 bg-black opacity-50" />
      {/* Nội dung chữ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h2 className="text-[35px] font-bold capitalize">{event.eventName}</h2>
        <p className="mt-2 font-semibold capitalize">
          Ưu đãi lên đến 
          <span className='pl-1 text-rose-500'>
          {event.percentage} %
          </span> 
        </p>
        <p className="mt-2 font-semibold capitalize">
          Ngày bắt đầu:
          <span className='pl-2 text-rose-500'>
          {event.startTime} 
          </span> 
        </p>
        <p className="mt-2 font-semibold capitalize">
          Ngày kết thúc:
          <span className='pl-2 text-rose-500'>
          {event.endTime} 
          </span> 
        </p>
      </div>
    </div>
  );
}

export default EventInfo;
