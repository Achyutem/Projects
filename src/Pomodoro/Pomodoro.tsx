import { useEffect, useRef, useState } from "react";

function Pomodoro() {
  const WORK_TIME = 25 * 60;
  const REST_TIME = 5 * 60;

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [time, setTime] = useState<number>(WORK_TIME);
  const intervalRef = useRef<any>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 0) {
            clearInterval(intervalRef.current);
            if (!isResting) {
              setIsResting(true);
              setTime(REST_TIME);
              setIsRunning(true);
            } else {
              setIsResting(false);
              setTime(WORK_TIME);
              setIsRunning(false);
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isResting]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTime(WORK_TIME);
    setIsRunning(false);
    setIsResting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`w-64 h-64 border-4 rounded-full flex items-center justify-center text-3xl font-semibold
        ${isResting ? "border-green-500" : "border-blue-500"}`}>
        {formatTime(time)}
      </div>
      <p className="mt-2 text-lg font-semibold">
        {isResting ? "Rest Time 💤" : "Work Time ⏳"}
      </p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded-md">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
