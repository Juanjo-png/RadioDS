import './Clock.css'
import { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const hour = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const rawMonth = time.toLocaleString("default", { month: "long" });
    const month = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
    const day = time.getDate();
    const weekday = time.toLocaleDateString("es-ES", { weekday: "long" });
    const dayName = weekday.charAt(0).toUpperCase() + weekday.slice(1);
    const dayInitials = dayName.slice(0,4);
  

  return (
    <div className="ClockBlock">
      <h4>{hour}:{minutes}</h4>
      <hr />
      <div className="dayInfo">
        <h4>{month + " " + day}</h4>
        <h4 className='dia'>{dayInitials}</h4>
      </div>
    </div>
  );
}

export default Clock;
