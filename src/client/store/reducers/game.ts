import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

const gameStatus = {
  STOPPED: 'STOPPED',
  WILL_START: 'WILL_START',
  STARTED: 'STARTED',
  FINISHED: 'FINISHED',
};

export interface GameState {
  room: string;
  settings: {
    owner: string;
    started: boolean;
    status: string;
    pieces: any[];
    dropTime: number;
    nbPlayers: number;
    nbLoosers: number;
  };
  players: { [key: string]: any };
  chat: any[];
}

export const gameState: GameState = {
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

export const gameSlice = createSlice({
  name: 'game',
  initialState: gameState,
  reducers: {
    reqStartGame(_state, _action) {},
    reqOwner(_state, _action) {},
    reqChat(_state, _action) {},
    updateGame(state, action) {
      state.room = action.payload.game.room;
      state.settings = action.payload.game.settings;
      state.players = action.payload.game.players;
      state.chat = action.payload.game.chat;
    },
    updateGameSettings(state, action) {
      state.settings = action.payload.settings;
    },
    updateGamePlayers(state, action) {
      state.players = action.payload.players;
    },
    updateGameChat(state, action) {
      state.chat = action.payload.chat;
    },
  },
});

export const { reqStartGame, reqOwner, reqChat, updateGame, updateGameSettings, updateGamePlayers, updateGameChat } =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;

// export const selectRoomName = (state: RootState) => state.game.room;
// export const selectRoomSettings = (state: RootState) => state.game.settings;
// export const selectRoomPlayers = (state: RootState) => Object.values(state.game.players);
// export const selectRoomChat = (state: RootState) => state.game.chat;

// // eslint-disable-next-line default-param-last
// const gameReducer = (state = gameState, action) => {
//   switch (action.type) {
//     case ev.UPDATE_GAME: {
//       const { game } = action.payload;

//       return {
//         ...game,
//       };
//     }
//     case ev.UPDATE_GAME_SETTINGS: {
//       const { settings } = action.payload;

//       return {
//         ...state,
//         settings,
//       };
//     }
//     case ev.UPDATE_GAME_PLAYERS: {
//       const { id, player } = action.payload;

//       return {
//         ...state,
//         players: {
//           ...state.players,
//           [id]: player,
//         },
//       };
//     }
//     case ev.UPDATE_GAME_CHAT: {
//       const { chat } = action.payload;

//       return {
//         ...state,
//         chat,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export const reqOwner = (payload) => ({
//   type: ev.REQUEST_UPDATE_GAME_OWNER,
//   payload: {
//     newOwner: payload.newOwner,
//   },
// });

// export const reqChat = (payload) => ({
//   type: ev.REQUEST_UPDATE_GAME_CHAT,
//   payload: {
//     message: payload.message,
//   },
// });

// export const reqStartGame = () => ({
//   type: ev.REQUEST_START_GAME,
//   payload: {},
// });

// export const actions = { reqStartGame, reqChat, reqOwner };

// export default gameReducer;
