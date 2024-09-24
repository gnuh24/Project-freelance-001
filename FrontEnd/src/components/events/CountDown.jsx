import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!targetDate) {
      console.error('targetDate is undefined or null:', targetDate);
      return; 
    }

    const [time, date] = targetDate.split(' ');
    const formattedDate = `${date.split('/').reverse().join('-')}T${time}`;

    const dateObj = new Date(formattedDate); 

    const interval = setInterval(() => {
      const now = new Date();
      const difference = dateObj - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft({ days, hours, minutes });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 font-bold text-xs md:text-3xl">
      <span className='px-3 py-2 flex items-center justify-center bg-black text-white'>
        {timeLeft.days} 
      </span>
      
      ngày 
       <span  className='px-3 py-2 flex items-center justify-center bg-black text-white'>
          {timeLeft.hours}
      </span> 
      :
      <span  className='px-3 py-2 flex items-center justify-center bg-black text-white'>
        {timeLeft.minutes}
      </span> 
      
    </div>
  );
};

export default Countdown;
