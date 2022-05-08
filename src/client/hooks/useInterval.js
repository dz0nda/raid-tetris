import { useEffect, useRef } from 'react';

export default function useInterval(callback, started, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (started && delay !== null && delay !== 0) {
      const id = setInterval(tick, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [started, delay]);
}
