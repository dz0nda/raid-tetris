import { Middleware } from '@reduxjs/toolkit';

import { events } from '../../../shared/events';
import { reqLogin } from '../reducers/app';

export const routerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('routerMiddleware');
  console.log('action', action);
  console.log(store.getState());

  const isConnected = store.getState().app.isConnected;
  const { type, payload } = action;
  const { isFirstRendering, location } = payload;

  switch (type) {
    case events.ROUTER_LOCATION_CHANGE:
      if (isFirstRendering) {
        const { pathname } = location;

        if (pathname !== '/') {
          const room = pathname.split('/')[1].split('[')[0].trim();
          const name = pathname.split('/')[1].split('[')[1].split(']')[0].trim();

          if (name && room) {
            store.dispatch(reqLogin({ name, room }));
          }
        }
      }
      break;
    default:
      break;
  }

  return next(action);
};
