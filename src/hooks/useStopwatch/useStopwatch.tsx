/**
 * Starts a Timer that counts up
 * @returns currentTime: string
 */
import { useEffect, useState } from "react";
import { getHoursMinutesSeconds } from "src/utils/format-time";

const useStopwatch = (): string => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((currTime) => currTime + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return getHoursMinutesSeconds(currentTime);
};

export default useStopwatch;
