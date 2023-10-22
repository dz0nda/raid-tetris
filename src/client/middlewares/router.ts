import { Middleware } from '@reduxjs/toolkit';

import { events } from '@/shared/events';
import { reqConnect, reqLogin } from '@/client/store/slices/user.slice';

export const routerMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;
  const { isFirstRendering, location } = payload;

  switch (type) {
    case events.ROUTER_LOCATION_CHANGE:
      if (isFirstRendering) {
        const { pathname } = location;

        store.dispatch(reqConnect({}));

        if (pathname !== '/') {
          const room = pathname.split('/')[1].split('[')[0].trim();
          const name = pathname.split('/')[1].split('[')[1].split(']')[0].trim();

          if (name && room) {
            store.dispatch(reqLogin({ name }));
          }
        }
      }
      break;
    default:
      break;
  }

  return next(action);
};
