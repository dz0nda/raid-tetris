import ev from '../../shared/events';

export const reqConnect = (payload) => ({
  type: ev.CLIENT_CONNECTING,
  payload: {
    host: payload.host,
    port: payload.port,
  },
});

export const CLIENT_DISCONNECT = () => ({
  type: ev.CLIENT_DISCONNECT,
  payload: {
    connected: false,
  },
});

export const reqLogin = (payload) => ({
  type: ev.req_LOGIN,
  payload: {
    name: payload.name,
    room: payload.room,
  },
});

export const reqLogout = () => ({
  type: ev.req_LOGOUT,
});
