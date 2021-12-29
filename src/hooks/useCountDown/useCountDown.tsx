/**
 * Starts a Timer that counts donw from startInSeconds to endInSeconds
 * @param startTimeInSeconds start time in seconds
 * @param endTimeInSeconds optional: start time in seconds
 * @returns currentTime: number
 */
import { useEffect, useState } from "react";

const useCountDown = ({
  startTimeInSeconds,
  endTimeInSeconds = 0,
}: {
  startTimeInSeconds: number;
  endTimeInSeconds?: number;
}): number => {
  const [currentTime, setCurrentTime] = useState(startTimeInSeconds);

  useEffect(() => {
    setCurrentTime(startTimeInSeconds);
    if (startTimeInSeconds === endTimeInSeconds) return;
    const intervalId = setInterval(() => {
      let now = startTimeInSeconds;
      setCurrentTime((currTime) => {
        now = currTime;
        return currTime - 1;
      });
      if (now <= endTimeInSeconds + 1) {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [startTimeInSeconds, endTimeInSeconds]);

  return currentTime;
};

export default useCountDown;
