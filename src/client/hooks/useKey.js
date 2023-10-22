import { useEffect } from 'react';

const keyevent = 'keydown';

const keys = {
  KDOWN: 40,
  KLEFT: 37,
  KRIGHT: 39,
  KUP: 38,
  KSPACE: 32,
  KENTER: 13,
};

const allowedKeys = [keys.KDOWN, keys.KLEFT, keys.KRIGHT, keys.KUP, keys.KSPACE];

function useKey(callback, started, loose) {
  let lastKeyCode = null;
  let lastKeyTime = Date.now();

  // console.log('useKey', started, loose);

  const handleEvent = (event) => {
    const currentTime = Date.now();

    if (started && !loose) {
      if (allowedKeys.includes(event.keyCode)) {
        if (event.keyCode !== lastKeyCode || currentTime - lastKeyTime > 10) {
          callback(event);
          lastKeyCode = event.keyCode;
          lastKeyTime = currentTime;
        }
      }
    }
  };

  useEffect(() => {
    const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    if (!canUseDOM) {
      console.error('Window is not defined');
      return null;
    }

    window.addEventListener(keyevent, handleEvent);
    return () => {
      window.removeEventListener(keyevent, handleEvent);
    };
  }, [started, loose]);
}

export default useKey;
