/**
 * Starts a Timer that counts up
 * @returns currentTime: string
 */
import { useEffect, useState } from "react";

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

function getHoursMinutesSeconds(timeInSeconds: number): string {
  let value = "";
  const days = Math.floor(timeInSeconds / (3600 * 24));
  timeInSeconds -= days * 3600 * 24;
  const hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds -= hours * 3600;
  const minutes = Math.floor(timeInSeconds / 60);
  timeInSeconds -= minutes * 60;

  if (days > 0) {
    value = `${days}d `;
    if (hours > 0) {
      value += hours < 10 ? "0" + hours : hours;
    } else {
      value += "00";
    }
    value += "h ";

    if (minutes > 0) {
      value += minutes < 10 ? `0${minutes}` : minutes;
    } else {
      value += "00";
    }
    value += "m ";
  } else if (hours > 0) {
    value += hours;
    value += "h ";
    value += minutes < 10 ? `0${minutes}` : minutes;
    value += "m ";
  } else {
    if (minutes > 0) {
      value += minutes < 10 ? `0${minutes}` : minutes;
      value += "m ";
    }
  }

  value += timeInSeconds < 10 ? 0 + timeInSeconds : timeInSeconds;
  value += "s";

  return value;
}
