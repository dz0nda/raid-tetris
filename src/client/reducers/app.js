import ev from '../../shared/events';

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

export default appReducer;
