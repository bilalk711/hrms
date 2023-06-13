import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const amPm = time.getHours() >= 12 ? 'PM' : 'AM';
  let hours = time.getHours() % 12;
  hours = hours ? hours : 12;
  const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <p className="m text-xl font-bold text-center">{`${hours}:${minutes} ${amPm}`}</p>
    </div>
  );
};

export default Clock;
