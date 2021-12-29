import { useEffect, useRef } from "react";

const useClickOutside = (
  elRaf: React.MutableRefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (elRaf?.current?.contains(e.target as Node) && callbackRef.current) {
        callbackRef.current(e);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [elRaf, callbackRef]);
};

export default useClickOutside;
