import { Middleware } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';

import ev from '../../../shared/events';

export const notificationsMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('notificationsMiddleware');
  console.log('action', action);
  console.log(store.getState());
  const isConnected = store.getState().app.isConnected;

  switch (action.type) {
    case 'socket/reqConnect':
      // if (!isConnected) {
      notifications.show({
        // id: 'load-socket',
        title: 'SOCKET',
        message: 'Trying to login...',
        loading: true,
        autoClose: 1000,
        withCloseButton: false,
      });
      // }
      break;

    case 'socket/updateConnection':
      notifications.show({
        // id: 'load-socket',
        title: 'SOCKET',
        message: 'Connected',
        color: 'teal',
        // icon: <IconCheck size="1rem" />,
        autoClose: 2000,
        loading: false,
      });
      break;

    case 'app/reqLogin':
      notifications.show({
        title: 'LOGIN',
        message: 'Trying to login...',
        loading: true,
      });
      break;

    case ev.RESPONSE_LOGIN:
      console.log('here we go again!');

      if (action.payload.status !== 200) {
        notifications.show({
          title: 'LOGIN',
          message: action.payload.error,
          variant: 'error',
        });
      } else {
        notifications.show({
          title: 'LOGIN',
          message: 'Login success!',
        });
      }
      break;

    case 'app/error':
      notifications.show({
        title: 'ERROR',
        message: action.payload.error,
        variant: 'error',
      });
      break;

    default:
      break;
  }

  next(action);
};
