import { useEffect, useState } from "react";

function TimerCounter() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // CLEANUP
    return () => {
      clearInterval(id);
      console.log("Interval cleared");
    };
  }, []);

  return (
    <div className="p-4 border rounded w-48 text-center">
      <p className="text-xl font-bold">{seconds}s</p>
    </div>
  );
}

export default TimerCounter;
