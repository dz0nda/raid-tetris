import ev from '../../../shared/events';

export const appState = {
  id: null,
  connected: false,
  isLoading: true,
  infos: {
    nbPlayers: 0,
    nbGames: 0,
    games: [],
  },
  snackbar: {
    message: 'socket: Connection...',
    variant: 'info',
  },
};

// eslint-disable-next-line default-param-last
const appReducer = (state = appState, action) => {
  switch (action.type) {
    case ev.UPDATE_CONNECTION: {
      const { id, connected, snackbar } = action.payload;

      return {
        ...state,
        id,
        connected,
        isLoading: !connected,
        snackbar: {
          message: snackbar.message,
          variant: snackbar.variant,
        },
      };
    }
    case ev.UPDATE_LOG: {
      const { isLoading, snackbar } = action.payload;

      return {
        ...state,
        isLoading,
        snackbar: {
          message: snackbar.message,
          variant: snackbar.variant,
        },
      };
    }
    case ev.UPDATE_INFOS: {
      const { nbPlayers, nbGames, games } = action.payload;
      return {
        ...state,
        infos: {
          nbPlayers,
          nbGames,
          games,
        },
      };
    }
    default:
      return state;
  }
};

export const reqConnect = (payload) => {
  console.log('log');

  return {
    type: ev.CLIENT_CONNECTING,
    payload: {
      host: payload.host,
      port: payload.port,
    },
  };
};

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

export const actions = { reqConnect, reqLogin, reqLogout };

export default appReducer;
