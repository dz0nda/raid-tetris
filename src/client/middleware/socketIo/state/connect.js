/* eslint-disable no-unused-vars */
import ev from '../../../../shared/events';

const action = ev.CONNECT;

// eslint-disable-next-line no-shadow
const dispatch = (socket, store, next, action) => () => {
  const { router } = store.getState();

  store.dispatch({
    type: ev.UPDATE_CONNECTION,
    payload: {
      id: socket.id,
      connected: true,
      snackbar: {
        message: 'socket: Connected',
        variant: 'success',
      },
    },
  });

  if (router.location.pathname !== '/') {
    const room = router.location.pathname.split('/')[1].split('[')[0].trim();
    const name = router.location.pathname.split('/')[1].split('[')[1].split(']')[0].trim();

    if (room && name) {
      store.dispatch({
        type: ev.req_LOGIN,
        payload: {
          name,
          room,
        },
      });
    }
  } else {
    store.dispatch({
      type: ev.req_UPDATE_APP_INFOS,
      payload: {},
    });
  }
};

export default {
  action,
  dispatch,
};
