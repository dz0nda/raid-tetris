import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/client//store';
import { reqConnect, selectSocketConnected } from '@/client/store/reducers/socket';

export const useSocketConnect = (delay = 10000) => {
  const dispatch = useAppDispatch();
  const connected = useAppSelector(selectSocketConnected);
  let lastCall = 0;

  useEffect(() => {
    const now = Date.now();
    if (!connected && now - lastCall > delay) {
      console.log('useSocketConnect: ', lastCall);
      lastCall = now;
      dispatch(reqConnect({}));
    }
  }, [connected, dispatch, lastCall, delay]);

  return connected;
};
