import ev from '../../shared/events';

const gameStatus = {
  STOPPED: 'STOPPED',
  WILL_START: 'WILL_START',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

export const gameState = {
  room: '',
  settings: {
    owner: '',
    started: false,
    status: gameStatus.STOPPED,
    pieces: [],
    dropTime: 0,
    nbPlayers: 0,
    nbLoosers: 0,
  },
  players: {},
  chat: [],
};

const gameReducer = (state = gameState, action) => {
  switch (action.type) {
    case ev.UPDATE_GAME: {
      const { game } = action.payload;

      return {
        ...game,
      };
    }
    case ev.UPDATE_GAME_SETTINGS: {
      const { settings } = action.payload;

      return {
        ...state,
        settings,
      };
    }
    case ev.UPDATE_GAME_PLAYERS: {
      const { id, player } = action.payload;

      return {
        ...state,
        players: {
          ...state.players,
          [id]: player,
        },
      };
    }
    case ev.UPDATE_GAME_CHAT: {
      const { chat } = action.payload;

      return {
        ...state,
        chat,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
