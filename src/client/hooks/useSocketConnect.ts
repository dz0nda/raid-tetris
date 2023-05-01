import { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/client//store';
import { selectSocketConnected, reqConnect } from '@/client/store/reducers/socket';

export const useSocketConnect = (delay: number = 10000) => {
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
