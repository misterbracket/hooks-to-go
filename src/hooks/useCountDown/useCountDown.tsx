import { useCallback, useEffect, useRef, useState } from "react";

type Countdown = {
  remainingTime: number;
  isActive: boolean;
  isInactive: boolean;
  isRunning: boolean;
  isPaused: boolean;
  pause: VoidFunction;
  resume: VoidFunction;
  reset: VoidFunction;
};

type useCountdownParams = {
  startTimeInSeconds: number;
  endTimeInSeconds?: number;
  onCompleted?: VoidFunction;
};

const calculateInitialTime = (
  startTimeInSecods: number,
  endTimeInSeconds: number
): number => {
  return startTimeInSecods - endTimeInSeconds;
};

/**
 * @name useCountdown
 * @description React hook countdown timer.
 */
const useCountdown = ({
  startTimeInSeconds,
  endTimeInSeconds = 0,
  onCompleted,
}: useCountdownParams): Countdown => {
  const id = useRef(0);

  // time
  const [remainingTime, setRemainingTime] = useState(
    calculateInitialTime(startTimeInSeconds, endTimeInSeconds)
  );

  // status
  const [isActive, setIsActive] = useState(false);
  const [isInactive, setIsInactive] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const calculateRemainingTime = useCallback(() => {
    setRemainingTime((time) => {
      if (time <= 1) {
        clearInterval(id.current);
        onCompleted?.();

        setIsActive(false);
        setIsInactive(true);
        setIsRunning(false);
        setIsPaused(false);

        return 0;
      }

      return time - 1;
    });
  }, [onCompleted]);

  useEffect(() => {
    id.current = window.setInterval(calculateRemainingTime, 1000);

    setIsActive(true);
    setIsInactive(false);
    setIsRunning(true);
    setIsPaused(false);

    return () => window.clearInterval(id.current);
  }, [calculateRemainingTime]);

  const pause = (): void => {
    if (isPaused || isInactive) {
      return;
    }

    window.clearInterval(id.current);

    setIsActive(true);
    setIsInactive(false);
    setIsRunning(false);
    setIsPaused(true);
  };

  const resume = (): void => {
    if (isRunning) {
      return;
    }

    id.current = window.setInterval(calculateRemainingTime, 1000);

    setIsActive(true);
    setIsInactive(false);
    setIsRunning(true);
    setIsPaused(false);
  };

  const reset = (): void => {
    window.clearInterval(id.current);
    id.current = window.setInterval(calculateRemainingTime, 1000);

    setIsActive(true);
    setIsInactive(false);
    setIsRunning(true);
    setIsPaused(false);

    setRemainingTime(
      calculateInitialTime(startTimeInSeconds, endTimeInSeconds)
    );
  };

  return {
    remainingTime,
    isActive,
    isInactive,
    isRunning,
    isPaused,
    pause,
    resume,
    reset,
  };
};

export default useCountdown;
