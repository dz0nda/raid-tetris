import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/client//store';
import { selectUser } from '@/client/store/selectors/user.selectors';

export const useSocketConnect = (delay = 10000) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const connected = user?.id ? true : false;

  let lastCall = 0;

  useEffect(() => {
    const now = Date.now();
    if (!connected && now - lastCall > delay) {
      // console.log('useSocketConnect: ', lastCall);
      lastCall = now;
      // dispatch(reqConnect({}));
    }
  }, [connected, dispatch, lastCall, delay]);

  return connected;
};
