import React, { useEffect, useState } from "react";

interface IStartTimerProps {
  isCountdown: boolean;
  setCountDownHandler: (isCountdown: boolean) => void;
}

function CountDown({ isCountdown,  setCountDownHandler }: IStartTimerProps) {
  let [timer, settimer] = useState(3);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isCountdown) {
      interval = setInterval(() => {
        if (timer === 0) {
          clearInterval(interval);
          setCountDownHandler(false);
        }
        settimer((timer = timer - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-slate-400 absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 font-bold text-9xl md:text-[15em]">
      {timer}
    </div>
  );
}

export default CountDown;
