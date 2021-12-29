import React, { useEffect, useRef, useState } from "react";

const Expire = ({
  delay,
  children,
  onExpiration,
}: {
  delay: number;
  children: JSX.Element;
  onExpiration: () => void;
}): JSX.Element => {
  const [visible, setVisible] = useState(true);

  const callbackRef = useRef(onExpiration);
  const cb = callbackRef.current;
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      cb();
    }, delay * 1000);
  }, [delay, cb]);

  return visible ? children : <></>;
};

export default Expire;
