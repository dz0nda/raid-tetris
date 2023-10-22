import { Middleware } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import ev from '@/shared/events';

/**
 * Middleware to handle notifications based on specific actions.
 */
export const notificationsMiddleware: Middleware = () => (next) => (action) => {
  const { type, payload } = action;

  const notificationOptions = {
    'user/reqConnect': {
      title: 'SOCKET',
      message: 'Trying to login...',
      loading: true,
      autoClose: 1000,
      withCloseButton: false,
    },
    'user/socketUpdate': {
      title: 'SOCKET',
      message: 'Connected',
      color: 'teal',
      autoClose: 2000,
      loading: false,
    },
    'user/reqLoginUser': {
      title: 'LOGIN',
      message: 'Trying to login...',
      loading: true,
    },
    [ev.RESPONSE_LOGIN_USER]:
      payload.status !== 200
        ? {
            title: 'LOGIN',
            message: payload.error,
            variant: 'error',
          }
        : {
            title: 'LOGIN',
            message: 'Login success!',
          },
    'app/error': {
      title: 'ERROR',
      message: payload.error,
      variant: 'error',
    },
  };

  if (notificationOptions[type]) {
    notifications.show(notificationOptions[type]);
  }

  return next(action);
};
